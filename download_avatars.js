var request = require("request");
var fs = require("fs");

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
	var options = {
		url:
			"https://api.github.com/repos/" +
			repoOwner +
			"/" +
			repoName +
			"/contributors",
		headers: { "User-Agent": "request" }
	};
	console.log(options);
	request(options, function(err, res, body) {
		var parsedBody = JSON.parse(body);
		cb(err, parsedBody);

		for (var i = 0; i < parsedBody.length; i++) {
			var avatarUrl = parsedBody[i].avatar_url;
			console.log(parsedBody[i].avatar_url);
		}
	});
}
function downloadImageByURL(url, filePath) {
	request
		.get("https://avatars2.githubusercontent.com/u/2741?v=3&s=466")
		.on("error", function(err) {
			throw err;
		})
		.pipe(fs.createWriteStream("./avatars/kvirani.jpg"));
}

getRepoContributors("jquery", "jquery", function(err, result) {
	console.log("Errors:", err);
	console.log("Result:", result);
});
