"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AutoInput = function (_Component) {
  (0, _inherits3.default)(AutoInput, _Component);

  function AutoInput() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AutoInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AutoInput.__proto__ || Object.getPrototypeOf(AutoInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: "",
      result: [],
      style: {},
      activeItemIndex: 9
    }, _this.handleClick = function (index) {
      var result = _this.state.result;

      var value = result[index].text;

      _this.setState({
        result: [],
        value: value
      });
    }, _this.handleHover = function (activeItemIndex) {
      _this.setState({ activeItemIndex: activeItemIndex });
    }, _this.handleKeyUp = function (event) {
      var keyCode = event.keyCode;
      var _AutoInput$keyCode = AutoInput.keyCode,
          up = _AutoInput$keyCode.up,
          down = _AutoInput$keyCode.down,
          enter = _AutoInput$keyCode.enter,
          tab = _AutoInput$keyCode.tab;
      var _this$state = _this.state,
          activeItemIndex = _this$state.activeItemIndex,
          result = _this$state.result;

      var lastIndex = result.length - 1;

      if (keyCode === tab && result.length) {
        event.preventDefault();
        return false;
      }

      if (keyCode === up) {
        _this.setState(function (_ref2) {
          var index = _ref2.activeItemIndex;
          return {
            activeItemIndex: index > 0 ? index - 1 : lastIndex
          };
        });
        return;
      }

      if (keyCode === down) {
        _this.setState(function (_ref3) {
          var index = _ref3.activeItemIndex;
          return {
            activeItemIndex: index < lastIndex ? index + 1 : 0
          };
        });
        return;
      }

      if ((keyCode === enter || keyCode === tab) && activeItemIndex > -1) {
        event.preventDefault();
        var value = result[activeItemIndex].text;

        _this.setState({
          activeItemIndex: -1,
          result: [],
          value: value
        });
        return;
      }
    }, _this.handleChange = function (_ref4) {
      var value = _ref4.target.value;

      _this.setState({ value: value, activeItemIndex: -1 });
      _this.search(value);
    }, _this.search = function (value) {
      var _this$props = _this.props,
          data = _this$props.data,
          _this$props$limit = _this$props.limit,
          limit = _this$props$limit === undefined ? 10 : _this$props$limit,
          field = _this$props.field,
          lang = _this$props.lang;


      if (typeof data === "function") {
        data = _this.fetch(value);
      }

      if (!Array.isArray(data)) {
        data = [];
      }

      var result = [];
      var activeItem = void 0;

      data.forEach(function (item, index) {
        if (field) {
          activeItem = mb(field)(item) || "";
        } else {
          activeItem = item;
        }

        var activeLang = lang ? lang : "en-EN";
        var check = activeItem.toLocaleLowerCase(activeLang).includes(value.toLocaleLowerCase(activeLang));

        if (check) {
          result.push({
            id: item && item.id || index,
            text: activeItem
          });
        }
      });

      _this.setState({
        result: value.length ? result.slice(0, limit) : []
      });
    }, _this.fetch = function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(value) {
        var data;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = _this.props.data;
                _context.next = 3;
                return data(value);

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref5.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AutoInput, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          result = _state.result,
          activeItemIndex = _state.activeItemIndex,
          value = _state.value;
      var customItem = this.props.customItem;


      var AutoInputItem = customItem ? customItem : AutoInputItem;
      return _react2.default.createElement(
        "div",
        {
          className: "autoinput autoinput-wrapper",
          style: { display: "inline-flex", flexDirection: "column" }
        },
        _react2.default.createElement(AutoInputElement, {
          value: value,
          onChange: this.handleChange,
          onKeyUp: this.handleKeyUp
        }),
        result.length > 0 && _react2.default.createElement(
          "div",
          { className: "autoinput-result" },
          result.map(function (item, index) {
            return _react2.default.createElement(AutoInputItem, {
              text: item.text,
              isActive: activeItemIndex === index,
              searchKey: value,
              onMouseOver: function onMouseOver() {
                return _this3.handleHover(index);
              }
            });
          })
        )
      );
    }
  }]);
  return AutoInput;
}(_react.Component);

AutoInput.keyCode = {
  up: 38,
  down: 40,
  enter: 13,
  tab: 9
};


function AutoInputElement(_ref6) {
  var value = _ref6.value,
      onChange = _ref6.onChange,
      onKeyUp = _ref6.onKeyUp;

  return _react2.default.createElement("input", {
    className: "autoinput-input",
    type: "text",
    value: value,
    onChange: onChange,
    onKeyUp: onKeyUp
  });
}

function AutoInputWord(_ref7) {
  var value = _ref7.value;

  return _react2.default.createElement(
    "span",
    { className: "autoinput-word" },
    value
  );
}

function AutoInputItem(_ref8) {
  var isActive = _ref8.isActive,
      text = _ref8.text,
      searchKey = _ref8.searchKey,
      onMouseOver = _ref8.onMouseOver;

  var className = "autoinput-item" + (isActive ? " autoinput-item__active" : "");
  return _react2.default.createElement(
    "div",
    { className: className, onMouseOver: onMouseOver },
    text.split(searchKey).map(function (item, index) {
      return text.length - 1 !== index ? [_react2.default.createElement(
        "span",
        null,
        item
      ), _react2.default.createElement(AutoInputWord, { value: searchKey })] : item;
    })
  );
}

// mb origin: https://github.com/burakcan/mb
var mb = function mb(p) {
  return function (o) {
    return p.split(".").map(function (c) {
      return o = (o || {})[c];
    }) && o;
  };
};

exports.default = AutoInput;