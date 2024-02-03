import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import { connectDb } from "./connectDb.js";
import { handleError } from "./middlewares/handleError.js";

// ? import routes
import { productRouter } from "./routes/product.routes.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(morgan("dev"));

// ? use routes
app.use("/api/products", productRouter);

// Error handling middleware
app.use(handleError);

async function main() {
  try {
    await connectDb();
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start the application:", err);
    process.exit(1);
  }
}

main();
