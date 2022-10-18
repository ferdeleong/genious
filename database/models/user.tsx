import pg from "database/postgres-database";
import { DataTypes } from "sequelize";

const User = pg.getConnection().define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

export default User;
