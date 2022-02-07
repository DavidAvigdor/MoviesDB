import React from 'react';
import '../css/myInput.scss';
export default function MyInput({ label, handleChange, value, clarification, ...other }) {
    return <div className="group ">
        <input
            className="form-input"
            onChange={handleChange}
            {...other} />
        {label.length > 0 ? <label className={`form-input-label ${value.length > 0 ? "shrink" : ""}`}> {label}:</label> : null}


    </div>
}
