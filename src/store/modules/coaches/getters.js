export default {
   coaches(state) {
      return state.coaches;
   },
   hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
   },
   // isCoach(_, getters, _2, rootGetters) { // unused parameters, let linter know you have to take the arguments but aren't using them
   isCoach(state, getters, rootState, rootGetters) {
      const coaches = getters.coaches;
      const userId = rootGetters.userId;
      return coaches.some(coach => coach.id === userId);
   }
};