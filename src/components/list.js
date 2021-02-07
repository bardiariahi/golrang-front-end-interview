import React from 'react';

export default (props) => {
    const onChange = (e) => {
        const username = e.target.value;
        props.onChange(username);
    }
    return (
            <select onChange={onChange} className="ml-5">
                {props.usernames.map((username)=>  (<option>{username}</option>))}
            </select>
    );
};

