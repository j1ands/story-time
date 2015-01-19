var http = require('http');
var fs = require('fs');

exports = module.exports = NYTAPI;

if(require.main === module)
{
	console.log(process.argv);
	if(process.argv[3])
	{
		fs.writeFile(__dirname + '/' + process.argv[2] + '_api_key.txt', process.argv[3], function(err){
			if(err)
			{
				console.log("key write error!");
				process.exit(1);
			} else {
				console.log("key written!");
				process.exit(0);
			}
		});
	}
}

function NYTAPI() 
{
	this.apikey = fs.readFileSync(__dirname + '/article_search_api_key.txt').toString().trim();

	NYTAPI.prototype.search = function(params, callback) {
		
		params += this.apikey;
		var path = '/svc/search/v2/articlesearch.json?' + params;

		var options = {
			hostname: 'api.nytimes.com',
			path: path,
			method: 'GET'
		}

		var getReq = http.request(options, function (res) {
		      var response = "";
		      res.setEncoding('utf8');
		      res.on('data', function (chunk) { response += chunk; });
		      res.on('end', function () { callback(JSON.parse(response)); });
		      res.on('error', function (err) {
		        callback({ status:'ERROR', statusInfo: err });
		      });
		    });

		getReq.end();

	};
}