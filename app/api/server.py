from vercel import wsgi
from app import create_app  # Import your Flask app factory

app = create_app()

# Wrap the Flask app with the WSGI adapter
handler = wsgi(app)
