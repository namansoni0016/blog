import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createPostAPI } from '../../Services/postAPI';
import { useMutation } from '@tanstack/react-query';

const CreatePost = () => {
    const postMutation = useMutation({
        mutationKey: ['create-post'],
        mutationFn: createPostAPI
    })
    // Form using formik 
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
            const postData = {
                title: values.title,
                description: values.description,
            }
            postMutation.mutate(postData);
        }
    });
    // Get loading state
    const isLoading = postMutation.isPending
    // Get Error state
    const isError = postMutation.isError
    // Get success state
    const isSuccess = postMutation.isSuccess
    // Error
    const error = postMutation.error;
    const errorMsg = postMutation?.error?.response?.data?.message;
    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {isSuccess && <p>Post created successfully!</p>}
            {isError && <p>{errorMsg}</p>}
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