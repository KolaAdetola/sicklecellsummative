async function fetchPainLogs() {
  try {
    // Get token from sessionStorage (or wherever you store it after login)
    // const token = sessionStorage.getItem("authToken");
    // if (!token) {
    //   alert("You are not logged in.");
    //   return;
    // }

    const response = await fetch("http://localhost:3000/api/pain/logs", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) throw new Error("Pain logs not found.");

    const data = await response.json();
    console.log("Fetched pain logs:", data);

    const tableBody = document.querySelector("#painLogTable tbody");
    let startIndex = tableBody.rows.length + 1;

    data.forEach((log, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <th>${startIndex + i}</th>
        <td>${log.description}</td>
        <td>${getLevelBadge(log.level)}</td>
        <td>${log.date}</td>
      `;
      tableBody.appendChild(row);
    });

    document.getElementById("viewAllPainLogs").disabled = true;

  } catch (error) {
    console.log(error);
    alert("Pain logs not found or server error.");
  }
}

function getLevelBadge(level) {
  if (level >= 7) return `<span class="badge badge-error">${level}/10</span>`;
  if (level >= 4) return `<span class="badge badge-warning">${level}/10</span>`;
  return `<span class="badge badge-success">${level}/10</span>`;
}