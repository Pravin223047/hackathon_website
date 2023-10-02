const form = document.querySelector("form");
const statusTxt = form.querySelector(".button-area span");

form.onsubmit = (e) => {
  e.preventDefault();
  statusTxt.style.color = "#0D6EFD";
  statusTxt.style.display = "block";
  statusTxt.innerText = "Sending your message...";
  form.classList.add("disabled");

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "message.php", true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"); // Add an X-Requested-With header for security
  xhr.onload = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let response = xhr.response;
      if (
        response.includes("required") ||
        response.includes("valid") ||
        response.includes("failed")
      ) {
        statusTxt.style.color = "red";
      } else {
        form.reset();
        setTimeout(() => {
          statusTxt.style.display = "none";
        }, 3000);
      }
      statusTxt.innerText = response;
      form.classList.remove("disabled");
    }
  };

  let formData = new FormData(form);
  xhr.send(formData);
};

const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".home_video");
var sliderNav = function (manual) {
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  btns[manual].classList.add("active");
  slides[manual].classList.add("active");
};

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    sliderNav(i);
  });
});
