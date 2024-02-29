import Sequelize from "sequelize";
import mongoose from "mongoose";

import User from "../app/models/User";
import Product from "../app/models/Product";
import Category from "../app/models/Category";

import configDatabase from "../config/database";

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(configDatabase.url);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://mongo:-gEbAa4bH5AaEA3hcfcGFdc4C1-4Dgaa@viaduct.proxy.rlwy.net:28244",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
  }
}

export default new Database();
