import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.post("/", (req, res) => {
  console.log(req);
  res.json({ msg: "data sent", data: req.body });
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 5100;
app.listen(port, () => {
  console.log(`server running on PORT ${port}....`);
});
