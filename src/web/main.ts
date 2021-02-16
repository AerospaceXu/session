import axios from "axios";

const loginBtn = document.querySelector("#login-btn") as HTMLButtonElement;
const registerBtn = document.querySelector(
  "#register-btn"
) as HTMLButtonElement;

const userNameInput = document.querySelector(
  ".user-name-input"
) as HTMLInputElement;
const userPasswordInput = document.querySelector(
  ".user-password-input"
) as HTMLInputElement;

const login = async (userName: string, userPassword: string) => {
  return await axios.post("http://localhost:3000/api/v1/login", {
    userName,
    userPassword,
  });
};

const register = async (userName: string, userPassword: string) => {
  return await axios.post("http://localhost:3000/api/v1/register", {
    userName,
    userPassword,
  });
};

loginBtn.addEventListener("click", () => {
  login(userNameInput.value, userPasswordInput.value).then(
    (res) => {
      alert(res.data.msg);
    },
    (err) => {
      console.log(err);
    }
  );
});

registerBtn.addEventListener("click", () => {
  register(userNameInput.value, userPasswordInput.value).then((res) => {
    alert(res.data.msg);
  });
});
