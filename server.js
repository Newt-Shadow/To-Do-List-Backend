const http = require('http');
const app = require('./app');
const sequelize = require('./config/db');

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Socket.io logic
io.on('connection', (socket) => {
  console.log('New WebSocket connection');
});

const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
