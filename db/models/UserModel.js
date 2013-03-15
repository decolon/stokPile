var Seq = require('sequelize');

//User Model
module.exports = {
	model:{
		id: Seq.INTEGER,
		username: Seq.STRING,
		password: Seq.STRING,
		email: Seq.STRING
	},
	options:{
		freezeTableName: true
	}
}
