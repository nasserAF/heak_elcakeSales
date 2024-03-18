function fetchData() {
    var spreadsheetId = "1kytndZMlAfClbz8DPkRGX3t4YhSkc9wIA5wlBLMUHz4";  // Replace with your spreadsheet ID
    var sheetName = "salesSheet";
    var range = "currentDate, employeeId, itemCategory, item, qty, price, notes";
  
    var url = "https://sheets.googleapis.com/v4/spreadsheets/" + spreadsheetId + "/values/" + sheetName + "!" + range;
  
    $.ajax({
      url: url,
      headers: {
        "Authorization": "AIzaSyCIGXskvdAtJ-nJMntTeYgcCdzuFTC72P8"  // Replace with your API key
      },
      success: function(response) {
        var data = response.values;
  
        var table = $("#salesTable");
        var tableHead = $("<thead>");
        var tableBody = $("<tbody>");
  
        // Create table header
        var headerRow = $("<tr>");
        $.each(response.values[0], function(index, value) {
          headerRow.append($("<th>").text(value));
        });
        tableHead.append(headerRow);
  
        // Create table body
        $.each(data, function(rowIndex, row) {
          var rowData = $("<tr>");
          $.each(row, function(colIndex, value) {
            rowData.append($("<td>").text(value));
          });
          tableBody.append(rowData);
        });
  
        table.append(tableHead);
        table.append(tableBody);
      },
      error: function(error) {
        console.error("Error fetching data:", error);
      }
    });
  }
  