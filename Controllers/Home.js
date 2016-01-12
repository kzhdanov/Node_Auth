var Actions = {};
Actions.Index = function(req, res) {
	if(req.query.error) {
		return res.render('index', { 'isAuth': false, 'ErrorMsg' : 'Ошибка авторизации' });
	}

	var login = "Unauthorized";
	if(req && req.user)
		login = req.user

	res.render('index', { 'isAuth': req.isAuthenticated(), 'login': login });
},
Actions.LogOut = function(req, res) {
	req.logout();
	res.redirect('/');
}

module.exports = Actions;