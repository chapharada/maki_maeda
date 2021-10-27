const axios = require('axios');

exports.handler = async (event) => {
  const { draftKey } = event.queryStringParameters;
  return axios.get(
      `https://maedamaki.microcms.io/api/v1/pagecv?draftKey=${draftKey}`,
      {
        headers: { 'X-MICROCMS-API-KEY': '979601df4f7940ffa39f9c5afc3cf197dd75' },
      }
    )
    .then(({ data }) => ({
      statusCode: 200,
      body: JSON.stringify(data),
    }))
    .catch((error) => {
      return {
        statusCode: error.response.status,
        body: JSON.stringify(error.response.data),
      }
    });
};
