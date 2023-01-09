/** Third party dependencies */
const _ = require("lodash");



/** Application runtime configuration driven by engineering as well as product */
const Environments = {
    list: {
        DEVLOCAL: "devlocal",
        PREDEV: "predev",
        DEVELOPMENT: "dev",
        STAGING: "staging",
        PRODUCTION: "production",
    },
    get exceptLocalDev() {
        return _.omit(this.list, ["DEVLOCAL"]);
    },
    get exceptLocalDevKeys() {
        return [
            ...Object
                .values(
                    this.exceptLocalDev
                )
        ]
    },
};



const AppConfig = {
    environments: Environments,
}



module.exports = AppConfig;