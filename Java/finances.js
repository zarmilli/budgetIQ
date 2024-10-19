function showAddTransactionPopup() {
    document.getElementById("popupOverlay").style.display = "flex";
}

function hideAddTransactionPopup() {
    document.getElementById("popupOverlay").style.display = "none";
}

// Sample data - to be replaced by data from customers and inventory pages
const customers = ["John Doe", "Office Depot", "Jane Smith", "AdCo", "Corp Inc."];
const products = ["Premium Widget", "Office Supplies", "Basic Widget", "Marketing Services", "Deluxe Widget"];

// Populate dropdowns
function populateDropdowns() {
    const customerSelect = document.getElementById("customerName");
    const productSelect = document.getElementById("productName");

    customers.forEach(customer => {
        const option = document.createElement("option");
        option.value = customer;
        option.text = customer;
        customerSelect.add(option);
    });

    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product;
        option.text = product;
        productSelect.add(option);
    });
}

window.onload = populateDropdowns;

document.getElementById("addTransactionForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const productName = document.getElementById("productName").value;
    const customerName = document.getElementById("customerName").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const units = document.getElementById("units").value;
    const value = parseFloat(document.getElementById("value").value).toFixed(2);

    const tbody = document.getElementById("transactions-tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${productName}</td>
        <td>${customerName}</td>
        <td class="${category.toLowerCase()}">${category}</td>
        <td>${date}</td>
        <td>${units}</td>
        <td>${category === "Income" ? "$" + value : "-$" + value}</td>
    `;

    tbody.appendChild(row);
    hideAddTransactionPopup();
});

// Example function to update customer and product lists dynamically
function addNewCustomerOrProduct(name, list, dropdownId) {
    if (!list.includes(name)) {
        list.push(name);
        const dropdown = document.getElementById(dropdownId);
        const option = document.createElement("option");
        option.value = name;
        option.text = name;
        dropdown.add(option);
    }
}

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
