
# INSTRUÇÕES JSON-SERVER


### Instalar a extensão do json-server
npm i json-server


### Criar a pasta/arquivo do repositóio:
--| jsonserver
----- | db.json


### Criar as coleções e dados iniciais fictícios:
{
    "filmes": [
        { "id": 1, "titulo": "Inception", "ano": 2010, "genero": "Sci-Fi" },
        { "id": 2, "titulo": "The Dark Knight", "ano": 2008, "genero": "Action" },
        { "id": 3, "titulo": "Interstellar", "ano": 2014, "genero": "Sci-Fi" }
    ]
}

* Toda coleção precisa ter um campo "id" usado para chave primária pelo json-server.


### Criar script para subir JSON-SERVER
"scripts": {
    ...
    "api": "json-server --watch jsonserver/db.json --port 5010"
}


### Endpoints padrão
•	GET     /filmes       → lista todos os filmes
•	GET     /filmes/1     → retorna o filme com id = 1
•	POST    /filmes       → insere um novo filme
•	PUT     /filmes/1     → altera os dados do filme com id = 1
•	DELETE  /filmes/1     → remove o filme com id = 1
