import { 
    SET_REVIEWER_MENTOR_APPLICATION_PAGE, 
    SET_REVIEWER_MENTOR_PROTEGE_AGREEMENT_PAGE, 
    SET_REVIEWER_MENTOR_APPLICATION_STATUS, 
    SET_REVIEWER_MENTOR_PROTEGE_AGREEMENT_STATUS 
} from './ReviewerPage.types'

export const setReviewerMentorApplicationPage = page => {
    return {
        type: SET_REVIEWER_MENTOR_APPLICATION_PAGE,
        payload: {
            mentorAppSummaryPage: page
        }
    }
}

export const setReviewerMentorProtegeAgreementPage = page => {
    return {
        type: SET_REVIEWER_MENTOR_PROTEGE_AGREEMENT_PAGE,
        payload: {
            mentorProtegeSummaryPage: page
        }
    }
}

export const setReviewerMentorApplicationStatus = status => {
    return {
        type: SET_REVIEWER_MENTOR_APPLICATION_STATUS,
        payload: {
            mentorAppStatus: status
        }
    }
}

export const setReviewerMentorProtegeAgreementStatus = status => {
    return {
        type: SET_REVIEWER_MENTOR_PROTEGE_AGREEMENT_STATUS,
        payload: {
            mentorProtegeAgrStatus: status
        }
    }
}