function showAddCustomerPopup() {
    document.getElementById("addCustomerPopup").classList.add("show-popup");
}

function closePopup(popupId) {
    document.getElementById(popupId).classList.remove("show-popup");
}

document.getElementById("addCustomerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const customerName = document.getElementById("customerName").value;
    const itemsOrdered = parseInt(document.getElementById("itemsOrdered").value, 10);
    const totalSpent = parseFloat(document.getElementById("totalSpent").value).toFixed(2);

    // Add new customer to table
    const tableBody = document.getElementById("customersTableBody");
    const row = tableBody.insertRow();
    row.innerHTML = `<td>${customerName}</td><td>${itemsOrdered}</td><td>$${totalSpent}</td>`;

    closePopup("addCustomerPopup");
});

// Get elements
const logoutBtn = document.getElementById('logout-btn');
const logoutPopup = document.getElementById('logout-popup');
const confirmLogoutBtn = document.getElementById('confirm-logout-btn');
const cancelLogoutBtn = document.getElementById('cancel-logout-btn');

// Show the logout confirmation popup
logoutBtn.addEventListener('click', () => {
    logoutPopup.classList.add('show-popup');
});

// Hide the popup when cancel is clicked
cancelLogoutBtn.addEventListener('click', () => {
    logoutPopup.classList.remove('show-popup');
});

// Handle the logout confirmation
confirmLogoutBtn.addEventListener('click', () => {
    // Perform logout actions here (clear session, etc.)
    // Redirect to login page
    window.location.href = 'login.html';
});