import app from "./app";

async function init() {
    await app.listen(process.env['SERVER_PORT']);
    console.log('Server on port********************', process.env['SERVER_PORT']);
    console.log('ApiRestful SIGV connect to********', process.env['AMBIENTE']);
}
init();