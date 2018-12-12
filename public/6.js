webpackJsonp([6],{

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(48)
/* script */
var __vue_script__ = __webpack_require__(431)
/* template */
var __vue_template__ = __webpack_require__(432)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/invoicestatus/create.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-88283b12", Component.options)
  } else {
    hotAPI.reload("data-v-88283b12", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            form: {
                invoice_status_description: ''
            },
            disabled: false,
            loading: false
        };
    },
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
        if (to.params.id) {
            axios.get('/api/invoice-status/' + to.params.id).then(function (response) {
                next(function (vm) {
                    return vm.setData(response.data);
                });
            });
        } else {
            next();
        }
    },
    beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
        var vm = this;
        if (to.params.id) {
            axios.get('/api/invoice-status/' + to.params.id).then(function (response) {
                vm.setData(response.data);
                next();
            });
        } else {
            next();
        }
    },

    methods: {
        setData: function setData(response) {
            this.form = response;
        },
        onCancel: function onCancel() {
            this.$router.push({ name: 'view-invoice-status' });
        },
        onSubmit: function onSubmit() {
            var vm = this;
            vm.disabled = true;
            var id = vm.$route.params.id;
            axios[id ? 'put' : 'post']('/api/invoice-status' + (id ? '/' + id : ''), vm.form).then(function () {
                vm.disabled = false;
                vm.$message({
                    type: 'success',
                    message: 'Invoice Status has been created'
                });
            }).catch(function (error) {
                vm.disabled = false;
                if (error.response.statusText) {
                    vm.$message({
                        type: 'error',
                        message: error.response.statusText
                    });
                }
            });
        }
    }
});

/***/ }),

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "el-row",
        [
          _c(
            "el-col",
            { attrs: { span: 24 } },
            [
              _c(
                "el-card",
                { attrs: { shadow: "never" } },
                [
                  _c("div", { attrs: { slot: "header" }, slot: "header" }, [
                    _c("span", [_vm._v("Add Invoice Status")])
                  ]),
                  _vm._v(" "),
                  _c(
                    "el-form",
                    {
                      ref: "form",
                      attrs: { model: _vm.form, "label-width": "120px" },
                      nativeOn: {
                        submit: function($event) {
                          $event.preventDefault()
                          return _vm.onSubmit($event)
                        }
                      }
                    },
                    [
                      _c(
                        "el-form-item",
                        { attrs: { label: "Detail" } },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.form.invoice_status_description,
                              callback: function($$v) {
                                _vm.$set(
                                  _vm.form,
                                  "invoice_status_description",
                                  $$v
                                )
                              },
                              expression: "form.invoice_status_description"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        [
                          _c(
                            "el-button",
                            {
                              attrs: {
                                disabled: _vm.disabled,
                                type: "primary"
                              },
                              on: { click: _vm.onSubmit }
                            },
                            [
                              _vm._v(
                                _vm._s(_vm.$route.params.id ? "Edit" : "Create")
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c("el-button", { on: { click: _vm.onCancel } }, [
                            _vm._v("Cancel")
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-88283b12", module.exports)
  }
}

/***/ })

});