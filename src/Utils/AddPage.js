import React, { useState } from 'react';
import MyInput from './MyInput';
import ConfirmAndAbort from './ConfirmAndAbort';
export default function AddPage({ operation, objType, inputs, addFunction, cancelFunction, validataionFunction, confirmLabel, abortLabel }) {
    const [addParams, setAddParams] = useState(
        inputs.reduce((a, b) => {
            return ({ ...a, [b.name]: b.defaultValue ? b.defaultValue : "" })
        }, null)
    )
    const handleChange = (e) => {
        const { name, value } = e.target
        setAddParams((prev => ({ ...prev, [name]: value })))
    }
    function handleAddClick(event) {
        event.preventDefault();
        const inputs = document.querySelectorAll(".Add_Invalid_ToolTip")
        Array.from(inputs).forEach(input => {
            input.classList.remove("scaleUp")
        })
        const res = validataionFunction({ ...addParams })

        if (res[0]) {
            addFunction(addParams);
        }
        else {
            res[1].forEach(invalidData => {
                const p = document.getElementById(`Add_${objType}-${invalidData}_Div`)
                p.classList.add("scaleUp")
            })
        }


    }
    const Header = () => {
        if (operation === "Sign Up")
            return <div style={{ marginBottom: "25px" }}><h2 className="mr-1 bold-title fix-width"> Sign Up</h2></div>
        if (operation === "Add" && objType)
            return <div className="mr-1 bold-title fix-width"> Add New {objType}:</div>
        if (operation === "Edit" && objType)
            return <div className="mr-1 bold-title fix-width">Edit {objType}:</div>
        return null
    }
    return (<div className="Edit_User-Main_Div">
        {Header()}

        <div className="Edit_User-Contents">
            <form onSubmit={handleAddClick}>

                {inputs.map(({ type, name, label, clarification, defaultValue }) => {

                    return (<div key={`${name} ${label} ${type}`} style={{ position: "relative" }}>

                        <div id={`Add_${objType}-${name[0].toUpperCase()}_Div`} className=" Add_Invalid_ToolTip">

                            <MyInput
                                type={type}
                                name={name}
                                label={label}
                                clarification={clarification}
                                value={addParams[name]}
                                defaultValue={defaultValue}
                                handleChange={handleChange} />
                        </div>
                    </div>)
                })}
                {inputs.map(({ clarification }) => {
                    return clarification ? <span key={clarification} className="Add_Movie-Genres_Format_ToolTip">{clarification}</span> : null
                })}
                <ConfirmAndAbort handleAbort={cancelFunction} confirmLabel={confirmLabel} abortLabel={abortLabel} />
            </form>

        </div>
    </div >
    );
}

