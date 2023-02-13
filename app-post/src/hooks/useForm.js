import { useState } from 'react'
import { avatarGenerate } from '../services/avatarGenerateServices';
import registerServices from '../services/registerServices';

const useForm = (initialForm, validateForm) => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };
    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validateForm(form))
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validateForm(form))
        try {
            if (Object.keys(errors).length === 0) {
                const urlAvatar = await avatarGenerate(form.name, form.lastname)
                form.avatar = urlAvatar
                setLoading(true);

                const register = await registerServices.register(form)

                setLoading(false);
                setResponse(true);
                setForm(initialForm);
                setTimeout(() => setResponse(false), 5000)
            } else return;
        } catch (error) {
            console.log(error)
        }

    };

    return {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit,
    }
}

export { useForm }
