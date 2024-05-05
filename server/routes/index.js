const express = require("express");

const router = express.Router({ mergeParams: true });

const postRouter = require("./post.routes");
const housesRouter = require("./houses.routes");
const userRouter = require("./user.routes");
const managementContractsRouter = require("./management-contracts.routes");
const meteringDevicesRouter = require("./metering-devices.routes");
const organisationInfoRouter = require("./organisation-info.routes");
const appealsRouter = require("./appeals.routes");
const debtRequestRouter = require("./debt-request.routes");
const nsiRouter = require("./nsi.routes");

router.use("/posts", postRouter);
router.use("/houses", housesRouter);
router.use("/users", userRouter);
router.use("/management-contracts", managementContractsRouter);
router.use("/metering-devices", meteringDevicesRouter);
router.use("/organisation-info", organisationInfoRouter);
router.use("/appeals", appealsRouter);
router.use("/debt-request", debtRequestRouter);
router.use("/nsi", nsiRouter);

module.exports = router;
