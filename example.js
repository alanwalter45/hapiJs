const hapi = require('@hapi/hapi');
const inert = require('@hapi/inert');
const vision = require('@hapi/vision');
const handlebars = require('handlebars');

const server = hapi.server({
    port: 3000, host: 'localhost', routes: {
        files: {
            relativeTo: './public'
        }
    }
});

async function init() {
    await server.register(inert);
    await server.register(vision);

    server.views({
        engines: {
            hbs: handlebars
        },
        relativeTo: __dirname,
        path: 'templates'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
            return h.file('index.html');
        }
    });
    server.route({
        method: 'GET',
        path: '/contactos/{name}',
        handler: function (request, h) {
            const objeto = { name: request.params.name };
            return h.view('index', objeto);
        }
    });
    server.route({
        method: 'POST',
        path: '/registro',
        handler: function (request, h) {
            return `ejemplo : ${request.payload.data}`;
        }
    });

    await server.start();
    console.log("servidor ejecutandose correctamente.");
}

process.on('unhandledRejection', function (error) {
    console.log(error);
    process.exit(1);
});

init();