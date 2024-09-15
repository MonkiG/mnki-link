const fs = require('node:fs/promises')
const path = require('node:path')

let db
;(async () => {
  const rawData = await fs.readFile(path.join(__dirname, '..', 'db.json'))
  db = JSON.parse(rawData)
})()

function getUrls() {
  return db
}

async function createUrl(url) {
  db.push(url)
  await fs.writeFile(
    path.join(__dirname, '..', 'db.json'),
    JSON.stringify(db, null, 2)
  )
  return url
}

function getUnique(callback) {
  const url = db.find(callback)
  return url
}

module.exports = {
  getUrls,
  createUrl,
  getUnique,
}
