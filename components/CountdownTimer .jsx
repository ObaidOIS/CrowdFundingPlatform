import { useEffect, useState } from 'react';

const CountdownTimer = ({ unixTimestamp, onTimerExpired }) => {
	const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

	function calculateTimeRemaining() {
		const now = Math.floor(Date.now() / 1000);
		const remaining = unixTimestamp - now;

		if (remaining <= 0) {
			return { days: 0, hours: 0, minutes: 0, seconds: 0 };
		}

		const days = Math.floor(remaining / (60 * 60 * 24));
		const hours = Math.floor((remaining % (60 * 60 * 24)) / (60 * 60));
		const minutes = Math.floor((remaining % (60 * 60)) / 60);
		const seconds = remaining % 60;

		return { days, hours, minutes, seconds };
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeRemaining(calculateTimeRemaining());
		}, 1000);

		return () => clearInterval(interval);
	}, [unixTimestamp]);

	return (
		<div>
			{timeRemaining.days}d{timeRemaining.hours}h{timeRemaining.minutes}m
			{timeRemaining.seconds}s
		</div>
	);
};

export default CountdownTimer;
