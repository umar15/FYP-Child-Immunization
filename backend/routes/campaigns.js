const router = require("express").Router();
let Campaign = require("../models/Campaign.model");

// get Campaigns
router.route("/").get((req, res) => {
	Campaign.find()
		.then((campaign) => res.json(campaign))
		.catch((err) => res.status(400).json({ error: err }));
});

// get single Campaign
router.route("/:id").get((req, res) => {
	Campaign.findById(req.params.id)
		.then((campaign) => res.json(campaign))
		.catch((err) => res.status(400).json({ error: err }));
});

// delete Campaign
router.route("/:id").delete((req, res) => {
	Campaign.findByIdAndDelete(req.params.id)
		.then((campaign) => res.json("Campaign deleted "))
		.catch((err) => res.status(400).json({ error: err }));
});

// add Campaign
router.route("/add").post((req, res) => {
	const campaignID = req.body.campaignID;
	const status = req.body.status;
	const area = req.body.area;
	const noOfWorkers = req.body.noOfWorkers;
	const startDate = Date.parse(req.body.startDate);
	const endDate = Date.parse(req.body.endDate);

	const newCampaign = new Campaign({
		campaignID,
		status,
		area,
		noOfWorkers,
		startDate,
		endDate,
	});

	newCampaign
		.save()
		.then(() => res.json("Campaign added!"))
		.catch((err) => res.status(400).json({ error: err }));
});

// update Campaign
router.route("/update/:id").post((req, res) => {
	Campaign.findById(req.params.id)
		.then((campaign) => {
			campaign.campaignID = req.body.campaignID;
			campaign.status = req.body.status;
			campaign.area = req.body.area;
			campaign.noOfWorkers = req.body.noOfWorkers;
			campaign.startDate = Date.parse(req.body.startDate);
			campaign.endDate = Date.parse(req.body.endDate);

			campaign
				.save()
				.then(() => res.json("Campaign updated!"))
				.catch((err) => res.status(400).json({ error: err }));
		})
		.catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;
