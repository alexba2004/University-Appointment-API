import { exit } from "node:process";
import Cita from "../../models/cita.js";
import Egresado from "../../models/egresado.js";
import PersonalTitulacion from "../../models/personalTitulacion.js";
import seedCitas from "./citaSeed.js";
import seedEgresados from "./egresadoSeed.js";
import seedPersonal from "./personalSeed.js";
import db from "../../config/db.js";
import chalk from "chalk";

const importData = async () => {
  try {
    await db.authenticate();
    await db.sync();
    await Promise.all(await PersonalTitulacion.bulkCreate(seedPersonal), await Egresado.bulkCreate(seedEgresados), await Cita.bulkCreate(seedCitas));
    console.log(chalk.green("=====================================================================\nSe han importado los datos de las tablas catalogo de manera correcta\n====================================================================="));
    exit();
  } catch (error) {
    console.log(chalk.red(`=====================================================================\n${error}\n=====================================================================`));
    exit(1);
  }
};

if (process.argv[2] === "-i") {
  importData();
}
