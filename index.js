// Function to validate the date of birth
function validateDateOfBirth() {
    var dobInput = document.getElementById("DOB");
    var dobValue = new Date(DOBInput.value);
    var currentDate = new Date();
    var minDate = new Date(currentDate.getFullYear() - 55, currentDate.getMonth(), currentDate.getDate());
    var maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());

    if (dobValue < minDate || dobValue > maxDate) {
        alert("Date of birth must be between 18 and 55 years.");
        DOBInput.value = ""; // Clear the invalid date
    } else {
        alert("Thank you for providing a valid date of birth.");
    }
}

// Function to load saved data from web storage
function loadSavedData() {
    var savedData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    var tableBody = document.getElementById("TableBody");

    // Clear table body
    TableBody.innerHTML = "";

    // Populate table with saved data
    savedData.forEach(function (data) {
        var row = TableBody.insertRow();
        for (var key in data) {
            var cell = row.insertCell();
            cell.textContent = data[key];
        }
    });
}

// Function to handle form submission
document.getElementById("Registration Form").addEventListener("Submit", function (event) {
    event.preventDefault();

    var Name = document.getElementById("Name").value;
    var Email = document.getElementById("Email").value;
    var Password = document.getElementById("Password").value;
    var DOB = document.getElementById("DOB").value;
    var AcceptTerms = document.getElementById("AcceptTerms?").checked;

    var formData = { Name: Name, Email: Email, Password: Password, DOB: DOB, AcceptTerms: AcceptTerms };

    // Save data to web storage
    var savedData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    savedData.push(formData);
    localStorage.setItem("RegistrationData", JSON.stringify(savedData));

    // Load and display saved data
    loadSavedData();
    
    // Validate date of birth and show an alert
    validateDateOfBirth();
});

// Load saved data when the page loads
window.onload = loadSavedData;
