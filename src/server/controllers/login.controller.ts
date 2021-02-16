import * as express from "express";

import { readDB } from "../utils/read-db";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userName, userPassword } = req.body;

  let msg = "";
  let status = -1;
  let currentUser = "";

  if (typeof userName !== "string" || typeof userPassword !== "string") {
    msg = "数据错误";
  } else {
    try {
      const database = await readDB();
      const { users } = JSON.parse(database);
      if (Array.isArray(users)) {
        const user = users.find((user) => user.userName === userName);
        if (!user) {
          msg = "用户不存在";
        } else {
          if (user.userPassword === userPassword) {
            msg = "登陆成功";
            status = 1;
            currentUser = user.userName;
          } else {
            msg = "密码错误";
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return res.json({ msg, status, currentUser });
});

export default router;
