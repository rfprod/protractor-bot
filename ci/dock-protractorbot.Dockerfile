# define image
FROM node:slim

# create directory structure
## create app directory
WORKDIR /app
## copy app source
COPY . .

## export variables for tests
ENV DISPLAY=:99 CHROME_BIN=google-chrome-stable

## install apt packages for tests execution
#
## start xvfb
#
## install and build
#
## run tests
#
## uninstall unneeded npm dependencies if any
#
## remove unneeded files
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -; \
    echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list; \
	apt-get -y update --fix-missing; \
	apt-get -y install --fix-missing --no-install-recommends apt-utils; \
	apt-get -y install --fix-missing apt-transport-https libnss3-tools; \
	apt-get -y upgrade --fix-missing && apt-get -y install --fix-missing google-chrome-stable xvfb; \
	sleep 1; \
	Xvfb :99 -screen 0 1680x1024x8 -nolisten tcp & sleep 2; \
	sleep 1; \
	npm install -g gulp-cli; \
	npm install; \
	sleep 1; \
	npm start; \
	sleep 1; \
	npm prune --production && \
	npm uninstall -g gulp-cli --save && \
	npm cache clean --force; \
	sleep 1; \
    find ./* -not -path "./node_modules/*" -not -path "./logs/*" -type f -name "*.md" -exec rm {} + && \
	find ./* -not -path "./node_modules/*" -not -path "./logs/*" -type f -name "*.sh" -exec rm {} + && \
	find ./* -not -path "./node_modules/*" -not -path "./logs/*" -type f -name "*.Dockerfile" -exec rm {} + && \
	find ./* -not -path "./node_modules/*" -not -path "./logs/*" -type f -name "*.json" -exec rm {} + && \
	rm ./.dockerignore ./.editorconfig ./.eslintignore ./.gitignore

# don't purge previously installed packages via apt
# RUN apt-get purge -y google-chrome-stable xvfb apt-utils
# RUN apt-get -y autoremove
# RUN apt-get -y clean

# run the application
## map app port
EXPOSE 8080
## define command to run app
CMD [ "node", "server.js" ]
