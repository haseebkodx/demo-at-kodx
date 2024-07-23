export const displayRejectionReasonModal = (
  reason,
  setReasonFiles,
  setReasonText,
  setShowRejectionModal
) => {
  setReasonText(reason)
  setShowRejectionModal(true)
}

export const dismissRejectionReasonModal = (
  setReasonFiles,
  setReasonText,
  setShowRejectionModal
) => {
  setShowRejectionModal(false)
  setReasonFiles(null)
  setReasonText(null)
}
