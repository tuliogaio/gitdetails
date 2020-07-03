module.exports = app => {
	app.route("/").get(app.services.github.get);
}
