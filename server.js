const http = require('http');
const jsonBody = require('body/json')
const formBody = require('body/form');
const Router = require('router');

const PORT = 9001;

let i = 3;
const books = [
    {
        id: 1,
        title: 'Book 1',
        pages: 1900,
        price: 900,
    },
    {
        id: 2,
        title: 'Book 2',
        pages: 890,
        price: 230,
    },
    {
        id: 3,
        title: 'Book 3',
        pages: 789,
        price: 800,
    }
]

const router = new Router();

router.get('/books', (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(books));
});

router.post('/books', (request, response) => {
    jsonBody(request, response, (err, book) => {
        book.id = ++i;
        books.push(book);

        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(book));
    });
});

const server = http.createServer();
// server object is an event emitter
/* http.createServer((request, response) => {

}); */

server.on('request', (request, response) => {
    router(request, response, () => {
    });
});

/* server.on('request', (request, response) => {
    // called for every request sent to the server
    // request is a stream and eventemitter
    // response is a stream and eventemitter
    console.log(request.url);
    console.log(request.method);
    console.log(request.headers);

    /* jsonBody(request, response, (err, data) => {
        // err = {'username': 'dumy'};
        if (err) {
            response.statusCode = 500;
            response.end('Error');
            return;
        }

        console.log(data);
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(data));
    }); */

    /* formBody(request, {}, (err, data) => {
        response.end(JSON.stringify(data));
    });

    // let data = [];

    /* request.on('data', (chunk) => {
        data.push(chunk);
    });

    request.on('end', () => {
        const res = Buffer.concat(data).toString();
        const obj = JSON.parse(res);
        console.log(obj.username);
        console.log(obj.password);
        response.write(res);
        response.end();
    }); */

    /* setTimeout(() => {
        response.write('<html><body><h1>Hello and hi</h1>');
    }, 1000);

    setTimeout(() => {
        response.write('Good morning');
    }, 4000);

    setTimeout(() => {
        response.end('</body></html>');
    }, 4000); */
/* }); */

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});