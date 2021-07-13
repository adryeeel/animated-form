// Animations script

const loginButton = document.querySelector(".login-button");
const formBox = document.getElementById("form-box");
const passwordField = document.getElementById("password");

loginButton.addEventListener("click", (event) => {
	const fields = [...document.querySelectorAll(".input-block input")];

	fields.forEach((field) => {
		if (field.value === "") {
			formBox.classList.add("no-no");
		}
	});

	const checkError = document.querySelector(".no-no");
	if (checkError) {
		checkError.addEventListener("animationend", (event) => {
			if (event.animationName === "no-no") {
				checkError.classList.remove("no-no");
			}
		});
	} else {
		loginButton.classList.add("pressed");
		formBox.classList.add("form-hidden");
	}
});

formBox.addEventListener("animationend", (event) => {
	if (event.animationName === "slide-right") {
		formBox.style.display = "none";
	}
});

const pwdHints = document.getElementById("pwd-hints");

passwordField.addEventListener("focus", (event) => {
	meter.style.opacity = "1";

	pwdHints.style.display = "block";
	pwdHints.classList.add("slide-out");
});

passwordField.addEventListener("blur", (event) => {
	// Hide the meter when the field loses its focus
	meter.style.opacity = "0";

	pwdHints.classList.add("slide-in");

	if (pwdHints) {
		pwdHints.addEventListener("animationend", (event) => {
			if (event.animationName === "slide-in") {
				pwdHints.style.display = "none";
				pwdHints.classList.remove("slide-in");
				pwdHints.classList.remove("slide-out");
			}
		});
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

	if (password.match(lowerCaseLetters)) {
		letter.classList.remove("invalid-tip");
		letter.classList.add("valid-tip");
	} else {
		letter.classList.remove("valid-tip");
		letter.classList.add("invalid-tip");
	}

	if (password.match(upperCaseLetters)) {
		capital.classList.remove("invalid-tip");
		capital.classList.add("valid-tip");
	} else {
		capital.classList.remove("valid-tip");
		capital.classList.add("invalid-tip");
	}

	if (password.match(numberCase)) {
		number.classList.remove("invalid-tip");
		number.classList.add("valid-tip");
	} else {
		number.classList.remove("valid-tip");
		number.classList.add("invalid-tip");
	}

	if (password.match(symbolCase)) {
		symbol.classList.remove("invalid-tip");
		symbol.classList.add("valid-tip");
	} else {
		symbol.classList.remove("valid-tip");
		symbol.classList.add("invalid-tip");
	}

	if (passwordField.value.length >= 8) {
		length.classList.remove("invalid-tip");
		length.classList.add("valid-tip");
	} else {
		length.classList.remove("valid-tip");
		length.classList.add("invalid-tip");
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

let meter = document.querySelector(".input-block .strength-meter");

// Show the meter when a click event happens in the password field.
passwordField.addEventListener("focus", (event) => {
	meter.style.opacity = "1";

	passwordField.addEventListener("keyup", (event) => {
		passwordMeter();
		pwdTips(passwordField.value);
	});
});

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

const fields = document.querySelectorAll("[required]");

fields.forEach((field) => {
	field.addEventListener("invalid", (event) => {
		event.preventDefault();
	});
});

document.querySelector("form").addEventListener("submit", (event) => {
	event.preventDefault();
	console.log("Formulário válido enviado.");
});
