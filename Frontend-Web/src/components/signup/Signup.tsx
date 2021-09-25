import React from "react";
import { Container, Row, Col } from "reactstrap";
import signUpImg from "../../assets/images/sign-up-img.jpg";
import "../../index.css";
import Footer from "../footer/Footer";
import FooterBottom from "../footer/FooterBottom";
import Header from "../header/Header";

const Signup = () => {
	return (
		<>
			<Header />
			<div className="signup-area">
				<Container>
					<div className="section-title">
						<h2>Create an account!</h2>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium quas cumque iste veniam id
							dolorem deserunt ratione error voluptas rem ullam possimus placeat, ut, odio
						</p>
					</div>
					<Row>
						<Col lg="6">
							<div className="signup-form">
								<form method="post">
									<Row>
										<Col md="12" sm="12">
											<div className="form-group">
												<select className="form-control">
													<option value="0">Sign up As</option>
													<option value="1">Hospital</option>
													<option value="2">Vaccine center</option>
												</select>
											</div>
										</Col>
										<Col md="12" sm="12">
											<div className="form-group">
												<input type="text" className="form-control" name="name" placeholder="Name" />
											</div>
										</Col>
										<Col md="12" sm="12">
											<div className="form-group">
												<input
													type="email"
													className="form-control"
													name="email"
													placeholder="Email Address"
												/>
											</div>
										</Col>
										<Col md="12" sm="12">
											<div className="form-group">
												<input
													type="password"
													className="form-control"
													name="password"
													placeholder="Password"
												/>
											</div>
										</Col>
										<Col md="12" sm="12">
											<div className="form-group">
												<input
													type="password"
													className="form-control"
													name="password"
													placeholder="Confirm Password"
												/>
											</div>
										</Col>
										<Col md="12" sm="12">
											<div className="form-group">
												<input type="text" className="form-control" name="name" placeholder="Address" />
											</div>
										</Col>
										<Col md="12" sm="12" className="form-condition">
											<div style={{ marginBottom: "20px" }} className="agree-label">
												<input type="checkbox" id="chb1" />
												<label htmlFor="chb1">
													I agree with your <a href="/privacy-policy"> Privacy Policy</a> &amp;
													<a href="/terms-conditions"> Terms Conditions</a>
												</label>
											</div>
										</Col>
										<Col md="12" sm="12">
											<a className="default-btn signup-btn" href="/login">
												Sign up
											</a>
										</Col>
										<Col md="12" sm="12">
											<p style={{ marginTop: "20px" }} className="account-desc">
												Already have an account? <a href="/login">Log In</a>
											</p>
										</Col>
									</Row>
								</form>
							</div>
						</Col>
						<Col lg="6">
							<div className="signup-img">
								<img src={signUpImg} />
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			<Footer />
			<FooterBottom />
		</>
	);
};

export default Signup;
