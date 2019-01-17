import React from 'react';


function ErrorItem(props) {
    return <li>{props.value.field} - {props.value.message}</li>
}

function ErrorList(props) {
    let listItems = props.errors.map((error, index) =>
        <ErrorItem 
            key={index}
            value={error} />

    );
    
    return (
        <ul>
            {listItems}
        </ul>
    )
}

export default ErrorList;