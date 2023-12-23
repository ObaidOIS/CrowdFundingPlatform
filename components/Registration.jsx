import { useState } from "react";
import styles from "../styles/Registration.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = ({ setCurrentPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [cnic, setCnic] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form inputs
    if (!username || !password || !name || !email) {
      setError("Please fill in all required fields");
      return;
    }

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone_num", phoneNum);
      formData.append("CNIC", cnic);
      formData.append("profile_picture", profilePicture);

      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        body: formData,
      });

      let response1 = await response.json();
      console.log("response", response1);
      if (response1.status === "success") {
        // Registration successful
        toast.success("Registration successful");
        setTimeout(() => {
          handlePageChange("login");
        }, 3000);
      } else {
        // Registration failed
        toast.error("Registration failed");
        // toast.error("Username and email must be unique");
        let message = response1.message;
        console.log("message", message);
        if (message) {
          Object.keys(message).forEach((field) => {
            message[field].forEach((error) => {
              toast.error(error);
            });
          });
        }
        // toast.error(response1.message.code);
        setError("Registration failed");
      }
    } catch (error) {
      // Handle network or other errors
      console.log(error);
      console.log("Registration failed");
      toast.error("Registration failed");
      toast.error("An error occurred during registration");
      setError("Registration failed");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.container}>
        <h2 className={styles.title}>Registration</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <label className={styles.label}>Username:</label>
            <input
              className={styles.input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.label}>Password:</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.label}>Full Name:</label>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.label}>Email:</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.label}>Phone Number:</label>
            <input
              className={styles.input}
              type="tel"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.label}>CNIC:</label>
            <input
              className={styles.input}
              type="text"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
            />
          </div>
          {/* <div className={styles.form_group}>
          <label className={styles.label}>Bio:</label>
          <input
            className={styles.input}
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className={styles.form_group}>
          <label className={styles.label}>Location:</label>
          <input
            className={styles.input}
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div> */}
          <div className={styles.form_group}>
            <label className={styles.label}>Profile Picture:</label>
            <input
              className={styles.input}
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />
          </div>
          <button className={styles.button} type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Registration;
