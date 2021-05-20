class Tabelas {
  init(connection) {
    this.connection = connection;
    this.createAppointment();
  }

  createAppointment() {
    const sql = `
        CREATE TABLE IF NOT EXISTS appointments
        (id int NOT NULL AUTO_INCREMENT UNIQUE,
        client_name VARCHAR(50) NOT NULL,
        service VARCHAR(50) NOT NULL,
        status VARCHAR(20) NOT NULL,
        service_date DATE NOT NULL,
        appointment_date DATE NOT NULL,
        PRIMARY KEY(id))
        `;
    this.connection.query(sql, (error) => {
      if (error) {
        throw error;
      }
    });
  }
}

module.exports = new Tabelas();
