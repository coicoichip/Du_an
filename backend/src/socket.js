
let wsNotification;
const userManagement = {
  notifications: {},
};

function socketNotification(io) {
  wsNotification = io.on('connection', socket => {
    userManagement.notifications[socket.user_id] = socket.user_id;
    socket.join(socket.user_id);

    socket.on('disconnect', () => {
      delete userManagement.notifications[socket.user_id];
      socket.leave(Object.keys(socket.rooms)[0]);
    });
  });
}

function triggerNotification(user_id, content) {
  if (userManagement.notifications[user_id] && userManagement.notifications[user_id].group_id) {
    wsNotification.to(user_id).emit('notify', content);
  }
}

module.exports = {
  socketNotification,
  triggerNotification,
};
