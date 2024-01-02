// HomePage.js
import { useEffect, useState, useContext } from 'react';
import styles from '../styles/HomePage.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CrowdContext } from '../Context/CrowdContext';
import { ethers } from 'ethers';
const Createcharity = () => {
	const [name, setName] = useState('');
	const [goalAmount, setGoalAmount] = useState('');
	const [duration, setDuration] = useState('');
	const { CContract, accountAddress } = useContext(CrowdContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name || !goalAmount || !duration) {
			toast.error('Please fill in all fields');
			return;
		}
		try {
			const durationInSeconds = parseInt(duration) * 24 * 60 * 60;
			try {
				const tx = CContract.createCharity(name, goalAmount, durationInSeconds);
				tx.wait();
				toast.success('Charity created successfully!');
			} catch (error) {
				console.error('user rejected transaction', error);
				// toast.error('Error creating charity. Please try again.');
				// toast.error('transaction canceled!');
			}

			// ;
			// console.log(tx);

			// Wait for the transaction to be mined
			// await tx.wait();
		} catch (error) {
			console.error('Error creating charity:', error);
			// toast.error('Error creating charity. Please try again.');
		}
		setName('');
		setGoalAmount('');
		setDuration('');
	};

	return (
		<>
			<ToastContainer />
			<form
				className={styles.form}
				onSubmit={handleSubmit}
			>
				<h2>Create Charity Campaign</h2>
				<label className={styles.label}>
					Campaign Name:
					<input
						type='text'
						value={name}
						className={styles.input}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<label className={styles.label}>
					Goal Amount:
					<input
						type='number'
						value={goalAmount}
						className={styles.input}
						onChange={(e) => setGoalAmount(e.target.value)}
					/>
				</label>
				<label className={styles.label}>
					Duration (in days):
					<input
						type='number'
						value={duration}
						className={styles.input}
						onChange={(e) => setDuration(e.target.value)}
					/>
				</label>
				<button
					className={styles.button}
					type='submit'
				>
					Create Campaign
				</button>
			</form>
		</>
	);
};

export default Createcharity;
