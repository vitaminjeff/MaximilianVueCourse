export default {
   setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      // state.tokenExpiration = payload.tokenExpiration; // only needed from localStorage
      state.didAutoLogout = false; // this should trigger the watcher in App.vue
   },
   setAutoLogout(state) {
      state.didAutoLogout = true;
   }
};