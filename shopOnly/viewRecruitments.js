const webAppUrl = 'https://script.google.com/macros/s/AKfycbxntLhCZji-EdUCUMP8fkgHMIlLQJfvOf2jhpir6VziAPzbdEX60OTvTRc18nga7MXptg/exec'; // Replace with your Apps Script URL

// Dictionaries for translation
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

fetch(webAppUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok (status ${response.status})`);
    }
    return response.json();
  })
  .then(data => {
    const table = document.getElementById('data-table');

    // Extract and translate headers
    const headers = data.shift();
    const translatedHeaders = headers.map(header => translations[header] || header);

    // Create table header row
    const headerRow = table.insertRow();
    translatedHeaders.forEach(header => {
      const headerCell = headerRow.insertCell();
      headerCell.textContent = header;
    });

    // Populate table rows with translated data
    data.forEach(row => {
      const tableRow = table.insertRow();
      row.forEach((cellData, cellIndex) => {
        const cell = tableRow.insertCell();

        // Translate specific columns
        if (cellIndex === 4) { // materialStatus
          cell.textContent = cellData === 1 ? 'متزوجة' : 'غير متزوجة';
        } else if (cellIndex === 6) { // lastQualification
          cell.textContent = lastQualificationMapping[cellData] || 'غير محدد';
        } else {
          cell.textContent = cellData; 
        }
      });
    });
  })
  .catch(error => {
    console.error('Error fetching or parsing data:', error);
    const errorMessage = document.createElement('p');
    errorMessage.textContent = "حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى لاحقًا.";
    errorMessage.style.color = 'red';
    document.body.appendChild(errorMessage);
  });