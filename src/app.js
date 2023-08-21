const express = require("express");
const app = express();
const PORT = 3000;

const indexRouter = require("./routes/index.routes");

app.use(express.json());
app.use("/", indexRouter.router);

app.listen(PORT, () => { console.log(`App listen in port ${PORT}`) })