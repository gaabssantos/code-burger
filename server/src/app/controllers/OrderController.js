import * as Yup from "yup";

import Product from "../models/Product";
import Category from "../models/Category";
import Order from "../schemas/Order";

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      products: Yup.array()
        .required()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          }),
        ),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const productsId = req.body.products.map((product) => product.id);

    const updatedProducts = await Product.findAll({
      where: {
        id: productsId,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    const editedProduct = updatedProducts.map((product) => {
      const quantityIndex = req.body.products.findIndex(
        (requestProduct) => requestProduct.id === product.id,
      );

      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category.name,
        url: product.url,
        quantity: req.body.products[quantityIndex].quantity,
      };

      return newProduct;
    });

    const order = {
      user: {
        id: req.userId,
        name: req.userName,
      },
      products: editedProduct,
      status: "Pedido realizado",
    };

    const orderSchema = await Order.create(order);

    return res.status(201).json(orderSchema);
  }

  async index(req, res) {
    const orders = await Order.find();

    return res.json(orders);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      status: Yup.string().required(),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { id } = req.params;
    const { status } = req.body;

    try {
      await Order.updateOne(
        {
          _id: id,
        },
        {
          status,
        },
      );
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    return res.json({ message: "Status was updated." });
  }
}

export default new OrderController();
