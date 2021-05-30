import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getChildren, deleteChild } from "../../services/childrenService";

const ViewChildren = () => {
	const [children, setChildren] = useState([]);

	async function getAllChildren() {
		const allChildren = await getChildren();
		console.log("All children ", children);
		setChildren(allChildren.data);
		console.log(children);
	}

	const handleDelete = (id: any) => {
		deleteChild(id);
		setChildren(
			children.filter((child) => {
				const { _id } = child;
				return _id !== id;
			})
		);
	};

	const handleEdit = () => {
		console.log("Edit");
	};

	useEffect(() => {
		getAllChildren();
	}, []);

	return (
		<div style={{ marginLeft: "15%" }} className="display-table">
			<h2 className="table-heading">Children Details</h2>
			<div className="form-group search-field">
				<input type="text" className="form-control" name="area" placeholder="Search child" />
				<button type="button" className="btn btn-primary">
					Search
				</button>
			</div>
			<Table hover>
				<thead>
					<tr>
						<th>ID</th>
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
					{children &&
						children.map((child) => {
							// console.log(child);
							const { _id, childID, gender, dateOfBirth, parentName, parentCNIC, address, contactNo } = child;
							return (
								<tr key={childID}>
									<td>{childID}</td>
									<td>{gender}</td>
									<td>{dateOfBirth}</td>
									<td>{parentName}</td>
									<td>{parentCNIC}</td>
									<td>{address}</td>
									<td>{contactNo}</td>
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
		</div>
	);
};

export default ViewChildren;
