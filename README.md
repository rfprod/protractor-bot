# Protractor bot

Website testing tool.

## Requirements

- [`Node.js`](https://nodejs.org/)
- [`NPM`](https://nodejs.org/)
- [`Git`](https://git-scm.com/)

## Installation

From the projects root folder execute

```
git clone https://github.com/rfprod/protractor-bot.git
```

Next execute

```
cd protractor-bot
```

## Environment variables

`.env` file should be created in the project root with the following environment variables inside

```
HOST=website_domain
LOGIN=account_email_or_login
PASSWORD=account_password
PASSES=number_of_passes

MAILER_HOST=smtp.gmail.com
MAILER_PORT=465
MAILER_EMAIL=dummy-sender-email@gmail.com
MAILER_CLIENT_ID=dummy-client-id.apps.googleusercontent.com
MAILER_CLIENT_SECRET=dummy-client-secret
MAILER_REFRESH_TOKEN=dummy-refresh-token
MAILER_ACCESS_TOKEN=dummy-access-token
MAILER_RECIPIENT_EMAIL=dummy-recipient-email@gmail.com
```

Try using command

```
npm run create-env http://website.url account_email_or_login account_password number_of_passes MAILER_HOST MAILER_PORT MAILER_EMAIL MAILER_CLIENT_ID MAILER_CLIENT_SECRET MAILER_REFRESH_TOKEN MAILER_ACCESS_TOKEN MAILER_RECIPIENT_EMAIL
```

or which is the same

```
bash create-env.sh http://website.url account_email_or_login account_password number_of_passes MAILER_HOST MAILER_PORT MAILER_EMAIL MAILER_CLIENT_ID MAILER_CLIENT_SECRET MAILER_REFRESH_TOKEN MAILER_ACCESS_TOKEN MAILER_RECIPIENT_EMAIL
```

### Mailer notice

To use gmail with mail transporter [less secure apps](https://myaccount.google.com/lesssecureapps) should be enabled for an email account which will be used.

## Start

Execute from `protractor-bot` root to run tests

```
npm start
```

## Server

`Protractor bot` can be started as a server with scheduled time to run protractor tests

```
npm run server
```

## Docker

`Protractor bot` server can be built as a Docker container

build and start

```
npm run docker
```

build only

```
npm run docker-build
```

start only

```
npm run docker-start
```

## References

[Protractor](http://www.protractortest.org/#/api)

## Licence

[Protractor bot](LICENSE)
