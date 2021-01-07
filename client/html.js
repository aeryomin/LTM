const Html = ({ body }) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" type="text/css" href="/css/main.css" />
      <link rel="manifest" href="manifest.json">
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
      <div id="root">${body}</div>
      <script type="text/javascript" src="/js/main.bundle.js?v=COMMITHASH"></script>
      <script type="text/javascript" src="/js/install-sw.js?v=COMMITHASH3"></script>
    </body>
  </html>
`
}

export default Html
