import express from "express";
import { crearCitaController, eliminarCitaController, cargarFormularioEditarCita, actualizarCita } from "../controllers/citaController.js";

const router = express.Router();

// Ruta para la página de inicio de sesión
router.get("/login", (request, response) => response.render("login.ejs"));

// Ruta para crear una cita
router.post("/consultar", crearCitaController);

// Ruta para cargar el formulario de edición de cita
router.get("/editar/:citaId", cargarFormularioEditarCita);

// Ruta para actualizar la cita en la base de datos
router.post("/actualizar/:citaId", actualizarCita);

// Ruta para eliminar una cita
router.post("/eliminar", eliminarCitaController);

// Ruta para la página de consultar cita
router.get("/consultar/:citaId", (request, response) => response.render("consultarCita.ejs"));

export default router;
