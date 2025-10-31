from fastapi        import FastAPI
from app.api.routes import health, query

app = FastAPI(title="God Level Analytics")

app.include_router(health.router, prefix="/health", tags=["Health Check"])
app.include_router(query.router, prefix="/analytics", tags=["Analytics"])