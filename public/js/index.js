var socket = io();
socket.on('connect', function() {
  console.log("connected to server");
})

socket.on('disconnect' , function() {
  console.log("disconnected from server");
})



socket.on('newMessage' , function(message) {
  console.log("Message received " , message);
  var li = jQuery('<li></li>');
  li.text(`${message.message.from} : ${message.message.text}`);
  jQuery('#messages').append(li);
})

socket.emit('createMessage' , {
  from : "Dinesh ",
  text: "hi"
} , function(message) {
  console.log("Got it" , message);
})


jQuery('#message-form').on('submit' , function(event) {
  event.preventDefault();
  socket.emit('createMessage' , {
    from : "user",
    text: jQuery('[name=message]').val()
  } , function() {

  })
})
