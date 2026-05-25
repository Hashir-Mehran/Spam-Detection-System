from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)


model = joblib.load("linear_svm_model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")
label_encoder = joblib.load("label_encoder.pkl")

@app.route("/")
def home():
    return "ML API Running 🚀"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(silent=True)
        if not data:
            return jsonify({"error": "Invalid JSON layout structure"}), 400

        text = data.get("text", "").strip()
        if not text:
            return jsonify({"error": "No text provided"}), 400

        # Feature transformations and predictions
        text_vector = vectorizer.transform([text])
        prediction = model.predict(text_vector)
        final_output = label_encoder.inverse_transform(prediction)[0]

        # Dynamic mapping for smishing pattern mutations
        if str(final_output).lower() == "spam" and ("http" in text.lower() or "www." in text.lower()):
            final_output = "smishing"

        # IMPORTANT: Make sure these keys match what server.js expects!
        return jsonify({
            "status": "success",
            "engine": "SVM Linear Kernel Engine",
            "input": text,
            "prediction": str(final_output)
        }), 200

    except Exception as e:
        print(f"!!! CRASH IN FLASK PREDICT !!!: {str(e)}")
        # Return proper JSON structural format with 500 error code
        return jsonify({
            "error": "Model prediction computation failed",
            "details": str(e)
        }), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)