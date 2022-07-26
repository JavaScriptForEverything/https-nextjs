const fs = require("fs")
const https = require("https")
const { parse } = require("url")
const next = require("next")

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev });
const handle = app.getRequestHandler()

const httpsOptions = {
  key: fs.readFileSync('./ssl/cert.key'),
  cert: fs.readFileSync('./ssl/cert.crt')
}

app.prepare().then(() => {

  const server = https.createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log("> Server started on https://localhost:3000")
  })

})
