import * as express from "express";

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/static/`));

app.get("/", (_, res) => {
  res.sendFile(`${__dirname}/static/index.html`);
});

app.listen(PORT, () => {
  console.log(`已搭建服务，请访问: http://localhost:${PORT}`);
});

app.post("/api/v1/login", () => {
  console.log("收到请求啦!!!");
});
