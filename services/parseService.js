'use strict';

class ParseService {
    constructor() {
       this.data = [];
       this.totalMessages = 0;
       this.totalWords = 0;
       this.averageLength = 0;
       this.overallScore = 0;
    }

    parse(data){
    	var lines = data.split('\n');
	    for(var l = 0; l < lines.length; l++){
	      var line = lines[l];
	      line = splitLine(line);
	      var lineLength = line.length;
	      if(lineLength==1){
	      	// Possible Line: 
	      	// Message
	      }else if(lineLength==3){
	      	// Possible Line: 
	      	// 02/12/2017, 19:18 - Messages to this chat and calls are now secured with end-to-end encryption. Tap for more info.
	      }else if(lineLength==4){
	      	// Possible Line: 
	      	// 03/12/2017, 11:47 - Sender: Message
	      	// 04/12/2017, 11:22 - Sender: <Media omitted>
	      	var date = line[1];
	      	var time = line[2];
	      	var name = line[3];
	      	var message = line[4];
	      }else{
	      	//unexpected
	      }
	    }
    }

    splitLine(line){
    	/*
    		Input: "03/12/2017, 13:14 - Sender: Message"
			Return:
				line[0]: 03/12/2017, 13:14 - Sender: Message
				line[1]: 03/12/2017
				line[2]: 13:14
				line[3]: Sender
				line[4]: Message
    	*/
    	var regex = /(.{10}), (.{5}) - (.*?): (.*)/;
    	return line.match(regex);
    }

}

module.exports = new ParseService();