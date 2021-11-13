export default {
   async login(context, payload) {
      context.dispatch('auth', {
         ...payload,
         mode: 'login'
      })
   },
   async signup(context, payload) {
      context.dispatch('auth', {
         ...payload,
         mode: 'signup'
      })
   },
   async auth(context, payload) {
      const mode = payload.mode;

      // https://firebase.google.com/docs/reference/rest/auth
      let url = `${process.env.VUE_APP_FIREBASE_ACCOUNTS_URL}:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}`;

      if (mode === 'signup') {
         url = `${process.env.VUE_APP_FIREBASE_ACCOUNTS_URL}:signUp?key=${process.env.VUE_APP_FIREBASE_API_KEY}`;
      }

      const response = await fetch(url, {
         method: 'POST',
         body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
         })
      });

      const responseData = await response.json();

      if (!response.ok) {
         const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
         throw error;
      }

      // store stuff not just in vuex
      // but also in some storage that survives page reloads, i.e. localStorage
      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);

      context.commit('setUser', {
         token: responseData.idToken,
         userId: responseData.localId,
         tokenExpiration: responseData.expiresIn
      });
   },
   tryLogin(context) {
      // get stuff not just from vuex
      // but also from storage that survives page reloads, i.e. localStorage
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (token && userId) {
         context.commit('setUser', {
            token: token,
            userId: userId,
            tokenExpiration: null
         });
      }
   },
   logout(context) {
      context.commit('setUser', {
         token: null,
         userId: null,
         tokenExpiration: null,
      });
   }
};


