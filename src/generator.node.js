var md = require("node-markdown").Markdown;
var fs = require("fs");
var basehtml = fs.readFileSync("./base.node.html");

module.exports = {
	html: function (title) {
		//return '<html>'+head(title)+body(boxes)+'</html>';
		var data = fs.readFileSync("./base.node.html");
		//var data = basehtml;
		data = data.toString();
		data = data.replace(/@title@/gm,title.toString());
		return data;
	}
}