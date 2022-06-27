const conn = require("./db");
module.exports = {
    select: () => {
        const select = `SELECT * FROM new_table `;
        return new Promise((resolve, reject) => {
            conn.query(select, (err, result) => {
                if (err) throw Error(err.message);
                resolve(result);
            })
        })
    },
    add: (data) => {
        const insertSql = `INSERT INTO new_table(nameCity,nameCountry,dientich,danso,gdp,gioithieu) VALUES('${data.nameCity}','${data.nameCountry}',${Number(data.dientich)},${Number(data.danso)},${Number(data.gdp)},'${data.gioithieu}')`
        return new Promise((resolve, reject) => {
            conn.query(insertSql, err => {
                if (err) {
                    reject(err);
                }
                resolve('add success')
            })
        })
    },
    delete: (id) => {
        const deleteSql = `Delete FROM new_table where id = ${id}`;
        return new Promise((resolve, reject) => {
            conn.query(deleteSql, err => {
                if (err) reject(err)
                resolve('delete success');
            });
        });
    },
    edit: (data, id) => {
        const editSql = `UPDATE new_table SET nameCity = '${data.nameCity}',nameCountry = '${data.nameCountry}', dientich = ${Number(data.dientich)}, danso = ${Number(data.danso)}, gdp = ${Number(data.gdp)}, gioithieu = '${data.gioithieu}' WHERE new_table.id = '${id}'`;
        return new Promise((resolve, reject) => {
            conn.query(editSql, err => {
                if (err) reject(err);
                resolve('edit success');
            });
        });
    },
    getEdit: (id) => {
        const selectDataFromId = `SELECT nameCity,nameCountry,dientich,danso,gdp,gioithieu FROM new_table WHERE new_table.id = ${id}`
        return new Promise((resolve, reject) => {
            conn.query(selectDataFromId, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    },
    show: (id) => {
        const showDataFromId = `SELECT * FROM new_table WHERE new_table.id = ${id}`
        return new Promise((resolve, reject) => {
            conn.query(showDataFromId, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}