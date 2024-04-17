const webAppUrl = 'https://script.google.com/macros/s/AKfycbzivg7jA3PcitDjzxoz5191djHszWGjZOxtdt1vizSQzvFeEvfOcUwr4vM_3k5-U-PYJg/exec'; // Replace with your Apps Script URL

const translations = {
    fullName: 'الاسم الرباعي',
    DOB: 'تاريخ الميلاد',
    mobile: 'الجوال',
    email: 'البريد الالكتروني',
    materialStatus: 'الحالة الاجتماعية',
    address: 'العنوان',
    lastQualification: 'اخر مؤهل علمي',
    experience1: 'خبرة 1',
    experience2: 'خبرة 2',
    experience3: 'خبرة 3'
};
const lastQualificationMapping = {
    1: 'اعداد',
    2: 'توجيهي',
    3: 'دبلوم',
    4: 'بكالوريوس',
    5: 'ماجستير'
};
const additionalColumns = ["is-pas", "is-flower", "is-coffee", "is-photography", "is-talk", "is-goog-shape", "notes"];

let headers;


fetch(webAppUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok (status ${response.status})`);
    }
    // Check Content-Type header to determine response type
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
      // Handle non-JSON response (e.g., display an error message)
      throw new Error('Expected JSON response but received a different format.');
    }
  })
  .then(data => {
    const table = document.getElementById('data-table');
    const tbody = table.querySelector('tbody');
    headers = data.shift(); // Assuming 'headers' is declared elsewhere or should be declared here
    const translatedHeaders = headers.map(header => translations[header] || header); // Assuming 'translations' is declared elsewhere
    const headerRow = table.querySelector('thead').insertRow();
    translatedHeaders.forEach(header => {
      const headerCell = headerRow.insertCell();
      headerCell.textContent = header;
    });
    data.forEach((row, rowIndex) => {
      const tableRow = tbody.insertRow();
      row.forEach((cellData, cellIndex) => {
        const cell = tableRow.insertCell();
        if (cellIndex === 4) {
          cell.textContent = cellData === 1 ? 'متزوجة' : 'غير متزوجة';
        } else if (cellIndex === 6) {
          cell.textContent = lastQualificationMapping[cellData] || 'غير محدد'; // Assuming 'lastQualificationMapping' is declared elsewhere
        } else {
          cell.textContent = cellData;
        }
      });
      const evaluateBtnCell = tableRow.insertCell();
      const evaluateBtn = document.createElement('button');
      evaluateBtn.textContent = 'Evaluate';
      evaluateBtn.classList.add('evaluate-btn');
      evaluateBtn.dataset.rowIndex = rowIndex;
      evaluateBtnCell.appendChild(evaluateBtn);
    });
  })
  .catch(error => {
    console.error('Error fetching or parsing data:', error);
    alert('An error occurred while fetching data. Please try again later.');
  });


function showPopup(rowData, rowIndex) {
    const popupDiv = document.getElementById('popup-div');
    console.log("showPopup called", rowIndex); // Debugging line
    const form = document.getElementById('update-form');
    form.innerHTML = '';

    additionalColumns.forEach(column => {
        const label = document.createElement('label');
        label.textContent = column + ': ';
        const radioYes = document.createElement('input');
        radioYes.type = 'radio';
        radioYes.name = column;
        radioYes.value = '1';
        const radioNo = document.createElement('input');
        radioNo.type = 'radio';
        radioNo.name = column;
        radioNo.value = '0';
        if (rowData[headers.indexOf(column)] === '1') {
            radioYes.checked = true;
        } else {
            radioNo.checked = true;
        }
        label.appendChild(radioYes);
        label.appendChild(document.createTextNode('Yes '));
        label.appendChild(radioNo);
        label.appendChild(document.createTextNode('No'));
        form.appendChild(label);
        form.appendChild(document.createElement('br'));
    });

    const notesLabel = document.createElement('label');
    notesLabel.textContent = 'Notes: ';
    const notesInput = document.createElement('input');
    notesInput.type = 'text';
    notesInput.name = 'notes';
    notesInput.value = rowData[headers.indexOf('notes')];
    notesLabel.appendChild(notesInput);
    form.appendChild(notesLabel);
    form.appendChild(document.createElement('br'));

    form.dataset.rowIndex = rowIndex;
    popupDiv.style.display = 'block';
    console.log("Popup should be visible now"); // Debugging line 
}

document.addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('evaluate-btn')) {
        console.log("Evaluate button clicked"); // Debugging line
        const row = clickedElement.closest('tr');
        const rowIndex = clickedElement.dataset.rowIndex;
        const rowData = Array.from(row.cells).map(cell => cell.textContent);
        showPopup(rowData, rowIndex);
    }
});

document.getElementById('update-btn').addEventListener('click', () => {
    const formData = new FormData(document.getElementById('update-form'));
    const updatedData = {};
    for (const [key, value] of formData.entries()) {
        updatedData[key] = value;
    }
    updatedData.rowIndex = document.getElementById('update-form').dataset.rowIndex;

    fetch(webAppUrl, {
        method: 'POST',
        body: JSON.stringify(updatedData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok (status ${response.status})`);
            }
            return response.text();
        })
        .then(responseText => {
            console.log(responseText);
            alert("Data updated successfully!");
            document.getElementById('popup-div').style.display = 'none';
        })
        .catch(error => {
            console.error('Error updating data:', error);
            // ... Handle errors (e.g., display error message) ...
        });
});
