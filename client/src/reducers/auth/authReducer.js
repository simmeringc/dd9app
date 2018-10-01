import { AUTH_USER } from '../../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case AUTH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
