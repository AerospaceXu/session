import axios from "axios";

const loginBtn = document.querySelector("#login-btn");
const loginUserNameInput = document.querySelector(
  ".login .user-name-input"
) as HTMLInputElement;
const loginUserPasswordInput = document.querySelector(
  ".login .user-password-input"
) as HTMLInputElement;

const registerBtn = document.querySelector("#register-btn");
const registerUserNameInput = document.querySelector(
  ".register .user-name-input"
) as HTMLInputElement;
const registerUserPasswordInput = document.querySelector(
  ".register .user-password-input"
) as HTMLInputElement;

const login = (userName: string, userPassword: string) => {
  axios.post("http://localhost:3000/api/v1/login", {
    userName,
    userPassword,
  });
};

const register = (userName: string, userPassword: string) => {
  axios.post("http://localhost:3000/api/v1/register", {
    userName,
    userPassword,
  });
};

loginBtn?.addEventListener("click", () => {
  login(loginUserNameInput.value, loginUserPasswordInput.value);
});

registerBtn?.addEventListener("click", () => {
  register(registerUserNameInput.value, registerUserPasswordInput.value);
});
