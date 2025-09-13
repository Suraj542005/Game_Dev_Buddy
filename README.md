# 🎮 Game Dev Buddy

[![GitHub issues](https://img.shields.io/github/issues/Suraj542005/Game_Dev_Buddy)](https://github.com/Suraj542005/Game_Dev_Buddy/issues)
[![GitHub forks](https://img.shields.io/github/forks/Suraj542005/Game_Dev_Buddy)](https://github.com/Suraj542005/Game_Dev_Buddy/network)
[![GitHub stars](https://img.shields.io/github/stars/Suraj542005/Game_Dev_Buddy)](https://github.com/Suraj542005/Game_Dev_Buddy/stargazers)
[![GitHub license](https://img.shields.io/github/license/Suraj542005/Game_Dev_Buddy)](LICENSE)

---

## 📌 Overview

**Game Dev Buddy** is an AI-powered assistant for game developers, designed to provide guidance, resources, and tools throughout the game development journey.  
It integrates **Retrieval-Augmented Generation (RAG)** to deliver contextual knowledge, industry best practices, and actionable insights that help developers design, build, and ship games more efficiently.

Whether you’re a beginner exploring game design or an experienced developer seeking quick references, Game Dev Buddy is here to support you.

---

## ✨ Features

- 🔍 **AI-Powered Search** – Uses RAG for fast and accurate information retrieval.  
- 📚 **Learning Resources** – Curated articles, guides, and frameworks for game development.  
- 🖼 **Web Interface** – Simple and interactive frontend for easy use.  
- ⚡ **Fast Retrieval** – Vector-based search using FAISS index.  
- 🧩 **Modular Design** – Easy to extend with new tools, datasets, or AI models.  

---

## 🛠 Tech Stack

- **Backend**: Python (Flask)  
- **Frontend**: HTML, CSS, JavaScript  
- **AI / IR**: RAG (Retrieval-Augmented Generation), FAISS for vector search  
- **Database / Indexing**: FAISS Index, local dataset  
- **Others**: Jinja2 Templates, Static file serving  

---

## 📂 Project Structure

```
Game_Dev_Buddy/
├── Large_Faiss_Index/        # Pre-built FAISS index files
├── static/                   # CSS, JS, Images
├── templates/                # HTML templates (frontend)
├── app.py                    # Main Flask application
├── rag_model.py              # RAG implementation logic
├── requirements.txt          # Python dependencies
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### ✅ Prerequisites
- Python 3.8+
- Git
- Virtual environment tool (recommended: `venv` or `conda`)

### ⚡ Installation

```bash
# Clone the repository
git clone https://github.com/Suraj542005/Game_Dev_Buddy.git
cd Game_Dev_Buddy

# Create and activate virtual environment
python -m venv venv
# On Windows
venv\Scripts\activate
# On Linux/MacOS
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

---

## ▶️ Usage

Run the application:

```bash
python app.py
```

Open your browser and go to:

```
http://127.0.0.1:5000
```

Here, you can start interacting with **Game Dev Buddy**.

---

## 📸 Screenshots

*(Add actual screenshots of your project UI here)*  

![Demo Screenshot](static/images/demo.png)

---

## 🤝 Contributing

We welcome contributions from the community!  

1. Fork the repository  
2. Create a feature branch: `git checkout -b feature/your-feature`  
3. Commit your changes: `git commit -m "Add new feature"`  
4. Push to your fork: `git push origin feature/your-feature`  
5. Open a Pull Request  

Please make sure your code is clean, tested, and well-documented.

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

- **Author**: Suraj  
- **GitHub**: [@Suraj542005](https://github.com/Suraj542005)  
- *(Optional: Email or LinkedIn profile if you want to share)*  

---

⭐ If you find this project helpful, don’t forget to **star the repo**!
