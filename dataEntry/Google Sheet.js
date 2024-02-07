const scriptURL = 'https://script.google.com/macros/s/AKfycbw17k2dTvRgUBmRe6RWfgOQGKhLX-hKYJltd2s7xJeNWUimZlUrEQhT60MR8kUjBhWz/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("تمت عملية تسجيل البيانات بنجاح" ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})