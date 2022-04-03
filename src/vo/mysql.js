
const mysql = require('mysql')
const con = mysql.createConnection({
    host: "1.221.216.110",
    user: "root",
    password: "1138877",
    database: "seoul_test"
});

con.connect((e)=>{
    if(!e)
    console.log("Connected!");
})
const map = {
    connect: con,
    query: (query, params)=>
        new Promise( (resolve, reject)=>
            params?.length ? 
                con.query(query, params, (err, result)=> err ? reject(err) : resolve(result) ) :
                con.query(query, (err, result)=> err ? reject(err) : resolve(result) )
    )
}

export default map