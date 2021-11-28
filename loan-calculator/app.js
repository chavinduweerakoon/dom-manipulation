document
  .getElementById("loan-form")
  .addEventListener("submit", calculateResults);

function calculateResults(event) {
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedIntererest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //compute monthly payment
  const x = Math.pow(1 + calculatedIntererest, calculatedPayments);
  const monthly = (principal * x * calculatedIntererest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (calculatedPayments * monthly - principal).toFixed(2);
  } else {
    showError("Please check you numbers");
  }

  event.preventDefault();
}

function showError(errorMessage) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(errorMessage));

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
