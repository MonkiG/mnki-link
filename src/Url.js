module.exports = class Url {
  id
  originalUrl
  alias
  createdAt
  updatedAt
  hash

  constructor(originalUrl, alias) {
    if (!this.#isValidUrl(originalUrl)) throw new Error('Invalid url format')

    this.id = crypto.randomUUID()
    this.originalUrl = originalUrl
    this.alias = alias || null
    this.hash = this.id.slice(0, 4) + this.id.slice(-4)
    this.createdAt = new Date().toISOString()
    this.updatedAt = null
  }

  #isValidUrl(data) {
    try {
      new URL(data)
      return true
    } catch {
      return false
    }
  }
}
