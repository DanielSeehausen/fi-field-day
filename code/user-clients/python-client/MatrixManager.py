import json
from urllib import request, parse
import requests



class MatrixManager:
    def __init__(self, id):
        self.id = id
        self.api_url = "https://dis-stevens-job"


    def get_tile(self, dict):
        # GET /get-tile?x=0&y=0
        #   Response: {x:<INT>, y:<INT>, c:<STRING>}

        if (type(dict) is dict):
            get_tile_url = self.api_url + "/get-tile?x=" + dict.x + "&y=" + dict.y
            response = requests.get(get_tile_url)
            data = response.json()

            return data

            # response = request.urlopen(get_tile_url)
            # data = response.read()
            # encoding = response.info().get_content_charset('utf-8')
            # payload = json.loads(data.decode(encoding))

        else:
            raise TypeError("Expected a dict. Got no dict.")


    def get_rect(self, start, end):
        # GET /get-rect?x1=0&y1=0&x2=1&y2=1
        #   Response: [{x,y,c}, {x,y,c}]

        if (type(start) is dict and type(end) is dict):
            get_rect_queue_url = self.api_url + "/get-rect?x1=" + start.x + "&y1=" + start.y + "&x2=" + end.x + "&y2=" + end.y
            response = requests.get(get_rect_queue_url)
            data = response.json()

            return data

            # response = request.urlopen(get_tile_url)
            # data = response.read()
            # encoding = response.info().get_content_charset('utf-8')
            # payload = json.loads(data.decode(encoding))

        else:
            raise TypeError("Expected a dict. Got no dict.")


    def get_queue(self):
        # GET /queue
        #   Response: [{x,y,c}, {x,y,c}]

        get_queue_url = self.api_url + "/queue"
        response = requests.get(get_queue_url)
        data = response.json()

        return data

        # response = request.urlopen(get_queue_url)
        # data = response.read()
        # encoding = response.info().get_content_charset('utf-8')
        # payload = json.loads(data.decode(encoding))


    def clear_queue(self):
        # headers = {'user-agent': 'my-app/0.0.1'}
        #not sure if I need headers or not, check

        clear_queue_url = self.api_url + "/clear-queue"
        response = requests.delete(clear_queue_url)
        data = response.json()

        return data

        # try:
        #     response = urllib.request.urlopen(req)
        #     return("Success: " + response.read().decode('utf8'))
        # except urllib.error.URLError as error:
        #     return("Error: " + error.read().decode('utf8'))

        # response = request.urlopen(clear_queue_url)
        # response.get_method = lambda: 'DELETE'
        # data = response.read()
        # encoding = response.info().get_content_charset('utf-8')
        # payload = json.loads(data.decode(encoding))

        # r = requests.delete(url, headers=headers)
        # http://docs.python-requests.org/en/master/user/quickstart/#custom-headers

        # r = requests.put('http://httpbin.org/put', data = {'key':'value'})
        # r = requests.head('http://httpbin.org/get')
        # r = requests.options('http://httpbin.org/get')

        # headers = {
        #     'Content-Type': 'application/json;charset=UTF-8'
        # }
        #
        # req = request.Request(
        #     clear_queue_url,
        #     headers=headers,
        #     method='DELETE'
        # )


    def set_tile(self, dict):
        # POST /set-tile
        #     Body: {x,y,c}
        #     Response: {coordinate: {x,y,c}, message: “QUEUED”, queue-position: int}

        # Finish this with requests module

        set_tile_url = self.api_url + "/set-tile"



>>> r = requests.post("http://httpbin.org/post", data=payload)
>>> print(r.text)
{
  ...
  "form": {
    "key2": "value2",
    "key1": "value1"
  },
  ...
}

        try:
            req = requests.post(url, data=dict)
            return
        except



        data = parse.urlencode(dict).encode()
        req =  request.Request(set_tile_url, data=data) # this will make the method "POST"
        resp = request.urlopen(req)



        # print(r.text)
        # print(r.status_code, r.reason)
