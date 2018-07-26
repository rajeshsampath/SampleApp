const redis = rootRequire('controller/redis');

module.exports.initialize = function(app){
  /**
   *  Master Service
   */
  app.use('/api/redis', redis);
}