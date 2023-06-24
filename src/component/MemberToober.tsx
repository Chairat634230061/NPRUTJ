import { FC } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface MemberTooberProps {
  whenAdd: () => void;
  whenRefresh: () => void;
}

const MemberToober: FC<MemberTooberProps> = ({ whenAdd, whenRefresh }) => {
  return (
    <div className="flex space-x-2 m-5">
      <button className="flex items-center" onClick={whenAdd}>
        <span className="text-sm">App</span>
      </button>
      <button className="flex items-center" onClick={whenRefresh}>
        <ArrowPathIcon className="w-5 h-5 mr-1" />
        <span className="text-sm">Refresh</span>
      </button>
    </div>
  );
};

export { MemberToober };
