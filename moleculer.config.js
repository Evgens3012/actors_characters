require('dotenv').config();
const { ApolloService } = require('moleculer-apollo-server');

module.exports = {
  // Настройки пространства имен (для изоляции сервисов)
  namespace: 'actors-characters',
  
  // Уникальный ID ноды
  nodeID: `api-server-${process.pid}`,
  
  // Логгирование
  logger: {
    type: 'Console',
    options: {
      colors: true,
      level: 'info',
      formatter: 'full'
    }
  },
  
  // Транспорт для межсервисного взаимодействия
  transporter: 'TCP',
  
  // API Gateway (если нужно REST API)
  apiGateway: {
    port: 3000,
    ip: '0.0.0.0',
    routes: [
      {
        path: '/api',
        aliases: {
          // Можно добавить REST-эндпоинты
        }
      }
    ]
  },
  
  // Настройки GraphQL Apollo Server
  services: [
    ApolloService({
      typeDefs: require('./src/graphql').typeDefs,
      resolvers: require('./src/graphql').resolvers,
      routeOptions: {
        path: '/graphql',
        cors: true,
        mappingPolicy: 'restrict'
      },
      serverOptions: {
        playground: process.env.NODE_ENV !== 'production',
        introspection: true,
        uploads: false, // Отключаем загрузку файлов (если не используется)
        context: (ctx) => ({
          broker: ctx.broker,
          auth: ctx.meta.auth
        })
      }
    }),
    require('./src/services/actor.service'),
    require('./src/services/character.service')
  ],
  
  // Настройки трейсинга (для отладки)
  tracing: {
    enabled: true,
    exporter: {
      type: 'Console',
      options: {
        colors: true,
        width: 100
      }
    }
  },
  
  // Настройки метрик
  metrics: {
    enabled: true,
    reporter: {
      type: 'Prometheus',
      options: {
        port: 3030,
        path: '/metrics'
      }
    }
  },
  
  // Обработчик ошибок
  errorHandler: 'Console',
  
  // Хуки жизненного цикла
  created(broker) {
    broker.logger.info('Broker created');
  },
  
  started(broker) {
    broker.logger.info('Services started');
    broker.logger.info(`GraphQL endpoint: http://localhost:3000/graphql`);
  },
  
  stopped(broker) {
    broker.logger.info('Broker stopped');
  }
};