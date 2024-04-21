import Cookies from "universal-cookie";

export const signin = async (username, password) => {
    try {
      const cookies = new Cookies();
      const response = await fetch("http://localhost:8080/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify({ role: data.role[0], username: data.username })); // Store as an object
        cookies.set("refresh token", data.refreshToken);
        return true;
      } else {
        console.error(`Failed to sign in. Status: ${response.status}`);
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  
export const signup = async (
  username,
  email,
  currentPassword,
  confirmPassword
) => {};
export const logout = async () => {};
