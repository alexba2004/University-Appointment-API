import Egresado from "../models/egresado.js";
import PersonalTitulacion from "../models/personalTitulacion.js"; // Asumiendo que el modelo se llama personalTitulacion.js
import Cita from "../models/cita.js"; // Importa el modelo de Cita

const loginController = async (req, res) => {
  const { numeroIdentificacion } = req.body;

  try {
    // Determinar si el input es un número de identificación o un número de trabajador
    const isMatricula = numeroIdentificacion.length === 6; // Assumimos que un número de identificación tiene 6 caracteres

    if (isMatricula) {
      // Buscar en la tabla de Egresados utilizando el número de identificación
      const egresado = await Egresado.findOne({
        where: {
          matricula: numeroIdentificacion,
        },
      });

      if (egresado) {
        // Si se encuentra en la tabla de Egresados, verificar si tiene una cita
        const cita = await Cita.findOne({
          where: {
            egresadoMatricula: numeroIdentificacion,
          },
        });

        if (cita) {
          // Si tiene una cita asignada, redirigirlo a la vista de consultar cita
          res.render("egresados/consultarCita", { cita });
          return;
        }

        // Si no tiene una cita asignada, renderizar la vista de egresados
        res.render("egresados/citas", { egresado });
        return;
      }
    } else {
      // Buscar en la tabla de PersonalTitulaciones utilizando el número de trabajador
      const personal = await PersonalTitulacion.findOne({
        where: {
          numeroTrabajador: numeroIdentificacion,
        },
      });

      if (personal) {
        // Si se encuentra en la tabla de PersonalTitulaciones, renderizar la vista de personal titulación
        res.render("personalTitulacion/dashboardUsuarios", { personal });
        return;
      }
    }

    // Si no se encuentra en ninguna tabla, mostrar un mensaje de error
    res.send('<script>alert("Número de identificación no encontrado"); window.location.href = "/citas/login";</script>');
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export { loginController };
