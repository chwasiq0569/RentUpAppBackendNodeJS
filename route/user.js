const user = require("../controller/user");

const router = require("express").Router();

router.post("/register", user.createUser);
router.post("/login", user.login);

module.exports = router;
