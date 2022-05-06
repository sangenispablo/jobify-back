// import cors from "cors";
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

// manejo de errores centralizados
import "express-async-errors";

// morgan para mostrar que hacer el servidor pero solo en dev
import morgan from "morgan";

// db connection
import connectDB from "./db/connect.js";

// routes
import authRouter from "./routers/authRouters.js";
import jobsRouter from "./routers/jobsRoutes.js";

// middlewares
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

// activo morgan solo en modo NO Production
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// app.use(cors());
app.use(express.json());

// creamos una ruta main para el / como prueba
app.get("/", (req, res) => {
  res.json({ msg: "Bienvenido a mi API!" });
});

// creamos una ruta main para el /api/v1 para prueba tambien
app.post("/api/v1/pruebapost", (req, res) => {
  console.log(req.body);
  res.json({ msg: "Welcome to my API!", valor: 123 });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

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
