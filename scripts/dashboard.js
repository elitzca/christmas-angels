"use strict";

let moneyDonations;
let moneyDonated = 0;
let peopleDon = 0;
let giftsDon = 0;
let childrenHappy = 0;

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
      //   console.log(giftDonation);
      if (giftDonation.gift.doll > 0) {
        //check if it exists
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

      const dollsNum = document.querySelector(".dolls-div h3");
      const carsNum = document.querySelector(".cars-div h3");
      const legosNum = document.querySelector(".lego-div h3");
      const puzzlesNum = document.querySelector(".puzzle-div h3");
      const horsesNum = document.querySelector(".horses-div h3");
      const booksNum = document.querySelector(".books-div h3");
      if (doll > 0) {
        dollsNum.innerHTML = doll;
      }
      if (car > 0) {
        carsNum.innerHTML = car;
      }
      if (puzzle > 0) {
        puzzlesNum.innerHTML = puzzle;
      }
      if (book > 0) {
        booksNum.innerHTML = book;
      }
      if (horse > 0) {
        horsesNum.innerHTML = horse;
      }
      if (lego > 0) {
        legosNum.innerHTML = lego;
      }

      giftsDon = doll + car + puzzle + book + horse + lego;
      console.log(giftsDon);
      document.querySelector(".gifts-total h3").innerHTML = giftsDon;
    });
  });

fetch("http://5bfd20f8827c3800139ae8df.mockapi.io/sign-in/money")
  .then(res => res.json())
  .then(moneyDonations => {
    console.log(moneyDonations);
    moneyDonated = moneyDonations.reduce(
      (accumolator, value) => value.amount + accumolator,
      0
    );
    //-> show in html
    console.log(moneyDonated);
    document.querySelector(".money-total h3").innerHTML = moneyDonated;

    // moneyDonations.forEach(donation => {
    //     moneyDonated = moneyDonated + donation.amount;
    //     console.log(moneyDonated = moneyDonated + donation.amount)

    // })
    //-> display in html
    let averageDon = Math.round(moneyDonated / moneyDonations.length);
    console.log(averageDon);

    document.querySelector(".money-average h3").innerHTML = averageDon;
  });

fetch("http://5bfd20f8827c3800139ae8df.mockapi.io/sign-in/users")
  .then(res => res.json())
  .then(users => {
    console.log(users);
    peopleDon = users.length;
    document.querySelector(".people-total h3").innerHTML = peopleDon;
  });

//average of donations

fetch("http://5bfd20f8827c3800139ae8df.mockapi.io/sign-in/money")
  .then(res => res.json())
  .then(moneyDonations => {
    // console.log(data);
    fetch("http://5bfd20f8827c3800139ae8df.mockapi.io/sign-in/gifts")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        childrenHappy = Math.floor(moneyDonated / 100) + giftsDon;
        console.log(childrenHappy);

        document.querySelector(".children-happy h3").innerHTML = childrenHappy;
      });
  });
