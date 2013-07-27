var conf = require('./credentials.js');
var graph = require('fbgraph');

module.exports = {
  login: function(req,res) {
    if (!req.query.code) {
      var authUrl = graph.getOauthUrl({
        "client_id": conf.fb().client_id,
        "redirect_uri": conf.fb().redirect_uri
      });
      if (!req.query.error) {
        res.redirect(authUrl);
      } else {
        res.send('access denied');
      }
      return;
    }
    graph.authorize({
      "client_id": conf.fb.client_id,
      "redirect_uri": conf.fb.redirect_uri,
      "client_secret": conf.fb.client_secret,
      "code": req.query.code
    }, function (err, facebookRes) {
      res.redirect('/?auth=true&auth_type=fb');
    });
  }
}

// Private functions


