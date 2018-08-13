
ENDPOINTS

GET /get-tile?x=0&y=0
  Response: {x,y,c}

POST /set-tile
  Body: {x,y,c}
  Response: {coordinate: {x,y,c}, message: “QUEUED”, queue-position: <INT>}

GET /get-rect?x1=0&y1=0&x2=1&y2=1
  Response: [{x,y,c}]

GET /queue
  Response: [{coordinate: {x,y,c}]

DELETE /clear-queue
  Response {message: “Success”, number_deleted: <INT>}
