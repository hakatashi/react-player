
      var createReactPlayer = require('./lib/ReactPlayer').createReactPlayer
      var Player = require('./lib/players/Niconico').default
      module.exports = createReactPlayer([{
        key: 'niconico',
        canPlay: Player.canPlay,
        lazyPlayer: Player
      }])
    