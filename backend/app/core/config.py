from pydantic_settings import BaseSettings
from pydantic          import ConfigDict

class Settings(BaseSettings):
    APP_NAME: str
    APP_ENV: str
    DATABASE_URL: str
    REDIS_URL: str
    FRONTEND_URL: str

    model_config = ConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )

settings = Settings()