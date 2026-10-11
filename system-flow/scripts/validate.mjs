#!/usr/bin/env node

// src/cli/common.ts
import { open, mkdir, rename, link, unlink, access } from "node:fs/promises";
import { dirname, resolve, extname } from "node:path";

// src/model/validator.generated.js
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
var require_equal = __commonJS({
  "node_modules/ajv/dist/runtime/equal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var equal = require_fast_deep_equal();
    equal.code = 'require("ajv/dist/runtime/equal").default';
    exports.default = equal;
  }
});
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

// src/model/graph-index.ts
function isFlowEdge(edge) {
  return edge.kind === "control" || edge.kind === "exception" || edge.kind === "feedback";
}
function buildGraphIndex(document) {
  const nodes = new Map(document.nodes.map((node) => [node.id, node]));
  const edges = new Map(document.edges.map((edge) => [edge.id, edge]));
  const groups = new Map(document.groups.map((group) => [group.id, group]));
  const incoming = new Map(document.nodes.map((node) => [node.id, []]));
  const outgoing = new Map(document.nodes.map((node) => [node.id, []]));
  const groupMembers = new Map(document.groups.map((group) => [group.id, /* @__PURE__ */ new Set()]));
  const nodeAncestors = /* @__PURE__ */ new Map();
  for (const node of document.nodes) {
    const ancestors = [];
    const visited = /* @__PURE__ */ new Set();
    let groupId = node.groupId;
    while (groupId && groups.has(groupId) && !visited.has(groupId)) {
      visited.add(groupId);
      ancestors.push(groupId);
      groupMembers.get(groupId).add(node.id);
      groupId = groups.get(groupId).parentId;
    }
    nodeAncestors.set(node.id, ancestors);
  }
  for (const edge of document.edges) {
    outgoing.get(edge.source)?.push(edge);
    incoming.get(edge.target)?.push(edge);
  }
  return { document, nodes, edges, groups, incoming, outgoing, groupMembers, nodeAncestors };
}
function findRelated(index, selectedId, direction) {
  const nodeIds = /* @__PURE__ */ new Set();
  const edgeIds = /* @__PURE__ */ new Set();
  for (const id of typeof selectedId === "string" ? [selectedId] : selectedId) {
    if (index.nodes.has(id)) nodeIds.add(id);
    for (const member of index.groupMembers.get(id) ?? []) nodeIds.add(member);
  }
  const queue = [...nodeIds];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const id = queue[cursor];
    const candidates = direction === "upstream" ? index.incoming.get(id) : index.outgoing.get(id);
    for (const edge of candidates ?? []) {
      if (!edge.directed || index.document.view.kind === "flow" && !isFlowEdge(edge)) continue;
      const adjacent = direction === "upstream" ? edge.source : edge.target;
      if (!index.nodes.has(adjacent)) continue;
      edgeIds.add(edge.id);
      if (!nodeIds.has(adjacent)) {
        nodeIds.add(adjacent);
        queue.push(adjacent);
      }
    }
  }
  return { nodeIds, edgeIds };
}

// src/model/navigation.ts
function buildNavigation(document) {
  const { navigation: _navigation, ...root } = document;
  const views = /* @__PURE__ */ new Map([[document.id, root]]);
  const entries = /* @__PURE__ */ new Map();
  const children = /* @__PURE__ */ new Map();
  const nodes = /* @__PURE__ */ new Map();
  for (const entry of document.navigation?.views ?? []) {
    views.set(entry.document.id, entry.document);
    entries.set(entry.document.id, entry);
    const siblings = children.get(entry.parentId) ?? [];
    siblings.push(entry);
    children.set(entry.parentId, siblings);
  }
  for (const [id, view] of views) {
    nodes.set(id, new Map([...view.nodes, ...(view.spatial?.interiors ?? []).flatMap((interior) => interior.nodes)].map((node) => [node.id, node])));
  }
  function getAncestors(id) {
    const ancestors = [];
    const seen = /* @__PURE__ */ new Set([id]);
    let entry = entries.get(id);
    while (entry && !seen.has(entry.parentId)) {
      const parent = views.get(entry.parentId);
      if (!parent) break;
      seen.add(parent.id);
      ancestors.unshift(parent);
      entry = entries.get(parent.id);
    }
    return ancestors;
  }
  return {
    rootId: document.id,
    views,
    getView: (id) => views.get(id),
    getNode: (viewId, nodeId) => nodes.get(viewId)?.get(nodeId),
    getEntry: (id) => entries.get(id),
    getAncestors,
    getChildren: (id) => children.get(id) ?? [],
    getChild: (viewId, nodeId) => (children.get(viewId) ?? []).find((entry) => entry.ownerId === nodeId),
    getBridges: (viewId, nodeId) => (document.navigation?.bridges ?? []).filter((bridge) => bridge.source.viewId === viewId && bridge.source.nodeId === nodeId || bridge.target.viewId === viewId && bridge.target.nodeId === nodeId)
  };
}

// src/model/evidence.ts
function collectEvidenceEntries(document) {
  const entries = [];
  const add = (item, path) => {
    entries.push({ id: item.id, path, status: item.evidenceStatus ?? "assumed", sources: item.sources ?? [] });
  };
  const addView = (view, prefix) => {
    view.nodes.forEach((node, i) => add(node, `${prefix}/nodes/${i}`));
    view.edges.forEach((edge, i) => add(edge, `${prefix}/edges/${i}`));
    (view.spatial?.interiors ?? []).forEach((interior, i) => {
      interior.nodes.forEach((node, j) => add(node, `${prefix}/spatial/interiors/${i}/nodes/${j}`));
      interior.edges.forEach((edge, j) => add(edge, `${prefix}/spatial/interiors/${i}/edges/${j}`));
    });
  };
  addView(document, "");
  (document.navigation?.views ?? []).forEach((view, i) => addView(view.document, `/navigation/views/${i}/document`));
  (document.spatial?.scenarios ?? []).forEach((scenario, i) => {
    scenario.steps.forEach((step, j) => add(step, `/spatial/scenarios/${i}/steps/${j}`));
  });
  (document.navigation?.bridges ?? []).forEach((bridge, i) => add(bridge, `/navigation/bridges/${i}`));
  return entries;
}
function collectEvidenceWarnings(document) {
  return collectEvidenceEntries(document).filter((entry) => entry.status === "confirmed" && !entry.sources.some((source) => source.path.trim().length > 0)).map((entry) => ({
    code: "SOURCE_MISSING",
    path: `${entry.path}/sources`,
    ids: [entry.id],
    severity: "warning",
    message: "confirmed \u4FE1\u606F\u9700\u8981\u81F3\u5C11\u4E00\u4E2A\u975E\u7A7A\u6765\u6E90\uFF1B\u6765\u6E90\u4E00\u81F4\u4ECD\u9700\u4EBA\u5DE5\u6838\u5BF9\u63CF\u8FF0\u4E0E\u8C03\u7528\u8BED\u4E49\u3002"
  }));
}

// src/model/validate.ts
var MAX_DOCUMENT_BYTES = 2 * 1024 * 1024;
var compiledValidator = stdin_default;
function pointerSegment(value) {
  return value.replaceAll("~", "~0").replaceAll("/", "~1");
}
function schemaDiagnostic(error) {
  let path = error.instancePath;
  if (error.keyword === "required") path += `/${pointerSegment(String(error.params.missingProperty))}`;
  if (error.keyword === "additionalProperties") path += `/${pointerSegment(String(error.params.additionalProperty))}`;
  return {
    code: `SCHEMA_${error.keyword.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase()}`,
    path,
    ids: [],
    severity: "error",
    message: `${path || "/"}: ${error.message ?? "\u7ED3\u6784\u4E0D\u7B26\u5408 schema"}`
  };
}
function validateBranches(document, add, prefix = "") {
  const index = buildGraphIndex(document);
  document.nodes.forEach((node, i) => {
    const outgoing = index.outgoing.get(node.id) ?? [];
    if (node.kind === "decision") {
      const branches = outgoing.filter(isFlowEdge);
      if (branches.length < 2) add("DECISION_BRANCH_COUNT", `${prefix}/nodes/${i}/kind`, [node.id], "decision \u5728\u6D41\u7A0B\u5B50\u56FE\u4E2D\u81F3\u5C11\u9700\u8981\u4E24\u4E2A\u51FA\u53E3\uFF0Cdata/dependency \u4E0D\u8BA1\u5165\u3002");
      const conditions = /* @__PURE__ */ new Set();
      for (const edge of branches) {
        const label = edge.label?.trim();
        const path = `${prefix}/edges/${document.edges.indexOf(edge)}/label`;
        if (!label) add("DECISION_CONDITION_MISSING", path, [node.id, edge.id], "\u5224\u65AD\u51FA\u53E3\u5FC5\u987B\u6709\u975E\u7A7A\u6761\u4EF6\uFF0C\u4E0D\u80FD\u81EA\u52A8\u63A8\u65AD\u662F\u6216\u5426\u3002");
        else if (conditions.has(label)) add("DECISION_CONDITION_DUPLICATE", path, [node.id, edge.id], "\u540C\u4E00\u5224\u65AD\u8282\u70B9\u7684\u51FA\u53E3\u6761\u4EF6\u5FC5\u987B\u53EF\u533A\u5206\u3002");
        if (label) conditions.add(label);
      }
    }
    if (node.kind === "fork" && outgoing.filter((edge) => edge.kind === "control").length < 2) {
      add("FORK_BRANCH_COUNT", `${prefix}/nodes/${i}/kind`, [node.id], "fork \u81F3\u5C11\u9700\u8981\u4E24\u4E2A control \u51FA\u53E3\u3002");
    }
    if (node.kind === "join" && (index.incoming.get(node.id) ?? []).filter((edge) => edge.kind === "control").length < 2) {
      add("JOIN_BRANCH_COUNT", `${prefix}/nodes/${i}/kind`, [node.id], "join \u81F3\u5C11\u9700\u8981\u4E24\u4E2A control \u5165\u53E3\u3002");
    }
  });
}
function validateDocument(input) {
  const diagnostics = [];
  const add = (code, path, ids, message, severity = "error") => {
    diagnostics.push({ code, path, ids, message, severity });
  };
  try {
    const serialized = JSON.stringify(input);
    if (serialized !== void 0 && new TextEncoder().encode(serialized).byteLength > MAX_DOCUMENT_BYTES) {
      add("DOCUMENT_SIZE_LIMIT", "", [], "\u56FE\u6570\u636E\u8D85\u8FC7 2 MiB\uFF0C\u8BF7\u63D0\u70BC\u4E3A\u603B\u89C8\u4E0E\u5B50\u56FE\uFF0C\u4E0D\u8981\u653E\u5165\u5B8C\u6574\u6E90\u7801\u6216\u65E5\u5FD7\u3002");
      return { valid: false, diagnostics };
    }
  } catch (error) {
    add("DOCUMENT_NOT_JSON", "", [], `\u56FE\u6570\u636E\u65E0\u6CD5\u8868\u793A\u4E3A JSON\uFF1A${error instanceof Error ? error.message : String(error)}`);
    return { valid: false, diagnostics };
  }
  if (!compiledValidator(input)) {
    return { valid: false, diagnostics: (compiledValidator.errors ?? []).map(schemaDiagnostic) };
  }
  const document = input;
  const navigation = buildNavigation(document);
  const viewIds = /* @__PURE__ */ new Set([document.id]);
  const entryIds = /* @__PURE__ */ new Map();
  (document.navigation?.views ?? []).forEach((entry, i) => {
    const prefix = `/navigation/views/${i}`;
    if (viewIds.has(entry.document.id)) add("NAVIGATION_VIEW_DUPLICATE", `${prefix}/document/id`, [entry.document.id], "\u6839\u56FE\u548C\u5B50\u56FE\u7684\u89C6\u56FE ID \u5FC5\u987B\u552F\u4E00\u3002");
    viewIds.add(entry.document.id);
    if (!navigation.getView(entry.parentId)) add("NAVIGATION_PARENT_MISSING", `${prefix}/parentId`, [entry.parentId], "\u7236\u89C6\u56FE\u5FC5\u987B\u5F15\u7528\u6839\u56FE\u6216\u5DF2\u5B9A\u4E49\u7684\u5B50\u56FE\u3002");
    else if (!navigation.getNode(entry.parentId, entry.ownerId)) add("NAVIGATION_OWNER_MISSING", `${prefix}/ownerId`, [entry.parentId, entry.ownerId], "\u5B50\u56FE\u5165\u53E3\u5FC5\u987B\u5F15\u7528\u7236\u89C6\u56FE\u7684\u603B\u89C8\u6216\u5185\u90E8\u8282\u70B9\u3002");
    const parentEntries = entryIds.get(entry.parentId) ?? /* @__PURE__ */ new Set();
    if (parentEntries.has(entry.ownerId)) add("NAVIGATION_ENTRY_DUPLICATE", `${prefix}/ownerId`, [entry.parentId, entry.ownerId], "\u540C\u4E00\u7236\u89C6\u56FE\u8282\u70B9\u53EA\u80FD\u6620\u5C04\u4E00\u4E2A\u5B50\u56FE\u3002");
    parentEntries.add(entry.ownerId);
    entryIds.set(entry.parentId, parentEntries);
    const seen = /* @__PURE__ */ new Set([entry.document.id]);
    let parentId = entry.parentId;
    let jumps = 0;
    while (true) {
      jumps += 1;
      if (seen.has(parentId)) {
        add("NAVIGATION_CYCLE", `${prefix}/parentId`, [...seen, parentId], "\u5B50\u56FE\u7236\u94FE\u4E0D\u80FD\u5F62\u6210\u5FAA\u73AF\u3002");
        break;
      }
      seen.add(parentId);
      if (parentId === document.id) break;
      const parentEntry = navigation.getEntry(parentId);
      if (!parentEntry) {
        add("NAVIGATION_ROOT_UNREACHABLE", `${prefix}/parentId`, [...seen], "\u6BCF\u4E2A\u5B50\u56FE\u7236\u94FE\u5FC5\u987B\u8FDE\u63A5\u5230\u6839\u56FE\u3002");
        break;
      }
      parentId = parentEntry.parentId;
    }
    if (jumps > 4) add("NAVIGATION_DEPTH_LIMIT", `${prefix}/parentId`, [...seen], "\u6700\u591A\u652F\u6301\u56DB\u6B21\u7236\u5B50\u8DF3\u8F6C\uFF1B\u8BF7\u5408\u5E76\u5C42\u7EA7\u3002");
    for (const diagnostic of validateDocument(entry.document).diagnostics) {
      diagnostics.push({ ...diagnostic, path: `${prefix}/document${diagnostic.path}` });
    }
  });
  const bridgeIds = /* @__PURE__ */ new Set();
  (document.navigation?.bridges ?? []).forEach((bridge, i) => {
    const prefix = `/navigation/bridges/${i}`;
    if (bridgeIds.has(bridge.id)) add("NAVIGATION_BRIDGE_DUPLICATE", `${prefix}/id`, [bridge.id], "\u8DE8\u89C6\u56FE\u5173\u8054 ID \u5FC5\u987B\u552F\u4E00\u3002");
    bridgeIds.add(bridge.id);
    for (const end of ["source", "target"]) {
      const endpoint = bridge[end];
      if (!navigation.getView(endpoint.viewId)) add("NAVIGATION_BRIDGE_VIEW_MISSING", `${prefix}/${end}/viewId`, [bridge.id, endpoint.viewId], "\u5173\u8054\u7AEF\u70B9\u5FC5\u987B\u5F15\u7528\u5DF2\u6709\u89C6\u56FE\u3002");
      else if (!navigation.getNode(endpoint.viewId, endpoint.nodeId)) add("NAVIGATION_BRIDGE_NODE_MISSING", `${prefix}/${end}/nodeId`, [bridge.id, endpoint.viewId, endpoint.nodeId], "\u5173\u8054\u7AEF\u70B9\u5FC5\u987B\u5F15\u7528\u8BE5\u89C6\u56FE\u7684\u603B\u89C8\u6216\u5185\u90E8\u8282\u70B9\u3002");
    }
    if (["control", "exception", "feedback"].includes(bridge.kind) && !bridge.directed) add("FLOW_EDGE_UNDIRECTED", `${prefix}/directed`, [bridge.id], "control\u3001exception \u548C feedback \u5173\u8054\u5FC5\u987B\u6709\u660E\u786E\u65B9\u5411\u3002");
  });
  const nodeIds = /* @__PURE__ */ new Set();
  const objectIds = /* @__PURE__ */ new Set();
  const edgeIds = /* @__PURE__ */ new Set();
  document.nodes.forEach((node, i) => {
    if (objectIds.has(node.id)) add("ID_DUPLICATE", `/nodes/${i}/id`, [node.id], "\u8282\u70B9\u548C\u7EC4 ID \u5FC5\u987B\u5728\u540C\u4E00\u547D\u540D\u7A7A\u95F4\u5185\u552F\u4E00\u3002");
    objectIds.add(node.id);
    nodeIds.add(node.id);
  });
  document.groups.forEach((group, i) => {
    if (objectIds.has(group.id)) add("ID_DUPLICATE", `/groups/${i}/id`, [group.id], "\u8282\u70B9\u548C\u7EC4 ID \u5FC5\u987B\u5728\u540C\u4E00\u547D\u540D\u7A7A\u95F4\u5185\u552F\u4E00\u3002");
    objectIds.add(group.id);
  });
  const groups = new Map(document.groups.map((group) => [group.id, group]));
  document.nodes.forEach((node, i) => {
    if (node.groupId && !groups.has(node.groupId)) add("NODE_GROUP_MISSING", `/nodes/${i}/groupId`, [node.id, node.groupId], "\u8282\u70B9\u5F15\u7528\u7684\u5206\u7EC4\u4E0D\u5B58\u5728\u3002");
  });
  document.groups.forEach((group, i) => {
    if (group.parentId && !groups.has(group.parentId)) add("GROUP_PARENT_MISSING", `/groups/${i}/parentId`, [group.id, group.parentId], "\u7236\u5206\u7EC4\u4E0D\u5B58\u5728\u3002");
    const ancestors = /* @__PURE__ */ new Set();
    let current = group;
    while (current) {
      if (ancestors.has(current.id)) {
        add("GROUP_CYCLE", `/groups/${i}/parentId`, [...ancestors], "\u5206\u7EC4\u5F52\u5C5E\u4E0D\u80FD\u5F62\u6210\u5FAA\u73AF\u3002");
        break;
      }
      ancestors.add(current.id);
      current = current.parentId ? groups.get(current.parentId) : void 0;
    }
    if (ancestors.size > 2) add("GROUP_DEPTH_LIMIT", `/groups/${i}/parentId`, [...ancestors], "\u5206\u7EC4\u6700\u591A\u652F\u6301\u4E24\u5C42\uFF1B\u8BF7\u5408\u5E76\u5C42\u7EA7\u6216\u62C6\u4E3A\u5B50\u56FE\u3002");
  });
  document.edges.forEach((edge, i) => {
    if (edgeIds.has(edge.id)) add("EDGE_ID_DUPLICATE", `/edges/${i}/id`, [edge.id], "\u8FB9 ID \u5FC5\u987B\u5728\u6587\u6863\u5185\u552F\u4E00\u3002");
    edgeIds.add(edge.id);
    if (!nodeIds.has(edge.source)) add("EDGE_SOURCE_MISSING", `/edges/${i}/source`, [edge.id, edge.source], "\u8FB9\u7684 source \u5FC5\u987B\u5F15\u7528\u5DF2\u6709\u8282\u70B9\u3002");
    if (!nodeIds.has(edge.target)) add("EDGE_TARGET_MISSING", `/edges/${i}/target`, [edge.id, edge.target], "\u8FB9\u7684 target \u5FC5\u987B\u5F15\u7528\u5DF2\u6709\u8282\u70B9\u3002");
    if (isFlowEdge(edge) && !edge.directed) add("FLOW_EDGE_UNDIRECTED", `/edges/${i}/directed`, [edge.id], "control\u3001exception \u548C feedback \u6D41\u7A0B\u8FB9\u5FC5\u987B\u6709\u660E\u786E\u65B9\u5411\u3002");
  });
  const index = buildGraphIndex(document);
  document.groups.forEach((group, i) => {
    if (!index.groupMembers.get(group.id)?.size) add("GROUP_EMPTY", `/groups/${i}`, [group.id], "\u5206\u7EC4\u5FC5\u987B\u76F4\u63A5\u6216\u901A\u8FC7\u5B50\u7EC4\u5305\u542B\u8282\u70B9\u3002");
  });
  validateBranches(document, add);
  const seenPrimary = /* @__PURE__ */ new Set();
  let previous;
  (document.view.primaryPath ?? []).forEach((id, i) => {
    const path = `/view/primaryPath/${i}`;
    const edge = index.edges.get(id);
    if (!edge) add("PRIMARY_EDGE_MISSING", path, [id], "\u4E3B\u8DEF\u5F84\u5F15\u7528\u7684\u8FB9\u4E0D\u5B58\u5728\u3002");
    if (seenPrimary.has(id)) add("PRIMARY_EDGE_DUPLICATE", path, [id], "\u4E3B\u8DEF\u5F84\u4E0D\u80FD\u91CD\u590D\u5F15\u7528\u540C\u4E00\u6761\u8FB9\u3002");
    seenPrimary.add(id);
    if (edge && !edge.directed) add("PRIMARY_EDGE_UNDIRECTED", path, [id], "\u4E3B\u8DEF\u5F84\u53EA\u80FD\u4F7F\u7528\u6709\u5411\u8FB9\u3002");
    if (previous && edge && previous.target !== edge.source) add("PRIMARY_PATH_DISCONNECTED", path, [previous.id, id], "\u4E3B\u8DEF\u5F84\u76F8\u90BB\u8FB9\u5FC5\u987B\u6309\u7167 source \u2192 target \u8FDE\u7EED\u8FDE\u63A5\u3002");
    previous = edge;
  });
  (document.view.collapsedGroups ?? []).forEach((id, i) => {
    if (!groups.has(id)) add("COLLAPSED_GROUP_MISSING", `/view/collapsedGroups/${i}`, [id], "\u521D\u59CB\u6298\u53E0\u72B6\u6001\u5F15\u7528\u7684\u7EC4\u4E0D\u5B58\u5728\u3002");
  });
  const interiors = document.spatial?.interiors ?? [];
  const globalNodeIds = new Set(nodeIds);
  const owners = /* @__PURE__ */ new Set();
  let totalNodes = document.nodes.length;
  let totalEdges = document.edges.length;
  interiors.forEach((interior, i) => {
    const prefix = `/spatial/interiors/${i}`;
    if (!nodeIds.has(interior.owner)) add("SPATIAL_OWNER_MISSING", `${prefix}/owner`, [interior.owner], "\u5256\u9762 owner \u5FC5\u987B\u5F15\u7528\u603B\u89C8\u8282\u70B9\u3002");
    if (owners.has(interior.owner)) add("SPATIAL_OWNER_DUPLICATE", `${prefix}/owner`, [interior.owner], "\u540C\u4E00\u4E2A\u603B\u89C8\u8282\u70B9\u53EA\u80FD\u5B9A\u4E49\u4E00\u4E2A\u5256\u9762\u3002");
    owners.add(interior.owner);
    totalNodes += interior.nodes.length;
    totalEdges += interior.edges.length;
    const localIds = new Set(interior.nodes.map((node) => node.id));
    interior.nodes.forEach((node, j) => {
      if (objectIds.has(node.id)) add("ID_DUPLICATE", `${prefix}/nodes/${j}/id`, [node.id], "\u603B\u89C8\u3001\u7EC4\u548C\u6240\u6709\u5256\u9762\u7684\u8282\u70B9 ID \u5FC5\u987B\u5728\u540C\u4E00\u547D\u540D\u7A7A\u95F4\u5185\u552F\u4E00\u3002");
      objectIds.add(node.id);
      globalNodeIds.add(node.id);
      if (node.groupId && !groups.has(node.groupId)) add("NODE_GROUP_MISSING", `${prefix}/nodes/${j}/groupId`, [node.id, node.groupId], "\u5185\u90E8\u8282\u70B9\u5F15\u7528\u7684\u5206\u7EC4\u4E0D\u5B58\u5728\u3002");
    });
    interior.edges.forEach((edge, j) => {
      const path = `${prefix}/edges/${j}`;
      if (edgeIds.has(edge.id)) add("EDGE_ID_DUPLICATE", `${path}/id`, [edge.id], "\u603B\u89C8\u548C\u6240\u6709\u5256\u9762\u7684\u8FB9 ID \u5FC5\u987B\u5728\u6587\u6863\u5185\u552F\u4E00\u3002");
      edgeIds.add(edge.id);
      if (!localIds.has(edge.source)) add("EDGE_SOURCE_MISSING", `${path}/source`, [edge.id, edge.source], "\u5185\u90E8\u8FB9\u7684 source \u5FC5\u987B\u5F15\u7528\u540C\u4E00\u5256\u9762\u7684\u8282\u70B9\u3002");
      if (!localIds.has(edge.target)) add("EDGE_TARGET_MISSING", `${path}/target`, [edge.id, edge.target], "\u5185\u90E8\u8FB9\u7684 target \u5FC5\u987B\u5F15\u7528\u540C\u4E00\u5256\u9762\u7684\u8282\u70B9\u3002");
      if (isFlowEdge(edge) && !edge.directed) add("FLOW_EDGE_UNDIRECTED", `${path}/directed`, [edge.id], "control\u3001exception \u548C feedback \u6D41\u7A0B\u8FB9\u5FC5\u987B\u6709\u660E\u786E\u65B9\u5411\u3002");
    });
    validateBranches({ ...document, nodes: interior.nodes, edges: interior.edges, groups: [] }, add, prefix);
  });
  if (totalNodes > 100) add("SPATIAL_NODE_LIMIT", "/spatial/interiors", [], "\u603B\u89C8\u548C\u6240\u6709\u5256\u9762\u5408\u8BA1\u6700\u591A 100 \u4E2A\u8282\u70B9\u3002");
  if (totalEdges > 300) add("SPATIAL_EDGE_LIMIT", "/spatial/interiors", [], "\u603B\u89C8\u548C\u6240\u6709\u5256\u9762\u5408\u8BA1\u6700\u591A 300 \u6761\u8FB9\u3002");
  const modelIds = /* @__PURE__ */ new Set();
  (document.spatial?.models ?? []).forEach((model, i) => {
    const path = `/spatial/models/${i}/nodeId`;
    if (!globalNodeIds.has(model.nodeId)) add("SPATIAL_MODEL_NODE_MISSING", path, [model.nodeId], "\u6A21\u578B\u5FC5\u987B\u5F15\u7528\u5DF2\u6709\u603B\u89C8\u6216\u5185\u90E8\u8282\u70B9\u3002");
    if (modelIds.has(model.nodeId)) add("SPATIAL_MODEL_DUPLICATE", path, [model.nodeId], "\u540C\u4E00\u8282\u70B9\u53EA\u80FD\u5B9A\u4E49\u4E00\u4E2A\u6A21\u578B\u5916\u89C2\u3002");
    modelIds.add(model.nodeId);
  });
  const scenarioIds = /* @__PURE__ */ new Set();
  (document.spatial?.scenarios ?? []).forEach((scenario, i) => {
    const path = `/spatial/scenarios/${i}`;
    if (scenarioIds.has(scenario.id)) add("SPATIAL_SCENARIO_DUPLICATE", `${path}/id`, [scenario.id], "\u6F14\u793A\u573A\u666F ID \u5FC5\u987B\u552F\u4E00\u3002");
    scenarioIds.add(scenario.id);
    const stepIds = /* @__PURE__ */ new Set();
    let durationMs = 0;
    scenario.steps.forEach((step, j) => {
      const stepPath = `${path}/steps/${j}`;
      const stepViewId = step.viewId ?? document.id;
      const stepView = navigation.getView(stepViewId);
      if (!stepView) add("SPATIAL_STEP_VIEW_MISSING", `${stepPath}/viewId`, [scenario.id, step.id, stepViewId], "\u6F14\u793A\u6B65\u9AA4\u5FC5\u987B\u5F15\u7528\u5DF2\u6709\u89C6\u56FE\u3002");
      if (stepIds.has(step.id)) add("SPATIAL_STEP_DUPLICATE", `${stepPath}/id`, [scenario.id, step.id], "\u540C\u4E00\u573A\u666F\u7684\u6B65\u9AA4 ID \u5FC5\u987B\u552F\u4E00\u3002");
      stepIds.add(step.id);
      step.route.forEach((id, k) => {
        if (stepView && !navigation.getNode(stepViewId, id)) add("SPATIAL_ROUTE_NODE_MISSING", `${stepPath}/route/${k}`, [scenario.id, step.id, id], "\u6F14\u793A\u8DEF\u5F84\u5FC5\u987B\u5F15\u7528\u6B65\u9AA4\u89C6\u56FE\u5185\u7684\u603B\u89C8\u6216\u5185\u90E8\u8282\u70B9\u3002");
      });
      if (stepView && !navigation.getNode(stepViewId, step.focusId)) add("SPATIAL_FOCUS_NODE_MISSING", `${stepPath}/focusId`, [scenario.id, step.id, step.focusId], "\u6F14\u793A\u7126\u70B9\u5FC5\u987B\u5F15\u7528\u6B65\u9AA4\u89C6\u56FE\u5185\u7684\u603B\u89C8\u6216\u5185\u90E8\u8282\u70B9\u3002");
      durationMs += step.durationMs ?? 2200;
    });
    if (!Number.isSafeInteger(durationMs)) add("SPATIAL_DURATION_LIMIT", `${path}/steps`, [scenario.id], "\u573A\u666F\u603B\u65F6\u957F\u4E0D\u80FD\u8D85\u8FC7\u5B89\u5168\u6574\u6570\u8303\u56F4\u3002");
  });
  if (!diagnostics.some((item) => item.severity === "error")) {
    const visited = /* @__PURE__ */ new Set();
    const components = [];
    for (const node of document.nodes) {
      if (visited.has(node.id)) continue;
      const queue = [node.id];
      visited.add(node.id);
      for (let cursor = 0; cursor < queue.length; cursor += 1) {
        const id = queue[cursor];
        for (const edge of [...index.incoming.get(id), ...index.outgoing.get(id)]) {
          const adjacent = edge.source === id ? edge.target : edge.source;
          if (!visited.has(adjacent)) {
            visited.add(adjacent);
            queue.push(adjacent);
          }
        }
      }
      components.push(queue);
    }
    if (components.length > 1) add("GRAPH_DISCONNECTED", "/nodes", components.slice(1).flat(), `\u56FE\u4E2D\u5305\u542B ${components.length} \u4E2A\u4E92\u4E0D\u8FDE\u901A\u7684\u5B50\u56FE\uFF1B\u8BF7\u786E\u8BA4\u8FD9\u662F\u9884\u671F\u8868\u8FBE\u3002`, "warning");
    const starts = document.nodes.filter((node) => node.kind === "start").map((node) => node.id);
    if (document.view.kind === "flow" && starts.length > 0) {
      const reached = findRelated(index, starts, "downstream").nodeIds;
      const flowNodeIds = new Set(document.edges.filter(isFlowEdge).flatMap((edge) => [edge.source, edge.target]));
      const unreachable = document.nodes.filter((node) => flowNodeIds.has(node.id) && !reached.has(node.id)).map((node) => node.id);
      if (unreachable.length > 0) add("GRAPH_UNREACHABLE", "/nodes", unreachable, "\u8FD9\u4E9B\u6D41\u7A0B\u8282\u70B9\u65E0\u6CD5\u4ECE\u4EFB\u4F55 start \u8282\u70B9\u6CBF\u6D41\u7A0B\u65B9\u5411\u5230\u8FBE\uFF0C\u8BF7\u786E\u8BA4\u5165\u53E3\u548C\u8FB9\u65B9\u5411\u3002", "warning");
    }
  }
  const existing = new Set(diagnostics.map((item) => `${item.code}\0${item.path}`));
  for (const warning of collectEvidenceWarnings(document)) {
    if (!existing.has(`${warning.code}\0${warning.path}`)) diagnostics.push(warning);
  }
  const valid = !diagnostics.some((diagnostic) => diagnostic.severity === "error");
  return { valid, ...valid ? { document } : {}, diagnostics };
}

// src/cli/common.ts
var InputError = class extends Error {
};
function parseArguments(argv, valueOptions, flagOptions = []) {
  const result = { values: /* @__PURE__ */ new Map(), flags: /* @__PURE__ */ new Set() };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      if (result.values.has(arg) || result.flags.has(arg)) throw new InputError(`\u91CD\u590D\u53C2\u6570\uFF1A${arg}`);
      if (flagOptions.includes(arg) || arg === "--help") result.flags.add(arg);
      else if (valueOptions.includes(arg)) {
        const value = argv[++i];
        if (value === void 0 || value.startsWith("--")) throw new InputError(`\u53C2\u6570 ${arg} \u7F3A\u5C11\u503C\u3002`);
        result.values.set(arg, value);
      } else throw new InputError(`\u672A\u77E5\u53C2\u6570\uFF1A${arg}`);
    } else if (!result.input) result.input = arg;
    else throw new InputError(`\u591A\u4F59\u7684\u8F93\u5165\u8DEF\u5F84\uFF1A${arg}`);
  }
  return result;
}
async function readInput(path, limit) {
  let file;
  try {
    file = await open(resolve(path), "r");
    const info = await file.stat();
    if (!info.isFile()) throw new InputError(`\u8F93\u5165\u4E0D\u662F\u666E\u901A\u6587\u4EF6\uFF1A${path}`);
    if (limit !== void 0 && info.size > limit) throw new InputError("DOCUMENT_SIZE_LIMIT: \u56FE\u6570\u636E\u8D85\u8FC7 2 MiB\uFF0C\u8BF7\u62C6\u4E3A\u603B\u89C8\u4E0E\u5B50\u56FE\u3002");
    const bytes = await file.readFile();
    if (limit !== void 0 && bytes.byteLength > limit) throw new InputError("DOCUMENT_SIZE_LIMIT: \u56FE\u6570\u636E\u8D85\u8FC7 2 MiB\uFF0C\u8BF7\u62C6\u4E3A\u603B\u89C8\u4E0E\u5B50\u56FE\u3002");
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes).replace(/^\uFEFF/, "");
  } catch (error) {
    if (error instanceof InputError) throw error;
    throw new InputError(`\u65E0\u6CD5\u8BFB\u53D6 UTF-8 \u8F93\u5165 ${path}\uFF1A${error instanceof Error ? error.message : String(error)}`);
  } finally {
    await file?.close();
  }
}
async function readDocument(path) {
  const source = await readInput(path, MAX_DOCUMENT_BYTES);
  let data;
  try {
    data = JSON.parse(source);
  } catch (error) {
    throw new InputError(`JSON_PARSE_ERROR: ${error instanceof Error ? error.message : String(error)}`);
  }
  const result = validateDocument(data);
  if (!result.valid || !result.document) throw new InputError(JSON.stringify(result.diagnostics, null, 2));
  return { document: result.document, diagnostics: result.diagnostics };
}
function runCli(main) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = error instanceof InputError ? 2 : 1;
  });
}

// src/cli/evidence.ts
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { constants } from "node:fs";
import { open as open2, realpath, stat } from "node:fs/promises";
import { isAbsolute, relative, resolve as resolve2, sep, win32 } from "node:path";
import { promisify } from "node:util";
var execute = promisify(execFile);
var MAX_SOURCE_BYTES = 8 * 1024 * 1024;
var MAX_TOTAL_SOURCE_BYTES = 64 * 1024 * 1024;
function mergeEvidenceDiagnostics(...groups) {
  const merged = /* @__PURE__ */ new Map();
  for (const item of groups.flat()) {
    const key = `${item.code}\0${item.path}`;
    const previous = merged.get(key);
    if (!previous || previous.severity === "warning" && item.severity === "error") merged.set(key, item);
  }
  return [...merged.values()];
}
function within(root, target) {
  const difference = relative(root, target);
  return difference === "" || !isAbsolute(difference) && difference !== ".." && !difference.startsWith(`..${sep}`);
}
function safeRelativePath(path) {
  const normalized = path.replaceAll("\\", "/");
  if (!normalized.trim() || normalized.includes("\0") || normalized.includes(":") || isAbsolute(normalized) || win32.isAbsolute(path) || normalized.split("/").includes("..")) return void 0;
  return normalized;
}
function errorMessage(error) {
  const failure = error;
  return `${failure.code !== void 0 ? `${failure.code}: ` : ""}${(failure.stderr?.trim() || failure.message || String(error)).slice(0, 700)}`;
}
async function auditSources(document, options) {
  const diagnostics = collectEvidenceWarnings(document).map((item) => ({ ...item, severity: options.strict ? "error" : "warning" }));
  const repository = { root: resolve2(options.repoRoot) };
  const checked = [];
  const add = (code, path, ids, message) => {
    diagnostics.push({ code, path, ids, message, severity: options.strict ? "error" : "warning" });
  };
  const result = () => ({ valid: !diagnostics.some((item) => item.severity === "error"), diagnostics, repository, checked });
  let root;
  try {
    root = await realpath(repository.root);
    if (!(await stat(root)).isDirectory()) {
      add("SOURCE_REPO_ROOT_INVALID", "", [], `repo-root \u4E0D\u662F\u76EE\u5F55\uFF1A${repository.root}`);
      return result();
    }
    repository.root = root;
  } catch (error) {
    add("SOURCE_REPO_ROOT_INVALID", "", [], `\u65E0\u6CD5\u8BFB\u53D6 repo-root\uFF1A${errorMessage(error)}`);
    return result();
  }
  const entries = collectEvidenceEntries(document);
  const revisions = [
    { revision: document.sourceRevision, path: "/sourceRevision", id: document.id },
    ...(document.navigation?.views ?? []).map((view, i) => ({ revision: view.document.sourceRevision, path: `/navigation/views/${i}/document/sourceRevision`, id: view.document.id }))
  ].filter((item) => item.revision !== void 0);
  const needsGit = entries.some((entry) => entry.sources.length > 0) || revisions.length > 0;
  if (needsGit) {
    const git = async (...args) => (await execute("git", ["--no-optional-locks", "-C", root, "-c", "core.fsmonitor=false", ...args], {
      windowsHide: true,
      timeout: 1e4,
      maxBuffer: 1024 * 1024,
      env: { ...process.env, GIT_OPTIONAL_LOCKS: "0" }
    })).stdout;
    try {
      const gitRoot = await realpath((await git("rev-parse", "--show-toplevel")).trim());
      if (relative(root, gitRoot) !== "") add("SOURCE_GIT_ROOT_MISMATCH", "", [], "repo-root \u5FC5\u987B\u6307\u5411 Git \u4ED3\u5E93\u6839\u76EE\u5F55\uFF0C\u4E0D\u80FD\u501F\u7528\u7236\u76EE\u5F55\u7684\u4FEE\u8BA2\u3002");
      else {
        repository.commit = (await git("rev-parse", "--verify", "HEAD")).trim();
        repository.dirty = (await git("status", "--porcelain=v1", "-z", "--untracked-files=normal")).length > 0;
      }
    } catch (error) {
      if (revisions.length > 0 || repository.commit !== void 0) {
        add("SOURCE_GIT_UNAVAILABLE", "", [], `\u65E0\u6CD5\u6838\u5BF9 Git HEAD/dirty \u72B6\u6001\uFF1A${errorMessage(error)}`);
      }
    }
  }
  for (const { revision, path, id } of revisions) {
    if (repository.commit && revision.commit.toLowerCase() !== repository.commit.toLowerCase()) {
      add("SOURCE_REVISION_MISMATCH", `${path}/commit`, [id], `\u6765\u6E90 commit \u4E0E\u5F53\u524D HEAD \u4E0D\u4E00\u81F4\uFF1A\u8BB0\u5F55 ${revision.commit}\uFF0C\u5F53\u524D ${repository.commit}\u3002`);
    }
    if (revision.dirty !== void 0 && repository.dirty !== void 0 && revision.dirty !== repository.dirty) {
      add("SOURCE_DIRTY_MISMATCH", `${path}/dirty`, [id], `\u6765\u6E90 dirty \u4E0E\u5F53\u524D\u5DE5\u4F5C\u526F\u672C\u4E0D\u4E00\u81F4\uFF1A\u8BB0\u5F55 ${revision.dirty}\uFF0C\u5F53\u524D ${repository.dirty}\u3002`);
    }
  }
  let totalBytes = 0;
  const cache = /* @__PURE__ */ new Map();
  const inspect = async (filePath) => {
    const cached = cache.get(filePath);
    if (cached) return cached;
    let inspection;
    try {
      const initial = await stat(filePath);
      if (!initial.isFile()) inspection = { code: "SOURCE_NOT_FILE", message: "\u6765\u6E90\u4E0D\u662F\u666E\u901A\u6587\u4EF6\u3002" };
      else if (initial.size > MAX_SOURCE_BYTES) inspection = { code: "SOURCE_FILE_SIZE_LIMIT", message: "\u5355\u4E2A\u6765\u6E90\u6587\u4EF6\u8D85\u8FC7 8 MiB\uFF0C\u4E0D\u8BFB\u53D6\u5176\u5185\u5BB9\uFF1B\u8BF7\u5F15\u7528\u66F4\u5C0F\u7684\u6587\u4EF6\u3002" };
      else if (totalBytes + initial.size > MAX_TOTAL_SOURCE_BYTES) inspection = { code: "SOURCE_TOTAL_SIZE_LIMIT", message: "\u6765\u6E90\u6587\u4EF6\u7D2F\u8BA1\u8BFB\u53D6\u8D85\u8FC7 64 MiB\uFF1B\u8BF7\u7F29\u5C0F\u53D6\u8BC1\u8303\u56F4\u3002" };
      else {
        const file = await open2(filePath, constants.O_RDONLY | (constants.O_NONBLOCK ?? 0) | (constants.O_NOFOLLOW ?? 0));
        try {
          const info = await file.stat();
          if (!info.isFile()) inspection = { code: "SOURCE_NOT_FILE", message: "\u6253\u5F00\u7684\u6765\u6E90\u4E0D\u662F\u666E\u901A\u6587\u4EF6\u3002" };
          else if (info.dev !== initial.dev || info.ino !== initial.ino) inspection = { code: "SOURCE_FILE_CHANGED", message: "\u6765\u6E90\u5728\u6838\u5BF9\u8DEF\u5F84\u540E\u53D1\u751F\u66FF\u6362\uFF0C\u8BF7\u91CD\u65B0\u6838\u9A8C\u3002" };
          else {
            const chunks = [];
            let bytes = 0;
            let limit;
            for (; ; ) {
              const available = Math.min(64 * 1024, MAX_SOURCE_BYTES - bytes + 1, MAX_TOTAL_SOURCE_BYTES - totalBytes + 1);
              const chunk = Buffer.alloc(available);
              const read = await file.read(chunk, 0, available, null);
              if (read.bytesRead === 0) break;
              bytes += read.bytesRead;
              totalBytes += read.bytesRead;
              if (bytes > MAX_SOURCE_BYTES) {
                limit = { code: "SOURCE_FILE_SIZE_LIMIT", message: "\u6765\u6E90\u8BFB\u53D6\u671F\u95F4\u8D85\u8FC7 8 MiB\uFF0C\u505C\u6B62\u6838\u9A8C\u3002" };
                break;
              }
              if (totalBytes > MAX_TOTAL_SOURCE_BYTES) {
                limit = { code: "SOURCE_TOTAL_SIZE_LIMIT", message: "\u6765\u6E90\u6587\u4EF6\u7D2F\u8BA1\u8BFB\u53D6\u8D85\u8FC7 64 MiB\uFF0C\u505C\u6B62\u6838\u9A8C\u3002" };
                break;
              }
              chunks.push(chunk.subarray(0, read.bytesRead));
            }
            if (limit) inspection = limit;
            else {
              const content = Buffer.concat(chunks);
              const sha256 = createHash("sha256").update(content).digest("hex");
              try {
                const text = new TextDecoder("utf-8", { fatal: true }).decode(content);
                const lines = text.length === 0 ? 0 : text.split(/\r\n|\r|\n/).length - (/\r$|\n$/.test(text) ? 1 : 0);
                inspection = { sha256, lines };
              } catch (error) {
                inspection = { sha256, textError: errorMessage(error) };
              }
            }
          }
        } finally {
          await file.close();
        }
      }
    } catch (error) {
      inspection = { code: "SOURCE_READ_FAILED", message: `\u65E0\u6CD5\u8BFB\u53D6\u6765\u6E90\uFF1A${errorMessage(error)}` };
    }
    cache.set(filePath, inspection);
    return inspection;
  };
  for (const entry of entries) {
    for (const [i, source] of entry.sources.entries()) {
      const path = `${entry.path}/sources/${i}`;
      const check = { path: source.path, ...source.line !== void 0 ? { line: source.line } : {}, diagnosticPath: path, matched: false };
      checked.push(check);
      const normalized = safeRelativePath(source.path);
      if (normalized === void 0) {
        add("SOURCE_PATH_UNSAFE", `${path}/path`, [entry.id], "\u6765\u6E90\u5FC5\u987B\u4F7F\u7528\u4ED3\u5E93\u5185\u5B89\u5168\u76F8\u5BF9\u8DEF\u5F84\uFF0C\u4E0D\u80FD\u5305\u542B\u76EE\u5F55\u8D8A\u754C\u3001\u7EDD\u5BF9\u8DEF\u5F84\u6216\u76D8\u7B26/\u6570\u636E\u6D41\u3002");
        continue;
      }
      const candidate = resolve2(root, normalized);
      if (!within(root, candidate)) {
        add("SOURCE_PATH_OUTSIDE", `${path}/path`, [entry.id], "\u6765\u6E90\u8DEF\u5F84\u8D8A\u8FC7 repo-root \u8FB9\u754C\u3002");
        continue;
      }
      let filePath;
      try {
        filePath = await realpath(candidate);
      } catch (error) {
        const code = error.code;
        add(code === "ENOENT" || code === "ENOTDIR" ? "SOURCE_FILE_MISSING" : "SOURCE_READ_FAILED", `${path}/path`, [entry.id], `\u65E0\u6CD5\u89E3\u6790\u6765\u6E90\u8DEF\u5F84\uFF1A${errorMessage(error)}`);
        continue;
      }
      if (!within(root, filePath)) {
        add("SOURCE_PATH_OUTSIDE", `${path}/path`, [entry.id], "\u6765\u6E90\u7B26\u53F7\u94FE\u63A5\u6216 junction \u7684\u5B9E\u9645\u76EE\u6807\u8D8A\u8FC7 repo-root \u8FB9\u754C\u3002");
        continue;
      }
      const inspected = await inspect(filePath);
      if ("code" in inspected) {
        add(inspected.code, `${path}/path`, [entry.id], inspected.message);
        continue;
      }
      check.sha256 = inspected.sha256;
      check.matched = true;
      if (source.line !== void 0) {
        if (inspected.textError) {
          add("SOURCE_TEXT_ENCODING", `${path}/line`, [entry.id], `\u5E26\u884C\u53F7\u6765\u6E90\u4E0D\u662F\u6709\u6548 UTF-8 \u6587\u672C\uFF1A${inspected.textError}`);
          check.matched = false;
        } else if (!Number.isSafeInteger(source.line) || source.line < 1 || source.line > inspected.lines) {
          add("SOURCE_LINE_INVALID", `${path}/line`, [entry.id], `\u6765\u6E90\u884C\u53F7 ${source.line} \u4E0D\u5728\u6587\u4EF6\u7684 1..${inspected.lines} \u6709\u6548\u8303\u56F4\u5185\u3002`);
          check.matched = false;
        }
      }
      if (source.sha256 !== void 0) {
        check.sha256Matches = source.sha256.toLowerCase() === inspected.sha256;
        if (!check.sha256Matches) {
          add("SOURCE_HASH_MISMATCH", `${path}/sha256`, [entry.id], `\u6765\u6E90 SHA-256 \u4E0D\u4E00\u81F4\uFF1A\u8BB0\u5F55 ${source.sha256}\uFF0C\u5B9E\u9645 ${inspected.sha256}\u3002`);
          check.matched = false;
        }
      } else if (entry.status === "confirmed" && repository.dirty === true) {
        add("SOURCE_HASH_UNPINNED", `${path}/sha256`, [entry.id], "Git \u5DE5\u4F5C\u526F\u672C\u6709\u672A\u63D0\u4EA4\u53D8\u5316\uFF0Cconfirmed \u6765\u6E90\u9700\u8981 sha256 \u56FA\u5B9A\u5F53\u524D\u5185\u5BB9\uFF1BHEAD \u65E0\u6CD5\u56FA\u5B9A\u672A\u63D0\u4EA4\u5185\u5BB9\u3002");
      }
    }
  }
  return result();
}

// src/cli/validate.ts
runCli(async () => {
  const args = parseArguments(process.argv.slice(2), ["--repo-root"], ["--strict-sources"]);
  const help = "\u7528\u6CD5\uFF1Anode validate.mjs input.diagram.json [--repo-root path] [--strict-sources]\n\u6821\u9A8C\u7ED3\u6784\u3001\u5F15\u7528\u548C\u5BFC\u822A\uFF1B\u6765\u6E90\u6838\u9A8C\u53EA\u8BFB\u68C0\u67E5\u6574\u4E2A\u6587\u6863\u7684\u6587\u4EF6\u3001\u884C\u53F7\u3001\u6458\u8981\u548C Git \u4FEE\u8BA2\uFF0C\u4E0D\u8BC1\u660E\u63CF\u8FF0\u8BED\u4E49\u3002";
  if (args.flags.has("--help")) {
    console.log(help);
    return;
  }
  if (!args.input) throw new InputError(help);
  const repoRoot = args.values.get("--repo-root");
  if (repoRoot !== void 0 && !repoRoot.trim()) throw new InputError("--repo-root \u4E0D\u80FD\u4E3A\u7A7A\u3002");
  const strict = args.flags.has("--strict-sources");
  if (strict && !repoRoot) throw new InputError("--strict-sources \u5FC5\u987B\u540C\u65F6\u6307\u5B9A --repo-root\u3002");
  const { document, diagnostics: structuralDiagnostics } = await readDocument(args.input);
  const sourceAudit = repoRoot ? await auditSources(document, { repoRoot, strict }) : void 0;
  const diagnostics = mergeEvidenceDiagnostics(structuralDiagnostics, collectEvidenceWarnings(document), sourceAudit?.diagnostics ?? []);
  const sourceFailures = diagnostics.filter((item) => item.code.startsWith("SOURCE_")).length;
  const valid = !diagnostics.some((item) => item.severity === "error");
  console.log(JSON.stringify({
    valid,
    id: document.id,
    diagnostics,
    checks: {
      structure: { performed: true, passed: true },
      sources: { performed: sourceAudit !== void 0, ...sourceAudit ? { passed: sourceFailures === 0, scope: "whole-document" } : {} }
    },
    failures: { sources: sourceFailures },
    ...sourceAudit ? { sourceAudit } : {}
  }, null, 2));
  if (!valid) process.exitCode = 2;
});
