
const expenseForm = document.getElementById('expenseForm');
const expenseTable = document.getElementById('expenseTable');
const totalExpense = document.getElementById('totalExpense');
const downloadReport = document.getElementById('downloadReport');

let expenses = [];

expenseForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('expenseName').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const category = document.getElementById('expenseCategory').value;

    const expense = { name, amount, category };
    expenses.push(expense);
    renderTable();

    expenseForm.reset();
});

function renderTable() {
    expenseTable.innerHTML = '';
    let total = 0;
    expenses.forEach((expense, index) => {
        total += expense.amount;

        const row = document.createElement('tr');
        row.innerHTML = `
  <td>${expense.name}</td>
  <td>${expense.amount}</td>
  <td>${expense.category}</td>
  <td>
    <button class="btn-delete" onclick="deleteExpense(${index})">
      <i class="fas fa-trash"></i>
    </button>
  </td>
`;
        expenseTable.appendChild(row);
    });
    totalExpense.textContent = total;
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    renderTable();
}

downloadReport.addEventListener('click', function () {
    const rows = expenses.map(expense => [expense.name, expense.amount, expense.category]);
    const csvContent = [
        ['Name', 'Amount', 'Category'],
        ...rows
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ExpenseReport.csv';
    a.click();
});
