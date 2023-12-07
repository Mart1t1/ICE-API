const { imuList, sendGuiEvent } = require(".");

function setImuList(newList) {
  imuList = newList;
}
function handleSensorDiscovered(newIMU) {
  console.log(imuList);
  const newList = imuList.concat(newIMU);
  requestMacAdress(newIMU);
  setImuList(newList);
  //selectedSkater(newIMUs.map((newIMU) => { return {id: newIMU.port, name: newIMU.tag, lastSessionTime: "TBD"}}));
}
exports.handleSensorDiscovered = handleSensorDiscovered;
function handleGetSensorTagDone(parameter) {
  // parameter: {port, tag}
  const newList = imuList.slice();

  let imu = newList.find((imu) => imu.port === parameter.port);
  imu.tag = parameter.tag;
  setImuList(newList);
}
exports.handleGetSensorTagDone = handleGetSensorTagDone;
function handleMacAdressDone(parameter) {
  // parameter: {port, adress}
  const newList = imuList.slice();

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
  const newList = imuList.slice();

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
  imuList.find((imu) => imu.port === parameter.port).fileList = parameter.fileList;
}
exports.handleExportFlashInfoDone = handleExportFlashInfoDone;
function requestMacAdress(imu) {
  sendGuiEvent("requestMacAdress", { port: imu.port });
}
function handleExportFileInfoDone(parameter) {
  let imu = imuList.find((imu) => imu.port === parameter.port).fileList = parameter.fileList;
  imu.fileList = parameter.fileList;
}
exports.handleExportFileInfoDone = handleExportFileInfoDone;
