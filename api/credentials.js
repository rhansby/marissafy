module.exports = { 
  fb : function() {
    return facebook;
  } 
};

var facebook = {
  client_id: '570451876325035',
  redirect_uri: 'http://localhost:8888/auth_facebook/',
  scope: 'email, user_about_me, publish_stream',
  client_secret: '34b48b698e10b5c227e8e568277fadfc'
}
