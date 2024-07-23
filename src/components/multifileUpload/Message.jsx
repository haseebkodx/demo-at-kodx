import React from 'react';
import { Alert } from 'react-bootstrap';
import './multiFileUpload.scss';

const Message = ({ message, showMessage, hideMessage }) => {
  return (
    <>
      {showMessage ? (
        <Alert
          variant='info'
          className='message-alert'
          onClose={() => hideMessage()}
          dismissible
        >
          {message}
        </Alert>
      ) : null}
    </>
  );
};

export default Message;
