const scriptURL = 'https://script.google.com/macros/s/AKfycby5czqW2itqEnMulcWnfVla5yXuIeGlKBPK_pq74Sep3DU2C41OCf_B5Vk07b2NT6ltmw/exec'

const form = document.forms['expensesForm']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("شكرا لك ،،، تمت العملية بنجاح" ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})