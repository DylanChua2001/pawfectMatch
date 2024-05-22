const {pool} = require('pg')
const config = require("./config.json")

class DataBase {
    constructor(){
        this.pool = new Pool({
            host: config.db.host,     
            user : config.db.user,
            password : config.db.password,
            port : config.db.port,
            database : config.db.database
        })
    }

    async connect() { 
        try{
            await this.pool.connect()
            console.log("Database connected successfully")
        }
        catch(error){
            console.error("Database connection failed", error)
            process.exit(1)
        }
    }

    async query(text,params){
        const client = await this.pool.connect()
        try{
            return await client.query(text,params)
        }
        finally{
            client.release
        }
    }
}

module.exports = new Database()