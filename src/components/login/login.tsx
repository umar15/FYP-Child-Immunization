import React from "react";
import { Container, Row, Col } from "reactstrap";
import loginImg from "../../assets/images/login-img.jpg";
import "../../index.css";

const Login = () => {
	return (
		<div className="signup-area">
			<Container>
				<div className="section-title">
					<h2>Sign In Your Account!</h2>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium quas cumque iste veniam id
						dolorem deserunt ratione error voluptas rem ullam possimus placeat, ut, odio
					</p>
				</div>
				<Row>
					<Col lg="6">
						<div className="login-img">
							<img src={loginImg} />
						</div>
					</Col>
					<Col lg="6">
						<div className="login-form">
							<form method="post">
								<Row>
									<Col md="12" sm="12">
										<div className="form-group">
											<select className="form-control">
												<option value="0">Sign in As</option>
												<option value="1">Hospital</option>
												<option value="2">Vaccine center</option>
											</select>
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
									<Col lg="6" sm="12" className="form-condition">
										<div className="agree-label">
											<input type="checkbox" id="chb1" />
											<label htmlFor="chb1">Remember me</label>
										</div>
									</Col>
									<Col lg="6" sm="12">
										<a className="forget" href="/recover-password">
											Forgot my password?
										</a>
									</Col>
									<Col md="12" sm="12">
										<button className="default-btn signup-btn" type="submit">
											Log In
										</button>
									</Col>
									<Col md="12" sm="12">
										<p className="account-desc">
											Not a member? <a href="/log-in">Sign Up</a>
										</p>
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

export default Login;
