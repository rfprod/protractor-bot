# colours
source util-echo_colours.sh
# DEFAULT, BLACK, DARK_GRAY, RED, LIGHT_RED, GREEN, LIGHT_GREEN, BROWN, YELLOW,
# BLUE, LIGHT_BLUE, PURPLE, LIGHT_PURPLE, CYAN, LIGHT_CYAN, LIGHT_GRAY, WHITE

# builds docker image
function buildDockerImage {
  printf " ${GREEN} >> building docker container ...${DEFAULT} "
  sudo docker build -t rfprod/protractorbot -f ci/dock-protractorbot.Dockerfile .
}

# starts docker container
function runDockerContainer {
  printf " ${GREEN} >> starting docker container ...${DEFAULT} "
  sudo docker run --rm -it -p 127.0.0.1:8080:8080 rfprod/protractorbot:latest
}

# and start if no arguments are provided
if [ 1 -gt $# ]; then
  buildDockerImage
  runDockerContainer
fi

if [ $# -gt 0 ]; then

  # build
  if [ $1 = 'build' ]; then
    buildDockerImage
  fi

  # start
  if [ $1 = 'start' ]; then
    runDockerContainer
  fi

fi
