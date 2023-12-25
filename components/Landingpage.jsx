import styles from '../styles/landing.module.css';

const Landingpage = () => {
	return (
		<>
			<div className={styles.main}>
				<center>
					<h1 className={styles.h1}>Welcome to WEB3.0 CrowdFunding Platform</h1>
					<p className={styles.subheading}>
						The Future of Crowdfunding in the Era of Web 3.0
					</p>

					<p className={styles.subheading}>Login in to continue</p>
				</center>
				<div className={styles.container}>
					<div className={styles.card}>
						<div className={styles.content}>
							<h2>Empowering Innovation</h2>
							<p>
								Step into the era of Web3.0, where decentralized technologies
								redefine collaboration and transparency. WEB 3.0 Crowd funding
								platform is more than just a crowdfunding platform; it's a
								catalyst for groundbreaking projects and ideas that have the
								potential to transform industries and reshape the future.
							</p>
						</div>
					</div>

					<div className={styles.card}>
						<div className={styles.content}>
							<h2>What Sets Us Apart?</h2>
							<ul>
								<li>
									<strong>Decentralized and Transparent:</strong> Powered by
									blockchain, our platform ensures transparency, trust, and
									security for both creators and backers.
								</li>
								<li>
									<strong>Community-Driven:</strong> WEB 3.0 Crowd funding
									platform thrives on community collaboration. Our decentralized
									governance model empowers users to have a say in the projects
									that get funded, fostering a sense of ownership and
									inclusivity.
								</li>
								<li>
									<strong>Web3.0 Smart Contracts:</strong> Experience seamless
									and automated transactions through Web3.0 smart contracts. No
									more intermediaries—just a direct and secure connection
									between creators and backers.
								</li>
							</ul>
						</div>
					</div>

					<div className={styles.card}>
						<div className={styles.content}>
							<h2>A Global Hub for Innovation</h2>
							<p>
								Whether you're an ambitious creator with a groundbreaking idea
								or a passionate supporter looking to be part of the next big
								thing, [Platform Name] connects you with a global network of
								like-minded individuals. Our platform transcends geographical
								boundaries, bringing together diverse talents and perspectives.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Landingpage;
