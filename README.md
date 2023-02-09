# NotionalApi
An Api Gateway for Cosmos chains.

### Getting started

Run this to create a sqlite dev db in `/prisma/dev.db`
```console
# to install packages
yarn

# to create a sqlite dev-db in /prisma/dev.db
yarn dev_db_init

# to insert some dummy data into dev-db
yarn dev_db_dummy_data

# start webapp at http://localhost:3000
yarn dev
```


### MVP 1:
- user:
	- reg with email
	- login/logout
	- reset password

- api-key:
	- listing api-keys
	- adding new api-key
	- deleting an api-key

- point system:
	- ordering points with a payment gateway (pay.binance.com or coinbase.com/commerce or osmosis USDC)
	- view historical orders
	- view points usage
		+ status
		+ historical (daily)
