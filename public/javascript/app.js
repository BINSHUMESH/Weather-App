console.log('javascript is running on backend')


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')

const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log('1')
    const location=search.value
    message1.textContent='loading...'
    message2.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
            response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
            }else{
                console.log(data)
                message2.textContent=data.Forecast
                message1.textContent=data.Location
            }
            
        })
    })
})
