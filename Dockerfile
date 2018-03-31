# define image
FROM node:latest

# create directory structure
## create app directory
WORKDIR /app
## copy app source
COPY . .

# install apt packages for tests execution:
## chromium, xvfb
RUN apt-get -y update --fix-missing
RUN apt-get -y install --fix-missing --no-install-recommends apt-utils
RUN apt-get -y upgrade --fix-missing
RUN apt-get -y install --fix-missing chromium xvfb
## export variables for tests
ENV DISPLAY=:99
ENV CHROME_BIN=chromium
## start xvfb
RUN Xvfb :99 -screen 0 1680x1024x8 -nolisten tcp & sleep 2

# install and build
## install all local dependencies
## install global dependencies: gulp-cli
RUN npm install && \
	npm install -g gulp-cli

# run tests
RUN npm start

# uninstall unneeded npm dependencies if any
## uninstall dev deps, global deps, clean cache
RUN npm prune --production && \
	npm uninstall -g gulp-cli --save && \
	npm cache clean --force

## remove unneeded files
RUN rm ./*.json ./*.sh ./*.md ./Dockerfile* ./.dockerignore ./.editorconfig ./.eslintignore ./.gitignore

# don't purge previously installed packages via apt
# RUN apt-get purge -y chromium xvfb apt-utils
# RUN apt-get -y autoremove
# RUN apt-get -y clean

# run the application
## map app port
EXPOSE 8080
## define command to run app
CMD [ "node", "server.js" ]
