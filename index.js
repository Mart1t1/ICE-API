const express = require("express")

const swaggerJSdoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")
const { socket } = require("./socket")
const { variables } = require("./variables")
const { sendGuiEvent, requestFileData } = require("./utils")

var app = express()



app.get("/",function(request,response){
response.send("Hello World!")
})
app.listen(10000, function () {
console.log("Started application on port %d", 10000)
});



// ---------------------------------------------------------------------------------------
// -- Swagger config --
// ---------------------------------------------------------------------------------------

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "IMU Exporter API",
      version: "0.1.0",
      description: "API for the IMU Exporter",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "S2M",
        url: "s2mlab.org",
        email: "martin.lacaille@epita.fr"
      },
    },
    servers: [
      {
        url: "http://localhost:10000",
      },
    ],
  },
  apis: ["./routes.js"],
}



const swaggerDocs = swaggerJSdoc(swaggerOptions)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))

module.exports = {app}

socket.on("connect", function () {
  console.log("Connected to the driver")
  sendGuiEvent("startScanning", {})
}
)
require("./routes.js")