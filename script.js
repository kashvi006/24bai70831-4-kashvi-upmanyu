// 1. DOM Manipulation: Selecting Elements
const balanceElement = document.getElementById('balance');
const withdrawAmountInput = document.getElementById('withdraw-amount');
const withdrawBtn = document.getElementById('withdraw-btn');
const messageBox = document.getElementById('message-box');
const historyList = document.getElementById('history-list');

// 2. State: Initializing Balance
let currentBalance = 0;

// Function to Update UI
function updateBalanceUI() {
    balanceElement.innerText = `₹${currentBalance}`;
}

// 3. Event Handling: Deposit Function
function depositMoney(amount) {
    // Logic
    currentBalance += amount;
    
    // DOM Manipulation
    updateBalanceUI();
    showMessage(`Successfully deposited ₹${amount}`, 'success');
    addToHistory(`Deposited`, amount, 'deposit');
}

// 4. Event Handling: Withdraw Button Click
withdrawBtn.addEventListener('click', function() {
    const withdrawAmount = parseInt(withdrawAmountInput.value);

    // Input Validation
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
        showMessage('Please enter a valid amount.', 'error');
        return;
    }

    // 5. Conditional Logic: Check Sufficient Balance
    if (withdrawAmount > currentBalance) {
        // Error Condition
        showMessage('Insufficient Balance!', 'error');
    } else {
        // Success Condition
        currentBalance -= withdrawAmount;
        
        // DOM Manipulation
        updateBalanceUI();
        showMessage(`Successfully withdrew ₹${withdrawAmount}`, 'success');
        addToHistory(`Withdrew`, withdrawAmount, 'withdraw');
        
        // Clear Input
        withdrawAmountInput.value = '';
    }
});

// Helper Function: Show Messages
function showMessage(text, type) {
    messageBox.innerText = text;
    messageBox.className = `message ${type}`; // Apply success or error class
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 3000);
}

// Bonus Feature: Transaction History
function addToHistory(type, amount, className) {
    const li = document.createElement('li');
    li.classList.add('history-item', className);
    
    const date = new Date().toLocaleTimeString();
    
    li.innerHTML = `
        <span>${type} (${date})</span>
        <span>₹${amount}</span>
    `;
    
    // Add new transaction at the top
    historyList.insertBefore(li, historyList.firstChild);
}