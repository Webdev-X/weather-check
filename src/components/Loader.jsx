import React from 'react'
import { TailSpin } from 'react-loading-icons';

export const Loader = () => (
  <div className="flex justify-center items-center h-64">
    <TailSpin stroke="#3B82F6" speed={0.75} />
  </div>
);