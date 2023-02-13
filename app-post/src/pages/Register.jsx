import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MessageErrorValidate from '../components/MessageErrorValidate'
import { useForm } from '../hooks/useForm'
import './register.css'

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

const Register = () => {
    const { form,
        errors,
        response,
        handleChange,
        handleBlur,
        handleSubmit } = useForm(initialForm, validateForm);

    return (
        <div className='container'>
            <div className='wrapper'>
                <h2 className='title-register'>REGISTER</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name*</label>
                    <input name='name' value={form.name} type="text" onBlur={handleBlur} onChange={handleChange} />
                    <label>Lastname*</label>
                    <input name='lastname' value={form.lastname} type="text" onBlur={handleBlur} onChange={handleChange} />
                    <label>Username*</label>
                    <input name='username' value={form.username} type="text" autoComplete='username' onBlur={handleBlur} onChange={handleChange} />
                    <label id='password'>Password*</label>
                    <input name='password' value={form.password} type="password" autoComplete="new-password" onBlur={handleBlur} onChange={handleChange} />
                    <label>Confirm password*</label>
                    <input name='confirmPassword' value={form.confirmPassword} type="password" autoComplete="new-password" onBlur={handleBlur} onChange={handleChange} />
                    <button>SIGN UP</button>
                </form>
                <Link to='/' className='btn-back'><FontAwesomeIcon icon="fa-solid fa-left-long" /><small>Back</small></Link>
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