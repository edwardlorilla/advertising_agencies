webpackJsonp([5],{

/***/ 316:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(76)
/* script */
var __vue_script__ = __webpack_require__(424)
/* template */
var __vue_template__ = __webpack_require__(425)
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
Component.options.__file = "resources/js/components/meeting/create.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5762534a", Component.options)
  } else {
    hotAPI.reload("data-v-5762534a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 424:
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
                client_id: '',
                meetingoutcome_id: '',
                meetingtypecode_id: '',
                billable_yn: '',
                start_date_time: '',
                end_date_time: '',
                purpose_of_meeting: '',
                other_details: '',
                staff: []
            },
            disabled: false,
            loading: false,
            clients: [],
            staffs: [],
            meetingoutcomes: [],
            meetingtypes: []
        };
    },
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
        if (to.params.id) {
            axios.get('/api/meetings/' + to.params.id).then(function (response) {
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
            axios.get('/api/meetings/' + to.params.id).then(function (response) {
                vm.setData(response.data);
                next();
            });
        } else {
            next();
        }
    },

    methods: {
        search_staff: function search_staff(query) {
            var vm = this;
            if (query !== '') {

                vm.onSearchStaff(query, vm);
            } else {
                vm.loading = false;
                vm.staffs = [];
            }
        },

        onSearchStaff: _.debounce(function (query, vm) {
            vm.loading = true;
            axios.get('/api/staffs/search?search=' + query).then(function (q) {
                vm.loading = false;
                vm.staffs = q.data.map(function (item) {
                    return { value: item.id, label: item.detail };
                });
            }).catch(function () {
                vm.loading = false;
            });
        }, 350),
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
        search_meetingoutcome: function search_meetingoutcome(query) {
            var vm = this;
            if (query !== '') {
                vm.onSearchMeetingOutcome(query, vm);
            } else {
                vm.loading = false;
                vm.meetingoutcomes = [];
            }
        },

        onSearchMeetingOutcome: _.debounce(function (query, vm) {
            vm.loading = true;
            axios.get('/api/meetingoutcomes/search?search=' + query).then(function (q) {
                vm.loading = false;
                vm.meetingoutcomes = q.data.map(function (item) {
                    return { value: item.id, label: item.description };
                });
            }).catch(function () {
                vm.loading = false;
            });
        }, 350),
        search_meetingtype: function search_meetingtype(query) {
            var vm = this;
            if (query !== '') {
                vm.onSearchMeetingType(query, vm);
            } else {
                vm.loading = false;
                vm.meetingtypes = [];
            }
        },

        onSearchMeetingType: _.debounce(function (query, vm) {
            vm.loading = true;
            axios.get('/api/meetingtypes/search?search=' + query).then(function (q) {
                vm.loading = false;
                vm.meetingtypes = q.data.map(function (item) {
                    return { value: item.id, label: item.description };
                });
            }).catch(function () {
                vm.loading = false;
            });
        }, 350),
        setData: function setData(response) {
            var vm = this;
            vm.clients = [{ value: response.client.id, label: response.client_details }];
            vm.meetingoutcomes = [{ value: response.meetingoutcome.id, label: response.meetingoutcome.description }];
            vm.meetingtypes = [{ value: response.meetingtypecode.id, label: response.meetingtypecode.description }];
            vm.staffs = response.staffs.map(function (item) {
                return { value: item.id, label: item.detail };
            });

            vm.form = response;
            vm.form.staff = _.map(response.staffs, 'id');
        },
        onCancel: function onCancel() {
            this.$router.push({ name: 'view-meeting' });
        },
        onSubmit: function onSubmit() {
            var vm = this;
            vm.disabled = true;
            var id = vm.$route.params.id;
            axios[id ? 'put' : 'post']('/api/meetings' + (id ? '/' + id : ''), vm.form).then(function () {
                vm.disabled = false;
                vm.$message({
                    type: 'success',
                    message: 'Meeting has been ' + (id ? 'edited' : 'created')
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

/***/ 425:
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
                        { attrs: { label: "Client Details" } },
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
                                placeholder: "Enter Client Detail",
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
                        { attrs: { label: "Meeting Outcome" } },
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
                                placeholder: "Enter Meeting Outcome",
                                "remote-method": _vm.search_meetingoutcome,
                                loading: _vm.loading
                              },
                              model: {
                                value: _vm.form.meetingoutcome_id,
                                callback: function($$v) {
                                  _vm.$set(_vm.form, "meetingoutcome_id", $$v)
                                },
                                expression: "form.meetingoutcome_id"
                              }
                            },
                            _vm._l(_vm.meetingoutcomes, function(item, index) {
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
                        { attrs: { label: "Meeting Type Code" } },
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
                                placeholder: "Enter Meeting Type",
                                "remote-method": _vm.search_meetingtype,
                                loading: _vm.loading
                              },
                              model: {
                                value: _vm.form.meetingtypecode_id,
                                callback: function($$v) {
                                  _vm.$set(_vm.form, "meetingtypecode_id", $$v)
                                },
                                expression: "form.meetingtypecode_id"
                              }
                            },
                            _vm._l(_vm.meetingtypes, function(item, index) {
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
                        { attrs: { label: "Staffs" } },
                        [
                          _c(
                            "el-select",
                            {
                              attrs: {
                                multiple: "",
                                filterable: "",
                                remote: "",
                                "reserve-keyword": "",
                                placeholder: "Please enter a keyword",
                                "remote-method": _vm.search_staff,
                                loading: _vm.loading
                              },
                              model: {
                                value: _vm.form.staff,
                                callback: function($$v) {
                                  _vm.$set(_vm.form, "staff", $$v)
                                },
                                expression: "form.staff"
                              }
                            },
                            _vm._l(_vm.staffs, function(item) {
                              return _c("el-option", {
                                key: item.value,
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
                        { attrs: { label: "Billable" } },
                        [
                          _c(
                            "el-select",
                            {
                              model: {
                                value: _vm.form.billable_yn,
                                callback: function($$v) {
                                  _vm.$set(_vm.form, "billable_yn", $$v)
                                },
                                expression: "form.billable_yn"
                              }
                            },
                            [
                              _c("el-option", {
                                attrs: { label: "No", value: "no" }
                              }),
                              _vm._v(" "),
                              _c("el-option", {
                                attrs: { label: "Yes", value: "yes" }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "Start Date Time" } },
                        [
                          _c("el-date-picker", {
                            attrs: { type: "datetime" },
                            model: {
                              value: _vm.form.start_date_time,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "start_date_time", $$v)
                              },
                              expression: "form.start_date_time"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "End Date Time" } },
                        [
                          _c("el-date-picker", {
                            attrs: { type: "datetime" },
                            model: {
                              value: _vm.form.end_date_time,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "end_date_time", $$v)
                              },
                              expression: "form.end_date_time"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "Purpose of Meeting" } },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.form.purpose_of_meeting,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "purpose_of_meeting", $$v)
                              },
                              expression: "form.purpose_of_meeting"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "el-form-item",
                        { attrs: { label: "Other Detail" } },
                        [
                          _c("el-input", {
                            model: {
                              value: _vm.form.other_details,
                              callback: function($$v) {
                                _vm.$set(_vm.form, "other_details", $$v)
                              },
                              expression: "form.other_details"
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
                                _vm._s(
                                  _vm.$route.params.id ? "Edit" : "Create"
                                ) + "\n                            "
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
    require("vue-hot-reload-api")      .rerender("data-v-5762534a", module.exports)
  }
}

/***/ })

});