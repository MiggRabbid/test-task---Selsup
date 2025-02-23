i:
	npm install

d:
	npm run dev

s:
	npm start

b:
	rm -rf dist
	npm run build

format:
	npm run format

clean:
	rm -rf dist

	
lint:
	npm run lint