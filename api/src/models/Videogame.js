const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	image: {
		type: DataTypes.STRING,
		allowNull: false,
	},
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
	description: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	released: {
		type: DataTypes.STRING,
	},
	rating: {
		type: DataTypes.FLOAT,
	},
	platforms: {
		type: DataTypes.ARRAY(DataTypes.STRING),
		// type: DataTypes.STRING,
		allowNull: false,
	},
	createdInDb: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	}
  });
};
