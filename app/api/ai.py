from flask import jsonify, request, current_app
from . import api_bp  # Import the API Blueprint
import dashscope
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv('AI_API')

dashscope.base_http_api_url = 'https://dashscope-intl.aliyuncs.com/api/v1'


def get_res(prompt):
    messages = [
        {'role': 'system', 'content': 'You are a helpful assistant.'},
        {'role': 'user', 'content': prompt + 'Return the response as a styled html paragraph/ div/ or any other relevant html tags and do not explain the html'}
        ]

    response = dashscope.Generation.call(
        # If the environment variable is not configured, replace the following line with: api_key="sk-xxx",
        api_key=API_KEY,
        model="qwen-plus", # Model list: https://www.alibabacloud.com/help/en/model-studio/getting-started/models
        messages=messages,
        result_format='message'
        )
    
    return response


@api_bp.route("/")
def root():
    return "Hello, world. This is a simple flask server!" 

@api_bp.route("/ai/<prompt>")
def ai(prompt):
    response = get_res(prompt)
    return response



@api_bp.route('/ai', methods=['POST'])
def getData():
    data = request.get_json()  
    prompt = data.get('prompt')
    response = get_res(prompt)
    return response


