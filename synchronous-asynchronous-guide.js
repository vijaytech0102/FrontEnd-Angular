/**
 * ============================================================================
 * SYNCHRONOUS vs ASYNCHRONOUS JAVASCRIPT
 * ============================================================================
 * 
 * This guide explains synchronous and asynchronous programming in JavaScript
 * with step-by-step explanations and industry-based real-world examples.
 */

// ============================================================================
// PART 1: SYNCHRONOUS PROGRAMMING
// ============================================================================
/**
 * WHAT IS SYNCHRONOUS?
 * 
 * Synchronous means code executes line by line, BLOCKING execution.
 * Each line must complete before the next line starts.
 * 
 * CHARACTERISTICS:
 * - Code executes sequentially (top to bottom)
 * - Each statement blocks until completed
 * - Predictable execution order
 * - Can freeze the UI if operations take time
 */

console.log("\n========== SYNCHRONOUS EXAMPLES ==========\n");

// --------- Example 1: Basic Synchronous Execution ---------
console.log("--- Example 1: Basic Synchronous Flow ---");

function synchronousExample() {
  console.log("Step 1: Start process");
  console.log("Step 2: Processing data");
  console.log("Step 3: Complete process");
}

synchronousExample();
// Output: Prints in order: Step 1 → Step 2 → Step 3


// --------- Example 2: Synchronous with Time-Consuming Operation ---------
console.log("\n--- Example 2: Synchronous Calculator ---");

function heavyCalculation(num) {
  // Simulating a heavy computation that blocks execution
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += i;
  }
  return num * 2;
}

const startSync = Date.now();
console.log("Calculating...");
const resultSync = heavyCalculation(5);
const endSync = Date.now();

console.log(`Result: ${resultSync}`);
console.log(`Time taken: ${endSync - startSync}ms`);
// ❌ PROBLEM: The entire program is blocked during calculation!


// --------- Example 3: Industry Example - Synchronous File Reading ---------
console.log("\n--- Example 3: Synchronous File Operations ---");

// NOTE: This is pseudo-code showing the concept
// In real Node.js:
// const fs = require('fs');
// 
// function syncFileOperation() {
//   console.log("Reading file...");
//   const data = fs.readFileSync('user-data.json', 'utf8');
//   // ❌ Blocks here! Nothing else can happen
//   console.log("File contents:", data);
//   return data;
// }

console.log("/* Synchronous file read blocks entire server */");
console.log("Request 1: Reading file... WAITING");
console.log("Request 2: Cannot be processed! (BLOCKING)");
console.log("Request 1: Done. Now processing Request 2");


// --------- Example 4: Order Processing Example (SYNCHRONOUS - PROBLEM) ---------
console.log("\n--- Example 4: E-Commerce Order Processing (SYNCHRONOUS) ---");

function processOrderSync(orderId) {
  console.log(`Order ${orderId}: Processing started at ${new Date().getTime()}`);
  
  // Step 1: Validate payment (takes time)
  console.log(`Order ${orderId}: Validating payment...`);
  // Simulating delay
  for (let i = 0; i < 500000000; i++) {}
  
  // Step 2: Check inventory (takes time)
  console.log(`Order ${orderId}: Checking inventory...`);
  for (let i = 0; i < 500000000; i++) {}
  
  // Step 3: Send confirmation
  console.log(`Order ${orderId}: Sending confirmation email...`);
  
  return `Order ${orderId} completed`;
}

console.log("--- Processing 2 orders synchronously ---");
// ❌ Order 2 has to wait for Order 1 to finish completely!
// This is terrible for user experience and server efficiency


// ============================================================================
// PART 2: ASYNCHRONOUS PROGRAMMING
// ============================================================================
/**
 * WHAT IS ASYNCHRONOUS?
 * 
 * Asynchronous means code can continue executing WITHOUT waiting for 
 * an operation to complete. Operations happen in the background.
 * 
 * WHY USE IT?
 * - Non-blocking code execution
 * - Better performance
 * - Improved user experience
 * - Handle multiple operations simultaneously
 * - Essential for I/O operations (API calls, file reads, DB queries)
 * 
 * METHODS:
 * 1. Callbacks
 * 2. Promises
 * 3. Async/Await
 */

console.log("\n========== ASYNCHRONOUS EXAMPLES ==========\n");

// ============================================================================
// METHOD 1: CALLBACKS
// ============================================================================
/**
 * CALLBACKS EXPLANATION:
 * - A function passed as an argument to another function
 * - Gets executed after some operation is complete
 * - PROBLEM: "Callback Hell" (deeply nested callbacks)
 */

console.log("--- Method 1: Callbacks ---");



// Example 2: Industry Example - Database Query with Callback
console.log("\n--- Example 2: Database Query with Callback ---");

function queryDatabase(query, callback) {
  console.log(`Executing query: ${query}`);
  
  setTimeout(() => {
    const results = ["User1", "User2", "User3"];
    callback(null, results); // callback(error, results) pattern
  }, 1500);
}

queryDatabase("SELECT * FROM users", (error, results) => {
  if (error) {
    console.error("Database error:", error);
  } else {
    console.log("Query results:", results);
  }
});


// Example 3: Callback Hell Problem
console.log("\n--- Example 3: Callback Hell (⚠️ AVOID THIS) ---");

function callbackHellExample() {
  fetchUserDataCallback(1, (user) => {
    console.log("User:", user);
    
    queryDatabase(`SELECT * FROM orders WHERE userId=${user.id}`, (error, orders) => {
      if (!error) {
        console.log("Orders:", orders);
        
        // More nested callbacks...
        fetchUserDataCallback(2, (secondUser) => {
          console.log("Another user:", secondUser);
          // This nesting gets OUT OF CONTROL! 😱
        });
      }
    });
  });
}

// ❌ AVOID: Too much nesting, hard to read and maintain


// ============================================================================
// METHOD 2: PROMISES
// ============================================================================
/**
 * PROMISES EXPLANATION:
 * - Represents a value that WILL be available in the future
 * - Has 3 states: PENDING, FULFILLED, REJECTED
 * - Prevents callback hell with .then() and .catch()
 * 
 * SYNTAX: new Promise((resolve, reject) => { ... })
 */

console.log("\n--- Method 2: Promises ---");

// Example 1: Basic Promise
console.log("\n--- Example 1: Basic Promise ---");

function fetchUserDataPromise(userId) {
  return new Promise((resolve, reject) => {
    console.log(`Promise created for user ${userId}`);
    
    setTimeout(() => {
      if (userId > 0) {
        const user = { id: userId, name: "Jane Doe", email: "jane@example.com" };
        resolve(user); // Success state
      } else {
        reject("Invalid user ID"); // Error state
      }
    }, 1000);
  });
}

// Using .then() and .catch()
fetchUserDataPromise(1)
  .then((user) => {
    console.log("✓ User fetched:", user);
  })
  .catch((error) => {
    console.log("✗ Error:", error);
  });


// Example 2: Promise Chaining
console.log("\n--- Example 2: Promise Chaining ---");

function queryDatabasePromise(query) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["Item1", "Item2", "Item3"]);
    }, 500);
  });
}

function sendEmailPromise(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Email sent to ${user.email}`);
    }, 400);
  });
}

// Chaining promises - much cleaner than callbacks!
fetchUserDataPromise(2)
  .then((user) => {
    console.log("Step 1: User fetched");
    return queryDatabasePromise("SELECT * FROM orders");
  })
  .then((orders) => {
    console.log("Step 2: Orders fetched:", orders);
    return sendEmailPromise({ email: "test@example.com" });
  })
  .then((emailResult) => {
    console.log("Step 3:", emailResult);
  })
  .catch((error) => {
    console.log("Error in chain:", error);
  });


// Example 3: Industry Example - API Call Flow
console.log("\n--- Example 3: API Flow with Promises ---");

function fetchProductsAPI() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Laptop", price: 999 },
        { id: 2, name: "Phone", price: 499 }
      ]);
    }, 800);
  });
}

function fetchUserProfileAPI(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: "John", cartItems: 0 });
    }, 600);
  });
}

function saveOrderAPI(products, user) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 
        orderId: "ORD123", 
        userId: user.id, 
        products: products.length 
      });
    }, 500);
  });
}

// Real industry pattern
Promise.all([
  fetchProductsAPI(),
  fetchUserProfileAPI(1)
])
  .then(([products, user]) => {
    console.log("Fetched:", products.length, "products and user:", user.name);
    return saveOrderAPI(products, user);
  })
  .then((order) => {
    console.log("✓ Order created:", order.orderId);
  })
  .catch((error) => {
    console.log("✗ API Error:", error);
  });


// ============================================================================
// METHOD 3: ASYNC/AWAIT (BEST PRACTICE)
// ============================================================================
/**
 * ASYNC/AWAIT EXPLANATION:
 * - Modern way to handle asynchronous code
 * - Looks like synchronous code (easier to read)
 * - Built on top of Promises
 * - Uses async keyword for function and await for operation
 * 
 * SYNTAX:
 * async function myFunction() {
 *   const result = await somePromise();
 *   return result;
 * }
 */

console.log("\n--- Method 3: Async/Await (BEST PRACTICE) ---");

// Example 1: Basic Async/Await
console.log("\n--- Example 1: Basic Async/Await ---");

async function getUserWithAsyncAwait(userId) {
  try {
    console.log("Fetching user...");
    const user = await fetchUserDataPromise(userId);
    console.log("✓ User received:", user.name);
    return user;
  } catch (error) {
    console.log("✗ Error:", error);
  }
}

// Call async function
getUserWithAsyncAwait(1);


// Example 2: Sequential Operations
console.log("\n--- Example 2: Sequential Operations with Async/Await ---");

async function processOrderAsync(orderId) {
  try {
    // Step 1: Fetch user
    const user = await fetchUserDataPromise(1);
    console.log(`Order ${orderId}: User confirmed -`, user.name);
    
    // Step 2: Query database
    const orders = await queryDatabasePromise("SELECT * FROM orders");
    console.log(`Order ${orderId}: Found ${orders.length} previous orders`);
    
    // Step 3: Send confirmation
    const confirmation = await sendEmailPromise(user);
    console.log(`Order ${orderId}: ${confirmation}`);
    
    return `Order ${orderId} completed successfully`;
  } catch (error) {
    console.log(`Order ${orderId}: Failed -`, error);
  }
}

processOrderAsync(101);


// Example 3: Parallel Operations
console.log("\n--- Example 3: Parallel Operations with Async/Await ---");

async function checkoutProcess(userId) {
  try {
    // Run multiple operations in PARALLEL using Promise.all()
    const [user, products, inventory] = await Promise.all([
      fetchUserProfileAPI(userId),
      fetchProductsAPI(),
      queryDatabasePromise("SELECT * FROM inventory")
    ]);
    
    console.log("✓ Checkout ready:");
    console.log("  - User:", user.name);
    console.log("  - Products available:", products.length);
    console.log("  - Inventory items:", inventory.length);
    
    const order = await saveOrderAPI(products, user);
    return order;
  } catch (error) {
    console.log("✗ Checkout failed:", error);
  }
}

checkoutProcess(1);


// ============================================================================
// PART 3: INDUSTRY-BASED REAL-WORLD EXAMPLES
// ============================================================================

console.log("\n========== REAL-WORLD INDUSTRY EXAMPLES ==========\n");

// --------- Example 1: E-Commerce - Complete Order Processing ---------
console.log("--- Example 1: E-Commerce Order Processing ---");

// Simulated API calls
const ecommerceAPI = {
  validatePayment: (cardNumber) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (cardNumber === "1234") {
          resolve({ status: "approved", amount: 500 });
        } else {
          reject("Payment declined");
        }
      }, 800);
    });
  },
  checkInventory: (productId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ productId, stock: 15, available: true });
      }, 600);
    });
  },
  createShipment: (orderId, address) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          shipmentId: "SHIP" + orderId, 
          address, 
          estimatedDays: 3 
        });
      }, 700);
    });
  },
  sendConfirmationEmail: (email, orderId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Confirmation email sent to ${email}`);
      }, 300);
    });
  }
};

// Async implementation
async function completeOrderProcessing(orderId, orderData) {
  try {
    console.log(`\nProcessing Order #${orderId}...`);
    
    // Validate payment
    const payment = await ecommerceAPI.validatePayment(orderData.cardNumber);
    console.log("✓ Payment validated:", payment.status);
    
    // Check inventory in parallel
    const inventory = await ecommerceAPI.checkInventory(orderData.productId);
    console.log("✓ Inventory checked:", inventory.available ? "In stock" : "Out of stock");
    
    if (!inventory.available) throw new Error("Product out of stock");
    
    // Create shipment
    const shipment = await ecommerceAPI.createShipment(orderId, orderData.address);
    console.log("✓ Shipment created:", shipment.shipmentId);
    console.log("  Estimated delivery:", shipment.estimatedDays, "days");
    
    // Send confirmation
    const confirmation = await ecommerceAPI.sendConfirmationEmail(
      orderData.email, 
      orderId
    );
    console.log("✓", confirmation);
    
    console.log(`✓ Order #${orderId} completed successfully!\n`);
    return { orderId, status: "completed", shipmentId: shipment.shipmentId };
    
  } catch (error) {
    console.log(`✗ Order #${orderId} failed:`, error.message);
    return { orderId, status: "failed", error: error.message };
  }
}

// Execute order processing
completeOrderProcessing("ORD12345", {
  cardNumber: "1234",
  productId: "PROD001",
  address: "123 Main St",
  email: "customer@example.com"
});


// --------- Example 2: Data Analytics - Processing Multiple Data Sources ---------
console.log("--- Example 2: Data Analytics Dashboard ---");

const analyticsAPI = {
  fetchUserMetrics: (period) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ activeUsers: 15420, newUsers: 342, churnRate: 2.3 });
      }, 500);
    });
  },
  fetchSalesData: (period) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ totalRevenue: 125600, orders: 1240, avgOrderValue: 101.3 });
      }, 600);
    });
  },
  fetchProductPerformance: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { product: "Laptop", sales: 450, revenue: 405000 },
          { product: "Phone", sales: 890, revenue: 444550 }
        ]);
      }, 700);
    });
  }
};

async function generateAnalyticsDashboard(period) {
  try {
    console.log(`\nGenerating ${period} analytics dashboard...`);
    
    // Fetch all data in parallel
    const [users, sales, products] = await Promise.all([
      analyticsAPI.fetchUserMetrics(period),
      analyticsAPI.fetchSalesData(period),
      analyticsAPI.fetchProductPerformance()
    ]);
    
    console.log("\n📊 ANALYTICS DASHBOARD");
    console.log("Users:", users.activeUsers, "active |", users.newUsers, "new");
    console.log("Sales: $" + sales.totalRevenue.toLocaleString(), "|", sales.orders, "orders");
    console.log("Top Product:", products[0].product, 
                "(" + products[0].sales, "units)");
    
    return { users, sales, products };
  } catch (error) {
    console.log("✗ Dashboard generation failed:", error);
  }
}

generateAnalyticsDashboard("monthly");


// --------- Example 3: Healthcare System - Patient Data Processing ---------
console.log("\n--- Example 3: Healthcare System ---");

const healthcareAPI = {
  getPatientRecords: (patientId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          patientId,
          name: "John Patient",
          age: 45,
          conditions: ["Diabetes", "Hypertension"]
        });
      }, 400);
    });
  },
  getLabResults: (patientId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          bloodSugar: 145,
          bloodPressure: "140/90",
          cholesterol: 220,
          lastUpdated: "2 days ago"
        });
      }, 600);
    });
  },
  getPrescriptions: (patientId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { medication: "Metformin", dosage: "500mg", frequency: "2x daily" },
          { medication: "Lisinopril", dosage: "10mg", frequency: "1x daily" }
        ]);
      }, 500);
    });
  },
  alertDoctor: (doctorId, alert) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ notificationId: "ALERT123", sent: true });
      }, 200);
    });
  }
};

async function monitorPatientHealth(patientId, doctorId) {
  try {
    console.log(`\nMonitoring patient ${patientId}...`);
    
    // Fetch all patient data in parallel
    const [records, labs, prescriptions] = await Promise.all([
      healthcareAPI.getPatientRecords(patientId),
      healthcareAPI.getLabResults(patientId),
      healthcareAPI.getPrescriptions(patientId)
    ]);
    
    console.log("✓ Patient:", records.name, "|", records.age, "years old");
    console.log("✓ Lab Results | Blood Sugar:", labs.bloodSugar, 
                "| BP:", labs.bloodPressure);
    console.log("✓ Medications:", prescriptions.length, "active");
    
    // Alert doctor if values are critical
    if (labs.bloodSugar > 200) {
      const alert = await healthcareAPI.alertDoctor(doctorId, 
        "High blood sugar level detected");
      console.log("⚠️  Alert sent to doctor!");
    }
    
  } catch (error) {
    console.log("✗ Health monitoring failed:", error);
  }
}

monitorPatientHealth("PAT001", "DOC001");


// ============================================================================
// PART 4: COMPARISON & BEST PRACTICES
// ============================================================================

console.log("\n========== COMPARISON & BEST PRACTICES ==========\n");

console.log(`
SYNCHRONOUS vs ASYNCHRONOUS:

SYNCHRONOUS:
├─ ✓ Easy to understand
├─ ✓ Predictable execution
├─ ✗ Blocks entire program
├─ ✗ Freezes UI
└─ ✗ Bad for performance

CALLBACKS:
├─ ✓ Non-blocking
├─ ✓ Event-driven
├─ ✗ Callback hell (nesting)
└─ ✗ Hard to debug

PROMISES:
├─ ✓ Better than callbacks
├─ ✓ Chainable
├─ ✓ Error handling with .catch()
└─ ⚠️  Still can be complex

ASYNC/AWAIT (RECOMMENDED):
├─ ✓ Looks synchronous (readable)
├─ ✓ Clean code structure
├─ ✓ Easy error handling (try/catch)
├─ ✓ Easy to understand
└─ ✓ Industry standard

BEST PRACTICES:
1. Use Async/Await for new code
2. Use Promise.all() for parallel operations
3. Always use try/catch for error handling
4. Avoid callback hell
5. Return promises from functions
6. Don't mix callbacks, promises, and async/await
7. Use proper error handling in all async code
`);

console.log("\n========== END OF GUIDE ==========\n");
