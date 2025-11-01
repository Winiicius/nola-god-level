import redis
import json
import hashlib

from urllib.parse    import urlparse
from app.core.config import settings


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

    def _get_key(self, data: dict):
        key_base = json.dumps(data, sort_keys=True)
        return hashlib.sha256(key_base.encode()).hexdigest()

    def get(self, key_data: dict):
        key = self._get_key(key_data)
        cached = self.redis_client.get(key)
        return json.loads(cached) if cached else None

    def set(self, key_data: dict, data, expire=300):
        key = self._get_key(key_data)
        self.redis_client.setex(key, expire, json.dumps(data))

    def test_redis_connection(self):
        try:
            self.redis_client.ping()
            return "connected"
        except redis.ConnectionError:
            return "unavailable"
        