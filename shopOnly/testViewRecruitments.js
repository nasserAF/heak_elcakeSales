const webAppUrl = 'https://script.google.com/macros/s/AKfycbyYZhzvGKQ7M0WZphSa_6GIATcXVCB3UEMHDdcDQT6puNTT9tzgeDFWNDNQA_HIddlHAQ/exec'; // Replace with your Apps Script URL

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




fetch(webAppUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok (status ${response.status})`);
    }
    // Check Content-Type header to determine response type
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      console.log("response : ",response)
      //esponse.forEach((elmts, index) => console.log(index+1," - response elmts",elmts));
      return response.json();
    } else {
      // Handle non-JSON response (e.g., display an error message)
      throw new Error('Expected JSON response but received a different format.');
    }
  })
  .then(data => {
    data.forEach((elmts, index) => console.log(index+1," - data elmts",elmts));
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

    });
  })
  .catch(error => {
    console.error('Error fetching or parsing data:', error);
    /* alert('An error occurred while fetching data. Please try again later.'); */
  });



