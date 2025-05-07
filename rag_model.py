import colorama
from langchain_community.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

# Get the API key
API_KEY = os.getenv("API_KEY")

# Configuring the Generative Part
genai.configure(api_key=API_KEY)

# model = genai.GenerativeModel(model_name='gemini-1.5-pro')
model = genai.GenerativeModel(model_name='gemini-2.0-flash')

# Creating the Splitter to Split the Data into Chunks
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)


def Load_Data_From_URLS(urls):
    all_chunks = []
    for url in urls:
        loader = WebBaseLoader(url)
        docs = loader.load()
        chunks = splitter.split_documents(docs)
        all_chunks.extend(chunks)
    return all_chunks


# Declaring the Embedding model
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")


# Fetching all the URL's available
scripting_urls = [
    "https://docs.unity3d.com/ScriptReference/Accessibility.AccessibilityHierarchy.html",
    "https://docs.unity3d.com/ScriptReference/Accessibility.AccessibilityNode.html",
    "https://docs.unity3d.com/ScriptReference/Accessibility.AccessibilitySettings.html",
    "https://docs.unity3d.com/ScriptReference/Accessibility.AssistiveSupport.html",
    "https://docs.unity3d.com/ScriptReference/Accessibility.VisionUtility.html",
    "https://docs.unity3d.com/ScriptReference/Accessibility.IAccessibilityNotificationDispatcher.html",
    "https://docs.unity3d.com/ScriptReference/Accessibility.AccessibilityRole.html",
    "https://docs.unity3d.com/ScriptReference/Accessibility.AccessibilityState.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMesh.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshAgent.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshBuilder.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshData.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshObstacle.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshPath.html",
    "https://docs.unity3d.com/ScriptReference/AI.OffMeshLink.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshBuildDebugSettings.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshBuildMarkup.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshBuildSettings.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshBuildSource.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshDataInstance.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshHit.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshLinkData.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshLinkInstance.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshQueryFilter.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshTriangulation.html",
    "https://docs.unity3d.com/ScriptReference/AI.OffMeshLinkData.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshBuildDebugFlags.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshBuildSourceShape.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshCollectGeometry.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshObstacleShape.html",
    "https://docs.unity3d.com/ScriptReference/AI.NavMeshPathStatus.html",
    "https://docs.unity3d.com/ScriptReference/AI.ObstacleAvoidanceType.html",
    "https://docs.unity3d.com/ScriptReference/AI.OffMeshLinkType.html",
    "https://docs.unity3d.com/ScriptReference/CharacterController.html",    # Character Controller
    "https://docs.unity3d.com/Manual/multiplayer-overview.html"     # Multiplayer
]


# Storing the Data in Vector database
# faiss_index_path = "faiss_index"
faiss_index_path = "Large_Faiss_Index"
# chunks = Load_Data_From_URLS(urls)


def load_faiss_index():
    if os.path.exists(faiss_index_path):
        print("Loading FAISS index...")
        return FAISS.load_local(faiss_index_path, embedding_model, allow_dangerous_deserialization=True)
    else:
        return None


vectorstore = load_faiss_index()

if vectorstore is None:
    print("No Stored data found!")
    print("Storing in Progress.....")
    chunks = Load_Data_From_URLS(scripting_urls)
    vectorstore = FAISS.from_documents(chunks, embedding_model)
    vectorstore.save_local(faiss_index_path)
    print(f"Data is Stored in {faiss_index_path} File!")


# Fetching the Relevant Data from the Database
def get_relevant_context_from_db(query):
    retrieved_docs = vectorstore.similarity_search(query, k=3)
    context = "\n\n".join([doc.page_content for doc in retrieved_docs])
    count = 1
    # for i in retrieved_docs:
    #     print(colorama.Fore.RED + "----->", count)
    #     print(colorama.Fore.GREEN + i.page_content + colorama.Fore.RESET)
    #     count += 1
    return context


# Generating the Prompt based on Context and Query to Gemini
def generate_rag_prompt(context, query):
    prompt = f"""You are a highly skilled Unity game development assistant.

Use the following context to help answer the question **if it is relevant and sufficient**. However, if the context is incomplete, irrelevant, or not helpful, **use your own knowledge and expertise to provide the most accurate and complete answer possible**.

Context:
{context}

Question: {query}
Answer:"""

    return prompt

# def generate_rag_prompt(context, query):
#     prompt = f"""You are a Unity game development assistant. Use the following documentation context to answer the question:

#     {context}

#     Question: {query}
#     Answer:"""

#     return prompt


def generate_answer(prompt):
    response = model.generate_content(prompt)
    return response.text


if __name__=="__main__":
    while True:
        query = input("Query: ")
        if query == "exit()":
            print("Thanks for Using!")
            break
        else:
            context = get_relevant_context_from_db(query)
            prompt = generate_rag_prompt(context, query)
            response = generate_answer(prompt)
            print("Response:" + colorama.Fore.BLUE + response + colorama.Fore.RESET)
