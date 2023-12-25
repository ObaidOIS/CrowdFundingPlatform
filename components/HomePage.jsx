// HomePage.js
import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import styles from '../styles/HomePage.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Createcharity from './Createcharity';
import { CrowdContext } from '../Context/CrowdContext';
import UserCharity from './UserCharity';
import Landingpage from './Landingpage';
const HomePage = () => {
	const { isLoggedIn, accountAddress, connectWallet } =
		useContext(CrowdContext);
	useEffect(() => {
		if (!accountAddress) {
			try {
				connectWallet();
			} catch (error) {
				// toast.error('Please connect wallet first');
			}
		}
	}, []);

	return (
		<>
			<ToastContainer />
			<div>
				{/* <center>
					<h1 className={styles.h1}>Create your Campaigns</h1>
				</center> */}
				<center>
					{isLoggedIn ? (
						<>
							<Createcharity />
							{/* <UserCharity /> */}
						</>
					) : (
						<Landingpage />
					)}
					{/* {accountAddress ? (
						<>
							<h1 className={styles.h1}>Your Account Address is: </h1>
							<h1 className={styles.h1}>{accountAddress}</h1>
						</>
					) : (
						''
					)} */}
				</center>
			</div>
		</>
	);
};

export default HomePage;
