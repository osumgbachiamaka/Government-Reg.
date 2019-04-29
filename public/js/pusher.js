var pusher = new Pusher('e492b1dfd182dd30fde2', {
    cluster: 'eu'
});
var socketId;

// retrieve the socket ID on successful connection
pusher.connection.bind('connected', function() {
    socketId = pusher.connection.socket_id;
});


var channel = pusher.subscribe('post-events');
channel.bind('postAction', function(data) {
    // log message data to console - for debugging purposes
    console.log(data);
    var action = data.action;
    updatePostStats[action](data.postId);
});

