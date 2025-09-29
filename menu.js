// Get username from URL query
const params = new URLSearchParams(window.location.search);
const username = params.get("username");

// Save to localStorage
if (username) {
  localStorage.setItem("username", username);
  console.log("Saved username in localStorage:", username);
}

// Display welcome message
const welcomeMsg = document.getElementById("welcome-msg");

if (fullname) {
  welcomeMsg.textContent = `Welcome, ${fullname}!`;
} else {
  // If no username in URL, try localStorage
  const storedUser = localStorage.getItem("username");
  if (storedUser) {
    welcomeMsg.textContent = `Welcome back, ${storedUser}!`;
  } else {
    // Not logged in → redirect to login page
    window.location.href = "index.html";
  }
}
