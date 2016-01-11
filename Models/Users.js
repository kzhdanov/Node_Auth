//Яркий пример внедрения зависимости
module.exports = function(pool) {
	var context = {
		SelectOne: function(key, callback) {
			pool.query('Select * FROM Users where Login=?', key, callback);
		},
		SelectOneById: function(key, callback) {
			pool.query('Select * FROM Users where Id=?', key, callback);
		},
		SelectAll: function(callback) {
			pool.query('Select * FROM Users', callback);
		}
	};

	return context;
};