import { SET_UPDATED_PROFILE, SET_PROFILE_INFO } from './UserProfile.types'

export const setUpdatedUserAction = updatedUser => {
    return {
        type: SET_UPDATED_PROFILE,
        payload: updatedUser
    }
}

export const setUserProfileInfoAction = userProfileInfo => {
    return {
        type: SET_PROFILE_INFO,
        payload: { userProfileInfo }
    }
}