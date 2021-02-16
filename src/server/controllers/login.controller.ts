import * as express from "express";

import { readDB } from "../utils/read-db";

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
      if (!currentUser) {
        return res.json({ msg: "用户不存在" });
      }
      if (currentUser.userPassword === userPassword) {
        return res.json({ msg: "登陆成功" });
      } else {
        return res.json({ msg: "密码错误" });
      }
    }
  } catch (err) {
    console.log(err);
    return res.json({ msg: err });
  }
});

export default router;
