from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import sys
import os

os.chdir(r"d:\SIPL")
PORT = 8000

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

if __name__ == '__main__':
    try:
        server = ThreadingHTTPServer(('127.0.0.1', PORT), QuietHandler)
        print(f"Safepack live at http://localhost:{PORT}")
        server.serve_forever()
    except Exception as e:
        print(f"Server error: {e}", file=sys.stderr)
