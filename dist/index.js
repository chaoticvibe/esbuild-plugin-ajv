var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) =>
  __defProp(target, "__esModule", { value: true });
var __reExport = (target, module2, copyDefault, desc) => {
  if (
    (module2 && typeof module2 === "object") ||
    typeof module2 === "function"
  ) {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, {
          get: () => module2[key],
          enumerable:
            !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable,
        });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(
    __markAsModule(
      __defProp(
        module2 != null ? __create(__getProtoOf(module2)) : {},
        "default",
        !isNodeMode && module2 && module2.__esModule
          ? { get: () => module2.default, enumerable: true }
          : { value: module2, enumerable: true }
      )
    ),
    module2
  );
};

// src/plugin.ts
var import_path = __toESM(require("path"));
var import_promises = __toESM(require("fs/promises"));
var import_url = require("url");
var import_ajv = __toESM(require("ajv"));
var import_standalone = __toESM(require("ajv/dist/standalone"));

// node_modules/ramda/es/internal/_isPlaceholder.js
function _isPlaceholder(a) {
  return (
    a != null && typeof a === "object" && a["@@functional/placeholder"] === true
  );
}

// node_modules/ramda/es/internal/_curry1.js
function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

// node_modules/ramda/es/internal/_curry2.js
function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a)
          ? f2
          : _curry1(function (_b) {
              return fn(a, _b);
            });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b)
          ? f2
          : _isPlaceholder(a)
          ? _curry1(function (_a) {
              return fn(_a, b);
            })
          : _isPlaceholder(b)
          ? _curry1(function (_b) {
              return fn(a, _b);
            })
          : fn(a, b);
    }
  };
}

// node_modules/ramda/es/internal/_curry3.js
function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder(a)
          ? f3
          : _curry2(function (_b, _c) {
              return fn(a, _b, _c);
            });
      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b)
          ? f3
          : _isPlaceholder(a)
          ? _curry2(function (_a, _c) {
              return fn(_a, b, _c);
            })
          : _isPlaceholder(b)
          ? _curry2(function (_b, _c) {
              return fn(a, _b, _c);
            })
          : _curry1(function (_c) {
              return fn(a, b, _c);
            });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c)
          ? f3
          : _isPlaceholder(a) && _isPlaceholder(b)
          ? _curry2(function (_a, _b) {
              return fn(_a, _b, c);
            })
          : _isPlaceholder(a) && _isPlaceholder(c)
          ? _curry2(function (_a, _c) {
              return fn(_a, b, _c);
            })
          : _isPlaceholder(b) && _isPlaceholder(c)
          ? _curry2(function (_b, _c) {
              return fn(a, _b, _c);
            })
          : _isPlaceholder(a)
          ? _curry1(function (_a) {
              return fn(_a, b, c);
            })
          : _isPlaceholder(b)
          ? _curry1(function (_b) {
              return fn(a, _b, c);
            })
          : _isPlaceholder(c)
          ? _curry1(function (_c) {
              return fn(a, b, _c);
            })
          : fn(a, b, c);
    }
  };
}

// node_modules/ramda/es/internal/_has.js
function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

// node_modules/ramda/es/internal/_isObject.js
function _isObject(x) {
  return Object.prototype.toString.call(x) === "[object Object]";
}

// node_modules/ramda/es/mergeWithKey.js
var mergeWithKey = /* @__PURE__ */ _curry3(function mergeWithKey2(fn, l, r) {
  var result = {};
  var k;
  for (k in l) {
    if (_has(k, l)) {
      result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }
  for (k in r) {
    if (_has(k, r) && !_has(k, result)) {
      result[k] = r[k];
    }
  }
  return result;
});
var mergeWithKey_default = mergeWithKey;

// node_modules/ramda/es/mergeDeepWithKey.js
var mergeDeepWithKey = /* @__PURE__ */ _curry3(function mergeDeepWithKey2(
  fn,
  lObj,
  rObj
) {
  return mergeWithKey_default(
    function (k, lVal, rVal) {
      if (_isObject(lVal) && _isObject(rVal)) {
        return mergeDeepWithKey2(fn, lVal, rVal);
      } else {
        return fn(k, lVal, rVal);
      }
    },
    lObj,
    rObj
  );
});
var mergeDeepWithKey_default = mergeDeepWithKey;

// node_modules/ramda/es/mergeDeepLeft.js
var mergeDeepLeft = /* @__PURE__ */ _curry2(function mergeDeepLeft2(
  lObj,
  rObj
) {
  return mergeDeepWithKey_default(
    function (k, lVal, rVal) {
      return lVal;
    },
    lObj,
    rObj
  );
});
var mergeDeepLeft_default = mergeDeepLeft;

// src/cache.ts
var createBuildCache = (buildCallback) => {
  const cache = /* @__PURE__ */ new Map();
  return async (key, input) => {
    let cacheEntry = cache.get(key);
    if (
      cacheEntry == null ||
      (cacheEntry == null ? void 0 : cacheEntry.input) !== input
    ) {
      cacheEntry = { input, output: await buildCallback(key, input) };
      cache.set(key, cacheEntry);
      return cacheEntry.output;
    }
    return cacheEntry.output;
  };
};

// src/plugin.ts
var AjvPlugin = ({ extraKeywords = [], ajvOptions = {} } = {}) => ({
  name: "ajv-plugin",
  setup(build) {
    const ajv = new import_ajv.default(
      mergeDeepLeft_default(
        {
          code: {
            source: true,
            optimize: 1,
            esm: true,
            lines: true,
          },
          loadSchema: async (uri) =>
            JSON.parse(
              await import_promises.default.readFile(
                import_path.default.join(
                  process.cwd(),
                  new import_url.URL(uri).pathname
                ),
                "utf8"
              )
            ),
        },
        ajvOptions
      )
    );
    for (const keywordDef of extraKeywords) {
      ajv.addKeyword(keywordDef);
    }
    const compileWithCache = createBuildCache(async (filePath, fileContent) => {
      ajv.removeSchema();
      const schema = JSON.parse(fileContent);
      schema.$id = `http://example.com/${import_path.default.relative(
        process.cwd(),
        filePath
      )}`;
      return (0, import_standalone.default)(
        ajv,
        await ajv.compileAsync(schema)
      );
    });
    build.onResolve(
      { filter: /\.schema\.json$/i },
      async ({ path: rawPath, resolveDir }) => {
        return {
          path: (await build.resolve(rawPath, { resolveDir })).path,
          namespace: "ajv-validator",
        };
      }
    );
    build.onLoad(
      { namespace: "ajv-validator", filter: /.*/ },
      async ({ path: filePath }) => {
        return {
          contents: await compileWithCache(
            filePath,
            await import_promises.default.readFile(filePath, "utf8")
          ),
          loader: "js",
          resolveDir: import_path.default.dirname(filePath),
        };
      }
    );
  },
});

// src/index.cjs
module.exports = AjvPlugin;
