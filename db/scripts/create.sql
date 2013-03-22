create table UserModel(username VARCHAR(255), firstName VARCHAR(255), lastName VARCHAR(255), liquidAssets FLOAT, password VARCHAR(255), email VARCHAR(255));
create table BidModel(username VARCHAR(255), productId VARCHAR(255), bidTime DATETIME, maxAmmount FLOAT, numberShares INTEGER, success INTEGER);
create table ProductModel(productId VARCHAR(255), name VARCHAR(255), discovererId VARCHAR(255), description TEXT, lastSellPrice FLOAT, numberShares INTEGER, ipoTime DATETIME, picture VARCHAR(255));
create table InvestmentModel(username VARCHAR(255), productId VARCHAR(255), investmentTime DATETIME, numberShares INTEGER);
create table OfferModel(username VARCHAR(255), productId VARCHAR(255), offerTime DATETIME, minAmmount FLOAT, numberShares INTEGER, success INTEGER);
