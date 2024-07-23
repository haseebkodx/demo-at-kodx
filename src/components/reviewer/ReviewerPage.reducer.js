import { 
    SET_REVIEWER_MENTOR_APPLICATION_PAGE, 
    SET_REVIEWER_MENTOR_PROTEGE_AGREEMENT_PAGE, 
    SET_REVIEWER_MENTOR_APPLICATION_STATUS, 
    SET_REVIEWER_MENTOR_PROTEGE_AGREEMENT_STATUS
} from './ReviewerPage.types'

const initialState = {
    mentorAppSummaryPage: 0,
    mentorProtegeSummaryPage: 0,
    mentorAppStatus: undefined,
    mentorProtegeAgrStatus: undefined
}

const UpdateReviewerPage = (state = initialState, action) => {
    switch (action.type) {
        case SET_REVIEWER_MENTOR_APPLICATION_PAGE:
            return {
                ...state,
                ...action.payload
            }
        case SET_REVIEWER_MENTOR_PROTEGE_AGREEMENT_PAGE:
            return {
                ...state,
                ...action.payload
            }
        case SET_REVIEWER_MENTOR_APPLICATION_STATUS:
            return {
                ...state,
                ...action.payload
            }
        case SET_REVIEWER_MENTOR_PROTEGE_AGREEMENT_STATUS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default UpdateReviewerPage