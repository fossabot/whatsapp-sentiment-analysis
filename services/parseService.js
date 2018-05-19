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
		/*
			Possible Lines:
			02/12/2017, 19:18 - Messages to this chat and calls are now secured with end-to-end encryption. Tap for more info.
			03/12/2017, 11:47 - Sender: Message
			04/12/2017, 11:22 - Sender: <Media omitted>
		*/
	    for(var l = 0; l < lines.length; l++){
	      var line = lines[l];
	      line = splitLine(line);

	    }
    }

    splitLine(line){
    	/*
    		Input: "03/12/2017, 13:14 - Sender: Message"
			Return:
				line[0]: 03/12/2017
				line[1]: 13:14
				line[2]: Sender
				line[3]: Message
    	*/
    	var separators = ['\\\,', ' - ', ': '];
    	return line.split(new RegExp(separators.join('|'),'g'));
    }

}

module.exports = new ParseService();