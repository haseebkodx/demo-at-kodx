/*eslint-disable eqeqeq*/
import React, { useState, useEffect } from 'react'
import { keydownHandler } from '../commonComponents/utility'

function OptionItems({
  mentorApplicationsCount,
  handleMentorApplicationCount,
  reviewerPhase,
  getApplicationOrAgreementDataHandler,
  resetOffsetHandler,
  activeOptionStatus
}) {
  const [activeHeader, setActiveHeader] = useState()

  useEffect(() => {
    setActiveStatus(activeOptionStatus)
  }, [reviewerPhase, activeOptionStatus])

  //Private Functions

  const getStatusCount = (status) => {
    const index =
      mentorApplicationsCount &&
      mentorApplicationsCount.findIndex(
        (item) =>
          item.status === status || item.mentor_protege_agr_status === status
      )
    return Number.isInteger(index) && index >= 0
      ? mentorApplicationsCount[index].count
      : 0
  }

  const getAllMentorApplicationsCount = () => {
    const filteredMentorApplicationsCount =
      mentorApplicationsCount &&
      mentorApplicationsCount
        .filter(
          (application) =>
            application.status === 'pending' ||
            application.status === 'approved' ||
            application.status === 'declined' ||
            application.mentor_protege_agr_status === 'pending' ||
            application.mentor_protege_agr_status === 'approved' ||
            application.mentor_protege_agr_status === 'declined'
        )
        .reduce((sum, app) => sum + parseInt(app.count), 0)

    let statusObj
    switch (activeHeader) {
      case 'pending-header':
        statusObj = mentorApplicationsCount && mentorApplicationsCount.find(
          (application) =>
            application.status === 'pending' ||
            application.mentor_protege_agr_status === 'pending'
        )
        break
      case 'approved-header':
        statusObj = mentorApplicationsCount && mentorApplicationsCount.find(
          (application) =>
            application.status === 'approved' ||
            application.mentor_protege_agr_status === 'approved'
        )
        break
      case 'rejected-header':
        statusObj = mentorApplicationsCount && mentorApplicationsCount.find(
          (application) =>
            application.status === 'declined' ||
            application.mentor_protege_agr_status === 'declined'
        )
        break
      default:
        break
    }

    if (activeHeader != 'mentor-mpp-header') {
      statusObj && handleMentorApplicationCount(parseInt(statusObj.count))
    } else {
      handleMentorApplicationCount(filteredMentorApplicationsCount)
    }

    return filteredMentorApplicationsCount
  }

  const updateActiveHeader = (event, headerState) => {
    setActiveHeader(headerState)

    let status
    switch (headerState) {
      case 'pending-header':
        status = 'pending'
        break
      case 'approved-header':
        status = 'approved'
        break
      case 'rejected-header':
        status = 'declined'
        break
    }

    resetOffsetHandler(status)
    getApplicationOrAgreementDataHandler(status)

    event.stopPropagation()
  }

  const setActiveStatus = status => {
    switch (status) {
      case 'pending':
        setActiveHeader('pending-header')
        break
      case 'approved':
        setActiveHeader('approved-header')
        break
      case 'declined':
        setActiveHeader('rejected-header')
        break
      default:
        setActiveHeader('mentor-mpp-header')
    }
  }

  const optionItems = [
    {
      id: 'allItems',
      labelId: 'all-items-label',
      name: 'reviewer-application-agreement-option-items',
      label: `All (${getAllMentorApplicationsCount()})`,
      value: 'mentor-mpp-header',
      onClick: (e) => updateActiveHeader(e, 'mentor-mpp-header'),
      onKeyDown: e => keydownHandler(e)
    },
    {
      id: 'pendingItems',
      labelId: 'pending-items-label',
      name: 'reviewer-application-agreement-option-items',
      label: `Pending (${getStatusCount('pending')})`,
      value: 'pending-header',
      onClick: (e) => updateActiveHeader(e, 'pending-header'),
      onKeyDown: e => keydownHandler(e)
    },
    {
      id: 'approvedItems',
      labelId: 'approved-items-label',
      name: 'reviewer-application-agreement-option-items',
      label: `Approved (${getStatusCount('approved')})`,
      value: 'approved-header',
      onClick: (e) => updateActiveHeader(e, 'approved-header'),
      onKeyDown: e => keydownHandler(e)
    },
    {
      id: 'rejectedItems',
      labelId: 'rejected-items-label',
      name: 'reviewer-application-agreement-option-items',
      label: `Declined (${getStatusCount('declined')})`,
      value: 'rejected-header',
      onClick: (e) => updateActiveHeader(e, 'rejected-header'),
      onKeyDown: e => keydownHandler(e)
    },
  ]

  const renderOptionItems = () => {
    return optionItems.map((optionItem) => {
      return (
        <div
          key={`${optionItem.id}_${reviewerPhase}`}
          className='col-md-2'
        >
          <label
            htmlFor={`${optionItem.id}_${reviewerPhase}`}
            tabIndex='0'
            onClick={optionItem.onClick}
            onKeyDown={optionItem.onKeyDown}
          >
            <input
              className='mr-2 focusable-item'
              type='radio'
              id={`${optionItem.id}_${reviewerPhase}`}
              value={optionItem.value}
              title={optionItem.value}
              checked={optionItem.value === activeHeader}
              onKeyDown={optionItem.onKeyDown}
            />
            {optionItem.label}
          </label>
        </div>
      )
    })
  }

  return (
    <div className='row my-3'>
      <div className='col-md-8'>
        <div className='row'>{renderOptionItems()}</div>
      </div>
    </div>
  )
}

export default OptionItems
