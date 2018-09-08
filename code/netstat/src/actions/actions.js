import fetch from 'isomorphic-fetch'

export const FetchNetstatData = () => {
  return dispatch => {
    dispatch({ type: 'FETCHING_NETSTAT_DATA' })

    return fetch('http://theapi.link/netstat')
      .then(res => res.json())
      .then(data => {
        dispatch({ type: 'TOTAL_WRITES', payload: data.totalWrites })
        dispatch({ type: 'ADD_GROUP_STATS', payload: data.groupStatsByID })
        dispatch({ type: 'WS_CONNS', payload: data.wsConns })
        dispatch({ type: 'FETCHED_NETSTAT_DATA' })
      })
  }
}
