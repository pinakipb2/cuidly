import React from 'react';
import { buttonVariant } from '../../../utils';

const colors = {
  [buttonVariant.PRIMARY]: 'bg-blue-700',
  [buttonVariant.SUCCESS]: 'bg-green-700',
  [buttonVariant.DANGER]: 'bg-red-700',
};

const Button = ({ buttonText, isDisabled = false, variant = buttonVariant.PRIMARY, className = '', onClick = function () {}, isLoading = false, loadingText = 'Loading...' }) => {
  return (
    <button
      className={`flex items-center place-items-center justify-center ${colors[variant]} ${className} w-1/6 rounded-md shadow-xl mt-2 py-2 text-white font-semibold disabled:bg-opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90`}
      onClick={() => {
        onClick();
      }}
      disabled={isDisabled}
    >
      {isLoading && (
        <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {isLoading ? loadingText : buttonText}
    </button>
  );
};

export default Button;
