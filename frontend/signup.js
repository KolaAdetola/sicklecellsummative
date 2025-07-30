const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const number_input = document.getElementById('number-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const toast = document.getElementById('toast');

// Detect login vs signup based on presence of firstname field
const isSignup = firstname_input !== null;

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let errors = [];

    if (isSignup) {
        errors = getSignupFormErrors(
            firstname_input.value,
            email_input.value,
            password_input.value,
            number_input.value,
            repeat_password_input.value
        );
    } else {
        errors = getLoginFormErrors(
            email_input.value,
            password_input.value
        );
    }

    if (errors.length > 0) {
        showToast(errors.join('. '), 'error');
        return;
    }

    const payload = isSignup
        ? {
              fullName: firstname_input.value,
              email: email_input.value,
              password: password_input.value,
              phoneNumber: number_input.value
          }
        : {
              email: email_input.value,
              password: password_input.value
          };

    const endpoint = isSignup
        ? 'http://localhost:3000/api/auth/signup'
        : 'http://localhost:3000/api/auth/login';

    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            credentials: 'include' // ✅ Allow cookie to be set
        });

        const data = await res.json();

        if (res.ok) {
            showToast('Success! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = '/main.html';
            }, 1500);
        } else {
            showToast(data.message || 'An error occurred', 'error');
        }
    } catch (err) {
        console.error(err);
        showToast('Server error. Please try again later.', 'error');
    }
});

// ✅ Toast notification
function showToast(message, type = 'info') {
    toast.innerText = message;
    toast.className = `show ${type}`;
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}

// Validation functions
function getSignupFormErrors(firstname, email, password, phoneNumber, repeatPassword) {
    let errors = [];

    if (!firstname) {
        errors.push('Firstname is required');
        firstname_input.parentElement.classList.add('incorrect');
    }

    if (!email) {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }

    if (!password) {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }

    if (!phoneNumber) {
        errors.push('Phone Number is required');
        number_input.parentElement.classList.add('incorrect');
    }

    if (password && password.length < 8) {
        errors.push('Password must be at least 8 characters long');
        password_input.parentElement.classList.add('incorrect');
    }

    if (password !== repeatPassword) {
        errors.push('Passwords do not match');
        repeat_password_input.parentElement.classList.add('incorrect');
        password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

function getLoginFormErrors(email, password) {
    let errors = [];

    if (!email) {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }

    if (!password) {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

const allInputs = [firstname_input, email_input, password_input, number_input, repeat_password_input].filter(Boolean);

allInputs.forEach((input) => {
    input.addEventListener('input', () => {
        input.parentElement.classList.remove('incorrect');
        toast.className = toast.className.replace('show', '');
    });
});
