import { SET_UPDATED_PROFILE, SET_PROFILE_INFO } from './UserProfile.types'

const UpdatedUserReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_UPDATED_PROFILE:
            return {
                ...action.payload
            }
        case SET_PROFILE_INFO:
            return {
                ...action.payload
            }
        default:
            return state
    }
}

export default UpdatedUserReducer