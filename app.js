const express = require('express')
const bodyparser = require('body-parser')
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose')
const graphQlSchema = require('./graph/schema/index.js')
const graphQlResolvers = require('./graph/resolvers/index.js')
const isAuth = require('./middle/is-ath.js')
const app = express();


app.use(bodyparser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth)

app.use('/graphql', graphqlHTTP({
  schema:graphQlSchema,
  rootValue:graphQlResolvers,
  graphiql: true
})
);
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD
  }@cluster0.hvr2grp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    app.listen(8000)
  })
  .catch(err => {
    console.log(err)
  })

