const fs = require("fs");
const models = require("../models/query");
const qs = require('qs')
const url = require("url");
module.exports = {
    readFile: (path, statusCode, res) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            res.writeHead(statusCode, {'Content-type': 'text/html'});
            res.write(data);
            res.end();
        });
    },
    render: (req, res) => {
        let data = '';
        req.on('data', chunk => data += chunk)
        req.on('end', () => {
            fs.readFile('./views/render.html', 'utf-8', (err, data) => {
                models.select().then(result => {
                    let html = '';

                    result.forEach((data, index) => {

                        html += '<tr>';
                        html += `<td>${index + 1}</td>`;
                        html += `<td>${data.nameCity}</td>`;
                        html += `<td>${data.nameCountry}</td>`;
                        html += `<td><a class="btn btn-primary" href="/edit?id=${data.id}">Edit</a>
                                    <a class="btn btn-danger" href="/delete-city?id=${data.id}">Delete</a>
                                    <a class="btn btn-primary" href="/show?id=${data.id}">ShowInfo</a><td></td>`
                        html += `</tr>`;
                    })
                    data = data.replace('{render}', html);
                    res.writeHead(200, {'Content-type': 'text/html'});
                    res.write(data);
                    res.end();
                });
            });
        });
    },
    add: (req, res) => {
        let data = '';
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', () => {
            let dataAdd = qs.parse(data);
            console.log(dataAdd);
            models.add(dataAdd)
                .then(result => {
                    res.writeHead(301, {
                        Location: '/render' // This is your url which you want
                    });
                    res.end();
                })
        })
    },
    edit: (req, res) => {

    },
    getEdit: (req, res) => {
        fs.readFile('./views/edit.html', 'utf8', (err, dataEdit) => {
            let url1 = url.parse(req.url, true)
            let id = (qs.parse(url1.query)).id;
            models.getEdit(id)
                .then(result => {
                    res.writeHead(200, {'content-type': 'text/html'})
                    dataEdit = dataEdit.replace('<h3></h3>',`<h3>Ch???nh s???a th??nh ph??? ${result[0].nameCity}</h3>`)
                    dataEdit = dataEdit.replace('<input type="text" name="nameCity" id="nameCity" placeholder="Th??nh ph???" required>',
                        `<input type="text" name="nameCity" id="nameCity" placeholder="Th??nh ph???" value="${result[0].nameCity}" required></div>`
                    );
                    dataEdit = dataEdit.replace('<input type="text" name="nameCountry" id="nameCountry" placeholder="Qu???c gia">',
                        `<input type="text" name="nameCountry" id="nameCountry" placeholder="Qu???c gia" value = "${result[0].nameCountry}">`
                    );
                    dataEdit = dataEdit.replace('<input type="number" name="dientich" id="type" placeholder="Di???n t??ch" required>',
                        `<input type="number" name="dientich" id="type" placeholder="Di???n t??ch" value="${result[0].dientich}" required>`
                    );
                    dataEdit = dataEdit.replace('<input type="number" name="danso" id="price" placeholder="D??n s???" required>',
                        `<input type="number" name="danso" id="price" placeholder="D??n s???" value = "${result[0].danso}" required>`)
                    dataEdit = dataEdit.replace('<input type="number" name="gdp" id="GDP" placeholder="GDP" required>',
                        `<input type="number" name="gdp" id="GDP" placeholder="GDP" value = "${result[0].gdp}" required>`)
                    res.write(dataEdit)
                    res.end();
                });
        });
    },
    postEdit:(req,res)=>{
        let data = '';
        req.on('data', (chunk) => data += chunk);
        req.on('end', () => {
            let url1 = url.parse(req.url, true)
            let id = (qs.parse(url1.query)).id;
            let dataEdit = qs.parse(data);
            models.edit(dataEdit, id)
                .then(result => {
                    res.writeHead(301, {
                        Location: '/render'
                    });
                    res.end();
                })
        })
    },
    delete: (req, res) => {
        let urlPath = url.parse(req.url, true)
        let id = (qs.parse(urlPath.query)).id;
        models.delete(id)
            .then(result => {
                res.writeHead(301, {
                    Location: '/render'
                });
                res.end();
            })
    },
    show: (req, res) => {
        fs.readFile('./views/show.html','utf-8',(err,dataShow) => {
            let url1 = url.parse(req.url, true)
            let id = (qs.parse(url1.query)).id;
            let htmlShow = ''
            models.show(id)
                .then(result=>{
                    htmlShow += `<h3>Th??nh ph??? ${result[0].nameCity}</h3>`
                    htmlShow += `<p>T??n: ${result[0].nameCity}</p>`
                    htmlShow += `<p>Qu???c gia: ${result[0].nameCountry}</p>`
                    htmlShow += `<p>Di???n t??ch: ${result[0].dientich}</p>`
                    htmlShow += `<p>D??n s???: ${result[0].danso}</p>`
                    htmlShow += `<p>Gdp: ${result[0].gdp}</p>`
                    htmlShow += `<p>Gi???i thi???u: <br> ${result[0].gioithieu} </p>`
                    htmlShow += `<a class="btn btn-primary" href="/render">Xem danh s??ch</a>
                                <a class="btn btn-success" href="/edit?id=${result[0].id}">Ch???nh s???a</a>
                                <a class="btn btn-danger" href="/delete-city?id=${result[0].id}">Xo??</a>`
                    dataShow = dataShow.replace('{show}',htmlShow)
                    res.write(dataShow);
                    res.end();

                })


        })
    }
}