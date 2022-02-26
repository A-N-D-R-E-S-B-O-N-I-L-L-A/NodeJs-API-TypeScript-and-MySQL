import { Sequelize } from "sequelize";

const db = new Sequelize('api_users_typescript', 'root', '', {

    host: 'localhost',
    dialect: 'mysql'

})

export default db;