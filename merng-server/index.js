const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGODB } = require('./config.js');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const PORT = process.env.port || 5000;

(async () => {
    try {
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            context: ({ req }) => ({ req })
        });
        
        mongoose
            .connect(MONGODB, { useNewUrlParser: true })
            .then(() => {
                console.log('MongoDB Connected');
                return server.listen({port: PORT});
            })
            .then(res => {
                console.log(`Server running at ${res.url}`)
            });
    } catch(err) {
        console.log(err);
    }
})();