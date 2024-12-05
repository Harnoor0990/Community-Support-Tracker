// DOM elements for Donation Tracker
const donationForm = document.getElementById("donation-form");
const donationErrorMessages = document.getElementById("donation-error-messages");
const donationTable = document.getElementById("donation-table").getElementsByTagName("tbody")[0];

// DOM elements for Volunteer Tracker
const volunteerForm = document.getElementById("volunteer-form");
const volunteerErrorMessages = document.getElementById("volunteer-error-messages");
const volunteerTable = document.getElementById("volunteer-table").getElementsByTagName("tbody")[0];


// Generic function to handle form submissions
function handleFormSubmission(form, tableBody, errorMessages, dataKey, validationFn) {
    return function (event) {
      event.preventDefault();
      errorMessages.innerHTML = "";
  
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const errors = validationFn(data);
  
      if (errors.length > 0) {
        errorMessages.innerHTML = errors.join("<br>");
        return;
      }
  
      // Save to localStorage
      let existingData = JSON.parse(localStorage.getItem(dataKey)) || [];
      existingData.push(data);
      localStorage.setItem(dataKey, JSON.stringify(existingData));
  
      form.reset();
      loadDataToTable(tableBody, dataKey);
    };
  }
  
  // Function to load data from localStorage into the table
  function loadDataToTable(tableBody, dataKey) {
    const data = JSON.parse(localStorage.getItem(dataKey)) || [];
    tableBody.innerHTML = "";
    data.forEach(item => {
      const row = tableBody.insertRow();
      Object.values(item).forEach(value => {
        const cell = row.insertCell();
        cell.textContent = value;
      });
    });
  }
  
  // Validation functions
  function validateDonation(data) {
    const errors = [];
    if (!data['charity-name']) errors.push("Charity name is required.");
    if (!data['donation-amount'] || isNaN(data['donation-amount']) || data['donation-amount'] <= 0) {
      errors.push("Donation amount must be a positive number.");
    }
    if (!data['donation-date']) errors.push("Donation date is required.");
    return errors;
  }
function validateVolunteer(data) {
  const errors = [];
  if (!data['volunteer-name']) errors.push("Volunteer name is required.");
  if (!data['volunteer-email']) errors.push("Email is required.");
  if (!data['volunteer-availability']) errors.push("Availability is required.");
  return errors;
}

  // Event listeners
donationForm.addEventListener("submit", handleFormSubmission(donationForm, donationTable, donationErrorMessages, "donations", validateDonation));
volunteerForm.addEventListener("submit", handleFormSubmission(volunteerForm, volunteerTable, volunteerErrorMessages, "volunteers", validateVolunteer));
// Load data on page load
window.onload = function() {
    loadDataToTable(donationTable, "donations");
    loadDataToTable(volunteerTable, "volunteers");
};
