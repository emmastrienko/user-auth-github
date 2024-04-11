const axios = require('axios');
const config = require("../config");

function getGithubAccessToken(code, done) {
  const body = {
    client_id: config.CLIENT_ID,
    client_secret: config.CLIENT_SECRET,
    code
  };

  const opts = {headers: {accept: "application/json"}};

  axios.post('https://github.com/login/oauth/access_token', body, opts).then(res => res.data.access_token)
  .then((token) => {
    done(null, token)
  })
  .catch((err) => {
    done({error: err.message})
  })
}


function getAccessTokenOfUser(token, done) {
  axios.get('https://api.github.com/user', {
    headers: {
      'Authorization': 'token ' + token,
      'User-Agent': 'App Name'
    }
  })
  .then((response) => {
    done(null, response.data);
  })
  .catch((err) => {
    done({error: err.message});
  });
}


module.exports = {
  getGithubAccessToken,
  getAccessTokenOfUser
}



