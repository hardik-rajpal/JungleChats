// import { ClientConfig } from "pg";

const { readFileSync } =require ("fs");

const {Pool,Client}= require("pg");
// import * from "pg"
const config = {
    user: "vfvghwoicxzkzu",
    host: "ec2-107-20-24-247.compute-1.amazonaws.com",
    database: "dasn4n29pmk28h",
    password: "869d6ec6aa97e1586c5cfa036052f410b69a41e230c0dcfdb3bed84c173e14e1",
    // connectionString:'postgres://vfvghwoicxzkzu:869d6ec6aa97e1586c5cfa036052f410b69a41e230c0dcfdb3bed84c173e14e1@ec2-107-20-24-247.compute-1.amazonaws.com:5432/dasn4n29pmk28h?ssl=true',
    port: 5432,
    ssl:{
        rejectUnauthorized:false,
        key:readFileSync('cert/key.pem').toString(),
        cert:readFileSync('cert/cert.pem').toString()
    }
}
console.log(config)
let pool = new Pool(config)
// pool.connect();
const tableName ='junglechat_chatsnippet'
pool.query(`SELECT * FROM ${tableName}`).then((ans:any)=>{
    // console.log(ans.rows)
    console.log(Object.keys(ans))
    pool.end()
}).catch((e:any)=>{
    console.log(Object.keys(e))
    console.log(e)
    pool.end()
})

/*

// import { ClientConfig } from "pg";

const { readFileSync } =require ("fs");

const {Pool,Client}= require("pg");
// import * from "pg"
const config = {
    connectionString:'postgres://vfvghwoicxzkzu:869d6ec6aa97e1586c5cfa036052f410b69a41e230c0dcfdb3bed84c173e14e1@ec2-107-20-24-247.compute-1.amazonaws.com:5432/dasn4n29pmk28h',
    ssl:{
        rejectUnauthorized:false,
        key:readFileSync('cert/key.pem').toString(),
        cert:readFileSync('cert/cert.pem').toString()
    }
}
let client = new Pool(config)
const tableName ='junglechat_chatsnippet'
// client.connect()
client.query(`SELECT * FROM ${tableName}`).then((ans:any)=>{
    // console.log(ans.fields)
    console.log(Object.keys(ans))
    // client.end()  
    // setTimeout(() => {
    //     client.query(`SELECT * FROM ${tableName}`).then((ans:any)=>{
    //         // console.log(ans.fields)
    //         console.log(Object.keys(ans))
    //     }) 
    // }, 20000);

    // client.end()  

})
*/