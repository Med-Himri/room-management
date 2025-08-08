const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const { register, login, getAllUsers, getUserById, updateUser, deleteUser} = require("../controllers/usercontroller");
//domain/api/user
router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.get("/",getAllUsers);
router.get("/:id",getUserById);
router.put("/:id", upload.single("avatar"), updateUser);
router.delete("/:id",deleteUser);


module.exports = router;
