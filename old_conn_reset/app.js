import express from "express"
const app = express()

const server = app.listen(3000, "10.0.1.246", function () {
  // this ip shows in ifconfig for eth0 inet 10.0.1.246, anything other than this gives error man
  console.log(`server started on : ${server.address().address}:${server.address().port}`)
  // server.close(()=>{console.log("server is closed now")}) //Stops the server from accepting new connections and keeps existing connections.
})

// if you are getting error check if you are already running some application in 3000 port
// all the methods for server are coming from return of listen