# Protractor bot

for arbitrary website testing

## Requirements

- [`Node.js`](https://nodejs.org/)
- [`NPM`](https://nodejs.org/)
- [`Git`](https://git-scm.com/)

## Installation

from the projects root folder execute

```
git clone https://github.com/rfprod/protractor-bot.git
```

now execute

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
MAILER_RECIPIENT_EMAIL=dummy-recipient-email@gmail.com
```

try using command

```
npm run create-env http://website.url account_email_or_login account_password number_of_passes
```

or which is the same

```
bash create-env.sh http://website.url account_email_or_login account_password number_of_passes
```

## Start

execute from `protractor-bot` root

```
npm start
```

## References

[Protractor](http://www.protractortest.org/#/api)

## Licence

[Protractor bot](LICENSE)
