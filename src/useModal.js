import { useState } from 'react';

const useModal = () => {
  // set state of showing modal
  const [isShowing, setIsShowing] = useState(false);

  const toggleModal = () => {
    setIsShowing(!isShowing);
  };

  return [isShowing, toggleModal];
};

export default useModal;
