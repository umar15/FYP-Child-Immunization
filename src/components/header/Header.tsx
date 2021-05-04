import React from "react";

const Header = () => {
	return (
		<header className="header-area fixed-top">
			<div className="nav-area four">
				<div id="navbar" className="navbar-area">
					<div className="main-nav">
						<nav className="navbar navbar-expand-lg navbar-light">
							<div className="container">
								<a className="navbar-brand" href="/">
									<img src="/img/logo-two.png" alt="logo" />
								</a>
								<button
									className="navbar-toggler navbar-toggler-right collapsed"
									type="button"
									data-toggle="collapse"
									data-target="#navbarSupportedContent"
									aria-controls="navbarSupportedContent"
									aria-expanded="false"
									aria-label="Toggle navigation"
								>
									<span className="icon-bar top-bar"></span>
									<span className="icon-bar middle-bar"></span>
									<span className="icon-bar bottom-bar"></span>
								</button>
								<div className="collapse navbar-collapse" id="navbarSupportedContent">
									<ul className="navbar-nav m-auto">
										<li className="nav-item">
											<a className="nav-link" href="/index-4#">
												Home <i className="bx bx-plus"></i>
											</a>
											<ul className="dropdown-menu">
												<li className="nav-item">
													<a className="nav-link" href="/">
														Home 1 (Emergency Medical Clinic)
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/index-2">
														Home 2 (Covid-19 Treatment Clinic)
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/index-3">
														Home 3 (Covid-19 Test Center)
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link active" href="/index-4">
														Home 4 (Vaccination Center/Clinic)
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/index-5">
														Home 5 (Doctors Directory Listing)
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/index-6">
														Home 6 (Health Charity Event)
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/index-7">
														Home 7 (Medical Research)
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/index-8">
														Home 8 (Dental Clinic)
													</a>
												</li>
											</ul>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="/about">
												About
											</a>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="/index-4#">
												Pages <i className="bx bx-plus"></i>
											</a>
											<ul className="dropdown-menu">
												<li className="nav-item">
													<a className="nav-link" href="/pricing">
														Pricing
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/testimonials">
														Testimonials
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/doctors">
														Doctors
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/appointment">
														Appointment
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/faq">
														FAQs
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/index-4#">
														User <i className="bx bx-plus"></i>
													</a>
													<ul className="dropdown-menu">
														<li className="nav-item">
															<a className="nav-link" href="/sign-in">
																Sign In
															</a>
														</li>
														<li className="nav-item">
															<a className="nav-link" href="/sign-up">
																Sign Up
															</a>
														</li>
														<li className="nav-item">
															<a className="nav-link" href="/recover-password">
																Recover Password
															</a>
														</li>
													</ul>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/coming-soon">
														Coming Soon
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/terms-conditions">
														Terms &amp; Conditions
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/privacy-policy">
														Privacy Policy
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/404">
														404 Error Page
													</a>
												</li>
											</ul>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="/index-4#">
												Services <i className="bx bx-plus"></i>
											</a>
											<ul className="dropdown-menu">
												<li className="nav-item">
													<a className="nav-link" href="/services-1">
														Services Style One
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/services-2">
														Services Style Two
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/services-3">
														Services Style Three
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/service-details">
														Service Details
													</a>
												</li>
											</ul>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="/index-4#">
												Doctors <i className="bx bx-plus"></i>
											</a>
											<ul className="dropdown-menu">
												<li className="nav-item">
													<a className="nav-link" href="/doctors-1">
														Doctors Style One
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/doctors-2">
														Doctors Style Two
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/doctors-3">
														Doctors Style Three
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/doctor-details">
														Doctors Details
													</a>
												</li>
											</ul>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="/index-4#">
												Blog <i className="bx bx-plus"></i>
											</a>
											<ul className="dropdown-menu">
												<li className="nav-item">
													<a className="nav-link" href="/blog-grid">
														Blog Grid
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/blog-left-sidebar">
														Blog Left Sidebar
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/blog-right-sidebar">
														Blog Right Sidebar
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="/blog-details">
														Blog Details
													</a>
												</li>
											</ul>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="/contact">
												Contact
											</a>
										</li>
									</ul>
									<div className="others-option">
										<div className="subscribe">
											<a className="default-btn" href="/index-4#">
												Get A Quote
											</a>
										</div>
									</div>
								</div>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
