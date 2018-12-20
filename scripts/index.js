"use strict";

let moneyDonated = 0;
let giftsDon = 0;
let progressPercent;
let childrenHappy;

fetch("http://5bfd20f8827c3800139ae8df.mockapi.io/sign-in/gifts")
  .then(res => res.json())
  .then(gifts => {
    console.log(gifts);
    giftsDon = gifts.length;
    document.querySelector("#presents .number").innerHTML = giftsDon;

    fetch("http://5bfd20f8827c3800139ae8df.mockapi.io/sign-in/money")
      .then(res => res.json())
      .then(moneyDon => {
        console.log(moneyDon);
        moneyDonated = moneyDon.reduce(
          (accumolator, value) => value.amount + accumolator,
          0
        );
        document.querySelector("p#goal span").innerHTML = moneyDonated;
        //progess bar
        progressPercent = moneyDonated / 100 + "%";
        document.querySelector("div#progress").style.width = progressPercent;

        document.querySelector(
          "div#percent p.number"
        ).innerHTML = progressPercent;

        //children with presents
        childrenHappy = Math.floor(moneyDonated / 100) + giftsDon;

        document.querySelector(
          "div#children p.number"
        ).innerHTML = childrenHappy;
      });
  });