import React from 'react';
import Login from './Users/Login';
import { useQuery } from '@tanstack/react-query';
import { checkAuthStatusAPI } from '../Services/usersAPI';
import { Navigate } from 'react-router-dom';
import AuthCheckingComponent from './AuthCheckingComponent';

const AuthRoute = ({ children }) => {
    const { isLoading, data } = useQuery({
        queryKey: ['user-auth'],
        queryFn: checkAuthStatusAPI,
    });
    if(isLoading) return <AuthCheckingComponent/>
    if(!data) {
        return <Navigate to='/login'/>
    }
    return children;
}

export default AuthRoute