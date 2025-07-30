document
  .getElementById("personal")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;

    // Collect checkbox values
    const triggers = [];
    form.querySelectorAll('input[name="crisisTriggers"]:checked').forEach((el) => {
      triggers.push(el.value);
    });

    const data = {
      crisisTriggers: triggers,
      sickleCellType:
        form.querySelector('input[name="sickleType"]:checked')?.value || null,
      crisisFrequency:
        form.querySelector('input[name="frequency"]:checked')?.value || null,
    };

    console.table("Submitting health data:", data);

    try {
      const response = await fetch("http://localhost:3000/api/health/health-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // ✅ Ensures cookie gets sent
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Data saved successfully!");
      } else {
        const err = await response.json();
        console.error("Server responded with error:", err);
        alert("Failed to save data.");
      }
    } catch (err) {
      console.error("Network or server error:", err);
      alert("An error occurred.");
    }
  });


document.getElementById("caretaker").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("Name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const relationship = document.getElementById("relative").value.trim();
  const patientName = document.getElementById("patientName").value.trim(); // Assuming this is a hidden input or similar

  if (!name || !phone || !email || !relationship || !patientName) {
    alert("Please fill in all required fields.");
    return;
  }

  const data = {
    name,
    phone,
    email,
    relationship,
    patientName // 🔁 Replace this with dynamic user name if available
  };

  try {
    const response = await fetch("http://localhost:3000/api/caretaker/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("Caretaker information saved successfully!");
      // Optional: clear form
      e.target.reset();
    } else {
      const err = await response.json();
      console.error("Server error:", err);
      alert(err.message || "Failed to save caretaker.");
    }
  } catch (err) {
    console.error("Network error:", err);
    alert("An error occurred. Please try again.");
  }
});



// const container = document.querySelector(".caretaker-info-container");
// const openBtn = document.querySelector("#panic-btn");
// const closeBtn = document.querySelector(".close-caretaker-info");

// openBtn?.addEventListener("click", () => {
//   container.classList.remove("hidden");
//   setTimeout(() => {
//     container.classList.remove("opacity-0");
//     container.classList.add("opacity-100");
//   }, 10); // slight delay to trigger transition
// });

// closeBtn?.addEventListener("click", () => {
//   container.classList.remove("opacity-100");
//   container.classList.add("opacity-0");
//   setTimeout(() => {
//     container.classList.add("hidden");
//   }, 300); // match transition duration
// });




const panicTrigger = document.getElementById("panic-trigger");
const panicModal = document.getElementById("panic-modal");
const caretakerInfo = document.getElementById("caretaker-info");

const phoneInput = document.getElementById("phone-query");

// Open modal on panic click
panicTrigger.addEventListener("click", () => {
  panicModal.classList.remove("hidden");
  phoneInput.focus();
});

// Close modal
function closePanicModal() {
  panicModal.classList.add("hidden");
}

// Close caretaker info panel
document.querySelector(".close-caretaker-info").addEventListener("click", () => {
  caretakerInfo.classList.add("hidden");
  caretakerInfo.classList.remove("flex", "opacity-100");
});

// Fetch caretaker from backend API
async function findCaretaker() {
  const rawNumber = phoneInput.value.trim();
  const sanitizedNumber = rawNumber.replace(/[^0-9]/g, ""); // only digits

  if (!sanitizedNumber) {
    alert("Please enter a valid phone number.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/api/caretaker/${sanitizedNumber}`);
    if (!response.ok) throw new Error("Caretaker not found.");

    const data = await response.json();

    // Inject data into UI
    document.getElementById("caretaker-name").textContent = data.name || "N/A";
    document.getElementById("caretaker-phone").textContent = data.phone || "N/A";
    document.getElementById("caretaker-email").textContent = data.email || "N/A";
    document.getElementById("caretaker-relationship").textContent = data.relationship || "N/A";
    document.getElementById("caretaker-patientName").textContent = data.patientName || "N/A";
    document.querySelector(".caretaker-img img").src = data.avatar || "https://placehold.net/avatar.svg";

    // Show contact info
    panicModal.classList.add("hidden");
    caretakerInfo.classList.remove("hidden");
    caretakerInfo.classList.add("flex", "opacity-100");

  } catch (error) {
    alert("Caretaker not found or server error.");
    console.error(error);
  }
}

 

  async function submitPainLog(event) {
    event.preventDefault(); // Prevent page reload

    const description = document.getElementById("description").value.trim();
    const level = parseInt(document.getElementById("level").value);

    if (!description) {
      alert("Please describe your pain.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/pain/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description, level }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert("Error: " + data.message);
        return;
      }

      const result = await response.json();
      alert("Pain log submitted successfully!");

      // Optionally clear the form
      document.getElementById("description").value = "";
      document.getElementById("level").value = 1;

    } catch (err) {
      console.error("Error submitting pain log:", err);
      alert("Something went wrong while submitting your pain log.");
    }
  }
