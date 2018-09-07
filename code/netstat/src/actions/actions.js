import fetch from 'isomorphic-fetch'

export function FetchNetstatData() {
  return (dispatch) => {
    dispatch({type: 'FETCHING_NETSTAT_DATA'})

    return fetch('http://theapi.link/netstat')
    .then( res => res.json())
    .then( data => {
      let counter = 0
      let skip = false
      let obj = {}
      Object.values(data.groupStatsByID).map(datum => {
        if (skip === false) {
          skip = true
          counter++
        } else {
          datum["group"] = counter
          obj[counter] = datum
          counter++

        }
      })

      dispatch({ type: 'TOTAL_WRITES', payload: data.totalWrites })
      dispatch({ type: 'ADD_GROUP_STATS', payload: obj })
      dispatch({ type: 'WS_CONNS', payload: data.wsConns })
      dispatch({ type: 'FETCHED_NETSTAT_DATA' })
      // counter = 0
    })
  }

}
