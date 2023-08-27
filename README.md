# API Login utilizando JSON Web Token 

### Instalação da API
Clone do repositório
```sh
git clone https://github.com/allanvigiani/login_jwt
cd login-node
cp .env.example .env
openssl rand -hex 64
```
Atribua o valor recebino na variável de amviente AUTH_SECRET, ele será sua chave de acesso ao token
```dosini
AUTH_SECRET=código_gerado
```

Inicialize os containers do projeto
```sh
docker-compose up -d
```

Inicialize a API
```sh
npm run dev
```

Insira os seguintes registros no seu banco de dados local.
```sql
INSERT INTO users (name, email, password) VALUES ('Joao ADM', 'adm@adm.com', '123456');
INSERT INTO users (name, email, password) VALUES ('Usuario 1', 'usuario1@email.com', '123456');
INSERT INTO users (name, email, password) VALUES ('Usuario 2', 'usuario2@email.com', '123456');
```

Link do app
[http://localhost:3000](http://localhost:3000)  

#### Rota -> Login (POST)
[http://localhost:3000/auth/login](http://localhost:3000/auth/login)  
#### Exemplo
```json
{
  "email": "adm@adm.com",
  "password": "123456"
}
```
#### Logout
#### Metodo DELETE
[http://localhost:3000/auth/logout](http://localhost:3000/auth/logout)  
OBS usar o token gerado no login

#### Users
#### Metodo GET
[http://localhost:3000/users](http://localhost:3000/users)  
