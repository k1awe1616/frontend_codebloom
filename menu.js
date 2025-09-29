// Get username from URL query
const params = new URLSearchParams(window.location.search);
const username = params.get("username");

// Save to localStorage
if (username) {
  localStorage.setItem("username", username);
  console.log("Saved username in localStorage:", username);
}


