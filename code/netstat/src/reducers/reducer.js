export default function rootReducer(state = {
  fetching: false,
  groupStatsByID: {},
  totalWrites: 0,
  wsConns: 0
}, action){

  switch(action.type) {

    case "FETCH_NETSTAT_DATA":
      return {
        ...state,
        fetching: true
      }

    case "GROUP_STATS":
      return {
        ...state,
        groupStatsByID: action.payload
      }

    case "TOTAL_WRITES":
      return {
        ...state,
        totalWrites: action.payload
      }

    case "WS_CONNS":
      return {
        ...state,
        wsConns: action.payload
      }

    default:
      return state
   }

}
