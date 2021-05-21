const Appointment = require("../model/Appointment");

module.exports = (app) => {
  app.get("/appointments", (req, res) => {
    Appointment.listing(res);
  });

  app.post("/appointments", (req, res) => {
    const appointment = req.body;

    Appointment.insert(appointment, res);
  });
};
