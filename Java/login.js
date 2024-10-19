document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Retrieve saved user data from local storage
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the entered credentials match any saved user
    const userExists = savedUsers.some(user => user.email === email && user.password === password);

    if (userExists) {
        // If the login is successful, redirect to the dashboard
        window.location.href = 'dashboard.html';
    } else {
        // If the credentials are incorrect, show an error message
        alert('Invalid email or password. Please try again.');
    }
});
