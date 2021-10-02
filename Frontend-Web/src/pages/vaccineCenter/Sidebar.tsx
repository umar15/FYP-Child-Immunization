import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";

const Sidebar = (props) => {
	return (
		<div style={{ height: props.height ? props.height : "800px" }} className="sidebar">
			<ul>
				<li>
					<Link className="link" to="/vaccinecenter">
						Children
					</Link>
				</li>
				<li>
					<Link className="link" to="/vaccinecenter/vaccines">
						Vaccine Stock
					</Link>
				</li>
				<li>
					<Link className="link" to="/vaccinecenter/campaigns">
						Campaigns
					</Link>
				</li>
				<li>
					<Link className="link" to="/vaccinecenter/wrokers">
						Polio Workers
					</Link>
				</li>
				{/* <li>
					<Link className="link" to="/admin/vaccinecenters">
						Vaccine Centers
					</Link>
				</li>
				<li>
					<Link className="link" to="/admin/vaccines">
						Vaccine Stock
					</Link>
				</li> */}
				{/* <li>
					<Link className="link" to="/admin/children">
						Children
					</Link>
				</li> */}
				<li>
					<Link className="link" to="/vaccinecenter/reports">
						Reports
					</Link>
				</li>
				<li>
					<Link className="link" to="/vaccinecenter/settings">
						Settings
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
