'use strict';

class ParseService {
    constructor() {
       this.data = [];
       this.totalMessages = 0;
       this.totalWords = 0;
       this.averageLength = 0;
       this.overallScore = 0;
    }
}

module.exports = new ParseService();