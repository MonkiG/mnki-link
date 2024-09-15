function getIndexHtml(urls) {
  const html = /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="/image.png" type="image/png">
        <link rel="stylesheet" href="/style.css">
        <title>Mnki Link</title>
    </head>
    <body>
        <div id="urls">
            <h1>Mnki Link</h1>
            <form>
                <input-element name="originalUrl" label="Url"></input-element>
                <input-element name="alias" label="Url alias"></input-element>
                <input-element name="authKey" label="Auth key" type="password"></input-element>
                <button type="submit">Create short url</button>
            </form>
        </div>
        <div>
            <h2>Url's already taken</h2>
            ${
              urls.lenght < 0
                ? /*html*/ `<h3>No urls yet</h3>`
                : /*html*/ `
                <ul>
                    ${urls.map((x) => /*html*/ `<li><a href="/${x.alias || x.hash}">${x.alias || x.hash}</a></li>`)}
                </ul>    
            `
            }
        </div>
        <script type="module" src="/js/index.js"></script>
    </body>
    </html>
    `

  return html
}

module.exports = getIndexHtml
