import Egresado from "../models/egresado.js";
import Cita from "../models/cita.js";

const crearCitaController = async (req, res) => {
  const { fecha, hora, matricula } = req.body;

  try {
    const nuevaCita = await Cita.create({
      fecha,
      hora,
      egresadoMatricula: matricula,
    });

    res.render("egresados/consultarCita", { cita: nuevaCita });
  } catch (error) {
    console.error("Error al intentar crear la cita:", error);
    res.send('<script>alert("Error al crear la cita"); window.location.href = "/citas/consultar";</script>');
  }
};

const actualizarCita = async (req, res) => {
  const citaId = req.params.citaId;
  const { fecha, hora } = req.body;

  try {
    const cita = await Cita.findByPk(citaId);

    if (!cita) {
      return res.status(404).send('<script>alert("La cita no existe"); window.location.href = "/citas/consultar";</script>');
    }

    cita.fecha = fecha;
    cita.hora = hora;
    await cita.save();

    res.render("egresados/consultarCita", { cita });
  } catch (error) {
    console.error("Error al intentar editar la cita:", error);
    res.status(500).send('<script>alert("Error al editar la cita"); window.location.href = "/citas/consultar";</script>');
  }
};

const cargarFormularioEditarCita = async (req, res) => {
  try {
    const citaId = req.params.citaId;
    const cita = await Cita.findByPk(citaId);

    res.render("egresados/editarCita", { cita, citaId });
  } catch (error) {
    console.error("Error al cargar el formulario de edición de cita:", error);
    res.status(500).send("Error interno del servidor");
  }
};

const eliminarCitaController = async (req, res) => {
  const citaId = req.body.citaId;

  try {
    const cita = await Cita.findByPk(citaId);

    if (!cita) {
      return res.status(404).send("La cita no existe");
    }

    const egresadoMatricula = cita.egresadoMatricula;

    await cita.destroy();

    const egresado = await Egresado.findOne({
      where: {
        matricula: egresadoMatricula,
      },
    });

    if (egresado) {
      res.render("egresados/citas", { egresado });
    } else {
      res.send('<script>alert("Matrícula no encontrada"); window.location.href = "/citas";</script>');
    }
  } catch (error) {
    console.error("Error al eliminar la cita:", error);
    res.status(500).send("Hubo un error al eliminar la cita");
  }
};

export { crearCitaController, eliminarCitaController, actualizarCita, cargarFormularioEditarCita };
