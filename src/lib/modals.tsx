'use client'

import TweetModal from '@/components/TweetModal';
import { ModalFactoryActions } from './modalx/types';
import { ReactNode } from 'react';

export const modals: { [name: string]: (actions: ModalFactoryActions) => ReactNode } = {
  tweet: ({ close }) => <TweetModal close={close} />
}