let lastName = document.getElementById("lastname");
let firstName = document.getElementById("firstname");
let email = document.getElementById("email");
let adress = document.getElementById("adress");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;

let dataEmp;
if (localStorage.employers != null) {
  dataEmp = JSON.parse(localStorage.employers);
} else {
  dataEmp = [];
}

submit.onclick = function () {
  let newEmp = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    adress: adress.value,
  };

  //console.log(dataEmp);
  if (firstName.value != "") {
    if (mood === "create") {
      dataEmp.push(newEmp);

      //console.log(dataEmp);
    } else {
      dataEmp[tmp] = newEmp;
      mood = "create";
      submit.innerHTML = "Create";
    }
  }

  //save localstorage
  localStorage.setItem("employers", JSON.stringify(dataEmp));

  clearData();
  showData();
};

function clearData() {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  adress.value = "";
}

function showData() {
  let table = "";
  for (let i = 0; i < dataEmp.length; i++) {
    table += `
                 <tr>
                      <td >${i}</td>
                      <td>${dataEmp[i].firstName}</td>
                      <td>${dataEmp[i].lastName}</td>
                      <td>${dataEmp[i].email}</td>
                      <td>${dataEmp[i].adress}</td>
                      <td><button onclick="updateData(${i})"  type="button" class="  btn btn-warning waves-light">Edit</button></td>
                      <td><button onclick="deleteData(${i})"  type="button" class="  btn btn-danger waves-light">Delete</button></td>
                    </tr>`;
  }

  document.getElementById("tbody").innerHTML = table;
}
function updateData(i) {
  firstName.value = dataEmp[i].firstName;
  lastName.value = dataEmp[i].lastName;
  adress.value = dataEmp[i].adress;
  email.value = dataEmp[i].email;
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
  dataEmp.splice(i, 1);
  localStorage.employers = JSON.stringify(dataEmp);
  showData();
}

showData();
