import * as Yup from "yup";
import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";
import User from "../models/User";

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    const userEmailOrPasswordIncorrect = () => {
      res.status(401).json({ error: "Your email or password is incorrect." });
    };

    if (!(await schema.isValid(req.body)))
      return userEmailOrPasswordIncorrect();

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) return userEmailOrPasswordIncorrect();

    if (!(await user.checkPassword(password)))
      return userEmailOrPasswordIncorrect();

    return res.status(201).json({
      id: user.id,
      email,
      name: user.name,
      admin: user.admin,
      token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
