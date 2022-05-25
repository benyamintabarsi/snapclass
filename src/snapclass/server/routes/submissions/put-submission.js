const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const submissionModel = require('../../model/Submission');
const auth = require('../authorization');
const roleModel = require('../../model/Role');

/**
* Parsers for POST data
*/
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json({limit: "50mb"}));
router.use(bodyParser.urlencoded({limit: "50mb", extended: false}));

/**
 * Update submission by submission ID
 */
router.put('/:submissionID', auth.requiredRole([roleModel.enum.STUDENT, roleModel.enum.TEACHER]), function(req, res) {
    submissionModel.updateSubmission(req.params.submissionID, req.body, function(value) {
      res.status(value.code).json(value.data);
    })
 })

 module.exports = router;