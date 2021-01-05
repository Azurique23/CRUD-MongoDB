const  {Router} = require('express');

const { renderIndex, renderLogon} = require("../controllers/index.controller")

const router = Router();


router.get('/', renderIndex);


router.get('/logon',renderLogon);


module.exports = router;