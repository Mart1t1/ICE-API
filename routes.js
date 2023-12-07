const { app, imuList, requestFileData } = require(".");


/**
 * @swagger
 * /getImuList:
 *  get:
 *     description: Get the list of IMUs
 */
app.get("/getImuList", function (request, response) {
  response.send(imuList)
})
app.get("/getImuFileList", function (request, response) {
  response.send(imuList[request.params.index].fileList)
})
app.get("/getImuFileData", function (request, response) {
  response.send(requestFileData(imuList[request.params.index]))
})
