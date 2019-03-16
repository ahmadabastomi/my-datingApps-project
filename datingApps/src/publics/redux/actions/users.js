import axios from 'axios'

export const postUser = (data) => {
    return {
        type: 'POST_USER',
        payload: axios.post('http://192.168.43.229:3335/api/v1/user',
            data
        )
    }
}

export const getUser = (email) => {
    return {
        type: 'GET_USER',
        payload: axios.get(`http://192.168.43.229:3335/api/v1/get_user/${email}`)
    }
}

export const postProfile = (data) => {
    return {
        type: 'POST_USER',
        payload: axios.post('http://192.168.43.229:3335/api/v1/profile',
            data
        )
    }
}

export const postLogin = (data) => {
    return async (dispatch) => {
        const res = await dispatch({
            type: 'POST_LOGIN',
            payload: axios.post('http://192.168.43.229:3335/api/v1/login',
                data
            )
        })
        const res2 = await dispatch(getProfile(res.value.data.id, res.value.data.token))
        await dispatch(getAvatar(res2.value.data.avatar))
    }
}

export const getProfile = (id, token) => {
    return {
        type: 'GET_PROFILE',
        payload: axios.get(`http://192.168.43.229:3335/api/v1/user/${id}`,
            { headers: { Authorization: `Bearer ${token}` } })
    }
}

export const patchProfile = (id, token, data) => {
    return async (dispatch) => {
        const res = await dispatch({
            type: 'PATCH_PROFILE',
            payload: axios.patch(`http://192.168.43.229:3335/api/v1/user/${id}`, data,
                { headers: { Authorization: `Bearer ${token}` } })
        })
        await dispatch(getProfile(id, token))
        //await dispatch(getAvatar(id))
    }
}

export const postLocation = (data) => {
    return {
        type: 'POST_LOCATION',
        payload: axios.post('http://192.168.43.229:3335/api/v1/location',
            data
        )
    }
}

export const getLocation = (id, token) => {
    return {
        type: 'GET_LOCATION',
        payload: axios.get(`http://192.168.43.229:3335/api/v1/location/${id}`,
            { headers: { Authorization: `Bearer ${token}` } })
    }
}

export const patchLocation = (id, token, data) => {
    return async (dispatch) => {
        const res = await dispatch({
            type: 'PATCH_LOCATION',
            payload: axios.patch(`http://192.168.43.229:3335/api/v1/location/${id}`, data,
                { headers: { Authorization: `Bearer ${token}` } })
        })
        await dispatch(getLocation(id, token))
    }
}

export const patchProfilePhoto = (id, token, data) => {
    return async (dispatch) => {
        const res = await dispatch({
            type: 'PATCH_AVATAR',
            payload: axios.patch(`http://192.168.43.229:3335/api/v1/profile/${id}`, data,
                { headers: { Authorization: `Bearer ${token}` } })
        })
        const res2 = await dispatch(getProfile(id, token))
        await dispatch(getAvatar(res2.value.data.avatar))
    }
}


export const getAvatar = (avatar) => {
    return {
        type: 'GET_AVATAR',
        payload: `http://192.168.43.229:3335/api/v1/get_avatar/${avatar}`,
    }
}





