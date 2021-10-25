import React from "react";
import "./../../../index.css";

const BirthCertificate = () => {
	return (
		<>
			<button className="default-btn" onClick={() => window.print()}>
				Print
			</button>
			<div className="birth">
				<h1 className="heading">Certificate of Brith</h1>
				<h1 className="certificate-body">
					This is to certify that <br />
					________________________________________ <br />
					was born on the day of ___________________ <br />
					to ____________________ and ___________________ <br />
					in the year of ______________ in _____________________.
				</h1>
				<h2 className="sign">
					<b>
						Stamp and Signature <br /> of Hospital
					</b>
				</h2>
			</div>
			<div>
				<h1 className="heading">Vaccination Schedule</h1>
			</div>
		</>
	);
};

export default BirthCertificate;
