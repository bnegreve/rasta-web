import http.server
import socketserver
import sys
import urllib.parse
import urllib.request
import subprocess


PORT = 4000

RASTA_PROJECT_PATH='../../../rasta-project'

# python3 python/evaluation.py --model_path=savings/resnet_2017_6_29-18\:42\:50/model.h5 -t pred --data_path=data/wikipaintings_10/wikipaintings_test/Abstract_Art/adnan-coker_er-eve-1999.jpg

def predict_handler(url):
    urllib.request.urlretrieve(url, '/tmp/file')
    
    # TODO not safe, call the script directly instead

    callstr  = "python3 {path}/python/evaluation.py -t pred -k 5 "
    callstr += "--model_path={path}/savings/resnet_2017_6_29-18\:42\:50/model.h5 "
    callstr += "--data_path=/tmp/file"
    callstr = callstr.format(path=RASTA_PROJECT_PATH)

    print("CALLS STR " + callstr)
    output = subprocess.getoutput(callstr)

    print(output)
    pred = output.split('\n')[-1]
    print(pred)
    return pred

def setLabel_handler():
    return "setlabel ok"

class Handler(http.server.BaseHTTPRequestHandler):



    def do_GET(self):
        print(self.path)
        querystr = urllib.parse.urlparse(self.path).query
        query = urllib.parse.parse_qs(querystr)
        error = 0

        qtype = query['type']

        if qtype == None:
            error = 1
        else:
            qtype = qtype[0]
            print(str(querystr))
            print(str(query))
            print("queryt type '" + qtype + "'")

            if qtype == 'predict':
                imageurl = query['imageurl'][0]
                resp = predict_handler(imageurl)
            elif qtype == 'setlabel':
                resp = setLabel_handler()
            else:
                print("Unknown query type '"+ qtype + "'")
                error = 1
            
        if error == 0:
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(bytes(resp, "utf-8"))

        else:
            self.send_response(404)

httpd = socketserver.TCPServer(("", PORT), Handler)

print("serving at port", PORT)
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    httpd.server_close()
    sys.exit(0)

