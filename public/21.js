webpackJsonp([21],{

/***/ 338:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(48)
/* script */
var __vue_script__ = __webpack_require__(366)
/* template */
var __vue_template__ = __webpack_require__(370)
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
Component.options.__file = "resources/js/components/Dashboard/MeetingView.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-12d4188a", Component.options)
  } else {
    hotAPI.reload("data-v-12d4188a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Table_MeetingGrid_vue__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Table_MeetingGrid_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Table_MeetingGrid_vue__);
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        MeetingGrid: __WEBPACK_IMPORTED_MODULE_0__Table_MeetingGrid_vue___default.a
    },
    data: function data() {
        return {
            meetings: []
        };
    },
    beforeRouteEnter: function beforeRouteEnter(to, from, next) {
        axios.get('/api/meetings', { params: to.query }).then(function (response) {
            next(function (vm) {
                return vm.setData(response.data);
            });
        });
    },
    beforeRouteUpdate: function beforeRouteUpdate(to, from, next) {
        var vm = this;
        axios.get('/api/meetings', { params: to.query }).then(function (response) {
            vm.setData(response.data);
            next();
        });
    },

    methods: {
        setData: function setData(response) {
            this.meetings = response;
        }
    }
});

/***/ }),

/***/ 367:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(48)
/* script */
var __vue_script__ = __webpack_require__(368)
/* template */
var __vue_template__ = __webpack_require__(369)
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
Component.options.__file = "resources/js/components/Table/MeetingGrid.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-77c84736", Component.options)
  } else {
    hotAPI.reload("data-v-77c84736", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 368:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['meeting'],
    data: function data() {
        return {
            countDownDate: new Date(this.meeting.end_date_time).getTime(),
            startDateNow: new Date(this.meeting.start_date_time).getTime(),
            date: '',
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            distance: 0
        };
    },

    computed: {
        dateTime: function dateTime() {
            var vm = this;
            if (vm.startDateNow <= vm.$root.now && vm.countDownDate >= vm.$root.now) {
                vm.distance = vm.countDownDate - vm.$root.now;
                vm.days = Math.floor(vm.distance / (1000 * 60 * 60 * 24));
                vm.hours = Math.floor(vm.distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
                vm.minutes = Math.floor(vm.distance % (1000 * 60 * 60) / (1000 * 60));
                vm.seconds = Math.floor(vm.distance % (1000 * 60) / 1000);
            } else if (vm.startDateNow >= vm.$root.now && vm.countDownDate >= vm.$root.now) {
                vm.distance = vm.countDownDate - vm.$root.now;
                vm.days = Math.floor(vm.distance / (1000 * 60 * 60 * 24));
                vm.hours = Math.floor(vm.distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
                vm.minutes = Math.floor(vm.distance % (1000 * 60 * 60) / (1000 * 60));
                vm.seconds = Math.floor(vm.distance % (1000 * 60) / 1000);
            }
            return vm.startDateNow <= vm.$root.now && vm.countDownDate >= vm.$root.now ? {
                status: 'Starting',
                date: vm.days + 'd ' + vm.hours + 'h ' + vm.minutes + 'm ' + vm.seconds + 's'
            } : vm.startDateNow >= vm.$root.now && vm.countDownDate >= vm.$root.now ? {
                status: 'Pending',
                date: vm.days + 'd ' + vm.hours + 'h ' + vm.minutes + 'm ' + vm.seconds + 's'
            } : {
                status: 'Stopped',
                date: ""
            };
        }
    }
});

/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "card",
      class:
        _vm.dateTime.status === "Starting"
          ? "border-success"
          : _vm.dateTime.status === "Pending"
          ? "border-primary"
          : "border-danger"
    },
    [
      _c("div", { staticClass: "card-header" }, [
        _c("h5", { staticClass: "card-title" }, [
          _vm._v(
            _vm._s(
              _vm.meeting.purpose_of_meeting +
                " by " +
                _vm.meeting.client.client_details
            )
          )
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "card-body" }, [
        _c("p", { staticClass: "card-text" }),
        _c("div", [
          _vm._v(
            "\n            Start at: " +
              _vm._s(
                "" +
                  _vm
                    .$moment(_vm.meeting.start_date_time)
                    .format("YYYY-MM-DD hh:mm:ss a")
              ) +
              "\n        "
          )
        ]),
        _vm._v(" "),
        _c("div", [
          _vm._v(
            "\n            End at: " +
              _vm._s(
                "" +
                  _vm
                    .$moment(_vm.meeting.end_date_time)
                    .format("YYYY-MM-DD hh:mm:ss a")
              ) +
              "\n        "
          )
        ]),
        _vm._v(" "),
        _c("p")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "card-footer" }, [
        _c(
          "span",
          {
            staticClass: "badge",
            class:
              _vm.dateTime.status === "Starting"
                ? "badge-success"
                : _vm.dateTime.status === "Pending"
                ? "badge-primary"
                : "badge-danger"
          },
          [_vm._v(_vm._s(_vm.dateTime.status))]
        ),
        _vm._v(" "),
        _c("small", { staticClass: "text-muted" }, [
          _vm._v(_vm._s(_vm.dateTime.date))
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-77c84736", module.exports)
  }
}

/***/ }),

/***/ 370:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "card-deck" },
    _vm._l(_vm.meetings, function(meeting) {
      return _c("meeting-grid", {
        key: meeting.id,
        attrs: { meeting: meeting }
      })
    })
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-12d4188a", module.exports)
  }
}

/***/ })

});