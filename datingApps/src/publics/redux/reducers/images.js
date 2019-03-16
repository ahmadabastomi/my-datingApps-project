const initialState = {
    data: [],
    myImage: [],
    myMatch: {},
    isLoading: false,
    isError: false,
    locmatch: [],
    imagematch: [],
    myImageUpload: [],
    allImagesUpload: [],
    matchAvatar: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_IMAGES_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_IMAGES_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'GET_IMAGES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                data: action.payload.data
            }
        case 'GET_IMAGE_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_IMAGE_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'GET_IMAGE_FULFILLED':
            return {
                ...state,
                isLoading: false,
                myImage: action.payload.data
            }
        case 'POST_LIKE_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'POST_LIKE_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'POST_LIKE_FULFILLED':
            return {
                ...state,
                isLoading: false,
            }
        case 'GET_MATCH_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_MATCH_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'GET_MATCH_FULFILLED':
            return {
                ...state,
                isLoading: false,
                myMatch: action.payload.data.tmpProfile,
                locmatch: action.payload.data.tmpLocation,
                imagematch: action.payload.data.tmpImage,
            }
        case 'GET_LOCMATCH_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_LOCMATCH_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'GET_LOCMATCH_FULFILLED':
            return {
                ...state,
                isLoading: false,
                locmatch: action.payload.data
            }
        case 'POST_IMAGE_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'POST_IMAGE_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'POST_IMAGE_FULFILLED':
            return {
                ...state,
                isLoading: false,
            }
        case 'DELETE_IMAGE_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'DELETE_IMAGE_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'DELETE_IMAGE_FULFILLED':
            return {
                ...state,
                isLoading: false,
            }
        case 'USER_IMAGES':
            return {
                ...state,
                isLoading: false,
                myImageUpload: action.payload
            }
        case 'ALL_IMAGES':
            return {
                ...state,
                isLoading: false,
                allImagesUpload: action.payload
            }


        default:
            return state
    }
}