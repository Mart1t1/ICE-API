const express = require("express")
const socketIO = require("socket.io-client")

const swaggerJSdoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")
const { handleSensorDiscovered, handleGetSensorTagDone, handleMacAdressDone, handleUpdateFlashInfo, handlegetSensorTagDone, handleExportFlashInfo, handleExportFlashInfoDone, handleExportFileInfoDone } = require("./handlers")

const socket = socketIO.connect('ws://localhost:8181')
var app = express()
exports.app = app

EVENT_GUI = 'guiEvent'

var imuList = []
exports.imuList = imuList

var exportedDir = "";

// ---------------------------------------------------------------------------------------
// -- request file data functions --
// ---------------------------------------------------------------------------------------

function requestFileData(imu)
{
  // call to download file

  const selectedFiles = [...imu.fileList]
  let newImu = {...imu, selectedFileList: selectedFiles}
  sendGuiEvent("requestFileData", {exportingSensors: [newImu]})

  return exportedDir;
}
exports.requestFileData = requestFileData

// ---------------------------------------------------------------------------------------
// -- Handle EVENT_GUI --
// ---------------------------------------------------------------------------------------
socket.on(EVENT_GUI, function (eventName, parameters) {
  console.log(eventName, parameters)

  if (eventName === "sensorDiscovered") {
    handleSensorDiscovered(parameters)
  }

  if (eventName === "getSensorTagDone") {
    handleGetSensorTagDone(parameters)
  }

  if (eventName === "getMacAdressDone") {
    handleMacAdressDone(parameters)
  }

  if (eventName === "updateFlashInfo") {
    handleUpdateFlashInfo(parameters)
  }

  if (eventName === "getSensorTagDone") {
    handlegetSensorTagDone(parameters)
  }
  
  if (eventName === "exportFlashInfo") {
    handleExportFlashInfo(parameters)
  }

  if (eventName === "exportFlashInfoDone") {
    handleExportFlashInfoDone(parameters)
  }

  if (eventName === "exportFlashInfoDone") {
    handleExportFlashInfoDone(parameters)
  }

  if (eventName === "exportFileInfoDone"){
    handleExportFileInfoDone(parameters)
  }

  if (enventName === "exportedDir")
  {
    exportedDir = parameters.exportedDir
  }
});

// ---------------------------------------------------------------------------------------
// -- Emit EVENT_GUI with event name and parameters --
// ---------------------------------------------------------------------------------------
function sendGuiEvent(eventName, parameters) {
  console.log("New GUI Event sent\n====eventName:")
  console.log(eventName)
  console.log("Parameters:")
  console.log(parameters);
  socket.emit(EVENT_GUI, eventName, parameters);
  console.log(socket)
}
exports.sendGuiEvent = sendGuiEvent

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