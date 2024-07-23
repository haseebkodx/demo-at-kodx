
export const keydownHandler = (e, keydownHandlerCallback) => {
    const keycode = e.key
    if (keycode === 'Enter') {
        if(keydownHandlerCallback && typeof keydownHandlerCallback === 'function') {
            keydownHandlerCallback(e)
        }
        else {
            e.currentTarget.click()
        }
        e.preventDefault()
        e.stopPropagation()
    }
}

export const keydownElReferenceHandler = (e, elementReference) => {
    const keycode = e.key
    if (keycode === 'Enter') {
        elementReference.click()
        e.preventDefault()
        e.stopPropagation()
    }
}