const router = require('express').Router();
const tokenCtrl = require('../controllers/token');
const keys = require('../config/keys');
const generateEmbTkn = require('../config/generateEmbTkn');

const authCheck = (req, res, next) => {
  if(!req.user){
    res.redirect('/auth/login');
  }else{
    next();
  }
};

async function embedConfig(){

  var embedInfo = await generateEmbTkn.generateEmbedToken();

  console.log(embedInfo + 'Milo');

  var embedToken = embedInfo.token;
  var tokenId = embedInfo.tokenId;
  var reportId = keys.pib.reportId;
  var groupId = keys.pib.workspaceId;
  var url = 'https://app.powerbi.com/reportEmbed?reportId=' + reportId + '&groupId=' + groupId;

  router.get('/', authCheck, (req, res) => {
    res.render('dashboard', { user: req.user, embedToken:embedToken, url:url, reportId:reportId });
  });
}

embedConfig();

module.exports = router;
