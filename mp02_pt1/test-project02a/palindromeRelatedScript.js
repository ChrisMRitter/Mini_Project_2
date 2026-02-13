const palBtn = document.getElementById("palBtn");

palBtn.addEventListener("click", () => {
  const raw = document.getElementById("palInput").value;

  const cleaned = raw.toLowerCase().replace(/[^a-z0-9]/g, "");
  const reversed = cleaned.split("").reverse().join("");

  const palMsg = document.getElementById("palMsg");

  if (cleaned.length === 0) {
    alert("Please enter a non-empty string.");
    palMsg.textContent = "";
    return;
  }

  if (cleaned === reversed) {
    palMsg.textContent = `"${raw}" is a palindrome.`;
    palMsg.style.color = "green";
  } else {
    palMsg.textContent = `"${raw}" is not a palindrome.`;
    palMsg.style.color = "red";
  }
});
