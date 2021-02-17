import app from "../app";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`已搭建服务，请访问: http://localhost:${PORT}`);
});
