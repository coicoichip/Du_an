
let wsNotification;
const userManagement = {
  notifications: {},
};

function socketNotification(io) {
  wsNotification = io.on('connection', socket => {
    const { user_id } = socket.credentials;
    userManagement.notifications[user_id] = socket.credentials;
    socket.user_id = user_id;
    socket.join(user_id);

    socket.on('disconnect', () => {
      delete userManagement.notifications[socket.user_id];
      socket.leave(Object.keys(socket.rooms)[0]);
    });
  });
}

function triggerNotification(user_id, content) {
  if (userManagement.notifications[user_id]) {
    wsNotification.to(user_id).emit('newNotify', content);
  }
}

module.exports = {
  socketNotification,
  triggerNotification,
};
