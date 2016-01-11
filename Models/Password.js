//Яркий пример внедрения зависимости
module.exports = function(pool) {
	var context = {
		SavePassword: function(key, callback) {
			pool.query('INSERT INTO Passwords SET ?', key, callback);
		},
		CheckPassword: function(key, callback) {
			pool.query('SELECT * FROM Passwords Where UserId=? and IsActive=true', key, callback);
		}
	};

	return context;
};