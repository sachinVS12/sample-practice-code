// const dat = [10, 20, 30, 40];
// let sum = 0;
// for (let i = 0; i < dat.length; i++) {
//   sum += dat[i];
// }
// console.log(sum);

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
const user = {
  name: "sachin",
  age: 25,
  address: { city: "Mysuru", pin: 57002 },
};
const updated = {
  ...user,
  age: 26,
  address: { ...user.address, city: "Bangalore" },
};

const {
  name,
  address: { city },
  role = "Guest",
} = updated;
console.log(user.address.city);
console.log(city);
console.log(role);
console.log(updated.age);
