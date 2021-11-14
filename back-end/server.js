const server = require('./app');
const port = 4090;

const listener = server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const close = () => {
    listener.close();
}

module.exports = {
    close: close
}