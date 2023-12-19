//const {sendGuiEvent} = require("./socket");
const {variables} = require("./variables")
const {sendGuiEvent} = require("./utils");


function requestFileInfo(imu) {
  sendGuiEvent("requestFileInfo", { port: imu.port });
}

function setImuList(newList) {
  variables.imuList = newList;
}
function handleSensorDiscovered(newIMU) {
  console.log(variables.imuList);
  variables.imuList.push(newIMU);
  requestMacAdress(newIMU);
  requestFileInfo(newIMU);
}

exports.handleSensorDiscovered = handleSensorDiscovered;
function handleGetSensorTagDone(parameter) {
  // parameter: {port, tag}
  const newList = variables.imuList.slice();

  let imu = newList.find((imu) => imu.port === parameter.port);
  imu.tag = parameter.tag;
  setImuList(newList);
}
exports.handleGetSensorTagDone = handleGetSensorTagDone;
function handleMacAdressDone(parameter) {
  // parameter: {port, adress}
  const newList = variables.imuList.slice();

  const imu = newList.find((imu) => imu.port === parameter.port);

  imu.macAdress = parameter.adress;

  setImuList(newList);
}
exports.handleMacAdressDone = handleMacAdressDone;
function handleUpdateFlashInfo(parameter) {
  // TODO
}
exports.handleUpdateFlashInfo = handleUpdateFlashInfo;
function handlegetSensorTagDone(parameter) {
  const newList = variables.imuList.slice();

  const imu = newList.find((imu) => imu.port === parameter.port);

  imu.tag = parameter.tag;

  setImuList(newList);
}
exports.handlegetSensorTagDone = handlegetSensorTagDone;
function handleExportFlashInfo(parameter) {
  // TODO
}
exports.handleExportFlashInfo = handleExportFlashInfo;
function handleExportFlashInfoDone(parameter) {
  // TODO
}
exports.handleExportFlashInfoDone = handleExportFlashInfoDone;
function handleExportFlashInfoDone(parameter) {
  variables.imuList.find((imu) => imu.port === parameter.port).fileList = parameter.fileList;
}
exports.handleExportFlashInfoDone = handleExportFlashInfoDone;
function requestMacAdress(imu) {
  sendGuiEvent("requestMacAdress", { port: imu.port });
}
function handleExportFileInfoDone(parameter) {
  let imu = variables.imuList.find((imu) => imu.port === parameter.port).fileList = parameter.fileList;
  imu.fileList = parameter.fileList;
}
exports.handleExportFileInfoDone = handleExportFileInfoDone;
