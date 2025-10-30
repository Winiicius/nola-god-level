import redis
import json
from app.core.config import settings

r = redis.Redis.from_url(settings.REDIS_URL, decode_responses=True)

def get_cache(key: str):
    data = r.get(key)
    return json.loads(data) if data else None

def set_cache(key: str, value: dict, ttl: int = 3600):
    r.set(key, json.dumps(value), ex=ttl)

def test_redis_connection():
    try:
        r.ping()
        return "connected"
    except redis.ConnectionError:
        return "unavailable"
