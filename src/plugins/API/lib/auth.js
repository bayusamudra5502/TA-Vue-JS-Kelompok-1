import axios from "axios";
import { RegisterError, LoginError, SessionError } from "../error/AuthError";

const BASE_URL = "http://demo-api-vue.sanbercloud.com/api/v2/auth";
const LOGIN_KEY = "login";

export async function register({ email, password, name, photo_profile }) {
  /**
   * Mendaftarkan user baru
   *
   * @param {Object} Objek - berisi key email, password, name, dan photo_profile
   * @returns {boolean}
   * @throws {RegisterError} - BIla terjadi gagal Register
   *
   * @example
   * const photo = this.$refs.photo.files[0];
   * const userObj = {email: "person@example.com", password: "password",
   *                  name: "Person", photo_profile: photo};
   *
   * this.$auth.login(userObj);
   */

  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("name", name);
  data.append("photo_profile", photo_profile);

  try {
    await axios.post(`${BASE_URL}/register`, data);
    return true;
  } catch (err) {
    throw new RegisterError("Gagal Mendaftarkan User", err);
  }
}

export async function login({ email, password }) {
  /**
   * Mendaftarkan user baru
   *
   * @param {Object} Objek - berisi key email dan password user
   * @returns {String} - Token user yang dilogin
   * @throws {LoginError} - BIla terjadi gagal Register
   *
   * @example
   * const userObj = {email: "person@example.com", password: "password"}
   * this.$auth.login(userObj);
   */

  const data = new FormData();
  data.append("email", email);
  data.append("password", password);

  try {
    const { data: responseData } = await axios.post(`${BASE_URL}/login`, data);

    const token = responseData["access_token"];
    const expires = responseData["expires_in"] * 1000 + new Date().getTime();

    const loginObj = {
      token,
      expires,
    };

    const loginSignature = JSON.stringify(loginObj);

    localStorage.setItem(LOGIN_KEY, btoa(loginSignature));

    return token;
  } catch (err) {
    throw new LoginError("Gagal login", err);
  }
}

export async function isLogged() {
  /**
   * Memeriksa keadaan session user saat ini
   *
   * @returns {Boolean} - True bila user masih memiliki Session
   *
   * @example
   * this.$auth.isLogged();
   */

  const loginSignature = localStorage.getItem(LOGIN_KEY);

  if (loginSignature) {
    const loginObj = JSON.parse(atob(loginSignature));
    try {
      const { status } = await axios({
        url: `${BASE_URL}/me`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${loginObj.token}`,
        },
      });

      return 200 <= status && status < 300;
    } catch {
      localStorage.removeItem(LOGIN_KEY);

      return false;
    }
  } else {
    return false;
  }
}

export async function getUserDetails(token = null) {
  /**
   * Mendapatkan detail user
   *
   * @returns {token} - Token user yang akan dicari (opsional)
   * @throws {Object} - Menghasilkan null bila terjadi kegagalan
   *
   * @example
   * this.$auth.getUserDetails();
   */

  const userToken = token ?? getCurrentToken();
  try {
    const { data } = await axios({
      url: `${BASE_URL}/me`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return data;
  } catch {
    return null;
  }
}

export async function logout() {
  /**
   * Melakukan proses logout
   *
   * @returns {Boolean} - True bila user berhasil keluar
   * @throws {SessionError} - Bila terjadi error pada proses ini
   *
   * @example
   * this.$auth.logout();
   */

  const loginSignature = localStorage.getItem(LOGIN_KEY);

  if (loginSignature) {
    const loginObj = JSON.parse(atob(loginSignature));

    try {
      const obj = await axios({
        url: `${BASE_URL}/logout`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${loginObj.token}`,
        },
      });

      if (200 <= obj.status && obj.status < 300) {
        localStorage.removeItem(LOGIN_KEY);

        return true;
      } else {
        throw Error(obj.data);
      }
    } catch (err) {
      throw new SessionError("Proses Logout gagal", err);
    }
  } else {
    return true;
  }
}

export async function getCurrentToken() {
  /**
   * Mendapatkan token user
   *
   * @returns {String | null} - Token user, jika gagal mengeluarkan null
   */

  if (isLogged()) {
    const loginSignature = localStorage.getItem(LOGIN_KEY);
    const { token } = JSON.parse(atob(loginSignature));

    return token;
  } else {
    return null;
  }
}

export default {
  register,
  login,
  isLogged,
  logout,
  getCurrentToken,
  getUserDetails,
};
