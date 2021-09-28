import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Spinner, Button } from "reactstrap";
import axios from "../../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import "../../../index.css";
import ChildData from "./ChildData";

const Children = () => {
	const [children, setChildren] = useState([]);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<any>([]);
	const alert = useAlert();
	const history = useHistory();

	const getChildren = async () => {
		axios
			.get("/subadmin/children")
			.then((res) => {
				console.log(res.data.data);
				setChildren(res.data?.data);
				setLoading(false);
			})
			.catch((err) =>
				alert.show("Failed to Fetch children", {
					type: "error",
				})
			);
	};

	const getCurrentUser = () => {
		axios
			.get("/users/current")
			.then((res) => {
				console.log("user: ", res.data.data.user.address.city);
				setUser(res.data.data.user);
			})
			.catch((err) => console.log("Error: ", err));
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
		getChildren();
		getCurrentUser();
	}, []);

	if (loading) {
		return (
			<div style={{ margin: "10% 50%" }}>
				<Spinner color="primary" />
			</div>
		);
	}
	if (children.length == 0) {
		return (
			<div style={{ margin: "10% 50%" }}>
				<h4>No child added.</h4>
			</div>
		);
	}

	return (
		<Container>
			{console.log("SUhjfbjkafs: ", user)}
			<Row className="subadmin-admin">
				<Col lg="12">
					<h3>Children</h3>
				</Col>
			</Row>
			<Row className="subadmin-table">
				<Col lg="12">
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
							{children &&
								children.map((child: any, index) => {
									if (child.birthPlace === user.address?.city) {
										return (
											<tr key={child._id}>
												<th scope="row">{index + 1}</th>
												<td>{child.childID}</td>
												<td>{child.parentName}</td>
												<td>{child.parentCNIC}</td>
												<td>{child.contactNo}</td>
												<td>{child.gender}</td>
												<td>
													<Link
														to={{
															pathname: `/subadmin/children/${child._id}`,
															state: {
																data: child,
															},
														}}
													>
														view
													</Link>
												</td>
											</tr>
										);
									}
									// child.birthPlace == user.address?.city && (

									// );
								})}
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

const rowStyles = {
	cursor: "pointer",
};

const tableStyles = {
	boxShadow: "0 0px 5px #b0e5fc",
};

export default Children;
