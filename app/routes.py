from flask import Blueprint, render_template

# Create a Blueprint named 'main'
main = Blueprint('main', __name__)

# Define routes
@main.route('/')
def home():
    return render_template('home.html')

@main.route('/about')
def about():
    return render_template('about.html')


