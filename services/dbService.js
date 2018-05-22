'use strict';

const AppDAO = require('../src/dao')  
const Repository = require('../src/repo')  

class DBService {
	constructor() {
		const dao = new AppDAO('db.sqlite3')
		this.repo = new Repository(dao)
	}

	initDB(){
		return this.repo.createTable();
	}

	createRecord(name, date, time, message, sentimentScore){
		return this.repo.createRecord(name, date, time, message, sentimentScore)
	}

	getResult(){
		return this.repo.getResult();
	}

	getAllRecords(){
		return this.repo.getAllRecords();
	}
}

module.exports = new DBService();