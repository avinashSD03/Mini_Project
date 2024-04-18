from flask import Flask, request,jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
# cors = CORS(app, resources={r"/recommend": {"origins": "http://localhost:5000"}})

# Load the dataset from CSV
df = pd.read_csv("Enggbooks.csv")

# Concatenate relevant columns
df['combined_text'] = df['title'].fillna('') + ' ' + df['Single_Label'].fillna('') + ' ' + df['Rest_of_Labels'].fillna('')

# Feature representation
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix_combined = tfidf_vectorizer.fit_transform(df['combined_text'].astype(str))

# Set to store unique titles
unique_titles = set()

# @app.route('/')
# def index():
#     return render_template('recommend.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()  # Parse JSON data from the request body
    partial_input = data.get('partial_input')  # Retrieve 'partial_input' from the data
    
    if partial_input is not None:
        # Perform recommendation logic based on 'partial_input'
        partial_input_vector = tfidf_vectorizer.transform([partial_input])

        cosine_similarities = cosine_similarity(partial_input_vector, tfidf_matrix_combined)
        similar_books_indices = cosine_similarities.argsort()[0][-25:][::-1]

        recommendations = []
        for idx in similar_books_indices:
            book_id = int(df.loc[idx, 'idbook'])
            book_title = df.loc[idx, 'title']
            if book_title not in unique_titles:
                recommendations.append({'idbook': book_id, 'title': book_title})
                unique_titles.add(book_title)
        # recommendations = {'recommendations': ['Recommendation 1', 'Recommendation 2']}
        return jsonify({'recommendations':recommendations}), 200
    else:
        return jsonify({'error': 'Missing or invalid partial_input parameter'}), 400
    
    # partial_input = request.form['partial_input']
    # partial_input_vector = tfidf_vectorizer.transform([partial_input])

    # cosine_similarities = cosine_similarity(partial_input_vector, tfidf_matrix_combined)
    # similar_books_indices = cosine_similarities.argsort()[0][-25:][::-1]

    # recommendations = []
    # for idx in similar_books_indices:
    #     book_id = df.loc[idx, 'idbook']
    #     book_title = df.loc[idx, 'title']
    #     if book_title not in unique_titles:
    #         recommendations.append({'idbook': book_id, 'title': book_title})
    #         unique_titles.add(book_title)

    # return render_template('recommend.html', recommendations=recommendations)

if __name__ == '__main__':
    app.run(debug=True)