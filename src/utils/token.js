import Cookies from "universal-cookie";

const cookie = new Cookies()
export const token = cookie.get("refresh token")

