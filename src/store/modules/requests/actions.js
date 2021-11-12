export default {
   async contactCoach(context, payload) {
      const newRequest = {
         // id: new Date().toISOString(), // dummy id for now
         userEmail: payload.email,
         message: payload.message
      };

      const response = await fetch(`${process.env.VUE_APP_API_URL}/requests/${payload.coachId}.json`, {
         method: 'POST', // add a new item, not an upsert
         body: JSON.stringify(newRequest)
      });

      const responseData = await response.json();
      
      if (!response.ok) {
         const error = new Error(responseData.message || 'Failed to send request.');
         throw error;
      }

      // firebase returns a new unique generated id
      newRequest.id = responseData.name;
      newRequest.coachId = payload.coachId; // add to local data


      context.commit('addRequest', newRequest);
   },
   async fetchRequests(context) {
      const coachId = context.rootGetters.userId;
      const response = await fetch(`${process.env.VUE_APP_API_URL}/requests/${coachId}.json`);
      const responseData = await response.json();

      if (!response.ok) {
         const error = new Error(responseData.message || 'Failed to fetch requests.');
         throw error;
      }

      // transform data for use locally
      const requests = [];

      for (const key in responseData) {
         const request = {
            id: key,
            coachId: coachId,
            userEmail: responseData[key].userEmail,
            message: responseData[key].message
         };

         requests.push(request);
      }

      // fake delay
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(500);
      
      context.commit('setRequests', requests);
   }
};