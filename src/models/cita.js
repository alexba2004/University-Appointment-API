import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Egresado from "./egresado.js";

const Cita = db.define(
  "Citas",
  {
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    egresadoMatricula: {
      type: DataTypes.INTEGER, // Tipo debe coincidir con el tipo de matrícula en el modelo de Egresado
      allowNull: false,
      references: {
        model: Egresado,
        key: "matricula",
        onDelete: "CASCADE",
      },
    },
  },
  { timestamps: true }
);

// Define la relación entre Cita y Egresado
Cita.belongsTo(Egresado, {
  foreignKey: "egresadoMatricula",
  targetKey: "matricula",
});

export default Cita;
