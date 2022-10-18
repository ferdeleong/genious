import pg from "database/postgres-database";
import { DataTypes } from "sequelize";
import Course from "./course";

const Artifact = pg.getConnection().define("Artifact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Artifact.belongsTo(Course);
Course.hasMany(Artifact);

export default Artifact;
