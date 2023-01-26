/** Core dependencies and libraries */
const https = require('https');

const http = require('http');

const { isJsonString } = require('./common');


/** Application configuration and declartions */
const httpConfig = {
  timeout: 10000,
}

const {
  AppConfig: {
    httpRules: {
      allowedAuthorizations,
      successCodes,
    },
  }
} = require('../config');



/** local constancs and imports */
const {
  Constants: { networkPort }
} = require('../imports');



const httpsRequest = (options = {}) => {
  let {
    secure = true,
    url,
    authorized,
    ...rest
  } = options;

  rest = {
    ...rest,
    ...httpConfig,
  };


  /** Extending the request function to also cater in-secure origins - HTTP */
  const useHttpModule = secure
    ? https
    : http; 


  if (authorized?.type === allowedAuthorizations.types.Bearer) {
    let { token: Authorization } = authorized;

    Authorization = `Bearer ${Authorization}`;
    const content_type = {
      'Content-Type': 'application/json'
    }

    Object.assign(
      rest,
      {
        headers: { Authorization, ...content_type }
      }
    );
  }

  return new Promise((resolve, reject) => {
    useHttpModule.get(
      url,
      rest,
      (response) => {
        let str = '';

        //another chunk of data has been received, so append it to `str`
        response
          .on('data', (chunk) => {
            str += chunk;
          });

        //the whole response has been received, so we just print it out here
        response
          .on('end', () => {
            const responseObject = isJsonString(str) && JSON.parse(str);
            console.log('str...', str);

            const { status_code, error_msgs } = responseObject;

            if(status_code > successCodes.maximum)
              reject(error_msgs);

            resolve(responseObject);
          });
      }
    )
      .on('error', (error) => {
        console.log('ERROR: ', error);
        reject(error);
      })
  })

}



module.exports = { httpsRequest };