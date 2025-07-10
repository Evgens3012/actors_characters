const { Service } = require("moleculer");

module.exports = {
  name: "actor",
  actions: {
    list: {
      params: { limit: { type: "number", optional: true } },
      async handler(ctx) {
        return this.db("actors").limit(ctx.params.limit || 10);
      }
    },
    get: {
      params: { id: { type: "string" } },
      async handler(ctx) {
        const [actor] = await this.db("actors").where("id", ctx.params.id);
        return actor || null;
      }
    },
    create: {
      params: {
        name: "string",
        birth_year: { type: "number", optional: true }
      },
      async handler(ctx) {
        const [actor] = await this.db("actors")
          .insert({
            name: ctx.params.name,
            birth_year: ctx.params.birth_year
          })
          .returning("*");
        return actor;
      }
    }
  },
  created() {
    this.db = require("knex")(require("../../knexfile")[this.broker.options.env]);
  }
};