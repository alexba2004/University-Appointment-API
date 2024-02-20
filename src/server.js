import express, { urlencoded } from "express";
import db from "./config/db.js";
import dotenv from "dotenv";
import "../src/config/initialize.js";
import chalk from "chalk";
import citaRoutes from "./routes/citaRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import personalRoutes from "./routes/personalRoutes.js";

const app = express();

dotenv.config({
  path: "src/.env",
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./src/public"));

app.set("view engine", "ejs");
app.set("views", "./src/views");

db.authenticate()
  .then(() => {
    console.log(chalk.green("============================================================="));
    console.log(chalk.green("Conexión a la base de datos establecida con éxito"));
    console.log(chalk.green("============================================================="));

    return db.sync();
  })
  .then(() => {
    console.log(chalk.green("============================================================="));
    console.log(chalk.green("Se han sincronizado las tablas existentes en la base de datos"));
    console.log(chalk.green("============================================================="));
  })
  .catch((error) => {
    console.error(chalk.red("============================================================="));
    console.error(chalk.red("Error al conectar a la base de datos:", error));
    console.error(chalk.red("============================================================="));
  });

app.use("/citas", citaRoutes);
app.use("/citas", loginRoutes);
app.use("/citas", personalRoutes);

// Iniciar el servicio HTTP
app.listen(process.env.SERVER_PORT, () => {
  console.log(chalk.green("=========================[DATA BASE]========================="));
  console.log(chalk.green("El servicio HTTP ha sido iniciado"));
  console.log(chalk.green("============================================================="));
  console.log(chalk.green(`El servicio está escuchando en el puerto: ${process.env.SERVER_PORT}`));
  console.log(chalk.green("============================================================="));
});

export default app;
