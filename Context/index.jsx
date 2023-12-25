import React, { createContext, useCallback, useEffect, useState } from 'react';
import { ethers, Contract } from 'ethers';
import abi from '../Contract/CrowdFunding.json';
import { CrowdContext } from './CrowdContext';
import { toast } from 'react-toastify';
const AppContext = ({ children }) => {
	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [CContract, setCContract] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [accessToken, setAccessToken] = useState('');
	const [accountAddress, setAccountAddress] = useState(null);

	async function connectWallet() {
		const contractABI = abi;
		const contractaddress = '0x876753A9421B77DbCD23015222f08d50b2446d89';
		if (typeof window.ethereum !== 'undefined') {
			if (window.ethereum.isMetaMask) {
				try {
					const accounts = await window.ethereum.request({
						method: 'eth_requestAccounts',
					});
					setAccountAddress(accounts[0]);
					console.log('Connected account:', accountAddress);
					const provider = new ethers.BrowserProvider(window.ethereum);
					const signer = await provider.getSigner();
					const contract = new Contract(contractaddress, contractABI, signer);
					// console.log(contract);
					setProvider(provider);
					setSigner(signer);
					setCContract(contract);
					toast.success('Wallet connected successfully!');
				} catch (error) {
					console.error('User denied account access:', error);
					toast.error('Please connect wallet first');
				}
			} else {
				console.error('Please use MetaMask to connect your wallet.');
			}
		} else {
			console.error(
				'MetaMask is not installed. Please install MetaMask and try again.'
			);
		}
	}
	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			setAccessToken(localStorage.getItem('accessToken'));
			setIsLoggedIn(true);
		}
	}, []);

	return (
		<CrowdContext.Provider
			value={{
				provider,
				setProvider,
				signer,
				setSigner,
				CContract,
				setCContract,
				isLoggedIn,
				setIsLoggedIn,
				accessToken,
				setAccessToken,
				connectWallet,
				accountAddress,
				setAccountAddress,
			}}
		>
			{children}
		</CrowdContext.Provider>
	);
};
export default AppContext;
