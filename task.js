console.log("1. order pleced");

setTimeout(() => console.log("2. Restarant confirms"), 0);

Promise.resolve().then(() => console.log("3. Payment verified"));

(async () => {
  console.log("4. Rider assigned");
  await null;
  console.log("5. Rider reached");
})();
console.log("6. Tracking started");
