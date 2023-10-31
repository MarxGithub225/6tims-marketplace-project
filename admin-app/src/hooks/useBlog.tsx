import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Client, types } from '../sdks/blog-v1';

const client = new Client();

const useBlog = () => {
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

export default useBlog;