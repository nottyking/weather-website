console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  messageTwo.textContent = 'loading'

  console.log('testing!')
  const location = search.value
  // console.log(search.value)
  fetch(`http://localhost:3001/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
      messageOne.textContent = data.forecast
      messageTwo.textContent = data.location
      console.log('forecast :',data.forecast)
      console.log('location :',data.location)
    })
  })
})


