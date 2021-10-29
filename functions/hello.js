exports.handler = function(event, context, callback) {
  callback(null, {
   statusCode: 200,
   body: 'うえええええ！',
   headers: {
     'Content-type': 'application/json;charset=UTF-8'
   }
  })
 }