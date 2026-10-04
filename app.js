const API_URL =
    "https://script.google.com/macros/s/AKfycbyBjhvDCOPLm5JbeXi-8bskHZdn3if-qQ6-n5kcnbRcvm-QGCZGE1rgi0b9OYecN80C/exec";


let allRecords = [];


// FETCH BUTTON
document.getElementById("loadBtn")
    .addEventListener("click", fetchSpreadsheetData);


// SEARCH
document.getElementById("searchBox")
    .addEventListener("input", function () {

        const searchText = this.value.toLowerCase();

        const filteredRecords = allRecords.filter(record => {

            return (
                String(record.name).toLowerCase().includes(searchText) ||
                String(record.profession).toLowerCase().includes(searchText) ||
                String(record.gender).toLowerCase().includes(searchText)
            );

        });

        displayRecords(filteredRecords);
    });


// FETCH DATA
async function fetchSpreadsheetData() {

    const container = document.getElementById("dataContainer");

    container.innerHTML =
        '<div class="message">Loading spreadsheet data...</div>';

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        const data = await response.json();

        if (!data.records || !Array.isArray(data.records)) {
            throw new Error("Invalid data format.");
        }

        allRecords = data.records;

        displayRecords(allRecords);

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="message error">
                ❌ Failed to load data.<br><br>
                Please check your Google Apps Script deployment.
            </div>
        `;

    }
}


// DISPLAY RECORDS
function displayRecords(records) {

    const container = document.getElementById("dataContainer");

    const counter = document.getElementById("recordCount");

    container.innerHTML = "";

    counter.textContent = records.length;


    if (records.length === 0) {

        container.innerHTML = `
            <div class="message">
                No records found.
            </div>
        `;

        return;
    }


    records.forEach(record => {

        const recordDiv = document.createElement("div");

        recordDiv.className = "record";


        const name = record.name || "Unknown";

        const firstLetter =
            name.charAt(0).toUpperCase();


        recordDiv.innerHTML = `

            <div class="record-header">

                <div class="avatar">
                    ${firstLetter}
                </div>

                <h3>
                    ${name}
                </h3>

            </div>


            <div class="info">
                <strong>Age:</strong>
                ${record.age || "N/A"}
            </div>


            <div class="info">
                <strong>Age Group:</strong>
                ${record.ageGroup || "N/A"}
            </div>


            <div class="info">
                <strong>Gender:</strong>
                ${record.gender || "N/A"}
            </div>


            <div class="info">
                <strong>Profession:</strong>
                ${record.profession || "N/A"}
            </div>


            <span class="age-badge">
                ${record.ageGroup || "Age"}
            </span>

        `;


        container.appendChild(recordDiv);

    });
}











