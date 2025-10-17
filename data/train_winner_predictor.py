import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
import os

# Configuration
CSV_PATH = "dataset_Ynov_babyfoot_CLEAN.csv"
MODEL_DIR = "models"
os.makedirs(MODEL_DIR, exist_ok=True)

# Lecture du dataset
print("Lecture du dataset...")
data = pd.read_csv(CSV_PATH)

# Supprimer les lignes sans "winner" ou colonnes numériques manquantes
data = data.dropna(subset=["winner", "game_duration", "final_score_red", "final_score_blue"])

features = [
    "game_duration",
    "final_score_red",
    "final_score_blue",
    "player_goals",
    "player_assists",
    "player_saves",
]

# Conversion en numérique
for col in features:
    data[col] = pd.to_numeric(data[col], errors="coerce")
data = data.dropna(subset=features)


# Encodage de la variable cible
label_encoder = LabelEncoder()
data["winner_encoded"] = label_encoder.fit_transform(data["winner"])


# Données d’entrée (X) et cible (y)
X = data[features]
y = data["winner_encoded"]


# Normalisation
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)


# Division train/test
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42
)

# Entraînement du modèle
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    class_weight="balanced"
)
model.fit(X_train, y_train)

# Évaluation du modèle
y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)

print(f"Accuracy: {acc:.3f}")
print("\nClassification Report:\n", classification_report(y_test, y_pred))
print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred))

# Sauvegarde du modèle
joblib.dump(model, f"{MODEL_DIR}/winner_predictor.pkl")

# Exemple de prédiction
sample = {
    "game_duration": 600,
    "final_score_red": 5,
    "final_score_blue": 7,
    "player_goals": 2,
    "player_assists": 1,
    "player_saves": 3
}

sample_df = pd.DataFrame([sample])
sample_scaled = scaler.transform(sample_df)
pred = model.predict(sample_scaled)
winner_pred = label_encoder.inverse_transform(pred)[0]

print(f"Prédiction : l'équipe gagnante estimée est → {winner_pred}")
