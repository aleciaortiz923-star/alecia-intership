import React, { useState, useEffect } from 'react';

const Countdown = ({ expiryDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(expiryDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval.charAt(0).toUpperCase()}{" "}
      </span>
    );
  });

  return (
    <div className="de_countdown">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </div>
  );
};

export default Countdown;
