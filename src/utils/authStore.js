import Cookies from "js-cookie";
import { createStore } from "solid-js/store";

const [authState, setAuthState] = createStore({
  isAuthenticated: !!Cookies.get("session"),
});

const [userStatus, setUserStatus] = createStore({
  status: Cookies.get("role"),
});

const login = (token, role) => {
  setAuthState({ isAuthenticated: true });

  Cookies.set("session", token, { expires: 3 });
  Cookies.set("role", role, { expires: 3 });
};

const logout = () => {
  setAuthState({ isAuthenticated: false });

  Cookies.remove("csrftoken");
  Cookies.remove("session");
  Cookies.remove("role");
  Cookies.remove("sessionid");
};

export { userStatus, authState, login, logout };
