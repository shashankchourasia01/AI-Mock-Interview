/** @type { import("drizzle-kit").Config } */

export default{
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_LXMTx05kneKW@ep-dry-meadow-aedvr8hh-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
  }
};
