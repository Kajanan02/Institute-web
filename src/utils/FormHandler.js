import {useEffect, useState} from 'react';
import {isEmpty, isFunction} from "./utils";

const FormHandler = (callback, validate) => {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            setIsSubmitting(false);
            callback();
        }
    }, [errors]);

    useEffect(() => {
        form.isSubmitted = isSubmitted;
    }, [isSubmitted]);

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        setIsSubmitted(true);
        setIsSubmitting(true);
        !isEmpty(values) && Object.keys(values).forEach(key => {
            if (typeof values[key] === "string") {
                values[key] = values[key].trimEnd();
            }
        });
        setErrors(validate(values));
    };

    function checkDirty(errorsI, isSubmittedI, formI) {
        if (isSubmittedI) {
            return errorsI;
        }
        for (let property in errorsI) {
            if (formI[property] && formI[property].dirty) {
            } else {
                delete errorsI[property];
            }
        }
        return errorsI;
    }

    const handleKeyDown = (event) => {
        ["e", "E", "+", "-"].includes(event.key) && event.preventDefault()
    };

    const handleChange = (event) => {
        if (isFunction(event.persist)) {
            event.persist();
        }
        event.target.type && (event.target.value = event.target.value ? event.target.value.trimStart() : '');

        setValues(values => ({...values, [event.target.name]: event.target.value}));
        setErrors(checkDirty(validate({...values, [event.target.name]: event.target.value}), isSubmitted, form));
        setIsSubmitting(false);
    };

    const setValue = (value) => {
        setValues(values => ({...values, ...value}));
        setErrors(checkDirty(validate({...values, ...value}), isSubmitted, form));
        setIsSubmitting(false);
    };

    const refresh = () => {
        setValues(values => ({...values}));
        setErrors(checkDirty(validate({...values}), isSubmitted, form));
        setIsSubmitting(false);
    };

    const initForm = (values) => {
        setValues(values);
        setErrors({});
        setForm({});
        setIsSubmitted(false);
        setIsSubmitting(false);
    };

    const handleOnBlur = (event) => {
        if (isFunction(event.persist())) {
            event.persist();
        }
        setErrors(checkDirty(validate({...values, [event.target.name]: event.target.value}), isSubmitted, {
            ...form,
            [event.target.name]: {dirty: true}
        }));
        setForm(form => ({...form, [event.target.name]: {dirty: true}}));
        setIsSubmitting(false);
    };

    const deleteErrors = (error) => {
        if (!error || isEmpty(error)) return;
        Object.keys(error).forEach(key => delete form[key]);
        setErrors({});
    };


    return {
        handleChange,
        handleOnBlur,
        handleSubmit,
        initForm,
        setValue,
        deleteErrors,
        handleKeyDown,
        refresh,
        values,
        errors,
        form,
    }
};

export default FormHandler;
