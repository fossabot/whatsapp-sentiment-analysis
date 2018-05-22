'use strict';
const DBService = require('./dbService');
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

class ChatService {
    process(data){
    	var lines = data.split('\n');
    	var reg1 = /(.{10}), (.{5}) - (.*?): (.*)/;
    	var reg2 = /(.{10}), (.{5}) - (.*)/;
    	var tmp = [];
	    for(var l = 0; l < lines.length; l++){
	      	var line = lines[l];
	    	if(reg1.test(line)){
				/*
					Input: "03/12/2017, 13:14 - Sender: Message"
					Return:
						line[0]: 03/12/2017, 13:14 - Sender: Message
						line[1]: 03/12/2017
						line[2]: 13:14
						line[3]: Sender
						line[4]: Message
				*/
	    		line = line.match(reg1);
	    		tmp = line;
	    		var date = line[1], time = line[2],
		  	 	name = line[3], message = line[4];
		  	 	if(message == '<Media omitted>'){
		  	 		continue;
		  	 	}
		      	DBService.createRecord(name, date, time, message, sentiment.analyze(message).score)
	    	}else if(reg2.test(line)){
	    		/*
					Input: 02/12/2017, 19:18 - Messages to this chat and calls are now secured with end-to-end encryption. Tap for more info.
	    		*/
	    		continue;
	    	}else{
	    		/*
					Input: Lorem
	    		*/
	    		var prevLine = tmp;
	    		var name = prevLine[3];
	    		var date = prevLine[4];
	    		var time = prevLine[2];
	    		var message = line;
	    		DBService.createRecord(name, date, time, message, sentiment.analyze(message).score)
	    	}
	    }
    }
}

module.exports = new ChatService();