## Indice

- [Sobre](#-sobre)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Endpoints da API](#-endpoints-da-API)
- [Como baixar o projeto](#-como-baixar-o-projeto)

---

## 📋Sobre

API simples que permite a criação de uma série de exercícios físicos com base nos exercícios que foram registrados.
Cada tabela contém um CRUD básico.

Forma que uma série é gerada: 
1º: São colocadas no topo 3 exercícios que ativam mais de um grupo muscular(Exercícios compostos).
2º: Logo depois os exercícios que ativam um grupo muscular(Exercícios isolados), um exercício por grupo muscular.

Pretendo adicionar testes unitários para todos os endpoints.

---

## 📌Tecnologias utilizadas

O backend do projeto foi desenvolvido utilizando as seguintes tecnologias:

- NodeJs
- Typescript
- Express
- PrismaORM


---

## Endpoints da API

### Módulo Exercises
**POST** /exercises | Criação de uma novo exercício
```json
{
	"name": "",
	"muscles_names": [
		""
	],
	"necessary_equipment_name": "",
	"execution_example_link": ""
}
```

**GET** /exercises | Exibe todos os exercícios

**PATCH** /exercises/:id | Atualiza um exercício existente
```json
{
	"name": "",
	"muscles_names": [
		""
	],
	"necessary_equipment_name": "",
	"execution_example_link": ""
}
```

**DELETE** /exercises/:id | Deleta um exercício existente

**POST** /exercises/workout/generate-fullbody-workout 

### Módulo muscles
**POST** /muscles | Criação de um novo músculo
```json
{
	"name": ""
}
```

**GET** /muscles | Exibe todos os músculos

**PATCH** /muscles/:id | Atualiza um músculo existente
```json
{
	"name": ""
}
```

DELETE /muscles/:id | Deleta um músculo existente

### Módulo equipments
**POST** /equipments | Criação de um novo equipamento
```json
{
	"name": ""
}
```

**GET** /equipments | Exibe todos os equipamentos

**PATCH** /equipments/:id | Atualiza um equipamento existente
```json
{
	"name": ""
}
```

**DELETE** /equipments/:id | Deleta um equipamento existente

---

## Como baixar o projeto

```jsx
#Clonar o repositório
$ git clone https://github.com/RochaG07/.............

#Instalar as dependências
$ yarn add

#Configurar a conexão com o banco de dados (.env)

#Inicializar o banco de dados
$ yarn prisma migrate

#Iniciar o servidor
$ yarn server
```