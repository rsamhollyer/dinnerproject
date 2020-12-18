"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class DinnerIdea extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			DinnerIdea.belongsTo(models.User, {
				foreignKey: "userID",
				onDelete: "CASCADE",
			});
		}
	}
	DinnerIdea.init(
		{
			name: DataTypes.STRING,
			rating: DataTypes.INTEGER,
			userID: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "DinnerIdea",
		}
	);
	return DinnerIdea;
};
