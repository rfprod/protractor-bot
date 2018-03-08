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
