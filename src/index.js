const path = require('node:path')
const express = require('express')
const morgan = require('morgan')
const urlServices = require('./url.services')
const Url = require('./Url')
const getIndexHtml = require('./getIndexHtml')

const app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.json())
app.use(morgan('dev'))

app.post('/api/short-url', async (req, res) => {
  const { originalUrl, alias, authKey } = req.body

  if (!originalUrl)
    return res.status(400).json({ message: 'You should provide the url' })
  if (!authKey)
    return res.status(400).json({ message: 'You should provide an auth key' })
  if (authKey !== process.env.SECRET_KEY)
    return res.status(401).json({ message: 'Wrong secret auth key' })

  const urls = urlServices.getUrls()

  const isAlreadyTaken = alias && urls.some((x) => x.alias === alias)

  if (isAlreadyTaken) {
    return res
      .status(409)
      .json({ message: 'Alias already taken try with another one' })
  }

  const urlModel = new Url(originalUrl, alias)
  const urlSaved = await urlServices.createUrl(urlModel)

  return res.status(201).json(urlSaved)
})

app.get('/:url', async (req, res) => {
  const { url } = req.params

  const urlModel = urlServices.getUnique(
    (x) => x.alias === url || x.hash === url
  )

  if (!urlModel) return res.redirect('/page/not-found')

  return res.redirect(urlModel.originalUrl)
})

app.get('/page/not-found', (_, res) => {
  return res.sendFile(path.join(__dirname, '../public', 'views/404.html'))
})
app.get('/', (_, res) => {
  const urls = urlServices.getUrls()

  return res.send(getIndexHtml(urls))
})

app.listen(3000, () => {
  console.log('Listening in port 3000')
})
