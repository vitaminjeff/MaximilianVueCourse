export default {
   login() {},
   async signup(context, payload) {
      
      const uri = `${process.env.VUE_APP_AUTH_SIGNUP_URL}?key=${process.env.VUE_APP_FIREBASE_API_KEY}`
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
         const error = new Error(responseData.message || 'Failed to authenticate.');
         throw error;
      }

      console.log(responseData);
      context.commit('setUser', {
         token: responseData.idToken,
         userId: responseData.localId,
         tokenExpiration: responseData.expiresIn
      });
   }
};


