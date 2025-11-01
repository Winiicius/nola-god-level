import pandas as pd
from sqlalchemy import create_engine, text
from app.core.config import settings
from app.core.cache_service import CacheService
from app.services.semantic_layer_service import SEMANTIC_MODEL

cache = CacheService()
engine = create_engine(settings.DATABASE_URL)


def execute_dynamic_query(params: dict):

    cache_key_data = {
        "table": params.get("table"),
        "metric": params.get("metric"),
        "dimension": params.get("dimension"),
        "filters": params.get("filters", {})
    }

    cached = cache.get(cache_key_data)
    if cached:
        print("✅ Cache hit")
        return cached

    table = cache_key_data["table"]
    metric = cache_key_data["metric"]
    dimension = cache_key_data["dimension"]
    filters = cache_key_data["filters"]

    model = SEMANTIC_MODEL.get(table)
    if not model:
        raise ValueError(f"Tabela '{table}' não encontrada na camada semântica.")

    metric_sql = model["metrics"].get(metric)
    if not metric_sql:
        raise ValueError(f"Métrica '{metric}' não encontrada para a tabela '{table}'.")

    dimension_info = model["dimensions"].get(dimension)
    if not dimension_info:
        raise ValueError(f"Dimensão '{dimension}' não encontrada para a tabela '{table}'.")

    dimension_sql = dimension_info.get("sql")
    join_clause = dimension_info.get("join", "")

    query = f"""
        SELECT {dimension_sql} AS {dimension}, {metric_sql} AS value
        FROM {table}
        {join_clause}
    """

    if filters:
        filter_clauses = []
        for field, condition in filters.items():
            for op, val in condition.items():
                filter_clauses.append(f"{field} {op} '{val}'")
        query += " WHERE " + " AND ".join(filter_clauses)

    query += f" GROUP BY {dimension_sql} ORDER BY value DESC LIMIT 50;"

    df = pd.read_sql(text(query), engine)
    result = df.to_dict(orient="records")

    cache.set(cache_key_data, result)

    return result
