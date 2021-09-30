const router = require("express").Router();
const userController = require("../controller/userController");


//Routes
router.get('/',userController.view);
router.post('/',userController.find);
router.get('/adduser',userController.from);
router.post('/adduser',userController.create);
router.get('/edituser/:id',userController.edit);
router.post('/edituser/:id',userController.update);
router.get('/viewuser/:id',userController.viewall);
router.get('/:id',userController.delete);

module.exports = router;