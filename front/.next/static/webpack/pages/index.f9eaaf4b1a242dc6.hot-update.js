"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ _class; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_src_assert_this_initialized_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @swc/helpers/src/_assert_this_initialized.mjs */ \"./node_modules/@swc/helpers/src/_assert_this_initialized.mjs\");\n/* harmony import */ var _swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @swc/helpers/src/_async_to_generator.mjs */ \"./node_modules/@swc/helpers/src/_async_to_generator.mjs\");\n/* harmony import */ var _swc_helpers_src_class_call_check_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swc/helpers/src/_class_call_check.mjs */ \"./node_modules/@swc/helpers/src/_class_call_check.mjs\");\n/* harmony import */ var _swc_helpers_src_create_class_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @swc/helpers/src/_create_class.mjs */ \"./node_modules/@swc/helpers/src/_create_class.mjs\");\n/* harmony import */ var _swc_helpers_src_define_property_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @swc/helpers/src/_define_property.mjs */ \"./node_modules/@swc/helpers/src/_define_property.mjs\");\n/* harmony import */ var _swc_helpers_src_inherits_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/src/_inherits.mjs */ \"./node_modules/@swc/helpers/src/_inherits.mjs\");\n/* harmony import */ var _swc_helpers_src_sliced_to_array_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @swc/helpers/src/_sliced_to_array.mjs */ \"./node_modules/@swc/helpers/src/_sliced_to_array.mjs\");\n/* harmony import */ var _swc_helpers_src_create_super_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swc/helpers/src/_create_super.mjs */ \"./node_modules/@swc/helpers/src/_create_super.mjs\");\n/* harmony import */ var _swc_helpers_src_ts_generator_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @swc/helpers/src/_ts_generator.mjs */ \"./node_modules/@swc/helpers/src/_ts_generator.mjs\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ethers */ \"../node_modules/ethers/lib.esm/index.js\");\n/* harmony import */ var _components_ConnectWallet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/ConnectWallet */ \"./components/ConnectWallet.js\");\n/* harmony import */ var _contracts_DutchAuction_contracts_address_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contracts/DutchAuction-contracts-address.json */ \"./contracts/DutchAuction-contracts-address.json\");\n/* harmony import */ var _contracts_DutchAuction_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../contracts/DutchAuction.json */ \"./contracts/DutchAuction.json\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar HARDHAT_NETWORK_ID = \"31337\";\nvar ERROR_CODE_TX_REJECTED_BY_USER = 4001;\nvar _class = /*#__PURE__*/ function(Component) {\n    \"use strict\";\n    (0,_swc_helpers_src_inherits_mjs__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(_class, Component);\n    var _super = (0,_swc_helpers_src_create_super_mjs__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(_class);\n    function _class(props) {\n        (0,_swc_helpers_src_class_call_check_mjs__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(this, _class);\n        var _this;\n        _this = _super.call(this, props);\n        var _this1 = (0,_swc_helpers_src_assert_this_initialized_mjs__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(_this);\n        (0,_swc_helpers_src_define_property_mjs__WEBPACK_IMPORTED_MODULE_9__[\"default\"])((0,_swc_helpers_src_assert_this_initialized_mjs__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(_this), \"_connectWallet\", /*#__PURE__*/ (0,_swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_10__[\"default\"])(function() {\n            var _tmp, ref, selectedAddress, _tmp1;\n            return (0,_swc_helpers_src_ts_generator_mjs__WEBPACK_IMPORTED_MODULE_11__[\"default\"])(this, function(_state) {\n                switch(_state.label){\n                    case 0:\n                        _tmp = {};\n                        if (window.ethereum === undefined) {\n                            _this1.setState((_tmp.networkError = \"Pls, install MetaMusk\", _tmp));\n                            return [\n                                2\n                            ];\n                        }\n                        _tmp1 = {};\n                        return [\n                            4,\n                            window.ethereum.request((_tmp1.method = \"eth_requestAccounts\", _tmp1))\n                        ];\n                    case 1:\n                        ref = _swc_helpers_src_sliced_to_array_mjs__WEBPACK_IMPORTED_MODULE_12__[\"default\"].apply(void 0, [\n                            _state.sent(),\n                            1\n                        ]), selectedAddress = ref[0];\n                        if (!_this1._checkNetwork()) {\n                            return [\n                                2\n                            ];\n                        }\n                        _this1._initialize(selectedAddress);\n                        window.ethereum.on(\"accountChanged\", function(param) {\n                            var _param = (0,_swc_helpers_src_sliced_to_array_mjs__WEBPACK_IMPORTED_MODULE_12__[\"default\"])(param, 1), newAddress = _param[0];\n                            if (newAddress === undefined) {\n                                return _this1._resetState();\n                            }\n                        });\n                        return [\n                            2\n                        ];\n                }\n            });\n        }));\n        (0,_swc_helpers_src_define_property_mjs__WEBPACK_IMPORTED_MODULE_9__[\"default\"])((0,_swc_helpers_src_assert_this_initialized_mjs__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(_this), \"_dissmissNetworkError\", function() {\n            _this.setState({\n                networkError: null\n            });\n        });\n        _this.initialState = {\n            selectedAccount: null,\n            txBeingSent: false,\n            networkError: null,\n            transactionError: null,\n            balance: null\n        };\n        _this.state = _this.initialState;\n        return _this;\n    }\n    (0,_swc_helpers_src_create_class_mjs__WEBPACK_IMPORTED_MODULE_13__[\"default\"])(_class, [\n        {\n            key: \"_initialize\",\n            value: function _initialize(selectedAddress) {\n                var _this = this;\n                return (0,_swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_10__[\"default\"])(function() {\n                    var _tmp;\n                    return (0,_swc_helpers_src_ts_generator_mjs__WEBPACK_IMPORTED_MODULE_11__[\"default\"])(this, function(_state) {\n                        _this._provider = new ethers__WEBPACK_IMPORTED_MODULE_14__.ethers.providers.Web3Provider(window.ethereum);\n                        _this._auction = ethers__WEBPACK_IMPORTED_MODULE_14__.ethers.Contract(_contracts_DutchAuction_contracts_address_json__WEBPACK_IMPORTED_MODULE_3__.DutchAuction, _contracts_DutchAuction_json__WEBPACK_IMPORTED_MODULE_4__.abi, _this._provider.getSigner(0));\n                        _tmp = {};\n                        _this.setState((_tmp.selectedAccount = selectedAddress, _tmp), /*#__PURE__*/ (0,_swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_10__[\"default\"])(function() {\n                            return (0,_swc_helpers_src_ts_generator_mjs__WEBPACK_IMPORTED_MODULE_11__[\"default\"])(this, function(_state) {\n                                switch(_state.label){\n                                    case 0:\n                                        return [\n                                            4,\n                                            _this.updateBalance()\n                                        ];\n                                    case 1:\n                                        return [\n                                            2,\n                                            _state.sent()\n                                        ];\n                                }\n                            });\n                        }));\n                        return [\n                            2\n                        ];\n                    });\n                })();\n            }\n        },\n        {\n            key: \"updateBalance\",\n            value: function updateBalance() {\n                var _this = this;\n                return (0,_swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_10__[\"default\"])(function() {\n                    var newBalance, _tmp;\n                    return (0,_swc_helpers_src_ts_generator_mjs__WEBPACK_IMPORTED_MODULE_11__[\"default\"])(this, function(_state) {\n                        switch(_state.label){\n                            case 0:\n                                return [\n                                    4,\n                                    _this._provider.getBalance(_this.state.selectedAccount)\n                                ];\n                            case 1:\n                                newBalance = _state.sent().toString();\n                                _tmp = {};\n                                _this.setState((_tmp.balance = newBalance, _tmp));\n                                return [\n                                    2\n                                ];\n                        }\n                    });\n                })();\n            }\n        },\n        {\n            key: \"_resetState\",\n            value: function _resetState() {\n                this.setState(this.initialState);\n            }\n        },\n        {\n            key: \"_checkNetwork\",\n            value: function _checkNetwork() {\n                if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {\n                    return true;\n                }\n                this.setState({\n                    networkError: \"Pls, change network to localhost:8545\"\n                });\n                return false;\n            }\n        },\n        {\n            key: \"render\",\n            value: function render() {\n                if (!this.state.selectedAccount) {\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ConnectWallet__WEBPACK_IMPORTED_MODULE_2__.ConnectWallet, {\n                        connectWallet: this._connectWallet,\n                        networkError: this.state.networkError,\n                        dismiss: this._dissmissNetworkError\n                    }, void 0, false, {\n                        fileName: \"/home/vadzim/projects/blockchain/solidity/front/pages/index.js\",\n                        lineNumber: 92,\n                        columnNumber: 20\n                    }, this);\n                }\n                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                    children: this.state.balance && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: [\n                            \"Your balance: \",\n                            ethers__WEBPACK_IMPORTED_MODULE_14__.ethers.utils.formatEther(this.state.balance),\n                            \" ETH\"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/vadzim/projects/blockchain/solidity/front/pages/index.js\",\n                        lineNumber: 103,\n                        columnNumber: 25\n                    }, this)\n                }, void 0, false);\n            }\n        }\n    ]);\n    return _class;\n}(react__WEBPACK_IMPORTED_MODULE_1__.Component);\n\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFNBQUFBLFdBQVcsR0FBRztnQkFDVixJQUFJLENBQUNSLFFBQVEsQ0FBQyxJQUFJLENBQUNVLFlBQVksQ0FBQztZQUNwQyxDQUFDOzs7WUFFRE4sR0FBYSxFQUFiQSxlQUFhO21CQUFiQSxTQUFBQSxhQUFhLEdBQUc7Z0JBQ1osSUFBSVAsTUFBTSxDQUFDQyxRQUFRLENBQUM4QixjQUFjLEtBQUtwQyxrQkFBa0IsRUFBRTtvQkFDdkQsT0FBTyxJQUFJO2dCQUNmLENBQUM7Z0JBRUQsSUFBSSxDQUFDUSxRQUFRLENBQUM7b0JBQ1ZDLFlBQVksRUFBRSx1Q0FBdUM7aUJBQ3hELENBQUM7Z0JBRUYsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQzs7O1lBTUQ0QixHQUFNLEVBQU5BLFFBQU07bUJBQU5BLFNBQUFBLE1BQU0sR0FBRztnQkFDTCxJQUFJLENBQUMsSUFBSSxDQUFDZCxLQUFLLENBQUNKLGVBQWUsRUFBRTtvQkFDN0IscUJBQU8sOERBQUN0QixvRUFBYTt3QkFDakJ5QyxhQUFhLEVBQUUsSUFBSSxDQUFDbkMsY0FBYzt3QkFDbENNLFlBQVksRUFBRSxJQUFJLENBQUNjLEtBQUssQ0FBQ2QsWUFBWTt3QkFDckM4QixPQUFPLEVBQUUsSUFBSSxDQUFDdEIscUJBQXFCOzs7Ozs0QkFDckM7Z0JBQ04sQ0FBQztnQkFFRCxxQkFDSTs4QkFFUSxJQUFJLENBQUNNLEtBQUssQ0FBQ0QsT0FBTyxrQkFDZCw4REFBQ2tCLEdBQUM7OzRCQUFDLGdCQUFjOzRCQUFDNUMsNkRBQXdCLENBQUMsSUFBSSxDQUFDMkIsS0FBSyxDQUFDRCxPQUFPLENBQUM7NEJBQUMsTUFBSTs7Ozs7OzRCQUFJO2lDQUVoRixDQUNMO1lBQ04sQ0FBQzs7OztDQUNKLENBaEc0QjNCLDRDQUFTLENBZ0dyQztBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL2luZGV4LmpzP2JlZTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgeyBldGhlcnMgfSBmcm9tIFwiZXRoZXJzXCJcblxuaW1wb3J0IHsgQ29ubmVjdFdhbGxldCB9IGZyb20gXCIuLi9jb21wb25lbnRzL0Nvbm5lY3RXYWxsZXRcIlxuXG5pbXBvcnQgYXVjdGlvbkFkZHJlc3MgZnJvbSBcIi4uL2NvbnRyYWN0cy9EdXRjaEF1Y3Rpb24tY29udHJhY3RzLWFkZHJlc3MuanNvblwiXG5pbXBvcnQgYXVjdGlvbkFydGlmYWN0IGZyb20gXCIuLi9jb250cmFjdHMvRHV0Y2hBdWN0aW9uLmpzb25cIlxuXG5jb25zdCBIQVJESEFUX05FVFdPUktfSUQgPSAnMzEzMzcnXG5jb25zdCBFUlJPUl9DT0RFX1RYX1JFSkVDVEVEX0JZX1VTRVIgPSA0MDAxXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcylcblxuICAgICAgICB0aGlzLmluaXRpYWxTdGF0ZSA9IHtcbiAgICAgICAgICAgIHNlbGVjdGVkQWNjb3VudDogbnVsbCxcbiAgICAgICAgICAgIHR4QmVpbmdTZW50OiBmYWxzZSwgXG4gICAgICAgICAgICBuZXR3b3JrRXJyb3I6IG51bGwsXG4gICAgICAgICAgICB0cmFuc2FjdGlvbkVycm9yOiBudWxsLFxuICAgICAgICAgICAgYmFsYW5jZTogbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuaW5pdGlhbFN0YXRlO1xuICAgIH1cblxuICAgIF9jb25uZWN0V2FsbGV0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAod2luZG93LmV0aGVyZXVtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe25ldHdvcmtFcnJvcjogXCJQbHMsIGluc3RhbGwgTWV0YU11c2tcIn0pXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IFtzZWxlY3RlZEFkZHJlc3NdID0gYXdhaXQgd2luZG93LmV0aGVyZXVtLnJlcXVlc3Qoe1xuICAgICAgICAgICAgbWV0aG9kOiAnZXRoX3JlcXVlc3RBY2NvdW50cydcbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoIXRoaXMuX2NoZWNrTmV0d29yaygpKSB7IHJldHVybiB9XG5cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZShzZWxlY3RlZEFkZHJlc3MpXG5cbiAgICAgICAgd2luZG93LmV0aGVyZXVtLm9uKCdhY2NvdW50Q2hhbmdlZCcsIChbbmV3QWRkcmVzc10pID0+IHtcbiAgICAgICAgICAgIGlmIChuZXdBZGRyZXNzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVzZXRTdGF0ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYXN5bmMgX2luaXRpYWxpemUoc2VsZWN0ZWRBZGRyZXNzKSB7XG4gICAgICAgIHRoaXMuX3Byb3ZpZGVyID0gbmV3IGV0aGVycy5wcm92aWRlcnMuV2ViM1Byb3ZpZGVyKHdpbmRvdy5ldGhlcmV1bSlcblxuICAgICAgICB0aGlzLl9hdWN0aW9uID0gZXRoZXJzLkNvbnRyYWN0KFxuICAgICAgICAgICAgYXVjdGlvbkFkZHJlc3MuRHV0Y2hBdWN0aW9uLFxuICAgICAgICAgICAgYXVjdGlvbkFydGlmYWN0LmFiaSxcbiAgICAgICAgICAgIHRoaXMuX3Byb3ZpZGVyLmdldFNpZ25lcigwKVxuICAgICAgICApXG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzZWxlY3RlZEFjY291bnQ6IHNlbGVjdGVkQWRkcmVzc1xuICAgICAgICB9LCBhc3luYyAoKSA9PiBhd2FpdCB0aGlzLnVwZGF0ZUJhbGFuY2UoKSlcbiAgICB9XG5cbiAgICBhc3luYyB1cGRhdGVCYWxhbmNlKCkge1xuICAgICAgICBjb25zdCBuZXdCYWxhbmNlID0gKGF3YWl0IHRoaXMuX3Byb3ZpZGVyLmdldEJhbGFuY2UoXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkQWNjb3VudFxuICAgICAgICApKS50b1N0cmluZygpXG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YmFsYW5jZTogbmV3QmFsYW5jZX0pXG4gICAgfVxuXG4gICAgX3Jlc2V0U3RhdGUoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5pbml0aWFsU3RhdGUpXG4gICAgfVxuXG4gICAgX2NoZWNrTmV0d29yaygpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5ldGhlcmV1bS5uZXR3b3JrVmVyc2lvbiA9PT0gSEFSREhBVF9ORVRXT1JLX0lEKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBuZXR3b3JrRXJyb3I6ICdQbHMsIGNoYW5nZSBuZXR3b3JrIHRvIGxvY2FsaG9zdDo4NTQ1J1xuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBfZGlzc21pc3NOZXR3b3JrRXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe25ldHdvcmtFcnJvcjogbnVsbH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuc2VsZWN0ZWRBY2NvdW50KSB7XG4gICAgICAgICAgICByZXR1cm4gPENvbm5lY3RXYWxsZXQgXG4gICAgICAgICAgICAgICAgY29ubmVjdFdhbGxldD17dGhpcy5fY29ubmVjdFdhbGxldH1cbiAgICAgICAgICAgICAgICBuZXR3b3JrRXJyb3I9e3RoaXMuc3RhdGUubmV0d29ya0Vycm9yfVxuICAgICAgICAgICAgICAgIGRpc21pc3M9e3RoaXMuX2Rpc3NtaXNzTmV0d29ya0Vycm9yfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5iYWxhbmNlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5Zb3VyIGJhbGFuY2U6IHtldGhlcnMudXRpbHMuZm9ybWF0RXRoZXIodGhpcy5zdGF0ZS5iYWxhbmNlKX0gRVRIPC9wPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvPlxuICAgICAgICApO1xuICAgIH1cbn0iXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJldGhlcnMiLCJDb25uZWN0V2FsbGV0IiwiYXVjdGlvbkFkZHJlc3MiLCJhdWN0aW9uQXJ0aWZhY3QiLCJIQVJESEFUX05FVFdPUktfSUQiLCJFUlJPUl9DT0RFX1RYX1JFSkVDVEVEX0JZX1VTRVIiLCJwcm9wcyIsIl9jb25uZWN0V2FsbGV0Iiwic2VsZWN0ZWRBZGRyZXNzIiwid2luZG93IiwiZXRoZXJldW0iLCJ1bmRlZmluZWQiLCJzZXRTdGF0ZSIsIm5ldHdvcmtFcnJvciIsInJlcXVlc3QiLCJtZXRob2QiLCJfY2hlY2tOZXR3b3JrIiwiX2luaXRpYWxpemUiLCJvbiIsIm5ld0FkZHJlc3MiLCJfcmVzZXRTdGF0ZSIsIl9kaXNzbWlzc05ldHdvcmtFcnJvciIsImluaXRpYWxTdGF0ZSIsInNlbGVjdGVkQWNjb3VudCIsInR4QmVpbmdTZW50IiwidHJhbnNhY3Rpb25FcnJvciIsImJhbGFuY2UiLCJzdGF0ZSIsIl9wcm92aWRlciIsInByb3ZpZGVycyIsIldlYjNQcm92aWRlciIsIl9hdWN0aW9uIiwiQ29udHJhY3QiLCJEdXRjaEF1Y3Rpb24iLCJhYmkiLCJnZXRTaWduZXIiLCJ1cGRhdGVCYWxhbmNlIiwibmV3QmFsYW5jZSIsImdldEJhbGFuY2UiLCJ0b1N0cmluZyIsIm5ldHdvcmtWZXJzaW9uIiwicmVuZGVyIiwiY29ubmVjdFdhbGxldCIsImRpc21pc3MiLCJwIiwidXRpbHMiLCJmb3JtYXRFdGhlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.js\n"));

/***/ })

});