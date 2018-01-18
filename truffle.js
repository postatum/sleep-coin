module.exports = {
    package_name: "Sleep Coin",
    version: "0.0.1",
    description: "Simple Coin to motivate you to sleep",
    keywords: ["ethereum", "token"],
    license: "MIT",

    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*"
        },
        live: {
            // Add live network config
        }
    }

};
