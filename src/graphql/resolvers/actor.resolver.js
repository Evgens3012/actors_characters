module.exports = {
  Query: {
    // Получить список актеров
    actors: async (_, { limit = 10 }, { broker }) => {
      return await broker.call("actor.list", { limit });
    },
    // Получить одного актера по ID
    actor: async (_, { id }, { broker }) => {
      return await broker.call("actor.get", { id });
    }
  },
  Mutation: {
    // Создать нового актера
    createActor: async (_, { name, birth_year }, { broker }) => {
      return await broker.call("actor.create", { name, birth_year });
    },
    // Обновить данные актера 
    updateActor: async (_, { id, name, birth_year }, { broker }) => {
      return await broker.call("actor.update", { id, name, birth_year });
    },
    // Удалить актера 
    deleteActor: async (_, { id }, { broker }) => {
      return await broker.call("actor.remove", { id });
    }
  },
  // Получить персонажей для каждого актера
  Actor: {
    characters: async (parent, _, { broker }) => {
      return await broker.call("character.findByActor", { 
        actorId: parent.id 
      });
    }
  }
};