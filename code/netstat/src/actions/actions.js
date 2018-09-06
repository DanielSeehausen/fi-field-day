import fetch from 'isomorphic-fetch'

export function FetchNetstatData() {
  return (dispatch) => {
    dispatch({type: 'FETCHING_NETSTAT_DATA'})

    return fetch('http://theapi.link/netstat')
    .then( res => res.json())
    .then( data => {
      let counter = 0;
      Object.values(data.groupStatsByID).map(datum => {
        datum["group"] = counter
        counter++
        dispatch({ type: 'ADD_GROUP_STATS', payload: datum })
      })
      dispatch({type: 'FETCHED_NETSTAT_DATA'})
      dispatch({ type: 'TOTAL_WRITES', payload: data.totalWrites })
      dispatch({ type: 'WS_CONNS', payload: data.wsConns })
    })
  }

}
