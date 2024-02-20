import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Egresado = db.define(
  "Egresados",
  {
    matricula: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nivelTitulacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    generacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carreraTitulacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    curp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      unique: true,
    },
    telefono: {
      type: DataTypes.BIGINT,
    },
  },
  { timestamps: true }
);

export default Egresado;
