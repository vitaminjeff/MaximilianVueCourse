export default {
   contactCoach(context, payload) {
      const newRequest = {
         id: new Date().toISOString(), // dummy id for now
         coachId: payload.coachId,
         userEmail: payload.email,
         message: payload.message
      };

      context.commit('addRequest', newRequest);
   }
};