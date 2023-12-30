document.addEventListener('DOMContentLoaded', () => {
    const itemCategorySelect = document.getElementById('itemCategory');
    const itemSelect = document.getElementById('item');

    // Define item options based on selected category
    itemCategorySelect.addEventListener('change', () => {
        const selectedCategory = itemCategorySelect.value;
        itemSelect.innerHTML = ''; // Clear existing options

        switch (selectedCategory) {
            case '1':
                addItemOption('بيبي كيك 2 شخص');
                addItemOption('ميني كيك 4 اشخاص');
                addItemOption('كيك 6 اشخاص');
                addItemOption('كيك 8 اشخاص');
                addItemOption('كيك 10 اشخاص');
                addItemOption('كيك 12 شخص');
                addItemOption('كيك تواصي');
                break;
            case '2':
                addItemOption('شوكولا');
                addItemOption('ريد فيلفيت');
                addItemOption('فانيلا');
                break;
            case '3':
                addItemOption('ميني تشيز كيك');
                addItemOption('اوريو');
                addItemOption('لوتس');
                addItemOption('بيستاشيو');
                addItemOption('فراولة');
                break;
            case '4':
                addItemOption('كوكيز');
                addItemOption('قطع كوكيز');
                break;
            case '5':
                addItemOption('اوريو');
                addItemOption('لوتس');
                addItemOption('بيستاشيو');
                break;
            case '6':
                addItemOption('دونات');
                addItemOption('ميني تارت');
                addItemOption('جوزية');
                addItemOption('كاندي');
                addItemOption('كب كيك كبير');
                addItemOption('كب كيك وسط');
            break;
            case '7':
                addItemOption('بالون هواء');
                addItemOption('بالون هيليوم');
                addItemOption('ثيمات');
                addItemOption('شموع عيد ميلاد');
                addItemOption('شموع معطره');
                addItemOption('نجوم الليل');
                break;
            case '8':
                addItemOption('قهوة تركية');
                addItemOption('قهوة امريكية');
                break;
            default:
                break;
        }
    });

    function addItemOption(itemName) {
        const option = document.createElement('option');
        option.value = itemName;
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
