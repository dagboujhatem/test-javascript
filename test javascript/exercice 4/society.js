let CompanyName = document.getElementById("companyname");
let email = document.getElementById("email");
let adress = document.getElementById("adress");
let submit = document.getElementById("submit");
let employers = JSON.parse(localStorage.getItem("employers") || "[]");
//console.log(employers);
/*const employee = employers.find(
  (employee) => employee.email == Email && employee.userName == userName
);*/
//console.log(employee);
let mood = "create";
let tmp;

let dataComp;
if (localStorage.companies != null) {
  dataComp = JSON.parse(localStorage.companies);
} else {
  dataComp = [];
}

submit.onclick = function () {
  let newComp = {
    CompanyName: CompanyName.value,

    email: email.value,
    adress: adress.value,
    employers: employers,
  };

  //console.log(dataEmp);
  if (CompanyName.value != "") {
    if (mood === "create") {
      dataComp.push(newComp);

      //console.log(dataEmp);
    } else {
      dataComp[tmp] = newComp;
      mood = "create";
      submit.innerHTML = "Create";
    }
  }

  //save localstorage
  localStorage.setItem("companies", JSON.stringify(dataComp));

  clearData();
  showData();
};

function clearData() {
  CompanyName.value = "";
  // lastName.value = "";
  email.value = "";
  adress.value = "";
}

function showData() {
  let table = "";
  for (let i = 0; i < dataComp.length; i++) {
    table += `
                 <tr>
                      <td >${i}</td>
                      <td>${dataComp[i].CompanyName}</td>
                      <td>${dataComp[i].email}</td>
                      <td>${dataComp[i].adress}</td>
                      
                      <td><button onclick="updateData(${i})"  type="button" class="  btn btn-warning waves-light">Edit</button></td>
                      <td><button onclick="deleteData(${i})"  type="button" class="  btn btn-danger waves-light">Delete</button></td>
                    </tr>`;
  }
  /* <td>${employee.userName}</td>*/
  document.getElementById("tbody").innerHTML = table;
}
function updateData(i) {
  CompanyName.value = dataComp[i].CompanyName;
  // lastName.value =dataComp[i].lasttName;
  adress.value = dataComp[i].adress;
  email.value = dataComp[i].email;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  showData();
}
function deleteData(i) {
  dataComp.splice(i, 1);
  localStorage.companies = JSON.stringify(dataComp);
  showData();
}

showData();
