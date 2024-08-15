import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllPostsAPI } from '../../Services/postAPI';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { deletePostAPI } from '../../Services/postAPI';

const PostList = () => {
    const {isError, isLoading, data, error, isSuccess, refetch} = useQuery({
        queryKey: ['lists-posts'],
        queryFn: fetchAllPostsAPI
    });
    const postMutation = useMutation({
        mutationKey: ['delete-post'],
        mutationFn: deletePostAPI,
    });
    //Delete Handler
    const deleteHandler = async (postId) => {
        postMutation.mutateAsync(postId).then(() => {
            //refetch
            refetch();
        }).catch((e) => console.log(e))
    }
    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {isSuccess && <p>Posts fetched!</p>}
            {error && <p>{error.message}</p>}
            {data?.posts.map((post) => {
                return (<div key={post?._id}>
                    <h2>{post?.title}</h2>
                    <p>{post?.description}</p>
                    <Link to={`/posts/${post?._id}`}><button>Edit</button></Link>
                    <button onClick={() => deleteHandler(post?._id)}>Delete</button>
                </div>)
            })}
        </div>
    )
}

export default PostList