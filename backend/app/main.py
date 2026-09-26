
from fastapi import FastAPI
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from app.core.database import engine

app = FastAPI(
    title="Grace API",
    description="Backend API for the Grace personal AI companion",
    version="0.1.0"
)


@app.get("/api/v1/health")
def health_check():
    return {
        "status": "ok",
        "application": "Grace",
        "message": "Grace backend is running!"
    }


@app.get("/api/v1/health/database")
def database_health_check():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "ok",
            "database": "connected"
        }

    except SQLAlchemyError:
        return {
            "status": "error",
            "database": "disconnected"
        }