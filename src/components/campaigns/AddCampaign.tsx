import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../index.css";

const AddVaccineStock = () => {
	return (
		<div className="signup-area">
			<Container>
				<div className="section-title">
					<h2>Add Campaign</h2>
				</div>
				<Row>
					<Col>
						<div className="add-child-form">
							<form method="post">
								<Row>
									<Col md="12" sm="12">
										<div className="form-group">
											<select className="form-control">
												<option value="0">Campaign Status</option>
												<option value="1">Active</option>
												<option value="2">Inactive</option>
											</select>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<input type="text" className="form-control" name="area" placeholder="Campaign Area" />
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<input
												type="number"
												className="form-control"
												name="numWorkers"
												placeholder="No. of workers"
											/>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<input
												type="number"
												className="form-control"
												name="vaccineQuantity"
												placeholder="Vaccine Quantity"
											/>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<input
												type="date"
												className="form-control"
												name="start"
												placeholder="Campaign start date"
											/>
										</div>
									</Col>
									<Col md="12" sm="12">
										<div className="form-group">
											<input
												type="date"
												className="form-control"
												name="end"
												placeholder="Campaign end date"
											/>
										</div>
									</Col>

									<Col md="12" sm="12">
										<button className="default-btn add-stock-btn" type="submit">
											Add Campaign
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

export default AddVaccineStock;
