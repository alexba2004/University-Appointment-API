import Egresado from "./egresado.js";
import Cita from "./cita.js";

Egresado.hasOne(Cita, { foreignKey: "egresadoMatricula", onDelete: "CASCADE" });
Cita.belongsTo(Egresado, { foreignKey: "egresadoMatricula", onDelete: "CASCADE" });

export { Egresado, Cita };
