import pandas as pd

from sqlalchemy                          import create_engine, text
from app.core.config                     import settings
from app.core.cache_service              import CacheService
from app.services.semantic_layer_service import SEMANTIC_MODEL

cache = CacheService()
engine = create_engine(settings.DATABASE_URL)

def execute_dynamic_query(params: dict):
    """
    Monta e executa a query baseada nos parâmetros recebidos do frontend.
    params: { "table": "sales", "metric": "faturamento_total", "dimension": "canal", "filters": {...} }
    """

    table = params.get("table")
    metric = params.get("metric")
    dimension = params.get("dimension")
    filters = params.get("filters", {})

    model = SEMANTIC_MODEL.get(table)
    if not model:
        raise ValueError(f"Tabela '{table}' não encontrada na camada semântica.")

    metric_sql = model["metrics"].get(metric)
    dimension_sql = model["dimensions"].get(dimension, {}).get("sql")
    join_clause = model["dimensions"].get(dimension, {}).get("join", "")

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

    cached = cache.get(query)
    if cached:
        return cached

    df = pd.read_sql(text(query), engine)
    result = df.to_dict(orient="records")

    cache.set(query, result)

    return result
