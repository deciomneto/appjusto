import { ManagerProfile, WithId } from '@appjusto/types';
import { AnyAction } from 'redux';
import { MANAGER_PROFILE_UPDATED, USER_AUTH_STATE_CHANGED } from '../user/actions';
import { BusinessState } from './types';

const initialState: BusinessState = {};

export default function (state: BusinessState = initialState, action: AnyAction): BusinessState {
  console.log('BUSINESS REDUCER', action.type);
  const { type, payload } = action;
  switch (type) {
    case MANAGER_PROFILE_UPDATED: {
      const manager = Object.assign({}, state.manager, payload?.profile) as WithId<ManagerProfile>;
      return { ...state, manager };
    }
    case USER_AUTH_STATE_CHANGED: {
      if (!payload) return { ...state, manager: undefined };
      return state;
    }
    default:
      return state;
  }
}