import Dexie from 'dexie'

const DB_VERSION = '2.0'
const DB_ENABLE = true
const TABLE_NAME = 'webim_history'
const TABLE_INDEX_KEYS = ['id', 'from', 'to', 'type', 'data']
const PAGE_NUM = 20

const ImHistory = {
  init: function (username) {
    if (!DB_ENABLE || this.db) {
      return
    }
    const db = new Dexie(username)
    // create a table, use TABLE_NAME as table name
    db.version(DB_VERSION).stores({
      [TABLE_NAME]: TABLE_INDEX_KEYS.join(',')
    })
    this.db = db
    this.$_TABLE = db.table(TABLE_NAME)
    this.PAGE_NUM = PAGE_NUM
  },
  exec (cb1, cb2) {
    return new Promise(function (resolve, reject) {
      if (DB_ENABLE) {
        cb1(resolve)
      } else {
        cb2 && cb2(reject)
      }
    })
  },
  // add a message to the database
  addMessage (message) {
    const $_TABLE = this.$_TABLE
    if (!message.error) {
      return this.exec(resolve => {
        $_TABLE.where('id').equals(message.id).count().then(res => {
          if (res === 0) {
            $_TABLE.add(message)
              .then(res => resolve(res))
              .catch(e => console.log('add message:', e))
          }
        })
      })
    }
  },
  fetchMessage (chatType = 'chat', offset = 0, limit = PAGE_NUM) {
    const $_TABLE = this.$_TABLE
    return this.exec(resolve => {
      $_TABLE.where('type')
        .equals(chatType)
        .reverse()
        .offset(offset)
        .limit(limit)
        .sortBy('time')
        .then(res => {
          resolve(res.reverse())
        })
    })
  }
}
export default ImHistory
