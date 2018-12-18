webpackJsonp([7],{

/***/ 317:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(76)
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
Component.options.__file = "resources/js/components/invoice/create.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fb3b9bae", Component.options)
  } else {
    hotAPI.reload("data-v-fb3b9bae", Component.options)
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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
        return _defineProperty({
            form: {
                client_id: '',
                invoicestatuscode_id: '',
                invoice_details: ''
            },
            disabled: false,
            loading: false,
            clients: [],
            invoicestatuscodes: []
        }, 'loading', false);
    },
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
        if (to.params.id) {
            axios.get('/api/invoices/' + to.params.id).then(function (response) {
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
            axios.get('/api/invoices/' + to.params.id).then(function (response) {
                vm.setData(response.data);
                next();
            });
        } else {
            next();
        }
    },

    methods: {
        search_client: function search_client(query) {
            var vm = this;
            if (query !== '') {

                vm.onSearchClient(query, vm);
            } else {
                vm.loading = false;
                vm.clients = [];
            }
        },

        onSearchClient: _.debounce(function (query, vm) {
            vm.loading = true;
            axios.get('/api/clients/search?search=' + query).then(function (q) {
                vm.loading = false;
                vm.clients = q.data.map(function (item) {
                    return { value: item.id, label: item.client_details };
                });
            }).catch(function () {
                vm.loading = false;
            });
        }, 350),
        search_invoicestatuscode: function search_invoicestatuscode(query) {
            var vm = this;
            if (query !== '') {
                vm.onSearchInvoiceStatus(query, vm);
            } else {
                vm.loading = false;
                vm.invoices = [];
            }
        },

        onSearchInvoiceStatus: _.debounce(function (query, vm) {
            vm.loading = true;
            axios.get('/api/invoice-status/search?search=' + query).then(function (q) {
                vm.loading = false;
                vm.invoicestatuscodes = q.data.map(function (item) {
                    return { value: item.id, label: item.invoice_status_description };
                });
            }).catch(function () {
                vm.loading = false;
            });
        }, 350),
        setData: function setData(response) {
            var vm = this;
            vm.clients = [{ value: response.client.id, label: response.client.client_details }];
            vm.invoicestatuscodes = [{ value: response.invoicestatuscode.id, label: response.invoicestatuscode.invoice_status_description }];
            vm.form = response;
        },
        onCancel: function onCancel() {
            this.$router.push({ name: 'view-invoice' });
        },
        onSubmit: function onSubmit() {
            var vm = this;
            vm.disabled = true;
            var id = vm.$route.params.id;
            axios[id ? 'put' : 'post']('/api/invoices' + (id ? '/' + id : ''), vm.form).then(function () {
                vm.disabled = false;
                vm.$message({
                    type: 'success',
                    message: 'Invoices has been ' + (id ? 'edited' : 'created')
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
                    _c("span", [_vm._v("Add Invoice")])
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
                        { attrs: { label: "Client Description" } },
                        [
                          _c(
                            "el-select",
                            {
                              staticStyle: { width: "100%" },
                              attrs: {
                                size: "small",
                                disabled: _vm.disabled,
                                filterable: "",
                                remote: "",
                                required: "",
                                placeholder: "Enter Client Description",
                                "remote-method": _vm.search_client,
                                loading: _vm.loading
                              },
                              model: {
                                value: _vm.form.client_id,
                                callback: function($$v) {
                                  _vm.$set(_vm.form, "client_id", $$v)
                                },
                                expression: "form.client_id"
                              }
                            },
                            _vm._l(_vm.clients, function(item, index) {
                              return _c("el-option", {
                                key: index,
                                attrs: { label: item.label, value: item.value }
                              })
                            })
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "Invoice Status Code" } },
                        [
                          _c(
                            "el-select",
                            {
                              staticStyle: { width: "100%" },
                              attrs: {
                                size: "small",
                                disabled: _vm.disabled,
                                filterable: "",
                                remote: "",
                                required: "",
                                placeholder: "Enter Invoice Status Code",
                                "remote-method": _vm.search_invoicestatuscode,
                                loading: _vm.loading
                              },
                              model: {
                                value: _vm.form.invoicestatuscode_id,
                                callback: function($$v) {
                                  _vm.$set(
                                    _vm.form,
                                    "invoicestatuscode_id",
                                    $$v
                                  )
                                },
                                expression: "form.invoicestatuscode_id"
                              }
                            },
                            _vm._l(_vm.invoicestatuscodes, function(
                              item,
                              index
                            ) {
                              return _c("el-option", {
                                key: index,
                                attrs: { label: item.label, value: item.value }
                              })
                            })
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "Detail" } },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.form.invoice_details,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "invoice_details", $$v)
                              },
                              expression: "form.invoice_details"
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
    require("vue-hot-reload-api")      .rerender("data-v-fb3b9bae", module.exports)
  }
}

/***/ })

});