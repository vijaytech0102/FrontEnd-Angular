// Example 1: Simple Callback
function fetchUserDataCallback(userId, callback) {
  console.log(`Fetching user ${userId}...`);
  
  // Simulating API call with setTimeout
  setTimeout(() => {
    const user = { id: userId, name: "John Doe", email: "john@example.com" };
    callback(user); // Execute callback with result
  }, 5000);
}

function processUserCallback(user) {
  console.log("User fetched:", user);
}

fetchUserDataCallback(1, processUserCallback);
