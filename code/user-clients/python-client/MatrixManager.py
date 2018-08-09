import json
import urllib.request

class MatrixManager:
    def __init__(id):
        self.id = id
        self.api_url = "https://dis-stevens-job/"


    def get_tile(dict):
        # GET /get-tile?x=0&y=0
        # Should we use try: except: to raise errors instead of ifelse?

        if (type(dict) is dict):
            get_tile_url = self.api_url + "/get-tile?x=" + dict.x + "&y=" + dict.y
            response = urllib.request.urlopen(get_tile_url)
            data = response.read()
            encoding = response.info().get_content_charset('utf-8')
            payload = json.loads(data.decode(encoding))
            # Response: {x:<INT>, y:<INT>, c:<STRING>}

            return payload

        else:
            raise ValueError("Expected a dict. Got not a dict. Not cool.")


    def get_queue():
        # GET /queue

        get_queue_url = self.api_url + "/queue"
        response = urllib.request.urlopen(get_queue_url)
        data = response.read()
        encoding = response.info().get_content_charset('utf-8')
        payload = json.loads(data.decode(encoding))
        # Response: [{x,y,c}, {x,y,c}]

        return payload


     def clear_queue():
        # DELETE /clear-queue

        clear_queue_url = self.api_url + "/clear-queue"
        request = urllib2.Request(clear_queue_url)
        request.get_method = lambda: 'DELETE'
        response = urllib2.urlopen(request)
        data = response.read()
        encoding = response.info().get_content_charset('utf-8')
        payload = json.loads(data.decode(encoding))
        # Response {message: “Success”, number_deleted: <INT>}

        return payload


    def get_rect():
        # GET /get-rect?x1=0&y1=0&x2=1&y2=1
        # Response: [{x,y,c}]


    def set_tile:
        # POST /set-tile
        #     Body: {x,y,c}
        #     Response: {coordinate: {x,y,c}, message: “QUEUED”, queue-position: <INT>}
