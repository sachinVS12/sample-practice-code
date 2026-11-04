// let age = 10;
// if (age >= 18) {
//   console.log("Adult");
// } else {
//   console.log("minor");
// }

let role = "admin";

switch (role) {
  case "admin":
    console.log("Full access");
    break;

  case "user":
    console.log("Limited access");
    break;

  default:
    console.log("Guest");
}
