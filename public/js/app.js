console.log('Client side javascript file is loaded!')

//set up an event listener
const init = () => {
    const weatherForm = document.querySelector('form')
    console.log(weatherForm)
    weatherForm.addEventListener('submit', send)
}

const send = (e) => {
    e.preventDefault();

    const messageOne = document.querySelector('#message-1');
    const messageTwo = document.querySelector('#message-2');
    const { value: address } = document.querySelector('input')
    messageOne.textContent = "loading..."
    messageTwo.textContent = ""
    fetch(`http://localhost:3000/weather?address=${address}`)
        .then(res => res.json())
        .then(({ error, location, forecast } = {}) => {
            if (error) {
                messageOne.textContent = error + " Try another Search.";
                return console.log(error + " Try another Search.")
            }
            console.log(location, forecast)
            messageOne.textContent = location;
            messageTwo.textContent = forecast;
        })
        .catch(e => {
            messageOne.textContent = 'Something went wrong! Please try again.'
            console.log('Something went wrong! Please try again.')
        })
}

//launch init when the document has finished loading
document.addEventListener('DOMContentLoaded', init);
/** alternatively, we could move the <script> tag at the end of <body> */