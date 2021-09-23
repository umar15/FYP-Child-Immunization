import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Spinner, Button } from "reactstrap";
import axios from "../../config/AxiosOptions";
import { useAlert } from "react-alert";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import "../../index.css";
import { link } from "fs";

const SubAdmin = () => {
	const [subadmins, setSubadmins] = useState([]);
	const [loading, setLoading] = useState(true);
	const alert = useAlert();

	const getSubadmins = async () => {
		axios
			.get("/admin/subadmins")
			.then((res) => {
				console.log(res.data.data);
				setSubadmins(res.data?.data);
				setLoading(false);
			})
			.catch((err) =>
				alert.show("Failed to Fetch subadmins", {
					type: "error",
				})
			);
	};

	const handleDelete = (id) => {
		axios
			.delete(`/admin/subadmins/${id}`)
			.then((res) => {
				alert.show("Subadmin deleted successfully!", {
					type: "success",
				});
				setSubadmins(subadmins.filter((item: any) => item._id !== id));
			})
			.catch((err) => {
				alert.show("Failed to delete subadmin. Try again later", {
					type: "error",
				});
			});
	};

	useEffect(() => {
		getSubadmins();
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
				<Col lg="9">
					<h3>Sub Admins</h3>
				</Col>
				<Col lg="3">
					<button className="default-btn">
						<a href="/admin/subadmins/add" style={linkStyles}>
							Add sub admin
						</a>
					</button>
				</Col>
			</Row>
			{/* <Row>
				<Col>
					<h3>Sub Admins</h3>
				</Col>
			</Row> */}
			<Row className="subadmin-table">
				<Col lg="12">
					<Table bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Email</th>
								<th>City</th>
								<th>Assign vaccine</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{subadmins &&
								subadmins.map((subadmin: any, index) => (
									<tr key={subadmin._id}>
										<th scope="row">{index + 1}</th>
										<td>{subadmin.name}</td>
										<td>{subadmin.email}</td>
										<td>{subadmin.address.city}</td>
										<td>
											<Link to="/">assign</Link>
										</td>
										<td>
											<BiEdit style={editStyles} size="20" />
										</td>
										<td>
											<AiFillDelete
												onClick={() => handleDelete(subadmin._id)}
												style={deleteStyles}
												size="20"
											/>
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

export default SubAdmin;
