import React from 'react';
import './Title.css';




export default function Title( {username, title} ) {

	return (
		<div className="titleWrapper">

			<h1>{title}<div className="color">{username}</div></h1>
            
			
		</div>
	);
}


