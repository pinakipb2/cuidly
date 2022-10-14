import React from 'react';
import { BsCircleFill } from 'react-icons/bs';

const Badge = ({ accountType }) => {
  const badgeVariant = {
    PREMIUM: 'PREMIUM',
    FREE: 'FREE',
  };
  const badgeBG = {
    [badgeVariant.FREE]: 'bg-green-200',
    [badgeVariant.PREMIUM]: 'bg-indigo-200',
  };
  const badgeText = {
    [badgeVariant.FREE]: 'text-green-700',
    [badgeVariant.PREMIUM]: 'text-indigo-700',
  };
  const badgeIcon = {
    [badgeVariant.FREE]: 'text-green-500',
    [badgeVariant.PREMIUM]: 'text-indigo-500',
  };
  return (
    <>
      <div className={`flex justify-center items-center ${badgeBG[accountType] + ' ' + badgeText[accountType]} rounded-3xl px-3 py-0.5 w-fit text-xs font-medium gap-1`}>
        <span className={`text-xs ${badgeIcon[accountType]}`}>
          <BsCircleFill size={6} />
        </span>
        {accountType}
      </div>
    </>
  );
};

export default Badge;
