import React from 'react';
import "./style.css"

function ItemSection(props) {
    return (
        <div className='sectionTitle'>
            <p>
                {props.section}
            </p>
            <h2>
                {props.text}
            </h2>
        </div>
    );
}

export default ItemSection;