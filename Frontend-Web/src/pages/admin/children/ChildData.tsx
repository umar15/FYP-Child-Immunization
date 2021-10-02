import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { Container, Row, Col, Table, Spinner, Button } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";

const ChildData = () => {
	const [hospitalName, setHospitalName] = useState([]);
	const alert = useAlert();
	const location = useLocation();
	const child: any = location.state ? location.state : "";
	console.log("Child: ", child.data);

	const getHospitals = async () => {
		axios
			.get("/admin/hospitals")
			.then((res) => {
				res.data.data.map((item) => setHospitalName(item._id === child.data.hospitalName ? item.name : ""));
				console.log(res.data.data);
			})
			.catch((err) =>
				alert.show("Failed to Fetch hospitals", {
					type: "error",
				})
			);
	};

	useEffect(() => {
		getHospitals();
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
								<td>{child.data.dateOfBirth}</td>
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
								<td>{hospitalName}</td>
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
					<Table style={tableStyles} bordered hover>
						<thead>
							<tr>
								<th>Vaccine Name</th>
								<th>Number of doses</th>
							</tr>
							<tr>
								<th>Diphteria</th>
								<td>{child.data.vaccination[0].diphtheria.noOfDoses}</td>
							</tr>
							<tr>
								<th>Polio</th>
								<td>{child.data.vaccination[0].polio.noOfDoses}</td>
							</tr>
							<tr>
								<th>Homophiles</th>
								<td>{child.data.vaccination[0].homophiles.noOfDoses}</td>
							</tr>
							<tr>
								<th>Rota Virus</th>
								<td>{child.data.vaccination[0].rotaVirus.noOfDoses}</td>
							</tr>
							<tr>
								<th>Measles</th>
								<td>{child.data.vaccination[0].measles.noOfDoses}</td>
							</tr>
							<tr>
								<th>Hepatitus A</th>
								<td>{child.data.vaccination[0].hepatitisA.noOfDoses}</td>
							</tr>
							<tr>
								<th>Hepatitus B</th>
								<td>{child.data.vaccination[0].hepatitisB.noOfDoses}</td>
							</tr>
							<tr>
								<th>Papilloma Virus</th>
								<td>{child.data.vaccination[0].papillomaVirus.noOfDoses}</td>
							</tr>
							<tr>
								<th>Influenza</th>
								<td>{child.data.vaccination[0].influenza.noOfDoses}</td>
							</tr>
						</thead>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
};

export default ChildData;
