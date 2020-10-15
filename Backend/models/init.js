const query = `CREATE TABLE Customer (
    id varchar(255) PRIMARY KEY NOT NULL,
    username varchar(255)
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    DOB DATE NOT NULL,
    city varchar(255) NOT NULL,
    state varchar(255) NOT NULL,
    country varchar(255) NOT NULL,
    nickName varchar(255) NOT NULL,
    phoneNumber varchar(255) NOT NULL,
    yelpingSince DATE NOT NULL,
    thingsILove varchar(255) NOT NULL,
    websiteDetails varchar(255) NOT NULL,
    profileImage varchar(255)
)`;

module.exports = query;

