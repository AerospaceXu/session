import * as express from "express";

import { readDB } from "../utils/read-db";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const database = await readDB();
    const { users, sessions } = JSON.parse(database);
    if (Array.isArray(users)) {
      const cookie = req.headers.cookie
        ?.split("; ")
        .find((c) => c.startsWith("session_id="));
      console.log(cookie);

      if (!cookie) {
        return res.json({ status: -1 });
      }
      const equalIndex = Array.from(cookie).findIndex((item) => item === "=");
      const sessionId = cookie.slice(equalIndex + 1);
      const loginUserName = sessions[sessionId];
      const user = users.find((user) => user.userName === loginUserName);
      if (user) {
        return res.json({ userName: user.userName, status: 1 });
      }
    }
  } catch (error) {
    console.log(error);
  }
  return res.json({ status: -1 });
});

export default router;
