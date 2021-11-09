import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../index.css";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { useHistory, useLocation, useParams } from "react-router-dom";

const AddChild = () => {
	const makeChildID = () => {
		let childID = "CH-";
		const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
		for (let i = 0; i <= 5; i++) childID += possible.charAt(Math.floor(Math.random() * possible.length));
		return childID;
	};

	React.useEffect(() => {
		getUser();
	}, []);

	const [user, setUser] = useState<any>([]);
	const [schedule, setSchedule] = useState<any>([]);
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
		dateOfBirth: new Date(),
		gender: "",
		birthPlace: "",
		siblingNo: "",
		hospitalName: "",
		vaccination: [
			{
				opv: { noOfDoses: 1 }, // polio
				measles: { noOfDoses: 0 },
				bcg: { noOfDoses: 1 }, // children TB
				pentavalent: { noOfDoses: 0 },
				pcv: { noOfDoses: 0 },
			},
		],
	});
	const alert = useAlert();
	const history = useHistory();

	const getUser = () => {
		axios
			.get("/users/current")
			.then((res) => {
				setUser(res.data?.data.user);
				setdata({
					...data,
					hospitalName: res.data.data.user._id,
				});
				// setTimeout(() => {
				// 	axios
				// 		.get("/hospital/reminders")
				// 		.then((res) => console.log("reminder: ", res))
				// 		.catch((err) => console.log(err));
				// }, 50000);
			})
			.catch((err) =>
				alert.show("Failed to fetch user!", {
					type: "error",
				})
			);
	};

	const handleDateChange = (date: any) => {
		setdata({
			...data,
			dateOfBirth: date,
		});
	};

	const handleFormSubmit = async (e: any) => {
		e.preventDefault();
		console.log("data: ", data);
		axios
			.post("/hospital/children/add", data)
			.then((res) => {
				alert.show("Child added successfull!", {
					type: "success",
				});
				console.log("response: ", res.data);
				setSchedule(res.data?.data?.vaccineSchedule);

				history.push({
					pathname: "/hospital/children/printables",
					state: {
						data,
						schedule: res.data?.data?.vaccineSchedule,
					},
				});
			})
			.catch((err) =>
				alert.show("Failed to add child!", {
					type: "error",
				})
			);
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
									<Col md="6" sm="12">
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
									<Col md="6" sm="12">
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

									<Col md="6" sm="12">
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
									<Col md="6" sm="12">
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
									<Col md="6" sm="12">
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
									<Col md="6" sm="12">
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

									<Col md="6" sm="12">
										<div className="form-group">
											<label>Place of Birth</label>
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
									<Col md="6" sm="12">
										<div className="form-group">
											<label>Sibling No.</label>
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
