  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    // return `${year}-${month}-${day}`;
    //return `${year}/${day}/${month}`;
    return `${day}/${month}/${year}`; // Corrected format for Egypt
}
  
  document.getElementById('currentDate').value = getCurrentDate();
  

document.addEventListener('DOMContentLoaded', () => {
    const itemCategorySelect = document.getElementById('itemCategory');
    const itemSelect = document.getElementById('item');

    // Define item options based on selected category
    itemCategorySelect.addEventListener('change', () => {
        const selectedCategory = itemCategorySelect.value;
        itemSelect.innerHTML = ''; // Clear existing options

        switch (selectedCategory) {
            case '1':
                addItemOption('01-01','بيبي كيك 2 شخص');
                addItemOption('01-02','ميني كيك 4 اشخاص');
                addItemOption('01-03','كيك 6 اشخاص');
                addItemOption('01-04','كيك 8 اشخاص');
                addItemOption('01-05','كيك 10 اشخاص');
                addItemOption('01-06','كيك 12 شخص');
                addItemOption('01-07','كيك تواصي');
                break;
            case '2':
                addItemOption('02-01','شوكولا');
                addItemOption('02-02','ريد فيلفيت');
                addItemOption('02-03','فانيلا');
                break;
            case '3':
                addItemOption('03-01','ميني تشيز كيك');
                addItemOption('03-02','اوريو');
                addItemOption('03-03','لوتس');
                addItemOption('03-04','بيستاشيو');
                addItemOption('03-05','فراولة');
                break;
            case '4':
                addItemOption('04-01','كوكيز');
                addItemOption('04-02','قطع كوكيز');
                break;
            case '5':
                addItemOption('05-01','اوريو');
                addItemOption('05-02','لوتس');
                addItemOption('05-03','بيستاشيو');
                addItemOption('05-04','تيراميسو');
                break;
            case '6':
                addItemOption('06-01','دونات');
                addItemOption('06-02','ميني تارت');
                addItemOption('06-03','جوزية');
                addItemOption('06-04','كاندي');
                addItemOption('06-05','كب كيك كبير');
                addItemOption('06-06','كب كيك وسط');
                addItemOption('06-07','سينابون');
            break;
            case '7':
                addItemOption('07-01','بالون هواء');
                addItemOption('07-02','بالون هيليوم');
                addItemOption('07-03','ثيمات');
                addItemOption('07-04','شموع عيد ميلاد');
                addItemOption('07-05','شموع معطره');
                addItemOption('07-06','نجوم الليل');
                break;
            case '8':
                addItemOption('08-01','قهوة تركية');
                addItemOption('08-02','قهوة امريكية');
                break;
            case '9':
                addItemOption('09-01','ورق عنب');
                break;
            default:
                break;
        }
    });

    function addItemOption(itemValue,itemName) {
        const option = document.createElement('option');
        option.value = itemValue;
        option.textContent = itemName;
        itemSelect.appendChild(option);
    }

    // Handle form submission (you can add validation logic here)
    /* document.getElementById('employeeForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // Get form data and process it
        // ...
        alert('Form submitted successfully!');
    }); */
});
