require('@babel/polyfill')

const config = require('./config')
const http = require('http')
const appRun = require('./app').default;
appRun().then(({app})=>{
  const server = http.createServer(app)
  server.listen(config.port, ()=>{
      console.log(`Metaseoul Server is running on ${config.port}`)
  })
})