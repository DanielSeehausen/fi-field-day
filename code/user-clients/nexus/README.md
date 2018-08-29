
### Instructions

To start the Nexus API, run `npm install && npm start`.

### Routes

TODO: update these to new restful routes!

```
GET /get-tile?x=<INT>&y=<INT>
    Response: {x,y,color}

POST /set-tile
    Body: {x,y,ccolor}
    Response: {coordinate: {x,y,color}, success: “Successfully queued”, position: <INT>}

GET /get-queue
    Response: [{x,y,color}]

DELETE /clear-queue
    Response {message: “Queue successfully cleared. <NUM ITEMS DELETED> items removed.”}
```
