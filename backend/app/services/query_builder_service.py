import pandas as pd

from sqlalchemy                          import create_engine, text
from app.core.config                     import settings
from app.core.cache_service              import CacheService
from app.services.semantic_layer_service import SEMANTIC_MODEL

cache = CacheService()
engine = create_engine(settings.DATABASE_URL)


def execute_dynamic_query(params: dict):
    """
    Executa uma query dinâmica baseada na camada semântica.
    Traduz automaticamente métricas, dimensões e filtros,
    incluindo JOINs necessários, validações e cache.
    """

    cache_key_data = {
        "table": params.get("table"),
        "metric": params.get("metric"),
        "dimension": params.get("dimension"),
        "filters": params.get("filters", {}),
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

    dimension_info = model["dimensions"].get(dimension) if dimension else None
    dimension_sql = dimension_info["sql"] if dimension_info else None

    def normalize_join(join: str) -> str:
        return " ".join(join.split())

    def deduplicate_joins(joins: list[str]) -> str:
        normalized = [" ".join(j.split()) for j in joins if j.strip()]
        unique = []

        for j in normalized:
            if any(j == existing for existing in unique):
                continue

            replaced = False
            for i, existing in enumerate(unique):
                if existing in j and "JOIN" in j and j.count("JOIN") >= existing.count("JOIN"):
                    unique[i] = j
                    replaced = True
                    break
            if not replaced:
                if any(j in existing for existing in unique):
                    continue
                unique.append(j)

        return "\n".join(unique)

    join_clauses = []

    if dimension_info and "join" in dimension_info:
        join_clauses.append(dimension_info["join"])

    if filters:
        for filter_key in filters.keys():
            dim = model["dimensions"].get(filter_key)
            if dim and "join" in dim:
                join_clauses.append(dim["join"])

    join_sql = deduplicate_joins(join_clauses)

    select_parts = []
    if dimension_sql:
        select_parts.append(f"{dimension_sql} AS {dimension}")
    select_parts.append(f"{metric_sql} AS value")

    query = f"""
        SELECT {', '.join(select_parts)}
        FROM {table}
        {join_sql}
    """

    if filters:
        filter_clauses = []
        for filter_key, condition in filters.items():
            dim_info = model["dimensions"].get(filter_key)
            if not dim_info:
                raise ValueError(
                    f"Filtro '{filter_key}' não existe na tabela semântica '{table}'."
                )

            sql_field = dim_info["sql"]
            for op, val in condition.items():
                safe_op = op.upper().strip()
                if safe_op not in ["=", "!=", ">=", "<=", "LIKE"]:
                    raise ValueError(f"Operador inválido: {op}")
                filter_clauses.append(f"{sql_field} {safe_op} '{val}'")

        if filter_clauses:
            query += " WHERE " + " AND ".join(filter_clauses)

    if dimension_sql:
        query += f" GROUP BY {dimension_sql} ORDER BY value DESC"
    else:
        query += " ORDER BY value DESC"

    query += " LIMIT 50;"

    df = pd.read_sql(text(query), engine)
    result = df.to_dict(orient="records")

    cache.set(cache_key_data, result)
    return result
