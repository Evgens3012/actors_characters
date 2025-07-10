const { Service } = require("moleculer");

module.exports = {
  name: "character",
  actions: {
    findByActor: {
      params: { actorId: "string" },
      async handler(ctx) {
        return this.db("characters").where("actor_id", ctx.params.actorId);
      }
    },
    create: {
      params: {
        name: "string",
        actor_id: "string",
        movie_name: "string",
        movie_year: { type: "number", optional: true }
      },
      async handler(ctx) {
        const [character] = await this.db("characters")
          .insert({
            name: ctx.params.name,
            actor_id: ctx.params.actor_id,
            movie_name: ctx.params.movie_name,
            movie_year: ctx.params.movie_year
          })
          .returning("*");
        return character;
      }
    }
  },
  created() {
    this.db = require("knex")(require("../../knexfile")[this.broker.options.env]);
  }
};