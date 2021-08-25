import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getVaccines, deleteVaccine } from "../../services/vaccinesService";

const ViewVaccineStock = () => {
	const [vaccines, setVaccines] = useState([]);

	async function getAllVaccines() {
		const allVaccines = await getVaccines();
		console.log("All vaccines ", vaccines);
		setVaccines(allVaccines.data);
		console.log(vaccines);
	}

	const handleDelete = (id: any) => {
		deleteVaccine(id);
		setVaccines(
			vaccines.filter((vaccine) => {
				const { _id } = vaccine;
				return _id !== id;
			})
		);
	};

	const handleEdit = () => {
		console.log("Edit");
	};

	useEffect(() => {
		getAllVaccines();
	}, []);

	return (
		<div style={{ marginLeft: "15%" }} className="display-table">
			<Container>
				<h2 className="table-heading">Vaccine Stock Details</h2>
				<div className="form-group search-field">
					<input type="text" className="form-control" name="area" placeholder="Search vaccines" />
					<button type="button" className="btn btn-primary">
						Search
					</button>
				</div>
				<Table hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Vaccine Name</th>
							<th>Remaining Quantity</th>
							<th>Manufacturer</th>
							<th>Expiry Date</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{vaccines &&
							vaccines.map((vaccine) => {
								// console.log(campaign);
								const { _id, vaccineID, name, manufacturer, quantity, expiryDate } = vaccine;
								return (
									<tr key={vaccineID}>
										<td>{vaccineID}</td>
										<td>{name}</td>
										<td>{quantity}</td>
										<td>{manufacturer}</td>
										<td>{expiryDate}</td>
										<td>
											<a style={{ cursor: "pointer" }} onClick={handleEdit}>
												<BiEdit className="editIcon" />
											</a>
										</td>
										<td>
											<a style={{ cursor: "pointer" }} onClick={() => handleDelete(_id)}>
												<AiFillDelete className="deleteIcon" />
											</a>
										</td>
									</tr>
								);
							})}
					</tbody>
				</Table>
			</Container>
		</div>
	);
};

export default ViewVaccineStock;
