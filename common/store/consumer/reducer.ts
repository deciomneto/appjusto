import { AnyAction } from 'redux';

import { USER_LOGGED_OUT, CONSUMER_PROFILE_UPDATED } from '../user/actions';
import { ConsumerState } from './types';
import Consumer from './types/Consumer';

const initialState: ConsumerState = {};

export default function (state: ConsumerState = initialState, action: AnyAction): ConsumerState {
  const { type, payload } = action;
  switch (type) {
    case CONSUMER_PROFILE_UPDATED: {
      const consumer = new Consumer(Object.assign({}, state.consumer?.getSource(), payload));
      return { ...state, consumer };
    }
    case USER_LOGGED_OUT: {
      return { ...state, consumer: undefined };
    }
    default:
      return state;
  }
}