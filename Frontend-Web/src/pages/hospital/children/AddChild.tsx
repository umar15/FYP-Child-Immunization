import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
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
	const [data, setdata] = useState<any>({
		childID: makeChildID(),
		parentName: "",
		parentCNIC: "",
		contactNo: "",
		emergencyContact: "",
		address: {
			addr: "",
			area: "",
			city: "",
		},
		dateOfBirth: "",
		gender: "",
		birthPlace: "",
		siblingNo: "",
		hospitalName: "",
		vaccination: [
			{
				polio: { noOfDoses: 0 },
				diphtheria: { noOfDoses: 0 },
				homophiles: { noOfDoses: 0 },
				rotaVirus: { noOfDoses: 0 },
				measles: { noOfDoses: 0 },
				hepatitisA: { noOfDoses: 0 },
				hepatitisB: { noOfDoses: 0 },
				papillomaVirus: { noOfDoses: 0 },
				influenza: { noOfDoses: 0 },
			},
		],
	});

	const handleDateChange = (date: any) => {
		setdata({
			...data,
			dateOfBirth: date,
		});
	};

	const handleFormSubmit = async (e: any) => {
		e.preventDefault();
		console.log("data: ", data);
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
												value={data.gender}
												onChange={(e) => setdata({ ...data, gender: e.target.value })}
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
												selected={data.dateOfBirth}
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
												value={data.parentName}
												onChange={(e) => setdata({ ...data, parentName: e.target.value })}
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
												value={data.parentCNIC}
												onChange={(e) => setdata({ ...data, parentCNIC: e.target.value })}
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
												value={data.contactNo}
												onChange={(e) => setdata({ ...data, contactNo: e.target.value })}
											/>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<label>Emergency Contact</label>
											<input
												type="text"
												className="form-control"
												name="contact"
												placeholder="Contact Number"
												value={data.emergencyContact}
												onChange={(e) => setdata({ ...data, emergencyContact: e.target.value })}
											/>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<label>Address</label>
											<input
												type="text"
												className="form-control"
												name="name"
												placeholder="Address"
												value={data.address.addr}
												onChange={(e) =>
													setdata({
														...data,
														address: {
															...data.address,
															addr: e.target.value,
														},
													})
												}
											/>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<label>Area</label>
											<input
												type="text"
												className="form-control"
												name="name"
												placeholder="Area"
												value={data.address.area}
												onChange={(e) =>
													setdata({
														...data,
														address: {
															...data.address,
															area: e.target.value,
														},
													})
												}
											/>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<label>City</label>
											<input
												type="text"
												className="form-control"
												name="name"
												placeholder="Address"
												value={data.address.city}
												onChange={(e) =>
													setdata({
														...data,
														address: {
															...data.address,
															city: e.target.value,
														},
													})
												}
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
												value={data.birthPlace}
												onChange={(e) => setdata({ ...data, birthPlace: e.target.value })}
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
												value={data.hospitalName}
												onChange={(e) => setdata({ ...data, hospitalName: e.target.value })}
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
												value={data.siblingNo}
												onChange={(e) => setdata({ ...data, siblingNo: e.target.value })}
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
