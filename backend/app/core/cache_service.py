import redis
import json
import hashlib

from app.core.config import settings
from urllib.parse    import urlparse

class CacheService:
    def __init__(self):

        redis_url = settings.REDIS_URL
        parsed = urlparse(redis_url)

        self.redis_client = redis.Redis(
            host=parsed.hostname,
            port=parsed.port or 6379,
            password=parsed.password,
            decode_responses=True
        )

    def _get_key(self, query_str: str):
        """Gera uma hash única baseada na query SQL."""
        return hashlib.sha256(query_str.encode()).hexdigest()

    def get(self, query_str: str):
        key = self._get_key(query_str)
        cached = self.redis_client.get(key)
        return json.loads(cached) if cached else None

    def set(self, query_str: str, data, expire=300):
        key = self._get_key(query_str)
        self.redis_client.setex(key, expire, json.dumps(data))

    def test_redis_connection(self):
        try:
            self.redis_client.ping()
            return "connected"
        except redis.ConnectionError:
            return "unavailable"