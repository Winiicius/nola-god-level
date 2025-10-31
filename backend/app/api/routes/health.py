from fastapi                import APIRouter
from app.core.db_session    import test_db_connection
from app.core.cache_service import CacheService

router = APIRouter()

cache = CacheService()

@router.get("/")
def health_check():
    db_status = test_db_connection()
    redis_status = cache.test_redis_connection()
    return {
        "status": "ok" if db_status == "connected" and redis_status == "connected" else "degraded",
        "database": db_status,
        "redis": redis_status
    }
