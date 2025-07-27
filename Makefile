### Makefile for automating project setup and development

# Variables\ n
PYTHON := python3
VENV_DIR := backend/.venv
BACKEND_DIR := backend
FRONTEND_DIR := frontend
DC := docker-compose

.PHONY: all backend frontend build up down clean

# Default target: set up and start dev environment
all: 
	make install-backend \
	&& make install-frontend \
	&& make up

# 1. Set up backend: create venv and install requirements
install-backend: 
	@echo "Setting up backend virtualenv..."
	cd $(BACKEND_DIR) \
	&& $(PYTHON) -m venv .venv \
	&& . .venv/bin/activate \
	&& pip install --upgrade pip setuptools \
	&& pip install -r requirements.txt
	@echo "Backend ready."

# 2. Install frontend dependencies
install-frontend: $(FRONTEND_DIR)/package.json
	@echo "Installing frontend dependencies..."
	cd $(FRONTEND_DIR) \
	&& npm install
	@echo "Frontend ready."

# 3. Build docker images
build:
	@echo "Building Docker images..."
	$(DC) build --parallel

# 4. Bring up services\ nup: build
up:
	@echo "Starting services with docker-compose..."
	$(DC) up --build

# 5. Stop services
down:
	@echo "Stopping services..."
	$(DC) down

# 6. Clean all generated files (venv, node_modules, docker) 
clean:
	@echo "Cleaning workspace..."
	-rm -rf $(VENV_DIR)
	-rm -rf $(FRONTEND_DIR)/node_modules
	$(DC) down --rmi all --volumes --remove-orphans
	@echo "Clean complete."

# Usage help
help:
	@echo "Usage: make [target]"
	@echo "Targets:" \
	&& echo "  install-backend  Set up backend environment" \
	&& echo "  install-frontend Install frontend dependencies" \
	&& echo "  build            Build docker images" \
	&& echo "  up               Run docker-compose up" \
	&& echo "  down             Stop docker-compose services" \
	&& echo "  clean            Remove venv, node_modules, and docker artifacts" \
	&& echo "  all (default)    install-backend, install-frontend, and up"
