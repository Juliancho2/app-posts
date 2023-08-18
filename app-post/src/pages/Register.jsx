import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import MessageErrorValidate from '../components/MessageErrorValidate'
import { useForm } from '../hooks/useForm'
import style from  './register.module.css'

const initialForm = {
    name: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
    avatar: ""
}
const validateForm = (form) => {
    let errors = {}
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexLastName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexusername = /^[a-zA-Z0-9._-]{3,15}$/
    let regexPassword = /^.{4,}$/

    if (!form.name.trim()) {
        errors.name = "The field name is required";
    } else if (!regexName.test(form.name.trim())) {
        errors.name = "Name is invalided"
    }
    if (!form.lastname.trim()) {
        errors.lastname = "The field lastname is required";
    } else if (!regexLastName.test(form.lastname.trim())) {
        errors.lastname = "Lastname is invalided"
    }
    if (!form.username.trim()) {
        errors.username = "The field username is required";
    } else if (!regexusername.test(form.username.trim())) {
        errors.username = "Username is invalided"
    }
    if (!form.password.trim()) {
        errors.password = "The field password is required";
    } else if (!regexPassword.test(form.password.trim())) {
        errors.password = "Password is invalided"
    }
    if (!form.confirmPassword.trim()) {
        errors.confirmPassword = "The field confirm password is required";
    } else if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match"

    return errors

}

const Register = ({ setChangeForm }) => {
    const { form,
        errors,
        response,
        handleChange,
        handleBlur,
        handleSubmit } = useForm(initialForm, validateForm);

    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <h2 className={style.title_register}>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name*</label>
                    <div>
                        <input name='name' value={form.name} type="text" onBlur={handleBlur} onChange={handleChange} />
                    </div>
                    <label>Lastname*</label>
                    <div>
                        <input name='lastname' value={form.lastname} type="text" onBlur={handleBlur} onChange={handleChange} />
                    </div>
                    <label>Username*</label>
                    <div>
                        <input name='username' value={form.username} type="text" autoComplete='username' onBlur={handleBlur} onChange={handleChange} />
                    </div>
                    <label id='password'>Password*</label>
                    <div>
                        <input name='password' value={form.password} type="password" autoComplete="new-password" onBlur={handleBlur} onChange={handleChange} />
                    </div>
                    <label>Confirm password*</label>
                    <div>
                        <input name='confirmPassword' value={form.confirmPassword} type="password" autoComplete="new-password" onBlur={handleBlur} onChange={handleChange} />
                    </div>
                    <button>Sign up</button>
                </form>
                <div   className={style.btn_back}>
                    <p>Do you already have an account? <span onClick={() => setChangeForm(false)} >Log in</span></p>
                </div>
                {
                    (Object.keys(errors).length >= 1) && <MessageErrorValidate message={Object.values(errors)} />
                }
                {
                    response && <h4>"The user has been registered"</h4>
                }
            </div>
        </div>
    )
}

export default Register
