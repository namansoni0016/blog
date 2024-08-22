import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPostAPI } from '../../Services/postAPI';
import { updatePostAPI } from '../../Services/postAPI';

const UpdatePost = () => {
    //Getting the post id
    const { postId  } = useParams();
    const {data} = useQuery({
        queryKey: ['fetch-post'],
        queryFn: () => fetchPostAPI(postId)
    });
    console.log(data);
    const postMutation = useMutation({
        mutationKey: ['update-post'],
        mutationFn: updatePostAPI,
    });
    // Form using formik 
    const formik = useFormik({
        initialValues: {
            title: data?.postFound?.title || "",
            description: data?.postFound?.description || "",
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required!'),
            description: Yup.string().required('Description is required!'),
        }),
        onSubmit: (values) => {
            const postData = {
                title: values.title,
                description: values.description,
                postId,
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
    const error = postMutation.error
    return (
        <div>
            <h1>You are editing - {data?.postFound.title}</h1>
            <div>
            {isLoading && <p>Loading...</p>}
            {isSuccess && <p>Post updated successfully!</p>}
            {isError && <p>{error.message}</p>}
            <form onSubmit={formik.handleSubmit}>
                <input type="text" name="title" placeholder='Enter title'
                {...formik.getFieldProps('title')}/>
                {/* Display error message */}
                {formik.touched.title && formik.errors.title && <span>{formik.errors.title}</span>}
                <input type="text" name="description" placeholder='Enter description'
                {...formik.getFieldProps('description')}/>
                {formik.touched.description && formik.errors.description && <span>{formik.errors.description}</span>}
                <button type='submit'>Update</button>
            </form>
        </div>
        </div>
    )
}

export default UpdatePost