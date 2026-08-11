import React, { useState } from 'react';
import OtpInput from './components/OtpInput';
import Timer from './components/Timer';

export default function App() {
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userOtp, setUserOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(0);
  const [status, setStatus] = useState('');

  // Generate a random 6-digit number string
  const handleGenerate = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    setUserOtp(['', '', '', '', '', '']); // Clear existing inputs
    setTimer(30); // Reset countdown timer to 30s
    setStatus('');
  };

  // Verify entered OTP against the generated one
  const handleVerify = () => {
    const enteredOtp = userOtp.join('');

    if (timer === 0) {
      setStatus('❌ OTP has expired. Please request a new one.');
      return;
    }

    if (enteredOtp === generatedOtp) {
      setStatus('✅ Success! OTP Verified.');
    } else {
      setStatus('❌ Incorrect OTP. Try again.');
    }
  };

  return (
    <div>
      <h1>OTP Generator</h1>

      <button onClick={handleGenerate}>
        {generatedOtp ? 'Resend OTP' : 'Generate OTP'}
      </button>

      {generatedOtp && (
        <>
          {/* Demo helper showing current OTP */}
          <div style={{ marginBottom: '20px', color: '#666' }}>
            Generated Code: {generatedOtp}
          </div>

          {/* 6-digit Inputs */}
          <OtpInput userOtp={userOtp} setUserOtp={setUserOtp} />

          {/* Countdown Timer */}
          <Timer timer={timer} setTimer={setTimer} />

          {/* Verification Button */}
          <button
            onClick={handleVerify}
            style={{
              backgroundColor: timer > 0 ? '#16a34a' : '#94a3b8',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              padding: '10px 20px',
              marginTop: '20px'
            }}
          >
            Verify OTP
          </button>
        </>
      )}

      {/* Result feedback message */}
      {status && <p>{status}</p>}
    </div>
  );
}