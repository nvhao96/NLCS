class HomeController {
    index(req, res) {
        res.send("Welcome to the homepage");
    }
}

module.exports = new HomeController();