// public/js/main.js

// Function to handle user registration
async function registerUser(event) {
    event.preventDefault();
  
    const formData = {
      firstname: document.querySelector('input[name="firstname"]').value,
      lastname: document.querySelector('input[name="lastname"]').value,
      gender: document.querySelector('input[name="gender"]:checked').value,
      phone: document.querySelector('input[name="phone"]').value,
      email: document.querySelector('input[name="email"]').value,
      password: document.querySelector('input[name="psw"]').value
    };
  
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        window.location.href = '/html/login.html';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Function to handle user login
  async function loginUser(event) {
    event.preventDefault();
  
    const formData = {
      email: document.getElementById('username').value,
      password: document.getElementById('password').value
    };
  
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        window.location.href = '/html/Home.html';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Function to handle password reset
  async function resetPassword(event) {
    event.preventDefault();
  
    const formData = {
      email: document.getElementById('user_email').value,
      newPassword: prompt('Enter your new password:')
    };
  
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        window.location.href = '/html/login.html';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Attach event listeners for forms if the elements exist
  if (document.querySelector('form')) {
    const form = document.querySelector('form');
    if (window.location.pathname.includes('registration.html')) {
      form.addEventListener('submit', registerUser);
    } else if (window.location.pathname.includes('login.html')) {
      form.addEventListener('submit', loginUser);
    } else if (window.location.pathname.includes('forgetpasspowd.html')) {
      form.addEventListener('submit', resetPassword);
    }
  }
  