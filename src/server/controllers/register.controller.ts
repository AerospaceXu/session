import * as express from "express";

import { readDB } from "../utils/read-db";
import { writeDB } from "../utils/write-db";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userName, userPassword } = req.body;

  if (typeof userName !== "string" || typeof userPassword !== "string") {
    res.statusCode = 403;
    return res.json({ msg: "数据错误" });
  }

  try {
    const database = await readDB();
    const { users } = JSON.parse(database);
    if (Array.isArray(users)) {
      const currentUser = users.find((user) => user.userName === userName);
      if (currentUser) {
        res.statusCode = 403;
        return res.json({ msg: "用户已存在" });
      }
      const newUsers = {
        ...JSON.parse(database),
        users: [...users, { userName, userPassword }],
      };
      try {
        await writeDB(JSON.stringify(newUsers));
        res.statusCode = 200;
        return res.json({ msg: "注册成功" });
      } catch (e) {
        console.log(e);
        res.statusCode = 500;
        return res.json({ msg: e });
      }
    }
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    return res.json({ msg: err });
  }
});

export default router;
