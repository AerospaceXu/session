import * as express from "express";
import * as bodyParser from "body-parser";

import loginController from "./controllers/login.controller";

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/static/`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (_, res) => {
  res.sendFile(`${__dirname}/static/index.html`);
});
app.use("/api/v1/login", loginController);

app.listen(PORT, () => {
  console.log(`已搭建服务，请访问: http://localhost:${PORT}`);
});
