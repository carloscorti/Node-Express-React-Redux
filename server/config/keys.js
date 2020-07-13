// module.exports = {
//   mongoConnectionString:
//     'mongodb+srv://Emaly123:Emaly123@libraryapp-kdpt9.mongodb.net/Emaly?retryWrites=true&w=majority',
//   sessionKey: 'Zunzunegui10¡D',
//   googleClientID:
//     '1001745929396-2hmphuqo95900q832nan1tp3sk4quiqc.apps.googleusercontent.com',
//   googleClientSecret: 'LGCNVxG0wkf_dzQ32HKPh2qw',
// };

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
