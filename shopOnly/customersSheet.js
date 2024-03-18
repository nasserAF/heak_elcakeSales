const scriptURL = 'https://script.google.com/macros/s/AKfycbzGk3A6TO790DZc0cJUIvgJo5PHpxsO1kyIQt_4471bkZQwkkonzkuBCbeXdxP-GCxu/exec'

const form = document.forms['customersForm']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("شكرا لك ،،، تمت العملية بنجاح" ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})