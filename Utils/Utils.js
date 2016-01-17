var Utils = function(config, req)
{
    var hour = config.cookieTime;
    req.session.cookie.expires = new Date(Date.now() + hour);
    req.session.cookie.maxAge = hour;
}

module.exports = Utils;