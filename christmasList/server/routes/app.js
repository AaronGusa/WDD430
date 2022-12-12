var express = require('express');
var router = express.Router();


// router.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS"
//   );
//   next();
// });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
});

module.exports = router;
