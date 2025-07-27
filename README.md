# trivial-compute-app
## Install
1. Backend
```
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```
2. Frontend
```
cd ../frontend
npm install
```
3. Build and Run Docker Compose
```
cd ..
docker-compose up --build
```
4. The Nginx instance should now be reachable at `http://127.0.0.1`
5. Teardown
```
docker-compose down
```
