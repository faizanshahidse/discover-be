/** Local libraries and dependencies */
const {
    httpsRequest,
} = require('../utils');



/** local declarations and configurations */
const {
    AppConfig: { microservices }
} = require('../config');



/** Local imports and statics */
const {
    errorMessages,
} = require('../imports');



class Bridge {

    microservice;

    constructor(module) {
        this.microservice = microservices[module];

        if (!this.microservice)
            throw new Error(errorMessages.Applicaton.MicroserviceModuleMissing.message);
    }


    getHttp = async (options) => {
        const { endpoint: host } = this.microservice;

        Object.assign(
            options,
            {
                ...options,
                host,
            }
        )

        return await httpsRequest(options);
    }
}



class HomeMediaBridge extends Bridge {
    constructor() {
        super('homemedia')
    }
}



class MatchesBridge extends Bridge {
    constructor() {
        super('matches')
    }
}



module.exports = {
    Bridge,
    HomeMediaBridge,
    MatchesBridge,
}