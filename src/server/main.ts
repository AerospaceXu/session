import * as express from "express";
import * as bodyParser from "body-parser";

import loginController from "./controllers/login.controller";
import registerController from "./controllers/register.controller";

const PORT = 3000;
const BASE_URL = "/api/v1";

const app = express();

app.use(express.static(`${__dirname}/static/`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (_, res) => {
  res.sendFile(`${__dirname}/static/index.html`);
});
app.use(`${BASE_URL}/login`, loginController);
app.use(`${BASE_URL}/register`, registerController);

app.listen(PORT, () => {
  console.log(`已搭建服务，请访问: http://localhost:${PORT}`);
});
