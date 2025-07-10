module.exports = {
  Query: {
    actors: async (_, { limit = 10 }, { broker }) => {
      return await broker.call("actor.list", { limit });
    },
    actor: async (_, { id }, { broker }) => {
      return await broker.call("actor.get", { id });
    },
    charactersByActor: async (_, { actorId }, { broker }) => {
      return await broker.call("character.findByActor", { actorId });
    }
  },
  Mutation: {
    createActor: async (_, { name, birth_year }, { broker }) => {
      return await broker.call("actor.create", { name, birth_year });
    },
    addCharacter: async (_, { name, actorId, movie_name, movie_year }, { broker }) => {
      return await broker.call("character.create", { 
        name, 
        actor_id: actorId, 
        movie_name, 
        movie_year 
      });
    }
  },
  Actor: {
    characters: async (parent, _, { broker }) => {
      return await broker.call("character.findByActor", { actorId: parent.id });
    }
  },
  Character: {
    actor: async (parent, _, { broker }) => {
      return await broker.call("actor.get", { id: parent.actor_id });
    }
  }
};