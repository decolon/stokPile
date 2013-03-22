//Need filesystem to access the model files
//--------------------------------------------------------------------------------
var filesystem = require('fs');

//Global Variables
//use these both in setup and in serving the loaded models
//-------------------------------------------------------------------------------
var models = {};
var relationships = {};

//The object holding all the models
//------------------------------------------------------------------------------
var singleton = function singleton(){
	var Sequelize = require("sequelize");
	var sequelize = null;

	//setup
	//----------------------
	//This function sets up the sequalize object.  Depending on how many parameters
	//are given, it calls different sequalize constructors. Then this function
	//calls init to do most of the heavy lifting for setup.  Finally it calls the 
	//callback function. 
	//
	//The callback function is only used in ./app.js to load some modules which need
	//the database to have finished setting up
	//------------------------------------------------------------------------------
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

	//model
	//--------------
	//This function is used to get a specific model (aka table) from the database
	//
	//example
	//--------
	//var User = orm.model('UserModel');
	//
	//-----------------------------------------------------------------------------
	this.model = function(name){
		return models[name];
	}

	//test
	//--------------
	//This is purely to make sure I have a valid handle to the orm
	//----------------------------------------------------------------------------
	this.test = function(){
		return "works";
	}

	//init
	//----------------
	//This function is responsible for loading all the model files found in
	//the 'models' directory into the database.  First it uses filesystem
	//to get all the files, and for each file it formats it a bit before 
	//calling sequalize.define to create the new table.  After the table
	//is created, it loads the new table object into the models object
	//and loads any relationships into the relationships object
	//
	//The second half initializes all the relationships between object
	//
	//the commented out code is used for debugging
	//
	//TODO understand the second half more, I have not used relationships yet but need to
	//---------------------------------------------------------------------------
	function init(relativePath, rootPath){
		filesystem.readdirSync(rootPath).forEach(function(name){
			var object = require(relativePath + "/" + name);
			var options = object.options || {}
			var modelName = name.replace(/\.js$/i, "");
			models[modelName] = sequelize.define(modelName, object.model, options);
			relationships[modelName] = object.relations;
		});
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
	//TODO figure what this is all about
	if(singleton.caller != singleton.getInstance){
		throw new Error("This object cannot be instanciated");
	}
}

singleton.instance = null;

//NOT REALLY SURE WHEN THIS SHOULD BE USED
//because I don't see where get instance is ever called besides above
//TODO figure this out too
singleton.getInstance = function(){
	if(this.instance === null){
		this.instance = new singleton();
	}
	return this.instance;
}

//Same here WHY ARE WE EXPORTING THIS
//TODO and this too
module.exports = singleton.getInstance();

