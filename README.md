# Soundverse Monorepo

## How to set it up on your localhost

### Install dependencies 

CD to the main folder.

Install all dependencies with `yarn`.

## Spin up the Docker containers

To start the locally needed docker containers, enter `docker-compose up` (make sure to install docker first).

## Spin up a local Blockchain 

Start the local RPC node by switching to the contract repository "soundverse-contracts" - go to the main folder and install the dependencies with `npm install`.

After that, enter `npm run prepare`.

This will spin up a local hardhat node for you. 

IMPORTANT! Don't close this terminal.

Now open a new terminal and enter `npm run dev` - this will deploy the smart contracts on your local maschine.

After that, you can add the local blockchain to your Metamask like so:

![image](https://user-images.githubusercontent.com/26215602/147201969-67f35713-a7e6-43c6-9468-5cc0db31f5f8.png)

If you paid close attention, the command `npm run prepare` also outputted a couple of eth accounts with 1000eth in it. Copy paste their private key in your Metamask to do some testing on your dev maschine.

## Start the dev environment

Go back to the this Monorepo and start development with `yarn dev`. (Keep in mind to leave the hardhat node open in a seperate terminal)

Now you're ready to go. Happy coding.

*Sidenotes*

The frontend is accessable via http://localhost:3000

Access the Grahql playground with http://localhost:8001/graphql 
