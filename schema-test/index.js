// import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema } from 'graphql'
const Koa = require('koa');
const mount = require('koa-mount');
const { graphqlHTTP } = require('koa-graphql');
var { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema } = require('graphql');

const app = new Koa();

const getJob = (parent, params) => {
    return axios.get('http://api.path', params)
}

const job = new GraphQLObjectType({
    name: 'Job',
    fields: {
        staffId: {
            type: GraphQLInt,
            
        },
        name: {
            type: GraphQLString
        },
        salary: {
            type: GraphQLInt
        }
    }
})

const query = new GraphQLObjectType({
    name: 'rootQuery',
    description: 'rootQuery',
    fields: {
        xJob: {
            name: 'Job',
            type: job,
            args: {
                number: {  // 这里定义参数，包括参数类型和默认值
                    type: GraphQLInt,
                    defaultValue: 'Brian'
                }
            },
            resolve: getJob
        }
    }
}
)

// 完成 schema 创建
const schema = new GraphQLSchema({
    query
})


app.use(
    mount(
        '/graphql',
        graphqlHTTP({
            schema,
            graphiql: true,
        }),
    ),
);

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');