"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("../utils");

var _patterns = require("../patterns");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PLAYER_ID_PREFIX = 'react-player-';
var ORIGIN = 'https://embed.nicovideo.jp';

var Niconico = /*#__PURE__*/function (_Component) {
  _inherits(Niconico, _Component);

  var _super = _createSuper(Niconico);

  function Niconico() {
    var _this;

    _classCallCheck(this, Niconico);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "duration", null);

    _defineProperty(_assertThisInitialized(_this), "currentTime", null);

    _defineProperty(_assertThisInitialized(_this), "secondsLoaded", null);

    _defineProperty(_assertThisInitialized(_this), "playerID", _this.props.config.playerId || "".concat(PLAYER_ID_PREFIX).concat((0, _utils.randomString)()));

    _defineProperty(_assertThisInitialized(_this), "handleMessage", function (event) {
      if (event.origin !== ORIGIN) {
        return;
      }

      if (typeof event.data.eventName !== 'string') {
        return;
      }

      if (event.data.eventName === 'error') {
        _this.props.onError(event.data.data);
      }

      if (event.data.eventName === 'loadComplete') {
        _this.props.onReady();
      }

      if (event.data.eventName === 'playerStatusChange') {
        if (event.data.data.playerStatus === 2) {
          _this.props.onPlay();
        }

        if (event.data.data.playerStatus === 3) {
          _this.props.onPause();
        }

        if (event.data.data.playerStatus === 4) {
          _this.props.onEnded();
        }
      }

      if (event.data.eventName === 'playerMetadataChange') {
        _this.duration = event.data.data.duration / 1000;
        _this.currentTime = event.data.data.currentTime / 1000;
        _this.secondsLoaded = event.data.data.maximumBuffered / 1000;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "postMessage", function (eventName) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!_this.iframe || !_this.iframe.contentWindow) {
        return;
      }

      _this.iframe.contentWindow.postMessage({
        eventName: eventName,
        data: data,
        sourceConnectorType: 1,
        playerId: _this.playerID
      }, ORIGIN);
    });

    _defineProperty(_assertThisInitialized(_this), "mute", function () {
      _this.postMessage('mute', {
        mute: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "unmute", function () {
      _this.postMessage('unmute', {
        mute: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "showComment", function () {
      _this.postMessage('commentVisibilityChange', {
        commentVisibility: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "hideComment", function () {
      _this.postMessage('commentVisibilityChange', {
        commentVisibility: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "ref", function (iframe) {
      _this.iframe = iframe;
    });

    return _this;
  }

  _createClass(Niconico, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.onMount && this.props.onMount(this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      globalThis.removeEventListener('message', this.handleMessage);
    }
  }, {
    key: "load",
    value: function load(url) {
      if (!this.iframe) return;
      globalThis.addEventListener('message', this.handleMessage);

      if (this.props.muted) {
        this.player.mute();
      }

      if (this.props.config.comment === false) {
        this.hideComment();
      } else {
        this.showComment();
      }
    }
  }, {
    key: "play",
    value: function play() {
      this.postMessage('play');
    }
  }, {
    key: "pause",
    value: function pause() {
      this.postMessage('pause');
    }
  }, {
    key: "stop",
    value: function stop() {// Nothing to do
    }
  }, {
    key: "seekTo",
    value: function seekTo(seconds) {
      this.postMessage('seek', {
        time: seconds * 1000
      });
    }
  }, {
    key: "setVolume",
    value: function setVolume(fraction) {
      this.postMessage('volumeChange', {
        volume: fraction
      });
    }
  }, {
    key: "setLoop",
    value: function setLoop(loop) {// Not supported
    }
  }, {
    key: "getDuration",
    value: function getDuration() {
      return this.duration;
    }
  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      return this.currentTime;
    }
  }, {
    key: "getSecondsLoaded",
    value: function getSecondsLoaded() {
      return this.secondsLoaded;
    }
  }, {
    key: "render",
    value: function render() {
      var id = this.props.url.match(_patterns.MATCH_URL_NICONICO)[1];
      var style = {
        width: '100%',
        height: '100%'
      };
      return /*#__PURE__*/_react["default"].createElement("iframe", {
        ref: this.ref,
        src: "https://embed.nicovideo.jp/watch/".concat(id, "?jsapi=1&playerId=").concat(this.playerID),
        frameBorder: "0",
        scrolling: "no",
        style: style,
        allow: "encrypted-media; autoplay; fullscreen;"
      });
    }
  }]);

  return Niconico;
}(_react.Component);

exports["default"] = Niconico;

_defineProperty(Niconico, "displayName", 'Niconico');

_defineProperty(Niconico, "canPlay", _patterns.canPlay.niconico);