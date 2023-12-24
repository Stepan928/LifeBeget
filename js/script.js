// Preloader
const body = document.querySelector("body");
window.addEventListener('load', function () {
	body.style.overflow = "auto";
	document.querySelector('.preloader-wrapper').style.opacity = '0';
	setTimeout(function () {
		document.querySelector('.preloader-wrapper').style.display = 'none';
	}, 800);
});

// Call Free
const addClickListener = (selector, callback) =>
	document.querySelectorAll(selector).forEach(item => item.addEventListener('click', callback));

const callFreeContainer = document.getElementById('callFreeContainer');

addClickListener('.callFreeBtn', () => {
	callFreeContainer.style.display = 'block';
	document.body.style.overflow = window.matchMedia('(max-width: 767px)').matches ? 'hidden' : 'auto';
	setTimeout(() => callFreeContainer.classList.add('active'), 100);
});
document.getElementById('callFreeClose').addEventListener('click', () => {
	callFreeContainer.classList.remove('active');
	document.body.style.overflow = window.matchMedia('(max-width: 767px)').matches ? 'auto' : 'auto';
	setTimeout(() => (callFreeContainer.style.display = 'none'), 300);
});

// Platforms & Frequently Asked Questions Accordions
function addToggleClickEvent(selector) {
	document.querySelectorAll(selector).forEach(item =>
		item.addEventListener("click", () => item.classList.toggle("active"))
	);
}

["faq__main", "platforms__item"].forEach(selector => addToggleClickEvent(`.${selector}`));

// Contact Form Message Send
function getValue(id) {
	return document.getElementById(id).value;
}
function clearValues(ids) {
	ids.forEach(id => document.getElementById(id).value = "");
}
function sendMail(button) {
	const params = {
		from_name: getValue("name"),
		company: getValue("company"),
		email: getValue("email"),
		phone: getValue("phone"),
		message: getValue("message"),
	};
	const checkBox = document.getElementById("check");
	const submitButton = document.querySelector("button[name='submit']");

	if (checkBox.checked) {
		submitButton.disabled = true;
		button.innerHTML = "Sending <span class='dot-animation'><span>.</span><span>.</span><span>.</span></span>";

		emailjs.send("service_e1grxb6", "template_ynukxil", params)
			.then(function (res) {
				clearValues(["name", "company", "email", "phone", "message"]);
				console.log("Success! " + res.status);
				checkBox.checked = false;
				document.getElementById("notification").style.display = "block";
			})
			.catch(function (error) {
				console.error("Error sending email: ", error);
				alert("An error occurred while sending the email. Please try again later.");
			})
			.finally(function () {
				submitButton.disabled = false;
				button.innerText = "Start a Project";
			});
	}
}