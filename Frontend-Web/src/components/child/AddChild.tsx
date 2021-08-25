import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { addChild } from "../../services/childrenService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../index.css";

const AddChild = () => {
	const makeChildID = () => {
		let childID = "CH-";
		const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
		for (let i = 0; i <= 5; i++) childID += possible.charAt(Math.floor(Math.random() * possible.length));
		return childID;
	};
	const [childID, setChildID] = useState(makeChildID());
	const [parentName, setParentName] = useState("");
	const [parentCNIC, setParentCNIC] = useState("");
	const [contactNo, setContactNo] = useState("");
	const [address, setAddress] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const [gender, setGender] = useState("");
	const [birthPlace, setBirthPlace] = useState("");
	const [siblingNo, setSiblingNo] = useState("");
	const [hospitalName, setHospitalName] = useState("");
	const [vaccinationInfo, setVaccinationInfo] = useState("");

	const handleDateChange = (date: any) => {
		setDateOfBirth(date);
	};

	const handleFormSubmit = async (e: any) => {
		e.preventDefault();
		const newChild = {
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
		};

		try {
			await addChild(newChild);
			alert("Child Added");
		} catch (err) {
			alert(err);
		}
		window.location.href = "/hospital/children";
	};

	return (
		<div className="add-form">
			<Container>
				<div className="section-title">
					<h2>Add Child Details</h2>
				</div>
				<Row>
					<Col>
						<div className="add-campaign">
							<form method="post" onSubmit={handleFormSubmit}>
								<Row>
									<Col md="12" sm="12">
										<div className="form-group">
											<label>Gender</label>
											<select
												value={gender}
												onChange={(e) => setGender(e.target.value)}
												className="form-control"
											>
												<option value="0">Gender</option>
												<option value="male">Male</option>
												<option value="female">Female</option>
											</select>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<label>Date of Birth</label>
											<br />
											<DatePicker
												className="form-control"
												selected={dateOfBirth}
												onChange={handleDateChange}
											/>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<label>Parent name</label>
											<input
												type="text"
												className="form-control"
												name="name"
												placeholder="Parent Name"
												value={parentName}
												onChange={(e) => setParentName(e.target.value)}
											/>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<label>Parent CNIC</label>
											<input
												type="text"
												className="form-control"
												name="cnic"
												placeholder="Parent CNIC"
												value={parentCNIC}
												onChange={(e) => setParentCNIC(e.target.value)}
											/>
										</div>
									</Col>

									<Col md="12" sm="12">
										<div className="form-group">
											<label>Contact Number</label>
											<input
												type="text"
												className="form-control"
												name="contact"
												placeholder="Contact Number"
												value={contactNo}
												onChange={(e) => setContactNo(e.target.value)}
											/>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<input
												type="text"
												className="form-control"
												name="name"
												placeholder="Address"
												value={address}
												onChange={(e) => setAddress(e.target.value)}
											/>
										</div>
									</Col>

									<Col md="12" sm="12">
										<div className="form-group">
											<input
												type="text"
												className="form-control"
												name="dob"
												placeholder="Birth Place"
												value={birthPlace}
												onChange={(e) => setBirthPlace(e.target.value)}
											/>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<input
												type="text"
												className="form-control"
												name="name"
												placeholder="Hospital Name"
												value={hospitalName}
												onChange={(e) => setHospitalName(e.target.value)}
											/>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<input
												type="number"
												className="form-control"
												name="cnic"
												placeholder="Sibling number"
												value={siblingNo}
												onChange={(e) => setSiblingNo(e.target.value)}
											/>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<input
												type="text"
												className="form-control"
												name="cnic"
												placeholder="vaccination info"
												value={vaccinationInfo}
												onChange={(e) => setVaccinationInfo(e.target.value)}
											/>
										</div>
									</Col>

									<Col md="12" sm="12">
										<button className="default-btn signup-btn" type="submit">
											Add child
										</button>
									</Col>
								</Row>
							</form>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default AddChild;
