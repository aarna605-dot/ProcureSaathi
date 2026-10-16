import os
from pathlib import Path
from dotenv import load_dotenv

# Load root or local .env if available
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

TINYFISH_API_KEY = os.getenv("TINYFISH_API_KEY", "").strip()
TINYFISH_SEARCH_URL = os.getenv("TINYFISH_SEARCH_URL", "https://api.search.tinyfish.ai").rstrip("/")
TINYFISH_FETCH_URL = os.getenv("TINYFISH_FETCH_URL", "https://api.fetch.tinyfish.ai").rstrip("/")
ENABLE_MOCK_FALLBACK = os.getenv("ENABLE_MOCK_FALLBACK", "true").lower() == "true"
BACKEND_HOST = os.getenv("BACKEND_HOST", "127.0.0.1")
BACKEND_PORT = int(os.getenv("BACKEND_PORT", 8000))
