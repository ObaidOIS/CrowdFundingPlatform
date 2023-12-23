// HomePage.js
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/HomePage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // fetchCampaigns();
  }, []);

  // const fetchCampaigns = async () => {
  //   try {
  //     const response = await fetch("/api/campaigns"); // Replace with your Django backend endpoint
  //     const data = await response.json();
  //     setCampaigns(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <ToastContainer />
      <div className={styles.container}>
        <center>
          <h1 className={styles.h1}>Current Live Campaigns</h1>
        </center>
        <div className={styles["campaigns-list"]}>
          {campaigns.map((campaign) => (
            <Link href={`/campaign/${campaign.id}`} key={campaign.id}>
              <a className={styles["campaign-card"]}>
                <div className={styles.image}>
                  <img src={campaign.image} alt={campaign.title} />
                </div>
                <div className={styles.details}>
                  <h2>{campaign.title}</h2>
                  <p>{campaign.description}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
