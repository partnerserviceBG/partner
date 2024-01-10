const express = require("express");

const router = express.Router({ mergeParams: true });

const postRouter = require("./post.routes");
const housesRouter = require("./houses.routes");
const userRouter = require("./user.routes");
const managementContractsRouter = require("./management-contracts.routes");
const meteringDevicesRouter = require("./metering-devices.routes");
const organisationInfoRouter = require("./organisation-info.routes");

router.use("/posts", postRouter);
router.use("/houses", housesRouter);
router.use("/users", userRouter);
router.use("/management-contracts", managementContractsRouter);
router.use("/metering-devices", meteringDevicesRouter);
router.use("/organisation-info", organisationInfoRouter);

module.exports = router;
