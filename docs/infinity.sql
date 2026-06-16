
CREATE DATABASE IF NOT EXISTS ATV_FINAL_PBE2;

USE ATV_FINAL_PBE2;

CREATE TABLE IF NOT EXISTS Categorias (
    IdCategoria INT AUTO_INCREMENT PRIMARY KEY,
    NomeCategoria VARCHAR(100) NOT NULL,
    Descricao VARCHAR(255),
    DataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
        REFERENCES Categorias(IdCategoria)
);

CREATE TABLE IF NOT EXISTS Pedidos (
    IdPedido INT AUTO_INCREMENT PRIMARY KEY,
    ValorTotal DECIMAL(10,2) NOT NULL,
    StatusPedido ENUM('Aberto','Finalizado','Pendente'),
    DataCad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
