from fastapi import APIRouter, HTTPException
from app.services.query_builder_service import execute_dynamic_query

router = APIRouter()

@router.post("/query")
def run_query(payload: dict):
    try:
        result = execute_dynamic_query(payload)
        return {"status": "ok", "data": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    