const Mutations = {
  async createItem(parent, args, ctx, info) {
    //TODO: Check if they're logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );
    return item;
  },

  updateItem(parent, args, ctx, info) {
    //first take a copy of the update
    const updates = { ...args };
    //remove id from data
    delete updates.id;
    //run updates method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  }
};

module.exports = Mutations;
