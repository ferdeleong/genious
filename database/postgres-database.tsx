import { Sequelize } from "sequelize";
import pg from "pg";

class PostgresDatabase {
  private static instance: PostgresDatabase;
  private connection: Sequelize;

  constructor() {
    this.connection = new Sequelize(
      process.env.POSTGRES_DATABASE!,
      process.env.POSTGRES_USER!,
      process.env.POSTGRES_PASSWORD!,
      {
        host: process.env.POSTGRES_HOST!,
        dialect: "postgres",
        dialectModule: pg
      }
    );
    this.connection
      .authenticate()
      .then(() => {
        this.connection.sync();
        console.info("💿  Connected to database.");
      })
      .catch(() => {
        console.error("❌  Couldn't connect to database.");
      });
  }

  static getInstance() {
    if (!PostgresDatabase.instance) {
      PostgresDatabase.instance = new PostgresDatabase();
    }
    return PostgresDatabase.instance;
  }

  getConnection() {
    return this.connection;
  }

  close() {
    this.connection.close();
  }
}

export default PostgresDatabase.getInstance();
