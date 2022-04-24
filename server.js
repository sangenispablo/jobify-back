import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

// manejo de errores centralizados
import "express-async-errors";

// db connection
import connectDB from "./db/connect.js";

// routes
import authRouter from "./routers/authRouters.js";
import authMaterias from "./routers/materiasRouter.js";

// middlewares
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/materias", authMaterias);

// creamos una ruta main para el / como prueba
app.get("/", (req, res) => {
  res.send("Welcome!");
});

// con esto manejo las rutas que no existen
app.use(notFoundMiddleware);
// con esto manejo los errores no controlados muy bueno
// lo unico raro es el lugar donde importa los middlewares
// si lo hago antes del app=express() no funciona !!
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const mongo_uri = process.env.MONGO_URI;

const start = async () => {
  try {
    await connectDB(mongo_uri);
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
