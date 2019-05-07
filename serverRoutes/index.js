//router.use("/api", apiRoutes)
const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes
router.use("/api", apiRoutes);
// router.use("/api", function () {
//     console.log("hello");

// })

// If no API routes are hit, send the React app
// router.use(function(req, res) {
//   // specifically for production level
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;
