#	create .env file with the following contents
#	HOST=website_domain
#	LOGIN=account_email_or_login
#	PASSWORD=account_password
#	PASSES=number_of_passes
#	MAILER_HOST=MAILER_HOST
#	MAILER_PORT=MAILER_PORT
#	MAILER_EMAIL=MAILER_EMAIL
#	MAILER_CLIENT_ID=MAILER_CLIENT_ID
#	MAILER_CLIENT_SECRET=MAILER_CLIENT_SECRET
#	MAILER_REFRESH_TOKEN=MAILER_REFRESH_TOKEN
#	MAILER_ACCESS_TOKEN=MAILER_ACCESS_TOKEN
#	MAILER_RECIPIENT_EMAIL=MAILER_RECIPIENT_EMAIL

# colours
source util-echo_colours.sh
# DEFAULT, BLACK, DARK_GRAY, RED, LIGHT_RED, GREEN, LIGHT_GREEN, BROWN, YELLOW,
# BLUE, LIGHT_BLUE, PURPLE, LIGHT_PURPLE, CYAN, LIGHT_CYAN, LIGHT_GRAY, WHITE

if [ $# -ne 11 ]; then
  printf "${RED} << ERROR: 11 arguments expected >>\n"
  printf " ${LIGHT_GREEN} $0 usage:\n  ${YELLOW}bash create-env.sh http://website.url account_email_or_login account_password number_of_passes MAILER_HOST MAILER_PORT MAILER_EMAIL MAILER_CLIENT_ID MAILER_CLIENT_SECRET MAILER_REFRESH_TOKEN MAILER_RECIPIENT_EMAIL\n${DEFAULT}"
  exit 1
fi
#echo 'HOST' $1
#echo 'LOGIN' $2
#echo 'PASSWORD' $3
#echo 'PASSES' $4
printf " ${LIGHT_BLUE} >> creating .env file with the following contents:\n"
printf " ${YELLOW}  >> HOST=$1\n"
printf " ${YELLOW}  >> LOGIN=$2\n"
printf " ${YELLOW}  >> PASSWORD=$3\n"
printf " ${YELLOW}  >> PASSES=$4\n"
printf " ${YELLOW}  >> MAILER_HOST=$5\n"
printf " ${YELLOW}  >> MAILER_PORT=$6\n"
printf " ${YELLOW}  >> MAILER_EMAIL=$7\n"
printf " ${YELLOW}  >> MAILER_CLIENT_ID=$8\n"
printf " ${YELLOW}  >> MAILER_CLIENT_SECRET=$9\n"
printf " ${YELLOW}  >> MAILER_REFRESH_TOKEN=$10\n"
printf " ${YELLOW}  >> MAILER_ACCESS_TOKEN=empty\n"
printf " ${YELLOW}  >> MAILER_RECIPIENT_EMAIL=$11\n"
echo "HOST=$1" >./.env # overwrite .env first
echo "LOGIN=$2" >>./.env # then append
echo "PASSWORD=$3" >>./.env
echo "PASSES=$4" >>./.env
echo "MAILER_HOST=$5" >>./.env
echo "MAILER_PORT=$6" >>./.env
echo "MAILER_EMAIL=$7" >>./.env
echo "MAILER_CLIENT_ID=$8" >>./.env
echo "MAILER_CLIENT_SECRET=$9" >>./.env
echo "MAILER_REFRESH_TOKEN=$10" >>./.env
echo "MAILER_ACCESS_TOKEN=$11" >>./.env
echo "MAILER_RECIPIENT_EMAIL=$12" >>./.env
printf " ${GREEN} >> successfully created .env file ...${DEFAULT} "
echo ""
