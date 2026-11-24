// const dat = [10, 20, 30, 40];
// let sum = 0;
// for (let i = 0; i < dat.length; i++) {
//   sum += dat[i];
// }
// console.log(sum);

const { disconnect } = require("mongoose");

// const dat = [10, 20, 30, 40];
// let sum = 0;

// for (let i = 0; i < dat.length; i++) {
//   sum += dat[i];
// }

// console.log(sum);

// // passengers revers-----------------------------------------
// const passengers = ["Raju", "Manu", "Rahul"];
// const reversed = passengers.reverse();
// console.log(reversed);
// console.log(passengers.join("->"));
// console.log(reversed === passengers);

// a profile page recives user data from an API. The developer creates an updated copy of the user wit a new city and
// extracts some values.
// const user = {
//   name: "sachin",
//   age: 25,
//   address: { city: "Mysuru", pin: 57002 },
// };
// const updated = {
//   ...user,
//   age: 26,
//   address: { ...user.address, city: "Bangalore" },
// };

// const {
//   name,
//   address: { city },
//   role = "Guest",
// } = updated;
// console.log(user.address.city);
// console.log(city);
// console.log(role);
// console.log(updated.age);

// const buttons = ["Home", "Cart", "Profile"];
// const handlers = [];

// for (let i = 0; i < buttons.length; i++) {
//   handlers.push(() => console.log(buttons[i]));
// }
// handlers[0]();
// handlers[2]();

// username blocked--------------------------------
// const blocked = ["Rahul", "Sanjay", "NaN", NaN];

// console.log(blocked.includes("Rahul"));
// console.log(blocked.indexOf(NaN));
// console.log(blocked.includes(NaN));
// console.log(blocked.indexOf("sanjay"));

// name count -------------------------------------
// const sales = {
//   laptop: 120,
//   mouse: 45,
//   keyboard: 80,
//   monitor: 50,
//   webcam: 30,
// };

// const result = Object.entries(sales)
//   .filter(([name, count]) => count > 50)
//   .map(([name, count]) => `${name}:${count}`);
// console.log(result);

// score some------------------------------------------
// const scores = [45, 72, 88, 30, 95];

// const a = scores.some((s) => s > 90);
// const b = scores.every((s) => s > 40);
// const c = [].every((s) => s > 100);
// const d = [].some((s) => s > 100);

// console.log(a, b, c, d);

//chekout form reads-------------------
// const qty = "3";
// const price = 100;
// const coupon = "";

// console.log(qty * price);
// console.log(qty + price);
// console.log(JSON.stringify(coupon || "NO_COUPON"));
// console.log(JSON.stringify(coupon ?? "NO_COUPON"));
// console.log(null == undefined, null === undefined);

// array problems--------------------------
// const prices = [450, 120, 900, 75, 300];
// prices.sort();
// console.log(prices);
// prices.sort((a, b) => a - b);
// console.log(prices);

// a shoping app has a cart with a method that
const cart = {
  items: [100, 200, 300],
  discount: 50,
  regular() {
    return this.items.reduce((sum, n) => sum + n, 0) - this.discount;
  },
  arrow: () => {
    return typeof this.items;
  },
};
console.log(cart.regular());
console.log(cart.arrow());
console.log(typeof hoisted);
console.log(typeof notHoisted);
var hoisted = 10;
var notHoisted = 20;
