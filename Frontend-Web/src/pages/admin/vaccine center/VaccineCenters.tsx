import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Spinner, Button } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import "../../../index.css";

const VaccineCenters = () => {
	const [vaccineCenters, setVaccineCenters] = useState([]);
	const [loading, setLoading] = useState(true);
	const alert = useAlert();
	const history = useHistory();

	const getVaccineCenters = async () => {
		axios
			.get("/admin/vaccinecenters")
			.then((res) => {
				console.log(res.data.data);
				setVaccineCenters(res.data?.data);
				setLoading(false);
			})
			.catch((err) =>
				alert.show("Failed to Fetch vaccine centers", {
					type: "error",
				})
			);
	};

	// const handleDelete = (id) => {
	// 	axios
	// 		.delete(`/admin/subadmins/${id}`)
	// 		.then((res) => {
	// 			alert.show("Subadmin deleted successfully!", {
	// 				type: "success",
	// 			});
	// 			setSubadmins(subadmins.filter((item: any) => item._id !== id));
	// 		})
	// 		.catch((err) => {
	// 			alert.show("Failed to delete subadmin. Try again later", {
	// 				type: "error",
	// 			});
	// 		});
	// };

	useEffect(() => {
		getVaccineCenters();
	}, []);

	if (loading) {
		return (
			<div style={{ margin: "10% 50%" }}>
				<Spinner color="primary" />
			</div>
		);
	}

	return (
		<Container>
			<Row className="subadmin-admin">
				<Col lg="12">
					<h3>Vaccine Centers</h3>
				</Col>
			</Row>
			<Row className="subadmin-table">
				<Col lg="12">
					<Table style={tableStyles} bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Email</th>
								<th>City</th>
								<th>Assign vaccine</th>
								<th>View Details</th>
								{/* <th>Edit</th>
								<th>Delete</th> */}
							</tr>
						</thead>
						<tbody>
							{vaccineCenters &&
								vaccineCenters.map((vc: any, index) => (
									<tr key={vc._id}>
										<th scope="row">{index + 1}</th>
										<td>{vc.name}</td>
										<td>{vc.email}</td>
										<td>{vc.address.city}</td>
										<td>
											<Link to="/">assign</Link>
										</td>
										<td>
											<Link
												to={{
													pathname: `/admin/vaccinecenters/details/${vc._id}`,
													state: {
														vc,
													},
												}}
											>
												view
											</Link>
										</td>
										{/* <td>
											<Link
												to={{
													pathname: `/admin/hospital/${hospital._id}`,
													state: {
														hospital: hospital,
													},
												}}
											>
												<BiEdit style={editStyles} size="20" />
											</Link>
										</td>
										<td>
											<AiFillDelete
												onClick={() => handleDelete(hospital._id)}
												style={deleteStyles}
												size="20"
											/>
										</td> */}
									</tr>
								))}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

const editStyles = {
	cursor: "pointer",
	color: "green",
};
const deleteStyles = {
	cursor: "pointer",
	color: "red",
};

const linkStyles = {
	color: "white",
	listStyleType: "none",
};

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
};

export default VaccineCenters;
