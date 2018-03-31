# colours
source util-echo_colours.sh
# DEFAULT, BLACK, DARK_GRAY, RED, LIGHT_RED, GREEN, LIGHT_GREEN, BROWN, YELLOW,
# BLUE, LIGHT_BLUE, PURPLE, LIGHT_PURPLE, CYAN, LIGHT_CYAN, LIGHT_GRAY, WHITE

# build docker container

# and start if no arguments are provided
if [ 1 -gt $# ]; then
	printf " ${GREEN} >> building docker container ...${DEFAULT} "
	sudo docker build -t rfprod/protractorbot -f ./Dockerfile .
	printf " ${GREEN} >> starting docker container ...${DEFAULT} "
	sudo docker run --rm -it -p 127.0.0.1:8080:8080 rfprod/protractorbot:latest
fi

if [ $# -gt 0 ]; then

	# build
	if [ $1 = 'build' ]; then
		printf " ${GREEN} >> building docker container ...${DEFAULT} "
		sudo docker build -t rfprod/protractorbot -f ./Dockerfile .
	fi

	# start
	if [ $1 = 'start' ]; then
		printf " ${GREEN} >> starting docker container ...${DEFAULT} "
		sudo docker run --rm -it -p 127.0.0.1:8080:8080 rfprod/protractorbot:latest
	fi

fi
