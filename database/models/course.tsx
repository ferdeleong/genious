import pg from "database/postgres-database";
import { DataTypes } from "sequelize";
import User from "./user";

const Course = pg.getConnection().define("Course", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING
  }
});

Course.belongsTo(User);
User.hasMany(Course);

export default Course;
