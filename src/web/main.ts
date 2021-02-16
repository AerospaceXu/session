import axios from "axios";

const registerBtn = document.querySelector("#register-btn");
const userNameInput = document.querySelector(
  "#user-name-input"
) as HTMLInputElement;
const userPasswordInput = document.querySelector(
  "#user-password-input"
) as HTMLInputElement;

const register = (userName: string, userPassword: string) => {
  axios.post("http://localhost:3000/api/v1/login", {
    userName,
    userPassword,
  });
};

registerBtn?.addEventListener("click", () => {
  register(userNameInput.value, userPasswordInput.value);
});
