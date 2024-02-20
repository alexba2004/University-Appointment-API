import Cita from "../models/cita.js";
import Egresado from "../models/egresado.js";
import PersonalTitulacion from "../models/personalTitulacion.js";

const aministrarCitasController = async (req, res) => {
  try {
    // Obtener todas las citas ordenadas por fecha y hora de manera cronológica
    const citas = await Cita.findAll({
      order: [
        ["fecha", "ASC"],
        ["hora", "ASC"],
      ],
    });

    // Renderizar la vista de citas con los datos obtenidos
    res.render("personalTitulacion/administrarCitas", { citas });
  } catch (error) {
    console.error("Error al obtener las citas:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Controlador para mostrar el formulario de edición de cita
const mostrarFormularioEditarCita = async (req, res) => {
  try {
    const citaId = req.params.id; // Obtener el ID de la cita de los parámetros de la URL
    const cita = await Cita.findByPk(citaId); // Buscar la cita por su ID en la base de datos

    if (!cita) {
      // Si no se encuentra la cita, enviar un mensaje de error
      return res.status(404).send("Cita no encontrada");
    }

    // Renderizar la vista de formulario de edición de cita con los datos de la cita
    res.render("personalTitulacion/personalEditarCita", { cita });
  } catch (error) {
    console.error("Error al mostrar formulario de edición de cita:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Controlador para procesar la solicitud de edición de cita
const personalEditarCita = async (req, res) => {
  try {
    const citaId = req.params.id; // Obtener el ID de la cita de los parámetros de la URL
    const { fecha, hora } = req.body; // Obtener los nuevos datos de la cita del cuerpo de la solicitud

    // Actualizar la cita en la base de datos
    await Cita.update(
      { fecha, hora },
      {
        where: {
          id: citaId,
        },
      }
    );

    // Redirigir a la página de administración de citas después de la edición
    res.redirect("/citas/administrarCitas");
  } catch (error) {
    console.error("Error al editar la cita:", error);
    res.status(500).send("Error interno del servidor");
  }
};

const personalEliminarCita = async (req, res) => {
  try {
    const citaId = req.params.id; // Obtener el ID de la cita de los parámetros de la URL

    // Eliminar la cita de la base de datos
    await Cita.destroy({
      where: {
        id: citaId,
      },
    });

    // Redirigir a la página de administración de citas después de la eliminación
    res.redirect("/citas/administrarCitas");
  } catch (error) {
    console.error("Error al eliminar la cita:", error);
    res.status(500).send("Error interno del servidor");
  }
};

const administrarUsuariosController = async (req, res) => {
  try {
    // Obtener todos los egresados
    const egresados = await Egresado.findAll();

    // Obtener todo el personal de titulación
    const personal = await PersonalTitulacion.findAll();

    // Renderizar la vista de administración de usuarios con los datos obtenidos
    res.render("personalTitulacion/administrarUsuarios", { egresados, personal });
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Controlador para mostrar el formulario de edición de egresados
const mostrarFormularioEditarEgresado = async (req, res) => {
  try {
    const matricula = req.params.matricula; // Obtener la matrícula del egresado de los parámetros de la URL
    const egresado = await Egresado.findByPk(matricula); // Buscar el egresado por su matrícula en la base de datos

    if (!egresado) {
      // Si no se encuentra el egresado, enviar un mensaje de error
      return res.status(404).send("Egresado no encontrado");
    }

    // Renderizar la vista de formulario de edición de egresado con los datos del egresado
    res.render("personalTitulacion/editarEgresados", { egresado });
  } catch (error) {
    console.error("Error al mostrar formulario de edición de egresado:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Controlador para procesar la solicitud de edición de egresado
const editarEgresado = async (req, res) => {
  try {
    const matricula = req.params.matricula; // Obtener la matrícula del egresado de los parámetros de la URL
    const { nombre, nivelTitulacion, generacion, carreraTitulacion, curp, correo, telefono } = req.body; // Obtener los nuevos datos del egresado del cuerpo de la solicitud

    // Actualizar los datos del egresado en la base de datos
    await Egresado.update(
      { nombre, nivelTitulacion, generacion, carreraTitulacion, curp, correo, telefono },
      {
        where: {
          matricula: matricula,
        },
      }
    );

    // Redirigir a la página de administración de egresados después de la edición
    res.redirect("/citas/administrarUsuarios");
  } catch (error) {
    console.error("Error al editar el egresado:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Controlador para eliminar un egresado
const eliminarEgresado = async (req, res) => {
  try {
    const matricula = req.params.matricula; // Obtener la matrícula del egresado de los parámetros de la URL

    // Verificar si el egresado tiene citas asociadas
    const citasAsociadas = await Cita.findAll({
      where: {
        egresadoMatricula: matricula,
      },
    });

    // Si el egresado tiene citas asociadas, eliminar las citas primero
    if (citasAsociadas.length > 0) {
      await Cita.destroy({
        where: {
          egresadoMatricula: matricula,
        },
      });
    }

    // Eliminar el egresado de la base de datos
    await Egresado.destroy({
      where: {
        matricula: matricula,
      },
    });

    // Redirigir a alguna página después de eliminar el egresado (por ejemplo, a la lista de egresados)
    res.redirect("/citas/administrarUsuarios");
  } catch (error) {
    console.error("Error al eliminar el egresado:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Controlador para mostrar el formulario de edición de personal de titulación
const mostrarFormularioEditarPersonal = async (req, res) => {
  try {
    const { numeroTrabajador } = req.params; // Obtener el número de trabajador de los parámetros de la URL
    const personal = await PersonalTitulacion.findByPk(numeroTrabajador); // Buscar el personal por su número de trabajador en la base de datos

    if (!personal) {
      // Si no se encuentra el personal, enviar un mensaje de error
      return res.status(404).send("Personal no encontrado");
    }

    // Renderizar la vista de formulario de edición de personal con los datos del personal
    res.render("personalTitulacion/editarPersonal", { personal });
  } catch (error) {
    console.error("Error al mostrar formulario de edición de personal:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Controlador para procesar la solicitud de edición de personal de titulación
const editarPersonal = async (req, res) => {
  try {
    const { nuevoNumeroTrabajador, nombre } = req.body; // Obtener los nuevos datos del personal del cuerpo de la solicitud

    // Verificar si se ha proporcionado un nuevo número de trabajador
    if (nuevoNumeroTrabajador) {
      // Actualizar el número de trabajador en la cita asociada antes de actualizar el personal
      await Cita.update(
        { egresadoMatricula: nuevoNumeroTrabajador },
        {
          where: {
            egresadoMatricula: req.params.numeroTrabajador,
          },
        }
      );
    }

    // Actualizar el nombre del personal en la base de datos
    await PersonalTitulacion.update(
      { numeroTrabajador: nuevoNumeroTrabajador, nombre },
      {
        where: {
          numeroTrabajador: req.params.numeroTrabajador,
        },
      }
    );

    // Redirigir a la página de administración de personal después de la edición
    res.redirect("/citas/administrarUsuarios");
  } catch (error) {
    console.error("Error al editar el personal:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Controlador para procesar la solicitud de eliminación de personal
const eliminarPersonal = async (req, res) => {
  try {
    const numeroTrabajador = req.params.numeroTrabajador; // Obtener el número de trabajador de los parámetros de la URL

    // Buscar el personal por su número de trabajador
    const personal = await PersonalTitulacion.findOne({
      where: {
        numeroTrabajador: numeroTrabajador,
      },
    });

    if (!personal) {
      // Si no se encuentra el personal, enviar un mensaje de error
      return res.status(404).send("Personal no encontrado");
    }

    // Eliminar el personal de la base de datos
    await PersonalTitulacion.destroy({
      where: {
        numeroTrabajador: numeroTrabajador,
      },
    });

    // Redirigir a la página de administración de personal después de la eliminación
    res.redirect("/citas/administrarUsuarios");
  } catch (error) {
    console.error("Error al eliminar el personal:", error);
    res.status(500).send("Error interno del servidor");
  }
};

const agregarNuevoEgresado = async (req, res) => {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { nombre, nivelTitulacion, generacion, carreraTitulacion, curp, correo, telefono } = req.body;

    // Crear un nuevo egresado con los datos proporcionados
    const nuevoEgresado = await Egresado.create({
      nombre,
      nivelTitulacion,
      generacion,
      carreraTitulacion,
      curp,
      correo,
      telefono,
    });

    // Redirigir a alguna página después de agregar exitosamente el egresado
    res.redirect("/citas/egresados/agregar"); // Por ejemplo, redirigir a la página principal de egresados
  } catch (error) {
    console.error("Error al agregar nuevo egresado:", error);
    res.status(500).send("Error interno del servidor");
  }
};

const renderAgregarEgresado = (req, res) => {
  try {
    // Renderizar la vista para agregar un nuevo egresado
    res.render("personalTitulacion/agregarEgresados");
  } catch (error) {
    console.error("Error al renderizar la vista para agregar egresados:", error);
    res.status(500).send("Error interno del servidor");
  }
};

const renderAgregarPersonal = (req, res) => {
  try {
    res.render("personalTitulacion/agregarPersonal");
  } catch (error) {
    console.error("Error al renderizar formulario de agregar personal:", error);
    res.status(500).send("Error interno del servidor");
  }
};

const registrarPersonal = async (req, res) => {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { numeroTrabajador, nombre } = req.body;

    // Guardar los datos en la base de datos
    await PersonalTitulacion.create({
      numeroTrabajador,
      nombre,
    });

    // Redireccionar a la página principal o a donde prefieras
    res.redirect("/citas/personal/agregar"); // Por ejemplo, redirecciona a la página principal
  } catch (error) {
    console.error("Error al registrar nuevo personal:", error);
    res.status(500).send("Error interno del servidor");
  }
};
export { aministrarCitasController, mostrarFormularioEditarCita, personalEditarCita, personalEliminarCita, administrarUsuariosController, mostrarFormularioEditarEgresado, editarEgresado, eliminarEgresado, mostrarFormularioEditarPersonal, editarPersonal, eliminarPersonal, agregarNuevoEgresado, renderAgregarEgresado, renderAgregarPersonal, registrarPersonal };
