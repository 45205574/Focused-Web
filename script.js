// Get all elements
const modal = document.getElementById('authModal');
const navLoginBtn = document.querySelector('.nav-login');
const navSignupBtn = document.querySelector('.nav-signup');
const closeBtn = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignupLink = document.getElementById('showSignup');
const showLoginLink = document.getElementById('showLogin');
const modalTitle = document.getElementById('modalTitle');

// Function to open modal with login form
function openLoginModal(e) {
    e.preventDefault();
    e.stopPropagation();
    modal.style.display = 'block';
    loginForm.style.display = 'flex';
    signupForm.style.display = 'none';
    modalTitle.textContent = 'Log in';
}

// Function to open modal with signup form
function openSignupModal(e) {
    e.preventDefault();
    e.stopPropagation();
    modal.style.display = 'block';
    loginForm.style.display = 'none';
    signupForm.style.display = 'flex';
    modalTitle.textContent = 'Sign up';
}

// Open modal when nav "Log in" is clicked - support both click and touch
navLoginBtn.addEventListener('click', openLoginModal);
navLoginBtn.addEventListener('touchend', openLoginModal);

// Open modal when nav "Sign up" is clicked - support both click and touch
navSignupBtn.addEventListener('click', openSignupModal);
navSignupBtn.addEventListener('touchend', openSignupModal);

// Close modal when X is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Switch to signup form
showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'flex';
    modalTitle.textContent = 'Sign up';
});

// Switch to login form
showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'flex';
    modalTitle.textContent = 'Log in';
});

// Password validation for signup
const signupPassword = document.getElementById('signupPassword');
const confirmPassword = document.getElementById('signupConfirmPassword');
const passwordHints = document.getElementById('passwordHints');
const passwordMatch = document.getElementById('passwordMatch');

// Password requirements
const requirements = {
    length: { regex: /.{8,}/, message: 'At least 8 characters' },
    uppercase: { regex: /[A-Z]/, message: 'One uppercase letter' },
    lowercase: { regex: /[a-z]/, message: 'One lowercase letter' },
    number: { regex: /[0-9]/, message: 'One number' },
    special: { regex: /[!@#$%^&*(),.?":{}|<>]/, message: 'One special character' }
};

// Check password requirements
signupPassword.addEventListener('input', () => {
    const password = signupPassword.value;
    
    let hintsHTML = '<ul>';
    for (let key in requirements) {
        const isValid = requirements[key].regex.test(password);
        const className = isValid ? 'valid' : 'invalid';
        const icon = isValid ? '✓' : '✗';
        hintsHTML += `<li class="${className}">${icon} ${requirements[key].message}</li>`;
    }
    hintsHTML += '</ul>';
    
    passwordHints.innerHTML = hintsHTML;
    
    // Check if passwords match (if confirm field has value)
    if (confirmPassword.value) {
        checkPasswordMatch();
    }
});

// Check if passwords match
function checkPasswordMatch() {
    if (confirmPassword.value === '') {
        passwordMatch.textContent = '';
        return;
    }
    
    if (signupPassword.value === confirmPassword.value) {
        passwordMatch.textContent = '✓ Passwords match';
        passwordMatch.className = 'password-match match';
    } else {
        passwordMatch.textContent = '✗ Passwords do not match';
        passwordMatch.className = 'password-match no-match';
    }
}

confirmPassword.addEventListener('input', checkPasswordMatch);

// Form submissions
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    console.log('Login attempt:', { email, password });
    alert('Login functionality would be connected to your backend here!');
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const password = signupPassword.value;
    const confirm = confirmPassword.value;
    
    // Validate all requirements are met
    let allValid = true;
    for (let key in requirements) {
        if (!requirements[key].regex.test(password)) {
            allValid = false;
            break;
        }
    }
    
    if (!allValid) {
        alert('Please meet all password requirements');
        return;
    }
    
    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }
    
    const formData = {
        name: document.getElementById('signupName').value,
        surname: document.getElementById('signupSurname').value,
        email: document.getElementById('signupEmail').value,
        password: password
    };
    
    console.log('Signup attempt:', formData);
    alert('Signed up');
});