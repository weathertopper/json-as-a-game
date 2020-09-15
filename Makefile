start-accessible:
	cp ./front/config/game_config_accessible.js ./front/config/game_config.js
	npm install
	npm start

start-inaccessible:
	cp ./front/config/game_config_inaccessible.js ./front/config/game_config.js
	npm install
	npm start