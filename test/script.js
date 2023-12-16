const slug = 'pplendgroup';  // The room name you want to connect to
const chatSocket = new WebSocket(
    'ws://localhost:8080/ws/chat/' + slug + '/'
);

chatSocket.onopen = function(e) {
    console.log('WebSocket connection established');
};

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    document.querySelector('#messages').innerHTML += '<li>' + data.message + '</li>';
};

chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly:', e);
    if (e.code) {
        console.error('WebSocket closed with code:', e.code);
    }
    if (e.reason) {
        console.error('WebSocket closed with reason:', e.reason);
    }
};

chatSocket.onerror = function(e) {
    console.error('WebSocket encountered an error:', e);
};

function sendMessage() {
    const messageInputDom = document.querySelector('#messageInput');
    const message = messageInputDom.value;
    chatSocket.send(JSON.stringify({
        'message': message
    }));
    messageInputDom.value = '';
}
