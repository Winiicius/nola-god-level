from fastapi        import FastAPI
from app.api.routes import health

app = FastAPI(title="God Level Analytics")

app.include_router(health.router)

@app.get("/")
def root():
    return {"message": "API funcionando corretamente 🚀"}