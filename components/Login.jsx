import { useState } from "react";
import styles from "../styles/Login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setCurrentPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Save the access token and refresh token in local storage or session storage
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);

        // Perform any additional actions on successful login, e.g., redirect to another page
        console.log("Login successful");

        handlePageChange("home");
      } else {
        toast.error("Login failed");
        toast.error("Invalid username or password");
        setError("Invalid username or password");
      }
    } catch (error) {
      toast.error("connection error");
      setError("An error occurred during login");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.container}>
        <center>
          <h2 className={styles.title}>Login</h2>
        </center>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.form_div}>
            <div>
              <label className={styles.label}>Username:</label>
              <input
                className={styles.input}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className={styles.label}>Password: </label>
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.button_div}>
            <button className={styles.button_login} type="submit">
              Login
            </button>
            <button
              className={styles.button_Register}
              onClick={() => handlePageChange("register")}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
