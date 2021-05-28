const router = require("express").Router();
let Vaccine = require("../models/Vaccine.model");

// get Vaccines
router.route("/").get((req, res) => {
	Vaccine.find()
		.then((vaccine) => res.json(vaccine))
		.catch((err) => res.status(400).json({ error: err }));
});

// get single Vaccine
router.route("/:id").get((req, res) => {
	Vaccine.findById(req.params.id)
		.then((vaccine) => res.json(vaccine))
		.catch((err) => res.status(400).json({ error: err }));
});

// delete Vaccine
router.route("/:id").delete((req, res) => {
	Vaccine.findByIdAndDelete(req.params.id)
		.then((vaccine) => res.json("Vaccine deleted "))
		.catch((err) => res.status(400).json({ error: err }));
});

// add Vaccine
router.route("/add").post((req, res) => {
	const vaccineID = req.body.vaccineID;
	const name = req.body.name;
	const manufacturer = req.body.manufacturer;
	const quantity = Number(req.body.quantity);
	const expiryDate = Date.parse(req.body.expiryDate);

	const newVaccine = new Vaccine({
		vaccineID,
		name,
		manufacturer,
		quantity,
		expiryDate,
	});

	newVaccine
		.save()
		.then(() => res.json("Vaccine added!"))
		.catch((err) => res.status(400).json({ error: err }));
});

// update Vaccine
router.route("/update/:id").post((req, res) => {
	Vaccine.findById(req.params.id)
		.then((vaccine) => {
			vaccine.vaccineID = req.body.vaccineID;
			vaccine.name = req.body.name;
			vaccine.manufacturer = req.body.manufacturer;
			vaccine.quantity = Number(req.body.quantity);
			vaccine.expiryDate = Date.parse(req.body.expiryDate);

			vaccine
				.save()
				.then(() => res.json("Vaccine updated!"))
				.catch((err) => res.status(400).json({ error: err }));
		})
		.catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;
