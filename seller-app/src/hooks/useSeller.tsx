import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Client, types } from '../sdks/seller-v1';
import { API_SERVER } from '../utilities/constants';

const client = new Client();

const useSeller = () => {
    const { sessionInfo, getRefreshToken } = useContext(AuthContext);

    useEffect(() => {
        (async () => {

            client.configure({
                baseURL: API_SERVER,
                headers: {
                    Authorization: `Bearer ${sessionInfo?.accessToken}`,
                },
                getNewToken: getRefreshToken
            })

        })()
    }, [sessionInfo?.accessToken])

    return { client, types }
}

export default useSeller;