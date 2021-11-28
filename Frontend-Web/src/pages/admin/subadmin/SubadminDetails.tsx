import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, ListGroup, ListGroupItem } from "reactstrap";
import "../../../index.css";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";

const SubadminDetails = () => {
	const subadminID: any = useParams();
	const alert = useAlert();
	const history = useHistory();
	const location: any = useLocation();

	const [vaccines, setVaccines] = useState<any>([]);
	const [assignedVaccines, setAssignedVaccines] = useState<any>([]);

	const subadmin: any = location.state ? location.state : "";
	console.log("Subadmin details page: ", subadminID);

	const getSubadminVaccines = () => {
		axios
			.get(`/admin/usersvaccines/${subadminID.id}`)
			.then((res) => {
				console.log("Vaccines: ", res.data?.data.uservaccines[0].vaccines);
				setVaccines(res.data?.data.uservaccines[0].vaccines);
			})
			.catch((err) => {
				console.log(err);
				alert.show("Failed to subadmin vaccine stock info.", {
					type: "error",
				});
			});
	};

	const getAssignedVaccines = () => {
		axios
			.get(`/admin/assignedvaccine/${subadminID.id}`)
			.then((res) => {
				console.log("Assigned Vaccines: ", res.data?.data.assignedvaccines);
				setAssignedVaccines(res.data?.data.assignedvaccines);
			})
			.catch((err) => {
				console.log(err);
				alert.show("Failed to get subadmin assigned vaccine stock info.", {
					type: "error",
				});
			});
	};

	useEffect(() => {
		getSubadminVaccines();
		getAssignedVaccines();
	}, []);

	const { name, email, address, phoneNo, cnic } = subadmin.subadmin;
	return (
		<Container>
			<Row className="subadmin-admin">
				<Col lg="12">
					<h3>{name} Details</h3>
				</Col>
			</Row>
			<Row className="subadmin-table">
				<Col>
					<Table style={tableStyles} bordered hover>
						<thead>
							<tr>
								<th>Name</th>
								<td>{name}</td>
							</tr>
							<tr>
								<th>Email</th>
								<td>{email}</td>
							</tr>
							<tr>
								<th>Phone Number</th>
								<td>{phoneNo}</td>
							</tr>
							<tr>
								<th>CNIC</th>
								<td>{cnic}</td>
							</tr>
							<tr>
								<th>Address</th>
								<td>
									{address.addr}, {address.area}, {address.city}
								</td>
							</tr>
						</thead>
					</Table>
				</Col>
			</Row>
			<Row className="subadmin-admin" style={{ marginBottom: "20px" }}>
				<Col lg="12">
					<h4>{name} Vaccine Stock Details</h4>
				</Col>
			</Row>
			<Row>
				<Col>
					<Table bordered size="sm">
						<thead>
							<tr>
								<th>Name</th>
								<th>Quantity</th>
							</tr>
						</thead>
						<tbody>
							{Object.keys(vaccines).map((vc, i) => (
								<tr key={i}>
									<td>{vc}</td>
									<td>{vaccines[vc].quantity}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Col>
			</Row>
			<Row className="subadmin-admin" style={{ marginBottom: "20px" }}>
				<Col lg="12">
					<h4>{name} Vaccine Usage Details</h4>
				</Col>
			</Row>
			<Row>
				<Col>
					<ListGroup>
						{assignedVaccines.reverse().map((av: any) => {
							return (
								<ListGroupItem key={av._id} className="notification-item">
									<IoMdArrowDropright size={30} />
									<b>{av.assignedBy.name} </b>
									assigned <b>{av.vaccine}</b> vaccine <b>quantity {av.quantity} </b>
									to <b>{av.organization.name}</b>
								</ListGroupItem>
							);
						})}
					</ListGroup>
				</Col>
			</Row>
		</Container>
	);
};

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
};

export default SubadminDetails;
