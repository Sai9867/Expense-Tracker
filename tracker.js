let transactions = [];

function userinputs() {

  let data = document.querySelector(".dateinputs").value;
  let amount = parseFloat(document.querySelector(".amountinputs").value);
  let transaction = document.querySelector(".transactiontype").value;

  if (!data || isNaN(amount) || (transaction !== "income" && transaction !== "expense")) {
    alert("Please enter valid input.");
    return null;
  }

  return { data, amount, transaction };
}

function updateTable() {
  const table = document.querySelector(".transaction-table");
  
  // Remove all rows except the header
  table.querySelectorAll("tr:not(#header-row)").forEach((row) => row.remove());
  

  transactions.forEach((tx, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      
      <td>${tx.amount}</td>
      <td>${tx.transaction}</td>
      <td>${tx.data}</td>
      <td>
        <button class="btn btn-sm delete-button" data-index="${index}">
          <img src="./recycle-bin.png" alt="" width="35px">
        </button>
      </td>
    `;

    table.appendChild(row);
  });

  attachDeleteEvents();
  updateTotals();
}

function attachDeleteEvents() {
  const deleteButtons = document.querySelectorAll(".delete-button");

  deleteButtons.forEach(button => {
    button.addEventListener("click", function () {
      const index = parseInt(button.getAttribute("data-index"));
      transactions.splice(index, 1); // Remove item
      updateTable(); // Refresh table
    });
  });
}

function updateTotals() {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(tx => {
    if (tx.transaction === "income") {
      totalIncome += tx.amount;
    } else {
      totalExpense += tx.amount;
    }
  });

  const balance = totalIncome - totalExpense;

  document.querySelectorAll("#totalincome")[0].innerText = totalIncome.toLocaleString();
  document.querySelectorAll("#totalincome")[1].innerText = totalExpense.toLocaleString();
  document.querySelectorAll("#totalincome")[2].innerText = balance.toLocaleString();
}

document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-button");

  addButton.addEventListener("click", function () {
    const input = userinputs();
    if (input) {
      transactions.push(input);
      updateTable();
      clearForm();
    }
  });
});

function clearForm() {
  document.querySelector(".dateinputs").value = "";
  document.querySelector(".amountinputs").value = "";
  document.querySelector(".transactiontype").value = "Transaction Type";
}
