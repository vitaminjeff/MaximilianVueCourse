export default {
   async login(context, payload) {
      // https://firebase.google.com/docs/reference/rest/auth
      const uri = `${process.env.VUE_APP_FIREBASE_ACCOUNTS_URL}:signInWithPassword?key=${process.env.VUE_APP_FIREBASE_API_KEY}`
      console.log(uri);

      const response = await fetch(uri, {
         method: 'POST',
         body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
         })
      });

      const responseData = await response.json();

      if (!response.ok) {
         console.log(responseData)
         const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
         throw error;
      }

      console.log(responseData);
      context.commit('setUser', {
         token: responseData.idToken,
         userId: responseData.localId,
         tokenExpiration: responseData.expiresIn
      });
   },
   async signup(context, payload) {
      // https://firebase.google.com/docs/reference/rest/auth
      const uri = `${process.env.VUE_APP_FIREBASE_ACCOUNTS_URL}:signUp?key=${process.env.VUE_APP_FIREBASE_API_KEY}`
      console.log(uri);

      const response = await fetch(uri, {
         method: 'POST',
         body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
         })
      });

      const responseData = await response.json();

      if (!response.ok) {
         console.log(responseData)
         const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
         throw error;
      }

      console.log(responseData);
      context.commit('setUser', {
         token: responseData.idToken,
         userId: responseData.localId,
         tokenExpiration: responseData.expiresIn
      });
   },
   logout(context) {
      context.commit('setUser', {
         token: null,
         userId: null,
         tokenExpiration: null,
      });
   }
};


