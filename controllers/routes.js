const Appointment = require("../model/Appointment");

module.exports = (app) => {
  app.get("/appointments", (req, res) => {
    Appointment.listing(res);
  });

  app.get("/appointments/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Appointment.listingById(id, res);
  });

  app.post("/appointments", (req, res) => {
    const appointment = req.body;

    Appointment.insert(appointment, res);
  });

  app.put("/appointments/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const appointment = req.body;

    Appointment.update(appointment, id, res);
  });

  app.delete("/appointments/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Appointment.delete(id, res);
  });
};
