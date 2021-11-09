export default {
   registerCoach(context, data) {
      const coachData = {
         // id: new Date().toISOString(),
         id: 'c3', // dummy hard coded data for now
         firstName: data.first,
         lastName: data.last,
         description: data.desc,
         hourlyRate: data.rate,
         areas: data.areas
      };

      context.commit('registerCoach', coachData);
   }
};