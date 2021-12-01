import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Spinner, Button } from "reactstrap";
import axios from "../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { Link, useHistory } from "react-router-dom";
import "../../index.css";

const Reports = () => {
	const [reports, setReports] = useState([]);
	const [children, setChildren] = useState<any>([]);
	const alert = useAlert();

	const getReports = () => {
		axios
			.get("/hospital/vaccinereports")
			.then((res) => {
				console.log("reports: ", res.data.data);
				setReports(res.data?.data?.nonVaccinatedChildren);
				// res.data?.data.nonVaccinatedChildren.map((child) => {
				// 	axios.get(`/hospital/children/${child}`).then((res) => {
				// 		console.log("res: ", res.data?.data);
				// 		setChildren([...children, res.data?.data]);
				// 	});
				// });
				// reports.map((item) => console.log("item: ", item));
			})
			.catch((err) => {
				alert.show("Failed to Fetch reports", {
					type: "error",
				});
			});
	};

	useEffect(() => {
		getReports();
	}, []);

	return (
		<Container>
			<Row className="subadmin-admin">
				<Col lg="12">
					<h3>Reports</h3>
				</Col>
			</Row>
			<Row className="subadmin-admin">
				<Col lg="12">
					<h5>List of non-vaccinated children</h5>
				</Col>
			</Row>
			<Row className="subadmin-table">
				<Col lg="12" style={{ height: "600px", overflow: "scroll" }}>
					<Table style={tableStyles} bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Child ID</th>
								<th>Parent Name</th>
								<th>Parent CNIC</th>
								<th>Contact No</th>
								<th>Gender</th>
								<th>View Details</th>
							</tr>
						</thead>
						<tbody>
							{reports &&
								reports.map((child: any, index) => (
									<tr key={child._id}>
										{/* {console.log(child.dateOfBirth.getTime())} */}
										<th scope="row">{index + 1}</th>
										<td>{child.childID}</td>
										<td>{child.parentName}</td>
										<td>{child.parentCNIC}</td>
										<td>{child.contactNo}</td>
										<td>{child.gender}</td>
										<td>
											<Link
												to={{
													pathname: `/hospital/children/${child._id}`,
													state: {
														data: child,
													},
												}}
											>
												view
											</Link>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

const linkStyles = {
	color: "white",
	listStyleType: "none",
};

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
};

export default Reports;
