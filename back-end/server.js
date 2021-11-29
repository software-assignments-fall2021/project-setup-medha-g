const server = require('./app');
require("dotenv").config({ silent: true });

const port = process.env.PORT;

const listener = server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const close = () => {
    listener.close();
}

module.exports = {
    close: close
}