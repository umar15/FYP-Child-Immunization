import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../index.css";

const AddChild = () => {
	return (
		<div className="signup-area">
			<Container>
				<div className="section-title">
					<h2>Add Child Details</h2>
				</div>
				<Row>
					<Col>
						<div className="add-child-form">
							<form method="post">
								<Row>
									<Col md="12" sm="12">
										<div className="form-group">
											<select className="form-control">
												<option value="0">Gender</option>
												<option value="1">Male</option>
												<option value="2">Female</option>
											</select>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<input type="date" className="form-control" name="dob" placeholder="Date of Birth" />
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<input type="text" className="form-control" name="name" placeholder="Parent Name" />
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<input type="text" className="form-control" name="cnic" placeholder="Parent CNIC" />
										</div>
									</Col>

									<Col md="12" sm="12">
										<div className="form-group">
											<input
												type="text"
												className="form-control"
												name="contact"
												placeholder="Contact Number"
											/>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<input type="text" className="form-control" name="name" placeholder="Address" />
										</div>
									</Col>

									<Col md="12" sm="12">
										<button className="default-btn signup-btn" type="submit">
											Add child
										</button>
									</Col>
								</Row>
							</form>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default AddChild;
