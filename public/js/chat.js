document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('name');
    if (!username) {
      window.location.replace('/');
      throw new Error('Usuario requerido');
    }
  
    const socket = io({
      auth: {
        token: "abc-123",
        name: username
      }
    });
  
    const onlineStatus = document.querySelector('#status-online');
    const offlineStatus = document.querySelector('#status-offline');
    const userList = document.querySelector('#user-list');
    const chatElements = document.querySelector('#chat');
    const privateChatElements = document.querySelector('#private-chat');
    const messageForm = document.querySelector('#message-form');
    const messageInput = document.querySelector('#message-input');
    const privateMessageForm = document.querySelector('#private-message-form');
    const recipientIdInput = document.querySelector('#recipient-id');
    const privateMessageInput = document.querySelector('#private-message-input');
  
    // Función para renderizar un mensaje en el chat general
    const renderMessage = (payload) => {

      const { userId, message, name } = payload;
      const divElement = document.createElement('div');
      divElement.classList.add('message');
  
      if (userId !== socket.id) {
        divElement.classList.add('incoming');
      }
  
      divElement.innerHTML = `
        <small>${name}</small>
        <p>${message}</p>`;
      chatElements.appendChild(divElement);
      chatElements.scrollTop = chatElements.scrollHeight;

    };
  
    // Función para renderizar un mensaje en el chat privado
    const renderPrivateMessage = (payload) => {

      const { senderId, content } = payload;
      const divElement = document.createElement('div');
      divElement.classList.add('message');
  
      if (senderId !== socket.id) {
        divElement.classList.add('incoming');
      }
  
      divElement.innerHTML = `
        <small>${senderId}</small>
        <p>${content}</p>`;
      privateChatElements.appendChild(divElement);
      privateChatElements.scrollTop = privateChatElements.scrollHeight;
    };
  
    socket.on('connect', () => {

      onlineStatus.classList.remove('hidden');
      offlineStatus.classList.add('hidden');
      console.log('Conectado');

    });
  
    socket.on('disconnect', () => {

      onlineStatus.classList.add('hidden');
      offlineStatus.classList.remove('hidden');
      console.log('Desconectado');

    });
  
    socket.on('welcome-message', (data) => {
      console.log(data);
    });
  
    socket.on('on-clients-changed', (data) => {
      
      userList.innerHTML = '';
      data.forEach((user) => {
        const liElement = document.createElement('li');
        liElement.innerText = user.name;
        userList.appendChild(liElement);
      });
      console.log(data);
    });
  
    socket.on('on-message', renderMessage);
  
    messageForm.addEventListener('submit', (event) => {

      event.preventDefault();
      const message = messageInput.value.trim(); // Trim para evitar enviar mensajes vacíos
      if (message === '') return;
  
      messageInput.value = '';
      socket.emit('send-message', message);
    });
  
    socket.on('private-message-sent', renderPrivateMessage);
    socket.on('private-message-received', renderPrivateMessage);
  
    privateMessageForm.addEventListener('submit', (event) => {
      
      event.preventDefault();
      const recipientId = recipientIdInput.value.trim();
      const content = privateMessageInput.value.trim(); // Trim para evitar enviar mensajes vacíos
      if (recipientId === '' || content === '') return;
  
      privateMessageInput.value = '';
  
      // Aquí se envía el mensaje privado con el socket.id como senderId
      const data = { senderId: socket.id, receiverId: recipientId, content };
      socket.emit('send-private-message', data);
    });
  });
  