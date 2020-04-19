const validateInput = function (billAmount, numUsers, selectedService) {
  let isFeedback = false;
  const feedback = document.querySelector(".feedback");
  feedback.innerHTML = "";

  if (billAmount === "" || billAmount <= "0") {
    feedback.innerHTML += `<p>Bill amount cannot be blank</p>`;
    isFeedback = true;
  }
  if (numUsers <= "0") {
    feedback.innerHTML += `<p>Number of users must be greater than zero</p>`;
    isFeedback = true;
  }
  if (selectedService === "0") {
    feedback.innerHTML += `<p>You must select a Service</p>`;
    isFeedback = true;
  }
  setTimeout(function () {
    feedback.innerHTML = "";
  }, 3000);

  return isFeedback;
};

const calculateTip = function (billAmount, numUsers, selectedService) {
  let percentTip = "";
  if (selectedService === "1") {
    percentTip = 0.2;
  } else if (selectedService === "2") {
    percentTip = 0.1;
  } else {
    percentTip = 0.02;
  }

  const tipAmount = Number(billAmount) * percentTip;
  const totalAmount = Number(billAmount) + Number(tipAmount);
  const eachPerson = Number(totalAmount) / Number(numUsers);

  return [tipAmount, totalAmount, eachPerson];
};

const services = [
  {
    value: 1,
    title: "great - 20%",
  },
  {
    value: 2,
    title: "good - 10%",
  },
  {
    value: 3,
    title: "bad - 2%",
  },
];

services.forEach(function (service) {
  const option = document.createElement("option");
  option.textContent = service.title;
  option.value = service.value;
  const select = document.querySelector("#select");
  select.appendChild(option);
});

const inputForm = document.querySelector("form");
inputForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const inputBill = document.querySelector("#bill");
  const inputUsers = document.querySelector("#users");
  const serviceValue = document.querySelector("#select");

  let billAmount = inputBill.value;
  let numUsers = inputUsers.value;
  let selectedService = serviceValue.value;

  const isFeedback = validateInput(billAmount, numUsers, selectedService);

  if (!isFeedback) {
    const loader = document.querySelector(".loader");
    const resultsDOM = document.querySelector(".results");
    const tipResultsDOM = document.querySelector("#tip");
    const totalAmountDOM = document.querySelector("#total");
    const eachPersonDOM = document.querySelector("#person");

    const results = calculateTip(billAmount, numUsers, selectedService);

    loader.classList.add("showItem");

    setTimeout(function () {
      loader.classList.remove("showItem");
      tipResultsDOM.textContent = `Tip Amount $ ${results[0].toFixed(2)}`;
      totalAmountDOM.textContent = `Total Amount $ ${results[1].toFixed(2)}`;
      eachPersonDOM.textContent = `Each Person Owes $ ${results[2].toFixed(2)}`;
      resultsDOM.classList.add("showItem");
    }, 4000);

    setTimeout(function () {
      inputBill.value = "";
      inputUsers.value = "";
      serviceValue.value = 0;
      resultsDOM.classList.remove("showItem");
    }, 10000);
  }
});
