var dobInput = document.getElementById("dob");
var dobValue = new Date(dobInput.value.replace(/-/g, "/")); // Ensure consistent date format
// Function to validate the date of birth
function validateDateOfBirth(dob) {
  // ... (same validation logic)
}

// Function to handle form submission
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect form data
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var dobInput = document.getElementById("dob");
    var dob = dobInput.value;
    var acceptTerms = document.getElementById("acceptTerms").checked;

    // Validate date of birth
    if (!validateDateOfBirth(dob)) {
      alert("Invalid date of birth.");
      return;
    }

    // Validate other form fields (add similar checks for name, email, password)

    var formData = {
      name: name,
      email: email,
      password: password,
      dob: dob,
      acceptTerms: acceptTerms,
    };

    // Save data to web storage
    var savedData = JSON.parse(localStorage.getItem("registrationData")) || [];
    savedData.push(formData);
    localStorage.setItem("registrationData", JSON.stringify(savedData));

    // Load and display saved data
    loadSavedData();
  });
