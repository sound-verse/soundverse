//Usage: ../../node_modules/.bin/ts-node ./src/scripts/spawnDummyNfts.ts
import { MongoClient } from 'mongodb';
import { ethers } from 'ethers';

const createVoucherSignature = async (voucher, signer) => {
  const voucherString = JSON.stringify(voucher);
  const voucherHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(voucherString));
  const signature = await signer.signMessage(ethers.utils.arrayify(voucherHash));
  return signature;
};

const main = async () => {
  // Config

  const DUMMY_AMOUNT = 100;

  const client = await MongoClient.connect(
    'mongodb://root:root@localhost:27017/soundverse?authSource=admin&retryWrites=false',
  );

  const db = client.db();

  const walletAddress = '0xE39569EF2A516f0CA065a8dA698C79EE739D02c1';
  const privateKey = 'dba25f2301e49b76b8381d57007312555d8fed8b4e54372838f67b08c334d026';
  const signer = new ethers.Wallet(privateKey);

  // Spawing Nfts

  const chainId = 8001;
  const ipfsUrl = 'http://ipfs.local/';
  const active = true;
  const createdAt = new Date();
  const creatorOwnerSplit = 5000;
  const filePictureUrl = 'http://localhost:3000/dummy/dummy.jpg';
  const fileUrl = 'http://localhost:3000/dummy/dummy.mp3';
  const licenseContractAddress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512';
  const masterContractAddress = '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9';
  const royaltyFeeLicense = 5000;
  const royaltyFeeMaster = 5000;
  const soundWave = [
    0.06668534874916077, -0.05741075426340103, 0.05851012468338013, -0.09296835213899612, 0.07477575540542603,
    -0.08782101422548294, 0.11066360026597977, -0.0477738082408905, 0.11248180270195007, -0.06280726194381714,
    0.05673525854945183, -0.16519753634929657, 0.024955160915851593, -0.04258160665631294,
    0.056970562785863876, -0.11238270998001099, 0.09637515246868134, -0.04308032989501953,
    0.03724837675690651, -0.05804464593529701,
  ];
  const supply = 100;
  const trackDuration = 166;
  const verified = true;

  let creator = await db.collection('users').findOne({ ethAddress: walletAddress.toLowerCase() });

  if (!creator) {
    await db
      .collection('users')
      .insertOne({ ethAddress: walletAddress.toLowerCase(), createdAt: new Date() });
    creator = await db.collection('users').findOne({ ethAddress: walletAddress.toLowerCase() });
  }

  const masterOwner = { user: creator._id, supply: 1 };
  const licenseOwners = [{ user: creator._id, supply: 100 }];

  const dummyArray = new Array(DUMMY_AMOUNT).fill(0);
  const dummyNfts = await Promise.all(
    dummyArray.map(async (_, index) => {
      const id = await db.collection('nfts').insertOne({
        chainId,
        ipfsUrl: `${ipfsUrl}${index}`,
        active,
        createdAt,
        creator: creator._id,
        creatorOwnerSplit,
        filePictureUrl,
        fileUrl,
        licenseContractAddress,
        masterContractAddress,
        royaltyFeeLicense,
        royaltyFeeMaster,
        soundWave,
        supply,
        trackDuration,
        verified,
        masterOwner,
        licenseOwners,
        metadata: {
          name: `Dummy NFT ${index}`,
          description: `Dummy NFT ${index}`,
        },
      });

      return await db.collection('nfts').findOne({ _id: id.insertedId });
    }),
  );

  // Spawning Sellings

  const seller = creator._id;
  const marketplaceContractAddress = '0x5fc8d32690cc91d4c39d9d3abcbd16989f875707';
  const sellingStatus = 'OPEN';

  const dummySellings = await Promise.all(
    dummyNfts.map(async (nft) => {
      const mintVoucherMaster = {
        price: '1000000000000000000',
        tokenUri: nft.ipfsUrl,
        supply: 1,
        maxSupply: nft.supply,
        isMaster: true,
        currency: 'MATIC',
        royaltyFeeMaster: 1000,
        royaltyFeeLicense: 1000,
        creatorOwnerSplit: 5000,
        validUntil: 1691759227703,
      };

      const mintVoucherMasterSignature = await createVoucherSignature(mintVoucherMaster, signer);

      const mintVocherMasterWithSignature = { ...mintVoucherMaster, signature: mintVoucherMasterSignature };

      await db.collection('sellings').insertOne({
        nft: nft._id,
        seller,
        nftType: 'MASTER',
        mintVoucher: mintVocherMasterWithSignature,
        marketplaceContractAddress,
        sellingStatus,
        createdAt,
      });

      const mintVoucherLicense = {
        price: '1000000000000000000',
        tokenUri: nft.ipfsUrl,
        supply: nft.supply,
        maxSupply: nft.supply,
        isMaster: false,
        currency: 'MATIC',
        royaltyFeeMaster: 1000,
        royaltyFeeLicense: 1000,
        creatorOwnerSplit: 5000,
        validUntil: 1691759227703,
      };

      const mintVoucherLicenseSignature = await createVoucherSignature(mintVoucherLicense, signer);

      const mintVocherLicenseWithSignature = {
        ...mintVoucherLicense,
        signature: mintVoucherLicenseSignature,
      };

      await db.collection('sellings').insertOne({
        nft: nft._id,
        seller,
        nftType: 'LICENSE',
        mintVoucher: mintVocherLicenseWithSignature,
        marketplaceContractAddress,
        sellingStatus,
        createdAt,
      });
    }),
  );

  process.exit(0);
};

try {
  if (require.main !== module) {
    console.log('This script can not be imported');
    process.exit(0);
  }

  void main();
} catch (ex) {
  console.error(ex);
}
