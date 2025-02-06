from flask import Flask
from dotenv import load_dotenv
import os

def create_app():
    app = Flask(__name__)

    # Load environment variables from .env file
    load_dotenv()

    # Access environment variables with fallbacks
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret_key')
    app.config['DATABASE_URI'] = os.getenv('DATABASE_URI', 'sqlite:///site.db')
    app.config['DEBUG'] = os.getenv('DEBUG', 'False').lower() in ['true', '1', 't']

    # Register regular routes
    from .routes import main  # Import the main Blueprint
    app.register_blueprint(main)

    # Register API routes
    from .api import api_bp  # Import the API Blueprint
    app.register_blueprint(api_bp, url_prefix='/api')  # Register the API Blueprint

    return app