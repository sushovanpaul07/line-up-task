const router = require("express").Router();
const { register, signIn } = require("../controllers/authentication");

router.post("/register", register);
router.post("/signin", signIn);

module.exports = router;
