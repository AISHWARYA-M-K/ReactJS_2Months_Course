import React, { useEffect } from 'react';

export default function Timer({ timer, setTimer }) {
  useEffect(() => {
    // If timer reaches 0, stop counting
    if (timer <= 0) return;

    // Set up a 1-second interval loop
    const interval = setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup function: clears timer when component unmounts
    return () => clearInterval(interval);
  }, [timer, setTimer]);

  return (
    <p style={{ color: timer > 0 ? '#475569' : '#dc2626' }}>
      {timer > 0 ? `OTP expires in: ${timer}s` : '⚠️ OTP Expired!'}
    </p>
  );
}