const fetch = require('node-fetch');

const BASE_URL = "http://localhost:8080"

function genUrl(route) {
  return BASE_URL + route
}

function assertResponse(expected, received, msg) {
  [expected, received] = [JSON.stringify(expected), JSON.stringify(received)]
  console.log(`\n\n\nAsserting: ${msg}\n`)
  if (received === expected) {
    console.log("IT WORKED")
  } else {
    console.log(`IT Broke...,\nexpected:${expected}\ngot:${received}`)
  }
}

function testFetch(route, req, expected, msg="fill me in u jirk") {
  const url = `http://localhost:8080/${route}`
  fetch(url, req).then(received => {
    console.log(received)
    assertResponse(expected, received, msg)
  })
}

function runTests(tests) {
  tests.forEach(x => {
    testFetch(x.route, x.req, x.expected, x.msg)
  })
}

const tests = [
  {
    route: "/setTile",
    req: {
      body: JSON.stringify({
        x: 1,
        y: 2,
        color: 'FFF'
      }),
      credentials: 'same-origin', // include, *omit
      headers: {
        'content-type': 'application/json',
        'client-token': '1'
      },
      method: 'POST', // *GET, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *same-origin
      redirect: 'follow', // *manual, error
      referrer: 'no-referrer', // *client
    },
    expected: "Don't know, you tell me what the expected response is",
    msg: "this is a placeholder message for when test goes"
  },
  {
    route: "/setTile",
    req: {
      body: JSON.stringify({
        x: 1,
        y: 2,
        color: 'FFF'
      }),
      credentials: 'same-origin', // include, *omit
      headers: {
        'content-type': 'application/json',
        'client-token': '1'
      },
      method: 'POST', // *GET, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *same-origin
      redirect: 'follow', // *manual, error
      referrer: 'no-referrer', // *client
    },
    expected: "Don't know, you tell me what the expected response is",
    msg: "this is a second test placeholder message for when test goes"
  }
]

runTests(tests)
