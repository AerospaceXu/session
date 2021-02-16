import * as express from "express";

import { readDB } from "../utils/read-db";
import { writeDB } from "../utils/write-db";

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
        if (user) {
          msg = "用户已存在";
        } else {
          const newUsers = {
            ...JSON.parse(database),
            users: [...users, { userName, userPassword }],
          };
          try {
            await writeDB(JSON.stringify(newUsers));
            msg = "注册成功";
            status = 1;
            currentUser = userName;
          } catch (e) {
            console.log(e);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
    return res.json({ msg, status, currentUser });
  }
});

export default router;
