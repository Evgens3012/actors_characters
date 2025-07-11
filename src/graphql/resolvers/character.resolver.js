module.exports = {
  Query: {
    // Получить всех персонажей 
    characters: async (_, { limit = 10, offset = 0 }, { broker }) => {
      return await broker.call("character.list", { limit, offset });
    },
    
    // Получить персонажа по ID
    character: async (_, { id }, { broker }) => {
      return await broker.call("character.get", { id });
    },
    
    // Получить персонажей по ID актера
    charactersByActor: async (_, { actorId }, { broker }) => {
      return await broker.call("character.findByActor", { actorId });
    }
  },
  
  Mutation: {
    // Добавить нового персонажа
    addCharacter: async (_, { name, actorId, movie_name, movie_year }, { broker }) => {
      return await broker.call("character.create", { 
        name, 
        actor_id: actorId, 
        movie_name, 
        movie_year 
      });
    },
    
    // Обновить персонажа
    updateCharacter: async (_, { id, name, movie_name, movie_year }, { broker }) => {
      return await broker.call("character.update", {
        id,
        name,
        movie_name,
        movie_year
      });
    },
    
    // Удалить персонажа 
    removeCharacter: async (_, { id }, { broker }) => {
      return await broker.call("character.delete", { id });
    }
  },
  

  Character: {
    // Получить актера для персонажа
    actor: async (parent, _, { broker }) => {
      return await broker.call("actor.get", { id: parent.actor_id });
    }
  }
};