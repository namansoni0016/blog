import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";

const CreatePost = () => {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required!'),
            description: Yup.string().required('Description is required!'),
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    })
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <input type="text" name="title" placeholder='Enter title'
                {...formik.getFieldProps('title')}/>
                {/* Display error message */}
                {formik.touched.title && formik.errors.title && <span>{formik.errors.title}</span>}
                <input type="text" name="description" placeholder='Enter description'
                {...formik.getFieldProps('description')}/>
                {formik.touched.description && formik.errors.description && <span>{formik.errors.description}</span>}
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

export default CreatePost