import { createTextMask } from 'redux-form-input-masks';

const myCustomMaskDefinitions = {
  9: {
    regExp: /[0-9]/,
  },
  A: {
    regExp: /[A-Za-z]/,
    transform: char => char.toUpperCase(),
  },
  x: {
    regExp: /[A-Za-z0-9]/,
    transform: char => char.toUpperCase(),
  },
};

export const phoneMask = createTextMask({
  pattern: '999-999-9999',
  guide: false
});

export const zipMask = createTextMask({
  pattern: '99999',
  guide: false
})

export const dunsMask = createTextMask({
  pattern: '999999999',
  guide: false
})

export const yearsMask = createTextMask({
  pattern: '9999',
  guide: false
})

export const numbersMask = createTextMask({
  pattern: '99999999999999999999999999',
  guide: false
})


export const cageMask = createTextMask({
  pattern: 'xxxxx',
  guide: false,
  maskDefinitions: myCustomMaskDefinitions
})

export const naicsMask = createTextMask({
  pattern: '999999,999999,999999,999999',
  guide: false,
  maskDefinitions: myCustomMaskDefinitions
})


export const dateMask = createTextMask({
  pattern: '99/99/9999',
  guide: false
})

export const dollarMask = createTextMask({
  pattern: '$999999999999999999',
  guide: false
})