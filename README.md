# NotionalApi
An Api Gateway for Cosmos chains.


### Getting started
```console
# to install packages
yarn

# to create a sqlite dev-db in /prisma/dev.db with some dummy data into dev-db
yarn dev_db_init

# start webapp at http://localhost:3000
yarn dev
```


### MVP 1:
- user:
	- [ ] reg with email
	- [x] login/logout
	- [ ]reset password

- api-key:
	- [x] listing api-keys
	- [x] adding new api-key
	- [ ]deleting an api-key

- point system:
	- [ ] ordering points with a payment gateway (pay.binance.com or coinbase.com/commerce or osmosis USDC)
	- [ ] view historical orders
	- [ ] view points usage
		+ status
		+ historical (daily)
