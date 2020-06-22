const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Back to front button
const backBtn = document.getElementById('back-btn');


// Show input error message
function showError(input, message) {
  // parent to input
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  // small within the form-control
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  // parent to input
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function checkEmail(input) {
  // regex for email
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // do the test
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields
function checkRequiredField(input) {
  let inputOk = false;

  if (input.value.trim() === '') {
    showError(input, `${getFieldName(input)} is required`);
  } else {
    showSuccess(input);
    inputOk = true;
  }
  return inputOk;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters `
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters `
    );
  } else {
    showSuccess(input);
  }
}

function checkPassword(input) {
  // regex for password: at least 6 chars, letters and numbers´, at least one upper case and one lower case
  if (
    input.value.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/)
  ) {
    showSuccess(input);
  } else {
    showError(input, 'Password is not valid');
  }
}

function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Password do not match');
  } else {
    showSuccess(input2);
  }
}

function getFieldName(input) {
  // Make first letter CAP, add the rest
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event Listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (checkRequiredField(username) === true) {
    checkLength(username, 3, 15);
  }

  if (checkRequiredField(email) === true) {
    checkEmail(email);
  }

  if (checkRequiredField(password) === true) {
    checkPassword(password);
  }

  if (checkRequiredField(password2) === true) {
    checkPasswordMatch(password, password2);
  }
});

// Return to front page
backBtn.addEventListener('click', () => {
  console.log('redirect');
  window.location = '../../index.html';
});