const passwordCheckboxOptions = {
  lowerCase: false,
  upperCase: false,
  numerals: false,
  symbols: false,
};
const unicodeArrays = {
  lowerCase: [...Array(26).keys()].map((n) => n + 97),
  upperCase: [...Array(26).keys()].map((n) => n + 65),
  numerals: [...Array(10).keys()].map((n) => n + 48),
  symbols: [
    ...[...Array(15).keys()].map((n) => n + 33),
    ...[...Array(7).keys()].map((n) => n + 58),
    ...[...Array(6).keys()].map((n) => n + 91),
    ...[...Array(4).keys()].map((n) => n + 123),
  ],
};
initializeEventListeners();

/*--------------------------------------------------------------------*/

function initializeEventListeners() {
  document.querySelector("#length").addEventListener("change", (event) => {
    if (event.target.value < 8) {
      event.target.value = 8;
    }
    if (event.target.value > 128) {
      event.target.value = 128;
    }
  });

  for (checkbox of document.querySelectorAll("input[type=checkbox]")) {
    checkbox.addEventListener("change", (event) => {
      passwordCheckboxOptions[event.target.value] = event.target.checked;
      document.querySelector("#generate").disabled = !isOneOptionSelected();
    });
  }

  document
    .querySelector("#password-options-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      generatePassword();
    });
}

function isOneOptionSelected() {
  for (option in passwordCheckboxOptions) {
    if (passwordCheckboxOptions[option]) return true;
  }
  return false;
}

function generatePassword() {
  let passwordUnicodeOptions = [];
  let password = [];
  let remainingLength = Number(document.querySelector("#length").value);

  for (option in passwordCheckboxOptions) {
    if (passwordCheckboxOptions[option]) {
      password.push(
        String.fromCharCode(
          unicodeArrays[option][
            Math.floor(Math.random() * unicodeArrays[option].length)
          ]
        )
      );
      passwordUnicodeOptions = passwordUnicodeOptions.concat(
        unicodeArrays[option]
      );
      remainingLength--;
    }
  }

  for (i = 0; i < remainingLength; i++) {
    password.push(
      String.fromCharCode(
        passwordUnicodeOptions[
          Math.floor(Math.random() * passwordUnicodeOptions.length)
        ]
      )
    );
  }
  var passwordText = document.querySelector("#password");
  passwordText.value = shuffle(password);
}

function shuffle(password) {
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join("");
}
