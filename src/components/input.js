import React from 'react'

const Input = props => {
    return (
        <div className='form-group input-form-group' style={{ display: props.display }}>
            <label htmlFor={props.name} className='form-label' style={props.label_style}>
                {props.title}
            </label>
            <input
                className={props.className}
                id={props.name}
                name={props.name}
                type={props.type}
                value={props.value}
                onChange={props.handleChange}
                placeholder={props.placeholder}
                disabled={props.disabled}
                style={props.style}
            />
        </div>
    )
}

export default Input
