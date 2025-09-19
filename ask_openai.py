import os
from openai import OpenAI

# It's best practice to use an environment variable for your API key.
# If you don't set it, you can also pass it directly to the client:
# client = OpenAI(api_key="YOUR_API_KEY")
client = OpenAI()

try:
    # This is where you call the API
    response = client.chat.completions.create(
      model="gpt-3.5-turbo",  # Specifies which model to use
      messages=[
        {"role": "system", "content": "You are a helpful assistant."}, # Sets the behavior of the assistant
        {"role": "user", "content": "What is the capital of France?"}  # This is your prompt
      ]
    )

    # Print the model's response
    print(response.choices[0].message.content)

except Exception as e:
    print(f"An error occurred: {e}")