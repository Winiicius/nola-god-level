from upstash_redis import Redis
from app.core.config import settings
import json
import hashlib


class CacheService:
    def __init__(self):
        # Inicializa o cliente Redis HTTP da Upstash
        self.redis_client = Redis(
            url=settings.REDIS_URL,
            token=settings.REDIS_TOKEN
        )

    def _get_key(self, data: dict):
        key_base = json.dumps(data, sort_keys=True)
        return hashlib.sha256(key_base.encode()).hexdigest()

    def get(self, key_data: dict):
        key = self._get_key(key_data)
        cached = self.redis_client.get(key)
        if cached is None:
            return None
        # o SDK retorna um dict { "result": "..." }
        return json.loads(cached) if isinstance(cached, str) else cached

    def set(self, key_data: dict, data, expire=300):
        key = self._get_key(key_data)
        self.redis_client.set(key, json.dumps(data), ex=expire)

    def test_redis_connection(self):
        try:
            self.redis_client.set("healthcheck", "ok", ex=5)
            return "connected"
        except Exception as e:
            print(f"Redis connection error: {e}")
            return "unavailable"
