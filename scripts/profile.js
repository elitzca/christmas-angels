"use strict";
const donationFormMoney = document.querySelector("div.money-don form");
const donationFormGift = document.querySelector("div.gift-don form");
const userId = parseInt(localStorage.id); //changed "let" to "const"
const logOutBut = document.querySelector("#log-out");
const childrenHappy = document.querySelector("#children-happy");
const ccName = document.querySelector("#ccname");
const ccNumber = document.querySelector("#ccnum");
const ccMonth = document.querySelector("#expmonth");
const ccYear = document.querySelector("#expyear");
const ccCVV = document.querySelector("#cvv");
const saveCardBut = document.querySelector("#save-card-btn");
const ccDiv = document.querySelector(".cc-anim");
const ccImg = document.querySelector("#cc");
const editBut = document.querySelector(".cc-anim button");
const cardForm = document.querySelector(".user-card form");

ccDiv.classList.add("hidden");

saveCardBut.addEventListener("click", e => {
  e.preventDefault();
  localStorage.setItem("ccName", ccName.value);
  localStorage.setItem("ccNumber", ccNumber.value);
  localStorage.setItem("ccMonth", ccMonth.value);
  localStorage.setItem("ccYear", ccYear.value);
  localStorage.setItem("ccCVV", ccCVV.value);

  cardForm.classList.add("hidden");
  ccDiv.classList.remove("hidden");
  ccImg.classList.add("turn");

  document.querySelector("#insuff1").classList.add("hidden");
  document.querySelector("#insuff2").classList.add("hidden");
  document.querySelector(".money-don form").classList.remove("hidden");
  document.querySelector(".gift-don form").classList.remove("hidden");
});

editBut.addEventListener("click", editDetails);

function editDetails() {
  ccDiv.classList.add("hidden");
  cardForm.classList.remove("hidden");
}

ccName.value = localStorage.getItem("ccName");
ccNumber.value = localStorage.getItem("ccNumber");
ccMonth.value = localStorage.getItem("ccMonth");
ccYear.value = localStorage.getItem("ccYear");
ccCVV.value = localStorage.getItem("ccCVV");

fetch("https://5bfd20f8827c3800139ae8df.mockapi.io/sign-in/users/" + userId)
  .then(res => res.json())
  .then(data => {
    let children = 0;
    fetch("http://5bfd20f8827c3800139ae8df.mockapi.io/sign-in/money")
      .then(res => res.json())
      .then(data => {
        let amount = 0;
        data.forEach(donation => {
          if (donation.userId == userId) {
            amount += donation.amount;
          }
        });
        children += Math.floor(amount / 100);
        console.log(children);
        document.querySelector("p#amount-donated").innerHTML = amount + "kr";

        fetch("http://5bfd20f8827c3800139ae8df.mockapi.io/sign-in/gifts")
          .then(res => res.json())
          .then(data => {
            console.log(data);
            let doll = 0;
            let car = 0;
            let puzzle = 0;
            let book = 0;
            let horse = 0;
            let lego = 0;

            data.forEach(giftDonation => {
              if (giftDonation.userId == userId) {
                console.log(giftDonation);
                if (giftDonation.gift.doll) {
                  doll += giftDonation.gift.doll;
                }
                if (giftDonation.gift.car) {
                  car += giftDonation.gift.car;
                }
                if (giftDonation.gift.puzzle) {
                  puzzle += giftDonation.gift.puzzle;
                }
                if (giftDonation.gift.coloringBook) {
                  book += giftDonation.gift.coloringBook;
                }
                if (giftDonation.gift.ridingHorse) {
                  horse += giftDonation.gift.ridingHorse;
                }
                if (giftDonation.gift.lego) {
                  lego += giftDonation.gift.lego;
                }
              }
            });
            children += doll + car + lego + book + horse + puzzle;
            console.log(children);
            document.querySelector("#children-happy").innerHTML = children;

            const giftList = document.querySelector("#gifts-don");
            if (doll > 0) {
              giftList.insertAdjacentHTML(
                "beforeend",
                `<li> dolls: ${doll}</li>`
              );
            }
            if (car > 0) {
              giftList.insertAdjacentHTML(
                "beforeend",
                `<li> cars: ${car}</li>`
              );
            }
            if (puzzle > 0) {
              giftList.insertAdjacentHTML(
                "beforeend",
                `<li> puzzles: ${puzzle}</li>`
              );
            }
            if (book > 0) {
              giftList.insertAdjacentHTML(
                "beforeend",
                `<li> coloring book: ${book}</li>`
              );
            }
            if (horse > 0) {
              giftList.insertAdjacentHTML(
                "beforeend",
                `<li> rocking horse:: ${horse}</li>`
              );
            }
            if (lego > 0) {
              giftList.insertAdjacentHTML(
                "beforeend",
                `<li> lego: ${lego}</li>`
              );
            }
          });
      });
    //

    console.log(data);
    helloUser(data);
  });

function helloUser(data) {
  // console.log();
  document.querySelector("#user-name").innerHTML = data.firstName;
}

//donating money
donationFormMoney.addEventListener("submit", e => {
  e.preventDefault();
  console.log(donationFormMoney.elements.amount.value);
  const mySum = {
    amount: parseInt(donationFormMoney.elements.amount.value),
    createdAt: Date.now(),
    userId
  };
  if (
    localStorage.getItem("ccName") &&
    localStorage.getItem("ccNumber") &&
    localStorage.getItem("ccMonth") &&
    localStorage.getItem("ccYear") &&
    localStorage.getItem("ccCVV")
  ) {
    fetch(`https://5bfd20f8827c3800139ae8df.mockapi.io/sign-in/money`, {
      method: "post",
      body: JSON.stringify(mySum),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(dataDonation => {
        console.log(dataDonation);
        location.reload();
      });
  } else {
    document.querySelector(".money-don form").classList.add("hidden");
    document.querySelector(".gift-don form").classList.add("hidden");
    document.querySelector("#insuff1").classList.remove("hidden");
    document.querySelector("#insuff2").classList.remove("hidden");
  }
});

//donating gifts
donationFormGift.addEventListener("submit", e => {
  e.preventDefault();
  const gift = donationFormGift.elements.gift.value;
  console.log(donationFormGift.elements.gift.value);
  const myGift = {
    gift: {
      doll: 0,
      puzzle: 0,
      lego: 0,
      puzzle: 0,
      car: 0,
      coloringBook: 0,
      ridingHorse: 0
    },
    createdAt: Date.now(),
    userId
  };

  myGift.gift[gift] = 1;
  fetch(`https://5bfd20f8827c3800139ae8df.mockapi.io/sign-in/gifts`, {
    method: "post",
    body: JSON.stringify(myGift),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(dataDonation => {
      console.log(dataDonation);
      location.reload();
    });
});

logOutBut.addEventListener("click", logOut);

function logOut() {
  window.location.href = "index.html";
  localStorage.clear();
}

// childrenHappy.innerHTML = Math.floor();
