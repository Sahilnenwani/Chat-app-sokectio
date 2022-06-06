const chatform=document.getElementById('chat-form');
const chatMessages=document.querySelector('.chat-messages');

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });


const socket=io();

socket.emit('joinRoom',{username,room})

// Get username and room from URL

  console.log(username,room)


socket.on('message',message=>{
    console.log(message)
    outPutMessage(message);
//scroll down
chatMessages.scrollTop=chatMessages.scrollHeight;

})


chatform.addEventListener('submit',(e)=>{
    e.preventDefault();

    const msg=e.target.elements.msg.value;
    // console.log(msg)

    //emiting a message to server
    socket.emit('chatMessage',msg);
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();


})

function outPutMessage(message){
    const div =document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`	<p class="meta">${message.username+" "}<span>${message.time}</span></p>
    <p class="text">
       ${message.text}
    </p>
    `;
document.querySelector('.chat-messages').appendChild(div);

}