const {app} = require("./index.js")

const { variables} = require("./variables")

const {requestFileData} = require("./utils.js")

/**
 * @swagger
 * components:
 *  schemas:
 *      File:
 *          type: object
 *          properties:
 *              index:
 *                  type: integer
 *                  description: Index of the file
 *              filename:
 *                  type: string
 *                  description: Name of the file
 *              size:
 *                  type: integer
 *                  description: Size of the file (in bytes)
 *
 *      IMU:
 *          type: object
 *          properties:
 *              port:
 *                  type: string
 *                  description: Port of the IMU
 *              tag:
 *                  type: string
 *                  description: Tag of the IMU
 *              address:
 *                  type: string
 *                  description: Mac address of the IMU
 *              fileList:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/File'
 *              selectedFileList:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/File'
 */


/**
 * @swagger
 * /getImuList:
 *  get:
 *     description: Get the list of IMUs
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IMU'
 */
app.get("/getImuList", function (request, response) {
  response.send(variables.imuList)
})

/**
 * @swagger
 * /getImuFileList/{index}:
 *   get:
 *     description: Get the list of files of an IMU
 *     parameters:
 *     - in: path
 *       name: index
 *       required: false
 *       schema:
 *         type: integer
 *         description: Index of the IMU. If none, the file list for the first IMU will be sent
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/File'
 *       404:
 *         description: IMU not found (out of bounds)
 */
app.get("/getImuFileList/:index", function (request, response) {
    console.log(request)
    if(request.params.index === undefined)
    {
        response.send(variables.imuList[0].fileList)
        return
    }
    if(request.params.index >= variables.imuList.length)
    {
        response.send([], 404)
        return
    }
  response.send(variables.imuList[request.params.index].fileList)
})

/**
 * @swagger
 * /getImuFileData/{index}:
 *   get:
 *     description: Extract the data of an IMU, returns the path of the CSV
 *     parameters:
 *       - in: path
 *         name: index
 *         required: false
 *         schema:
 *           type: integer
 *           description: Index of the IMU. If not, the data of the first IMU found will be extracted.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Path of the folder containing the file
 *       404:
 *         description: IMU not found (out of bounds)
 */
app.get("/getImuFileData/:index", function (request, response) {
    if(request.params.index === undefined)
    {
        response.send(variables.imuList[0].fileList)
        return
    }
    if(request.params.index >= variables.imuList.length)
    {
        response.send([], 404)
        return
    }
    response.send(requestFileData(variables.imuList[request.params.index]))
})
