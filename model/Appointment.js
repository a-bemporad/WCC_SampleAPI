const { isDate } = require("moment");
const moment = require("moment");
const connection = require("../infra/connection");

class Appointment {
  listing(res) {
    const sql = `SELECT * FROM appointments`;
    connection.query(sql, (error, results) => {
      if (error) {
        res.status(400).json(error);
      }
      res.status(201).json(results);
    });
  }

  insert(appointment, res) {
    const sql = `INSERT INTO appointments SET ?`;
    const service_date = moment(appointment.service_date).format("YYYY-MM-DD");
    const appointment_date = moment().format("YYYY-MM-DD");

    const completeAppointment = {
      ...appointment,
      service_date,
      appointment_date,
    };
    //qual é o jeito certo de acessar as chaves de um objeto que está dentro de outro objeto, como nas linhas acima?
    const isDateValid = moment(completeAppointment.service_date).isSameOrAfter(
      completeAppointment.appointment_date
    );
    const isNameLongEnough = completeAppointment.client_name.length > 2;

    const validations = [
      {
        nome: "service_date",
        valid: isDateValid,
        message: "Appointment date must be equal or higher than today's date",
      },
      {
        nome: "client_name",
        valid: isNameLongEnough,
        message: "Name must be at least 2 characters long",
      },
    ];

    const errors = validations.filter((field) => !field.valid);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    connection.query(sql, completeAppointment, (error, results) => {
      if (error) {
        throw error;
      }
      console.log("insert", results);
    });
  }
}

module.exports = new Appointment();
