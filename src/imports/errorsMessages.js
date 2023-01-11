const errorMessages = {
    General: {},
    Applicaton: {
        MicroserviceModuleMissing: {
            message: 'kindly define microservice bridge module',
        },
        RedisModuleMissing: {
            message: 'kindly define microservice for module identificaiton for redis',
        }
    },
    Business: {}
}


module.exports = {
    errorMessages,
}