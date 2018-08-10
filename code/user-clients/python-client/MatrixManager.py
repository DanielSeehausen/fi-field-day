import json
from urllib import request, parse


class MatrixManager:
    def __init__(self, id):
        self.id = id
        self.api_url = "https://dis-stevens-job/"


    def get_tile(self, dict):
        # GET /get-tile?x=0&y=0
        # Should we use try: except: to raise errors instead of ifelse?

        if (type(dict) is dict):
            get_tile_url = self.api_url + "/get-tile?x=" + dict.x + "&y=" + dict.y
            response = request.urlopen(get_tile_url)
            data = response.read()
            encoding = response.info().get_content_charset('utf-8')
            payload = json.loads(data.decode(encoding))
            # Response: {x:<INT>, y:<INT>, c:<STRING>}

            return payload

        else:
            raise ValueError("Expected a dict. Got no dict.")


    def get_queue(self):
        # GET /queue

        get_queue_url = self.api_url + "/queue"
        response = request.urlopen(get_queue_url)
        data = response.read()
        encoding = response.info().get_content_charset('utf-8')
        payload = json.loads(data.decode(encoding))
        # Response: [{x,y,c}, {x,y,c}]

        return payload


    def clear_queue(self):

        clear_queue_url = self.api_url + "/clear-queue"
        # response = request.urlopen(clear_queue_url)
        # response.get_method = lambda: 'DELETE'
        # data = response.read()
        # encoding = response.info().get_content_charset('utf-8')
        # payload = json.loads(data.decode(encoding))
        # return payload

        headers = {
            'Content-Type': 'application/json;charset=UTF-8'
        }

        req = request.Request(
            clear_queue_url,
            headers=headers,
            method='DELETE'
        )

        try:
            response = urllib.request.urlopen(req)
            return("Success: " + response.read().decode('utf8'))
        except urllib.error.URLError as error:
            return("Error: " + error.read().decode('utf8'))



    def get_rect(self, start, end):
        # GET /get-rect?x1=0&y1=0&x2=1&y2=1

        get_rect_queue_url = self.api_url + "/get-rect?x1=" + start.x + "&y1=" + start.y + "&x2=" + end.x + "&y2=" + end.y
        response = request.urlopen(get_rect_queue_url)
        data = response.read()
        encoding = response.info().get_content_charset('utf-8')
        payload = json.loads(data.decode(encoding))
        # Response: [{x,y,c}, {x,y,c}]

        return payload

    def set_tile(self, dict):
        # POST /set-tile
        #     Body: {x,y,c}
        #     Response: {coordinate: {x,y,c}, message: “QUEUED”, queue-position: int}

        set_tile_url = self.api_url + "/set-tile"
        data = parse.urlencode(dict).encode()
        req =  request.Request(set_tile_url, data=data) # this will make the method "POST"
        resp = request.urlopen(req)

        




        #
