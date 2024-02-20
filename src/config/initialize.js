import chalk from "chalk";
import Cita from "../models/cita.js";
import Egresado from "../models/egresado.js";
import PersonalTitulacion from "../models/personalTitulacion.js";
import { Egresado as EgresadoModel, Cita as CitaModel } from "../models/relationships.js";

const initializeApp = async () => {
  try {
    // Prueba de conexión a la base de datos
    await bd.authenticate();
    console.log(chalk.green("============================================================="));
    console.log(chalk.green("Conexión a la base de datos establecida con éxito."));
    console.log(chalk.green("============================================================="));

    // Verifica si la base de datos está vacía
    const tables = await bd.query(`SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA = '${bd.config.database}'`, { type: bd.QueryTypes.SELECT });

    if (tables && tables.length === 0) {
      // La base de datos está vacía, crea las tablas
      await Cita.sync();
      await Egresado.sync();
      await PersonalTitulacion.sync();

      console.log(chalk.green("============================================================="));
      console.log(chalk.green("Tablas y relaciones creadas correctamente."));
      console.log(chalk.green("============================================================="));
    } else {
      console.log(chalk.green("============================================================="));
      console.log(chalk.green("La base de datos ya contiene tablas. No se realizaron cambios."));
      console.log(chalk.green("============================================================="));
    }
  } catch (error) {
    console.error("Error al verificar o crear tablas:", error);
  } finally {
    try {
      console.log(chalk.green("============================================================="));
      console.log(chalk.green("Conexión cerrada correctamente."));
      console.log(chalk.green("============================================================="));
    } catch (closeError) {
      console.log(chalk.red("============================================================="));
      console.error(chalk.red("Error al cerrar la conexión:", closeError));
      console.log(chalk.red("============================================================="));
    }
  }
};

// Llama a la función de inicialización
initializeApp();
export default initializeApp;
