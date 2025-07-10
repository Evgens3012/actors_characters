const actorResolvers = require('./actor.resolver');
const characterResolvers = require('./character.resolver');

// Мерджим резолверы в один объект
module.exports = {
  ...actorResolvers,
  ...characterResolvers
};