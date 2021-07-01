run: 
	docker run -p 3000:3000 -v $(PWD):/mnt/journal-app journal-app

build: 
	docker build -t journal-app .