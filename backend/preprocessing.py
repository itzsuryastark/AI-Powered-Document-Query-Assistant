import spacy
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sentence_transformers import SentenceTransformer, util
import nltk

# Load necessary resources
nlp = spacy.load("en_core_web_sm")
nltk.download('punkt')
nltk.download('stopwords')

# Load Sentence Transformer Model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Entity Recognition
def extract_entities(text):
    doc = nlp(text)
    entities = [(ent.text, ent.label_) for ent in doc.ents]
    return entities

# Tokenization and Stopword Removal
def preprocess_text(text):
    tokens = word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    filtered_tokens = [word for word in tokens if word.lower() not in stop_words]
    return filtered_tokens

# Lemmatization
def lemmatize_text(text):
    doc = nlp(text)
    lemmas = [token.lemma_ for token in doc if not token.is_stop]
    return lemmas

# Semantic Similarity
def compute_similarity(query, documents):
    query_embedding = model.encode(query, convert_to_tensor=True)
    doc_embeddings = model.encode(documents, convert_to_tensor=True)
    similarities = util.pytorch_cos_sim(query_embedding, doc_embeddings)
    return similarities

# Preprocessing Pipeline
def preprocess_pipeline(text):
    entities = extract_entities(text)
    tokens = preprocess_text(text)
    lemmas = lemmatize_text(" ".join(tokens))
    return {
        "entities": entities,
        "tokens": tokens,
        "lemmas": lemmas
    }
