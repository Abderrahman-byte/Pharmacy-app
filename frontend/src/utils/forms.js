import React from 'react'

export const getfieldsComponents = (fields, onChangeCallback, initValues) => {
    return fields.map((fieldData) => {
        const value = typeof initValues === 'object' ? initValues[fieldData.name] : null
        const args = typeof fieldData.args === 'object' ? fieldData.args : {}

        return (
            <div key={fieldData.name} className="form-div">
                {fieldData.type === 'textarea' ? (
                    <textarea
                        defaultValue={value}
                        placeholder={fieldData.displayName}
                        onChange={onChangeCallback}
                        name={fieldData.name}
                        className="form-input"
                        id={fieldData.name + '-input'}
                        required={fieldData.isRequired}
                        {...args}
                    />
                ) : (
                    <input
                        defaultValue={value}
                        autoComplete="off"
                        placeholder={fieldData.displayName}
                        onChange={onChangeCallback}
                        type={fieldData.type}
                        name={fieldData.name}
                        className="form-input"
                        id={fieldData.name + '-input'}
                        {...args}
                        // required={fieldData.isRequired}
                    />
                )}
            </div>
        )
    })
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
    },
]

export const productFields = [
    {
        name: 'title',
        type: 'text',
        displayName: 'Title',
        isRequired: true,
        value: 'Doliprane',
    },
    {
        name: 'price',
        type: 'number',
        displayName: 'Price',
        isRequired: true,
        args: {
            step: 0.000001
        }
    },
    {
        name: 'quantity',
        type: 'number',
        displayName: 'Quantity',
        isRequired: true,
    },
    {
        name: 'description',
        type: 'textarea',
        displayName: 'Description',
        args: {
            style: {
                resize: 'none',
                height: '150px'
            }
        }
    },
]
