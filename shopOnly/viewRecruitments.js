const webAppUrl = 'https://script.google.com/macros/s/AKfycbxntLhCZji-EdUCUMP8fkgHMIlLQJfvOf2jhpir6VziAPzbdEX60OTvTRc18nga7MXptg/exec'; // Replace with your Apps Script URL



fetch(webAppUrl)
.then(response => {
    if (!response.ok) {
        throw new Error(`Network response was not ok (status ${response.status})`);
    }
    return response.json();
})
.then(data => {
    const table = document.getElementById('data-table');

    // Translation dictionary for headers
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

    // Assuming the first row of the data contains headers
    const headers = data.shift(); // Extract the first row as headers

    // Translate header names using the dictionary
    const translatedHeaders = headers.map(header => translations[header] || header);

    // Create table header row using translated headers
    const headerRow = table.insertRow();
    translatedHeaders.forEach(header => {
        const headerCell = headerRow.insertCell();
        headerCell.textContent = header;
    });

    // Populate table with data and translate material status
    data.forEach(row => {
        const tableRow = table.insertRow();
        row.forEach((cellData, cellIndex) => {
            const cell = tableRow.insertCell();
            if (cellIndex === 4) { // Check if it's the materialStatus column
                cell.textContent = cellData === 1 ? 'متزوجة' : 'غير متزوجة';
            } else {
                cell.textContent = cellData;
            }
        });
    });
})
.catch(error => {
    console.error('Error fetching or parsing data:', error);
    
    // Display a user-friendly error message
    const errorMessage = document.createElement('p');
    errorMessage.textContent = "حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى لاحقًا.";
    errorMessage.style.color = 'red'; 
    document.body.appendChild(errorMessage);
});