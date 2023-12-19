const {variables} = require('./variables.js');
const socket = require("./socket.js");

// ---------------------------------------------------------------------------------------
// -- Emit EVENT_GUI with event name and parameters --
// ---------------------------------------------------------------------------------------
function sendGuiEvent(eventName, parameters) {
  console.log("New GUI Event sent\n====eventName:");
  console.log(eventName);
  console.log("Parameters:");
  console.log(parameters);
  socket.socket.emit(variables.EVENT_GUI, eventName, parameters);
  console.log(socket);
}
exports.sendGuiEvent = sendGuiEvent;


// ---------------------------------------------------------------------------------------
// -- request file data functions --
// ---------------------------------------------------------------------------------------

function requestFileData(imu)
{
  // call to download file

  const selectedFiles = [...imu.fileList]
  let newImu = {...imu, selectedFileList: selectedFiles}
  sendGuiEvent("requestFileData", {exportingSensors: [newImu]})
  

  return variables.exportedDir;
}

exports.requestFileData = requestFileData