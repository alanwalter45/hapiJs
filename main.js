const Hapi = require('@hapi/hapi');
const Path = require("path");

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    await server.register(require('@hapi/inert'));
    await server.register(require('@hapi/vision'));

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
    });

    server.route([
        {
            method: ['GET', 'POST'],
            path: '/',
            handler: () => {
                return 'Hello World!';
            }
        },
        {
            method: 'GET',
            path: '/contactos',
            handler: () => {
                return 'contactos';
            }
        },
        {
            method: 'GET',
            path: '/archivo',
            handler: (request, h) => {
                return h.view('index', { name: "alan" });
            }
        },
        {
            method: 'GET',
            path: '/index.html',
            handler: (request, h) => {
                return h.file('index.html');
            }
        }]);

    await server.start();
    console.log("init ....");
};

init();