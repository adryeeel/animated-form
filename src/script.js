// Animations script

const loginButton = document.querySelector("form .login-button");
const formBox = document.getElementById("form-box");
const meter = document.querySelector(".input-block .strength-meter");
const passwordField = document.getElementById("password");
const fields = [...document.querySelectorAll(".input-block input")];
const pwdHints = document.getElementById("pwd-hints");

formBox.addEventListener("animationend", (event) => {
	if (event.animationName === "slide-right") {
		formBox.style.display = "none";
	}
});

function verifyErrors(field) {
	let foundError = false;

	for (let error in field.validity) {
		if (field.validity[error] && !field.validity.valid) {
			foundError = error;
		}
	}
	return foundError;
}

loginButton.addEventListener("click", (event) => {
	let allFieldsValid = 0;

	for (let field of fields) {
		let hasError = verifyErrors(field);

		if (hasError || pwdAllTipsIsTrue == false) {
			event.preventDefault();

			formBox.classList.add("no-no");
			pwdHints.classList.add("no-no");

			formBox.addEventListener("animationend", (event) => {
				if (event.animationName === "no-no") {
					formBox.classList.remove("no-no");
					pwdHints.classList.remove("no-no");
				}
			});
		} else {
			allFieldsValid++;
		}
	}

	if (allFieldsValid == 2) {
		pwdHints.style.display = "none";
		loginButton.classList.add("pressed");
		formBox.classList.add("form-hidden");
	}
});

// Generate the bubbles
const bubbles = document.querySelector("ul.squares");

for (let i = 0; i < 15; i++) {
	const li = document.createElement("li");

	const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

	const size = random(20, 60);
	const postion = random(10, 90);
	const delay = random(0.1, 10);
	const duration = random(12, 24);
	const borderRadius = random(0, 50);

	li.style.width = `${size}px`;
	li.style.height = `${size}px`;
	li.style.left = `${postion}vw`;
	li.style.animationDelay = `${delay}s`;
	li.style.animationDuration = `${duration}s`;
	li.style.borderRadius = `${borderRadius}px`;
	li.style.animationTimingFunction = `cubic-bezier(${
		(Math.random(), Math.random(), Math.random(), Math.random())
	})`;

	bubbles.appendChild(li);
}

function pwdTips(password) {
	const letter = document.getElementById("letter");
	const capital = document.getElementById("capital");
	const number = document.getElementById("number");
	const length = document.getElementById("length");
	const symbol = document.getElementById("symbol");

	let lowerCaseLetters = /[a-z]/g;
	let symbolCase = /[^A-Za-z0-9]/g;
	let upperCaseLetters = /[A-Z]/g;
	let numberCase = /[0-9]/g;

	let checkPasswordValid = 0;

	if (password.match(lowerCaseLetters)) {
		letter.classList.remove("invalid-tip");
		letter.classList.add("valid-tip");

		checkPasswordValid++;
	} else {
		letter.classList.remove("valid-tip");
		letter.classList.add("invalid-tip");
	}

	if (password.match(upperCaseLetters)) {
		capital.classList.remove("invalid-tip");
		capital.classList.add("valid-tip");

		checkPasswordValid++;
	} else {
		capital.classList.remove("valid-tip");
		capital.classList.add("invalid-tip");
	}

	if (password.match(numberCase)) {
		number.classList.remove("invalid-tip");
		number.classList.add("valid-tip");

		checkPasswordValid++;
	} else {
		number.classList.remove("valid-tip");
		number.classList.add("invalid-tip");
	}

	if (password.match(symbolCase)) {
		symbol.classList.remove("invalid-tip");
		symbol.classList.add("valid-tip");

		checkPasswordValid++;
	} else {
		symbol.classList.remove("valid-tip");
		symbol.classList.add("invalid-tip");
	}

	if (passwordField.value.length >= 8) {
		length.classList.remove("invalid-tip");
		length.classList.add("valid-tip");

		checkPasswordValid++;
	} else {
		length.classList.remove("valid-tip");
		length.classList.add("invalid-tip");
	}

	if (checkPasswordValid === 5) {
		return true;
	} else {
		return false;
	}
}

function passwordMeter() {
	function PasswordStrength(password) {
		let strongPassword = new RegExp(
			"(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
		);

		let mediumPassword = new RegExp(
			"(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"
		);

		let weekPassword = new RegExp("(?=.{1,})");

		let passwordStrengthSpans = document.querySelector(
			".strength-meter span"
		);

		if (strongPassword.test(password)) {
			passwordStrengthSpans.style.backgroundColor = "#20a820";
			passwordStrengthSpans.style.width = "100%";
		} else if (mediumPassword.test(password)) {
			passwordStrengthSpans.style.backgroundColor = "#e6da44";
			passwordStrengthSpans.style.width = "66%";
		} else if (weekPassword.test(password)) {
			passwordStrengthSpans.style.backgroundColor = "#d13636";
			passwordStrengthSpans.style.width = "34%";
		} else {
			passwordStrengthSpans.style.width = "0%";
		}
	}

	let password = document.getElementById("password");
	PasswordStrength(password.value);
}

var pwdAllTipsIsTrue;

document
	.querySelector(".input-block .show-pw-button")
	.addEventListener("click", (event) => {
		let showPassword = document.querySelector(
			".input-block .show-pw-button"
		);

		if (showPassword.classList.contains("active")) {
			document
				.querySelector(".input-block #password")
				.setAttribute("type", "password");
			showPassword.classList.remove("active");
		} else {
			document
				.querySelector(".input-block #password")
				.setAttribute("type", "text");
			showPassword.classList.add("active");
		}
	});

passwordField.onfocus = function () {
	meter.style.opacity = "1";

	passwordField.addEventListener("keyup", () => {
		passwordMeter();
		pwdAllTipsIsTrue = pwdTips(passwordField.value);
	});

	pwdHints.style.display = "flex";

	pwdHints.animate(
		[{ transform: "translateX(0px)" }, { transform: "translateX(292px)" }],
		{
			duration: 500,
			direction: "alternate",
			easing: "ease-in-out",
			fill: "forwards",
		}
	);
};

passwordField.onblur = function () {
	meter.style.opacity = "0";

	pwdHints.animate(
		[{ transform: "translateX(292px)" }, { transform: "translateX(0px)" }],
		{
			duration: 500,
			direction: "alternate",
			easing: "ease-in-out",
			fill: "forwards",
		}
	);
};

document.querySelector("form").addEventListener("submit", (event) => {
	event.preventDefault();
	console.log("Valid form submited");
});
