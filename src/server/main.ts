import * as express from "express";
import * as bodyParser from "body-parser";

import { readDB } from "./utils/read-db";

const app = express();
const PORT = 3000;

const router = express.Router();

app.use(express.static(`${__dirname}/static/`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (_, res) => {
  res.sendFile(`${__dirname}/static/index.html`);
});

app.listen(PORT, () => {
  console.log(`已搭建服务，请访问: http://localhost:${PORT}`);
});

app.post("/api/v1/login", async (req, res) => {
  const { userName, userPassword } = req.body;

  if (typeof userName !== "string" || typeof userPassword !== "string") {
    res.statusCode = 403;
    return res.json({});
  }

  try {
    const database = await readDB();
    const { users } = JSON.parse(database);
    if (Array.isArray(users)) {
      const currentUser = users.find((user) => user.userName === userName);
      if (!currentUser) {
        res.statusCode = 403;
        return res.json({ msg: "用户不存在" });
      }
      if (currentUser.userPassword === userPassword) {
        res.statusCode = 200;
        return res.json({ msg: "登陆成功" });
      } else {
        res.statusCode = 403;
        return res.json({ msg: "密码错误" });
      }
    }
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    return res.json({ msg: err });
  }
});