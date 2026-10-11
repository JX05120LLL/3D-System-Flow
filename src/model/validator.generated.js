var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/ajv/dist/runtime/ucs2length.js
var require_ucs2length = __commonJS({
  "node_modules/ajv/dist/runtime/ucs2length.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ucs2length(str) {
      const len = str.length;
      let length = 0;
      let pos = 0;
      let value;
      while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 55296 && value <= 56319 && pos < len) {
          value = str.charCodeAt(pos);
          if ((value & 64512) === 56320)
            pos++;
        }
      }
      return length;
    }
    exports.default = ucs2length;
    ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
  }
});

// node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/fast-deep-equal/index.js"(exports, module) {
    "use strict";
    module.exports = function equal(a, b) {
      if (a === b) return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i])) return false;
          return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key])) return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// node_modules/ajv/dist/runtime/equal.js
var require_equal = __commonJS({
  "node_modules/ajv/dist/runtime/equal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var equal = require_fast_deep_equal();
    equal.code = 'require("ajv/dist/runtime/equal").default';
    exports.default = equal;
  }
});

// <stdin>
var validate = validate10;
var stdin_default = validate10;
var schema11 = { "$schema": "http://json-schema.org/draft-07/schema#", "$id": "https://system-blueprint.local/schema/2.0/diagram.json", "title": "DiagramDocument", "type": "object", "additionalProperties": false, "required": ["schemaVersion", "id", "title", "view", "nodes", "edges", "groups"], "properties": { "schemaVersion": { "const": "2.0", "type": "string" }, "id": { "$ref": "#/definitions/nonEmptyText" }, "title": { "$ref": "#/definitions/nonEmptyText" }, "description": { "type": "string" }, "sourceRevision": { "$ref": "#/definitions/sourceRevision" }, "navigation": { "$ref": "#/definitions/navigation" }, "view": { "type": "object", "additionalProperties": false, "required": ["kind", "direction", "theme"], "properties": { "kind": { "enum": ["overview", "flow", "deployment"] }, "direction": { "enum": ["RIGHT", "DOWN"] }, "theme": { "enum": ["light", "dark"] }, "collapsedGroups": { "type": "array", "uniqueItems": true, "items": { "$ref": "#/definitions/nonEmptyText" } }, "primaryPath": { "type": "array", "items": { "$ref": "#/definitions/nonEmptyText" } } } }, "nodes": { "type": "array", "minItems": 1, "maxItems": 100, "items": { "$ref": "#/definitions/node" } }, "edges": { "type": "array", "maxItems": 300, "items": { "$ref": "#/definitions/edge" } }, "groups": { "type": "array", "maxItems": 20, "items": { "$ref": "#/definitions/group" } }, "spatial": { "type": "object", "additionalProperties": false, "properties": { "interiors": { "type": "array", "maxItems": 100, "items": { "$ref": "#/definitions/interior" } }, "models": { "type": "array", "maxItems": 100, "items": { "$ref": "#/definitions/spatialModel" } }, "scenarios": { "type": "array", "maxItems": 20, "items": { "$ref": "#/definitions/scenario" } } } } }, "definitions": { "nonEmptyText": { "type": "string", "minLength": 1, "pattern": "\\S" }, "details": { "type": "string", "maxLength": 8e3 }, "evidenceStatus": { "enum": ["confirmed", "assumed", "planned"] }, "source": { "type": "object", "additionalProperties": false, "required": ["path"], "properties": { "path": { "$ref": "#/definitions/nonEmptyText" }, "line": { "type": "integer", "minimum": 1 }, "sha256": { "type": "string", "pattern": "^[a-fA-F0-9]{64}$" } } }, "sources": { "type": "array", "items": { "$ref": "#/definitions/source" } }, "node": { "type": "object", "additionalProperties": false, "required": ["id", "kind", "label"], "properties": { "id": { "$ref": "#/definitions/nonEmptyText" }, "kind": { "enum": ["start", "end", "process", "decision", "store", "external", "fork", "join"] }, "label": { "$ref": "#/definitions/nonEmptyText" }, "summary": { "type": "string" }, "details": { "$ref": "#/definitions/details" }, "groupId": { "$ref": "#/definitions/nonEmptyText" }, "evidenceStatus": { "$ref": "#/definitions/evidenceStatus" }, "sources": { "$ref": "#/definitions/sources" } } }, "edge": { "type": "object", "additionalProperties": false, "required": ["id", "source", "target", "kind", "directed"], "properties": { "id": { "$ref": "#/definitions/nonEmptyText" }, "source": { "$ref": "#/definitions/nonEmptyText" }, "target": { "$ref": "#/definitions/nonEmptyText" }, "kind": { "enum": ["control", "data", "dependency", "exception", "feedback"] }, "directed": { "type": "boolean" }, "label": { "type": "string" }, "details": { "$ref": "#/definitions/details" }, "evidenceStatus": { "$ref": "#/definitions/evidenceStatus" }, "sources": { "$ref": "#/definitions/sources" } } }, "interior": { "type": "object", "additionalProperties": false, "required": ["owner", "nodes", "edges"], "properties": { "owner": { "$ref": "#/definitions/nonEmptyText" }, "nodes": { "type": "array", "minItems": 1, "maxItems": 100, "items": { "$ref": "#/definitions/node" } }, "edges": { "type": "array", "maxItems": 300, "items": { "$ref": "#/definitions/edge" } } } }, "spatialModel": { "type": "object", "additionalProperties": false, "required": ["nodeId", "shape"], "properties": { "nodeId": { "$ref": "#/definitions/nonEmptyText" }, "shape": { "enum": ["service", "shell", "gateway", "client", "database", "event", "external", "auth", "decision", "rack", "adjust", "link", "channel", "ledger", "result"] }, "color": { "type": "string", "pattern": "^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$" }, "shortLabel": { "$ref": "#/definitions/nonEmptyText" } } }, "scenario": { "type": "object", "additionalProperties": false, "required": ["id", "label", "steps"], "properties": { "id": { "$ref": "#/definitions/nonEmptyText" }, "label": { "$ref": "#/definitions/nonEmptyText" }, "steps": { "type": "array", "minItems": 1, "maxItems": 200, "items": { "$ref": "#/definitions/demoStep" } } } }, "demoStep": { "type": "object", "additionalProperties": false, "required": ["id", "title", "description", "route", "focusId", "tone"], "properties": { "id": { "$ref": "#/definitions/nonEmptyText" }, "title": { "$ref": "#/definitions/nonEmptyText" }, "description": { "type": "string" }, "route": { "type": "array", "minItems": 1, "maxItems": 300, "items": { "$ref": "#/definitions/nonEmptyText" } }, "focusId": { "$ref": "#/definitions/nonEmptyText" }, "viewId": { "$ref": "#/definitions/nonEmptyText" }, "evidenceStatus": { "$ref": "#/definitions/evidenceStatus" }, "sources": { "$ref": "#/definitions/sources" }, "tone": { "enum": ["request", "data", "success", "failure"] }, "durationMs": { "type": "integer", "minimum": 1, "maximum": 9007199254740991 } } }, "sourceRevision": { "type": "object", "additionalProperties": false, "required": ["commit"], "properties": { "commit": { "type": "string", "pattern": "^(?:[a-fA-F0-9]{40}|[a-fA-F0-9]{64})$" }, "dirty": { "type": "boolean" } } }, "viewDocument": { "type": "object", "additionalProperties": false, "required": ["schemaVersion", "id", "title", "view", "nodes", "edges", "groups"], "properties": { "schemaVersion": { "$ref": "#/properties/schemaVersion" }, "id": { "$ref": "#/definitions/nonEmptyText" }, "title": { "$ref": "#/definitions/nonEmptyText" }, "description": { "type": "string" }, "sourceRevision": { "$ref": "#/definitions/sourceRevision" }, "view": { "$ref": "#/properties/view" }, "nodes": { "$ref": "#/properties/nodes" }, "edges": { "$ref": "#/properties/edges" }, "groups": { "$ref": "#/properties/groups" }, "spatial": { "type": "object", "additionalProperties": false, "properties": { "interiors": { "$ref": "#/properties/spatial/properties/interiors" }, "models": { "$ref": "#/properties/spatial/properties/models" } } } } }, "viewEndpoint": { "type": "object", "additionalProperties": false, "required": ["viewId", "nodeId"], "properties": { "viewId": { "$ref": "#/definitions/nonEmptyText" }, "nodeId": { "$ref": "#/definitions/nonEmptyText" } } }, "navigation": { "type": "object", "additionalProperties": false, "required": ["views"], "properties": { "views": { "type": "array", "maxItems": 20, "items": { "type": "object", "additionalProperties": false, "required": ["parentId", "ownerId", "document"], "properties": { "parentId": { "$ref": "#/definitions/nonEmptyText" }, "ownerId": { "$ref": "#/definitions/nonEmptyText" }, "document": { "$ref": "#/definitions/viewDocument" } } } }, "bridges": { "type": "array", "maxItems": 300, "items": { "type": "object", "additionalProperties": false, "required": ["id", "source", "target", "kind", "directed"], "properties": { "id": { "$ref": "#/definitions/nonEmptyText" }, "source": { "$ref": "#/definitions/viewEndpoint" }, "target": { "$ref": "#/definitions/viewEndpoint" }, "kind": { "$ref": "#/definitions/edge/properties/kind" }, "directed": { "type": "boolean" }, "label": { "type": "string" }, "details": { "$ref": "#/definitions/details" }, "evidenceStatus": { "$ref": "#/definitions/evidenceStatus" }, "sources": { "$ref": "#/definitions/sources" } } } } } }, "group": { "type": "object", "additionalProperties": false, "required": ["id", "label"], "properties": { "id": { "$ref": "#/definitions/nonEmptyText" }, "label": { "$ref": "#/definitions/nonEmptyText" }, "parentId": { "$ref": "#/definitions/nonEmptyText" }, "details": { "$ref": "#/definitions/details" } } } } };
var func2 = Object.prototype.hasOwnProperty;
var func3 = require_ucs2length().default;
var func0 = require_equal().default;
var pattern0 = new RegExp("\\S", "u");
var pattern2 = new RegExp("^(?:[a-fA-F0-9]{40}|[a-fA-F0-9]{64})$", "u");
var schema15 = { "type": "object", "additionalProperties": false, "required": ["views"], "properties": { "views": { "type": "array", "maxItems": 20, "items": { "type": "object", "additionalProperties": false, "required": ["parentId", "ownerId", "document"], "properties": { "parentId": { "$ref": "#/definitions/nonEmptyText" }, "ownerId": { "$ref": "#/definitions/nonEmptyText" }, "document": { "$ref": "#/definitions/viewDocument" } } } }, "bridges": { "type": "array", "maxItems": 300, "items": { "type": "object", "additionalProperties": false, "required": ["id", "source", "target", "kind", "directed"], "properties": { "id": { "$ref": "#/definitions/nonEmptyText" }, "source": { "$ref": "#/definitions/viewEndpoint" }, "target": { "$ref": "#/definitions/viewEndpoint" }, "kind": { "$ref": "#/definitions/edge/properties/kind" }, "directed": { "type": "boolean" }, "label": { "type": "string" }, "details": { "$ref": "#/definitions/details" }, "evidenceStatus": { "$ref": "#/definitions/evidenceStatus" }, "sources": { "$ref": "#/definitions/sources" } } } } } };
var schema60 = { "enum": ["control", "data", "dependency", "exception", "feedback"] };
var schema32 = { "enum": ["confirmed", "assumed", "planned"] };
var schema18 = { "type": "object", "additionalProperties": false, "required": ["schemaVersion", "id", "title", "view", "nodes", "edges", "groups"], "properties": { "schemaVersion": { "$ref": "#/properties/schemaVersion" }, "id": { "$ref": "#/definitions/nonEmptyText" }, "title": { "$ref": "#/definitions/nonEmptyText" }, "description": { "type": "string" }, "sourceRevision": { "$ref": "#/definitions/sourceRevision" }, "view": { "$ref": "#/properties/view" }, "nodes": { "$ref": "#/properties/nodes" }, "edges": { "$ref": "#/properties/edges" }, "groups": { "$ref": "#/properties/groups" }, "spatial": { "type": "object", "additionalProperties": false, "properties": { "interiors": { "$ref": "#/properties/spatial/properties/interiors" }, "models": { "$ref": "#/properties/spatial/properties/models" } } } } };
var schema23 = { "type": "object", "additionalProperties": false, "required": ["kind", "direction", "theme"], "properties": { "kind": { "enum": ["overview", "flow", "deployment"] }, "direction": { "enum": ["RIGHT", "DOWN"] }, "theme": { "enum": ["light", "dark"] }, "collapsedGroups": { "type": "array", "uniqueItems": true, "items": { "$ref": "#/definitions/nonEmptyText" } }, "primaryPath": { "type": "array", "items": { "$ref": "#/definitions/nonEmptyText" } } } };
function validate13(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.kind === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.direction === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "direction" }, message: "must have required property 'direction'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.theme === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "theme" }, message: "must have required property 'theme'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "kind" || key0 === "direction" || key0 === "theme" || key0 === "collapsedGroups" || key0 === "primaryPath")) {
        const err3 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.kind !== void 0) {
      let data0 = data.kind;
      if (!(data0 === "overview" || data0 === "flow" || data0 === "deployment")) {
        const err4 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/enum", keyword: "enum", params: { allowedValues: schema23.properties.kind.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.direction !== void 0) {
      let data1 = data.direction;
      if (!(data1 === "RIGHT" || data1 === "DOWN")) {
        const err5 = { instancePath: instancePath + "/direction", schemaPath: "#/properties/direction/enum", keyword: "enum", params: { allowedValues: schema23.properties.direction.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.theme !== void 0) {
      let data2 = data.theme;
      if (!(data2 === "light" || data2 === "dark")) {
        const err6 = { instancePath: instancePath + "/theme", schemaPath: "#/properties/theme/enum", keyword: "enum", params: { allowedValues: schema23.properties.theme.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.collapsedGroups !== void 0) {
      let data3 = data.collapsedGroups;
      if (Array.isArray(data3)) {
        const len0 = data3.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data4 = data3[i0];
          if (typeof data4 === "string") {
            if (func3(data4) < 1) {
              const err7 = { instancePath: instancePath + "/collapsedGroups/" + i0, schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err7];
              } else {
                vErrors.push(err7);
              }
              errors++;
            }
            if (!pattern0.test(data4)) {
              const err8 = { instancePath: instancePath + "/collapsedGroups/" + i0, schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
              if (vErrors === null) {
                vErrors = [err8];
              } else {
                vErrors.push(err8);
              }
              errors++;
            }
          } else {
            const err9 = { instancePath: instancePath + "/collapsedGroups/" + i0, schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          }
        }
        let i1 = data3.length;
        let j0;
        if (i1 > 1) {
          outer0: for (; i1--; ) {
            for (j0 = i1; j0--; ) {
              if (func0(data3[i1], data3[j0])) {
                const err10 = { instancePath: instancePath + "/collapsedGroups", schemaPath: "#/properties/collapsedGroups/uniqueItems", keyword: "uniqueItems", params: { i: i1, j: j0 }, message: "must NOT have duplicate items (items ## " + j0 + " and " + i1 + " are identical)" };
                if (vErrors === null) {
                  vErrors = [err10];
                } else {
                  vErrors.push(err10);
                }
                errors++;
                break outer0;
              }
            }
          }
        }
      } else {
        const err11 = { instancePath: instancePath + "/collapsedGroups", schemaPath: "#/properties/collapsedGroups/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.primaryPath !== void 0) {
      let data5 = data.primaryPath;
      if (Array.isArray(data5)) {
        const len1 = data5.length;
        for (let i2 = 0; i2 < len1; i2++) {
          let data6 = data5[i2];
          if (typeof data6 === "string") {
            if (func3(data6) < 1) {
              const err12 = { instancePath: instancePath + "/primaryPath/" + i2, schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err12];
              } else {
                vErrors.push(err12);
              }
              errors++;
            }
            if (!pattern0.test(data6)) {
              const err13 = { instancePath: instancePath + "/primaryPath/" + i2, schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
              if (vErrors === null) {
                vErrors = [err13];
              } else {
                vErrors.push(err13);
              }
              errors++;
            }
          } else {
            const err14 = { instancePath: instancePath + "/primaryPath/" + i2, schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err14];
            } else {
              vErrors.push(err14);
            }
            errors++;
          }
        }
      } else {
        const err15 = { instancePath: instancePath + "/primaryPath", schemaPath: "#/properties/primaryPath/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
  } else {
    const err16 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err16];
    } else {
      vErrors.push(err16);
    }
    errors++;
  }
  validate13.errors = vErrors;
  return errors === 0;
}
var schema27 = { "type": "object", "additionalProperties": false, "required": ["id", "kind", "label"], "properties": { "id": { "$ref": "#/definitions/nonEmptyText" }, "kind": { "enum": ["start", "end", "process", "decision", "store", "external", "fork", "join"] }, "label": { "$ref": "#/definitions/nonEmptyText" }, "summary": { "type": "string" }, "details": { "$ref": "#/definitions/details" }, "groupId": { "$ref": "#/definitions/nonEmptyText" }, "evidenceStatus": { "$ref": "#/definitions/evidenceStatus" }, "sources": { "$ref": "#/definitions/sources" } } };
var pattern14 = new RegExp("^[a-fA-F0-9]{64}$", "u");
function validate18(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.path === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "path" }, message: "must have required property 'path'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "path" || key0 === "line" || key0 === "sha256")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.path !== void 0) {
      let data0 = data.path;
      if (typeof data0 === "string") {
        if (func3(data0) < 1) {
          const err2 = { instancePath: instancePath + "/path", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        if (!pattern0.test(data0)) {
          const err3 = { instancePath: instancePath + "/path", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
      } else {
        const err4 = { instancePath: instancePath + "/path", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.line !== void 0) {
      let data1 = data.line;
      if (!(typeof data1 == "number" && (!(data1 % 1) && !isNaN(data1)) && isFinite(data1))) {
        const err5 = { instancePath: instancePath + "/line", schemaPath: "#/properties/line/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
      if (typeof data1 == "number" && isFinite(data1)) {
        if (data1 < 1 || isNaN(data1)) {
          const err6 = { instancePath: instancePath + "/line", schemaPath: "#/properties/line/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
      }
    }
    if (data.sha256 !== void 0) {
      let data2 = data.sha256;
      if (typeof data2 === "string") {
        if (!pattern14.test(data2)) {
          const err7 = { instancePath: instancePath + "/sha256", schemaPath: "#/properties/sha256/pattern", keyword: "pattern", params: { pattern: "^[a-fA-F0-9]{64}$" }, message: 'must match pattern "^[a-fA-F0-9]{64}$"' };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
      } else {
        const err8 = { instancePath: instancePath + "/sha256", schemaPath: "#/properties/sha256/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
  } else {
    const err9 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err9];
    } else {
      vErrors.push(err9);
    }
    errors++;
  }
  validate18.errors = vErrors;
  return errors === 0;
}
function validate17(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (Array.isArray(data)) {
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (!validate18(data[i0], { instancePath: instancePath + "/" + i0, parentData: data, parentDataProperty: i0, rootData })) {
        vErrors = vErrors === null ? validate18.errors : vErrors.concat(validate18.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err0 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "array" }, message: "must be array" };
    if (vErrors === null) {
      vErrors = [err0];
    } else {
      vErrors.push(err0);
    }
    errors++;
  }
  validate17.errors = vErrors;
  return errors === 0;
}
function validate16(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.kind === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.label === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "label" }, message: "must have required property 'label'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "id" || key0 === "kind" || key0 === "label" || key0 === "summary" || key0 === "details" || key0 === "groupId" || key0 === "evidenceStatus" || key0 === "sources")) {
        const err3 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.id !== void 0) {
      let data0 = data.id;
      if (typeof data0 === "string") {
        if (func3(data0) < 1) {
          const err4 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (!pattern0.test(data0)) {
          const err5 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      } else {
        const err6 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.kind !== void 0) {
      let data1 = data.kind;
      if (!(data1 === "start" || data1 === "end" || data1 === "process" || data1 === "decision" || data1 === "store" || data1 === "external" || data1 === "fork" || data1 === "join")) {
        const err7 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/enum", keyword: "enum", params: { allowedValues: schema27.properties.kind.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.label !== void 0) {
      let data2 = data.label;
      if (typeof data2 === "string") {
        if (func3(data2) < 1) {
          const err8 = { instancePath: instancePath + "/label", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
        if (!pattern0.test(data2)) {
          const err9 = { instancePath: instancePath + "/label", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
      } else {
        const err10 = { instancePath: instancePath + "/label", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err10];
        } else {
          vErrors.push(err10);
        }
        errors++;
      }
    }
    if (data.summary !== void 0) {
      if (typeof data.summary !== "string") {
        const err11 = { instancePath: instancePath + "/summary", schemaPath: "#/properties/summary/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.details !== void 0) {
      let data4 = data.details;
      if (typeof data4 === "string") {
        if (func3(data4) > 8e3) {
          const err12 = { instancePath: instancePath + "/details", schemaPath: "#/definitions/details/maxLength", keyword: "maxLength", params: { limit: 8e3 }, message: "must NOT have more than 8000 characters" };
          if (vErrors === null) {
            vErrors = [err12];
          } else {
            vErrors.push(err12);
          }
          errors++;
        }
      } else {
        const err13 = { instancePath: instancePath + "/details", schemaPath: "#/definitions/details/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.groupId !== void 0) {
      let data5 = data.groupId;
      if (typeof data5 === "string") {
        if (func3(data5) < 1) {
          const err14 = { instancePath: instancePath + "/groupId", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
        if (!pattern0.test(data5)) {
          const err15 = { instancePath: instancePath + "/groupId", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err15];
          } else {
            vErrors.push(err15);
          }
          errors++;
        }
      } else {
        const err16 = { instancePath: instancePath + "/groupId", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
    if (data.evidenceStatus !== void 0) {
      let data6 = data.evidenceStatus;
      if (!(data6 === "confirmed" || data6 === "assumed" || data6 === "planned")) {
        const err17 = { instancePath: instancePath + "/evidenceStatus", schemaPath: "#/definitions/evidenceStatus/enum", keyword: "enum", params: { allowedValues: schema32.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data.sources !== void 0) {
      if (!validate17(data.sources, { instancePath: instancePath + "/sources", parentData: data, parentDataProperty: "sources", rootData })) {
        vErrors = vErrors === null ? validate17.errors : vErrors.concat(validate17.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err18 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err18];
    } else {
      vErrors.push(err18);
    }
    errors++;
  }
  validate16.errors = vErrors;
  return errors === 0;
}
function validate15(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (Array.isArray(data)) {
    if (data.length > 100) {
      const err0 = { instancePath, schemaPath: "#/maxItems", keyword: "maxItems", params: { limit: 100 }, message: "must NOT have more than 100 items" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.length < 1) {
      const err1 = { instancePath, schemaPath: "#/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (!validate16(data[i0], { instancePath: instancePath + "/" + i0, parentData: data, parentDataProperty: i0, rootData })) {
        vErrors = vErrors === null ? validate16.errors : vErrors.concat(validate16.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err2 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "array" }, message: "must be array" };
    if (vErrors === null) {
      vErrors = [err2];
    } else {
      vErrors.push(err2);
    }
    errors++;
  }
  validate15.errors = vErrors;
  return errors === 0;
}
var schema37 = { "type": "object", "additionalProperties": false, "required": ["id", "source", "target", "kind", "directed"], "properties": { "id": { "$ref": "#/definitions/nonEmptyText" }, "source": { "$ref": "#/definitions/nonEmptyText" }, "target": { "$ref": "#/definitions/nonEmptyText" }, "kind": { "enum": ["control", "data", "dependency", "exception", "feedback"] }, "directed": { "type": "boolean" }, "label": { "type": "string" }, "details": { "$ref": "#/definitions/details" }, "evidenceStatus": { "$ref": "#/definitions/evidenceStatus" }, "sources": { "$ref": "#/definitions/sources" } } };
function validate24(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.source === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "source" }, message: "must have required property 'source'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.target === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "target" }, message: "must have required property 'target'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.kind === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.directed === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "directed" }, message: "must have required property 'directed'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!func2.call(schema37.properties, key0)) {
        const err5 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.id !== void 0) {
      let data0 = data.id;
      if (typeof data0 === "string") {
        if (func3(data0) < 1) {
          const err6 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
        if (!pattern0.test(data0)) {
          const err7 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
      } else {
        const err8 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.source !== void 0) {
      let data1 = data.source;
      if (typeof data1 === "string") {
        if (func3(data1) < 1) {
          const err9 = { instancePath: instancePath + "/source", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
        if (!pattern0.test(data1)) {
          const err10 = { instancePath: instancePath + "/source", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
      } else {
        const err11 = { instancePath: instancePath + "/source", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.target !== void 0) {
      let data2 = data.target;
      if (typeof data2 === "string") {
        if (func3(data2) < 1) {
          const err12 = { instancePath: instancePath + "/target", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err12];
          } else {
            vErrors.push(err12);
          }
          errors++;
        }
        if (!pattern0.test(data2)) {
          const err13 = { instancePath: instancePath + "/target", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
      } else {
        const err14 = { instancePath: instancePath + "/target", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
    }
    if (data.kind !== void 0) {
      let data3 = data.kind;
      if (!(data3 === "control" || data3 === "data" || data3 === "dependency" || data3 === "exception" || data3 === "feedback")) {
        const err15 = { instancePath: instancePath + "/kind", schemaPath: "#/properties/kind/enum", keyword: "enum", params: { allowedValues: schema37.properties.kind.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.directed !== void 0) {
      if (typeof data.directed !== "boolean") {
        const err16 = { instancePath: instancePath + "/directed", schemaPath: "#/properties/directed/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
    if (data.label !== void 0) {
      if (typeof data.label !== "string") {
        const err17 = { instancePath: instancePath + "/label", schemaPath: "#/properties/label/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data.details !== void 0) {
      let data6 = data.details;
      if (typeof data6 === "string") {
        if (func3(data6) > 8e3) {
          const err18 = { instancePath: instancePath + "/details", schemaPath: "#/definitions/details/maxLength", keyword: "maxLength", params: { limit: 8e3 }, message: "must NOT have more than 8000 characters" };
          if (vErrors === null) {
            vErrors = [err18];
          } else {
            vErrors.push(err18);
          }
          errors++;
        }
      } else {
        const err19 = { instancePath: instancePath + "/details", schemaPath: "#/definitions/details/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err19];
        } else {
          vErrors.push(err19);
        }
        errors++;
      }
    }
    if (data.evidenceStatus !== void 0) {
      let data7 = data.evidenceStatus;
      if (!(data7 === "confirmed" || data7 === "assumed" || data7 === "planned")) {
        const err20 = { instancePath: instancePath + "/evidenceStatus", schemaPath: "#/definitions/evidenceStatus/enum", keyword: "enum", params: { allowedValues: schema32.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err20];
        } else {
          vErrors.push(err20);
        }
        errors++;
      }
    }
    if (data.sources !== void 0) {
      if (!validate17(data.sources, { instancePath: instancePath + "/sources", parentData: data, parentDataProperty: "sources", rootData })) {
        vErrors = vErrors === null ? validate17.errors : vErrors.concat(validate17.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err21 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err21];
    } else {
      vErrors.push(err21);
    }
    errors++;
  }
  validate24.errors = vErrors;
  return errors === 0;
}
function validate23(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (Array.isArray(data)) {
    if (data.length > 300) {
      const err0 = { instancePath, schemaPath: "#/maxItems", keyword: "maxItems", params: { limit: 300 }, message: "must NOT have more than 300 items" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (!validate24(data[i0], { instancePath: instancePath + "/" + i0, parentData: data, parentDataProperty: i0, rootData })) {
        vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err1 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "array" }, message: "must be array" };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate23.errors = vErrors;
  return errors === 0;
}
function validate29(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.label === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "label" }, message: "must have required property 'label'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "id" || key0 === "label" || key0 === "parentId" || key0 === "details")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.id !== void 0) {
      let data0 = data.id;
      if (typeof data0 === "string") {
        if (func3(data0) < 1) {
          const err3 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        if (!pattern0.test(data0)) {
          const err4 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
      } else {
        const err5 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.label !== void 0) {
      let data1 = data.label;
      if (typeof data1 === "string") {
        if (func3(data1) < 1) {
          const err6 = { instancePath: instancePath + "/label", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
        if (!pattern0.test(data1)) {
          const err7 = { instancePath: instancePath + "/label", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
      } else {
        const err8 = { instancePath: instancePath + "/label", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.parentId !== void 0) {
      let data2 = data.parentId;
      if (typeof data2 === "string") {
        if (func3(data2) < 1) {
          const err9 = { instancePath: instancePath + "/parentId", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
        if (!pattern0.test(data2)) {
          const err10 = { instancePath: instancePath + "/parentId", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
      } else {
        const err11 = { instancePath: instancePath + "/parentId", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.details !== void 0) {
      let data3 = data.details;
      if (typeof data3 === "string") {
        if (func3(data3) > 8e3) {
          const err12 = { instancePath: instancePath + "/details", schemaPath: "#/definitions/details/maxLength", keyword: "maxLength", params: { limit: 8e3 }, message: "must NOT have more than 8000 characters" };
          if (vErrors === null) {
            vErrors = [err12];
          } else {
            vErrors.push(err12);
          }
          errors++;
        }
      } else {
        const err13 = { instancePath: instancePath + "/details", schemaPath: "#/definitions/details/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
  } else {
    const err14 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err14];
    } else {
      vErrors.push(err14);
    }
    errors++;
  }
  validate29.errors = vErrors;
  return errors === 0;
}
function validate28(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (Array.isArray(data)) {
    if (data.length > 20) {
      const err0 = { instancePath, schemaPath: "#/maxItems", keyword: "maxItems", params: { limit: 20 }, message: "must NOT have more than 20 items" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (!validate29(data[i0], { instancePath: instancePath + "/" + i0, parentData: data, parentDataProperty: i0, rootData })) {
        vErrors = vErrors === null ? validate29.errors : vErrors.concat(validate29.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err1 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "array" }, message: "must be array" };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate28.errors = vErrors;
  return errors === 0;
}
function validate33(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.owner === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "owner" }, message: "must have required property 'owner'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.nodes === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "nodes" }, message: "must have required property 'nodes'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.edges === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "edges" }, message: "must have required property 'edges'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "owner" || key0 === "nodes" || key0 === "edges")) {
        const err3 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.owner !== void 0) {
      let data0 = data.owner;
      if (typeof data0 === "string") {
        if (func3(data0) < 1) {
          const err4 = { instancePath: instancePath + "/owner", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (!pattern0.test(data0)) {
          const err5 = { instancePath: instancePath + "/owner", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      } else {
        const err6 = { instancePath: instancePath + "/owner", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.nodes !== void 0) {
      let data1 = data.nodes;
      if (Array.isArray(data1)) {
        if (data1.length > 100) {
          const err7 = { instancePath: instancePath + "/nodes", schemaPath: "#/properties/nodes/maxItems", keyword: "maxItems", params: { limit: 100 }, message: "must NOT have more than 100 items" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        if (data1.length < 1) {
          const err8 = { instancePath: instancePath + "/nodes", schemaPath: "#/properties/nodes/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
        const len0 = data1.length;
        for (let i0 = 0; i0 < len0; i0++) {
          if (!validate16(data1[i0], { instancePath: instancePath + "/nodes/" + i0, parentData: data1, parentDataProperty: i0, rootData })) {
            vErrors = vErrors === null ? validate16.errors : vErrors.concat(validate16.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err9 = { instancePath: instancePath + "/nodes", schemaPath: "#/properties/nodes/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.edges !== void 0) {
      let data3 = data.edges;
      if (Array.isArray(data3)) {
        if (data3.length > 300) {
          const err10 = { instancePath: instancePath + "/edges", schemaPath: "#/properties/edges/maxItems", keyword: "maxItems", params: { limit: 300 }, message: "must NOT have more than 300 items" };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
        const len1 = data3.length;
        for (let i1 = 0; i1 < len1; i1++) {
          if (!validate24(data3[i1], { instancePath: instancePath + "/edges/" + i1, parentData: data3, parentDataProperty: i1, rootData })) {
            vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err11 = { instancePath: instancePath + "/edges", schemaPath: "#/properties/edges/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
  } else {
    const err12 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err12];
    } else {
      vErrors.push(err12);
    }
    errors++;
  }
  validate33.errors = vErrors;
  return errors === 0;
}
function validate32(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (Array.isArray(data)) {
    if (data.length > 100) {
      const err0 = { instancePath, schemaPath: "#/maxItems", keyword: "maxItems", params: { limit: 100 }, message: "must NOT have more than 100 items" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (!validate33(data[i0], { instancePath: instancePath + "/" + i0, parentData: data, parentDataProperty: i0, rootData })) {
        vErrors = vErrors === null ? validate33.errors : vErrors.concat(validate33.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err1 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "array" }, message: "must be array" };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate32.errors = vErrors;
  return errors === 0;
}
var schema53 = { "type": "object", "additionalProperties": false, "required": ["nodeId", "shape"], "properties": { "nodeId": { "$ref": "#/definitions/nonEmptyText" }, "shape": { "enum": ["service", "shell", "gateway", "client", "database", "event", "external", "auth", "decision", "rack", "adjust", "link", "channel", "ledger", "result"] }, "color": { "type": "string", "pattern": "^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$" }, "shortLabel": { "$ref": "#/definitions/nonEmptyText" } } };
var pattern23 = new RegExp("^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$", "u");
function validate39(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.nodeId === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "nodeId" }, message: "must have required property 'nodeId'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.shape === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "shape" }, message: "must have required property 'shape'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "nodeId" || key0 === "shape" || key0 === "color" || key0 === "shortLabel")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.nodeId !== void 0) {
      let data0 = data.nodeId;
      if (typeof data0 === "string") {
        if (func3(data0) < 1) {
          const err3 = { instancePath: instancePath + "/nodeId", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        if (!pattern0.test(data0)) {
          const err4 = { instancePath: instancePath + "/nodeId", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
      } else {
        const err5 = { instancePath: instancePath + "/nodeId", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.shape !== void 0) {
      let data1 = data.shape;
      if (!(data1 === "service" || data1 === "shell" || data1 === "gateway" || data1 === "client" || data1 === "database" || data1 === "event" || data1 === "external" || data1 === "auth" || data1 === "decision" || data1 === "rack" || data1 === "adjust" || data1 === "link" || data1 === "channel" || data1 === "ledger" || data1 === "result")) {
        const err6 = { instancePath: instancePath + "/shape", schemaPath: "#/properties/shape/enum", keyword: "enum", params: { allowedValues: schema53.properties.shape.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.color !== void 0) {
      let data2 = data.color;
      if (typeof data2 === "string") {
        if (!pattern23.test(data2)) {
          const err7 = { instancePath: instancePath + "/color", schemaPath: "#/properties/color/pattern", keyword: "pattern", params: { pattern: "^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$" }, message: 'must match pattern "^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"' };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
      } else {
        const err8 = { instancePath: instancePath + "/color", schemaPath: "#/properties/color/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.shortLabel !== void 0) {
      let data3 = data.shortLabel;
      if (typeof data3 === "string") {
        if (func3(data3) < 1) {
          const err9 = { instancePath: instancePath + "/shortLabel", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
        if (!pattern0.test(data3)) {
          const err10 = { instancePath: instancePath + "/shortLabel", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
      } else {
        const err11 = { instancePath: instancePath + "/shortLabel", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
  } else {
    const err12 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err12];
    } else {
      vErrors.push(err12);
    }
    errors++;
  }
  validate39.errors = vErrors;
  return errors === 0;
}
function validate38(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (Array.isArray(data)) {
    if (data.length > 100) {
      const err0 = { instancePath, schemaPath: "#/maxItems", keyword: "maxItems", params: { limit: 100 }, message: "must NOT have more than 100 items" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    const len0 = data.length;
    for (let i0 = 0; i0 < len0; i0++) {
      if (!validate39(data[i0], { instancePath: instancePath + "/" + i0, parentData: data, parentDataProperty: i0, rootData })) {
        vErrors = vErrors === null ? validate39.errors : vErrors.concat(validate39.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err1 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "array" }, message: "must be array" };
    if (vErrors === null) {
      vErrors = [err1];
    } else {
      vErrors.push(err1);
    }
    errors++;
  }
  validate38.errors = vErrors;
  return errors === 0;
}
function validate12(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.schemaVersion === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "schemaVersion" }, message: "must have required property 'schemaVersion'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.title === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "title" }, message: "must have required property 'title'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.view === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "view" }, message: "must have required property 'view'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.nodes === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "nodes" }, message: "must have required property 'nodes'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.edges === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "edges" }, message: "must have required property 'edges'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.groups === void 0) {
      const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "groups" }, message: "must have required property 'groups'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!func2.call(schema18.properties, key0)) {
        const err7 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.schemaVersion !== void 0) {
      let data0 = data.schemaVersion;
      if (typeof data0 !== "string") {
        const err8 = { instancePath: instancePath + "/schemaVersion", schemaPath: "#/properties/schemaVersion/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
      if ("2.0" !== data0) {
        const err9 = { instancePath: instancePath + "/schemaVersion", schemaPath: "#/properties/schemaVersion/const", keyword: "const", params: { allowedValue: "2.0" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.id !== void 0) {
      let data1 = data.id;
      if (typeof data1 === "string") {
        if (func3(data1) < 1) {
          const err10 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
        if (!pattern0.test(data1)) {
          const err11 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err11];
          } else {
            vErrors.push(err11);
          }
          errors++;
        }
      } else {
        const err12 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.title !== void 0) {
      let data2 = data.title;
      if (typeof data2 === "string") {
        if (func3(data2) < 1) {
          const err13 = { instancePath: instancePath + "/title", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
        if (!pattern0.test(data2)) {
          const err14 = { instancePath: instancePath + "/title", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
      } else {
        const err15 = { instancePath: instancePath + "/title", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.description !== void 0) {
      if (typeof data.description !== "string") {
        const err16 = { instancePath: instancePath + "/description", schemaPath: "#/properties/description/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
    if (data.sourceRevision !== void 0) {
      let data4 = data.sourceRevision;
      if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
        if (data4.commit === void 0) {
          const err17 = { instancePath: instancePath + "/sourceRevision", schemaPath: "#/definitions/sourceRevision/required", keyword: "required", params: { missingProperty: "commit" }, message: "must have required property 'commit'" };
          if (vErrors === null) {
            vErrors = [err17];
          } else {
            vErrors.push(err17);
          }
          errors++;
        }
        for (const key1 in data4) {
          if (!(key1 === "commit" || key1 === "dirty")) {
            const err18 = { instancePath: instancePath + "/sourceRevision", schemaPath: "#/definitions/sourceRevision/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err18];
            } else {
              vErrors.push(err18);
            }
            errors++;
          }
        }
        if (data4.commit !== void 0) {
          let data5 = data4.commit;
          if (typeof data5 === "string") {
            if (!pattern2.test(data5)) {
              const err19 = { instancePath: instancePath + "/sourceRevision/commit", schemaPath: "#/definitions/sourceRevision/properties/commit/pattern", keyword: "pattern", params: { pattern: "^(?:[a-fA-F0-9]{40}|[a-fA-F0-9]{64})$" }, message: 'must match pattern "^(?:[a-fA-F0-9]{40}|[a-fA-F0-9]{64})$"' };
              if (vErrors === null) {
                vErrors = [err19];
              } else {
                vErrors.push(err19);
              }
              errors++;
            }
          } else {
            const err20 = { instancePath: instancePath + "/sourceRevision/commit", schemaPath: "#/definitions/sourceRevision/properties/commit/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err20];
            } else {
              vErrors.push(err20);
            }
            errors++;
          }
        }
        if (data4.dirty !== void 0) {
          if (typeof data4.dirty !== "boolean") {
            const err21 = { instancePath: instancePath + "/sourceRevision/dirty", schemaPath: "#/definitions/sourceRevision/properties/dirty/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
            if (vErrors === null) {
              vErrors = [err21];
            } else {
              vErrors.push(err21);
            }
            errors++;
          }
        }
      } else {
        const err22 = { instancePath: instancePath + "/sourceRevision", schemaPath: "#/definitions/sourceRevision/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err22];
        } else {
          vErrors.push(err22);
        }
        errors++;
      }
    }
    if (data.view !== void 0) {
      if (!validate13(data.view, { instancePath: instancePath + "/view", parentData: data, parentDataProperty: "view", rootData })) {
        vErrors = vErrors === null ? validate13.errors : vErrors.concat(validate13.errors);
        errors = vErrors.length;
      }
    }
    if (data.nodes !== void 0) {
      if (!validate15(data.nodes, { instancePath: instancePath + "/nodes", parentData: data, parentDataProperty: "nodes", rootData })) {
        vErrors = vErrors === null ? validate15.errors : vErrors.concat(validate15.errors);
        errors = vErrors.length;
      }
    }
    if (data.edges !== void 0) {
      if (!validate23(data.edges, { instancePath: instancePath + "/edges", parentData: data, parentDataProperty: "edges", rootData })) {
        vErrors = vErrors === null ? validate23.errors : vErrors.concat(validate23.errors);
        errors = vErrors.length;
      }
    }
    if (data.groups !== void 0) {
      if (!validate28(data.groups, { instancePath: instancePath + "/groups", parentData: data, parentDataProperty: "groups", rootData })) {
        vErrors = vErrors === null ? validate28.errors : vErrors.concat(validate28.errors);
        errors = vErrors.length;
      }
    }
    if (data.spatial !== void 0) {
      let data11 = data.spatial;
      if (data11 && typeof data11 == "object" && !Array.isArray(data11)) {
        for (const key2 in data11) {
          if (!(key2 === "interiors" || key2 === "models")) {
            const err23 = { instancePath: instancePath + "/spatial", schemaPath: "#/properties/spatial/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err23];
            } else {
              vErrors.push(err23);
            }
            errors++;
          }
        }
        if (data11.interiors !== void 0) {
          if (!validate32(data11.interiors, { instancePath: instancePath + "/spatial/interiors", parentData: data11, parentDataProperty: "interiors", rootData })) {
            vErrors = vErrors === null ? validate32.errors : vErrors.concat(validate32.errors);
            errors = vErrors.length;
          }
        }
        if (data11.models !== void 0) {
          if (!validate38(data11.models, { instancePath: instancePath + "/spatial/models", parentData: data11, parentDataProperty: "models", rootData })) {
            vErrors = vErrors === null ? validate38.errors : vErrors.concat(validate38.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err24 = { instancePath: instancePath + "/spatial", schemaPath: "#/properties/spatial/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err24];
        } else {
          vErrors.push(err24);
        }
        errors++;
      }
    }
  } else {
    const err25 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err25];
    } else {
      vErrors.push(err25);
    }
    errors++;
  }
  validate12.errors = vErrors;
  return errors === 0;
}
function validate43(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.viewId === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "viewId" }, message: "must have required property 'viewId'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.nodeId === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "nodeId" }, message: "must have required property 'nodeId'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "viewId" || key0 === "nodeId")) {
        const err2 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
        }
        errors++;
      }
    }
    if (data.viewId !== void 0) {
      let data0 = data.viewId;
      if (typeof data0 === "string") {
        if (func3(data0) < 1) {
          const err3 = { instancePath: instancePath + "/viewId", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        }
        if (!pattern0.test(data0)) {
          const err4 = { instancePath: instancePath + "/viewId", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
      } else {
        const err5 = { instancePath: instancePath + "/viewId", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.nodeId !== void 0) {
      let data1 = data.nodeId;
      if (typeof data1 === "string") {
        if (func3(data1) < 1) {
          const err6 = { instancePath: instancePath + "/nodeId", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
        if (!pattern0.test(data1)) {
          const err7 = { instancePath: instancePath + "/nodeId", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
      } else {
        const err8 = { instancePath: instancePath + "/nodeId", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
  } else {
    const err9 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err9];
    } else {
      vErrors.push(err9);
    }
    errors++;
  }
  validate43.errors = vErrors;
  return errors === 0;
}
function validate11(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.views === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "views" }, message: "must have required property 'views'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "views" || key0 === "bridges")) {
        const err1 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
        }
        errors++;
      }
    }
    if (data.views !== void 0) {
      let data0 = data.views;
      if (Array.isArray(data0)) {
        if (data0.length > 20) {
          const err2 = { instancePath: instancePath + "/views", schemaPath: "#/properties/views/maxItems", keyword: "maxItems", params: { limit: 20 }, message: "must NOT have more than 20 items" };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        }
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data1 = data0[i0];
          if (data1 && typeof data1 == "object" && !Array.isArray(data1)) {
            if (data1.parentId === void 0) {
              const err3 = { instancePath: instancePath + "/views/" + i0, schemaPath: "#/properties/views/items/required", keyword: "required", params: { missingProperty: "parentId" }, message: "must have required property 'parentId'" };
              if (vErrors === null) {
                vErrors = [err3];
              } else {
                vErrors.push(err3);
              }
              errors++;
            }
            if (data1.ownerId === void 0) {
              const err4 = { instancePath: instancePath + "/views/" + i0, schemaPath: "#/properties/views/items/required", keyword: "required", params: { missingProperty: "ownerId" }, message: "must have required property 'ownerId'" };
              if (vErrors === null) {
                vErrors = [err4];
              } else {
                vErrors.push(err4);
              }
              errors++;
            }
            if (data1.document === void 0) {
              const err5 = { instancePath: instancePath + "/views/" + i0, schemaPath: "#/properties/views/items/required", keyword: "required", params: { missingProperty: "document" }, message: "must have required property 'document'" };
              if (vErrors === null) {
                vErrors = [err5];
              } else {
                vErrors.push(err5);
              }
              errors++;
            }
            for (const key1 in data1) {
              if (!(key1 === "parentId" || key1 === "ownerId" || key1 === "document")) {
                const err6 = { instancePath: instancePath + "/views/" + i0, schemaPath: "#/properties/views/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err6];
                } else {
                  vErrors.push(err6);
                }
                errors++;
              }
            }
            if (data1.parentId !== void 0) {
              let data2 = data1.parentId;
              if (typeof data2 === "string") {
                if (func3(data2) < 1) {
                  const err7 = { instancePath: instancePath + "/views/" + i0 + "/parentId", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err7];
                  } else {
                    vErrors.push(err7);
                  }
                  errors++;
                }
                if (!pattern0.test(data2)) {
                  const err8 = { instancePath: instancePath + "/views/" + i0 + "/parentId", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
                  if (vErrors === null) {
                    vErrors = [err8];
                  } else {
                    vErrors.push(err8);
                  }
                  errors++;
                }
              } else {
                const err9 = { instancePath: instancePath + "/views/" + i0 + "/parentId", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err9];
                } else {
                  vErrors.push(err9);
                }
                errors++;
              }
            }
            if (data1.ownerId !== void 0) {
              let data3 = data1.ownerId;
              if (typeof data3 === "string") {
                if (func3(data3) < 1) {
                  const err10 = { instancePath: instancePath + "/views/" + i0 + "/ownerId", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err10];
                  } else {
                    vErrors.push(err10);
                  }
                  errors++;
                }
                if (!pattern0.test(data3)) {
                  const err11 = { instancePath: instancePath + "/views/" + i0 + "/ownerId", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
                  if (vErrors === null) {
                    vErrors = [err11];
                  } else {
                    vErrors.push(err11);
                  }
                  errors++;
                }
              } else {
                const err12 = { instancePath: instancePath + "/views/" + i0 + "/ownerId", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err12];
                } else {
                  vErrors.push(err12);
                }
                errors++;
              }
            }
            if (data1.document !== void 0) {
              if (!validate12(data1.document, { instancePath: instancePath + "/views/" + i0 + "/document", parentData: data1, parentDataProperty: "document", rootData })) {
                vErrors = vErrors === null ? validate12.errors : vErrors.concat(validate12.errors);
                errors = vErrors.length;
              }
            }
          } else {
            const err13 = { instancePath: instancePath + "/views/" + i0, schemaPath: "#/properties/views/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err13];
            } else {
              vErrors.push(err13);
            }
            errors++;
          }
        }
      } else {
        const err14 = { instancePath: instancePath + "/views", schemaPath: "#/properties/views/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
    }
    if (data.bridges !== void 0) {
      let data5 = data.bridges;
      if (Array.isArray(data5)) {
        if (data5.length > 300) {
          const err15 = { instancePath: instancePath + "/bridges", schemaPath: "#/properties/bridges/maxItems", keyword: "maxItems", params: { limit: 300 }, message: "must NOT have more than 300 items" };
          if (vErrors === null) {
            vErrors = [err15];
          } else {
            vErrors.push(err15);
          }
          errors++;
        }
        const len1 = data5.length;
        for (let i1 = 0; i1 < len1; i1++) {
          let data6 = data5[i1];
          if (data6 && typeof data6 == "object" && !Array.isArray(data6)) {
            if (data6.id === void 0) {
              const err16 = { instancePath: instancePath + "/bridges/" + i1, schemaPath: "#/properties/bridges/items/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
              if (vErrors === null) {
                vErrors = [err16];
              } else {
                vErrors.push(err16);
              }
              errors++;
            }
            if (data6.source === void 0) {
              const err17 = { instancePath: instancePath + "/bridges/" + i1, schemaPath: "#/properties/bridges/items/required", keyword: "required", params: { missingProperty: "source" }, message: "must have required property 'source'" };
              if (vErrors === null) {
                vErrors = [err17];
              } else {
                vErrors.push(err17);
              }
              errors++;
            }
            if (data6.target === void 0) {
              const err18 = { instancePath: instancePath + "/bridges/" + i1, schemaPath: "#/properties/bridges/items/required", keyword: "required", params: { missingProperty: "target" }, message: "must have required property 'target'" };
              if (vErrors === null) {
                vErrors = [err18];
              } else {
                vErrors.push(err18);
              }
              errors++;
            }
            if (data6.kind === void 0) {
              const err19 = { instancePath: instancePath + "/bridges/" + i1, schemaPath: "#/properties/bridges/items/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
              if (vErrors === null) {
                vErrors = [err19];
              } else {
                vErrors.push(err19);
              }
              errors++;
            }
            if (data6.directed === void 0) {
              const err20 = { instancePath: instancePath + "/bridges/" + i1, schemaPath: "#/properties/bridges/items/required", keyword: "required", params: { missingProperty: "directed" }, message: "must have required property 'directed'" };
              if (vErrors === null) {
                vErrors = [err20];
              } else {
                vErrors.push(err20);
              }
              errors++;
            }
            for (const key2 in data6) {
              if (!func2.call(schema15.properties.bridges.items.properties, key2)) {
                const err21 = { instancePath: instancePath + "/bridges/" + i1, schemaPath: "#/properties/bridges/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
                if (vErrors === null) {
                  vErrors = [err21];
                } else {
                  vErrors.push(err21);
                }
                errors++;
              }
            }
            if (data6.id !== void 0) {
              let data7 = data6.id;
              if (typeof data7 === "string") {
                if (func3(data7) < 1) {
                  const err22 = { instancePath: instancePath + "/bridges/" + i1 + "/id", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err22];
                  } else {
                    vErrors.push(err22);
                  }
                  errors++;
                }
                if (!pattern0.test(data7)) {
                  const err23 = { instancePath: instancePath + "/bridges/" + i1 + "/id", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
                  if (vErrors === null) {
                    vErrors = [err23];
                  } else {
                    vErrors.push(err23);
                  }
                  errors++;
                }
              } else {
                const err24 = { instancePath: instancePath + "/bridges/" + i1 + "/id", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err24];
                } else {
                  vErrors.push(err24);
                }
                errors++;
              }
            }
            if (data6.source !== void 0) {
              if (!validate43(data6.source, { instancePath: instancePath + "/bridges/" + i1 + "/source", parentData: data6, parentDataProperty: "source", rootData })) {
                vErrors = vErrors === null ? validate43.errors : vErrors.concat(validate43.errors);
                errors = vErrors.length;
              }
            }
            if (data6.target !== void 0) {
              if (!validate43(data6.target, { instancePath: instancePath + "/bridges/" + i1 + "/target", parentData: data6, parentDataProperty: "target", rootData })) {
                vErrors = vErrors === null ? validate43.errors : vErrors.concat(validate43.errors);
                errors = vErrors.length;
              }
            }
            if (data6.kind !== void 0) {
              let data10 = data6.kind;
              if (!(data10 === "control" || data10 === "data" || data10 === "dependency" || data10 === "exception" || data10 === "feedback")) {
                const err25 = { instancePath: instancePath + "/bridges/" + i1 + "/kind", schemaPath: "#/definitions/edge/properties/kind/enum", keyword: "enum", params: { allowedValues: schema60.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err25];
                } else {
                  vErrors.push(err25);
                }
                errors++;
              }
            }
            if (data6.directed !== void 0) {
              if (typeof data6.directed !== "boolean") {
                const err26 = { instancePath: instancePath + "/bridges/" + i1 + "/directed", schemaPath: "#/properties/bridges/items/properties/directed/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
                if (vErrors === null) {
                  vErrors = [err26];
                } else {
                  vErrors.push(err26);
                }
                errors++;
              }
            }
            if (data6.label !== void 0) {
              if (typeof data6.label !== "string") {
                const err27 = { instancePath: instancePath + "/bridges/" + i1 + "/label", schemaPath: "#/properties/bridges/items/properties/label/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err27];
                } else {
                  vErrors.push(err27);
                }
                errors++;
              }
            }
            if (data6.details !== void 0) {
              let data13 = data6.details;
              if (typeof data13 === "string") {
                if (func3(data13) > 8e3) {
                  const err28 = { instancePath: instancePath + "/bridges/" + i1 + "/details", schemaPath: "#/definitions/details/maxLength", keyword: "maxLength", params: { limit: 8e3 }, message: "must NOT have more than 8000 characters" };
                  if (vErrors === null) {
                    vErrors = [err28];
                  } else {
                    vErrors.push(err28);
                  }
                  errors++;
                }
              } else {
                const err29 = { instancePath: instancePath + "/bridges/" + i1 + "/details", schemaPath: "#/definitions/details/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err29];
                } else {
                  vErrors.push(err29);
                }
                errors++;
              }
            }
            if (data6.evidenceStatus !== void 0) {
              let data14 = data6.evidenceStatus;
              if (!(data14 === "confirmed" || data14 === "assumed" || data14 === "planned")) {
                const err30 = { instancePath: instancePath + "/bridges/" + i1 + "/evidenceStatus", schemaPath: "#/definitions/evidenceStatus/enum", keyword: "enum", params: { allowedValues: schema32.enum }, message: "must be equal to one of the allowed values" };
                if (vErrors === null) {
                  vErrors = [err30];
                } else {
                  vErrors.push(err30);
                }
                errors++;
              }
            }
            if (data6.sources !== void 0) {
              if (!validate17(data6.sources, { instancePath: instancePath + "/bridges/" + i1 + "/sources", parentData: data6, parentDataProperty: "sources", rootData })) {
                vErrors = vErrors === null ? validate17.errors : vErrors.concat(validate17.errors);
                errors = vErrors.length;
              }
            }
          } else {
            const err31 = { instancePath: instancePath + "/bridges/" + i1, schemaPath: "#/properties/bridges/items/type", keyword: "type", params: { type: "object" }, message: "must be object" };
            if (vErrors === null) {
              vErrors = [err31];
            } else {
              vErrors.push(err31);
            }
            errors++;
          }
        }
      } else {
        const err32 = { instancePath: instancePath + "/bridges", schemaPath: "#/properties/bridges/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err32];
        } else {
          vErrors.push(err32);
        }
        errors++;
      }
    }
  } else {
    const err33 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err33];
    } else {
      vErrors.push(err33);
    }
    errors++;
  }
  validate11.errors = vErrors;
  return errors === 0;
}
var schema68 = { "type": "object", "additionalProperties": false, "required": ["id", "title", "description", "route", "focusId", "tone"], "properties": { "id": { "$ref": "#/definitions/nonEmptyText" }, "title": { "$ref": "#/definitions/nonEmptyText" }, "description": { "type": "string" }, "route": { "type": "array", "minItems": 1, "maxItems": 300, "items": { "$ref": "#/definitions/nonEmptyText" } }, "focusId": { "$ref": "#/definitions/nonEmptyText" }, "viewId": { "$ref": "#/definitions/nonEmptyText" }, "evidenceStatus": { "$ref": "#/definitions/evidenceStatus" }, "sources": { "$ref": "#/definitions/sources" }, "tone": { "enum": ["request", "data", "success", "failure"] }, "durationMs": { "type": "integer", "minimum": 1, "maximum": 9007199254740991 } } };
function validate54(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.title === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "title" }, message: "must have required property 'title'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.description === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "description" }, message: "must have required property 'description'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.route === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "route" }, message: "must have required property 'route'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.focusId === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "focusId" }, message: "must have required property 'focusId'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.tone === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "tone" }, message: "must have required property 'tone'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!func2.call(schema68.properties, key0)) {
        const err6 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.id !== void 0) {
      let data0 = data.id;
      if (typeof data0 === "string") {
        if (func3(data0) < 1) {
          const err7 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        if (!pattern0.test(data0)) {
          const err8 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
      } else {
        const err9 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.title !== void 0) {
      let data1 = data.title;
      if (typeof data1 === "string") {
        if (func3(data1) < 1) {
          const err10 = { instancePath: instancePath + "/title", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
        if (!pattern0.test(data1)) {
          const err11 = { instancePath: instancePath + "/title", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err11];
          } else {
            vErrors.push(err11);
          }
          errors++;
        }
      } else {
        const err12 = { instancePath: instancePath + "/title", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.description !== void 0) {
      if (typeof data.description !== "string") {
        const err13 = { instancePath: instancePath + "/description", schemaPath: "#/properties/description/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.route !== void 0) {
      let data3 = data.route;
      if (Array.isArray(data3)) {
        if (data3.length > 300) {
          const err14 = { instancePath: instancePath + "/route", schemaPath: "#/properties/route/maxItems", keyword: "maxItems", params: { limit: 300 }, message: "must NOT have more than 300 items" };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
        if (data3.length < 1) {
          const err15 = { instancePath: instancePath + "/route", schemaPath: "#/properties/route/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
          if (vErrors === null) {
            vErrors = [err15];
          } else {
            vErrors.push(err15);
          }
          errors++;
        }
        const len0 = data3.length;
        for (let i0 = 0; i0 < len0; i0++) {
          let data4 = data3[i0];
          if (typeof data4 === "string") {
            if (func3(data4) < 1) {
              const err16 = { instancePath: instancePath + "/route/" + i0, schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
              if (vErrors === null) {
                vErrors = [err16];
              } else {
                vErrors.push(err16);
              }
              errors++;
            }
            if (!pattern0.test(data4)) {
              const err17 = { instancePath: instancePath + "/route/" + i0, schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
              if (vErrors === null) {
                vErrors = [err17];
              } else {
                vErrors.push(err17);
              }
              errors++;
            }
          } else {
            const err18 = { instancePath: instancePath + "/route/" + i0, schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err18];
            } else {
              vErrors.push(err18);
            }
            errors++;
          }
        }
      } else {
        const err19 = { instancePath: instancePath + "/route", schemaPath: "#/properties/route/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err19];
        } else {
          vErrors.push(err19);
        }
        errors++;
      }
    }
    if (data.focusId !== void 0) {
      let data5 = data.focusId;
      if (typeof data5 === "string") {
        if (func3(data5) < 1) {
          const err20 = { instancePath: instancePath + "/focusId", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err20];
          } else {
            vErrors.push(err20);
          }
          errors++;
        }
        if (!pattern0.test(data5)) {
          const err21 = { instancePath: instancePath + "/focusId", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err21];
          } else {
            vErrors.push(err21);
          }
          errors++;
        }
      } else {
        const err22 = { instancePath: instancePath + "/focusId", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err22];
        } else {
          vErrors.push(err22);
        }
        errors++;
      }
    }
    if (data.viewId !== void 0) {
      let data6 = data.viewId;
      if (typeof data6 === "string") {
        if (func3(data6) < 1) {
          const err23 = { instancePath: instancePath + "/viewId", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err23];
          } else {
            vErrors.push(err23);
          }
          errors++;
        }
        if (!pattern0.test(data6)) {
          const err24 = { instancePath: instancePath + "/viewId", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err24];
          } else {
            vErrors.push(err24);
          }
          errors++;
        }
      } else {
        const err25 = { instancePath: instancePath + "/viewId", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err25];
        } else {
          vErrors.push(err25);
        }
        errors++;
      }
    }
    if (data.evidenceStatus !== void 0) {
      let data7 = data.evidenceStatus;
      if (!(data7 === "confirmed" || data7 === "assumed" || data7 === "planned")) {
        const err26 = { instancePath: instancePath + "/evidenceStatus", schemaPath: "#/definitions/evidenceStatus/enum", keyword: "enum", params: { allowedValues: schema32.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err26];
        } else {
          vErrors.push(err26);
        }
        errors++;
      }
    }
    if (data.sources !== void 0) {
      if (!validate17(data.sources, { instancePath: instancePath + "/sources", parentData: data, parentDataProperty: "sources", rootData })) {
        vErrors = vErrors === null ? validate17.errors : vErrors.concat(validate17.errors);
        errors = vErrors.length;
      }
    }
    if (data.tone !== void 0) {
      let data9 = data.tone;
      if (!(data9 === "request" || data9 === "data" || data9 === "success" || data9 === "failure")) {
        const err27 = { instancePath: instancePath + "/tone", schemaPath: "#/properties/tone/enum", keyword: "enum", params: { allowedValues: schema68.properties.tone.enum }, message: "must be equal to one of the allowed values" };
        if (vErrors === null) {
          vErrors = [err27];
        } else {
          vErrors.push(err27);
        }
        errors++;
      }
    }
    if (data.durationMs !== void 0) {
      let data10 = data.durationMs;
      if (!(typeof data10 == "number" && (!(data10 % 1) && !isNaN(data10)) && isFinite(data10))) {
        const err28 = { instancePath: instancePath + "/durationMs", schemaPath: "#/properties/durationMs/type", keyword: "type", params: { type: "integer" }, message: "must be integer" };
        if (vErrors === null) {
          vErrors = [err28];
        } else {
          vErrors.push(err28);
        }
        errors++;
      }
      if (typeof data10 == "number" && isFinite(data10)) {
        if (data10 > 9007199254740991 || isNaN(data10)) {
          const err29 = { instancePath: instancePath + "/durationMs", schemaPath: "#/properties/durationMs/maximum", keyword: "maximum", params: { comparison: "<=", limit: 9007199254740991 }, message: "must be <= 9007199254740991" };
          if (vErrors === null) {
            vErrors = [err29];
          } else {
            vErrors.push(err29);
          }
          errors++;
        }
        if (data10 < 1 || isNaN(data10)) {
          const err30 = { instancePath: instancePath + "/durationMs", schemaPath: "#/properties/durationMs/minimum", keyword: "minimum", params: { comparison: ">=", limit: 1 }, message: "must be >= 1" };
          if (vErrors === null) {
            vErrors = [err30];
          } else {
            vErrors.push(err30);
          }
          errors++;
        }
      }
    }
  } else {
    const err31 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err31];
    } else {
      vErrors.push(err31);
    }
    errors++;
  }
  validate54.errors = vErrors;
  return errors === 0;
}
function validate53(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.id === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.label === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "label" }, message: "must have required property 'label'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.steps === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "steps" }, message: "must have required property 'steps'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === "id" || key0 === "label" || key0 === "steps")) {
        const err3 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.id !== void 0) {
      let data0 = data.id;
      if (typeof data0 === "string") {
        if (func3(data0) < 1) {
          const err4 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (!pattern0.test(data0)) {
          const err5 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
      } else {
        const err6 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.label !== void 0) {
      let data1 = data.label;
      if (typeof data1 === "string") {
        if (func3(data1) < 1) {
          const err7 = { instancePath: instancePath + "/label", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        if (!pattern0.test(data1)) {
          const err8 = { instancePath: instancePath + "/label", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
      } else {
        const err9 = { instancePath: instancePath + "/label", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.steps !== void 0) {
      let data2 = data.steps;
      if (Array.isArray(data2)) {
        if (data2.length > 200) {
          const err10 = { instancePath: instancePath + "/steps", schemaPath: "#/properties/steps/maxItems", keyword: "maxItems", params: { limit: 200 }, message: "must NOT have more than 200 items" };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
        if (data2.length < 1) {
          const err11 = { instancePath: instancePath + "/steps", schemaPath: "#/properties/steps/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
          if (vErrors === null) {
            vErrors = [err11];
          } else {
            vErrors.push(err11);
          }
          errors++;
        }
        const len0 = data2.length;
        for (let i0 = 0; i0 < len0; i0++) {
          if (!validate54(data2[i0], { instancePath: instancePath + "/steps/" + i0, parentData: data2, parentDataProperty: i0, rootData })) {
            vErrors = vErrors === null ? validate54.errors : vErrors.concat(validate54.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err12 = { instancePath: instancePath + "/steps", schemaPath: "#/properties/steps/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
  } else {
    const err13 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err13];
    } else {
      vErrors.push(err13);
    }
    errors++;
  }
  validate53.errors = vErrors;
  return errors === 0;
}
function validate10(data, { instancePath = "", parentData, parentDataProperty, rootData = data } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  if (data && typeof data == "object" && !Array.isArray(data)) {
    if (data.schemaVersion === void 0) {
      const err0 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "schemaVersion" }, message: "must have required property 'schemaVersion'" };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.id === void 0) {
      const err1 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "id" }, message: "must have required property 'id'" };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.title === void 0) {
      const err2 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "title" }, message: "must have required property 'title'" };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.view === void 0) {
      const err3 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "view" }, message: "must have required property 'view'" };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.nodes === void 0) {
      const err4 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "nodes" }, message: "must have required property 'nodes'" };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.edges === void 0) {
      const err5 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "edges" }, message: "must have required property 'edges'" };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.groups === void 0) {
      const err6 = { instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: "groups" }, message: "must have required property 'groups'" };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!func2.call(schema11.properties, key0)) {
        const err7 = { instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.schemaVersion !== void 0) {
      let data0 = data.schemaVersion;
      if (typeof data0 !== "string") {
        const err8 = { instancePath: instancePath + "/schemaVersion", schemaPath: "#/properties/schemaVersion/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
      if ("2.0" !== data0) {
        const err9 = { instancePath: instancePath + "/schemaVersion", schemaPath: "#/properties/schemaVersion/const", keyword: "const", params: { allowedValue: "2.0" }, message: "must be equal to constant" };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.id !== void 0) {
      let data1 = data.id;
      if (typeof data1 === "string") {
        if (func3(data1) < 1) {
          const err10 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
        if (!pattern0.test(data1)) {
          const err11 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err11];
          } else {
            vErrors.push(err11);
          }
          errors++;
        }
      } else {
        const err12 = { instancePath: instancePath + "/id", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.title !== void 0) {
      let data2 = data.title;
      if (typeof data2 === "string") {
        if (func3(data2) < 1) {
          const err13 = { instancePath: instancePath + "/title", schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
        if (!pattern0.test(data2)) {
          const err14 = { instancePath: instancePath + "/title", schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
      } else {
        const err15 = { instancePath: instancePath + "/title", schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.description !== void 0) {
      if (typeof data.description !== "string") {
        const err16 = { instancePath: instancePath + "/description", schemaPath: "#/properties/description/type", keyword: "type", params: { type: "string" }, message: "must be string" };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
    if (data.sourceRevision !== void 0) {
      let data4 = data.sourceRevision;
      if (data4 && typeof data4 == "object" && !Array.isArray(data4)) {
        if (data4.commit === void 0) {
          const err17 = { instancePath: instancePath + "/sourceRevision", schemaPath: "#/definitions/sourceRevision/required", keyword: "required", params: { missingProperty: "commit" }, message: "must have required property 'commit'" };
          if (vErrors === null) {
            vErrors = [err17];
          } else {
            vErrors.push(err17);
          }
          errors++;
        }
        for (const key1 in data4) {
          if (!(key1 === "commit" || key1 === "dirty")) {
            const err18 = { instancePath: instancePath + "/sourceRevision", schemaPath: "#/definitions/sourceRevision/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err18];
            } else {
              vErrors.push(err18);
            }
            errors++;
          }
        }
        if (data4.commit !== void 0) {
          let data5 = data4.commit;
          if (typeof data5 === "string") {
            if (!pattern2.test(data5)) {
              const err19 = { instancePath: instancePath + "/sourceRevision/commit", schemaPath: "#/definitions/sourceRevision/properties/commit/pattern", keyword: "pattern", params: { pattern: "^(?:[a-fA-F0-9]{40}|[a-fA-F0-9]{64})$" }, message: 'must match pattern "^(?:[a-fA-F0-9]{40}|[a-fA-F0-9]{64})$"' };
              if (vErrors === null) {
                vErrors = [err19];
              } else {
                vErrors.push(err19);
              }
              errors++;
            }
          } else {
            const err20 = { instancePath: instancePath + "/sourceRevision/commit", schemaPath: "#/definitions/sourceRevision/properties/commit/type", keyword: "type", params: { type: "string" }, message: "must be string" };
            if (vErrors === null) {
              vErrors = [err20];
            } else {
              vErrors.push(err20);
            }
            errors++;
          }
        }
        if (data4.dirty !== void 0) {
          if (typeof data4.dirty !== "boolean") {
            const err21 = { instancePath: instancePath + "/sourceRevision/dirty", schemaPath: "#/definitions/sourceRevision/properties/dirty/type", keyword: "type", params: { type: "boolean" }, message: "must be boolean" };
            if (vErrors === null) {
              vErrors = [err21];
            } else {
              vErrors.push(err21);
            }
            errors++;
          }
        }
      } else {
        const err22 = { instancePath: instancePath + "/sourceRevision", schemaPath: "#/definitions/sourceRevision/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err22];
        } else {
          vErrors.push(err22);
        }
        errors++;
      }
    }
    if (data.navigation !== void 0) {
      if (!validate11(data.navigation, { instancePath: instancePath + "/navigation", parentData: data, parentDataProperty: "navigation", rootData })) {
        vErrors = vErrors === null ? validate11.errors : vErrors.concat(validate11.errors);
        errors = vErrors.length;
      }
    }
    if (data.view !== void 0) {
      let data8 = data.view;
      if (data8 && typeof data8 == "object" && !Array.isArray(data8)) {
        if (data8.kind === void 0) {
          const err23 = { instancePath: instancePath + "/view", schemaPath: "#/properties/view/required", keyword: "required", params: { missingProperty: "kind" }, message: "must have required property 'kind'" };
          if (vErrors === null) {
            vErrors = [err23];
          } else {
            vErrors.push(err23);
          }
          errors++;
        }
        if (data8.direction === void 0) {
          const err24 = { instancePath: instancePath + "/view", schemaPath: "#/properties/view/required", keyword: "required", params: { missingProperty: "direction" }, message: "must have required property 'direction'" };
          if (vErrors === null) {
            vErrors = [err24];
          } else {
            vErrors.push(err24);
          }
          errors++;
        }
        if (data8.theme === void 0) {
          const err25 = { instancePath: instancePath + "/view", schemaPath: "#/properties/view/required", keyword: "required", params: { missingProperty: "theme" }, message: "must have required property 'theme'" };
          if (vErrors === null) {
            vErrors = [err25];
          } else {
            vErrors.push(err25);
          }
          errors++;
        }
        for (const key2 in data8) {
          if (!(key2 === "kind" || key2 === "direction" || key2 === "theme" || key2 === "collapsedGroups" || key2 === "primaryPath")) {
            const err26 = { instancePath: instancePath + "/view", schemaPath: "#/properties/view/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err26];
            } else {
              vErrors.push(err26);
            }
            errors++;
          }
        }
        if (data8.kind !== void 0) {
          let data9 = data8.kind;
          if (!(data9 === "overview" || data9 === "flow" || data9 === "deployment")) {
            const err27 = { instancePath: instancePath + "/view/kind", schemaPath: "#/properties/view/properties/kind/enum", keyword: "enum", params: { allowedValues: schema11.properties.view.properties.kind.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err27];
            } else {
              vErrors.push(err27);
            }
            errors++;
          }
        }
        if (data8.direction !== void 0) {
          let data10 = data8.direction;
          if (!(data10 === "RIGHT" || data10 === "DOWN")) {
            const err28 = { instancePath: instancePath + "/view/direction", schemaPath: "#/properties/view/properties/direction/enum", keyword: "enum", params: { allowedValues: schema11.properties.view.properties.direction.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err28];
            } else {
              vErrors.push(err28);
            }
            errors++;
          }
        }
        if (data8.theme !== void 0) {
          let data11 = data8.theme;
          if (!(data11 === "light" || data11 === "dark")) {
            const err29 = { instancePath: instancePath + "/view/theme", schemaPath: "#/properties/view/properties/theme/enum", keyword: "enum", params: { allowedValues: schema11.properties.view.properties.theme.enum }, message: "must be equal to one of the allowed values" };
            if (vErrors === null) {
              vErrors = [err29];
            } else {
              vErrors.push(err29);
            }
            errors++;
          }
        }
        if (data8.collapsedGroups !== void 0) {
          let data12 = data8.collapsedGroups;
          if (Array.isArray(data12)) {
            const len0 = data12.length;
            for (let i0 = 0; i0 < len0; i0++) {
              let data13 = data12[i0];
              if (typeof data13 === "string") {
                if (func3(data13) < 1) {
                  const err30 = { instancePath: instancePath + "/view/collapsedGroups/" + i0, schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err30];
                  } else {
                    vErrors.push(err30);
                  }
                  errors++;
                }
                if (!pattern0.test(data13)) {
                  const err31 = { instancePath: instancePath + "/view/collapsedGroups/" + i0, schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
                  if (vErrors === null) {
                    vErrors = [err31];
                  } else {
                    vErrors.push(err31);
                  }
                  errors++;
                }
              } else {
                const err32 = { instancePath: instancePath + "/view/collapsedGroups/" + i0, schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err32];
                } else {
                  vErrors.push(err32);
                }
                errors++;
              }
            }
            let i1 = data12.length;
            let j0;
            if (i1 > 1) {
              outer0: for (; i1--; ) {
                for (j0 = i1; j0--; ) {
                  if (func0(data12[i1], data12[j0])) {
                    const err33 = { instancePath: instancePath + "/view/collapsedGroups", schemaPath: "#/properties/view/properties/collapsedGroups/uniqueItems", keyword: "uniqueItems", params: { i: i1, j: j0 }, message: "must NOT have duplicate items (items ## " + j0 + " and " + i1 + " are identical)" };
                    if (vErrors === null) {
                      vErrors = [err33];
                    } else {
                      vErrors.push(err33);
                    }
                    errors++;
                    break outer0;
                  }
                }
              }
            }
          } else {
            const err34 = { instancePath: instancePath + "/view/collapsedGroups", schemaPath: "#/properties/view/properties/collapsedGroups/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err34];
            } else {
              vErrors.push(err34);
            }
            errors++;
          }
        }
        if (data8.primaryPath !== void 0) {
          let data14 = data8.primaryPath;
          if (Array.isArray(data14)) {
            const len1 = data14.length;
            for (let i2 = 0; i2 < len1; i2++) {
              let data15 = data14[i2];
              if (typeof data15 === "string") {
                if (func3(data15) < 1) {
                  const err35 = { instancePath: instancePath + "/view/primaryPath/" + i2, schemaPath: "#/definitions/nonEmptyText/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" };
                  if (vErrors === null) {
                    vErrors = [err35];
                  } else {
                    vErrors.push(err35);
                  }
                  errors++;
                }
                if (!pattern0.test(data15)) {
                  const err36 = { instancePath: instancePath + "/view/primaryPath/" + i2, schemaPath: "#/definitions/nonEmptyText/pattern", keyword: "pattern", params: { pattern: "\\S" }, message: 'must match pattern "\\S"' };
                  if (vErrors === null) {
                    vErrors = [err36];
                  } else {
                    vErrors.push(err36);
                  }
                  errors++;
                }
              } else {
                const err37 = { instancePath: instancePath + "/view/primaryPath/" + i2, schemaPath: "#/definitions/nonEmptyText/type", keyword: "type", params: { type: "string" }, message: "must be string" };
                if (vErrors === null) {
                  vErrors = [err37];
                } else {
                  vErrors.push(err37);
                }
                errors++;
              }
            }
          } else {
            const err38 = { instancePath: instancePath + "/view/primaryPath", schemaPath: "#/properties/view/properties/primaryPath/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err38];
            } else {
              vErrors.push(err38);
            }
            errors++;
          }
        }
      } else {
        const err39 = { instancePath: instancePath + "/view", schemaPath: "#/properties/view/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err39];
        } else {
          vErrors.push(err39);
        }
        errors++;
      }
    }
    if (data.nodes !== void 0) {
      let data16 = data.nodes;
      if (Array.isArray(data16)) {
        if (data16.length > 100) {
          const err40 = { instancePath: instancePath + "/nodes", schemaPath: "#/properties/nodes/maxItems", keyword: "maxItems", params: { limit: 100 }, message: "must NOT have more than 100 items" };
          if (vErrors === null) {
            vErrors = [err40];
          } else {
            vErrors.push(err40);
          }
          errors++;
        }
        if (data16.length < 1) {
          const err41 = { instancePath: instancePath + "/nodes", schemaPath: "#/properties/nodes/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" };
          if (vErrors === null) {
            vErrors = [err41];
          } else {
            vErrors.push(err41);
          }
          errors++;
        }
        const len2 = data16.length;
        for (let i3 = 0; i3 < len2; i3++) {
          if (!validate16(data16[i3], { instancePath: instancePath + "/nodes/" + i3, parentData: data16, parentDataProperty: i3, rootData })) {
            vErrors = vErrors === null ? validate16.errors : vErrors.concat(validate16.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err42 = { instancePath: instancePath + "/nodes", schemaPath: "#/properties/nodes/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err42];
        } else {
          vErrors.push(err42);
        }
        errors++;
      }
    }
    if (data.edges !== void 0) {
      let data18 = data.edges;
      if (Array.isArray(data18)) {
        if (data18.length > 300) {
          const err43 = { instancePath: instancePath + "/edges", schemaPath: "#/properties/edges/maxItems", keyword: "maxItems", params: { limit: 300 }, message: "must NOT have more than 300 items" };
          if (vErrors === null) {
            vErrors = [err43];
          } else {
            vErrors.push(err43);
          }
          errors++;
        }
        const len3 = data18.length;
        for (let i4 = 0; i4 < len3; i4++) {
          if (!validate24(data18[i4], { instancePath: instancePath + "/edges/" + i4, parentData: data18, parentDataProperty: i4, rootData })) {
            vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err44 = { instancePath: instancePath + "/edges", schemaPath: "#/properties/edges/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err44];
        } else {
          vErrors.push(err44);
        }
        errors++;
      }
    }
    if (data.groups !== void 0) {
      let data20 = data.groups;
      if (Array.isArray(data20)) {
        if (data20.length > 20) {
          const err45 = { instancePath: instancePath + "/groups", schemaPath: "#/properties/groups/maxItems", keyword: "maxItems", params: { limit: 20 }, message: "must NOT have more than 20 items" };
          if (vErrors === null) {
            vErrors = [err45];
          } else {
            vErrors.push(err45);
          }
          errors++;
        }
        const len4 = data20.length;
        for (let i5 = 0; i5 < len4; i5++) {
          if (!validate29(data20[i5], { instancePath: instancePath + "/groups/" + i5, parentData: data20, parentDataProperty: i5, rootData })) {
            vErrors = vErrors === null ? validate29.errors : vErrors.concat(validate29.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err46 = { instancePath: instancePath + "/groups", schemaPath: "#/properties/groups/type", keyword: "type", params: { type: "array" }, message: "must be array" };
        if (vErrors === null) {
          vErrors = [err46];
        } else {
          vErrors.push(err46);
        }
        errors++;
      }
    }
    if (data.spatial !== void 0) {
      let data22 = data.spatial;
      if (data22 && typeof data22 == "object" && !Array.isArray(data22)) {
        for (const key3 in data22) {
          if (!(key3 === "interiors" || key3 === "models" || key3 === "scenarios")) {
            const err47 = { instancePath: instancePath + "/spatial", schemaPath: "#/properties/spatial/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key3 }, message: "must NOT have additional properties" };
            if (vErrors === null) {
              vErrors = [err47];
            } else {
              vErrors.push(err47);
            }
            errors++;
          }
        }
        if (data22.interiors !== void 0) {
          let data23 = data22.interiors;
          if (Array.isArray(data23)) {
            if (data23.length > 100) {
              const err48 = { instancePath: instancePath + "/spatial/interiors", schemaPath: "#/properties/spatial/properties/interiors/maxItems", keyword: "maxItems", params: { limit: 100 }, message: "must NOT have more than 100 items" };
              if (vErrors === null) {
                vErrors = [err48];
              } else {
                vErrors.push(err48);
              }
              errors++;
            }
            const len5 = data23.length;
            for (let i6 = 0; i6 < len5; i6++) {
              if (!validate33(data23[i6], { instancePath: instancePath + "/spatial/interiors/" + i6, parentData: data23, parentDataProperty: i6, rootData })) {
                vErrors = vErrors === null ? validate33.errors : vErrors.concat(validate33.errors);
                errors = vErrors.length;
              }
            }
          } else {
            const err49 = { instancePath: instancePath + "/spatial/interiors", schemaPath: "#/properties/spatial/properties/interiors/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err49];
            } else {
              vErrors.push(err49);
            }
            errors++;
          }
        }
        if (data22.models !== void 0) {
          let data25 = data22.models;
          if (Array.isArray(data25)) {
            if (data25.length > 100) {
              const err50 = { instancePath: instancePath + "/spatial/models", schemaPath: "#/properties/spatial/properties/models/maxItems", keyword: "maxItems", params: { limit: 100 }, message: "must NOT have more than 100 items" };
              if (vErrors === null) {
                vErrors = [err50];
              } else {
                vErrors.push(err50);
              }
              errors++;
            }
            const len6 = data25.length;
            for (let i7 = 0; i7 < len6; i7++) {
              if (!validate39(data25[i7], { instancePath: instancePath + "/spatial/models/" + i7, parentData: data25, parentDataProperty: i7, rootData })) {
                vErrors = vErrors === null ? validate39.errors : vErrors.concat(validate39.errors);
                errors = vErrors.length;
              }
            }
          } else {
            const err51 = { instancePath: instancePath + "/spatial/models", schemaPath: "#/properties/spatial/properties/models/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err51];
            } else {
              vErrors.push(err51);
            }
            errors++;
          }
        }
        if (data22.scenarios !== void 0) {
          let data27 = data22.scenarios;
          if (Array.isArray(data27)) {
            if (data27.length > 20) {
              const err52 = { instancePath: instancePath + "/spatial/scenarios", schemaPath: "#/properties/spatial/properties/scenarios/maxItems", keyword: "maxItems", params: { limit: 20 }, message: "must NOT have more than 20 items" };
              if (vErrors === null) {
                vErrors = [err52];
              } else {
                vErrors.push(err52);
              }
              errors++;
            }
            const len7 = data27.length;
            for (let i8 = 0; i8 < len7; i8++) {
              if (!validate53(data27[i8], { instancePath: instancePath + "/spatial/scenarios/" + i8, parentData: data27, parentDataProperty: i8, rootData })) {
                vErrors = vErrors === null ? validate53.errors : vErrors.concat(validate53.errors);
                errors = vErrors.length;
              }
            }
          } else {
            const err53 = { instancePath: instancePath + "/spatial/scenarios", schemaPath: "#/properties/spatial/properties/scenarios/type", keyword: "type", params: { type: "array" }, message: "must be array" };
            if (vErrors === null) {
              vErrors = [err53];
            } else {
              vErrors.push(err53);
            }
            errors++;
          }
        }
      } else {
        const err54 = { instancePath: instancePath + "/spatial", schemaPath: "#/properties/spatial/type", keyword: "type", params: { type: "object" }, message: "must be object" };
        if (vErrors === null) {
          vErrors = [err54];
        } else {
          vErrors.push(err54);
        }
        errors++;
      }
    }
  } else {
    const err55 = { instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" };
    if (vErrors === null) {
      vErrors = [err55];
    } else {
      vErrors.push(err55);
    }
    errors++;
  }
  validate10.errors = vErrors;
  return errors === 0;
}
export {
  stdin_default as default,
  validate
};
