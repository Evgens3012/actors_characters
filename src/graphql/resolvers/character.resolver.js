module.exports = {
  Query: {
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
    }
  },
  // Как получить актера для персонажа
  Character: {
    actor: async (parent, _, { broker }) => {
      return await broker.call("actor.get", { id: parent.actor_id });
    }
  }
};