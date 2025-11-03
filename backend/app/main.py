from fastapi                 import FastAPI
from app.api.routes          import health, query, schema
from fastapi.middleware.cors import CORSMiddleware
from app.core.config         import settings

app = FastAPI(title="God Level Analytics")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/health", tags=["Health Check"])
app.include_router(query.router, prefix="/analytics", tags=["Analytics"])
app.include_router(schema.router, prefix="/analytics", tags=["Schema"])