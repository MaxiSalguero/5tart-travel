const username = localStorage.getItem('name');
if (!username) {
    window.location.replace('/')
    throw new Error('usuario requerido')
}
const socket = io({
    auth: {
        token: "abc-123",
        name: username
    }
});

const Online = document.querySelector('#status-online')
const Offline = document.querySelector('#status-offline')
const lista = document.querySelector('.users')
const form = document.querySelector('form');
const input = document.querySelector('input');
const chatElements = document.querySelector('#chat');

const renderMessage = (payload) => {
    const {userId, message, name} = payload

    const divElement = document.createElement('div');
    divElement.classList.add('message')

    if (userId !== socket.id){
        divElement.classList.add('incoming')
    }

    divElement.innerHTML = 
    `<small >${ name }<small>
     <p>${ message }<p>`;
    chatElements.appendChild(divElement);

    chatElements.scrollTop = chatElements.scrollHeight

}

socket.on('connect', () => {
    Online.classList.remove('hidden');
    Offline.classList.add('hidden');

    console.log('Conectado');
})

socket.on('disconnect', () => {
    Online.classList.add('hidden');
    Offline.classList.remove('hidden');

    console.log('Desconectado');
})

socket.on('welcome-message', (data) => {
    console.log(data);
})

socket.on('on-clients-changed', (data) => {
    lista.innerHTML = ''
    data.forEach((user) => {
        const liElement = document.createElement('li');
        liElement.innerText = user.name;
        lista.appendChild(liElement)
    });

    console.log(data);

})

socket.on('on-message', renderMessage)

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const message = input.value;
    input.value = '';
    
    socket.emit('send-message', message);
});