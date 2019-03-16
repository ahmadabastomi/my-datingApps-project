import axios from 'axios'

export const getImages = (id, location, token, gender) => {
    return async (dispatch) => {
        const res = await dispatch({
            type: 'GET_IMAGES',
            payload: axios.get(`http://192.168.43.229:3335/api/v1/images/${id}/${location}/${gender}`,
                { headers: { Authorization: `Bearer ${token}` } })
        })
        await dispatch(getTmpImages(res.value.data))
        const res2 = await dispatch(getImage(id, token))
        await dispatch(getTmpImage(res2.value.data))
    }
}

export const getImage = (id, token) => {
    return {
        type: 'GET_IMAGE',
        payload: axios.get(`http://192.168.43.229:3335/api/v1/image/${id}`,
            { headers: { Authorization: `Bearer ${token}` } })
    }
}

export const postLike = (id, token, data) => {
    return async (dispatch) => {
        const res = await dispatch({
            type: 'POST_LIKE',
            payload: axios.post(`http://192.168.43.229:3335/api/v1/like`, data,
                { headers: { Authorization: `Bearer ${token}` } })
        })
        await dispatch(getMatch(id, token))
    }
}

export const getMatch = (id, token) => {
    return {
        type: 'GET_MATCH',
        payload: axios.get(`http://192.168.43.229:3335/api/v1/match/${id}`,
            { headers: { Authorization: `Bearer ${token}` } })
    }
}

export const getLocationMatch = (id, token) => {
    return {
        type: 'GET_LOCMATCH',
        payload: axios.get(`http://192.168.43.229:3335/api/v1/get_location_match/${id}`,
            { headers: { Authorization: `Bearer ${token}` } })
    }
}

// export const postImage = (id, token, data) => {
//     return async (dispatch) => {
//         const res = await dispatch({
//             type: 'POST_IMAGE',
//             payload: axios.post(`http://192.168.43.229:3335/api/v1/image`, data,
//                 { headers: { Authorization: `Bearer ${token}` } })
//         })
//         await dispatch(getImage(id, token))
//     }
// }

export const deleteImage = (id, token, id_image) => {
    return async (dispatch) => {
        const res = await dispatch({
            type: 'DELETE_IMAGE',
            payload: axios.delete(`http://192.168.43.229:3335/api/v1/image/${id_image}`,
                { headers: { Authorization: `Bearer ${token}` } })
        })
        const res2 = await dispatch(getImage(id, token))
        await dispatch(getTmpImage(res2.value.data))
    }
}


export const getTmpImage = (data) => {
    return async (dispatch) => {
        const tmp = []
        for (let i = 0; i < data.length; i++) {
            const res = `http://192.168.43.229:3335/api/v1/get_image/${data[i].image}`
            tmp.push(res)
        }
        const res = await dispatch({
            type: 'USER_IMAGES',
            payload: tmp
        })
    }
}

export const uploadImage = (id, token, data) => {
    return async (dispatch) => {
        const res = await dispatch({
            type: 'POST_IMAGE',
            payload: axios.post(`http://192.168.43.229:3335/api/v1/upload_image`, data,
                { headers: { Authorization: `Bearer ${token}` } })
        })
        const res2 = await dispatch(getImage(id, token))
        await dispatch(getTmpImage(res2.value.data))
    }
}

export const getTmpImages = (data) => {
    return async (dispatch) => {
        const tmp = []
        for (let i = 0; i < data.length; i++) {
            const res = `http://192.168.43.229:3335/api/v1/get_image/${data[i].image}`
            tmp.push(res)
        }
        const res = await dispatch({
            type: 'ALL_IMAGES',
            payload: tmp
        })
    }
}

