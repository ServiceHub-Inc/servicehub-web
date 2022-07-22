import { showNotification } from '@mantine/notifications';
import { MdCheck, MdCancel, MdWarning } from 'react-icons/md';
import React from 'react';

const notify = {
  success: (props) => {
    showNotification({
      color: 'white',
      icon: <MdCheck className="w-6 h-6 " />,
      ...props,
      radius: 'md',
      classNames: {
        title: 'text-white text-[16px]',
        root: 'bg-green-500 before:bg-white p-3',
        body: 'bg-green-500',
        icon: 'text-green-500  font-bold bg-white',
        loader: 'bg-green-500',
        description: 'text-white  font-bold',
        closeButton: 'text-white hover:bg-white hover:text-green-500',
      },
    });
  },
  warn: (props) => {
    showNotification({
      color: 'white',

      icon: <MdWarning className="w-6 h-6   " />,
      ...props,
      radius: 'md',
      classNames: {
        title: 'text-white text-[16px]',
        root: 'bg-yellow-400 before:bg-white p-3',
        body: 'bg-yellow-400',
        icon: 'bg-yellow-400  font-bold text-white',
        loader: 'bg-yellow-400',
        description: 'text-white  font-bold',
        closeButton: 'text-white hover:bg-white hover:text-yellow-400',
      },
    });
  },
  error: (props) => {
    showNotification({
      color: 'white',

      icon: <MdCancel className="w-6 h-6 " />,
      ...props,
      radius: 'md',
      classNames: {
        title: 'text-white text-[16px]',
        root: 'bg-red-500 before:bg-white p-3',
        body: 'bg-red-500',
        icon: 'text-red-500  font-bold bg-white',
        loader: 'bg-red-500',
        description: 'text-white  font-bold',
        closeButton: 'text-white hover:bg-white hover:text-red-500',
      },
    });
  },
};

export default notify;
