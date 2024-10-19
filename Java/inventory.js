// Show and hide popups
function showAddProductPopup() {
    document.getElementById("addProductPopup").classList.add("show-popup");
}

function showDeleteProductPopup() {
    document.getElementById("deleteProductPopup").classList.add("show-popup");
    populateDeleteDropdown();
}

function showRestockPopup(productName) {
    document.getElementById("restockPopup").classList.add("show-popup");
    document.getElementById("restockForm").dataset.productName = productName;
}

function closePopup(popupId) {
    document.getElementById(popupId).classList.remove("show-popup");
}

// Form submission handling
document.getElementById("addProductForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const productName = document.getElementById("productName").value;
    const productUnits = parseInt(document.getElementById("productUnits").value, 10);

    // Add new product to table
    const tableBody = document.getElementById("inventoryTableBody");
    const row = tableBody.insertRow();
    row.innerHTML = `<td>${productName}</td><td>${productUnits}</td>
                     <td><button class="restock-btn" onclick="showRestockPopup('${productName}')">↻ Restock</button></td>`;

    closePopup("addProductPopup");
});

document.getElementById("deleteProductForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const productName = document.getElementById("deleteProductName").value;

    // Delete selected product row
    const tableBody = document.getElementById("inventoryTableBody");
    for (let i = 0; i < tableBody.rows.length; i++) {
        if (tableBody.rows[i].cells[0].textContent === productName) {
            tableBody.deleteRow(i);
            break;
        }
    }
    closePopup("deleteProductPopup");
});

document.getElementById("restockForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const unitsToAdd = parseInt(document.getElementById("restockUnits").value, 10);
    const productName = event.target.dataset.productName;

    // Update product units in the table
    const tableBody = document.getElementById("inventoryTableBody");
    for (let i = 0; i < tableBody.rows.length; i++) {
        if (tableBody.rows[i].cells[0].textContent === productName) {
            const currentUnits = parseInt(tableBody.rows[i].cells[1].textContent, 10);
            tableBody.rows[i].cells[1].textContent = currentUnits + unitsToAdd;
            break;
        }
    }
    closePopup("restockPopup");
});

// Populate the delete product dropdown
function populateDeleteDropdown() {
    const dropdown = document.getElementById("deleteProductName");
    dropdown.innerHTML = "";
    const tableBody = document.getElementById("inventoryTableBody");
    for (let i = 0; i < tableBody.rows.length; i++) {
        const option = document.createElement("option");
        option.value = tableBody.rows[i].cells[0].textContent;
        option.textContent = tableBody.rows[i].cells[0].textContent;
        dropdown.appendChild(option);
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
