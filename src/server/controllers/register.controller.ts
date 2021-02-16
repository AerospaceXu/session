import * as express from "express";

import { readDB } from "../utils/read-db";
import { writeDB } from "../utils/write-db";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userName, userPassword } = req.body;

  if (typeof userName !== "string" || typeof userPassword !== "string") {
    return res.json({ msg: "数据错误" });
  }

  try {
    const database = await readDB();
    const { users } = JSON.parse(database);
    if (Array.isArray(users)) {
      const currentUser = users.find((user) => user.userName === userName);
      if (currentUser) {
        return res.json({ msg: "用户已存在" });
      }
      const newUsers = {
        ...JSON.parse(database),
        users: [...users, { userName, userPassword }],
      };
      try {
        await writeDB(JSON.stringify(newUsers));
        return res.json({ msg: "注册成功" });
      } catch (e) {
        console.log(e);
        return res.json({ msg: e });
      }
    }
  } catch (err) {
    console.log(err);
    return res.json({ msg: err });
  }
});

export default router;
