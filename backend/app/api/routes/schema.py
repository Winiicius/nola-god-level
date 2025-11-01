from fastapi import APIRouter
from app.services.semantic_layer_service import get_semantic_schema

router = APIRouter()

@router.get("/schema")
def get_schema():
    """
    Retorna a estrutura semântica do modelo — tabelas, métricas e dimensões disponíveis.
    """
    schema = get_semantic_schema()
    return {"status": "ok", "schema": schema}
