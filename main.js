import { addCustomer, getCustomers, deleteCustomer } from "./lib.js";

document.body.onload = async function() {
  console.log("#########");
  loadTable();
};
document.forms[0].addEventListener("submit", function(e) {
  e.preventDefault();
  validateForm();
});
async function loadTable() {
  console.log("On load");
  const custData = await getCustomers();
  console.log(custData);
  const tbl = document.createElement("table");
  tbl.border = "1px solid";
  let row = tbl.insertRow(-1);
  const tableHeader = [
    "First Name",
    "Last Name",
    "Email",
    "Mobile No",
    "Action"
  ];
  const dvTable = document.querySelector("#data");

  if (custData.length > 0) {
    for (let i = 0; i < tableHeader.length; i++) {
      const th = document.createElement("th");
      th.innerHTML = tableHeader[i];
      row.style.backgroundColor = "#ccc";
      row.appendChild(th);
    }
    for (let i = 0; i < custData.length; i++) {
      let deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.style.padding = "3px 15px";
      deleteBtn.setAttribute("id", custData[i]["id"]);

      let row = tbl.insertRow(-1);
      let firstNameCell = row.insertCell(-1);
      firstNameCell.innerHTML = custData[i]["firstName"];
      let lastNameCell = row.insertCell(-1);
      lastNameCell.innerHTML = custData[i]["lastName"];
      let emailCell = row.insertCell(-1);
      emailCell.innerHTML = custData[i]["email"];
      let mobileCell = row.insertCell(-1);
      mobileCell.innerHTML = custData[i]["mobile"];
      let action = row.insertCell(-1);
      action.appendChild(deleteBtn); // deleteRow = document.getElementById();
      deleteBtn.addEventListener("click", async function(e) {
        // console.log(e.target.id);
        const deleteId = e.target.id;
        let deleteConfirm = confirm("Do you want to delete?");
        if (deleteConfirm) {
          await deleteCustomer(deleteId);
          loadTable();
        }
      });
    }
    dvTable.innerHTML = "";
    dvTable.appendChild(tbl);
  } else {
    dvTable.innerHTML = "";
    let noData = document.createElement("h1");
    noData.textContent = "No data available";
    noData.style.color = "blue";
    noData.style.textAlign = "center";
    dvTable.appendChild(noData);
  }
}
async function addRow() {
  let firstName = document.querySelector("#firstName").value;
  let lastName = document.querySelector("#lastName").value;
  let mobile = document.querySelector("#mobileNo").value;
  let email = document.querySelector("#email").value;
  let customer = { firstName, lastName, mobile, email };
  console.log(customer);
  await addCustomer(customer);
  await loadTable();
  alert("Customer added successfully");
  resetValues();
}

function resetValues() {
  document.querySelector("#firstName").value = "";
  document.querySelector("#lastName").value = "";
  document.querySelector("#mobileNo").value = "";
  document.querySelector("#email").value = "";
}

function validateForm() {
  let firstName = document.querySelector("#firstName").value;
  let mobRegex = new RegExp("[0-9]{10}", "gm");
  let mobile = document.querySelector("#mobileNo").value;
  let email = document.querySelector("#email").value;
  if (firstName == "") {
    let fNameErrMsg = document.getElementById("firstName_Err");
    fNameErrMsg.style.display = "block";
    return;
  } else {
    document.getElementById("firstName_Err").textContent = "";
  }
  if (email.length == "") {
    let emailErrMsg = document.getElementById("email_Err_empty");
    emailErrMsg.style.display = "block";
    let email_fmt = document.getElementById("email_Err_frmt");
    email_fmt.style.display = "none";
    return;
  } else {
    document.getElementById("email_Err_empty").textContent = "";
  }
  if (email.indexOf("@") < 0 && email.indexOf(".") < 0) {
    let emailErr = document.getElementById("email_Err_empty");
    emailErr.style.display = "none";
    let emailErrMsg_fmt = document.getElementById("email_Err_frmt");
    emailErrMsg_fmt.style.display = "block";
    return;
  } else {
    document.getElementById("email_Err_frmt").textContent = "";
  }
  if (mobile.length == "") {
    let mobErrMsg = document.getElementById("mobileNo_Err_empty");
    mobErrMsg.style.display = "block";
    let mobErr = document.getElementById("mobileNo_Err_frmt");
    mobErr.style.display = "none";
    return;
  } else {
    document.getElementById("mobileNo_Err_empty").textContent = "";
  }
  if (mobile.length !== 10 && mobile.match(mobRegex)) {
    let mobErrMsg = document.getElementById("mobileNo_Err_frmt");
    mobErrMsg.style.display = "block";
    let errMsg = document.getElementById("mobileNo_Err_empty");
    errMsg.style.display = "none";
    return;
  } else {
    document.getElementById("mobileNo_Err_frmt").textContent = "";
  }
  addRow();
}
