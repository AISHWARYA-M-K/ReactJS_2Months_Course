import React, { useRef } from 'react';

export default function OtpInput({ userOtp, setUserOtp, isDisabled }) {
  // Store DOM references to all 6 input elements
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    // Allow numbers only
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...userOtp];
    newOtp[index] = value.slice(-1); // Keep only last typed digit
    setUserOtp(newOtp);

    // Auto-focus next box if digit was typed
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // If Backspace is pressed on an empty box, move focus backwards
    if (e.key === 'Backspace' && !userOtp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <>
      {userOtp.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputRefs.current[idx] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          disabled={isDisabled}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          style={{
            width: '40px',
            height: '45px',
            fontSize: '20px',
            textAlign: 'center',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
          }}
        />
      ))}
    </>
  );
}