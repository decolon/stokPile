//Need filesystem to access the model files
var filesystem = require('fs');

//Global Variables
var models = {};
var relationships = {};

//The object holding all the models
var singleton = function singleton(){
	var Sequelize = require("sequelize");
	var sequelize = null;

	//Sets up the object
	this.setup = function(relativePath, rootPath, database, username, callback, password, obj){
		modelsRelativePath = relativePath;
		modelsRootPath = rootPath;	

		if(arguments.length == 5){
			sequelize = new Sequelize(database, username);
		}
		else if(arguments.length == 6){
			sequelize = new Sequelize(database, username, password);
		}
		else if(arguments.length == 7){
			sequelize = new Sequelize(database, username, password, obj);
		}
		init(modelsRelativePath, modelsRootPath);
		callback();
	}

	//Get the model by name
	this.model = function(name){
		return models[name];
	}

	this.test = function(){
		return "works";
	}

	//returns the stuff from require(sequelize)
	this.Seq = function(){
		return Sequelize;
	}

	//This function is the one that looks in the model files
	//and puts them all into the sigleton
	function init(relativePath, rootPath){
		//Class
		filesystem.readdirSync(rootPath).forEach(function(name){
			var object = require(relativePath + "/" + name);
			var options = object.options || {}
			var modelName = name.replace(/\.js$/i, "");
			models[modelName] = sequelize.define(modelName, object.model, options);
			relationships[modelName] = object.relations;
		});
		//relations
//		console.log(models)
		for(var name in relationships){
			var relation = relationships[name];
			for(var relName in relation){
				var related = relation[relName];
//				console.log(related)
				models[name][relName](models[related]);
			}
		}
		sequelize.sync();
	}
	//NOT SURE WHEN THIS WOULD COME UP
	if(singleton.caller != singleton.getInstance){
		throw new Error("This object cannot be instanciated");
	}
}

singleton.instance = null;

//NOT REALLY SURE WHEN THIS SHOULD BE USED
//because i dont see where get instance is ever called besides above
singleton.getInstance = function(){
	if(this.instance === null){
		this.instance = new singleton();
	}
	return this.instance;
}

//Same here WHY ARE WE EXPORTING THIS
module.exports = singleton.getInstance();

