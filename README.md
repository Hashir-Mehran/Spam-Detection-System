🚀 Spam Detection System
A full-stack application that detects Spam / Smishing / Offensive content using Machine Learning. The system includes a Python-based ML engine, a Node.js backend, a React web interface, and a cross-platform React Native mobile application.

📌 Project Architecture
User Input (Web / Mobile)
        ↓
React / React Native UI
        ↓
Node.js Backend (API Gateway)
        ↓
Python ML API (Model Inference)
        ↓
Prediction (Spam / Ham / Offensive)
⚙️ Environment Configuration
To run this project, you need to configure your environment variables for different platforms. Create a .env file in the root directory:

Plaintext
# For Mobile (Expo)
EXPO_PUBLIC_ANDROIDAPI=http://<YOUR_PC_IP>:5000/predict
EXPO_PUBLIC_IOSAPI=http://<YOUR_PC_IP>:5000/predict

# For Web
VITE_API_URI=http://localhost:5000/predict
Note: Replace <YOUR_PC_IP> with your machine's local IPv4 address (e.g., 192.168.100.50).

🧠 Machine Learning Model
📊 Dataset
CSV format: text / label (spam / ham / offensive).

⚙️ Algorithms Used
Logistic Regression, Naive Bayes, Linear SVM (Best Accuracy).

🐍 Python API (Flask)
Python
from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)
model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['text']
    vec = vectorizer.transform([data])
    prediction = model.predict(vec)[0]
    return jsonify({"prediction": prediction})

if __name__ == "__main__":
    app.run(port=5000)
🌐 Node.js Backend
The Node.js server acts as an API gateway. Ensure your server is configured to listen on 0.0.0.0 for network accessibility.

JavaScript
// Ensure app.listen(PORT, '0.0.0.0', ...)
app.post("/predict", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:5000/predict", { text: req.body.text });
    res.json(response.data);
  } catch (err) { res.status(500).send("Error"); }
});
📱 React Native App (Mobile)
We use a robust getApiUrl utility to handle dynamic environments across Web and Mobile platforms:

JavaScript
const getApiUrl = () => {
  const defaultUrl = "http://192.168.100.50:5000/predict";
  const androidUrl = process.env.EXPO_PUBLIC_ANDROIDAPI || defaultUrl;
  const iosUrl = process.env.EXPO_PUBLIC_IOSAPI || defaultUrl;
  
  if (Platform.OS === 'web') return (process.env as any).VITE_API_URI;
  return Platform.OS === 'android' ? androidUrl : iosUrl;
};
🔐 Features
✅ Cross-Platform: Seamlessly works on Web, Android, and iOS.

✅ Dynamic Connectivity: Automatic API URL resolution.

✅ Real-time Detection: Immediate classification of input text.

✅ Diagnostic Logging: Tracks history and classification results.

🛠 Tech Stack
ML: Python, Scikit-learn, Flask

Backend: Node.js, Express, Axios

Frontend: React, React Native (Expo)

📌 Future Improvements
Use Deep Learning (LSTM / BERT).

Multilingual Support.

Database integration for persistent history.

Enhanced tracking for phone numbers and suspicious links.

👨‍💻 Author
Aditya Sharma

⭐ Contribute
Feel free to fork, improve and contribute to this project!