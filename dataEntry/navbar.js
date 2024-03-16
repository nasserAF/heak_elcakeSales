// Fetch and include the navbar from navbar.html
fetch('navbar.html')
.then(response => response.text())
.then(data => {
    document.getElementById('navbarContainer').innerHTML = data;
});