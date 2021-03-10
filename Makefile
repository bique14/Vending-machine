init: init-backend init-frontend

init-frontend:
	cd frontend && \
	npm install

init-backend:
	cd backend && \
	npm install

front:
	cd frontend && \
	npm run dev

back:
	cd backend && \
	npm run start:dev
