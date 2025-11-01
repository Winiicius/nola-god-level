from fastapi.testclient import TestClient
from app.main           import app

client = TestClient(app)

def test_schema_endpoint():
    response = client.get("/analytics/schema")
    assert response.status_code == 200
    data = response.json()
    assert "schema" in data
    assert "sales" in data["schema"]
    assert "metrics" in data["schema"]["sales"]
