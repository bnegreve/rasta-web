import http.server
import socketserver
import sys
import urllib.parse
import urllib.request
import subprocess
import json

PORT = 4000

RASTA_PROJECT_PATH='../../../rasta-project'

# python3 python/evaluation.py --model_path=savings/resnet_2017_6_29-18\:42\:50/model.h5 -t pred --data_path=data/wikipaintings_10/wikipaintings_test/Abstract_Art/adnan-coker_er-eve-1999.jpg


def query_predict(handler, query):

    if not 'url' in query:
        msg = "Error: missing url argument in predict query"
        handler.respond_with_error(422, msg)
        return 422

    url = query['url'][0]
    ressource = None

    try:
        print("Downloading URL " + url)
        ressource = urllib.request.urlretrieve(url)

    except Exception as e:
        resp = {"error": 1, "error_msg": "Cannot download ressource at url '{}'. Exception {} occured.".format(url, str(type(e))) }
        handler.respond(200, "text/json", json.dumps(resp))
        return 200
    
    callstr  = "python3 {path}/python/evaluation.py -t pred -k 5 -j "
    callstr += "--model_path={path}/savings/resnet_2017_6_29-18\:42\:50/model.h5 "
    callstr += "--data_path=/tmp/file"

    callstr  = callstr.format(path=RASTA_PROJECT_PATH)

    print("Subprocess call string: " + callstr)
    outputstr = subprocess.getoutput(callstr)
    print("Subprocess output: " + outputstr)

    # TODO to some checking on the return value
    resp = json.loads(outputstr.split('\n')[-1])
    resp['error'] = 0

    handler.respond(200, "text/json", json.dumps(resp))
    return 200

class Handler(http.server.BaseHTTPRequestHandler):

    query_dispatcher = { 'predict' : query_predict }

    def parse_query(self):

        # check complete request first
        req = urllib.parse.urlparse(self.path)
        msg = "Ok"
        query = None

        if req.path != '/ajax':
            msg = "Error: /ajax is the only available ressource here" 
            return (404, msg, query)

        # now check query 
        try:
            query = urllib.parse.parse_qs(req.query, strict_parsing = True)
        except ValueError as e:
            msg = "Error: impossible to parse query: '" + req.query + "'"
            return (422, msg, query)

        if not 'type' in query:
            msg = "Error: no type specified in query: " + req.query
            return (422, msg, query)
        
        qtype = query['type'][0]
        if not qtype in Handler.query_dispatcher:
            msg = "Error: invalid query type: " + qtype
            return (422, msg, query)

        return (0, msg, query)
        

    def respond(self, res, mimetype, content):
        self.send_response(res)
        self.send_header("Content-type", content)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(content.encode("utf-8"))

    def respond_with_error(self, err, msg):
        print("Sending error: " + msg)
        self.respond(err, "text/plain", msg)

    def do_GET(self):
        (err, msg, query) = self.parse_query()
        if err != 0:
            self.respond(err, "text/plain", msg)
            return err

        print("Query seems ok, handling query " + str(query))
        qtype = query['type'][0]
        result = Handler.query_dispatcher[ qtype ] ( self, query )
        
        



#         qtype = qtype[0]
#             print(str(querystr))
#             print(str(query))
#             print("query type '" + qtype + "'")

#             resp = "empty"

#             if qtype == 'predict':
#                 imageurl = query['imageurl'][0]
# #                resp = predict_handler(imageurl)
#                 resp = '{"pred": ["Color_Field_Painting", "Minimalism", "Abstract_Art", "Magic_Realism", "Expressionism"]}'
#             elif qtype == 'setlabel':
#                 resp = setLabel_handler()
#             else:
#                 print("Unknown query type '"+ qtype + "'")
#                 error = 1
            
#         if error == 0:
#             print("Sending response " + resp)
#             self.send_response(200)
#             self.send_header("Content-type", "text/json")
#             self.send_header('Access-Control-Allow-Origin', '*')
#             self.end_headers()
#             self.wfile.write(resp.encode("utf-8"))

#         else:
#             self.send_response(404)

httpd = socketserver.TCPServer(("", PORT), Handler)

print("serving at port", PORT)
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    httpd.server_close()
    sys.exit(0)

