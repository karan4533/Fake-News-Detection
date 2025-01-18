from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import random

class FakeDetectionHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            with open('index.html', 'rb') as file:
                self.wfile.write(file.read())
        elif self.path == '/style.css':
            self.send_response(200)
            self.send_header('Content-type', 'text/css')
            self.end_headers()
            with open('style.css', 'rb') as file:
                self.wfile.write(file.read())
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        if self.path == '/analyze':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            # Simple fake detection logic (for demonstration)
            text = data['text'].lower()
            score = random.randint(0, 100)
            
            # Determine classification based on score
            if score > 70:
                classification = "Genuine"
                confidence = random.randint(70, 95)
            elif score < 30:
                classification = "Fake"
                confidence = random.randint(75, 98)
            else:
                classification = "Uncertain"
                confidence = random.randint(40, 60)
            
            response = {
                'score': score,
                'classification': classification,
                'confidence': confidence
            }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

def run_server(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, FakeDetectionHandler)
    print(f'Server running on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()