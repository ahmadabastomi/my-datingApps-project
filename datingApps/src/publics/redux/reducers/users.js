const initialState = {
    data: {},
    isLoading: false,
    isError: false,
    profile: {},
    key: {},
    location: {},
    avatar: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'POST_USER_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'POST_USER_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'POST_USER_FULFILLED':
            return {
                ...state,
                isLoading: false,
            }
        case 'GET_USER_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_USER_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'GET_USER_FULFILLED':
            return {
                ...state,
                isLoading: false,
                key: action.payload.data
            }
        case 'POST_LOGIN_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'POST_LOGIN_REJECTED':
            return {
                ...state,
                isLoading: false,
                data: action.payload.data
            }
        case 'POST_LOGIN_FULFILLED':
            return {
                ...state,
                isLoading: false,
                data: action.payload.data
            }
        case 'GET_PROFILE_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_PROFILE_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'GET_PROFILE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                profile: action.payload.data
            }
        case 'PATCH_PROFILE_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'PATCH_PROFILE_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'PATCH_PROFILE_FULFILLED':
            return {
                ...state,
                isLoading: false,
            }
        case 'POST_LOCATION_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'POST_LOCATION_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'POST_LOCATION_FULFILLED':
            return {
                ...state,
                isLoading: false,
            }
        case 'GET_LOCATION_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_LOCATION_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'GET_LOCATION_FULFILLED':
            return {
                ...state,
                isLoading: false,
                location: action.payload.data
            }
        case 'PATCH_LOCATION_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'PATCH_LOCATION_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'PATCH_LOCATION_FULFILLED':
            return {
                ...state,
                isLoading: false,
            }
        case 'PATCH_AVATAR_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'PATCH_AVATAR_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'PATCH_AVATAR_FULFILLED':
            return {
                ...state,
                isLoading: false,
            }
        case 'GET_AVATAR':
            return {
                ...state,
                isLoading: false,
                avatar: action.payload
            }
        default:
            return state
    }
}