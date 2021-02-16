import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";

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

const loginAndRegisterCard = document.querySelector(
  ".login-register"
) as HTMLDivElement;
const loginStatus = document.querySelector(".login-status") as HTMLDivElement;
const welcomeMessages = document.querySelector(
  ".welcome-messages"
) as HTMLHeadingElement;

const login = async (userName: string, userPassword: string) => {
  return await axios.post(`${BASE_URL}/login`, {
    userName,
    userPassword,
  });
};

const register = async (userName: string, userPassword: string) => {
  return await axios.post(`${BASE_URL}/register`, {
    userName,
    userPassword,
  });
};

loginBtn.addEventListener("click", () => {
  login(userNameInput.value, userPasswordInput.value).then((res) => {
    const { msg, status, currentUser } = res.data;
    handleLoginAndJump(status, msg, currentUser);
  });
});

registerBtn.addEventListener("click", () => {
  register(userNameInput.value, userPasswordInput.value).then((res) => {
    const { msg, status, currentUser } = res.data;
    handleLoginAndJump(status, msg, currentUser);
  });
});

const handleLoginAndJump = (status: number, msg: string, userName: string) => {
  if (status !== 1) {
    loginStatus.textContent = msg;
  } else {
    loginAndRegisterCard.style.display = "none";
    welcomeMessages.style.display = "block";
    welcomeMessages.textContent = `欢迎你，${userName}`;
    alert(msg);
  }
};
