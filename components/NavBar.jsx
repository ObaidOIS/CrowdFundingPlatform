import Link from "next/link";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const NavBar = ({ setCurrentPage }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountAddress, setAccountAddress] = useState(null);

  useEffect(() => {
    // Check if the user is logged in
    console.log("Checking if user is logged in");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const isLoggedIn = accessToken && refreshToken;
    setIsLoggedIn(isLoggedIn);
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = async () => {
    // Remove the access token and refresh token from local storage

    const response = await fetch("http://127.0.0.1:8000/api/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: localStorage.getItem("refreshToken") }),
    });
    if (response.ok) {
      console.log("Logout successful");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setIsLoggedIn(false);
    } else {
      console.log("Logout failed");
    }
  };

  async function connectWallet() {
    // Check if the browser has MetaMask installed
    if (typeof window.ethereum !== "undefined") {
      // Check if the provider is MetaMask
      if (window.ethereum.isMetaMask) {
        try {
          // Request account access
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccountAddress(accounts[0]);

          console.log("Connected account:", accountAddress);

          // You can now use the signer and provider for interacting with the Ethereum blockchain
        } catch (error) {
          console.error("User denied account access:", error);
        }
      } else {
        console.error("Please use MetaMask to connect your wallet.");
      }
    } else {
      console.error(
        "MetaMask is not installed. Please install MetaMask and try again."
      );
    }
  }

  return (
    <nav className={"navbar"}>
      <div>
        <h2 className={"brand"} onClick={() => handlePageChange("home")}>
          Web3.0 Crowd Funding Platform
        </h2>
      </div>
      <div className={"buttons"}>
        {!accountAddress ? (
          <button className={"connect-wallet"} onClick={() => connectWallet()}>
            Connect Wallet
          </button>
        ) : (
          <span className={"connect-wallet"}>
            {accountAddress.slice(0, 6)}...{accountAddress.slice(-4)}
          </span>
        )}
        {isLoggedIn ? (
          <button className={"logout"} onClick={() => handleLogout()}>
            Logout
          </button>
        ) : (
          <button className={"login"} onClick={() => handlePageChange("login")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
