import React from 'react';
import Icon from "./icon.svg";
import Icon_2 from "./icon-2.svg"
import Icon_3 from "./icon-3.svg"
import Icon_4 from "./icon-4.svg"
import "./sidebar.css"

function Sidebar() {
    return (
            <nav className='side_nav_bar'>
                
				<ul className="side_nav_links">
					<li className="side_link"> <img src={Icon} /></li>
					<li className="side_link"><img src={Icon_2} /></li>
					<li className="side_link"><img src={Icon_3} /></li>
					<li className="side_link"><img src={Icon_4} /></li>
				</ul>
                <div className='copyrights'>
                    <p>copyright,SportSee2000</p>
                </div>
			</nav>
      
    );
}
export default Sidebar;