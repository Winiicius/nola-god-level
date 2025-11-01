from fastapi.testclient import TestClient
from app.main           import app

client = TestClient(app)

def test_query_endpoint_sales_faturamento():
    payload = {
        "table": "sales",
        "metric": "faturamento_total",
        "dimension": "canal"
    }

    response = client.post("/analytics/query", json=payload)
    assert response.status_code == 200

    body = response.json()
    assert "data" in body
    assert isinstance(body["data"], list)
