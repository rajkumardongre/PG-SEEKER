const express = require("express");

const workerController = require("./../controllers/workerController");
const workerAuthController = require("./../controllers/workerAuthController");

const router = express.Router();

router.get("/isLoggedIn", workerAuthController.isLoggedIn);

router.post("/signup", workerAuthController.signup);
router.post("/login", workerAuthController.logIn);
router.get("/logout", workerAuthController.logout);

router.post("/forgotPassword", workerAuthController.forgotPassword);
router.patch("/resetPassword/:token&:email", workerAuthController.resetPassword);

router.patch("/updateMe/:id", workerAuthController.protect, workerController.updateMe);
router.get(
  "/me/:id",
  workerAuthController.protect,
  workerController.getMe,
  workerController.getWorkerById
);

router.patch(
  "/updatePassword/:id",
  workerAuthController.protect,
  workerAuthController.updatePassword
);

// router.use(workerAuthController.protect, workerAuthController.restrictTo("admin"));
// router
//   .route("/")
router.get("/", workerController.getAllWorkers)
router.post("/", workerController.createWorker);

router
  .route("/:id")
  .get(workerController.getWorkerById)
  .delete(workerController.deleteWorkerById)
  .patch(workerController.updateWorkerById)

module.exports = router;
