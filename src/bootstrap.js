import { connectDB } from "./DB/db.connection.js";
import userModel from "./DB/models/user.model.js"
import authRouter from "./modules/auth/auth.controller.js"
import { globalErrorHandler } from ".//utils/responses/error.response.js"

export const bootstrap = async (express, app) => {
  app.use(express.json());
  await connectDB()

  app.use(express.json())
  
  app.use("/users", authRouter)

  
  app.all("/*all", (req, res) => {
  return res
      .status(404)
      .json({ success: false, message: "this route does not exist" });
  });

  app.use(globalErrorHandler);
};
