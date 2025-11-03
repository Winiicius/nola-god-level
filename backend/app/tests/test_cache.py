from app.core.cache_service import CacheService

def test_cache_service_set_and_get():
    cache = CacheService()
    test_key = {"table": "sales", "metric": "faturamento_total"}
    test_value = {"result": 123}

    cache.set(test_key, test_value, expire=5)
    cached = cache.get(test_key)

    assert cached == test_value
