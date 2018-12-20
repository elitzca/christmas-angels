"use strict";
const formLogIn = document.querySelector("#log-in form");
const formSignUp = document.querySelector("#sign-up form");
const logInBut = document.querySelector("#log-in button");
const logCorner = document.querySelector("#logCorner");
const signCorner = document.querySelector("#signCorner");
const signUpDiv = document.querySelector("#sign-up-part");
const signSucc = document.querySelector("#sign-successful");

formSignUp.addEventListener("submit", e => {
  e.preventDefault();
  // console.log(form.elements);
  const myData = {
    createdAt: Date.now(),
    username: formSignUp.elements.username.value,
    firstName: formSignUp.elements.firstName.value,
    lastName: formSignUp.elements.lastName.value
  };
  // console.log(myData); -> new Object created
  fetch(`https://5bfd20f8827c3800139ae8df.mockapi.io/sign-in/users/`, {
    method: "post",
    body: JSON.stringify(myData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(dataNewUser => {
      console.log(dataNewUser); //new Object added to json, recieves id;
    });
  signUpDiv.classList.add("hidden");
  signSucc.classList.remove("hidden");
});

fetch("https://5bfd20f8827c3800139ae8df.mockapi.io/sign-in/users/")
  .then(res => res.json())
  .then(data => {
    // console.log(data);
  });

logInBut.addEventListener("click", logUserIn);

function logUserIn(e) {
  e.preventDefault();
  // console.log(formLogIn.elements);
  fetch(
    "https://5bfd20f8827c3800139ae8df.mockapi.io/sign-in/users/?search=" +
      formLogIn.elements.usernameLogIn.value
  )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.length == 1) {
        console.log(data, "Logged in Succ");
        localStorage.setItem("id", data[0].id);
        localStorage.setItem("firstName", data[0].firstName);
        window.location.href = "profile2.html";
      } else {
        document.querySelector("#wrong-user").classList.remove("hidden");
      }
    });
}
