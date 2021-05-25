import React from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const ViewChildren = () => {
	return (
		<div className="display-table">
			<h2 className="table-heading">Children Details</h2>
			<Table hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Gender</th>
						<th>Date of Birth</th>
						<th>Parent Name</th>
						<th>Parent CNIC</th>
						<th>Address</th>
						<th>Contact</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>Male</td>
						<td>1/2/2021</td>
						<td>abc</td>
						<td>123654789</td>
						<td>islamabad</td>
						<td>123456789</td>
						<td>
							<BiEdit className="editIcon" />
						</td>
						<td>
							<AiFillDelete className="deleteIcon" />
						</td>
					</tr>
					<tr>
						<th scope="row">2</th>
						<td>Male</td>
						<td>1/2/2021</td>
						<td>abc</td>
						<td>123654789</td>
						<td>islamabad</td>
						<td>123456789</td>
						<td>
							<BiEdit className="editIcon" />
						</td>
						<td>
							<AiFillDelete className="deleteIcon" />
						</td>
					</tr>
					<tr>
						<th scope="row">3</th>
						<td>Male</td>
						<td>1/2/2021</td>
						<td>abc</td>
						<td>123654789</td>
						<td>islamabad</td>
						<td>123456789</td>
						<td>
							<BiEdit className="editIcon" />
						</td>
						<td>
							<AiFillDelete className="deleteIcon" />
						</td>
					</tr>
					<tr>
						<th scope="row">4</th>
						<td>Male</td>
						<td>1/2/2021</td>
						<td>abc</td>
						<td>123654789</td>
						<td>islamabad</td>
						<td>123456789</td>
						<td>
							<BiEdit className="editIcon" />
						</td>
						<td>
							<AiFillDelete className="deleteIcon" />
						</td>
					</tr>
					<tr>
						<th scope="row">5</th>
						<td>Male</td>
						<td>1/2/2021</td>
						<td>abc</td>
						<td>123654789</td>
						<td>islamabad</td>
						<td>123456789</td>
						<td>
							<BiEdit className="editIcon" />
						</td>
						<td>
							<AiFillDelete className="deleteIcon" />
						</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
};

export default ViewChildren;
