require('dotenv').config();
const { ApolloService } = require('moleculer-apollo-server');
const { typeDefs, resolvers } = require('./src/graphql');

module.exports = {
  // Базовые настройки
  namespace: 'actors-characters',
  nodeID: `api-server-${process.pid}`,
  
  // Настройки логгирования
  logger: {
    type: 'Console',
    options: {
      colors: true,
      level: process.env.LOG_LEVEL || 'info',
      formatter: 'full'
    }
  },

  // Транспорт
  transporter: process.env.TRANSPORTER || 'TCP',

  // HTTP Gateway
  apiGateway: {
    port: process.env.PORT || 3000,
    ip: '0.0.0.0',
    cors: true
  },

  // GraphQL Apollo Server
  services: [
    ApolloService({
      typeDefs,
      resolvers,
      routeOptions: {
        path: '/graphql',
        cors: true,
        mappingPolicy: 'restrict'
      },
      serverOptions: {
        playground: process.env.NODE_ENV !== 'production',
        introspection: true,
        context: ({ meta }) => ({ 
          auth: meta.auth 
        })
      }
    }),
    require('./src/services/actor.service'),
    require('./src/services/character.service')
  ],

  // Настройки для разработки
  tracing: {
    enabled: process.env.NODE_ENV === 'development',
    exporter: {
      type: 'Console',
      options: {
        colors: true
      }
    }
  },

  // Метрики (включены только в production)
  metrics: {
    enabled: process.env.NODE_ENV === 'production',
    reporter: {
      type: 'Prometheus',
      options: {
        port: 3030,
        path: '/metrics'
      }
    }
  },

  // Хуки жизненного цикла
  started(broker) {
    broker.logger.info(`Server started at http://localhost:${process.env.PORT || 3000}`);
    broker.logger.info(`GraphQL Playground: http://localhost:${process.env.PORT || 3000}/graphql`);
  }
};