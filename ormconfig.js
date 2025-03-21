module.exports = {
    type:"postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'postgres',
    entities: ['dist/**/.entity.js'],
    migrations:['dist/migrations/*.js'],
    cli:{
        migrationsDir:'src/migrations'
    }
}