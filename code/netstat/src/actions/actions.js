export function FetchNetstatData() {
  return (dispatch) => {
    dispatch({type: 'FETCH_NETSTAT_DATA'})

    return fetch('http://theapi.link/netstat')
    .then( res => res.json())
    .then( data => {
      console.log(data)
      dispatch({ type: 'GROUP_STATS', payload: data.groupStatsByID })
      dispatch({ type: 'TOTAL_WRITES', payload: data.totalWrites })
      dispatch({ type: 'WS_CONNS', payload: data.wsConns })
    })
  }

}
