import { query as queryUsers } from '@/services/user';
// import { info } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    // *fetchCurrent(_, { call, put }) {
    //   const response = yield call();
    //   if (response.status === 401) {
    //     localStorage.removeItem('token')
    //     localStorage.removeItem('userId')
    //   }
    //   yield put({
    //     type: 'saveCurrentUser',
    //     payload: response,
    //   });
    // },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
