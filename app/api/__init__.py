from flask import Blueprint

# Create a Blueprint for the API
api_bp = Blueprint('api', __name__)

# Import and register API modules
from . import ai  # Import AI-related API routes