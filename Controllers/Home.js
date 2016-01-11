var Actions = {};
Actions.Index = function(req, res) {
	var login = "Unauthorized";
	if(req && req.user)
		login = req.user

	res.render('index', { 'isAuth': req.isAuthenticated(), 'login': login });
}

module.exports = Actions;