import { useEffect, useState, useContext } from 'react';
import { CrowdContext } from '../Context/CrowdContext';
const NavBar = ({ setCurrentPage }) => {
	const { isLoggedIn, setIsLoggedIn, connectWallet, accountAddress } =
		useContext(CrowdContext);

	useEffect(() => {
		console.log('Checking if user is logged in');
		const accessToken = localStorage.getItem('accessToken');
		const refreshToken = localStorage.getItem('refreshToken');
		const isLoggedIn = accessToken && refreshToken;
		setIsLoggedIn(isLoggedIn);
		// setIsLoggedIn(true);
	});

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleLogout = async () => {
		const response = await fetch('http://127.0.0.1:8000/api/logout/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ refresh: localStorage.getItem('refreshToken') }),
		});
		if (response.ok) {
			console.log('Logout successful');
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			setIsLoggedIn(false);
		} else {
			console.log('Logout failed');
		}
	};

	return (
		<nav className={'navbar'}>
			<div>
				<h2
					className={'brand'}
					onClick={() => handlePageChange('home')}
				>
					Web3.0 Crowd Funding Platform
				</h2>
			</div>
			<div className={'buttons'}>
				{isLoggedIn ? (
					<>
						<button
							className={'center-button'}
							onClick={() => handlePageChange('donate')}
						>
							Donate
						</button>
						<button
							className={'center-button'}
							onClick={() => handlePageChange('usercampaigns')}
						>
							Your Campaigns
						</button>
						{/* <button
							className={'logout'}
							onClick={() => handleLogout()}
						>
							Logout
						</button> */}
					</>
				) : (
					<></>
				)}
			</div>
			<div className={'buttons'}>
				{!accountAddress ? (
					<>
						<button
							className={'connect-wallet'}
							onClick={() => connectWallet()}
						>
							Connect Wallet
						</button>
					</>
				) : (
					<span className={'connect-wallet'}>
						{accountAddress.slice(0, 6)}...{accountAddress.slice(-4)}
					</span>
				)}
				{isLoggedIn ? (
					<>
						{/* <button
							className={'connect-wallet'}
							onClick={() => handlePageChange('donate')}
						>
							Donate
						</button>
						<button
							className={'connect-wallet'}
							onClick={() => handlePageChange('usercampaigns')}
						>
							Your Campaigns
						</button> */}
						<button
							className={'logout'}
							onClick={() => handleLogout()}
						>
							Logout
						</button>
					</>
				) : (
					<button
						className={'login'}
						onClick={() => handlePageChange('login')}
					>
						Login
					</button>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
