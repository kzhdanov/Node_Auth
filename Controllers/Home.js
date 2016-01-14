var Actions = {};
Actions.Index = function(req, res) {
	if(req.query.error) {
	return res.render('index', { tasks:  "Тело документа" }, function (err, html) {
				 		if(err) throw err;
				 		res.render('layout', { body: html, 'isAuth': false, 'ErrorMsg' : 'Ошибка авторизации'});
				 	}
				);
	}

	var login = "Unauthorized";
	if(req && req.user)
		login = req.user

	res.render('index', { tasks:  "Тело документа" }, function (err, html) {
				 		if(err) throw err;
				 		res.render('layout', { body: html, 'isAuth': req.isAuthenticated(), 'login': login });
				 	}
				);
},
Actions.LogOut = function(req, res) {
	req.logout();
	res.redirect('/');
}

module.exports = Actions;