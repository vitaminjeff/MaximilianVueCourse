import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default {
   state() {
      return {
         userId: 'c3' // dummy id for now
      }
   },
   mutations,
   actions,
   getters
};