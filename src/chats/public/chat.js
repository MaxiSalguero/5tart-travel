console.log('Codigo del chat');

const socket = io(); // Va a ser el encargado de enviar los eventos al servidor


//DOM ELEMENTS
let message = document.getElementById('message')
let username = document.getElementById('username')
let button = document.getElementById('send')
let output = document.getElementById('output')
let actions = document.getElementById('actions')

button.addEventListener('click', function (){ //Cuando al botón se le de click

    //Enviamos los datos cargados en los input al servidor
    socket.emit('chatMessage', {username : username.value, message: message.value}) //A traves del evento chatMessage enviamos los datos username y message
})

socket.on('chatMessage', function (data) { //Escucha los eventos chatMMessage del lado del cliente

    actions.innerHTML = '' //Ponemos en blanco cuando el usuario ya no está tipeando
    output.innerHTML += `<p> <strong>${data.username}</strong>: ${data.message}</p>` //Cuando se ejecute el evento chatMessage desde el servidor, entonces se muestra en pantalla los datos
}) 


message.addEventListener('keypress', function(){ //Cada vez que alguien este tipeando, se ejecuta
    socket.emit('chatTyping', username.value) //Cuando alguien esta tipeando, enviamos al servidor el nombre del usuario que lo está haciendo
})

socket.on('chatTyping', function (username){ //Escucha los eventos chatTyping del lado del cliente
    actions.innerHTML = `<p> <em>${username}</em> está tipeando un mensaje</p>`
})