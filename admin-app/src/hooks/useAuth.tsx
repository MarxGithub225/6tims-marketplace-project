import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Client, types } from '../sdks/auth-v1';

const client = new Client();

const useAuth = () => {
    const { sessionInfo, getRefreshToken } = useContext(AuthContext);

    useEffect(() => {
        (async () => {

            client.configure({
                headers: {
                    Authorization: `Bearer ${sessionInfo?.accessToken}`,
                },
                getNewToken: getRefreshToken
            })

        })()
    }, [sessionInfo?.accessToken])

    return { client, types }
}

export default useAuth;