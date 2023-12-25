// HomePage.js
import { useEffect, useState, useContext } from 'react';
import styles from '../styles/HomePage.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CrowdContext } from '../Context/CrowdContext';
import CountdownTimer from './CountdownTimer ';
import { ethers } from 'ethers';

const UserCharity = ({ setCurrentPage }) => {
	const { CContract, accountAddress } = useContext(CrowdContext);
	const [charities, setCharities] = useState([]);
	useEffect(() => {
		const getCharities = async () => {
			if (!CContract) {
				console.error(
					'Contract not initialized. Make sure your wallet is connected.'
				);
				return;
			}
			try {
				const charityIndices = await CContract.getCharitiesByOwner(
					accountAddress
				);

				const charityDetailsPromises = charityIndices.map(
					async (charityIndex) => {
						const details = await CContract.getCharityDetails(charityIndex);
						return {
							index: charityIndex,
							name: details[0],
							goalAmount: Number(details[1]),
							endTime: Number(details[2]),
							fundsRaised: Number(details[3]),
							finalized: details[4],
							creator: details[5],
						};
					}
				);

				const charitiesDetails = await Promise.all(charityDetailsPromises);
				console.log('charitiesDetails', charitiesDetails);
				setCharities(charitiesDetails);
			} catch (error) {
				console.error('Error fetching charity details:', error);
			}
		};
		getCharities();
	}, [CContract, accountAddress]);
	const endCharity = async (charity) => {
		if (charity.endTime > Math.floor(Date.now() / 1000)) {
			toast.error('Charity has not ended yet!');
			return;
		}
		try {
			const tx = await CContract.finalizeCharity(charity.index);
			await tx.wait();
			toast.success('Charity ended successfully!');
		} catch (error) {
			console.error('Error ending charity:', error);
			toast.error('Error ending charity. Please try again.');
		}
	};
	return (
		<>
			<ToastContainer />
			<center>
				<h1 className={styles.h1}>Your Campaigns</h1>
				<table className={styles.table}>
					<thead>
						<tr>
							<th className={styles.th}>Sr.</th>
							<th className={styles.th}>Name</th>
							<th className={styles.th}>Goal Amount(WEI)</th>
							<th className={styles.th}>End Time</th>
							<th className={styles.th}>Funds Raised(WEI)</th>
							<th className={styles.th}>Finalized</th>
							<th className={styles.th}>Creator</th>
							<th className={styles}>End Charity</th>
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
									{charity.finalized ? (
										<p>Closed</p>
									) : (
										<button
											className={styles.button}
											disabled={charity.endTime > Math.floor(Date.now() / 1000)}
											onClick={() => endCharity(charity)}
										>
											End
										</button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</center>
		</>
	);
};

export default UserCharity;
