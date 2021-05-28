const router = require("express").Router();
let Child = require("../models/child.model");

// get children
router.route("/").get((req, res) => {
	Child.find()
		.then((children) => res.json(children))
		.catch((err) => res.status(400).json({ error: err }));
});

// get single child
router.route("/:id").get((req, res) => {
	Child.findById(req.params.id)
		.then((children) => res.json(children))
		.catch((err) => res.status(400).json({ error: err }));
});

// delete child
router.route("/:id").delete((req, res) => {
	Child.findByIdAndDelete(req.params.id)
		.then((children) => res.json("Child deleted "))
		.catch((err) => res.status(400).json({ error: err }));
});

// add child
router.route("/add").post((req, res) => {
	const childID = req.body.childID;
	const parentName = req.body.parentName;
	const parentCNIC = req.body.parentCNIC;
	const contactNo = req.body.contactNo;
	const address = req.body.address;
	const dateOfBirth = Date.parse(req.body.dateOfBirth);
	const gender = req.body.gender;
	const birthPlace = req.body.birthPlace;
	const siblingNo = Number(req.body.siblingNo);
	const hospitalName = req.body.hospitalName;
	const vaccinationInfo = req.body.vaccinationInfo;

	const newChild = new Child({
		childID,
		parentName,
		parentCNIC,
		contactNo,
		address,
		dateOfBirth,
		gender,
		birthPlace,
		siblingNo,
		hospitalName,
		vaccinationInfo,
	});

	newChild
		.save()
		.then(() => res.json("Child added!"))
		.catch((err) => res.status(400).json({ error: err }));
});

// update child
router.route("/update/:id").post((req, res) => {
	Child.findById(req.params.id)
		.then((child) => {
			child.childID = req.params.childID;
			child.parentName = req.body.parentName;
			child.parentCNIC = req.body.parentCNIC;
			child.childID = req.body.childID;
			child.contactNo = req.body.contactNo;
			child.address = req.body.address;
			child.dateOfBirth = Date.parse(req.body.dateOfBirth);
			child.gender = req.body.gender;
			child.birthPlace = req.body.birthPlace;
			child.siblingNo = Number(req.body.siblingNo);
			child.hospitalName = req.body.hospitalName;
			child.vaccinationInfo = req.body.vaccinationInfo;

			child
				.save()
				.then(() => res.json("Child updated!"))
				.catch((err) => res.status(400).json({ error: err }));
		})
		.catch((err) => res.status(400).json({ error: err }));
});

module.exports = router;
