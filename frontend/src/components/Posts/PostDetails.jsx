import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPostAPI } from '../../Services/postAPI';

const PostDetails = () => {
    //Getting the post id
    const { postId  } = useParams();
    const {isError, isLoading, data, error, isSuccess} = useQuery({
        queryKey: ['fetch-post'],
        queryFn: () => fetchPostAPI(postId)
    });
    return (
        <div>
            <h1>{data?.postFound.title}</h1>
            <p>{data?.postFound.description}</p>
        </div>
    )
}

export default PostDetails