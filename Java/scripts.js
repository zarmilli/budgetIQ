document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Whoops, passwords do not match.");
        return;
    }

    // Save user data in local storage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ email: email, password: password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! You can now log in.");
    window.location.href = "login.html";
});
