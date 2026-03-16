const fs = require("fs");

let views = 0;

if (fs.existsSync("views.txt")) {
  views = parseInt(fs.readFileSync("views.txt"));
}

function countViews(req, res, next) {
  views++;

  fs.writeFileSync("views.txt", views.toString());

  console.log("Views:", views);

  next();
}

module.exports = countViews;