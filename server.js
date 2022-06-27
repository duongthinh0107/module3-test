const http = require('http');
const conn = require("../module3-test/models/db");
const controllers = require('./controllers/controllers')
const url = require("url");

conn.connect(err => {
    if (err) {
        throw Error(err.message);
    } else {
        console.log('connect success!!!');
    }
});

http.createServer((req, res) => {
    let parseUrl = url.parse(req.url, true);

    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');

    let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
    chosenHandler(req, res);
}).listen(8080)

let handlers = {};

handlers.render = (req, res) => {
    if (req.method === 'GET') {
        controllers.render(req, res)
    }
}

handlers.add = (req, res) => {
    if (req.method === 'GET') {
        controllers.readFile('./views/add.html', 200, res);
    } else {
        controllers.add(req, res)
    }
}

handlers.delete = (req, res) => {
    controllers.delete(req, res)
}

handlers.edit = (req, res) => {
    if (req.method === 'GET') {
        controllers.getEdit(req, res)
    } else {
        controllers.postEdit(req, res)
    }
}

handlers.show = (req, res) => {
    if (req.method === 'GET') {
        controllers.show(req, res);
    }
}


let router = {
    'add': handlers.add,
    'delete-city': handlers.delete,
    'edit': handlers.edit,
    'render': handlers.render,
    'show': handlers.show
}