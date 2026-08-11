// State Variables
let currentOtp = '';
let timerSeconds = 30;
let timerInterval = null;

// DOM Elements
const generateBtn = document.getElementById('generateBtn');
const verifyBtn = document.getElementById('verifyBtn');
const demoDisplay = document.getElementById('demoDisplay');
const generatedOtpText = document.getElementById('generatedOtpText');
const otpContainer = document.getElementById('otpContainer');
const timerText = document.getElementById('timerText');
const statusMessage = document.getElementById('statusMessage');
const otpBoxes = document.querySelectorAll('.otp-box');

// 1. Generate 6-Digit OTP
function generateOtp() {
  currentOtp = Math.floor(100000 + Math.random() * 900000).toString();
  generatedOtpText.textContent = currentOtp;

  // Reveal input container & reset inputs
  demoDisplay.classList.remove('hidden');
  otpContainer.classList.remove('hidden');
  generateBtn.textContent = 'Resend OTP';
  statusMessage.textContent = '';
  
  clearOtpBoxes();
  startTimer();
  
  // Auto focus first input box
  otpBoxes[0].focus();
}

// 2. Start Countdown Timer
function startTimer() {
  clearInterval(timerInterval); // Reset existing timer if any
  timerSeconds = 30;
  updateTimerUI();

  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerUI();

    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerText.textContent = '⚠️ OTP Has Expired!';
      timerText.classList.add('expired');
      disableBoxes(true);
      verifyBtn.disabled = true;
    }
  }, 1000);
}

function updateTimerUI() {
  timerText.classList.remove('expired');
  timerText.textContent = `Expires in: 00:${timerSeconds < 10 ? '0' + timerSeconds : timerSeconds}`;
}

// 3. Clear Input Boxes
function clearOtpBoxes() {
  otpBoxes.forEach((box) => {
    box.value = '';
    box.disabled = false;
  });
  verifyBtn.disabled = true;
}

function disableBoxes(isDisabled) {
  otpBoxes.forEach((box) => (box.disabled = isDisabled));
}

// 4. Handle Single Digit Inputs & Auto-Focus Shift
otpBoxes.forEach((box, index) => {
  // Digit Input
  box.addEventListener('input', (e) => {
    const value = e.target.value;

    // Allow numbers only
    if (!/^\d$/.test(value)) {
      box.value = '';
      return;
    }

    // Auto-advance cursor to next box
    if (value && index < otpBoxes.length - 1) {
      otpBoxes[index + 1].focus();
    }

    checkComplete();
  });

  // Handle Backspace navigation
  box.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !box.value && index > 0) {
      otpBoxes[index - 1].focus();
    }
  });

  // Handle Paste event
  box.addEventListener('paste', (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return; // Numbers only

    const digits = pastedData.split('');
    digits.forEach((digit, idx) => {
      if (otpBoxes[idx]) {
        otpBoxes[idx].value = digit;
      }
    });

    // Focus last filled box
    const nextIndex = Math.min(digits.length, otpBoxes.length - 1);
    otpBoxes[nextIndex].focus();

    checkComplete();
  });
});

// 5. Check if all 6 boxes are filled
function checkComplete() {
  const enteredCode = Array.from(otpBoxes).map((box) => box.value).join('');
  verifyBtn.disabled = enteredCode.length !== 6 || timerSeconds === 0;
}

// 6. Verify Entered OTP
function verifyOtp() {
  const enteredCode = Array.from(otpBoxes).map((box) => box.value).join('');

  if (timerSeconds <= 0) {
    statusMessage.textContent = '❌ OTP expired. Request a new one.';
    statusMessage.style.color = '#dc2626';
    return;
  }

  if (enteredCode === currentOtp) {
    statusMessage.textContent = '✅ OTP Verified Successfully!';
    statusMessage.style.color = '#16a34a';
    clearInterval(timerInterval);
  } else {
    statusMessage.textContent = '❌ Invalid OTP. Try again.';
    statusMessage.style.color = '#dc2626';
  }
}

// Event Listeners
generateBtn.addEventListener('click', generateOtp);
verifyBtn.addEventListener('click', verifyOtp);