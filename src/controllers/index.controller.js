const indexCtrl = {};


indexCtrl.renderIndex = (req, res) =>{
    res.render("index");
};

indexCtrl.renderLogon = (req, res) =>{
    res.render("logon");
};






module.exports = indexCtrl;