import React, {Fragment, UseState, UseEffect, useState} from 'react'

const Membre = ({nom, age, children, hideName, handleChange}) => {

    return (
        <Fragment>
            <h2 style={{
                backgroundColor: age < 10 ? 'yellow' : 'purple',
                color: age < 10 ? 'black' : 'white'
            }}>
                {nom.toUpperCase()} : {age}
            </h2>
            <input value={nom} onChange={handleChange} type="text"/>
            <button onClick={hideName}>X</button>
            {children ? <p>{children}</p> : <Fragment/>}

        </Fragment>
    )
}

export default Membre;