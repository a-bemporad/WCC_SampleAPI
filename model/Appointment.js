const moment = require("moment");
const connection = require("../infra/connection");

class Appointment {
  listing(res) {
    const sql = `SELECT * FROM appointments`;
    connection.query(sql, (errors, results) => {
      if (errors) {
        res.status(400).json(errors);
      }
      res.status(201).json(results);
    });
  }

  listingById(id, res) {
    const sql = `SELECT * FROM appointments WHERE id = ?`;

    connection.query(sql, id, (errors, results) => {
      if (errors) {
        res.status(400).json(errors);
      }
      res.status(201).json(results);
    });
  }

  update(newAppointment, id, res) {
    const sql = `UPDATE appointments SET ? WHERE id = ?`;

    if (newAppointment.service_date) {
      newAppointment.service_date = moment(newAppointment.service_date).format(
        "YYYY-MM-DD"
      );
    }
    connection.query(sql, [newAppointment, id], (errors, results) => {
      if (errors) {
        res.status(400).json(errors);
      }
      res.status(200).json({ message: "success!", results });
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
      return res.status(400).json(errorss);
    }

    connection.query(sql, completeAppointment, (errors, results) => {
      if (errors) {
        throw errors;
      }
      res.status(201).json({ message: "success!", results });
    });
  }

  delete(id, res) {
    const sql = `DELETE FROM appointments WHERE id = ?`;

    connection.query(sql, id, (errors, results) => {
      if (errors) {
        res.status(400).json(errors);
      }
      res.status(200).json({ message: "success!", results });
    });
  }
}

module.exports = new Appointment();
