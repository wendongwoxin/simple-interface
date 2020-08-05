
const login = (conn, req, res) => {
    const params = req.body
    conn.query(`select * from user where name = '${params.name}' and password = '${params.password}'`,function(error, results, fields){
        const ret = {}
        if(error) {
            ret.flag = false
            ret.message = error.sqlMessage
            res.json(ret)
            return
        };
        if (results.length === 0) {
            ret.flag = false
            ret.message = 'please check your name and password are correct!'
        } else {
            ret.flag = true
            ret.message = 'success'
        }
        res.json(ret)
    })
}

const user = (conn, req, res) => {
    const params = req.body
    console.log(params)
    let sql = ''
    if(params.type == 0) { // search
        sql = `select * from user where name like '%${params.name}%'`
    } else if (params.type == 1) { // insert
        sql = `insert into user(name, password) values ('${params.name}', '${params.password}')`
    } else if (params.type == 2) { // delete
        sql = `delete from user where id = ${params.id}`
    } else if (params.type == 3) { // update
        sql = `update user set name = '${params.name}', password = '${params.password}' where id = ${params.id}`
    }
    conn.query(sql,function(error, results, fields){
        const ret = {}
        if(error) {
            ret.flag = false
            ret.message = error.sqlMessage
            res.json(ret)
            return
        };
        ret.flag = true
        ret.data = results
        res.json(ret)
    })
}
exports.login = login
exports.user = user