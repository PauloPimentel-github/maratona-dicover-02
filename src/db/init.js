const Database = require("./config")

/** Objeto para inicializar o banco de dados */
const initDatabase = {
        async init(){
        /** Criar conexão com o banco */
        const dataBase = await Database()

        /** Criar a tabela profile */
        await dataBase.exec(`CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT
        )`)

        /** Criar a tabela jobs */
        await dataBase.exec(`CREATE TABLE jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`)

        /** Inserir dados em profile */
        await dataBase.run(`INSERT INTO profile (
            name,
            avatar,
            monthly_budget,
            days_per_week,
            hours_per_day,
            vacation_per_year,
            value_hour
        ) VALUES (
            "Paulo Pimentel",
            "https://github.com/PauloPimentel-github.png",
            3000,
            5,
            5,
            4,
            75
        )`)

        /** Inserir dados em jobs */
        await dataBase.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
            
        ) VALUES (
            "Pizzaria Guloso",
            2,
            1,
            1618077800800
        )`)

        /** Fechar a conexão com o banco */
        await dataBase.close()
    }
}

initDatabase.init()
