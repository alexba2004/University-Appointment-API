import { DataTypes } from "sequelize";
import db from "../config/db.js";

const PersonalTitulacion = db.define(
  "PersonalTitulaciones",
  {
    numeroTrabajador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default PersonalTitulacion;
