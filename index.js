const configExpress = require("./config/configExpress");

//não precisa do const
app = configExpress();

app.listen(3000, () => console.log("Server is running in port 3000"));
