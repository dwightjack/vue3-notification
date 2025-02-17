(function(){var o;"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.nonce=(o=document.head.querySelector("meta[property=csp-nonce]"))==null?void 0:o.content,e.appendChild(document.createTextNode(".vue-notification-group{display:block;position:fixed;z-index:5000}.vue-notification-wrapper{display:block;overflow:hidden;width:100%;margin:0;padding:0}.notification-title{font-weight:600}.vue-notification-template{display:block;box-sizing:border-box;background:white;text-align:left}.vue-notification{display:block;box-sizing:border-box;text-align:left;font-size:12px;padding:10px;margin:0 5px 5px;color:#fff;background:#44A4FC;border-left:5px solid #187FE7}.vue-notification.warn{background:#ffb648;border-left-color:#f48a06}.vue-notification.error{background:#E54D42;border-left-color:#b82e24}.vue-notification.success{background:#68CD86;border-left-color:#42a85f}.vn-fade-enter-active,.vn-fade-leave-active,.vn-fade-move{transition:all .5s}.vn-fade-enter-from,.vn-fade-leave-to{opacity:0}")),document.head.appendChild(e)}}catch(i){console.error("vite-plugin-css-injected-by-js",i)}})();
import { defineComponent as D, createVNode as l, TransitionGroup as H, ref as $, computed as g, onMounted as et, Fragment as C, isVNode as nt } from "vue";
const R = /* @__PURE__ */ new Map();
class it {
  constructor(n, o, a) {
    this.remaining = o, this.callback = n, this.notifyItem = a, this.resume();
  }
  pause() {
    clearTimeout(this.notifyItem.timer), this.remaining -= Date.now() - this.start;
  }
  resume() {
    this.start = Date.now(), clearTimeout(this.notifyItem.timer), this.notifyItem.timer = setTimeout(this.callback, this.remaining);
  }
}
function ot(t) {
  return { all: t = t || /* @__PURE__ */ new Map(), on: function(n, o) {
    var a = t.get(n);
    a ? a.push(o) : t.set(n, [o]);
  }, off: function(n, o) {
    var a = t.get(n);
    a && (o ? a.splice(a.indexOf(o) >>> 0, 1) : t.set(n, []));
  }, emit: function(n, o) {
    var a = t.get(n);
    a && a.slice().map(function(s) {
      s(o);
    }), (a = t.get("*")) && a.slice().map(function(s) {
      s(n, o);
    });
  } };
}
const T = ot(), b = "[-+]?[0-9]*.?[0-9]+", M = [
  {
    name: "px",
    regexp: new RegExp(`^${b}px$`)
  },
  {
    name: "%",
    regexp: new RegExp(`^${b}%$`)
  },
  /**
   * Fallback option
   * If no suffix specified, assigning "px"
   */
  {
    name: "px",
    regexp: new RegExp(`^${b}$`)
  }
], at = (t) => {
  if (t === "auto")
    return {
      type: t,
      value: 0
    };
  for (let n = 0; n < M.length; n++) {
    const o = M[n];
    if (o.regexp.test(t))
      return {
        type: o.name,
        value: parseFloat(t)
      };
  }
  return {
    type: "",
    value: t
  };
}, rt = (t) => {
  switch (typeof t) {
    case "number":
      return { type: "px", value: t };
    case "string":
      return at(t);
    default:
      return { type: "", value: t };
  }
}, k = {
  x: /* @__PURE__ */ new Set(["left", "center", "right"]),
  y: /* @__PURE__ */ new Set(["top", "bottom"])
}, st = ((t) => () => t++)(0), lt = (t) => typeof t != "string" ? [] : t.split(/\s+/gi).filter(Boolean), ct = (t) => {
  typeof t == "string" && (t = lt(t));
  let n = null, o = null;
  return t.forEach((a) => {
    k.y.has(a) && (o = a), k.x.has(a) && (n = a);
  }), { x: n, y: o };
}, E = {
  position: ["top", "right"],
  cssAnimation: "vn-fade",
  velocityAnimation: {
    enter: (t) => ({
      height: [t.clientHeight, 0],
      opacity: [1, 0]
    }),
    leave: {
      height: 0,
      opacity: [0, 1]
    }
  }
}, ut = /* @__PURE__ */ D({
  name: "velocity-group",
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    enter: (t, n) => !0,
    leave: (t, n) => !0,
    afterLeave: () => !0
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  setup: (t, {
    slots: n,
    emit: o
  }) => {
    const a = (c, u) => {
      o("enter", c, u);
    }, s = (c, u) => {
      o("leave", c, u);
    }, h = () => {
      o("afterLeave");
    };
    return () => l(H, {
      tag: "name",
      css: !1,
      name: t.name,
      onEnter: a,
      onLeave: s,
      onAfterLeave: h
    }, {
      default: () => {
        var c;
        return [(c = n.default) == null ? void 0 : c.call(n)];
      }
    });
  }
}), ft = /* @__PURE__ */ D({
  name: "css-group",
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  setup: (t, {
    slots: n
  }) => () => l(H, {
    tag: "name",
    name: t.name
  }, {
    default: () => {
      var o;
      return [(o = n.default) == null ? void 0 : o.call(n)];
    }
  })
});
function dt(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !nt(t);
}
const x = {
  IDLE: 0,
  DESTROYED: 2
}, pt = /* @__PURE__ */ D({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "notifications",
  props: {
    group: {
      type: String,
      default: ""
    },
    /** 
     * Width of notification holder, can be `%`, `px` string or number.
     * @example '100%', '200px', 200 
     * */
    width: {
      type: [Number, String],
      default: 300
    },
    reverse: {
      type: Boolean,
      default: !1
    },
    position: {
      type: [String, Array],
      default: () => E.position
    },
    classes: {
      type: String,
      default: "vue-notification"
    },
    animationType: {
      type: String,
      default: "css",
      validator(t) {
        return t === "css" || t === "velocity";
      }
    },
    animation: {
      type: Object,
      default() {
        return E.velocityAnimation;
      }
    },
    animationName: {
      type: String,
      default: E.cssAnimation
    },
    speed: {
      type: Number,
      default: 300
    },
    /** Time (in ms) to keep the notification on screen (if **negative** - notification will stay **forever** or until clicked) */
    duration: {
      type: Number,
      default: 3e3
    },
    delay: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1 / 0
    },
    ignoreDuplicates: {
      type: Boolean,
      default: !1
    },
    closeOnClick: {
      type: Boolean,
      default: !0
    },
    pauseOnHover: {
      type: Boolean,
      default: !1
    },
    /** Use [v-html](https://vuejs.org/api/built-in-directives.html#v-html) to set `title` and `text` */
    dangerouslySetInnerHtml: {
      type: Boolean,
      default: !1
    }
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    click: (t) => !0,
    destroy: (t) => !0,
    start: (t) => !0
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  setup: (t, {
    emit: n,
    slots: o,
    expose: a
  }) => {
    const s = $([]), h = $(null), c = R.get("velocity"), u = g(() => t.animationType === "velocity"), j = g(() => u.value ? ut : ft), f = g(() => s.value.filter((e) => e.state !== x.DESTROYED)), N = g(() => rt(t.width)), A = g(() => {
      const {
        x: e,
        y: i
      } = ct(t.position), r = N.value.value, d = N.value.type, m = {
        width: r + d
      };
      return i && (m[i] = "0px"), e && (e === "center" ? m.left = `calc(50% - ${+r / 2}${d})` : m[e] = "0px"), m;
    }), w = g(() => "bottom" in A.value), B = (e) => {
      n("click", e), t.closeOnClick && y(e);
    }, V = () => {
      var e;
      t.pauseOnHover && ((e = h.value) == null || e.pause());
    }, Y = () => {
      var e;
      t.pauseOnHover && ((e = h.value) == null || e.resume());
    }, G = (e = {}) => {
      if (e.group || (e.group = ""), e.data || (e.data = {}), t.group !== e.group)
        return;
      if (e.clean || e.clear) {
        q();
        return;
      }
      const i = typeof e.duration == "number" ? e.duration : t.duration, r = typeof e.speed == "number" ? e.speed : t.speed, d = typeof e.ignoreDuplicates == "boolean" ? e.ignoreDuplicates : t.ignoreDuplicates, {
        title: m,
        text: K,
        type: Q,
        data: U,
        id: X
      } = e, p = {
        id: X || st(),
        title: m,
        text: K,
        type: Q,
        state: x.IDLE,
        speed: r,
        length: i + 2 * r,
        data: U
      };
      i >= 0 && (h.value = new it(() => y(p), p.length, p));
      const Z = t.reverse ? !w.value : w.value;
      let v = -1;
      const tt = f.value.some((L) => L.title === e.title && L.text === e.text);
      (!d || !tt) && (Z ? (s.value.push(p), n("start", p), f.value.length > t.max && (v = 0)) : (s.value.unshift(p), n("start", p), f.value.length > t.max && (v = f.value.length - 1)), v !== -1 && y(f.value[v]));
    }, _ = (e) => {
      W(e);
    }, F = (e) => ["vue-notification-template", t.classes, e.type || ""], P = (e) => u.value ? void 0 : {
      transition: `all ${e.speed}ms`
    }, y = (e) => {
      clearTimeout(e.timer), e.state = x.DESTROYED, I(), n("destroy", e);
    }, W = (e) => {
      const i = s.value.find((r) => r.id === e);
      i && y(i);
    }, q = () => {
      f.value.forEach(y);
    }, O = (e, i) => {
      var d;
      const r = (d = t.animation) == null ? void 0 : d[e];
      return typeof r == "function" ? r(i) : r;
    }, z = (e, i) => {
      if (!u.value)
        return;
      const r = O("enter", e);
      c(e, r, {
        duration: t.speed,
        complete: i
      });
    }, J = (e, i) => {
      if (!u.value)
        return;
      const r = O("leave", e);
      c(e, r, {
        duration: t.speed,
        complete: i
      });
    };
    function I() {
      s.value = s.value.filter((e) => e.state !== x.DESTROYED);
    }
    return et(() => {
      T.on("add", G), T.on("close", _);
    }), () => {
      let e;
      return l("div", {
        class: "vue-notification-group",
        style: A.value
      }, [l(j.value, {
        name: t.animationName,
        onEnter: z,
        onLeave: J,
        onAfterLeave: I
      }, dt(e = f.value.map((i) => l("div", {
        key: i.id,
        class: "vue-notification-wrapper",
        style: P(i),
        "data-id": i.id,
        onMouseenter: V,
        onMouseleave: Y
      }, [o.body ? o.body({
        item: i,
        class: [t.classes, i.type].join(""),
        close: () => y(i)
      }) : l("div", {
        class: F(i),
        onClick: () => B(i)
      }, [t.dangerouslySetInnerHtml ? l(C, null, [i.title ? l("div", {
        class: "notification-title",
        innerHTML: i.title
      }, null) : null, l("div", {
        class: "notification-content",
        innerHTML: i.text
      }, null)]) : l(C, null, [i.title ? l("div", {
        class: "notification-title"
      }, [i.title]) : null, l("div", {
        class: "notification-content"
      }, [i.text])])])]))) ? e : {
        default: () => [e]
      })]);
    };
  }
}), S = (t) => {
  typeof t == "string" && (t = { title: "", text: t }), typeof t == "object" && T.emit("add", t);
};
S.close = (t) => {
  T.emit("close", t);
};
const vt = () => ({ notify: S }), yt = "Notifications";
function mt(t, n = {}) {
  Object.entries(n).forEach((a) => R.set(...a));
  const o = n.name || "notify";
  t.config.globalProperties["$" + o] = S, t.component(n.componentName || yt, pt);
}
const xt = {
  install: mt
};
export {
  pt as Notifications,
  xt as default,
  S as notify,
  vt as useNotification
};
