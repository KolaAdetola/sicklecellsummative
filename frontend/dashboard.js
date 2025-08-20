// dashboard.js

async function fetchPainLogs() {
  const tableBody = document.querySelector("#painLogTable tbody");
  tableBody.innerHTML = `<div class=" loader"></div>`;
  const token = sessionStorage.getItem("token");
  console.log("Fetching pain logs with token:", token);

  try {
    const response = await fetch("http://localhost:3000/api/pain/logs",{
       headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const logs = await response.json();

    if (!Array.isArray(logs) || logs.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="4">No logs found</td></tr>`;
      return;
    }

    tableBody.innerHTML = ""; // clear loading row

    logs.forEach((log, index) => {
      const row = document.createElement("tr");

      // Badge color based on pain level
      let badgeClass = "badge-success"; // default (low pain)
      if (log.level >= 7) {
        badgeClass = "badge-error"; // high pain
      } else if (log.level >= 4) {
        badgeClass = "badge-warning"; // moderate pain
      }

      row.innerHTML = `
        <th>${index + 1}</th>
        <td>${log.description || "N/A"}</td>
        <td><span class="badge ${badgeClass}">${log.level}/10</span></td>
        <td>${new Date(log.date || Date.now()).toISOString().split("T")[0]}</td>
      `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Failed to fetch pain logs:", error);
    tableBody.innerHTML = `<tr><td colspan="4">Error loading logs</td></tr>`;
  }
}

// Optionally fetch logs when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchPainLogs();
});
