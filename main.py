from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from rag_model import get_relevant_context_from_db, generate_rag_prompt, generate_answer

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/About_us")
def about_us():
    return render_template("About_us.html")


@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/news")
def news():
    return render_template("news.html")


@app.route("/chat")  # New route for chat page
def chat_page():
    return render_template("chat.html")


@app.route("/chat", methods=["POST"])
def chat():
    # return render_template("chat.html")
    data = request.json
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"response": "Invalid input!"})

    # print(user_message)
    context = get_relevant_context_from_db(user_message)
    prompt = generate_rag_prompt(context, user_message)
    bot_response = generate_answer(prompt)
    # print(bot_response)

    return jsonify({"response": bot_response})
  

if __name__ == "__main__":
    app.run()
    