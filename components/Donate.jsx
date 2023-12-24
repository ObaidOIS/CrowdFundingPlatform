import { useEffect, useState, useContext } from 'react';
import styles from '../styles/HomePage.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CrowdContext } from '../Context/CrowdContext';
import CountdownTimer from './CountdownTimer ';
import { parseEther } from 'ethers';
const Donate = ({ setCurrentPage }) => {
	const { CContract, accountAddress } = useContext(CrowdContext);
	const [charities, setCharities] = useState([]);
	const [donationModalVisible, setDonationModalVisible] = useState(false);
	const [selectedCharity, setSelectedCharity] = useState(null);
	const [donationAmount, setDonationAmount] = useState('');

	useEffect(() => {
		async function getAllCharities() {
			try {
				if (!CContract) {
					console.error(
						'Contract not initialized. Make sure your wallet is connected.'
					);
					toast.error(
						'Contract not initialized. Make sure your wallet is connected.'
					);
					return;
				}

				// Call the getCharityCount function to determine the total number of charities
				const charityCount = await CContract.getCharityCount();
				console.log('charityCount', charityCount);
				// Fetch details for each charity index
				const charityDetailsPromises = Array.from(
					{ length: Number(charityCount) },
					(_, index) => {
						return CContract.getCharityDetails(index);
					}
				);

				const charitiesDetails = await Promise.all(charityDetailsPromises);

				// Map details to objects
				const charities = charitiesDetails.map((details, index) => ({
					index,
					name: details[0],
					goalAmount: Number(details[1]),
					endTime: Number(details[2]),
					fundsRaised: Number(details[3]),
					finalized: details[4],
					creator: details[5],
				}));
				console.log('charities', charities);
				setCharities(charities);
			} catch (error) {
				console.error('Error fetching all charities:', error);
			}
		}
		getAllCharities();
	}, []);
	const handleDonateClick = (charity) => {
		setSelectedCharity(charity);
		setDonationModalVisible(true);
	};
	const handleDonate = async () => {
		// Perform donation transaction here
		try {
			const parsedAmount = parseFloat(donationAmount);
			if (isNaN(parsedAmount) || parsedAmount <= 0) {
				toast.error('Invalid donation amount');
				return;
			}
			try {
				const tx = await CContract.donate(selectedCharity.index, {
					value: parseEther(donationAmount),
				});
				await tx.wait();
				toast.success('Donation successful!');
			} catch (error) {
				console.error('user rejected transaction', error);
				toast.error('transaction rejected');
			}

			setDonationModalVisible(false);
			setDonationAmount('');
		} catch (error) {
			console.error('Error donating:', error);
			toast.error('Error donating. Please try again.');
		}
	};
	return (
		<>
			<ToastContainer />
			<center>
				<h1 className={styles.h1}>All Charities</h1>
				<table className={styles.table}>
					<thead>
						<tr>
							<th className={styles.th}>Sr.</th>
							<th className={styles.th}>Name</th>
							<th className={styles.th}>Goal Amount</th>
							<th className={styles.th}>End Time</th>
							<th className={styles.th}>Funds Raised</th>
							<th className={styles.th}>Finalized</th>
							<th className={styles.th}>Creator</th>
							<th className={styles}>Donate</th>
						</tr>
					</thead>
					<tbody>
						{charities.map((charity, index) => (
							<tr key={index}>
								<td className={styles.td}>{index + 1}</td>
								<td className={styles.td}>{charity.name}</td>
								<td className={styles.td}>{charity.goalAmount}</td>
								<td className={styles.td}>
									<CountdownTimer unixTimestamp={charity.endTime} />
								</td>
								<td className={styles.td}>{charity.fundsRaised}</td>
								<td className={styles.td}>
									{charity.finalized ? 'Yes' : 'No'}
								</td>
								<td className={styles.td}>{charity.creator}</td>
								<td className={styles.td}>
									<button
										className='btn btn-primary'
										onClick={() => {
											handleDonateClick(charity);
										}}
									>
										Donate
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{donationModalVisible && (
					<div className={styles.donationModal}>
						<h3>Donate to {selectedCharity?.name}</h3>

						<label className={styles.label}>
							Amount:
							<input
								type='number'
								value={donationAmount}
								onChange={(e) => setDonationAmount(e.target.value)}
								className={styles.input}
							/>
						</label>
						<button
							className={styles.button}
							onClick={handleDonate}
						>
							Donate
						</button>
						<button
							onClick={() => setDonationModalVisible(false)}
							className={styles.cancel}
						>
							Cancel
						</button>
					</div>
				)}
			</center>
		</>
	);
};

export default Donate;
