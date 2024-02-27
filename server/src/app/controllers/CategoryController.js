import * as Yup from "yup";

import Category from "../models/Category";
import User from "../models/User";

class CategoryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(401).json({ error: "User is not admin." });
    }

    const { name } = req.body;

    const { filename: path } = req.file;

    const categoryExists = await Category.findOne({
      where: { name },
    });

    if (categoryExists) {
      return res.status(400).json({ error: "Category already created." });
    }

    const { id } = await Category.create({
      name,
      path,
    });

    return res.json({ id, name });
  }

  async index(req, res) {
    const categories = await Category.findAll();

    return res.json(categories);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(req.userId);

    if (!isAdmin) {
      return res.status(401).json({ error: "User is not admin." });
    }

    const { name } = req.body;
    const { id } = req.params;

    let path;
    if (req.file) {
      path = req.file.filename;
    }

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(401).json({ error: "Category not exists!" });
    }

    await Category.update(
      {
        name,
        path,
      },
      { where: { id } },
    );

    return res.json({ id, name });
  }
}

export default new CategoryController();
