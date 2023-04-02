export const getAccessToken = () => {
    return localStorage.getItem('accessToken')
}

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken')
}

export const setAccessToken = (token: String) => {
    localStorage.setItem('accessToken', token)
}

export const setRefreshToken = (token: String) => {
    localStorage.setItem('refreshToken', token)
}