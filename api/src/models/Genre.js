const { DataTypes } = require('sequelize');
// Exportamos una función que define el modelo.
// Luego le injectamos la conexión a sequelize.
module.exports = (sequelize) => {
	// definir el modelo
	sequelize.define('genre', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};