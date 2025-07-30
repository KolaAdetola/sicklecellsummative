const form = document.getElementById('form');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset UI state
    email_input.parentElement.classList.remove('incorrect');
    password_input.parentElement.classList.remove('incorrect');
    errorMessage.textContent = '';

    const email = email_input.value.trim();
    const password = password_input.value;
    const errors = getLoginFormErrors(email, password);

    if (errors.length > 0) {
        errorMessage.textContent = errors.join('. ');
        return;
    }

    const payload = { email, password };

    try {
        const res = await fetch('https://sicklecellsummative.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials: 'include' // ✅ Ensures cookie is saved by browser
        });

        const data = await res.json();

        if (res.ok) {
            errorMessage.style.color = 'green';
            errorMessage.textContent = 'Login successful! Redirecting...';

            // ⛔️ Remove token storage — not needed when using cookies
            // const token = data.token;
            // localStorage.setItem('auth_token', token);

            setTimeout(() => {
                window.location.href = '/main.html';
            }, 1500);
        } else {
            errorMessage.textContent = data.message || 'Invalid credentials';
            email_input.parentElement.classList.add('incorrect');
            password_input.parentElement.classList.add('incorrect');
        }
    } catch (err) {
        console.error(err);
        errorMessage.textContent = 'Server error. Please try again later.';
    }
});

function getLoginFormErrors(email, password) {
    const errors = [];

    if (!email) {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errors.push('Invalid email format');
        email_input.parentElement.classList.add('incorrect');
    }

    if (!password) {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

// Clear errors on input change
[email_input, password_input].forEach((input) => {
    input.addEventListener('input', () => {
        input.parentElement.classList.remove('incorrect');
        errorMessage.textContent = '';
    });
});
