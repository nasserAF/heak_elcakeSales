










addQualificationButton.addEventListener('click', function () {
    const lastQualificationEntry = qualificationContainer.lastElementChild;

    // Check if the last nationality entry is not empty
    const lastQualificationInput = lastQualificationEntry.querySelector('.nationality');
    const lastQualificationYearInput = lastQualificationEntry.querySelector('.passport');
    if (!lastQualificationInput || lastQualificationInput.value.trim() !== '' || !lastQualificationYearInput || lastQualificationYearInput.value.trim() !== '') {
      const newQualificationEntry = document.createElement('div');
      newQualificationEntry.className = 'nationality-entry';

      const newInputGroup = document.createElement('div');
      newInputGroup.className = 'input-group';

      /* 
      // Add nationality label
      const newNationalityLabel = document.createElement('label');
      newNationalityLabel.setAttribute('for', 'nationality');
      newNationalityLabel.textContent = 'الجنسية';
      newInputGroup.appendChild(newNationalityLabel); */

      const newQualificationInput = document.createElement('input');
      newQualificationInput.type = 'text';
      newQualificationInput.className = 'nationality';
      newQualificationInput.placeholder = 'المؤهل';
      newQualificationInput.required = true; // Added validation for nationality
      newInputGroup.appendChild(newQualificationInput);

      newQualificationEntry.appendChild(newInputGroup);

      const newQualificationYearGroup = document.createElement('div');
      newQualificationYearGroup.className = 'input-group';

      /* 
      // Add passport No. label
      const newPassportLabel = document.createElement('label');
      newPassportLabel.setAttribute('for', 'passport');
      newPassportLabel.textContent = 'رقم الجواز';
      newPassportGroup.appendChild(newPassportLabel); */

      const newQualificationYear = document.createElement('input');
      newQualificationYear.type = 'text';
      newQualificationYear.className = 'passport';
      newQualificationYear.placeholder = 'سنة المؤهل';
      newQualificationYear.required = true; // Added validation for passport number
      newQualificationYear.appendChild(newQualificationYearInput);

      newQualificationEntry.appendChild(newPassportGroup);

      qualificationContainer.appendChild(newNationalityEntry);

      newQualificationInput.focus(); // Focus on the newly added nationality input

      // Show the nationality container
      qualificationContainer.style.display = 'block';
      addQualificationButton.style.display = 'inline-block';
    }
  });

  qualificationContainer.addEventListener('input', function () {
    // Show the "Add New Nationality" button if the first nationality input and passport number are filled
    const firstQualificationInput = qualificationContainer.querySelector('.qualification');
    const firstQualificationYearInput = qualificationContainer.querySelector('.qualificationYear');
    addQualificationButton.style.display = (firstQualificationInput && firstQualificationInput.value.trim() !== '' &&
    firstQualificationYearInput && firstQualificationYearInput.value.trim() !== '')
      ? 'inline-block' : 'none';
  });

  document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const nationalityEntries = nationalityContainer.querySelectorAll('.nationality-entry');
    const qualificationEntries = qualificationContainer.querySelectorAll('.nationality-entry');
    // Validate name
    const name = nameInput.value.trim();
    if (name === '') {
      alert('Please enter a valid name.');
      nameInput.focus();
      return;
    }

    // Validate age
    const age = ageInput.value.trim();
    if (age === '' || isNaN(age) || age <= 0) {
      alert('Please enter a valid age.');
      ageInput.focus();
      return;
    }

    // Validate at least one nationality entry is filled
    if (nationalityEntries.length === 0 ||
      Array.from(nationalityEntries).some(entry => {
        const nationalityInput = entry.querySelector('.nationality');
        const passportInput = entry.querySelector('.passport');
        return nationalityInput.value.trim() !== '' || passportInput.value.trim() !== '';
      }) === false) {
      alert('Please enter at least one nationality and passport number.');
      return;
    }

    // Validate nationality and passport number for each entry
    for (const entry of nationalityEntries) {
      const nationalityInput = entry.querySelector('.nationality');
      const passportInput = entry.querySelector('.passport');

      if (nationalityInput.value.trim() === '' && passportInput.value.trim() === '') {
        alert('Please enter either nationality or passport number for each entry.');
        return;
      }
    }




