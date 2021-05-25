import React from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const ViewVaccineStock = () => {
	return (
		<div className="display-table">
			<Container>
				<h2 className="table-heading">Vaccine Stock Details</h2>
				<Table hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Vaccine Name</th>
							<th>Remaining Quantity</th>
							<th>Manufacturer</th>
							<th>Expiry Date</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">1</th>
							<td>Polio</td>
							<td>20</td>
							<td>abc</td>
							<td>2/2/2022</td>
							<td>
								<BiEdit className="editIcon" />
							</td>
							<td>
								<AiFillDelete className="deleteIcon" />
							</td>
						</tr>
						<tr>
							<th scope="row">2</th>
							<td>Polio</td>
							<td>20</td>
							<td>abc</td>
							<td>2/2/2022</td>
							<td>
								<BiEdit className="editIcon" />
							</td>
							<td>
								<AiFillDelete className="deleteIcon" />
							</td>
						</tr>
						<tr>
							<th scope="row">3</th>
							<td>Polio</td>
							<td>20</td>
							<td>abc</td>
							<td>2/2/2022</td>
							<td>
								<BiEdit className="editIcon" />
							</td>
							<td>
								<AiFillDelete className="deleteIcon" />
							</td>
						</tr>
						<tr>
							<th scope="row">4</th>
							<td>Polio</td>
							<td>20</td>
							<td>abc</td>
							<td>2/2/2022</td>
							<td>
								<BiEdit className="editIcon" />
							</td>
							<td>
								<AiFillDelete className="deleteIcon" />
							</td>
						</tr>
						<tr>
							<th scope="row">5</th>
							<td>Polio</td>
							<td>20</td>
							<td>abc</td>
							<td>2/2/2022</td>
							<td>
								<BiEdit className="editIcon" />
							</td>
							<td>
								<AiFillDelete className="deleteIcon" />
							</td>
						</tr>
					</tbody>
				</Table>
			</Container>
		</div>
	);
};

export default ViewVaccineStock;
