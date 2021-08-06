//Requerimos las librerias y paquetes guardandolas en variables
const express = require('express'); // Modulo express
const server = express();
const {graphqlHTTP} = require('express-graphql'); //Modulo para graphql en servidor express
const {buildSchema} = require('graphql'); // Metodo para construir el schema de Graphql


//EMpezamos construyendo un pequeño esquema de ejemplo con unicamente los Clientes/Customers
const schema = buildSchema(`
    type Customer {
        id: Int
        name: String
        phone: String
    }
    type Query {
        customers: [Customer]
        customer(id: Int): Customer
    }
    type Mutation {
        addCustomer(name: String, phone: String): Customer
    }
`);

//Generamos un array para que los datos sean almacenados y el contador que funciona como el ID nuevo
const customers = [];
const count = 1;
//La funcion root que nos permite realizar toda la logica de insercion de datos y consulta
const root = {
    customers: () => {return customers;},
    customer: data => {
        for (let i = 0; i < customers.length; i++){
            if(customers[i].id === data.id) return customers[i];

            return null;
        }
    },
    addCustomer: data => {
        const cus = {
            'id': count,
            'name': DataTransfer.name,
            'phone': data.phone
        };
        customers.push(cus);
        count++;
        return cus;
    },
};

//Agregamos la ruta para acceder a GraphQL e inicamos el Servidor
server.get('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphql: true,
}));
server.listen(3000, () => {
    console.log('La direccion del APIGraphQL es: http://localhost:3000/graphql');
})