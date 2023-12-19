const { handleSensorDiscovered, handleGetSensorTagDone, handleMacAdressDone, handleUpdateFlashInfo, handlegetSensorTagDone, handleExportFlashInfo, handleExportFlashInfoDone, handleExportFileInfoDone } = require("./handlers.js");
const socketIO = require("socket.io-client");
const socket = socketIO.connect('ws://localhost:8181')
const {variables} = require("./variables");




// ---------------------------------------------------------------------------------------
// -- Handle EVENT_GUI --
// ---------------------------------------------------------------------------------------
socket.on(variables.EVENT_GUI, function (eventName, parameters) {
  console.log(eventName, parameters);

  if (eventName === "sensorDiscovered") {
    handleSensorDiscovered(parameters);
  }

  if (eventName === "getSensorTagDone") {
    handleGetSensorTagDone(parameters);
  }

  if (eventName === "getMacAdressDone") {
    handleMacAdressDone(parameters);
  }

  if (eventName === "updateFlashInfo") {
    handleUpdateFlashInfo(parameters);
  }

  if (eventName === "getSensorTagDone") {
    handlegetSensorTagDone(parameters);
  }

  if (eventName === "exportFlashInfo") {
    handleExportFlashInfo(parameters);
  }

  if (eventName === "exportFlashInfoDone") {
    handleExportFlashInfoDone(parameters);
  }

  if (eventName === "exportFlashInfoDone") {
    handleExportFlashInfoDone(parameters);
  }

  if (eventName === "exportFileInfoDone") {
    handleExportFileInfoDone(parameters);
  }

  if (eventName === "exportedDir") {
    exportedDir = parameters.exportedDir;
  }
});



exports.socket = socket;

