export const setTokens = async (accessToken: string, refreshToken: string) => {
    return await fetch('/api/tokens', {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: JSON.stringify({ accessToken, refreshToken })
    }
    )
}

export const delTokens = async () => {
    return await fetch('/api/tokens', {
        method: 'DELETE',
        cache: 'no-cache',
        credentials: 'same-origin'
    }
    )
}