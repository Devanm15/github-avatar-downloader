var request = require("request");
var fs = require("fs");
var token = require("./secrets").GITHUB_TOKEN;
console.log("Welcome to the GitHub Avatar Downloader!");

var owner = process.argv[2];
var repo = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {
	var options = {
		url:
			"https://api.github.com/repos/" +
			repoOwner +
			"/" +
			repoName +
			"/contributors",
		headers: { "User-Agent": "request", Authorization: "Token" + token }
	};
	console.log(options);
	request(options, function(err, res, body) {
		var parsedBody = JSON.parse(body);
		cb(err, parsedBody);

		for (var i = 0; i < parsedBody.length; i++) {
			var avatarUrl = parsedBody[i].avatar_url;
			var login = parsedBody[i].login;
			console.log("Avatar: " + avatarUrl);
			console.log("Login: " + login);
			downloadImageByURL(avatarUrl, "avatars/" + login + " .jpg");
		}
	});
}
function downloadImageByURL(url, filePath) {
	request
		.get(url)
		.on("error", function(err) {
			throw err;
		})
		.pipe(fs.createWriteStream(filePath));
}

getRepoContributors(owner, repo, function(err, result) {
	if (repo === undefined) {
		console.log("Error, second iput required.");
	}
});
