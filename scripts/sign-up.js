"use strict";
const formLogIn = document.querySelector("#log-in form");
const formSignUp = document.querySelector("#sign-up form");
const logInBut = document.querySelector("#log-in button");
const logCorner = document.querySelector("#logCorner");
const signCorner = document.querySelector("#signCorner");

logCorner.addEventListener("click", function() {
  console.log("i was clicked");
  document.querySelector("section#sign-up").classList.add("hidden");
  document.querySelector("section#log-in").classList.remove("hidden");
});

signCorner.addEventListener("click", function() {
  document.querySelector("section#log-in").classList.add("hidden");
  document.querySelector("section#sign-up").classList.remove("hidden");
});

if (localStorage.getItem("id")) {
  console.log("you are logged");
}

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
});

fetch("https://5bfd20f8827c3800139ae8df.mockapi.io/sign-in/users/")
  .then(res => res.json())
  .then(data => {
    console.log(data);
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
        console.log("you are not logged in");
      }
    });
}

/* const submitBut = document.querySelector("#submit-btn");
const formData = {
  username: document.getElementById("username").value,
  email: document.querySelector("input#email").value,
  firstName: document.querySelector("input#first").value,
  lastName: document.querySelector("input#last").value,
  password: document.querySelector("input#password").value
};

document.getElementById("username").addEventListener("keyup", function() {
  formData.username = document.getElementById("username").value;
});

document.querySelector("input#email").addEventListener("keyup", function() {
  formData.email = document.querySelector("input#email").value;
});

document.querySelector("input#first").addEventListener("keyup", function() {
  formData.firstName = document.querySelector("input#first");
});

document.querySelector("input#last").addEventListener("keyup", function() {
  formData.lastName = document.querySelector("input#last");
});

document.querySelector("input#password").addEventListener("keyup", function() {
  formData.password = document.querySelector("input#password");
});

submitBut.addEventListener("click", getData);

function getData() {
  console.log(formData);
}

var textData = JSON.stringify(formData);
//console.log(textData);

localStorage.setItem("user", textData);
console.log(user);
// create global variable with number 0
// when clicking on submit add 1 to the variable - variable++
// add the varible to the keyname which is "user"+ variablename
// setitem in local storage in the submit function -getData
// const usersData = "http(s)://5bfd20f8827c3800139ae8df.mockapi.io/sign-in/:endpoint
// "

window.addEventListener("DOMContentLoaded", init);

function init() {
  //parse
}
 */
