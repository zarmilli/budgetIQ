// Retrieve current logged-in user data from localStorage
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const usersData = JSON.parse(localStorage.getItem('usersData')) || {};

// If the current user has data, display it on the dashboard
if (currentUser && usersData[currentUser.email]) {
    const userData = usersData[currentUser.email];

    document.getElementById('total-revenue').textContent = `$${userData.totalRevenue}`;
    document.getElementById('revenue-change').textContent = `${userData.revenueChange}% from last month`;

    document.getElementById('monthly-income').textContent = `$${userData.monthlyIncome}`;
    document.getElementById('income-change').textContent = `${userData.incomeChange}% from last month`;

    document.getElementById('monthly-expenses').textContent = `$${userData.monthlyExpenses}`;
    document.getElementById('expenses-change').textContent = `${userData.expensesChange}% from last month`;

    document.getElementById('available-inventory').textContent = `${userData.availableInventory} units`;
    document.getElementById('inventory-sold').textContent = `${userData.inventorySold} units`;

    document.getElementById('percentage-margins').textContent = `${userData.percentageMargins}%`;
    document.getElementById('margin-change').textContent = `${userData.marginChange}% from last month`;
}

// Function to calculate and update dashboard metrics
function updateDashboardMetrics() {
    const transactionsTable = document.getElementById('transactions-tbody');
    const inventoryTable = document.getElementById('inventoryTableBody');

    let totalIncome = 0;
    let totalExpenses = 0;
    let totalUnitsSold = 0;
    let availableInventory = 0;

    // Calculate total income, expenses, and units sold from the transactions table
    Array.from(transactionsTable.rows).forEach(row => {
        const category = row.cells[2].textContent;
        const value = parseFloat(row.cells[5].textContent.replace('$', ''));
        const units = parseInt(row.cells[4].textContent, 10);

        if (category === 'Income') {
            totalIncome += value;
        } else if (category === 'Expense') {
            totalExpenses += value;
        }

        totalUnitsSold += units;
    });

    // Calculate available inventory from the inventory table
    Array.from(inventoryTable.rows).forEach(row => {
        const unitsAvailable = parseInt(row.cells[1].textContent, 10);
        availableInventory += unitsAvailable;
    });

    // Calculate total revenue and percentage margins
    const totalRevenue = totalIncome - totalExpenses;
    const percentageMargins = totalIncome ? ((totalRevenue / totalIncome) * 100).toFixed(2) : 0;

    // Update the dashboard with calculated values
    document.getElementById('total-revenue').textContent = `$${totalRevenue.toFixed(2)}`;
    document.getElementById('monthly-income').textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById('monthly-expenses').textContent = `$${totalExpenses.toFixed(2)}`;
    document.getElementById('available-inventory').textContent = `${availableInventory} units`;
    document.getElementById('inventory-sold').textContent = `${totalUnitsSold} units`;
    document.getElementById('percentage-margins').textContent = `${percentageMargins}%`;
}

// Call the function to update the dashboard metrics
updateDashboardMetrics();

// Example sales data (this would be fetched from the sales page in practice)
const salesData = [
    { productName: "Product A", sales: 150 },
    { productName: "Product B", sales: 120 },
    { productName: "Product C", sales: 100 },
    { productName: "Product D", sales: 80 },
    // ... other products
];

// Function to display the top 3 selling products
function displayTopSellers() {
    // Sort the sales data by the number of sales in descending order
    const topSellers = salesData.sort((a, b) => b.sales - a.sales).slice(0, 3);
    
    const topSellersContainer = document.querySelector('.top-sellers .card');
    topSellersContainer.innerHTML = '<h2>Top Sellers</h2>';

    topSellers.forEach((item, index) => {
        const position = index === 0 ? '1st' : index === 1 ? '2nd' : '3rd';
        topSellersContainer.innerHTML += `
            <div class="top-seller-item">
                <span>${position} - ${item.productName}</span>
                <span>${item.sales} sales</span>
            </div>
            ${index < 2 ? '<hr>' : ''}
        `;
    });
}

// Call the function to update the dashboard
displayTopSellers();

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
