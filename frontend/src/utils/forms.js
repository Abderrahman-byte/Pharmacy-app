import React from 'react'

export const getfieldsComponents = (fields, onChangeCallback) => {
    return fields.map((fieldData) => <div key={fieldData.name} className='form-div'>
        {/* <label htmlFor={fieldData.name + '-input'}>{fieldData.displayName}</label> */}
        <input autoComplete='off' placeholder={fieldData.displayName} onChange={onChangeCallback} type={fieldData.type} name={fieldData.name} className='form-input' id={fieldData.name + '-input'} required={fieldData.isRequired} />
    </div>)
}

export const registerFields = [
    {
        name: 'username',
        type: 'text',
        displayName: 'Username',
        isRequired: true,
    },
    {
        name: 'firstname',
        type: 'text',
        displayName: 'Firstname',
        isRequired: true,
    },
    {
        name: 'lastname',
        type: 'text',
        displayName: 'Lastname',
        isRequired: true,
    },
    {
        name: 'email',
        type: 'email',
        displayName: 'Email Address',
        isRequired: true,
    },
    {
        name: 'password',
        type: 'password',
        displayName: 'Password',
        isRequired: true,
    },
    {
        name: 'password2',
        type: 'password',
        displayName: 'Password Confirmation',
        isRequired: true,
    },
]


export const loginFields = [
    {
        name: 'username',
        type: 'text',
        displayName: 'Username',
        isRequired: true,
    },
    {
        name: 'password',
        type: 'password',
        displayName: 'Password',
        isRequired: true,
    }
]
