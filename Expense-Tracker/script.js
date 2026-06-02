const balanceEl =
document.getElementById("balance");

const incomeEl =
document.getElementById("income");

const expenseEl =
document.getElementById("expense");

const textEl =
document.getElementById("text");

const amountEl =
document.getElementById("amount");

const typeEl =
document.getElementById("type");

const addBtn =
document.getElementById("addBtn");

const transactionList =
document.getElementById("transaction-list");

let transactions =
JSON.parse(localStorage.getItem("transactions"))
|| [];

function saveTransactions(){

localStorage.setItem(
"transactions",
JSON.stringify(transactions)
);

}

function updateUI(){

transactionList.innerHTML = "";

let income = 0;
let expense = 0;

transactions.forEach(transaction=>{

const li =
document.createElement("li");

li.classList.add(
"transaction",
transaction.type
);

li.innerHTML = `

<span>
${transaction.text}
</span>

<span>

${transaction.type==="income"
? "+"
: "-"}

₹${transaction.amount}

</span>

<button
class="delete-btn"
onclick="deleteTransaction(${transaction.id})">

X

</button>

`;

transactionList.appendChild(li);

if(transaction.type==="income"){
income += transaction.amount;
}else{
expense += transaction.amount;
}

});

balanceEl.innerText =
`₹${income-expense}`;

incomeEl.innerText =
`₹${income}`;

expenseEl.innerText =
`₹${expense}`;
}

function addTransaction(){

const text =
textEl.value.trim();

const amount =
Number(amountEl.value);

const type =
typeEl.value;

if(text==="" || amount<=0){

alert(
"Please enter valid details"
);

return;
}

const transaction = {

id:Date.now(),

text,

amount,

type

};

transactions.push(transaction);

saveTransactions();

updateUI();

textEl.value="";
amountEl.value="";
}

function deleteTransaction(id){

transactions =
transactions.filter(
transaction =>
transaction.id !== id
);

saveTransactions();

updateUI();
}

addBtn.addEventListener(
"click",
addTransaction
);

updateUI();
