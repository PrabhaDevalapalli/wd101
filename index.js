document.addEventListener("DOMContentLoaded", function () {
  const usersDetails = localStorage.getItem("users");

  if (usersDetails) {
    users = JSON.parse(usersDetails);
    updateTable();
  }
});

function showError(message) {
  errorContainer.textContent = message;
}

let users = [];
let errorContainer = document.querySelector(".error-msg");
let form = document.getElementById("formData");
let nameElement = document.getElementById("name");
let emailElement = document.getElementById("email");
let passwordElement = document.getElementById("password");
let dobElement = document.getElementById("dob");
let checkBoxElement = document.getElementById("agree");
let tableBody = document.getElementById("tableBody");

function isFieldEmpty(value) {
  return value.trim() === "";
}

function isInvalidAge(age) {
  const currentDate = new Date();
  const userDob = new Date(age);
  const userAge = currentDate.getFullYear() - userDob.getFullYear();
  return userAge < 18 || userAge > 55;
}

function updateTable() {
  let htmlContent = "";
  users.forEach(function (userDetails) {
    htmlContent += `<tr>
      <td>${userDetails.name}</td>
      <td>${userDetails.email}</td>
      <td>${userDetails.password}</td>
      <td>${userDetails.dob}</td>
      <td>${userDetails.terms}</td>
    </tr>`;
  });
  tableBody.innerHTML = htmlContent;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const userName = nameElement.value;
  const userEmail = emailElement.value;
  const userPassword = passwordElement.value;
  const userDob = dobElement.value;
  const acceptedTerms = checkBoxElement.checked;

  if (isFieldEmpty(userName)) {
    showError("Name cannot be empty. Please fill in that field.");
    return;
  }
  if (isFieldEmpty(userEmail)) {
    showError("Email is required. Please fill in that field.");
    return;
  }
  if (isFieldEmpty(userPassword)) {
    showError("Please fill in the password.");
    return;
  }
  if (isFieldEmpty(userDob)) {
    showError("Date of Birth is required.");
    return;
  }
  if (isInvalidAge(userDob)) {
    showError("Your age should be between 18 and 55.");
    return;
  }

  showError("");

  const user = {
    name: userName,
    email: userEmail,
    password: userPassword,
    dob: userDob,
    terms: acceptedTerms,
  };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  updateTable();
  form.reset();
});
