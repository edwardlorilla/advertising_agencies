webpackJsonp([8],{

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(48)
/* script */
var __vue_script__ = __webpack_require__(410)
/* template */
var __vue_template__ = __webpack_require__(411)
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
Component.options.__file = "resources/js/components/client/create.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0df680f6", Component.options)
  } else {
    hotAPI.reload("data-v-0df680f6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 410:
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
        return {
            form: {
                agency_id: '',
                siccode_id: '',
                client_details: ''
            },
            disabled: false,
            loading: false,
            agencies: [],
            siccodes: []
        };
    },
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
        if (to.params.id) {
            axios.get('/api/clients/' + to.params.id).then(function (response) {
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
            axios.get('/api/clients/' + to.params.id).then(function (response) {
                vm.setData(response.data);
                next();
            });
        } else {
            next();
        }
    },

    methods: {
        search_agency: function search_agency(query) {
            var vm = this;
            if (query !== '') {

                vm.onSearchAgency(query, vm);
            } else {
                vm.loading = false;
                vm.agencies = [];
            }
        },

        onSearchAgency: _.debounce(function (query, vm) {
            vm.loading = true;
            axios.get('/api/agencies/search?search=' + query).then(function (q) {
                vm.loading = false;
                vm.agencies = q.data.map(function (item) {
                    return { value: item.id, label: item.detail };
                });
            }).catch(function () {
                vm.loading = false;
            });
        }, 350),
        search_siccode: function search_siccode(query) {
            var vm = this;
            if (query !== '') {
                vm.onSearchSiccode(query, vm);
            } else {
                vm.loading = false;
                vm.siccodes = [];
            }
        },

        onSearchSiccode: _.debounce(function (query, vm) {
            vm.loading = true;
            axios.get('/api/siccodes/search?search=' + query).then(function (q) {
                vm.loading = false;
                vm.siccodes = q.data.map(function (item) {
                    return { value: item.id, label: item.description };
                });
            }).catch(function () {
                vm.loading = false;
            });
        }, 350),
        setData: function setData(response) {
            var vm = this;
            vm.agencies = [{ value: response.agency.id, label: response.agency.detail }];
            vm.siccodes = [{ value: response.siccode.id, label: response.siccode.description }];
            vm.form = response;
        },
        onCancel: function onCancel() {
            this.$router.push({ name: 'view-client' });
        },
        onSubmit: function onSubmit() {
            var vm = this;
            vm.disabled = true;
            var id = vm.$route.params.id;
            axios[id ? 'put' : 'post']('/api/clients' + (id ? '/' + id : ''), vm.form).then(function () {
                vm.disabled = false;
                vm.$message({
                    type: 'success',
                    message: 'Client has been ' + (id ? 'edited' : 'created')
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

/***/ 411:
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
                    _c("span", [_vm._v("Add Client")])
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
                        { attrs: { label: "Agency Details" } },
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
                                placeholder: "Enter Agency Detail",
                                "remote-method": _vm.search_agency,
                                loading: _vm.loading
                              },
                              model: {
                                value: _vm.form.agency_id,
                                callback: function($$v) {
                                  _vm.$set(_vm.form, "agency_id", $$v)
                                },
                                expression: "form.agency_id"
                              }
                            },
                            _vm._l(_vm.agencies, function(item, index) {
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
                        { attrs: { label: "SIC Code Description" } },
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
                                placeholder: "Enter SIC Code Description",
                                "remote-method": _vm.search_siccode,
                                loading: _vm.loading
                              },
                              model: {
                                value: _vm.form.siccode_id,
                                callback: function($$v) {
                                  _vm.$set(_vm.form, "siccode_id", $$v)
                                },
                                expression: "form.siccode_id"
                              }
                            },
                            _vm._l(_vm.siccodes, function(item, index) {
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
                              value: _vm.form.client_details,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "client_details", $$v)
                              },
                              expression: "form.client_details"
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
    require("vue-hot-reload-api")      .rerender("data-v-0df680f6", module.exports)
  }
}

/***/ })

});