// module.exports = {
//     jwtsecret: "knuvv76u188zd2xu8c4xa",
//     encrAlgorithm: "aes256",
//     encrSecret: "1hmmp2sk8owpg8mtxxe8a",
//     sql_host: 'localhost',
//     sql_port: "3306",
//     sql_user: 'root',
//     sql_password: 'mathias1991',
//     sql_database: 'yelp',
//     sql_connectionLimit: 50,
//     initDb: process.env.INITDB === "true"
// };
module.exports = {
    // connectionLimit : 1000,
    // connectTimeout  : 60 * 60 * 1000,
    // acquireTimeout  : 60 * 60 * 1000,
    // timeout         : 60 * 60 * 1000,
    sql_host: 'yelp-db.c24qs1tiowed.us-west-1.rds.amazonaws.com',
    sql_port: "3306",
    sql_user: 'yelp_admin',
    sql_password: 'yelp_admin',
    sql_database: 'yelp',
    sql_connectionLimit: 50,
    initDb: process.env.INITDB === "true"
};