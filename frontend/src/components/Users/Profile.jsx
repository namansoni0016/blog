import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { checkAuthStatusAPI } from '../../Services/usersAPI';
import { useDispatch } from 'react-redux';
import { isAuthenticated } from '../../redux/slices/authSlices';

const Profile = () => {
    const {isError, isLoading, data, error, isSuccess, refetch} = useQuery({
        queryKey: ['user-auth'],
        queryFn: checkAuthStatusAPI,
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(isAuthenticated(data));
    }, [data]);
    return (
        <div>Profile</div>
    )
}

export default Profile