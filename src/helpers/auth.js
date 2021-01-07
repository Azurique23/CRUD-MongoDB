const helpers = {};

helpers.isAuth = (req, res, next)=>{
    if(req.isAuthenticated()) {
        return next()
    }
    req.flash('errors', 'not authorized')
    res.redirect('/login')
}
module.exports = helpers;