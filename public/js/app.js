
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const oneMessage = document.querySelector('#message-1')
const twoMessage = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetch('/weather?adress=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                oneMessage.textContent = data.error
                twoMessage.textContent = ''
            } else {
                oneMessage.textContent = 'Location :' + data.location
                twoMessage.textContent = 'Weather :' + data.forecast
            }
        })
    })
})
