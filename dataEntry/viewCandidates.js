var candidateRef = firebase.database().ref('candidateForJob');
        candidateRef.on('value', function (snapshot) {
            var data = snapshot.val();
            var table = document.getElementById('candidateTable');

            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var row = table.insertRow(-1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);

                    cell1.innerHTML = data[key].name;
                    cell2.innerHTML = data[key].age;
                    cell3.innerHTML = data[key].email;
                    cell4.innerHTML = data[key].mobile;

                    // Create a nested table for experiences with titled sub-columns
                    var expTable = '<table style="width:100%"><tr><th style="background-color: #e91e63;">الخبرة</th><th style="background-color: #e91e63;">مدة الخبرة</th></tr>';
                    data[key].experiences.forEach(function (exp) {
                        expTable += '<tr><td class="textAlignRight">' + exp.experienc + '</td><td class="textAlignRight">' + exp.experiencYear + '</td></tr>';
                    });
                    expTable += '</table>';
                    cell5.innerHTML = expTable;

                    // Create a nested table for qualifications with titled sub-columns
                    var qualTable = '<table style="width:100%"><tr><th style="background-color: #e91e63;">المؤهل</th><th style="background-color: #e91e63;">سنة التخرج</th></tr>';
                    data[key].qualifications.forEach(function (qual) {
                        qualTable += '<tr><td class="textAlignRight">' + qual.qualification + '</td><td class="textAlignRight">' + qual.qualificationYear + '</td></tr>';
                    });
                    qualTable += '</table>';
                    cell6.innerHTML = qualTable;
                }
            }
        });
 