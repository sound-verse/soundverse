# Soundverse Monorepo

Install all dependencies with `yarn`

To start the locally needed docker containers enter `docker-compose up` (make sure to install docker first)

Start the local RPC node by switching to the contract repo and enter `npx hardhat compile`
and then `npx hardhat node`
You then see a couple of default accounts created by hardhat. Copy paste one of the privte keys into your Metamask to receive 1000Eth for testing.

Start development with `yarn dev`

Default port for the frontend is `3000`
