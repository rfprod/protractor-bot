#	create .env file with the following contents
#	HOST=website_domain
#	LOGIN=account_email_or_login
#	PASSWORD=account_password
#	PASSES=number_of_passes

# colours
source util-echo_colours.sh
# DEFAULT, BLACK, DARK_GRAY, RED, LIGHT_RED, GREEN, LIGHT_GREEN, BROWN, YELLOW,
# BLUE, LIGHT_BLUE, PURPLE, LIGHT_PURPLE, CYAN, LIGHT_CYAN, LIGHT_GRAY, WHITE

if [ $# -ne 4 ]; then
  printf "${RED} << ERROR: four arguments expected >>\n"
  printf " ${LIGHT_GREEN} $0 usage:\n  ${YELLOW}bash create-env.sh http://website.url account_email_or_login account_password number_of_passes\n${DEFAULT}"
  exit 1
fi
#echo 'HOST' $1
#echo 'LOGIN' $2
#echo 'PASSWORD' $3
#echo 'PASSES' $4
#echo ' >> starting email service prerequisites ...'
printf " ${LIGHT_BLUE} >> creating .env file with the following contents:\n"
printf " ${YELLOW}  >> HOST=$1\n"
printf " ${YELLOW}  >> LOGIN=$2\n"
printf " ${YELLOW}  >> PASSWORD=$3\n"
printf " ${YELLOW}  >> PASSES=$4\n"
echo "HOST=$1" >./.env # overwrite .env first
echo "LOGIN=$2" >>./.env # then append
echo "PASSWORD=$3" >>./.env
echo "PASSES=$4" >>./.env
printf " ${GREEN} >> successfully created .env file ...${DEFAULT} "
echo ""
