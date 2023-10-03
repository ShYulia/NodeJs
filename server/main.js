const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");
const loginRouter = require("./routers/loginRouter");
const employeesRouter = require("./routers/employeesRouter.js");
const shiftsRouter = require("./routers/shiftsRouter");
const usersRouter = require("./routers/usersRouter");
const departmentsRouter = require('./routers/departmentsRouter')

const port = 8080;
const app = express();
connectDB();

  app.use(cors());
app.use(express.json());

//routers
app.use("/login", loginRouter);
app.use("/employees", employeesRouter);
app.use("/shifts", shiftsRouter);
app.use("/departments", departmentsRouter);
 app.use("/users", usersRouter);
app.listen(port, () => console.log(`App is listening on port ${port}`));
