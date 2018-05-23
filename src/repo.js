class Repository{
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      date NUMERIC,
      time NUMERIC,
      message TEXT,
      sentiment_score INTEGER
      )`
    return this.dao.run(sql)
  }

  emptyTable(){
    return this.dao.run(
      `DELETE FROM records`
    )
  }

  createRecord(name, date, time, message, sentimentScore) {
    return this.dao.run(
      'INSERT INTO records (name, date, time, message, sentiment_score) VALUES (?,?,?,?,?)',
      [name, date, time, message, sentimentScore])
  }

  getResult(){
    return this.dao.all(
      'SELECT name, count(message) as numOfMessages, sum(sentiment_score) as sentimentScore, AVG(LENGTH(message)) AS avgLength from records group by name'
      )
  }

  getAllRecords() {
    return this.dao.all('SELECT * FROM records')
  }	

}

module.exports = Repository  