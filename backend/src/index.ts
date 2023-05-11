import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { expenseRoutes } from "./routes/expenseRoutes";


const app = express();
const port = process.env.PORT || 80;

app.use(cors());
app.use(bodyParser.json());

app.use("/expenses", expenseRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
