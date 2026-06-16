import 'dotenv/config';
import mysql from 'mysql2/promise';

// class: é uma basicamente uma forma
// Design Pattern: Singleton => permite a criação de apenas uma instância da classe
class Database {
    static #instance = null;
    #pool = null;

    #createPool(){
        this.#pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
            waitForConnections: true,
            connectionLimit: 100,
            queueLimit: 0,
            ssl: { rejectUnauthorized: false }
        });
    }

    static getInstance(){ // serve para ver se já existe um banco de dados, se sim, ele apenas retorna
        if(!Database.#instance){
            Database.#instance = new Database();
            Database.#instance.#createPool();
        }

        return Database.#instance;

    }

    getPool(){
        return this.#pool;
    }
}

export const connection = Database.getInstance().getPool();

export async function initializeDatabase() {
    console.log("Inicializando o banco de dados e tabelas...");
    try {
        const tempConnection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            ssl: { rejectUnauthorized: false }
        });


        const dbName = process.env.DB_DATABASE || 'ATV_FINAL_PBE2';

        await tempConnection.query(`DROP DATABASE IF EXISTS \`${dbName}\`;`);
        await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await tempConnection.query(`USE \`${dbName}\`;`);


        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS categorias (
            IdCategoria INT AUTO_INCREMENT PRIMARY KEY,
            NomeCategoria VARCHAR(100) NOT NULL,
            Descricao VARCHAR(255),
            DataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
        `);


            await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS Produtos (
                IdProduto INT AUTO_INCREMENT PRIMARY KEY,
                IdCategoria INT NOT NULL,
                NomeProduto VARCHAR(150) NOT NULL,
                DescricaoProduto VARCHAR(255),
                Preco DECIMAL(10,2) NOT NULL,
                Imagem VARCHAR(255),
                Estoque INT NOT NULL DEFAULT 0,
                DataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            CONSTRAINT FK_Produtos_Categorias
                FOREIGN KEY (IdCategoria)
                REFERENCES categorias(IdCategoria)
    );
        `);

        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS pedidos (
                IdPedido INT AUTO_INCREMENT PRIMARY KEY,
                ValorTotal DECIMAL(10,2) NOT NULL,
                StatusPedido ENUM('Aberto','Finalizado','Pendente'),
                DataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
        `);

        await tempConnection.query(`
            CREATE TABLE IF NOT EXISTS ItensPedido (
                IdItemPedido INT AUTO_INCREMENT PRIMARY KEY,
                IdPedido INT NOT NULL,
                IdProduto INT NOT NULL,
                Quantidade INT NOT NULL,
                PrecoUnitario DECIMAL(10,2) NOT NULL,
                DataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                CONSTRAINT FK_ItensPedido_Pedidos
                    FOREIGN KEY (IdPedido)
                    REFERENCES Pedidos(IdPedido),

                CONSTRAINT FK_ItensPedido_Produtos
                    FOREIGN KEY (IdProduto)
                    REFERENCES Produtos(IdProduto)
            );
        `);


        await tempConnection.end();
        console.log("Banco de dados e tabelas verificados/criados com sucesso.");
    } catch (error) {
        console.error("Erro ao criar o banco ou as tabelas:", error);
        throw error;
    }
}
