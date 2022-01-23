const email = document.getElementById('email')
const country = document.getElementById('country')
const zipcode = document.getElementById('zipcode')
const password1 = document.getElementById('password1')
const password2 = document.getElementById('password2')
const submit = document.getElementById('submit')

submit.addEventListener('click', (e) => {
    e.preventDefault();
    checkValidity();
})

email.addEventListener('input', () => {
    if (email.validity.typeMismatch) {
        setErrorFor(email, 'I was expecting a proper email address, you\'ve failed me!')
    } else {
        setSuccessFor(email)
    }
})

country.addEventListener('input', () => {
    let ctr = country.value.trim();

    if (containsNumber(ctr) && containsSpecialChars(ctr)) {
        setErrorFor(country, 'WTF is this, are country names consist of numbers and special characters?')
    } else if (containsNumber(ctr) && !containsSpecialChars(ctr)) {
        setErrorFor(country, 'Numbers? seriously?')
    } else if (!containsNumber(ctr) && containsSpecialChars(ctr)) {
        setErrorFor(country, '*&^%?, is it your language?')
    } else {
        setSuccessFor(country)
    }
})

zipcode.addEventListener('input', () => {
    const zipCode = zipcode.value.trim();

    if (!isValidzipcode(zipCode)) {
        setErrorFor(zipcode, 'US zip codes work only')
    } else {
        setSuccessFor(zipcode);
    }
})

password1.addEventListener('input', () => {
    const pass = password1.value

    if (isTooLong(pass)) {
        setErrorFor(password1, 'Must be 8 or less characters')
    } else if (!containsNumber(pass)) {
        setErrorFor(password1, 'Must contain number')
    } else if (!containsSpecialChars(pass)) {
        setErrorFor(password1, 'Must contain special character')
    } else {
        setSuccessFor(password1)
    }
})

password2.addEventListener('input', () => {
    const pass = password2.value

    if (password2.value !== password1.value) {
        setErrorFor(password2, 'Must match password above')
    } else {
        setSuccessFor(password2);
    }
})

function isTooLong(str) {
    if (str.length > 8) {
        return true;
    } else {
        return false;
    }
}

function isValidzipcode(str) {
    const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
    return isValidZip.test(str);
}

function containsNumber(str) {
    return /\d/.test(str);
}

function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

function setErrorFor(input, message) {
    const formControl = input.parentElement
    const err = formControl.querySelector('.error-message');

    err.innerHTML = message;

    formControl.classList.remove('success')
    formControl.classList.add('error')
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    
    formControl.classList.remove('error')
    formControl.classList.add('success')
}