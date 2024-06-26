import requests
import pandas as pd

# Função para ler a tabela e converter em uma lista de dicionários
def read_table_to_list(file_path):
    df = pd.read_csv(file_path)
    return df.to_dict(orient='records')

# Lista de itens a partir da tabela CSV
file_path = 'titulos.csv'
items = read_table_to_list(file_path)

# URL da API
api_url = 'http://localhost:3004/item'

# Função para adicionar itens à API
def add_items_to_api(items, api_url):
    for item in items:
        # Construir o payload JSON com os campos necessários
        payload = {
            "titulo": item["titulo"],
            "volume": item["volume"],
            "autor": item["autor"],
            "sinopse": item["sinopse"],
            "foto": item["foto"],
            "editora": item["editora"],
            "genero": item["genero"],
            "categoria": item["categoria"]
        }
        response = requests.post(api_url, json=payload)
        if response.status_code == 201:
            print(f"Item {item['titulo']} adicionado com sucesso!")
        else:
            print(f"Falha ao adicionar {item['titulo']}: {response.status_code} - {response.text}")

# Chama a função para adicionar itens
add_items_to_api(items, api_url)
