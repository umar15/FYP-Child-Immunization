import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { Container, Row, Col, Table, Spinner, Button, Input } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";

const ChildData = () => {
	const [hospitalName, setHospitalName] = useState<any>([]);
	const alert = useAlert();
	const location = useLocation();
	const history = useHistory();
	const { id } = useParams<{ id: string }>();

	const child: any = location.state ? location.state : "";
	const [data, setData] = useState<any>(child.data?.vaccination[0]);

	const getHospital = async () => {
		axios
			.get("/users/current")
			.then((res) => {
				// console.log(res.data.data);
				setHospitalName(res.data.data);
			})
			.catch((err) =>
				alert.show("Failed to Fetch hospitals", {
					type: "error",
				})
			);
	};

	const changeCheck: any = (name, i) => {
		setData({
			...data,
			[name]: {
				noOfDoses: i,
			},
		});
	};

	const updateChild = () => {
		const d = {
			vaccination: [data],
		};
		console.log("data: ", d);

		axios
			.put(`/hospital/children/${id}`, d)
			.then((res) => {
				console.log("data from response: ", res.data);
				alert.show("Child updated successfully", {
					type: "success",
				});
				history.push(`/hospital/children/`);
			})
			.catch((err) =>
				alert.show("Failed to update child.", {
					type: "error",
				})
			);
	};

	useEffect(() => {
		getHospital();
	}, []);

	return (
		<Container>
			<Row className="subadmin-admin">
				<Col lg="12">
					<h3>Details of Child ID: {child.data.childID}</h3>
				</Col>
			</Row>
			<Row className="subadmin-table">
				<Col>
					<Table style={tableStyles} bordered hover>
						<thead>
							<tr>
								<th>Child ID</th>
								<td>{child.data.childID}</td>
							</tr>
							<tr>
								<th>Parent Name</th>
								<td>{child.data.parentName}</td>
							</tr>
							<tr>
								<th>Parent CNIC</th>
								<td>{child.data.parentCNIC}</td>
							</tr>
							<tr>
								<th>Contact No</th>
								<td>{child.data.contactNo}</td>
							</tr>
							<tr>
								<th>Date of Birth</th>
								<td>{new Date(child.data.dateOfBirth).toDateString()}</td>
							</tr>
							<tr>
								<th>Gender</th>
								<td>{child.data.gender}</td>
							</tr>
							<tr>
								<th>Sibling Number</th>
								<td>{child.data.siblingNo}</td>
							</tr>
							<tr>
								<th>Gender</th>
								<td>{child.data.gender}</td>
							</tr>
							<tr>
								<th>City</th>
								<td>{child.data.birthPlace}</td>
							</tr>
							<tr>
								<th>Hospital where born</th>
								<td>{hospitalName.user?.name}</td>
							</tr>
						</thead>
					</Table>
				</Col>
			</Row>

			<Row className="subadmin-admin">
				<Col lg="12">
					<h4>Vaccination Details</h4>
				</Col>
			</Row>
			<Row className="subadmin-table">
				<Col>
					{console.log("Data: ", data)}
					<Table style={tableStyles} bordered hover>
						<thead>
							<tr>
								<th>Vaccine Name</th>
								<th>Number of doses</th>
							</tr>
							<tr>
								<th>OPV (Polio)</th>
								<td>
									{[...Array(4)].map((x, i) => {
										if (data.opv.noOfDoses >= i + 1) {
											return <input checked disabled className="checkbox" type="checkbox"></input>;
										} else {
											return (
												<input
													className="checkbox"
													type="checkbox"
													onChange={() => changeCheck("opv", i + 1)}
												></input>
											);
										}
									})}
								</td>
							</tr>
							<tr>
								<th>Pentavalent</th>
								<td>
									{[...Array(3)].map((x, i) => {
										if (data.pentavalent.noOfDoses >= i + 1) {
											return <input checked disabled className="checkbox" type="checkbox"></input>;
										} else {
											return (
												<input
													className="checkbox"
													type="checkbox"
													value={i + 1}
													onChange={() => changeCheck("pentavalent", i + 1)}
												></input>
											);
										}
									})}
								</td>
							</tr>
							<tr>
								<th>PCV (Pneumonia)</th>
								<td>
									{[...Array(3)].map((x, i) => {
										if (data.pcv.noOfDoses >= i + 1) {
											return <input checked disabled className="checkbox" type="checkbox"></input>;
										} else {
											return (
												<input
													className="checkbox"
													type="checkbox"
													onChange={() => changeCheck("pcv", i + 1)}
												></input>
											);
										}
									})}
								</td>
							</tr>
							<tr>
								<th>Measles</th>
								<td>
									{[...Array(2)].map((x, i) => {
										if (data.measles.noOfDoses >= i + 1) {
											return <input checked disabled className="checkbox" type="checkbox"></input>;
										} else {
											return (
												<input
													className="checkbox"
													type="checkbox"
													onChange={() => changeCheck("measles", i + 1)}
												></input>
											);
										}
									})}
								</td>
							</tr>
							<tr>
								<th>BCG (Children's TB)</th>
								<td>
									{[...Array(1)].map((x, i) => {
										if (data.bcg.noOfDoses >= i + 1) {
											return <input checked disabled className="checkbox" type="checkbox"></input>;
										} else {
											return (
												<input
													className="checkbox"
													type="checkbox"
													onChange={() => changeCheck("bcg", i + 1)}
												></input>
											);
										}
									})}
								</td>
							</tr>
						</thead>
					</Table>
				</Col>
			</Row>
			<Row>
				<Col md="12" sm="12">
					<button className="default-btn signup-btn" type="submit" onClick={() => updateChild()}>
						Update child
					</button>
				</Col>
			</Row>
		</Container>
	);
};

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
};

export default ChildData;
