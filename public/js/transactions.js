// const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
  transactions: [],
};

//logout
document.getElementById("logout-button").addEventListener("click", logout);

checkLogged();

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }

  if (!logged) {
    window.location.href = "index.html";
    return;
  }

  const dataUser = localStorage.getItem(logged);
  if (dataUser) {
    data = JSON.parse(dataUser);
  }

  getTransactions();
}

function getTransactions() {
  const transactions = data.transactions;
  let transactionsHtml = ``;

  if (transactions.length) {
    transactions.forEach((item) => {
      let type = item.type === "1" ? "Entrada" : "Saída";

      transactionsHtml += `
            <tr>
              <th scope="row">${item.date}</th>
              <td>${item.value.toFixed(2)}</td>
              <td>${type}</td>
              <td>${item.description}</td>
            </tr>
                    `;
    });
    document.getElementById("transactions-list").innerHTML = transactionsHtml;
  }
}

function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");

  window.location.href = "index.html";
}

function saveData(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}
