const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the item
    const item = await ctx.db.query.item({ where }, `{ id title}`);

    //2. Check if they own that item, or have permission
    //TODO

    //3. Delete it
    return ctx.db.mutation.deleteItem({ where }, info);
  },

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    //hash the password
    const password = await bcrypt.hash(args.password, 10);
    //create the user in the db
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] }
        }
      },
      info
    );
    //create jwt token so they're signed in after
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    //we set the jwt as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 2 //2hrs
    });
    //return the user to the browser
    return user;
  }
};

module.exports = Mutations;
