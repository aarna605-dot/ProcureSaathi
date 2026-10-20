import os
from pathlib import Path
from dotenv import load_dotenv

root_dir = Path(__file__).resolve().parent.parent
env_path = root_dir / ".env"
env_example_path = root_dir / ".env.example"

def get_tinyfish_api_key() -> str:
    key = os.getenv("TINYFISH_API_KEY", "").strip()
    if key and key != "your_tinyfish_api_key_here":
        return key
    if env_path.exists():
        load_dotenv(dotenv_path=env_path, override=True)
        key = os.getenv("TINYFISH_API_KEY", "").strip()
        if key and key != "your_tinyfish_api_key_here":
            return key
    if env_example_path.exists():
        load_dotenv(dotenv_path=env_example_path, override=True)
        key = os.getenv("TINYFISH_API_KEY", "").strip()
        if key and key != "your_tinyfish_api_key_here":
            return key
    return ""

TINYFISH_API_KEY = get_tinyfish_api_key()
TINYFISH_SEARCH_URL = os.getenv("TINYFISH_SEARCH_URL", "https://api.search.tinyfish.ai").rstrip("/")
TINYFISH_FETCH_URL = os.getenv("TINYFISH_FETCH_URL", "https://api.fetch.tinyfish.ai").rstrip("/")
ENABLE_MOCK_FALLBACK = os.getenv("ENABLE_MOCK_FALLBACK", "true").lower() == "true"
BACKEND_HOST = os.getenv("BACKEND_HOST", "127.0.0.1")
BACKEND_PORT = int(os.getenv("BACKEND_PORT", 8000))
