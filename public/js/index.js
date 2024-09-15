/*eslint-disable-next-line */
import InputElement from './components/Input.js'

const $form = document.querySelector('form')
const $urlList = document.querySelector('ul')

$form.addEventListener('submit', function (e) {
  e.preventDefault()

  const formData = new FormData(this)
  const jsonData = {}

  formData.forEach((value, key) => (jsonData[key] = value))

  const jsonParsed = JSON.stringify(jsonData)

  fetch('/api/short-url', {
    headers: {
      'Content-type': 'application/json',
    },
    method: 'POST',
    body: jsonParsed,
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.message) {
        $urlList.innerHTML += /*html*/ `<li><a href="/${data.alias ?? data.hash}">${data.alias ?? data.hash}</a></li>`
        return
      }

      alert(data.message) //TODO: Cambiar esto a un modal o toast
    })
    .catch((e) => {
      console.log(e)
      alert('Server error try later')
    })
    .finally(() => {
      $form.reset()
    })
})
