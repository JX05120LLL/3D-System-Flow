"use strict";(()=>{function ns(i){return i.kind==="control"||i.kind==="exception"||i.kind==="feedback"}function oi(i){let e=new Map(i.nodes.map(l=>[l.id,l])),t=new Map(i.edges.map(l=>[l.id,l])),n=new Map(i.groups.map(l=>[l.id,l])),r=new Map(i.nodes.map(l=>[l.id,[]])),s=new Map(i.nodes.map(l=>[l.id,[]])),a=new Map(i.groups.map(l=>[l.id,new Set])),o=new Map;for(let l of i.nodes){let c=[],h=new Set,d=l.groupId;for(;d&&n.has(d)&&!h.has(d);)h.add(d),c.push(d),a.get(d).add(l.id),d=n.get(d).parentId;o.set(l.id,c)}for(let l of i.edges)s.get(l.source)?.push(l),r.get(l.target)?.push(l);return{document:i,nodes:e,edges:t,groups:n,incoming:r,outgoing:s,groupMembers:a,nodeAncestors:o}}function lo(i,e,t){let n=new Set,r=new Set;for(let a of typeof e=="string"?[e]:e){i.nodes.has(a)&&n.add(a);for(let o of i.groupMembers.get(a)??[])n.add(o)}let s=[...n];for(let a=0;a<s.length;a+=1){let o=s[a],l=t==="upstream"?i.incoming.get(o):i.outgoing.get(o);for(let c of l??[]){if(!c.directed||i.document.view.kind==="flow"&&!ns(c))continue;let h=t==="upstream"?c.source:c.target;i.nodes.has(h)&&(r.add(c.id),n.has(h)||(n.add(h),s.push(h)))}}return{nodeIds:n,edgeIds:r}}var Gd=Object.getOwnPropertyNames,kl=(i,e)=>function(){return e||(0,i[Gd(i)[0]])((e={exports:{}}).exports,e),e.exports},Wd=kl({"node_modules/ajv/dist/runtime/ucs2length.js"(i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});function e(t){let n=t.length,r=0,s=0,a;for(;s<n;)r++,a=t.charCodeAt(s++),a>=55296&&a<=56319&&s<n&&(a=t.charCodeAt(s),(a&64512)===56320&&s++);return r}i.default=e,e.code='require("ajv/dist/runtime/ucs2length").default'}}),Xd=kl({"node_modules/fast-deep-equal/index.js"(i,e){"use strict";e.exports=function t(n,r){if(n===r)return!0;if(n&&r&&typeof n=="object"&&typeof r=="object"){if(n.constructor!==r.constructor)return!1;var s,a,o;if(Array.isArray(n)){if(s=n.length,s!=r.length)return!1;for(a=s;a--!==0;)if(!t(n[a],r[a]))return!1;return!0}if(n.constructor===RegExp)return n.source===r.source&&n.flags===r.flags;if(n.valueOf!==Object.prototype.valueOf)return n.valueOf()===r.valueOf();if(n.toString!==Object.prototype.toString)return n.toString()===r.toString();if(o=Object.keys(n),s=o.length,s!==Object.keys(r).length)return!1;for(a=s;a--!==0;)if(!Object.prototype.hasOwnProperty.call(r,o[a]))return!1;for(a=s;a--!==0;){var l=o[a];if(!t(n[l],r[l]))return!1}return!0}return n!==n&&r!==r}}}),qd=kl({"node_modules/ajv/dist/runtime/equal.js"(i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=Xd();e.code='require("ajv/dist/runtime/equal").default',i.default=e}});var Sh=Eh,co={$schema:"http://json-schema.org/draft-07/schema#",$id:"https://system-blueprint.local/schema/2.0/diagram.json",title:"DiagramDocument",type:"object",additionalProperties:!1,required:["schemaVersion","id","title","view","nodes","edges","groups"],properties:{schemaVersion:{const:"2.0",type:"string"},id:{$ref:"#/definitions/nonEmptyText"},title:{$ref:"#/definitions/nonEmptyText"},description:{type:"string"},view:{type:"object",additionalProperties:!1,required:["kind","direction","theme"],properties:{kind:{enum:["overview","flow","deployment"]},direction:{enum:["RIGHT","DOWN"]},theme:{enum:["light","dark"]},collapsedGroups:{type:"array",uniqueItems:!0,items:{$ref:"#/definitions/nonEmptyText"}},primaryPath:{type:"array",items:{$ref:"#/definitions/nonEmptyText"}}}},nodes:{type:"array",minItems:1,maxItems:100,items:{$ref:"#/definitions/node"}},edges:{type:"array",maxItems:300,items:{$ref:"#/definitions/edge"}},groups:{type:"array",maxItems:20,items:{$ref:"#/definitions/group"}},spatial:{type:"object",additionalProperties:!1,properties:{interiors:{type:"array",maxItems:100,items:{$ref:"#/definitions/interior"}},models:{type:"array",maxItems:100,items:{$ref:"#/definitions/spatialModel"}},scenarios:{type:"array",maxItems:20,items:{$ref:"#/definitions/scenario"}}}}},definitions:{nonEmptyText:{type:"string",minLength:1,pattern:"\\S"},details:{type:"string",maxLength:8e3},evidenceStatus:{enum:["confirmed","assumed","planned"]},source:{type:"object",additionalProperties:!1,required:["path"],properties:{path:{$ref:"#/definitions/nonEmptyText"},line:{type:"integer",minimum:1}}},sources:{type:"array",items:{$ref:"#/definitions/source"}},node:{type:"object",additionalProperties:!1,required:["id","kind","label"],properties:{id:{$ref:"#/definitions/nonEmptyText"},kind:{enum:["start","end","process","decision","store","external","fork","join"]},label:{$ref:"#/definitions/nonEmptyText"},summary:{type:"string"},details:{$ref:"#/definitions/details"},groupId:{$ref:"#/definitions/nonEmptyText"},evidenceStatus:{$ref:"#/definitions/evidenceStatus"},sources:{$ref:"#/definitions/sources"}}},edge:{type:"object",additionalProperties:!1,required:["id","source","target","kind","directed"],properties:{id:{$ref:"#/definitions/nonEmptyText"},source:{$ref:"#/definitions/nonEmptyText"},target:{$ref:"#/definitions/nonEmptyText"},kind:{enum:["control","data","dependency","exception","feedback"]},directed:{type:"boolean"},label:{type:"string"},details:{$ref:"#/definitions/details"},evidenceStatus:{$ref:"#/definitions/evidenceStatus"},sources:{$ref:"#/definitions/sources"}}},interior:{type:"object",additionalProperties:!1,required:["owner","nodes","edges"],properties:{owner:{$ref:"#/definitions/nonEmptyText"},nodes:{type:"array",minItems:1,maxItems:100,items:{$ref:"#/definitions/node"}},edges:{type:"array",maxItems:300,items:{$ref:"#/definitions/edge"}}}},spatialModel:{type:"object",additionalProperties:!1,required:["nodeId","shape"],properties:{nodeId:{$ref:"#/definitions/nonEmptyText"},shape:{enum:["service","shell","gateway","client","database","event","external","auth","decision","rack","adjust","link","channel","ledger","result"]},color:{type:"string",pattern:"^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"},shortLabel:{$ref:"#/definitions/nonEmptyText"}}},scenario:{type:"object",additionalProperties:!1,required:["id","label","steps"],properties:{id:{$ref:"#/definitions/nonEmptyText"},label:{$ref:"#/definitions/nonEmptyText"},steps:{type:"array",minItems:1,maxItems:200,items:{$ref:"#/definitions/demoStep"}}}},demoStep:{type:"object",additionalProperties:!1,required:["id","title","description","route","focusId","tone"],properties:{id:{$ref:"#/definitions/nonEmptyText"},title:{$ref:"#/definitions/nonEmptyText"},description:{type:"string"},route:{type:"array",minItems:1,maxItems:300,items:{$ref:"#/definitions/nonEmptyText"}},focusId:{$ref:"#/definitions/nonEmptyText"},tone:{enum:["request","data","success","failure"]},durationMs:{type:"integer",minimum:1,maximum:9007199254740991}}},group:{type:"object",additionalProperties:!1,required:["id","label"],properties:{id:{$ref:"#/definitions/nonEmptyText"},label:{$ref:"#/definitions/nonEmptyText"},parentId:{$ref:"#/definitions/nonEmptyText"},details:{$ref:"#/definitions/details"}}}}},Mh=Object.prototype.hasOwnProperty,xt=Wd().default,Yd=qd().default,wt=new RegExp("\\S","u"),$d={type:"object",additionalProperties:!1,required:["id","kind","label"],properties:{id:{$ref:"#/definitions/nonEmptyText"},kind:{enum:["start","end","process","decision","store","external","fork","join"]},label:{$ref:"#/definitions/nonEmptyText"},summary:{type:"string"},details:{$ref:"#/definitions/details"},groupId:{$ref:"#/definitions/nonEmptyText"},evidenceStatus:{$ref:"#/definitions/evidenceStatus"},sources:{$ref:"#/definitions/sources"}}},bh={enum:["confirmed","assumed","planned"]};function ho(i,{instancePath:e="",parentData:t,parentDataProperty:n,rootData:r=i}={}){let s=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.path===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"path"},message:"must have required property 'path'"};s===null?s=[o]:s.push(o),a++}for(let o in i)if(!(o==="path"||o==="line")){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};s===null?s=[l]:s.push(l),a++}if(i.path!==void 0){let o=i.path;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/path",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/path",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/path",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.line!==void 0){let o=i.line;if(!(typeof o=="number"&&!(o%1)&&!isNaN(o)&&isFinite(o))){let l={instancePath:e+"/line",schemaPath:"#/properties/line/type",keyword:"type",params:{type:"integer"},message:"must be integer"};s===null?s=[l]:s.push(l),a++}if(typeof o=="number"&&isFinite(o)&&(o<1||isNaN(o))){let l={instancePath:e+"/line",schemaPath:"#/properties/line/minimum",keyword:"minimum",params:{comparison:">=",limit:1},message:"must be >= 1"};s===null?s=[l]:s.push(l),a++}}}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};s===null?s=[o]:s.push(o),a++}return ho.errors=s,a===0}function Pi(i,{instancePath:e="",parentData:t,parentDataProperty:n,rootData:r=i}={}){let s=null,a=0;if(Array.isArray(i)){let o=i.length;for(let l=0;l<o;l++)ho(i[l],{instancePath:e+"/"+l,parentData:i,parentDataProperty:l,rootData:r})||(s=s===null?ho.errors:s.concat(ho.errors),a=s.length)}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"array"},message:"must be array"};s===null?s=[o]:s.push(o),a++}return Pi.errors=s,a===0}function Ii(i,{instancePath:e="",parentData:t,parentDataProperty:n,rootData:r=i}={}){let s=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.id===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"id"},message:"must have required property 'id'"};s===null?s=[o]:s.push(o),a++}if(i.kind===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"kind"},message:"must have required property 'kind'"};s===null?s=[o]:s.push(o),a++}if(i.label===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"label"},message:"must have required property 'label'"};s===null?s=[o]:s.push(o),a++}for(let o in i)if(!(o==="id"||o==="kind"||o==="label"||o==="summary"||o==="details"||o==="groupId"||o==="evidenceStatus"||o==="sources")){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};s===null?s=[l]:s.push(l),a++}if(i.id!==void 0){let o=i.id;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.kind!==void 0){let o=i.kind;if(!(o==="start"||o==="end"||o==="process"||o==="decision"||o==="store"||o==="external"||o==="fork"||o==="join")){let l={instancePath:e+"/kind",schemaPath:"#/properties/kind/enum",keyword:"enum",params:{allowedValues:$d.properties.kind.enum},message:"must be equal to one of the allowed values"};s===null?s=[l]:s.push(l),a++}}if(i.label!==void 0){let o=i.label;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/label",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/label",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/label",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.summary!==void 0&&typeof i.summary!="string"){let o={instancePath:e+"/summary",schemaPath:"#/properties/summary/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[o]:s.push(o),a++}if(i.details!==void 0){let o=i.details;if(typeof o=="string"){if(xt(o)>8e3){let l={instancePath:e+"/details",schemaPath:"#/definitions/details/maxLength",keyword:"maxLength",params:{limit:8e3},message:"must NOT have more than 8000 characters"};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/details",schemaPath:"#/definitions/details/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.groupId!==void 0){let o=i.groupId;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/groupId",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/groupId",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/groupId",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.evidenceStatus!==void 0){let o=i.evidenceStatus;if(!(o==="confirmed"||o==="assumed"||o==="planned")){let l={instancePath:e+"/evidenceStatus",schemaPath:"#/definitions/evidenceStatus/enum",keyword:"enum",params:{allowedValues:bh.enum},message:"must be equal to one of the allowed values"};s===null?s=[l]:s.push(l),a++}}i.sources!==void 0&&(Pi(i.sources,{instancePath:e+"/sources",parentData:i,parentDataProperty:"sources",rootData:r})||(s=s===null?Pi.errors:s.concat(Pi.errors),a=s.length))}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};s===null?s=[o]:s.push(o),a++}return Ii.errors=s,a===0}var vh={type:"object",additionalProperties:!1,required:["id","source","target","kind","directed"],properties:{id:{$ref:"#/definitions/nonEmptyText"},source:{$ref:"#/definitions/nonEmptyText"},target:{$ref:"#/definitions/nonEmptyText"},kind:{enum:["control","data","dependency","exception","feedback"]},directed:{type:"boolean"},label:{type:"string"},details:{$ref:"#/definitions/details"},evidenceStatus:{$ref:"#/definitions/evidenceStatus"},sources:{$ref:"#/definitions/sources"}}};function Li(i,{instancePath:e="",parentData:t,parentDataProperty:n,rootData:r=i}={}){let s=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.id===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"id"},message:"must have required property 'id'"};s===null?s=[o]:s.push(o),a++}if(i.source===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"source"},message:"must have required property 'source'"};s===null?s=[o]:s.push(o),a++}if(i.target===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"target"},message:"must have required property 'target'"};s===null?s=[o]:s.push(o),a++}if(i.kind===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"kind"},message:"must have required property 'kind'"};s===null?s=[o]:s.push(o),a++}if(i.directed===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"directed"},message:"must have required property 'directed'"};s===null?s=[o]:s.push(o),a++}for(let o in i)if(!Mh.call(vh.properties,o)){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};s===null?s=[l]:s.push(l),a++}if(i.id!==void 0){let o=i.id;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.source!==void 0){let o=i.source;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/source",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/source",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/source",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.target!==void 0){let o=i.target;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/target",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/target",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/target",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.kind!==void 0){let o=i.kind;if(!(o==="control"||o==="data"||o==="dependency"||o==="exception"||o==="feedback")){let l={instancePath:e+"/kind",schemaPath:"#/properties/kind/enum",keyword:"enum",params:{allowedValues:vh.properties.kind.enum},message:"must be equal to one of the allowed values"};s===null?s=[l]:s.push(l),a++}}if(i.directed!==void 0&&typeof i.directed!="boolean"){let o={instancePath:e+"/directed",schemaPath:"#/properties/directed/type",keyword:"type",params:{type:"boolean"},message:"must be boolean"};s===null?s=[o]:s.push(o),a++}if(i.label!==void 0&&typeof i.label!="string"){let o={instancePath:e+"/label",schemaPath:"#/properties/label/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[o]:s.push(o),a++}if(i.details!==void 0){let o=i.details;if(typeof o=="string"){if(xt(o)>8e3){let l={instancePath:e+"/details",schemaPath:"#/definitions/details/maxLength",keyword:"maxLength",params:{limit:8e3},message:"must NOT have more than 8000 characters"};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/details",schemaPath:"#/definitions/details/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.evidenceStatus!==void 0){let o=i.evidenceStatus;if(!(o==="confirmed"||o==="assumed"||o==="planned")){let l={instancePath:e+"/evidenceStatus",schemaPath:"#/definitions/evidenceStatus/enum",keyword:"enum",params:{allowedValues:bh.enum},message:"must be equal to one of the allowed values"};s===null?s=[l]:s.push(l),a++}}i.sources!==void 0&&(Pi(i.sources,{instancePath:e+"/sources",parentData:i,parentDataProperty:"sources",rootData:r})||(s=s===null?Pi.errors:s.concat(Pi.errors),a=s.length))}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};s===null?s=[o]:s.push(o),a++}return Li.errors=s,a===0}function uo(i,{instancePath:e="",parentData:t,parentDataProperty:n,rootData:r=i}={}){let s=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.id===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"id"},message:"must have required property 'id'"};s===null?s=[o]:s.push(o),a++}if(i.label===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"label"},message:"must have required property 'label'"};s===null?s=[o]:s.push(o),a++}for(let o in i)if(!(o==="id"||o==="label"||o==="parentId"||o==="details")){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};s===null?s=[l]:s.push(l),a++}if(i.id!==void 0){let o=i.id;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.label!==void 0){let o=i.label;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/label",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/label",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/label",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.parentId!==void 0){let o=i.parentId;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/parentId",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/parentId",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/parentId",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.details!==void 0){let o=i.details;if(typeof o=="string"){if(xt(o)>8e3){let l={instancePath:e+"/details",schemaPath:"#/definitions/details/maxLength",keyword:"maxLength",params:{limit:8e3},message:"must NOT have more than 8000 characters"};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/details",schemaPath:"#/definitions/details/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};s===null?s=[o]:s.push(o),a++}return uo.errors=s,a===0}function fo(i,{instancePath:e="",parentData:t,parentDataProperty:n,rootData:r=i}={}){let s=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.owner===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"owner"},message:"must have required property 'owner'"};s===null?s=[o]:s.push(o),a++}if(i.nodes===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"nodes"},message:"must have required property 'nodes'"};s===null?s=[o]:s.push(o),a++}if(i.edges===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"edges"},message:"must have required property 'edges'"};s===null?s=[o]:s.push(o),a++}for(let o in i)if(!(o==="owner"||o==="nodes"||o==="edges")){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};s===null?s=[l]:s.push(l),a++}if(i.owner!==void 0){let o=i.owner;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/owner",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/owner",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/owner",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.nodes!==void 0){let o=i.nodes;if(Array.isArray(o)){if(o.length>100){let c={instancePath:e+"/nodes",schemaPath:"#/properties/nodes/maxItems",keyword:"maxItems",params:{limit:100},message:"must NOT have more than 100 items"};s===null?s=[c]:s.push(c),a++}if(o.length<1){let c={instancePath:e+"/nodes",schemaPath:"#/properties/nodes/minItems",keyword:"minItems",params:{limit:1},message:"must NOT have fewer than 1 items"};s===null?s=[c]:s.push(c),a++}let l=o.length;for(let c=0;c<l;c++)Ii(o[c],{instancePath:e+"/nodes/"+c,parentData:o,parentDataProperty:c,rootData:r})||(s=s===null?Ii.errors:s.concat(Ii.errors),a=s.length)}else{let l={instancePath:e+"/nodes",schemaPath:"#/properties/nodes/type",keyword:"type",params:{type:"array"},message:"must be array"};s===null?s=[l]:s.push(l),a++}}if(i.edges!==void 0){let o=i.edges;if(Array.isArray(o)){if(o.length>300){let c={instancePath:e+"/edges",schemaPath:"#/properties/edges/maxItems",keyword:"maxItems",params:{limit:300},message:"must NOT have more than 300 items"};s===null?s=[c]:s.push(c),a++}let l=o.length;for(let c=0;c<l;c++)Li(o[c],{instancePath:e+"/edges/"+c,parentData:o,parentDataProperty:c,rootData:r})||(s=s===null?Li.errors:s.concat(Li.errors),a=s.length)}else{let l={instancePath:e+"/edges",schemaPath:"#/properties/edges/type",keyword:"type",params:{type:"array"},message:"must be array"};s===null?s=[l]:s.push(l),a++}}}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};s===null?s=[o]:s.push(o),a++}return fo.errors=s,a===0}var Zd={type:"object",additionalProperties:!1,required:["nodeId","shape"],properties:{nodeId:{$ref:"#/definitions/nonEmptyText"},shape:{enum:["service","shell","gateway","client","database","event","external","auth","decision","rack","adjust","link","channel","ledger","result"]},color:{type:"string",pattern:"^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"},shortLabel:{$ref:"#/definitions/nonEmptyText"}}},Jd=new RegExp("^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$","u");function po(i,{instancePath:e="",parentData:t,parentDataProperty:n,rootData:r=i}={}){let s=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.nodeId===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"nodeId"},message:"must have required property 'nodeId'"};s===null?s=[o]:s.push(o),a++}if(i.shape===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"shape"},message:"must have required property 'shape'"};s===null?s=[o]:s.push(o),a++}for(let o in i)if(!(o==="nodeId"||o==="shape"||o==="color"||o==="shortLabel")){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};s===null?s=[l]:s.push(l),a++}if(i.nodeId!==void 0){let o=i.nodeId;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/nodeId",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/nodeId",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/nodeId",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.shape!==void 0){let o=i.shape;if(!(o==="service"||o==="shell"||o==="gateway"||o==="client"||o==="database"||o==="event"||o==="external"||o==="auth"||o==="decision"||o==="rack"||o==="adjust"||o==="link"||o==="channel"||o==="ledger"||o==="result")){let l={instancePath:e+"/shape",schemaPath:"#/properties/shape/enum",keyword:"enum",params:{allowedValues:Zd.properties.shape.enum},message:"must be equal to one of the allowed values"};s===null?s=[l]:s.push(l),a++}}if(i.color!==void 0){let o=i.color;if(typeof o=="string"){if(!Jd.test(o)){let l={instancePath:e+"/color",schemaPath:"#/properties/color/pattern",keyword:"pattern",params:{pattern:"^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"},message:'must match pattern "^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/color",schemaPath:"#/properties/color/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.shortLabel!==void 0){let o=i.shortLabel;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/shortLabel",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/shortLabel",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/shortLabel",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};s===null?s=[o]:s.push(o),a++}return po.errors=s,a===0}var Kd={type:"object",additionalProperties:!1,required:["id","title","description","route","focusId","tone"],properties:{id:{$ref:"#/definitions/nonEmptyText"},title:{$ref:"#/definitions/nonEmptyText"},description:{type:"string"},route:{type:"array",minItems:1,maxItems:300,items:{$ref:"#/definitions/nonEmptyText"}},focusId:{$ref:"#/definitions/nonEmptyText"},tone:{enum:["request","data","success","failure"]},durationMs:{type:"integer",minimum:1,maximum:9007199254740991}}};function mo(i,{instancePath:e="",parentData:t,parentDataProperty:n,rootData:r=i}={}){let s=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.id===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"id"},message:"must have required property 'id'"};s===null?s=[o]:s.push(o),a++}if(i.title===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"title"},message:"must have required property 'title'"};s===null?s=[o]:s.push(o),a++}if(i.description===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"description"},message:"must have required property 'description'"};s===null?s=[o]:s.push(o),a++}if(i.route===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"route"},message:"must have required property 'route'"};s===null?s=[o]:s.push(o),a++}if(i.focusId===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"focusId"},message:"must have required property 'focusId'"};s===null?s=[o]:s.push(o),a++}if(i.tone===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"tone"},message:"must have required property 'tone'"};s===null?s=[o]:s.push(o),a++}for(let o in i)if(!(o==="id"||o==="title"||o==="description"||o==="route"||o==="focusId"||o==="tone"||o==="durationMs")){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};s===null?s=[l]:s.push(l),a++}if(i.id!==void 0){let o=i.id;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.title!==void 0){let o=i.title;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/title",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/title",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/title",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.description!==void 0&&typeof i.description!="string"){let o={instancePath:e+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[o]:s.push(o),a++}if(i.route!==void 0){let o=i.route;if(Array.isArray(o)){if(o.length>300){let c={instancePath:e+"/route",schemaPath:"#/properties/route/maxItems",keyword:"maxItems",params:{limit:300},message:"must NOT have more than 300 items"};s===null?s=[c]:s.push(c),a++}if(o.length<1){let c={instancePath:e+"/route",schemaPath:"#/properties/route/minItems",keyword:"minItems",params:{limit:1},message:"must NOT have fewer than 1 items"};s===null?s=[c]:s.push(c),a++}let l=o.length;for(let c=0;c<l;c++){let h=o[c];if(typeof h=="string"){if(xt(h)<1){let d={instancePath:e+"/route/"+c,schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[d]:s.push(d),a++}if(!wt.test(h)){let d={instancePath:e+"/route/"+c,schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[d]:s.push(d),a++}}else{let d={instancePath:e+"/route/"+c,schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[d]:s.push(d),a++}}}else{let l={instancePath:e+"/route",schemaPath:"#/properties/route/type",keyword:"type",params:{type:"array"},message:"must be array"};s===null?s=[l]:s.push(l),a++}}if(i.focusId!==void 0){let o=i.focusId;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/focusId",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/focusId",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/focusId",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.tone!==void 0){let o=i.tone;if(!(o==="request"||o==="data"||o==="success"||o==="failure")){let l={instancePath:e+"/tone",schemaPath:"#/properties/tone/enum",keyword:"enum",params:{allowedValues:Kd.properties.tone.enum},message:"must be equal to one of the allowed values"};s===null?s=[l]:s.push(l),a++}}if(i.durationMs!==void 0){let o=i.durationMs;if(!(typeof o=="number"&&!(o%1)&&!isNaN(o)&&isFinite(o))){let l={instancePath:e+"/durationMs",schemaPath:"#/properties/durationMs/type",keyword:"type",params:{type:"integer"},message:"must be integer"};s===null?s=[l]:s.push(l),a++}if(typeof o=="number"&&isFinite(o)){if(o>9007199254740991||isNaN(o)){let l={instancePath:e+"/durationMs",schemaPath:"#/properties/durationMs/maximum",keyword:"maximum",params:{comparison:"<=",limit:9007199254740991},message:"must be <= 9007199254740991"};s===null?s=[l]:s.push(l),a++}if(o<1||isNaN(o)){let l={instancePath:e+"/durationMs",schemaPath:"#/properties/durationMs/minimum",keyword:"minimum",params:{comparison:">=",limit:1},message:"must be >= 1"};s===null?s=[l]:s.push(l),a++}}}}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};s===null?s=[o]:s.push(o),a++}return mo.errors=s,a===0}function go(i,{instancePath:e="",parentData:t,parentDataProperty:n,rootData:r=i}={}){let s=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.id===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"id"},message:"must have required property 'id'"};s===null?s=[o]:s.push(o),a++}if(i.label===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"label"},message:"must have required property 'label'"};s===null?s=[o]:s.push(o),a++}if(i.steps===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"steps"},message:"must have required property 'steps'"};s===null?s=[o]:s.push(o),a++}for(let o in i)if(!(o==="id"||o==="label"||o==="steps")){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};s===null?s=[l]:s.push(l),a++}if(i.id!==void 0){let o=i.id;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.label!==void 0){let o=i.label;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/label",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/label",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/label",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.steps!==void 0){let o=i.steps;if(Array.isArray(o)){if(o.length>200){let c={instancePath:e+"/steps",schemaPath:"#/properties/steps/maxItems",keyword:"maxItems",params:{limit:200},message:"must NOT have more than 200 items"};s===null?s=[c]:s.push(c),a++}if(o.length<1){let c={instancePath:e+"/steps",schemaPath:"#/properties/steps/minItems",keyword:"minItems",params:{limit:1},message:"must NOT have fewer than 1 items"};s===null?s=[c]:s.push(c),a++}let l=o.length;for(let c=0;c<l;c++)mo(o[c],{instancePath:e+"/steps/"+c,parentData:o,parentDataProperty:c,rootData:r})||(s=s===null?mo.errors:s.concat(mo.errors),a=s.length)}else{let l={instancePath:e+"/steps",schemaPath:"#/properties/steps/type",keyword:"type",params:{type:"array"},message:"must be array"};s===null?s=[l]:s.push(l),a++}}}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};s===null?s=[o]:s.push(o),a++}return go.errors=s,a===0}function Eh(i,{instancePath:e="",parentData:t,parentDataProperty:n,rootData:r=i}={}){let s=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.schemaVersion===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"schemaVersion"},message:"must have required property 'schemaVersion'"};s===null?s=[o]:s.push(o),a++}if(i.id===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"id"},message:"must have required property 'id'"};s===null?s=[o]:s.push(o),a++}if(i.title===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"title"},message:"must have required property 'title'"};s===null?s=[o]:s.push(o),a++}if(i.view===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"view"},message:"must have required property 'view'"};s===null?s=[o]:s.push(o),a++}if(i.nodes===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"nodes"},message:"must have required property 'nodes'"};s===null?s=[o]:s.push(o),a++}if(i.edges===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"edges"},message:"must have required property 'edges'"};s===null?s=[o]:s.push(o),a++}if(i.groups===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"groups"},message:"must have required property 'groups'"};s===null?s=[o]:s.push(o),a++}for(let o in i)if(!Mh.call(co.properties,o)){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};s===null?s=[l]:s.push(l),a++}if(i.schemaVersion!==void 0){let o=i.schemaVersion;if(typeof o!="string"){let l={instancePath:e+"/schemaVersion",schemaPath:"#/properties/schemaVersion/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}if(o!=="2.0"){let l={instancePath:e+"/schemaVersion",schemaPath:"#/properties/schemaVersion/const",keyword:"const",params:{allowedValue:"2.0"},message:"must be equal to constant"};s===null?s=[l]:s.push(l),a++}}if(i.id!==void 0){let o=i.id;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.title!==void 0){let o=i.title;if(typeof o=="string"){if(xt(o)<1){let l={instancePath:e+"/title",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[l]:s.push(l),a++}if(!wt.test(o)){let l={instancePath:e+"/title",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[l]:s.push(l),a++}}else{let l={instancePath:e+"/title",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[l]:s.push(l),a++}}if(i.description!==void 0&&typeof i.description!="string"){let o={instancePath:e+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[o]:s.push(o),a++}if(i.view!==void 0){let o=i.view;if(o&&typeof o=="object"&&!Array.isArray(o)){if(o.kind===void 0){let l={instancePath:e+"/view",schemaPath:"#/properties/view/required",keyword:"required",params:{missingProperty:"kind"},message:"must have required property 'kind'"};s===null?s=[l]:s.push(l),a++}if(o.direction===void 0){let l={instancePath:e+"/view",schemaPath:"#/properties/view/required",keyword:"required",params:{missingProperty:"direction"},message:"must have required property 'direction'"};s===null?s=[l]:s.push(l),a++}if(o.theme===void 0){let l={instancePath:e+"/view",schemaPath:"#/properties/view/required",keyword:"required",params:{missingProperty:"theme"},message:"must have required property 'theme'"};s===null?s=[l]:s.push(l),a++}for(let l in o)if(!(l==="kind"||l==="direction"||l==="theme"||l==="collapsedGroups"||l==="primaryPath")){let c={instancePath:e+"/view",schemaPath:"#/properties/view/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:l},message:"must NOT have additional properties"};s===null?s=[c]:s.push(c),a++}if(o.kind!==void 0){let l=o.kind;if(!(l==="overview"||l==="flow"||l==="deployment")){let c={instancePath:e+"/view/kind",schemaPath:"#/properties/view/properties/kind/enum",keyword:"enum",params:{allowedValues:co.properties.view.properties.kind.enum},message:"must be equal to one of the allowed values"};s===null?s=[c]:s.push(c),a++}}if(o.direction!==void 0){let l=o.direction;if(!(l==="RIGHT"||l==="DOWN")){let c={instancePath:e+"/view/direction",schemaPath:"#/properties/view/properties/direction/enum",keyword:"enum",params:{allowedValues:co.properties.view.properties.direction.enum},message:"must be equal to one of the allowed values"};s===null?s=[c]:s.push(c),a++}}if(o.theme!==void 0){let l=o.theme;if(!(l==="light"||l==="dark")){let c={instancePath:e+"/view/theme",schemaPath:"#/properties/view/properties/theme/enum",keyword:"enum",params:{allowedValues:co.properties.view.properties.theme.enum},message:"must be equal to one of the allowed values"};s===null?s=[c]:s.push(c),a++}}if(o.collapsedGroups!==void 0){let l=o.collapsedGroups;if(Array.isArray(l)){let c=l.length;for(let u=0;u<c;u++){let f=l[u];if(typeof f=="string"){if(xt(f)<1){let g={instancePath:e+"/view/collapsedGroups/"+u,schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[g]:s.push(g),a++}if(!wt.test(f)){let g={instancePath:e+"/view/collapsedGroups/"+u,schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[g]:s.push(g),a++}}else{let g={instancePath:e+"/view/collapsedGroups/"+u,schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[g]:s.push(g),a++}}let h=l.length,d;if(h>1){e:for(;h--;)for(d=h;d--;)if(Yd(l[h],l[d])){let u={instancePath:e+"/view/collapsedGroups",schemaPath:"#/properties/view/properties/collapsedGroups/uniqueItems",keyword:"uniqueItems",params:{i:h,j:d},message:"must NOT have duplicate items (items ## "+d+" and "+h+" are identical)"};s===null?s=[u]:s.push(u),a++;break e}}}else{let c={instancePath:e+"/view/collapsedGroups",schemaPath:"#/properties/view/properties/collapsedGroups/type",keyword:"type",params:{type:"array"},message:"must be array"};s===null?s=[c]:s.push(c),a++}}if(o.primaryPath!==void 0){let l=o.primaryPath;if(Array.isArray(l)){let c=l.length;for(let h=0;h<c;h++){let d=l[h];if(typeof d=="string"){if(xt(d)<1){let u={instancePath:e+"/view/primaryPath/"+h,schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};s===null?s=[u]:s.push(u),a++}if(!wt.test(d)){let u={instancePath:e+"/view/primaryPath/"+h,schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};s===null?s=[u]:s.push(u),a++}}else{let u={instancePath:e+"/view/primaryPath/"+h,schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};s===null?s=[u]:s.push(u),a++}}}else{let c={instancePath:e+"/view/primaryPath",schemaPath:"#/properties/view/properties/primaryPath/type",keyword:"type",params:{type:"array"},message:"must be array"};s===null?s=[c]:s.push(c),a++}}}else{let l={instancePath:e+"/view",schemaPath:"#/properties/view/type",keyword:"type",params:{type:"object"},message:"must be object"};s===null?s=[l]:s.push(l),a++}}if(i.nodes!==void 0){let o=i.nodes;if(Array.isArray(o)){if(o.length>100){let c={instancePath:e+"/nodes",schemaPath:"#/properties/nodes/maxItems",keyword:"maxItems",params:{limit:100},message:"must NOT have more than 100 items"};s===null?s=[c]:s.push(c),a++}if(o.length<1){let c={instancePath:e+"/nodes",schemaPath:"#/properties/nodes/minItems",keyword:"minItems",params:{limit:1},message:"must NOT have fewer than 1 items"};s===null?s=[c]:s.push(c),a++}let l=o.length;for(let c=0;c<l;c++)Ii(o[c],{instancePath:e+"/nodes/"+c,parentData:o,parentDataProperty:c,rootData:r})||(s=s===null?Ii.errors:s.concat(Ii.errors),a=s.length)}else{let l={instancePath:e+"/nodes",schemaPath:"#/properties/nodes/type",keyword:"type",params:{type:"array"},message:"must be array"};s===null?s=[l]:s.push(l),a++}}if(i.edges!==void 0){let o=i.edges;if(Array.isArray(o)){if(o.length>300){let c={instancePath:e+"/edges",schemaPath:"#/properties/edges/maxItems",keyword:"maxItems",params:{limit:300},message:"must NOT have more than 300 items"};s===null?s=[c]:s.push(c),a++}let l=o.length;for(let c=0;c<l;c++)Li(o[c],{instancePath:e+"/edges/"+c,parentData:o,parentDataProperty:c,rootData:r})||(s=s===null?Li.errors:s.concat(Li.errors),a=s.length)}else{let l={instancePath:e+"/edges",schemaPath:"#/properties/edges/type",keyword:"type",params:{type:"array"},message:"must be array"};s===null?s=[l]:s.push(l),a++}}if(i.groups!==void 0){let o=i.groups;if(Array.isArray(o)){if(o.length>20){let c={instancePath:e+"/groups",schemaPath:"#/properties/groups/maxItems",keyword:"maxItems",params:{limit:20},message:"must NOT have more than 20 items"};s===null?s=[c]:s.push(c),a++}let l=o.length;for(let c=0;c<l;c++)uo(o[c],{instancePath:e+"/groups/"+c,parentData:o,parentDataProperty:c,rootData:r})||(s=s===null?uo.errors:s.concat(uo.errors),a=s.length)}else{let l={instancePath:e+"/groups",schemaPath:"#/properties/groups/type",keyword:"type",params:{type:"array"},message:"must be array"};s===null?s=[l]:s.push(l),a++}}if(i.spatial!==void 0){let o=i.spatial;if(o&&typeof o=="object"&&!Array.isArray(o)){for(let l in o)if(!(l==="interiors"||l==="models"||l==="scenarios")){let c={instancePath:e+"/spatial",schemaPath:"#/properties/spatial/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:l},message:"must NOT have additional properties"};s===null?s=[c]:s.push(c),a++}if(o.interiors!==void 0){let l=o.interiors;if(Array.isArray(l)){if(l.length>100){let h={instancePath:e+"/spatial/interiors",schemaPath:"#/properties/spatial/properties/interiors/maxItems",keyword:"maxItems",params:{limit:100},message:"must NOT have more than 100 items"};s===null?s=[h]:s.push(h),a++}let c=l.length;for(let h=0;h<c;h++)fo(l[h],{instancePath:e+"/spatial/interiors/"+h,parentData:l,parentDataProperty:h,rootData:r})||(s=s===null?fo.errors:s.concat(fo.errors),a=s.length)}else{let c={instancePath:e+"/spatial/interiors",schemaPath:"#/properties/spatial/properties/interiors/type",keyword:"type",params:{type:"array"},message:"must be array"};s===null?s=[c]:s.push(c),a++}}if(o.models!==void 0){let l=o.models;if(Array.isArray(l)){if(l.length>100){let h={instancePath:e+"/spatial/models",schemaPath:"#/properties/spatial/properties/models/maxItems",keyword:"maxItems",params:{limit:100},message:"must NOT have more than 100 items"};s===null?s=[h]:s.push(h),a++}let c=l.length;for(let h=0;h<c;h++)po(l[h],{instancePath:e+"/spatial/models/"+h,parentData:l,parentDataProperty:h,rootData:r})||(s=s===null?po.errors:s.concat(po.errors),a=s.length)}else{let c={instancePath:e+"/spatial/models",schemaPath:"#/properties/spatial/properties/models/type",keyword:"type",params:{type:"array"},message:"must be array"};s===null?s=[c]:s.push(c),a++}}if(o.scenarios!==void 0){let l=o.scenarios;if(Array.isArray(l)){if(l.length>20){let h={instancePath:e+"/spatial/scenarios",schemaPath:"#/properties/spatial/properties/scenarios/maxItems",keyword:"maxItems",params:{limit:20},message:"must NOT have more than 20 items"};s===null?s=[h]:s.push(h),a++}let c=l.length;for(let h=0;h<c;h++)go(l[h],{instancePath:e+"/spatial/scenarios/"+h,parentData:l,parentDataProperty:h,rootData:r})||(s=s===null?go.errors:s.concat(go.errors),a=s.length)}else{let c={instancePath:e+"/spatial/scenarios",schemaPath:"#/properties/spatial/properties/scenarios/type",keyword:"type",params:{type:"array"},message:"must be array"};s===null?s=[c]:s.push(c),a++}}}else{let l={instancePath:e+"/spatial",schemaPath:"#/properties/spatial/type",keyword:"type",params:{type:"object"},message:"must be object"};s===null?s=[l]:s.push(l),a++}}}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};s===null?s=[o]:s.push(o),a++}return Eh.errors=s,a===0}var jd=2*1024*1024,wh=Sh;function Th(i){return i.replaceAll("~","~0").replaceAll("/","~1")}function Qd(i){let e=i.instancePath;return i.keyword==="required"&&(e+=`/${Th(String(i.params.missingProperty))}`),i.keyword==="additionalProperties"&&(e+=`/${Th(String(i.params.additionalProperty))}`),{code:`SCHEMA_${i.keyword.replace(/[A-Z]/g,t=>`_${t}`).toUpperCase()}`,path:e,ids:[],severity:"error",message:`${e||"/"}: ${i.message??"\u7ED3\u6784\u4E0D\u7B26\u5408 schema"}`}}function Ah(i,e,t=""){let n=oi(i);i.nodes.forEach((r,s)=>{let a=n.outgoing.get(r.id)??[];if(r.kind==="decision"){let o=a.filter(ns);o.length<2&&e("DECISION_BRANCH_COUNT",`${t}/nodes/${s}/kind`,[r.id],"decision \u5728\u6D41\u7A0B\u5B50\u56FE\u4E2D\u81F3\u5C11\u9700\u8981\u4E24\u4E2A\u51FA\u53E3\uFF0Cdata/dependency \u4E0D\u8BA1\u5165\u3002");let l=new Set;for(let c of o){let h=c.label?.trim(),d=`${t}/edges/${i.edges.indexOf(c)}/label`;h?l.has(h)&&e("DECISION_CONDITION_DUPLICATE",d,[r.id,c.id],"\u540C\u4E00\u5224\u65AD\u8282\u70B9\u7684\u51FA\u53E3\u6761\u4EF6\u5FC5\u987B\u53EF\u533A\u5206\u3002"):e("DECISION_CONDITION_MISSING",d,[r.id,c.id],"\u5224\u65AD\u51FA\u53E3\u5FC5\u987B\u6709\u975E\u7A7A\u6761\u4EF6\uFF0C\u4E0D\u80FD\u81EA\u52A8\u63A8\u65AD\u662F\u6216\u5426\u3002"),h&&l.add(h)}}r.kind==="fork"&&a.filter(o=>o.kind==="control").length<2&&e("FORK_BRANCH_COUNT",`${t}/nodes/${s}/kind`,[r.id],"fork \u81F3\u5C11\u9700\u8981\u4E24\u4E2A control \u51FA\u53E3\u3002"),r.kind==="join"&&(n.incoming.get(r.id)??[]).filter(o=>o.kind==="control").length<2&&e("JOIN_BRANCH_COUNT",`${t}/nodes/${s}/kind`,[r.id],"join \u81F3\u5C11\u9700\u8981\u4E24\u4E2A control \u5165\u53E3\u3002")})}function Rh(i){let e=[],t=(S,x,w,E,P="error")=>{e.push({code:S,path:x,ids:w,message:E,severity:P})};try{let S=JSON.stringify(i);if(S!==void 0&&new TextEncoder().encode(S).byteLength>jd)return t("DOCUMENT_SIZE_LIMIT","",[],"\u56FE\u6570\u636E\u8D85\u8FC7 2 MiB\uFF0C\u8BF7\u63D0\u70BC\u4E3A\u603B\u89C8\u4E0E\u5B50\u56FE\uFF0C\u4E0D\u8981\u653E\u5165\u5B8C\u6574\u6E90\u7801\u6216\u65E5\u5FD7\u3002"),{valid:!1,diagnostics:e}}catch(S){return t("DOCUMENT_NOT_JSON","",[],`\u56FE\u6570\u636E\u65E0\u6CD5\u8868\u793A\u4E3A JSON\uFF1A${S instanceof Error?S.message:String(S)}`),{valid:!1,diagnostics:e}}if(!wh(i))return{valid:!1,diagnostics:(wh.errors??[]).map(Qd)};let n=i,r=new Set,s=new Set,a=new Set;n.nodes.forEach((S,x)=>{s.has(S.id)&&t("ID_DUPLICATE",`/nodes/${x}/id`,[S.id],"\u8282\u70B9\u548C\u7EC4 ID \u5FC5\u987B\u5728\u540C\u4E00\u547D\u540D\u7A7A\u95F4\u5185\u552F\u4E00\u3002"),s.add(S.id),r.add(S.id)}),n.groups.forEach((S,x)=>{s.has(S.id)&&t("ID_DUPLICATE",`/groups/${x}/id`,[S.id],"\u8282\u70B9\u548C\u7EC4 ID \u5FC5\u987B\u5728\u540C\u4E00\u547D\u540D\u7A7A\u95F4\u5185\u552F\u4E00\u3002"),s.add(S.id)});let o=new Map(n.groups.map(S=>[S.id,S]));n.nodes.forEach((S,x)=>{S.groupId&&!o.has(S.groupId)&&t("NODE_GROUP_MISSING",`/nodes/${x}/groupId`,[S.id,S.groupId],"\u8282\u70B9\u5F15\u7528\u7684\u5206\u7EC4\u4E0D\u5B58\u5728\u3002")}),n.groups.forEach((S,x)=>{S.parentId&&!o.has(S.parentId)&&t("GROUP_PARENT_MISSING",`/groups/${x}/parentId`,[S.id,S.parentId],"\u7236\u5206\u7EC4\u4E0D\u5B58\u5728\u3002");let w=new Set,E=S;for(;E;){if(w.has(E.id)){t("GROUP_CYCLE",`/groups/${x}/parentId`,[...w],"\u5206\u7EC4\u5F52\u5C5E\u4E0D\u80FD\u5F62\u6210\u5FAA\u73AF\u3002");break}w.add(E.id),E=E.parentId?o.get(E.parentId):void 0}w.size>2&&t("GROUP_DEPTH_LIMIT",`/groups/${x}/parentId`,[...w],"\u5206\u7EC4\u6700\u591A\u652F\u6301\u4E24\u5C42\uFF1B\u8BF7\u5408\u5E76\u5C42\u7EA7\u6216\u62C6\u4E3A\u5B50\u56FE\u3002")}),n.edges.forEach((S,x)=>{a.has(S.id)&&t("EDGE_ID_DUPLICATE",`/edges/${x}/id`,[S.id],"\u8FB9 ID \u5FC5\u987B\u5728\u6587\u6863\u5185\u552F\u4E00\u3002"),a.add(S.id),r.has(S.source)||t("EDGE_SOURCE_MISSING",`/edges/${x}/source`,[S.id,S.source],"\u8FB9\u7684 source \u5FC5\u987B\u5F15\u7528\u5DF2\u6709\u8282\u70B9\u3002"),r.has(S.target)||t("EDGE_TARGET_MISSING",`/edges/${x}/target`,[S.id,S.target],"\u8FB9\u7684 target \u5FC5\u987B\u5F15\u7528\u5DF2\u6709\u8282\u70B9\u3002"),ns(S)&&!S.directed&&t("FLOW_EDGE_UNDIRECTED",`/edges/${x}/directed`,[S.id],"control\u3001exception \u548C feedback \u6D41\u7A0B\u8FB9\u5FC5\u987B\u6709\u660E\u786E\u65B9\u5411\u3002")});let l=oi(n);n.groups.forEach((S,x)=>{l.groupMembers.get(S.id)?.size||t("GROUP_EMPTY",`/groups/${x}`,[S.id],"\u5206\u7EC4\u5FC5\u987B\u76F4\u63A5\u6216\u901A\u8FC7\u5B50\u7EC4\u5305\u542B\u8282\u70B9\u3002")}),Ah(n,t);let c=new Set,h;(n.view.primaryPath??[]).forEach((S,x)=>{let w=`/view/primaryPath/${x}`,E=l.edges.get(S);E||t("PRIMARY_EDGE_MISSING",w,[S],"\u4E3B\u8DEF\u5F84\u5F15\u7528\u7684\u8FB9\u4E0D\u5B58\u5728\u3002"),c.has(S)&&t("PRIMARY_EDGE_DUPLICATE",w,[S],"\u4E3B\u8DEF\u5F84\u4E0D\u80FD\u91CD\u590D\u5F15\u7528\u540C\u4E00\u6761\u8FB9\u3002"),c.add(S),E&&!E.directed&&t("PRIMARY_EDGE_UNDIRECTED",w,[S],"\u4E3B\u8DEF\u5F84\u53EA\u80FD\u4F7F\u7528\u6709\u5411\u8FB9\u3002"),h&&E&&h.target!==E.source&&t("PRIMARY_PATH_DISCONNECTED",w,[h.id,S],"\u4E3B\u8DEF\u5F84\u76F8\u90BB\u8FB9\u5FC5\u987B\u6309\u7167 source \u2192 target \u8FDE\u7EED\u8FDE\u63A5\u3002"),h=E}),(n.view.collapsedGroups??[]).forEach((S,x)=>{o.has(S)||t("COLLAPSED_GROUP_MISSING",`/view/collapsedGroups/${x}`,[S],"\u521D\u59CB\u6298\u53E0\u72B6\u6001\u5F15\u7528\u7684\u7EC4\u4E0D\u5B58\u5728\u3002")});let d=n.spatial?.interiors??[],u=new Set(r),f=new Set,g=n.nodes.length,v=n.edges.length;d.forEach((S,x)=>{let w=`/spatial/interiors/${x}`;r.has(S.owner)||t("SPATIAL_OWNER_MISSING",`${w}/owner`,[S.owner],"\u5256\u9762 owner \u5FC5\u987B\u5F15\u7528\u603B\u89C8\u8282\u70B9\u3002"),f.has(S.owner)&&t("SPATIAL_OWNER_DUPLICATE",`${w}/owner`,[S.owner],"\u540C\u4E00\u4E2A\u603B\u89C8\u8282\u70B9\u53EA\u80FD\u5B9A\u4E49\u4E00\u4E2A\u5256\u9762\u3002"),f.add(S.owner),g+=S.nodes.length,v+=S.edges.length;let E=new Set(S.nodes.map(P=>P.id));S.nodes.forEach((P,y)=>{s.has(P.id)&&t("ID_DUPLICATE",`${w}/nodes/${y}/id`,[P.id],"\u603B\u89C8\u3001\u7EC4\u548C\u6240\u6709\u5256\u9762\u7684\u8282\u70B9 ID \u5FC5\u987B\u5728\u540C\u4E00\u547D\u540D\u7A7A\u95F4\u5185\u552F\u4E00\u3002"),s.add(P.id),u.add(P.id),P.groupId&&!o.has(P.groupId)&&t("NODE_GROUP_MISSING",`${w}/nodes/${y}/groupId`,[P.id,P.groupId],"\u5185\u90E8\u8282\u70B9\u5F15\u7528\u7684\u5206\u7EC4\u4E0D\u5B58\u5728\u3002")}),S.edges.forEach((P,y)=>{let T=`${w}/edges/${y}`;a.has(P.id)&&t("EDGE_ID_DUPLICATE",`${T}/id`,[P.id],"\u603B\u89C8\u548C\u6240\u6709\u5256\u9762\u7684\u8FB9 ID \u5FC5\u987B\u5728\u6587\u6863\u5185\u552F\u4E00\u3002"),a.add(P.id),E.has(P.source)||t("EDGE_SOURCE_MISSING",`${T}/source`,[P.id,P.source],"\u5185\u90E8\u8FB9\u7684 source \u5FC5\u987B\u5F15\u7528\u540C\u4E00\u5256\u9762\u7684\u8282\u70B9\u3002"),E.has(P.target)||t("EDGE_TARGET_MISSING",`${T}/target`,[P.id,P.target],"\u5185\u90E8\u8FB9\u7684 target \u5FC5\u987B\u5F15\u7528\u540C\u4E00\u5256\u9762\u7684\u8282\u70B9\u3002"),ns(P)&&!P.directed&&t("FLOW_EDGE_UNDIRECTED",`${T}/directed`,[P.id],"control\u3001exception \u548C feedback \u6D41\u7A0B\u8FB9\u5FC5\u987B\u6709\u660E\u786E\u65B9\u5411\u3002")}),Ah({...n,nodes:S.nodes,edges:S.edges,groups:[]},t,w)}),g>100&&t("SPATIAL_NODE_LIMIT","/spatial/interiors",[],"\u603B\u89C8\u548C\u6240\u6709\u5256\u9762\u5408\u8BA1\u6700\u591A 100 \u4E2A\u8282\u70B9\u3002"),v>300&&t("SPATIAL_EDGE_LIMIT","/spatial/interiors",[],"\u603B\u89C8\u548C\u6240\u6709\u5256\u9762\u5408\u8BA1\u6700\u591A 300 \u6761\u8FB9\u3002");let m=new Set;(n.spatial?.models??[]).forEach((S,x)=>{let w=`/spatial/models/${x}/nodeId`;u.has(S.nodeId)||t("SPATIAL_MODEL_NODE_MISSING",w,[S.nodeId],"\u6A21\u578B\u5FC5\u987B\u5F15\u7528\u5DF2\u6709\u603B\u89C8\u6216\u5185\u90E8\u8282\u70B9\u3002"),m.has(S.nodeId)&&t("SPATIAL_MODEL_DUPLICATE",w,[S.nodeId],"\u540C\u4E00\u8282\u70B9\u53EA\u80FD\u5B9A\u4E49\u4E00\u4E2A\u6A21\u578B\u5916\u89C2\u3002"),m.add(S.nodeId)});let p=new Set;if((n.spatial?.scenarios??[]).forEach((S,x)=>{let w=`/spatial/scenarios/${x}`;p.has(S.id)&&t("SPATIAL_SCENARIO_DUPLICATE",`${w}/id`,[S.id],"\u6F14\u793A\u573A\u666F ID \u5FC5\u987B\u552F\u4E00\u3002"),p.add(S.id);let E=new Set,P=0;S.steps.forEach((y,T)=>{let D=`${w}/steps/${T}`;E.has(y.id)&&t("SPATIAL_STEP_DUPLICATE",`${D}/id`,[S.id,y.id],"\u540C\u4E00\u573A\u666F\u7684\u6B65\u9AA4 ID \u5FC5\u987B\u552F\u4E00\u3002"),E.add(y.id),y.route.forEach((O,H)=>{u.has(O)||t("SPATIAL_ROUTE_NODE_MISSING",`${D}/route/${H}`,[S.id,y.id,O],"\u6F14\u793A\u8DEF\u5F84\u5FC5\u987B\u5F15\u7528\u5DF2\u6709\u603B\u89C8\u6216\u5185\u90E8\u8282\u70B9\u3002")}),u.has(y.focusId)||t("SPATIAL_FOCUS_NODE_MISSING",`${D}/focusId`,[S.id,y.id,y.focusId],"\u6F14\u793A\u7126\u70B9\u5FC5\u987B\u5F15\u7528\u5DF2\u6709\u603B\u89C8\u6216\u5185\u90E8\u8282\u70B9\u3002"),P+=y.durationMs??2200}),Number.isSafeInteger(P)||t("SPATIAL_DURATION_LIMIT",`${w}/steps`,[S.id],"\u573A\u666F\u603B\u65F6\u957F\u4E0D\u80FD\u8D85\u8FC7\u5B89\u5168\u6574\u6570\u8303\u56F4\u3002")}),e.length===0){let S=new Set,x=[];for(let E of n.nodes){if(S.has(E.id))continue;let P=[E.id];S.add(E.id);for(let y=0;y<P.length;y+=1){let T=P[y];for(let D of[...l.incoming.get(T),...l.outgoing.get(T)]){let O=D.source===T?D.target:D.source;S.has(O)||(S.add(O),P.push(O))}}x.push(P)}x.length>1&&t("GRAPH_DISCONNECTED","/nodes",x.slice(1).flat(),`\u56FE\u4E2D\u5305\u542B ${x.length} \u4E2A\u4E92\u4E0D\u8FDE\u901A\u7684\u5B50\u56FE\uFF1B\u8BF7\u786E\u8BA4\u8FD9\u662F\u9884\u671F\u8868\u8FBE\u3002`,"warning");let w=n.nodes.filter(E=>E.kind==="start").map(E=>E.id);if(n.view.kind==="flow"&&w.length>0){let E=lo(l,w,"downstream").nodeIds,P=new Set(n.edges.filter(ns).flatMap(T=>[T.source,T.target])),y=n.nodes.filter(T=>P.has(T.id)&&!E.has(T.id)).map(T=>T.id);y.length>0&&t("GRAPH_UNREACHABLE","/nodes",y,"\u8FD9\u4E9B\u6D41\u7A0B\u8282\u70B9\u65E0\u6CD5\u4ECE\u4EFB\u4F55 start \u8282\u70B9\u6CBF\u6D41\u7A0B\u65B9\u5411\u5230\u8FBE\uFF0C\u8BF7\u786E\u8BA4\u5165\u53E3\u548C\u8FB9\u65B9\u5411\u3002","warning")}}let b=!e.some(S=>S.severity==="error");return{valid:b,...b?{document:n}:{},diagnostics:e}}function Ch(i){let e=Rh(i);if(!e.valid)throw new Error(e.diagnostics.filter(l=>l.severity==="error").map(l=>`${l.code} ${l.path}: ${l.message}`).join(`
`));let t=Object.create(null),n=new Map,r=[],s=new Map(i.nodes.map(l=>[l.id,l])),a=new Map(i.groups.map(l=>[l.id,l]));for(let l of i.spatial?.interiors??[]){r.push(l.owner);let c=new Set;for(let h of l.nodes){n.set(h.id,l.owner);let d=h.groupId;for(;d&&!c.has(d);)c.add(d),d=a.get(d)?.parentId}t[l.owner]={schemaVersion:i.schemaVersion,id:`${i.id}:${l.owner}`,title:`${s.get(l.owner).label} \xB7 \u5185\u90E8\u7EC4\u4EF6`,...i.description===void 0?{}:{description:i.description},view:{kind:i.view.kind,direction:i.view.direction,theme:i.view.theme},nodes:l.nodes,edges:l.edges,groups:i.groups.filter(h=>c.has(h.id))}}let o={document:i,moduleIds:r,documents:t,owners:n,models:new Map((i.spatial?.models??[]).map(({nodeId:l,...c})=>[l,c])),scenarios:[]};return o.scenarios=(i.spatial?.scenarios??[]).map(l=>({id:l.id,label:l.label,steps:l.steps.map(c=>({...c,route:[...c.route],durationMs:c.durationMs??2200,openModules:[...new Set([...c.route,c.focusId].map(h=>Di(o,h)).filter(h=>h!==null))]}))})),o}function Di(i,e){return e===null?null:i.owners.get(e)??(i.moduleIds.includes(e)?e:null)}var Cn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},gn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},cu=0,Mc=1,hu=2;var Wi=1,uu=2,Os=3,Si=0,Zt=1,_n=2,Hn=0,Fs=1,bc=2,Ec=3,wc=4,du=5;var Xi=100,fu=101,pu=102,mu=103,gu=104,_u=200,yu=201,xu=202,vu=203,Tc=204,Ac=205,Su=206,Mu=207,bu=208,Eu=209,wu=210,Tu=211,Au=212,Ru=213,Cu=214,qo=0,Yo=1,$o=2,Ms=3,Zo=4,Jo=5,Ko=6,jo=7,Rc=0,Pu=1,Iu=2,Pn=0,Cc=1,Pc=2,Ic=3,Br=4,Lc=5,Dc=6,Nc=7;var Uc=300,Mi=301,qi=302,Na=303,Ua=304,kr=306,Qo=1e3,kn=1001,ea=1002,Ot=1003,Lu=1004;var zr=1005;var Bt=1006,Oa=1007;var bi=1008;var Qt=1009,Oc=1010,Fc=1011,Bs=1012,Fa=1013,In=1014,Ln=1015,Dn=1016,Ba=1017,ka=1018,ks=1020,Bc=35902,kc=35899,zc=1021,Vc=1022,yn=1023,zn=1026,Ei=1027,Hc=1028,za=1029,wi=1030,Va=1031;var Ha=1033,Vr=33776,Hr=33777,Gr=33778,Wr=33779,Ga=35840,Wa=35841,Xa=35842,qa=35843,Ya=36196,$a=37492,Za=37496,Ja=37488,Ka=37489,Xr=37490,ja=37491,Qa=37808,el=37809,tl=37810,nl=37811,il=37812,sl=37813,rl=37814,ol=37815,al=37816,ll=37817,cl=37818,hl=37819,ul=37820,dl=37821,fl=36492,pl=36494,ml=36495,gl=36283,_l=36284,qr=36285,yl=36286;var hr=2300,ta=2301,Wo=2302,fc=2303,pc=2400,mc=2401,gc=2402;var Du=3200;var xl=0,Nu=1,ti="",Gt="srgb",ur="srgb-linear",dr="linear",ht="srgb";var Xo=7680;var Uu=519,Ou=512,Fu=513,Bu=514,vl=515,ku=516,zu=517,Sl=518,Vu=519,Gc=35044;var Wc="300 es",Tn=2e3,bs=2001;function ef(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function tf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function fr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Hu(){let i=fr("canvas");return i.style.display="block",i}var Ph={},Es=null;function pr(...i){let e="THREE."+i.shift();Es?Es("log",e,...i):console.log(e,...i)}function Gu(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function He(...i){i=Gu(i);let e="THREE."+i.shift();if(Es)Es("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ge(...i){i=Gu(i);let e="THREE."+i.shift();if(Es)Es("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Bi(...i){let e=i.join(" ");e in Ph||(Ph[e]=!0,He(...i))}function Wu(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var Xu={[qo]:Yo,[$o]:Ko,[Zo]:jo,[Ms]:Jo,[Yo]:qo,[Ko]:$o,[jo]:Zo,[Jo]:Ms},An=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}},Vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ih=1234567,vs=Math.PI/180,ws=180/Math.PI;function jn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Vt[i&255]+Vt[i>>8&255]+Vt[i>>16&255]+Vt[i>>24&255]+"-"+Vt[e&255]+Vt[e>>8&255]+"-"+Vt[e>>16&15|64]+Vt[e>>24&255]+"-"+Vt[t&63|128]+Vt[t>>8&255]+"-"+Vt[t>>16&255]+Vt[t>>24&255]+Vt[n&255]+Vt[n>>8&255]+Vt[n>>16&255]+Vt[n>>24&255]).toLowerCase()}function je(i,e,t){return Math.max(e,Math.min(t,i))}function Xc(i,e){return(i%e+e)%e}function nf(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function sf(i,e,t){return i!==e?(t-i)/(e-i):0}function ar(i,e,t){return(1-t)*i+t*e}function rf(i,e,t,n){return ar(i,e,1-Math.exp(-t*n))}function of(i,e=1){return e-Math.abs(Xc(i,e*2)-e)}function af(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function lf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function cf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function hf(i,e){return i+Math.random()*(e-i)}function uf(i){return i*(.5-Math.random())}function df(i){i!==void 0&&(Ih=i);let e=Ih+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ff(i){return i*vs}function pf(i){return i*ws}function mf(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function gf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function _f(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function yf(i,e,t,n,r){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),d=s((e-n)/2),u=a((e-n)/2),f=s((n-e)/2),g=a((n-e)/2);switch(r){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*h,o*c);break;default:He("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function wn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function dt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Yi={DEG2RAD:vs,RAD2DEG:ws,generateUUID:jn,clamp:je,euclideanModulo:Xc,mapLinear:nf,inverseLerp:sf,lerp:ar,damp:rf,pingpong:of,smoothstep:af,smootherstep:lf,randInt:cf,randFloat:hf,randFloatSpread:uf,seededRandom:df,degToRad:ff,radToDeg:pf,isPowerOfTwo:mf,ceilPowerOfTwo:gf,floorPowerOfTwo:_f,setQuaternionFromProperEuler:yf,normalize:dt,denormalize:wn},Me=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ln=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],h=n[r+2],d=n[r+3],u=s[a+0],f=s[a+1],g=s[a+2],v=s[a+3];if(d!==v||l!==u||c!==f||h!==g){let m=l*u+c*f+h*g+d*v;m<0&&(u=-u,f=-f,g=-g,v=-v,m=-m);let p=1-o;if(m<.9995){let b=Math.acos(m),S=Math.sin(b);p=Math.sin(p*b)/S,o=Math.sin(o*b)/S,l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+v*o}else{l=l*p+u*o,c=c*p+f*o,h=h*p+g*o,d=d*p+v*o;let b=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=b,c*=b,h*=b,d*=b}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){let o=n[r],l=n[r+1],c=n[r+2],h=n[r+3],d=s[a],u=s[a+1],f=s[a+2],g=s[a+3];return e[t]=o*g+h*d+l*f-c*u,e[t+1]=l*g+h*u+c*d-o*f,e[t+2]=c*g+h*f+o*u-l*d,e[t+3]=h*g-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(r/2),d=o(s/2),u=l(n/2),f=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:He("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-r)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(s-c)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-r)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(je(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-r*o,this._w=a*h-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Lh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Lh.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),h=2*(o*t-s*r),d=2*(s*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-s*d,this.z=r+l*d+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return zl.copy(this).projectOnVector(e),this.sub(zl)}reflect(e){return this.sub(zl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},zl=new I,Lh=new ln,Ze=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,n,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],v=r[0],m=r[3],p=r[6],b=r[1],S=r[4],x=r[7],w=r[2],E=r[5],P=r[8];return s[0]=a*v+o*b+l*w,s[3]=a*m+o*S+l*E,s[6]=a*p+o*x+l*P,s[1]=c*v+h*b+d*w,s[4]=c*m+h*S+d*E,s[7]=c*p+h*x+d*P,s[2]=u*v+f*b+g*w,s[5]=u*m+f*S+g*E,s[8]=u*p+f*x+g*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+r*s*c-r*a*l}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*s,f=c*s-a*l,g=t*d+n*u+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return e[0]=d*v,e[1]=(r*c-h*n)*v,e[2]=(o*n-r*a)*v,e[3]=u*v,e[4]=(h*t-r*l)*v,e[5]=(r*s-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Bi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Vl.makeScale(e,t)),this}rotate(e){return Bi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Vl.makeRotation(-e)),this}translate(e,t){return Bi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Vl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Vl=new Ze,Dh=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nh=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xf(){let i={enabled:!0,workingColorSpace:ur,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ht&&(r.r=Qn(r.r),r.g=Qn(r.g),r.b=Qn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ht&&(r.r=Ss(r.r),r.g=Ss(r.g),r.b=Ss(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ti?dr:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Bi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Bi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ur]:{primaries:e,whitePoint:n,transfer:dr,toXYZ:Dh,fromXYZ:Nh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Gt},outputColorSpaceConfig:{drawingBufferColorSpace:Gt}},[Gt]:{primaries:e,whitePoint:n,transfer:ht,toXYZ:Dh,fromXYZ:Nh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Gt}}}),i}var rt=xf();function Qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ss(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var is,na=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{is===void 0&&(is=fr("canvas")),is.width=e.width,is.height=e.height;let r=is.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=is}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=fr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Qn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Qn(t[n]/255)*255):t[n]=Qn(t[n]);return{data:t,width:e.width,height:e.height}}else return He("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},vf=0,Ts=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:vf++}),this.uuid=jn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Hl(r[a].image)):s.push(Hl(r[a]))}else s=Hl(r);n.url=s}return t||(e.images[this.uuid]=n),n}};function Hl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?na.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(He("Texture: Unable to serialize Texture."),{})}var Sf=0,Gl=new I,Yt=class i extends An{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=kn,r=kn,s=Bt,a=bi,o=yn,l=Qt,c=i.DEFAULT_ANISOTROPY,h=ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=jn(),this.name="",this.source=new Ts(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Me(0,0),this.repeat=new Me(1,1),this.center=new Me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Gl).x}get height(){return this.source.getSize(Gl).y}get depth(){return this.source.getSize(Gl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){He(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){He(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Uc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qo:e.x=e.x-Math.floor(e.x);break;case kn:e.x=e.x<0?0:1;break;case ea:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qo:e.y=e.y-Math.floor(e.y);break;case kn:e.y=e.y<0?0:1;break;case ea:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Yt.DEFAULT_IMAGE=null;Yt.DEFAULT_MAPPING=Uc;Yt.DEFAULT_ANISOTROPY=1;var Mt=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let S=(c+1)/2,x=(f+1)/2,w=(p+1)/2,E=(h+u)/4,P=(d+v)/4,y=(g+m)/4;return S>x&&S>w?S<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(S),r=E/n,s=P/n):x>w?x<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),n=E/r,s=y/r):w<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),n=P/s,r=y/s),this.set(n,r,s,t),this}let b=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(d-v)/b,this.z=(u-h)/b,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=je(this.x,e.x,t.x),this.y=je(this.y,e.y,t.y),this.z=je(this.z,e.z,t.z),this.w=je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=je(this.x,e,t),this.y=je(this.y,e,t),this.z=je(this.z,e,t),this.w=je(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ia=class extends An{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Mt(0,0,e,t),this.scissorTest=!1,this.viewport=new Mt(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:n.depth},s=new Yt(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Ts(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},jt=class extends ia{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},mr=class extends Yt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var sa=class extends Yt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var gt=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,n,r,s,a,o,l,c,h,d,u,f,g,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,h,d,u,f,g,v,m)}set(e,t,n,r,s,a,o,l,c,h,d,u,f,g,v,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/ss.setFromMatrixColumn(e,0).length(),s=1/ss.setFromMatrixColumn(e,1).length(),a=1/ss.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let u=a*h,f=a*d,g=o*h,v=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*h,f=l*d,g=c*h,v=c*d;t[0]=u+v*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=v+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*h,f=l*d,g=c*h,v=c*d;t[0]=u-v*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=v-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*h,f=a*d,g=o*h,v=o*d;t[0]=l*h,t[4]=g*c-f,t[8]=u*c+v,t[1]=l*d,t[5]=v*c+u,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=v-u*d,t[8]=g*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+g,t[10]=u-v*d}else if(e.order==="XZY"){let u=a*l,f=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+v,t[5]=a*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Mf,e,bf)}lookAt(e,t,n){let r=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),ai.crossVectors(n,nn),ai.lengthSq()===0&&(Math.abs(n.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),ai.crossVectors(n,nn)),ai.normalize(),_o.crossVectors(nn,ai),r[0]=ai.x,r[4]=_o.x,r[8]=nn.x,r[1]=ai.y,r[5]=_o.y,r[9]=nn.y,r[2]=ai.z,r[6]=_o.z,r[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],b=n[3],S=n[7],x=n[11],w=n[15],E=r[0],P=r[4],y=r[8],T=r[12],D=r[1],O=r[5],H=r[9],Y=r[13],U=r[2],q=r[6],K=r[10],Z=r[14],le=r[3],te=r[7],ne=r[11],oe=r[15];return s[0]=a*E+o*D+l*U+c*le,s[4]=a*P+o*O+l*q+c*te,s[8]=a*y+o*H+l*K+c*ne,s[12]=a*T+o*Y+l*Z+c*oe,s[1]=h*E+d*D+u*U+f*le,s[5]=h*P+d*O+u*q+f*te,s[9]=h*y+d*H+u*K+f*ne,s[13]=h*T+d*Y+u*Z+f*oe,s[2]=g*E+v*D+m*U+p*le,s[6]=g*P+v*O+m*q+p*te,s[10]=g*y+v*H+m*K+p*ne,s[14]=g*T+v*Y+m*Z+p*oe,s[3]=b*E+S*D+x*U+w*le,s[7]=b*P+S*O+x*q+w*te,s[11]=b*y+S*H+x*K+w*ne,s[15]=b*T+S*Y+x*Z+w*oe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15],b=l*f-c*u,S=o*f-c*d,x=o*u-l*d,w=a*f-c*h,E=a*u-l*h,P=a*d-o*h;return t*(v*b-m*S+p*x)-n*(g*b-m*w+p*E)+r*(g*S-v*w+p*P)-s*(g*x-v*E+m*P)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(s*h-o*l)+r*(s*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],b=t*o-n*a,S=t*l-r*a,x=t*c-s*a,w=n*l-r*o,E=n*c-s*o,P=r*c-s*l,y=h*v-d*g,T=h*m-u*g,D=h*p-f*g,O=d*m-u*v,H=d*p-f*v,Y=u*p-f*m,U=b*Y-S*H+x*O+w*D-E*T+P*y;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let q=1/U;return e[0]=(o*Y-l*H+c*O)*q,e[1]=(r*H-n*Y-s*O)*q,e[2]=(v*P-m*E+p*w)*q,e[3]=(u*E-d*P-f*w)*q,e[4]=(l*D-a*Y-c*T)*q,e[5]=(t*Y-r*D+s*T)*q,e[6]=(m*x-g*P-p*S)*q,e[7]=(h*P-u*x+f*S)*q,e[8]=(a*H-o*D+c*y)*q,e[9]=(n*D-t*H-s*y)*q,e[10]=(g*E-v*x+p*b)*q,e[11]=(d*x-h*E-f*b)*q,e[12]=(o*T-a*O-l*y)*q,e[13]=(t*O-n*T+r*y)*q,e[14]=(v*S-g*w-m*b)*q,e[15]=(h*w-d*S+u*b)*q,this}scale(e){let t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+n,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,d=o+o,u=s*c,f=s*h,g=s*d,v=a*h,m=a*d,p=o*d,b=l*c,S=l*h,x=l*d,w=n.x,E=n.y,P=n.z;return r[0]=(1-(v+p))*w,r[1]=(f+x)*w,r[2]=(g-S)*w,r[3]=0,r[4]=(f-x)*E,r[5]=(1-(u+p))*E,r[6]=(m+b)*E,r[7]=0,r[8]=(g+S)*P,r[9]=(m-b)*P,r[10]=(1-(u+v))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=ss.set(r[0],r[1],r[2]).length(),o=ss.set(r[4],r[5],r[6]).length(),l=ss.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Mn.copy(this);let c=1/a,h=1/o,d=1/l;return Mn.elements[0]*=c,Mn.elements[1]*=c,Mn.elements[2]*=c,Mn.elements[4]*=h,Mn.elements[5]*=h,Mn.elements[6]*=h,Mn.elements[8]*=d,Mn.elements[9]*=d,Mn.elements[10]*=d,t.setFromRotationMatrix(Mn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=Tn,l=!1){let c=this.elements,h=2*s/(t-e),d=2*s/(n-r),u=(t+e)/(t-e),f=(n+r)/(n-r),g,v;if(l)g=s/(a-s),v=a*s/(a-s);else if(o===Tn)g=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===bs)g=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=Tn,l=!1){let c=this.elements,h=2/(t-e),d=2/(n-r),u=-(t+e)/(t-e),f=-(n+r)/(n-r),g,v;if(l)g=1/(a-s),v=a/(a-s);else if(o===Tn)g=-2/(a-s),v=-(a+s)/(a-s);else if(o===bs)g=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ss=new I,Mn=new gt,Mf=new I(0,0,0),bf=new I(1,1,1),ai=new I,_o=new I,nn=new I,Uh=new gt,Oh=new ln,ei=class i{constructor(e=0,t=0,n=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],d=r[2],u=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-je(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:He("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Uh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Uh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Oh.setFromEuler(this),this.setFromQuaternion(Oh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ei.DEFAULT_ORDER="XYZ";var As=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Ef=0,Fh=new I,rs=new ln,Yn=new gt,yo=new I,Qs=new I,wf=new I,Tf=new ln,Bh=new I(1,0,0),kh=new I(0,1,0),zh=new I(0,0,1),Vh={type:"added"},Af={type:"removed"},os={type:"childadded",child:null},Wl={type:"childremoved",child:null},Ft=class i extends An{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ef++}),this.uuid=jn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new I,t=new ei,n=new ln,r=new I(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new gt},normalMatrix:{value:new Ze}}),this.matrix=new gt,this.matrixWorld=new gt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new As,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.multiply(rs),this}rotateOnWorldAxis(e,t){return rs.setFromAxisAngle(e,t),this.quaternion.premultiply(rs),this}rotateX(e){return this.rotateOnAxis(Bh,e)}rotateY(e){return this.rotateOnAxis(kh,e)}rotateZ(e){return this.rotateOnAxis(zh,e)}translateOnAxis(e,t){return Fh.copy(e).applyQuaternion(this.quaternion),this.position.add(Fh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Bh,e)}translateY(e){return this.translateOnAxis(kh,e)}translateZ(e){return this.translateOnAxis(zh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?yo.copy(e):yo.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(Qs,yo,this.up):Yn.lookAt(yo,Qs,this.up),this.quaternion.setFromRotationMatrix(Yn),r&&(Yn.extractRotation(r.matrixWorld),rs.setFromRotationMatrix(Yn),this.quaternion.premultiply(rs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ge("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Vh),os.child=e,this.dispatchEvent(os),os.child=null):Ge("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Af),Wl.child=e,this.dispatchEvent(Wl),Wl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Vh),os.child=e,this.dispatchEvent(os),os.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,e,wf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,Tf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ft.DEFAULT_UP=new I(0,1,0);Ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var on=class extends Ft{constructor(){super(),this.isGroup=!0,this.type="Group"}},Rf={type:"move"},Rs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new on,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new on,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new on,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let m=t.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Rf)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new on;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},qu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},xo={h:0,s:0,l:0};function Xl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Je=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,rt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=rt.workingColorSpace){return this.r=e,this.g=t,this.b=n,rt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=rt.workingColorSpace){if(e=Xc(e,1),t=je(t,0,1),n=je(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Xl(a,s,e+1/3),this.g=Xl(a,s,e),this.b=Xl(a,s,e-1/3)}return rt.colorSpaceToWorking(this,r),this}setStyle(e,t=Gt){function n(s){s!==void 0&&parseFloat(s)<1&&He("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:He("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);He("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Gt){let n=qu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):He("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qn(e.r),this.g=Qn(e.g),this.b=Qn(e.b),this}copyLinearToSRGB(e){return this.r=Ss(e.r),this.g=Ss(e.g),this.b=Ss(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Gt){return rt.workingToColorSpace(Ht.copy(this),e),Math.round(je(Ht.r*255,0,255))*65536+Math.round(je(Ht.g*255,0,255))*256+Math.round(je(Ht.b*255,0,255))}getHexString(e=Gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=rt.workingColorSpace){rt.workingToColorSpace(Ht.copy(this),t);let n=Ht.r,r=Ht.g,s=Ht.b,a=Math.max(n,r,s),o=Math.min(n,r,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-n)/d+2;break;case s:l=(n-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=rt.workingColorSpace){return rt.workingToColorSpace(Ht.copy(this),t),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=Gt){rt.workingToColorSpace(Ht.copy(this),e);let t=Ht.r,n=Ht.g,r=Ht.b;return e!==Gt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(li),this.setHSL(li.h+e,li.s+t,li.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(li),e.getHSL(xo);let n=ar(li.h,xo.h,t),r=ar(li.s,xo.s,t),s=ar(li.l,xo.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ht=new Je;Je.NAMES=qu;var gr=class i{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Je(e),this.near=t,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},_r=class extends Ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ei,this.environmentIntensity=1,this.environmentRotation=new ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},bn=new I,$n=new I,ql=new I,Zn=new I,as=new I,ls=new I,Hh=new I,Yl=new I,$l=new I,Zl=new I,Jl=new Mt,Kl=new Mt,jl=new Mt,Bn=class i{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),bn.subVectors(e,t),r.cross(bn);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){bn.subVectors(r,t),$n.subVectors(n,t),ql.subVectors(e,t);let a=bn.dot(bn),o=bn.dot($n),l=bn.dot(ql),c=$n.dot($n),h=$n.dot(ql),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,g=(a*h-o*l)*u;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,Zn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Zn.x),l.addScaledVector(a,Zn.y),l.addScaledVector(o,Zn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return Jl.setScalar(0),Kl.setScalar(0),jl.setScalar(0),Jl.fromBufferAttribute(e,t),Kl.fromBufferAttribute(e,n),jl.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Jl,s.x),a.addScaledVector(Kl,s.y),a.addScaledVector(jl,s.z),a}static isFrontFacing(e,t,n,r){return bn.subVectors(n,t),$n.subVectors(e,t),bn.cross($n).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bn.subVectors(this.c,this.b),$n.subVectors(this.a,this.b),bn.cross($n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return i.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,s=this.c,a,o;as.subVectors(r,n),ls.subVectors(s,n),Yl.subVectors(e,n);let l=as.dot(Yl),c=ls.dot(Yl);if(l<=0&&c<=0)return t.copy(n);$l.subVectors(e,r);let h=as.dot($l),d=ls.dot($l);if(h>=0&&d<=h)return t.copy(r);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(as,a);Zl.subVectors(e,s);let f=as.dot(Zl),g=ls.dot(Zl);if(g>=0&&f<=g)return t.copy(s);let v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(ls,o);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return Hh.subVectors(s,r),o=(d-h)/(d-h+(f-g)),t.copy(r).addScaledVector(Hh,o);let p=1/(m+v+u);return a=v*p,o=u*p,t.copy(n).addScaledVector(as,a).addScaledVector(ls,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Rn=class{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(En.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(En.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=En.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,En):En.fromBufferAttribute(s,a),En.applyMatrix4(e.matrixWorld),this.expandByPoint(En);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),vo.copy(n.boundingBox)),vo.applyMatrix4(e.matrixWorld),this.union(vo)}let r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,En),En.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(er),So.subVectors(this.max,er),cs.subVectors(e.a,er),hs.subVectors(e.b,er),us.subVectors(e.c,er),ci.subVectors(hs,cs),hi.subVectors(us,hs),Ni.subVectors(cs,us);let t=[0,-ci.z,ci.y,0,-hi.z,hi.y,0,-Ni.z,Ni.y,ci.z,0,-ci.x,hi.z,0,-hi.x,Ni.z,0,-Ni.x,-ci.y,ci.x,0,-hi.y,hi.x,0,-Ni.y,Ni.x,0];return!Ql(t,cs,hs,us,So)||(t=[1,0,0,0,1,0,0,0,1],!Ql(t,cs,hs,us,So))?!1:(Mo.crossVectors(ci,hi),t=[Mo.x,Mo.y,Mo.z],Ql(t,cs,hs,us,So))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,En).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(En).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Jn=[new I,new I,new I,new I,new I,new I,new I,new I],En=new I,vo=new Rn,cs=new I,hs=new I,us=new I,ci=new I,hi=new I,Ni=new I,er=new I,So=new I,Mo=new I,Ui=new I;function Ql(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){Ui.fromArray(i,s);let o=r.x*Math.abs(Ui.x)+r.y*Math.abs(Ui.y)+r.z*Math.abs(Ui.z),l=e.dot(Ui),c=t.dot(Ui),h=n.dot(Ui);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Ct=new I,bo=new Me,Cf=0,an=class extends An{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Cf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Gc,this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)bo.fromBufferAttribute(this,t),bo.applyMatrix3(e),this.setXY(t,bo.x,bo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix3(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix4(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyNormalMatrix(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.transformDirection(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=dt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),r=dt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),r=dt(r,this.array),s=dt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var yr=class extends an{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var xr=class extends an{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var at=class extends an{constructor(e,t,n){super(new Float32Array(e),t,n)}},Pf=new Rn,tr=new I,ec=new I,ki=class{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Pf.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;tr.subVectors(e,this.center);let t=tr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(tr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ec.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(tr.copy(e.center).add(ec)),this.expandByPoint(tr.copy(e.center).sub(ec))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},If=0,fn=new gt,tc=new Ft,ds=new I,sn=new Rn,nr=new Rn,Ut=new I,Pt=class i extends An{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:If++}),this.uuid=jn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ef(e)?xr:yr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Ze().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return fn.makeRotationFromQuaternion(e),this.applyMatrix4(fn),this}rotateX(e){return fn.makeRotationX(e),this.applyMatrix4(fn),this}rotateY(e){return fn.makeRotationY(e),this.applyMatrix4(fn),this}rotateZ(e){return fn.makeRotationZ(e),this.applyMatrix4(fn),this}translate(e,t,n){return fn.makeTranslation(e,t,n),this.applyMatrix4(fn),this}scale(e,t,n){return fn.makeScale(e,t,n),this.applyMatrix4(fn),this}lookAt(e){return tc.lookAt(e),tc.updateMatrix(),this.applyMatrix4(tc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ds).negate(),this.translate(ds.x,ds.y,ds.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let r=0,s=e.length;r<s;r++){let a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new at(n,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&He("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ge("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){let s=t[n];sn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ut.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Ut),Ut.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Ut)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ge('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ki);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ge("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){let n=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];nr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ut.addVectors(sn.min,nr.min),sn.expandByPoint(Ut),Ut.addVectors(sn.max,nr.max),sn.expandByPoint(Ut)):(sn.expandByPoint(nr.min),sn.expandByPoint(nr.max))}sn.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Ut.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Ut));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ut.fromBufferAttribute(o,c),l&&(ds.fromBufferAttribute(e,c),Ut.add(ds)),r=Math.max(r,n.distanceToSquared(Ut))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ge('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ge("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,r=t.normal,s=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new an(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let y=0;y<n.count;y++)o[y]=new I,l[y]=new I;let c=new I,h=new I,d=new I,u=new Me,f=new Me,g=new Me,v=new I,m=new I;function p(y,T,D){c.fromBufferAttribute(n,y),h.fromBufferAttribute(n,T),d.fromBufferAttribute(n,D),u.fromBufferAttribute(s,y),f.fromBufferAttribute(s,T),g.fromBufferAttribute(s,D),h.sub(c),d.sub(c),f.sub(u),g.sub(u);let O=1/(f.x*g.y-g.x*f.y);isFinite(O)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(O),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(O),o[y].add(v),o[T].add(v),o[D].add(v),l[y].add(m),l[T].add(m),l[D].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let y=0,T=b.length;y<T;++y){let D=b[y],O=D.start,H=D.count;for(let Y=O,U=O+H;Y<U;Y+=3)p(e.getX(Y+0),e.getX(Y+1),e.getX(Y+2))}let S=new I,x=new I,w=new I,E=new I;function P(y){w.fromBufferAttribute(r,y),E.copy(w);let T=o[y];S.copy(T),S.sub(w.multiplyScalar(w.dot(T))).normalize(),x.crossVectors(E,T);let O=x.dot(l[y])<0?-1:1;a.setXYZW(y,S.x,S.y,S.z,O)}for(let y=0,T=b.length;y<T;++y){let D=b[y],O=D.start,H=D.count;for(let Y=O,U=O+H;Y<U;Y+=3)P(e.getX(Y+0)),P(e.getX(Y+1)),P(e.getX(Y+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new an(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let r=new I,s=new I,a=new I,o=new I,l=new I,c=new I,h=new I,d=new I;if(e)for(let u=0,f=e.count;u<f;u+=3){let g=e.getX(u+0),v=e.getX(u+1),m=e.getX(u+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ut.fromBufferAttribute(e,t),Ut.normalize(),e.setXYZ(t,Ut.x,Ut.y,Ut.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new an(u,h,d)}if(this.index===null)return He("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,r=this.attributes;for(let o in r){let l=r[o],c=e(l,n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let c in r){let h=r[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],d=s[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},ra=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Gc,this.updateRanges=[],this.version=0,this.uuid=jn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=jn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=jn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},qt=new I,vr=class i{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix4(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyNormalMatrix(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.transformDirection(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=dt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=wn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=wn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=wn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=wn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),r=dt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=dt(t,this.array),n=dt(n,this.array),r=dt(r,this.array),s=dt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){pr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new an(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){pr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},nc=new I,Lf=new I,Df=new Ze,rn=class{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=nc.subVectors(n,t).cross(Lf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(nc),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Df.getNormalMatrix(e),r=this.coplanarPoint(nc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Nf=0,Vn=class extends An{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=jn(),this.name="",this.type="Material",this.blending=Fs,this.side=Si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Tc,this.blendDst=Ac,this.blendEquation=Xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=Ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Uu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xo,this.stencilZFail=Xo,this.stencilZPass=Xo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){He(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){He(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(t){let s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Je().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new rn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Me().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Me().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Cs=class extends Vn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Je(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},fs,ir=new I,ps=new I,ms=new I,gs=new Me,sr=new Me,Yu=new gt,Eo=new I,rr=new I,wo=new I,Gh=new Me,ic=new Me,Wh=new Me,Sr=class extends Ft{constructor(e=new Cs){if(super(),this.isSprite=!0,this.type="Sprite",fs===void 0){fs=new Pt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ra(t,5);fs.setIndex([0,1,2,0,2,3]),fs.setAttribute("position",new vr(n,3,0,!1)),fs.setAttribute("uv",new vr(n,2,3,!1))}this.geometry=fs,this.material=e,this.center=new Me(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Ge('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ps.setFromMatrixScale(this.matrixWorld),Yu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ms.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ps.multiplyScalar(-ms.z);let n=this.material.rotation,r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));let a=this.center;To(Eo.set(-.5,-.5,0),ms,a,ps,r,s),To(rr.set(.5,-.5,0),ms,a,ps,r,s),To(wo.set(.5,.5,0),ms,a,ps,r,s),Gh.set(0,0),ic.set(1,0),Wh.set(1,1);let o=e.ray.intersectTriangle(Eo,rr,wo,!1,ir);if(o===null&&(To(rr.set(-.5,.5,0),ms,a,ps,r,s),ic.set(0,1),o=e.ray.intersectTriangle(Eo,wo,rr,!1,ir),o===null))return;let l=e.ray.origin.distanceTo(ir);l<e.near||l>e.far||t.push({distance:l,point:ir.clone(),uv:Bn.getInterpolation(ir,Eo,rr,wo,Gh,ic,Wh,new Me),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function To(i,e,t,n,r,s){gs.subVectors(i,t).addScalar(.5).multiply(n),r!==void 0?(sr.x=s*gs.x-r*gs.y,sr.y=r*gs.x+s*gs.y):sr.copy(gs),i.copy(e),i.x+=sr.x,i.y+=sr.y,i.applyMatrix4(Yu)}var Kn=new I,sc=new I,Ao=new I,Ro=new I,di=class{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Kn.copy(this.origin).addScaledVector(this.direction,t),Kn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){sc.copy(e).add(t).multiplyScalar(.5),Ao.copy(t).sub(e).normalize(),Ro.copy(this.origin).sub(sc);let s=e.distanceTo(t)*.5,a=-this.direction.dot(Ao),o=Ro.dot(this.direction),l=-Ro.dot(Ao),c=Ro.lengthSq(),h=Math.abs(1-a*a),d,u,f,g;if(h>0)if(d=a*l-o,u=a*o-l,g=s*h,d>=0)if(u>=-g)if(u<=g){let v=1/h;d*=v,u*=v,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-s,-l),s),f=u*(u+2*l)+c):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(sc).addScaledVector(Ao,u),f}intersectSphere(e,t){if(e.radius<0)return null;Kn.subVectors(e.center,this.origin);let n=Kn.dot(this.direction),r=Kn.dot(Kn)-n*n,s=e.radius*e.radius;if(r>s)return null;let a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Kn)!==null}intersectTriangle(e,t,n,r,s){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=e.x-a.x,u=e.y-a.y,f=e.z-a.z,g=t.x-a.x,v=t.y-a.y,m=t.z-a.z,p=n.x-a.x,b=n.y-a.y,S=n.z-a.z,x=Math.abs(l),w=Math.abs(c),E=Math.abs(h),P,y,T,D,O,H,Y,U,q,K,Z,le;if(x>=w&&x>=E?(T=l,H=d,q=g,le=p,l>=0?(P=c,y=h,D=u,O=f,Y=v,U=m,K=b,Z=S):(P=h,y=c,D=f,O=u,Y=m,U=v,K=S,Z=b)):w>=E?(T=c,H=u,q=v,le=b,c>=0?(P=h,y=l,D=f,O=d,Y=m,U=g,K=S,Z=p):(P=l,y=h,D=d,O=f,Y=g,U=m,K=p,Z=S)):(T=h,H=f,q=m,le=S,h>=0?(P=l,y=c,D=d,O=u,Y=g,U=v,K=p,Z=b):(P=c,y=l,D=u,O=d,Y=v,U=g,K=b,Z=p)),T===0)return null;let te=P/T,ne=y/T,oe=1/T,Oe=D-te*H,Ae=O-ne*H,tt=Y-te*q,Be=U-ne*q,ot=K-te*le,j=Z-ne*le,re=ot*Be-j*tt,Pe=Oe*j-Ae*ot,We=tt*Ae-Be*Oe;if(r){if(re<0||Pe<0||We<0)return null}else if((re<0||Pe<0||We<0)&&(re>0||Pe>0||We>0))return null;let Re=re+Pe+We;if(Re===0)return null;let Xe=oe*(re*H+Pe*q+We*le);return(Re>0?Xe<0:Xe>0)?null:this.at(Xe/Re,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},cn=class extends Vn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=Rc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Xh=new gt,Oi=new di,Co=new ki,qh=new I,Po=new I,Io=new I,Lo=new I,rc=new I,Do=new I,Yh=new I,No=new I,$t=class extends Ft{constructor(e=new Pt,t=new cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(s&&o){Do.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],d=s[l];h!==0&&(rc.fromBufferAttribute(d,e),a?Do.addScaledVector(rc,h):Do.addScaledVector(rc.sub(t),h))}t.add(Do)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Co.copy(n.boundingSphere),Co.applyMatrix4(s),Oi.copy(e.ray).recast(e.near),!(Co.containsPoint(Oi.origin)===!1&&(Oi.intersectSphere(Co,qh)===null||Oi.origin.distanceToSquared(qh)>(e.far-e.near)**2))&&(Xh.copy(s).invert(),Oi.copy(e.ray).applyMatrix4(Xh),!(n.boundingBox!==null&&Oi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Oi)))}_computeIntersections(e,t,n){let r,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){let m=u[g],p=a[m.materialIndex],b=Math.max(m.start,f.start),S=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=b,w=S;x<w;x+=3){let E=o.getX(x),P=o.getX(x+1),y=o.getX(x+2);r=Uo(this,p,e,n,c,h,d,E,P,y),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){let b=o.getX(m),S=o.getX(m+1),x=o.getX(m+2);r=Uo(this,a,e,n,c,h,d,b,S,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){let m=u[g],p=a[m.materialIndex],b=Math.max(m.start,f.start),S=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=b,w=S;x<w;x+=3){let E=x,P=x+1,y=x+2;r=Uo(this,p,e,n,c,h,d,E,P,y),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){let b=m,S=m+1,x=m+2;r=Uo(this,a,e,n,c,h,d,b,S,x),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function Uf(i,e,t,n,r,s,a,o){let l;if(e.side===Zt?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===Si,o),l===null)return null;No.copy(o),No.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(No);return c<t.near||c>t.far?null:{distance:c,point:No.clone(),object:i}}function Uo(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Po),i.getVertexPosition(l,Io),i.getVertexPosition(c,Lo);let h=Uf(i,e,t,n,Po,Io,Lo,Yh);if(h){let d=new I;Bn.getBarycoord(Yh,Po,Io,Lo,d),r&&(h.uv=Bn.getInterpolatedAttribute(r,o,l,c,d,new Me)),s&&(h.uv1=Bn.getInterpolatedAttribute(s,o,l,c,d,new Me)),a&&(h.normal=Bn.getInterpolatedAttribute(a,o,l,c,d,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new I,materialIndex:0};Bn.getNormal(Po,Io,Lo,u.normal),h.face=u,h.barycoord=d}return h}var oa=class extends Yt{constructor(e=null,t=1,n=1,r,s,a,o,l,c=Ot,h=Ot,d,u){super(null,a,o,l,c,h,r,s,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Fi=new ki,Of=new Me(.5,.5),Oo=new I,Ps=class{constructor(e=new rn,t=new rn,n=new rn,r=new rn,s=new rn,a=new rn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Tn,n=!1){let r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],d=s[5],u=s[6],f=s[7],g=s[8],v=s[9],m=s[10],p=s[11],b=s[12],S=s[13],x=s[14],w=s[15];if(r[0].setComponents(c-a,f-h,p-g,w-b).normalize(),r[1].setComponents(c+a,f+h,p+g,w+b).normalize(),r[2].setComponents(c+o,f+d,p+v,w+S).normalize(),r[3].setComponents(c-o,f-d,p-v,w-S).normalize(),n)r[4].setComponents(l,u,m,x).normalize(),r[5].setComponents(c-l,f-u,p-m,w-x).normalize();else if(r[4].setComponents(c-l,f-u,p-m,w-x).normalize(),t===Tn)r[5].setComponents(c+l,f+u,p+m,w+x).normalize();else if(t===bs)r[5].setComponents(l,u,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Fi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Fi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Fi)}intersectsSprite(e){Fi.center.set(0,0,0);let t=Of.distanceTo(e.center);return Fi.radius=.7071067811865476+t,Fi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Oo.x=r.normal.x>0?e.max.x:e.min.x,Oo.y=r.normal.y>0?e.max.y:e.min.y,Oo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Oo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var fi=class extends Vn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},aa=new I,la=new I,$h=new gt,or=new di,Fo=new ki,oc=new I,Zh=new I,ca=class extends Ft{constructor(e=new Pt,t=new fi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)aa.fromBufferAttribute(t,r-1),la.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=aa.distanceTo(la);e.setAttribute("lineDistance",new at(n,1))}else He("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fo.copy(n.boundingSphere),Fo.applyMatrix4(r),Fo.radius+=s,e.ray.intersectsSphere(Fo)===!1)return;$h.copy(r).invert(),or.copy(e.ray).applyMatrix4($h);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=f,m=g-1;v<m;v+=c){let p=h.getX(v),b=h.getX(v+1),S=Bo(this,e,or,l,p,b,v);S&&t.push(S)}if(this.isLineLoop){let v=h.getX(g-1),m=h.getX(f),p=Bo(this,e,or,l,v,m,g-1);p&&t.push(p)}}else{let f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=f,m=g-1;v<m;v+=c){let p=Bo(this,e,or,l,v,v+1,v);p&&t.push(p)}if(this.isLineLoop){let v=Bo(this,e,or,l,g-1,f,g-1);v&&t.push(v)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){let o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function Bo(i,e,t,n,r,s,a){let o=i.geometry.attributes.position;if(aa.fromBufferAttribute(o,r),la.fromBufferAttribute(o,s),t.distanceSqToSegment(aa,la,oc,Zh)>n)return;oc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(oc);if(!(c<e.near||c>e.far))return{distance:c,point:Zh.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Jh=new I,Kh=new I,zi=class extends ca{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Jh.fromBufferAttribute(t,r),Kh.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Jh.distanceTo(Kh);e.setAttribute("lineDistance",new at(n,1))}else He("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Mr=class extends Yt{constructor(e=[],t=Mi,n,r,s,a,o,l,c,h){super(e,t,n,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},br=class extends Yt{constructor(e,t,n,r,s,a,o,l,c){super(e,t,n,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var pi=class extends Yt{constructor(e,t,n=In,r,s,a,o=Ot,l=Ot,c,h=zn,d=1){if(h!==zn&&h!==Ei)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,r,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ts(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},ha=class extends pi{constructor(e,t=In,n=Mi,r,s,a=Ot,o=Ot,l,c=zn){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Er=class extends Yt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},mi=class i extends Pt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};let o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new at(c,3)),this.setAttribute("normal",new at(h,3)),this.setAttribute("uv",new at(d,2));function g(v,m,p,b,S,x,w,E,P,y,T){let D=x/P,O=w/y,H=x/2,Y=w/2,U=E/2,q=P+1,K=y+1,Z=0,le=0,te=new I;for(let ne=0;ne<K;ne++){let oe=ne*O-Y;for(let Oe=0;Oe<q;Oe++){let Ae=Oe*D-H;te[v]=Ae*b,te[m]=oe*S,te[p]=U,c.push(te.x,te.y,te.z),te[v]=0,te[m]=0,te[p]=E>0?1:-1,h.push(te.x,te.y,te.z),d.push(Oe/P),d.push(1-ne/y),Z+=1}}for(let ne=0;ne<y;ne++)for(let oe=0;oe<P;oe++){let Oe=u+oe+q*ne,Ae=u+oe+q*(ne+1),tt=u+(oe+1)+q*(ne+1),Be=u+(oe+1)+q*ne;l.push(Oe,Ae,Be),l.push(Ae,tt,Be),le+=6}o.addGroup(f,le,T),f+=le,u+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var pn=class i extends Pt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),s=Math.floor(s);let h=[],d=[],u=[],f=[],g=0,v=[],m=n/2,p=0;b(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new at(d,3)),this.setAttribute("normal",new at(u,3)),this.setAttribute("uv",new at(f,2));function b(){let x=new I,w=new I,E=0,P=(t-e)/n;for(let y=0;y<=s;y++){let T=[],D=y/s,O=D*(t-e)+e;for(let H=0;H<=r;H++){let Y=H/r,U=Y*l+o,q=Math.sin(U),K=Math.cos(U);w.x=O*q,w.y=-D*n+m,w.z=O*K,d.push(w.x,w.y,w.z),x.set(q,P,K).normalize(),u.push(x.x,x.y,x.z),f.push(Y,1-D),T.push(g++)}v.push(T)}for(let y=0;y<r;y++)for(let T=0;T<s;T++){let D=v[T][y],O=v[T+1][y],H=v[T+1][y+1],Y=v[T][y+1];(e>0||T!==0)&&(h.push(D,O,Y),E+=3),(t>0||T!==s-1)&&(h.push(O,H,Y),E+=3)}c.addGroup(p,E,0),p+=E}function S(x){let w=g,E=new Me,P=new I,y=0,T=x===!0?e:t,D=x===!0?1:-1;for(let H=1;H<=r;H++)d.push(0,m*D,0),u.push(0,D,0),f.push(.5,.5),g++;let O=g;for(let H=0;H<=r;H++){let U=H/r*l+o,q=Math.cos(U),K=Math.sin(U);P.x=T*K,P.y=m*D,P.z=T*q,d.push(P.x,P.y,P.z),u.push(0,D,0),E.x=q*.5+.5,E.y=K*.5*D+.5,f.push(E.x,E.y),g++}for(let H=0;H<r;H++){let Y=w+H,U=O+H;x===!0?h.push(U,U+1,Y):h.push(U+1,U,Y),y+=3}c.addGroup(p,y,x===!0?1:2),p+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},gi=class i extends pn{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ua=class i extends Pt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};let s=[],a=[];o(r),c(n),h(),this.setAttribute("position",new at(s,3)),this.setAttribute("normal",new at(s.slice(),3)),this.setAttribute("uv",new at(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(b){let S=new I,x=new I,w=new I;for(let E=0;E<t.length;E+=3)f(t[E+0],S),f(t[E+1],x),f(t[E+2],w),l(S,x,w,b)}function l(b,S,x,w){let E=w+1,P=[];for(let y=0;y<=E;y++){P[y]=[];let T=b.clone().lerp(x,y/E),D=S.clone().lerp(x,y/E),O=E-y;for(let H=0;H<=O;H++)H===0&&y===E?P[y][H]=T:P[y][H]=T.clone().lerp(D,H/O)}for(let y=0;y<E;y++)for(let T=0;T<2*(E-y)-1;T++){let D=Math.floor(T/2);T%2===0?(u(P[y][D+1]),u(P[y+1][D]),u(P[y][D])):(u(P[y][D+1]),u(P[y+1][D+1]),u(P[y+1][D]))}}function c(b){let S=new I;for(let x=0;x<s.length;x+=3)S.x=s[x+0],S.y=s[x+1],S.z=s[x+2],S.normalize().multiplyScalar(b),s[x+0]=S.x,s[x+1]=S.y,s[x+2]=S.z}function h(){let b=new I;for(let S=0;S<s.length;S+=3){b.x=s[S+0],b.y=s[S+1],b.z=s[S+2];let x=m(b)/2/Math.PI+.5,w=p(b)/Math.PI+.5;a.push(x,1-w)}g(),d()}function d(){for(let b=0;b<a.length;b+=6){let S=a[b+0],x=a[b+2],w=a[b+4],E=Math.max(S,x,w),P=Math.min(S,x,w);E>.9&&P<.1&&(S<.2&&(a[b+0]+=1),x<.2&&(a[b+2]+=1),w<.2&&(a[b+4]+=1))}}function u(b){s.push(b.x,b.y,b.z)}function f(b,S){let x=b*3;S.x=e[x+0],S.y=e[x+1],S.z=e[x+2]}function g(){let b=new I,S=new I,x=new I,w=new I,E=new Me,P=new Me,y=new Me;for(let T=0,D=0;T<s.length;T+=9,D+=6){b.set(s[T+0],s[T+1],s[T+2]),S.set(s[T+3],s[T+4],s[T+5]),x.set(s[T+6],s[T+7],s[T+8]),E.set(a[D+0],a[D+1]),P.set(a[D+2],a[D+3]),y.set(a[D+4],a[D+5]),w.copy(b).add(S).add(x).divideScalar(3);let O=m(w);v(E,D+0,b,O),v(P,D+2,S,O),v(y,D+4,x,O)}}function v(b,S,x,w){w<0&&b.x===1&&(a[S]=b.x-1),x.x===0&&x.z===0&&(a[S]=w/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function p(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}};var ko=new I,zo=new I,ac=new I,Vo=new Bn,wr=class extends Pt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),s=Math.cos(vs*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let g=0;g<l;g+=3){a?(c[0]=a.getX(g),c[1]=a.getX(g+1),c[2]=a.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:v,b:m,c:p}=Vo;if(v.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),p.fromBufferAttribute(o,c[2]),Vo.getNormal(ac),d[0]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,d[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,d[2]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let b=0;b<3;b++){let S=(b+1)%3,x=d[b],w=d[S],E=Vo[h[b]],P=Vo[h[S]],y=`${x}_${w}`,T=`${w}_${x}`;T in u&&u[T]?(ac.dot(u[T].normal)<=s&&(f.push(E.x,E.y,E.z),f.push(P.x,P.y,P.z)),u[T]=null):y in u||(u[y]={index0:c[b],index1:c[S],normal:ac.clone()})}}for(let g in u)if(u[g]){let{index0:v,index1:m}=u[g];ko.fromBufferAttribute(o,v),zo.fromBufferAttribute(o,m),f.push(ko.x,ko.y,ko.z),f.push(zo.x,zo.y,zo.z)}this.setAttribute("position",new at(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},hn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){He("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,s=n.length,a;t?a=t:a=e*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===a)return r/(s-1);let h=n[r],u=n[r+1]-h,f=(a-h)/u;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new Me:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new I,r=[],s=[],a=[],o=new I,l=new gt;for(let f=0;f<=e;f++){let g=f/e;r[f]=this.getTangentAt(g,new I)}s[0]=new I,a[0]=new I;let c=Number.MAX_VALUE,h=Math.abs(r[0].x),d=Math.abs(r[0].y),u=Math.abs(r[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(je(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(je(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],f*g)),a[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Tr=class extends hn{constructor(e=0,t=0,n=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new Me){let n=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},da=class extends Tr{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function qc(){let i=0,e=0,t=0,n=0;function r(s,a,o,l){i=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,d){let u=(a-s)/c-(o-s)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,r(a,o,u,f)},calc:function(s){let a=s*s,o=a*s;return i+e*s+t*a+n*o}}}var jh=new I,Qh=new I,lc=new qc,cc=new qc,hc=new qc,Is=class extends hn{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new I){let n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=r[(o-1)%s]:(Qh.subVectors(r[0],r[1]).add(r[0]),c=Qh);let d=r[o%s],u=r[(o+1)%s];if(this.closed||o+2<s?h=r[(o+2)%s]:(jh.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=jh),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),lc.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,v,m),cc.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,v,m),hc.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(lc.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),cc.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),hc.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(lc.calc(l),cc.calc(l),hc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new I().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function eu(i,e,t,n,r){let s=(n-e)*.5,a=(r-t)*.5,o=i*i,l=i*o;return(2*t-2*n+s+a)*l+(-3*t+3*n-2*s-a)*o+s*i+t}function Ff(i,e){let t=1-i;return t*t*e}function Bf(i,e){return 2*(1-i)*i*e}function kf(i,e){return i*i*e}function lr(i,e,t,n){return Ff(i,e)+Bf(i,t)+kf(i,n)}function zf(i,e){let t=1-i;return t*t*t*e}function Vf(i,e){let t=1-i;return 3*t*t*i*e}function Hf(i,e){return 3*(1-i)*i*i*e}function Gf(i,e){return i*i*i*e}function cr(i,e,t,n,r){return zf(i,e)+Vf(i,t)+Hf(i,n)+Gf(i,r)}var fa=class extends hn{constructor(e=new Me,t=new Me,n=new Me,r=new Me){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new Me){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(cr(e,r.x,s.x,a.x,o.x),cr(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Vi=class extends hn{constructor(e=new I,t=new I,n=new I,r=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new I){let n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(cr(e,r.x,s.x,a.x,o.x),cr(e,r.y,s.y,a.y,o.y),cr(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},pa=class extends hn{constructor(e=new Me,t=new Me){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Me){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Me){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ma=class extends hn{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ga=class extends hn{constructor(e=new Me,t=new Me,n=new Me){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Me){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(lr(e,r.x,s.x,a.x),lr(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ar=class extends hn{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){let n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(lr(e,r.x,s.x,a.x),lr(e,r.y,s.y,a.y),lr(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},_a=class extends hn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Me){let n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],h=r[a>r.length-2?r.length-1:a+1],d=r[a>r.length-3?r.length-1:a+2];return n.set(eu(o,l.x,c.x,h.x,d.x),eu(o,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let r=e.points[t];this.points.push(new Me().fromArray(r))}return this}},_c=Object.freeze({__proto__:null,ArcCurve:da,CatmullRomCurve3:Is,CubicBezierCurve:fa,CubicBezierCurve3:Vi,EllipseCurve:Tr,LineCurve:pa,LineCurve3:ma,QuadraticBezierCurve:ga,QuadraticBezierCurve3:Ar,SplineCurve:_a}),Rr=class extends hn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new _c[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=n){let a=r[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,s=this.curves;r<s.length;r++){let a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let r=e.curves[t];this.curves.push(new _c[r.type]().fromJSON(r))}return this}};var Hi=class i extends ua{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Cr=class i extends Pt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,h=l+1,d=e/o,u=t/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){let b=p*u-a;for(let S=0;S<c;S++){let x=S*d-s;g.push(x,-b,0),v.push(0,0,1),m.push(S/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<o;b++){let S=b+c*p,x=b+c*(p+1),w=b+1+c*(p+1),E=b+1+c*p;f.push(S,x,E),f.push(x,w,E)}this.setIndex(f),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(v,3)),this.setAttribute("uv",new at(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Pr=class i extends Pt{constructor(e=.5,t=1,n=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],l=[],c=[],h=[],d=e,u=(t-e)/r,f=new I,g=new Me;for(let v=0;v<=r;v++){for(let m=0;m<=n;m++){let p=s+m/n*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}d+=u}for(let v=0;v<r;v++){let m=v*(n+1);for(let p=0;p<n;p++){let b=p+m,S=b,x=b+n+1,w=b+n+2,E=b+1;o.push(S,x,E),o.push(x,w,E)}}this.setIndex(o),this.setAttribute("position",new at(l,3)),this.setAttribute("normal",new at(c,3)),this.setAttribute("uv",new at(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var _i=class i extends Pt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new I,u=new I,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){let b=[],S=p/n,x=a+S*o,w=e*Math.cos(x),E=Math.sqrt(e*e-w*w),P=0;p===0&&a===0?P=.5/t:p===n&&l===Math.PI&&(P=-.5/t);for(let y=0;y<=t;y++){let T=y/t,D=r+T*s;d.x=-E*Math.cos(D),d.y=w,d.z=E*Math.sin(D),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),m.push(T+P,1-S),b.push(c++)}h.push(b)}for(let p=0;p<n;p++)for(let b=0;b<t;b++){let S=h[p][b+1],x=h[p][b],w=h[p+1][b],E=h[p+1][b+1];(p!==0||a>0)&&f.push(S,x,E),(p!==n-1||l<Math.PI)&&f.push(x,w,E)}this.setIndex(f),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(v,3)),this.setAttribute("uv",new at(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var mn=class i extends Pt{constructor(e=1,t=.4,n=12,r=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let l=[],c=[],h=[],d=[],u=new I,f=new I,g=new I;for(let v=0;v<=n;v++){let m=a+v/n*o;for(let p=0;p<=r;p++){let b=p/r*s;f.x=(e+t*Math.cos(m))*Math.cos(b),f.y=(e+t*Math.cos(m))*Math.sin(b),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),u.x=e*Math.cos(b),u.y=e*Math.sin(b),g.subVectors(f,u).normalize(),h.push(g.x,g.y,g.z),d.push(p/r),d.push(v/n)}}for(let v=1;v<=n;v++)for(let m=1;m<=r;m++){let p=(r+1)*v+m-1,b=(r+1)*(v-1)+m-1,S=(r+1)*(v-1)+m,x=(r+1)*v+m;l.push(p,b,x),l.push(b,S,x)}this.setIndex(l),this.setAttribute("position",new at(c,3)),this.setAttribute("normal",new at(h,3)),this.setAttribute("uv",new at(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var Ls=class i extends Pt{constructor(e=new Ar(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new I,l=new I,c=new Me,h=new I,d=[],u=[],f=[],g=[];v(),this.setIndex(g),this.setAttribute("position",new at(d,3)),this.setAttribute("normal",new at(u,3)),this.setAttribute("uv",new at(f,2));function v(){for(let S=0;S<t;S++)m(S);m(s===!1?t:0),b(),p()}function m(S){h=e.getPointAt(S/t,h);let x=a.normals[S],w=a.binormals[S];for(let E=0;E<=r;E++){let P=E/r*Math.PI*2,y=Math.sin(P),T=-Math.cos(P);l.x=T*x.x+y*w.x,l.y=T*x.y+y*w.y,l.z=T*x.z+y*w.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}function p(){for(let S=1;S<=t;S++)for(let x=1;x<=r;x++){let w=(r+1)*(S-1)+(x-1),E=(r+1)*S+(x-1),P=(r+1)*S+x,y=(r+1)*(S-1)+x;g.push(w,E,y),g.push(E,P,y)}}function b(){for(let S=0;S<=t;S++)for(let x=0;x<=r;x++)c.x=S/t,c.y=x/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new _c[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function $i(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let r=i[t][n];if(tu(r))r.isRenderTargetTexture?(He("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(tu(r[0])){let s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Xt(i){let e={};for(let t=0;t<i.length;t++){let n=$i(i[t]);for(let r in n)e[r]=n[r]}return e}function tu(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Wf(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Yc(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:rt.workingColorSpace}var $u={clone:$i,merge:Xt},Xf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,un=class extends Vn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Xf,this.fragmentShader=qf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$i(e.uniforms),this.uniformsGroups=Wf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new Je().setHex(r.value);break;case"v2":this.uniforms[n].value=new Me().fromArray(r.value);break;case"v3":this.uniforms[n].value=new I().fromArray(r.value);break;case"v4":this.uniforms[n].value=new Mt().fromArray(r.value);break;case"m3":this.uniforms[n].value=new Ze().fromArray(r.value);break;case"m4":this.uniforms[n].value=new gt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ya=class extends un{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Ds=class extends Vn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xl,this.normalScale=new Me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var xa=class extends Vn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Du,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},va=class extends Vn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function _s(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function uc(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var yi=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],s=t[n-1];e:{t:{let a;n:{i:if(!(e<r)){for(let o=n+2;;){if(r===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=r,r=t[++n],e<r)break t}a=t.length;break n}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(r=s,s=t[--n-1],e>=s)break t}a=n,n=0;break n}break e}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(r=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,r)}return this.interpolate_(n,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,s=e*r;for(let a=0;a!==r;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Sa=class extends yi{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:pc,endingEnd:pc}}intervalChanged_(e,t,n){let r=this.parameterPositions,s=e-2,a=e+1,o=r[s],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case mc:s=e,o=2*t-n;break;case gc:s=r.length-2,o=t+r[s]-r[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case mc:a=e,l=2*n-t;break;case gc:a=1,l=n+r[1]-r[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-t)/(r-t),v=g*g,m=v*g,p=-u*m+2*u*v-u*g,b=(1+u)*m+(-1.5-2*u)*v+(-.5+u)*g+1,S=(-1-f)*m+(1.5+f)*v+.5*g,x=f*m-f*v;for(let w=0;w!==o;++w)s[w]=p*a[h+w]+b*a[c+w]+S*a[l+w]+x*a[d+w];return s}},Ma=class extends yi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(r-t),d=1-h;for(let u=0;u!==o;++u)s[u]=a[c+u]*d+a[l+u]*h;return s}},ba=class extends yi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Ea=class extends yi{interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let g=(n-t)/(r-t),v=1-g;for(let m=0;m!==o;++m)s[m]=a[c+m]*v+a[l+m]*g;return s}let u=o*2,f=e-1;for(let g=0;g!==o;++g){let v=a[c+g],m=a[l+g],p=f*u+g*2,b=d[p],S=d[p+1],x=e*u+g*2,w=h[x],E=h[x+1],P=$f(n,t,b,w,r);s[g]=Zu(P,v,S,E,m)}return s}};function Zu(i,e,t,n,r){let s=1-i;return s*s*s*e+3*s*s*i*t+3*s*i*i*n+i*i*i*r}function Yf(i,e,t,n,r){let s=1-i;return 3*s*s*(t-e)+6*s*i*(n-t)+3*i*i*(r-n)}function $f(i,e,t,n,r){let s=(i-e)/(r-e);for(let a=0;a<8;a++){let o=Zu(s,e,t,n,r)-i;if(Math.abs(o)<1e-10)break;let l=Yf(s,e,t,n,r);if(Math.abs(l)<1e-10)break;s=Math.max(0,Math.min(1,s-o/l))}return s}var dn=class{constructor(e,t,n,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=_s(t,this.TimeBufferType),this.values=_s(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:_s(e.times,Array),values:_s(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(n.interpolation=r),uc(e.settings)&&(n.settings={inTangents:_s(e.settings.inTangents,Array),outTangents:_s(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ba(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ma(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Sa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Ea(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case hr:t=this.InterpolantFactoryMethodDiscrete;break;case ta:t=this.InterpolantFactoryMethodLinear;break;case Wo:t=this.InterpolantFactoryMethodSmooth;break;case fc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return He("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return hr;case this.InterpolantFactoryMethodLinear:return ta;case this.InterpolantFactoryMethodSmooth:return Wo;case this.InterpolantFactoryMethodBezier:return fc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;uc(this.settings)&&(nu(this.settings.inTangents,e),nu(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,s=0,a=r-1;for(;s!==r&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==r){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ge("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,r=this.values,s=n.length;s===0&&(Ge("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Ge("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ge("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&tf(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){Ge("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Wo,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(r)l=!0;else{let d=o*n,u=d-n,f=d+n;for(let g=0;g!==n;++g){let v=t[d+g];if(v!==t[u+g]||v!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*n,u=a*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,uc(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function nu(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}dn.prototype.ValueTypeName="";dn.prototype.TimeBufferType=Float32Array;dn.prototype.ValueBufferType=Float32Array;dn.prototype.DefaultInterpolation=ta;var xi=class extends dn{constructor(e,t,n){super(e,t,n)}};xi.prototype.ValueTypeName="bool";xi.prototype.ValueBufferType=Array;xi.prototype.DefaultInterpolation=hr;xi.prototype.InterpolantFactoryMethodLinear=void 0;xi.prototype.InterpolantFactoryMethodSmooth=void 0;var wa=class extends dn{constructor(e,t,n,r){super(e,t,n,r)}};wa.prototype.ValueTypeName="color";var Ta=class extends dn{constructor(e,t,n,r){super(e,t,n,r)}};Ta.prototype.ValueTypeName="number";var Aa=class extends yi{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(r-t),c=e*o;for(let h=c+o;c!==h;c+=4)ln.slerpFlat(s,0,a,c-o,a,c,l);return s}},Ir=class extends dn{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Aa(this.times,this.values,this.getValueSize(),e)}};Ir.prototype.ValueTypeName="quaternion";Ir.prototype.InterpolantFactoryMethodSmooth=void 0;var vi=class extends dn{constructor(e,t,n){super(e,t,n)}};vi.prototype.ValueTypeName="string";vi.prototype.ValueBufferType=Array;vi.prototype.DefaultInterpolation=hr;vi.prototype.InterpolantFactoryMethodLinear=void 0;vi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ra=class extends dn{constructor(e,t,n,r){super(e,t,n,r)}};Ra.prototype.ValueTypeName="vector";var Ca=class{constructor(e,t,n){let r=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,s===!1&&r.onStart!==void 0&&r.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,r.onProgress!==void 0&&r.onProgress(h,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Ju=new Ca,Pa=class{constructor(e){this.manager=e!==void 0?e:Ju,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Pa.DEFAULT_MATERIAL_NAME="__DEFAULT";var Lr=class extends Ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Dr=class extends Lr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},dc=new gt,iu=new I,su=new I,Ia=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Me(512,512),this.mapType=Qt,this.map=null,this.mapPass=null,this.matrix=new gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ps,this._frameExtents=new Me(1,1),this._viewportCount=1,this._viewports=[new Mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;iu.setFromMatrixPosition(e.matrixWorld),t.position.copy(iu),su.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(su),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){dc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(dc,e.coordinateSystem,e.reversedDepth);let s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;e.coordinateSystem===bs||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(dc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ho=new I,Go=new ln,Fn=new I,Nr=class extends Ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new gt,this.projectionMatrix=new gt,this.projectionMatrixInverse=new gt,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ho,Go,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ho,Go,Fn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ho,Go,Fn),Fn.x===1&&Fn.y===1&&Fn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ho,Go,Fn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ui=new I,ru=new Me,ou=new Me,Wt=class extends Nr{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ws*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(vs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ws*2*Math.atan(Math.tan(vs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ui.x,ui.y).multiplyScalar(-e/ui.z),ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ui.x,ui.y).multiplyScalar(-e/ui.z)}getViewSize(e,t){return this.getViewBounds(e,ru,ou),t.subVectors(ou,ru)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(vs*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Ns=class extends Nr{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},yc=class extends Ia{constructor(){super(new Ns(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Gi=class extends Lr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ft.DEFAULT_UP),this.updateMatrix(),this.target=new Ft,this.shadow=new yc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var ys=-90,xs=1,La=class extends Ft{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Wt(ys,xs,e,t);r.layers=this.layers,this.add(r);let s=new Wt(ys,xs,e,t);s.layers=this.layers,this.add(s);let a=new Wt(ys,xs,e,t);a.layers=this.layers,this.add(a);let o=new Wt(ys,xs,e,t);o.layers=this.layers,this.add(o);let l=new Wt(ys,xs,e,t);l.layers=this.layers,this.add(l);let c=new Wt(ys,xs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===Tn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===bs)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Da=class extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var $c="\\[\\]\\.:\\/",Zf=new RegExp("["+$c+"]","g"),Zc="[^"+$c+"]",Jf="[^"+$c.replace("\\.","")+"]",Kf=/((?:WC+[\/:])*)/.source.replace("WC",Zc),jf=/(WCOD+)?/.source.replace("WCOD",Jf),Qf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Zc),ep=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Zc),tp=new RegExp("^"+Kf+jf+Qf+ep+"$"),np=["material","materials","bones","map"],xc=class{constructor(e,t,n){let r=n||St.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=n.length;r!==s;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},St=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Zf,"")}static parseTrackName(e){let t=tp.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=n.nodeName.substring(r+1);np.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,s=n.length;r!==s;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){He("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ge("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ge("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ge("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ge("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ge("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ge("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ge("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;Ge("PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){Ge("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ge("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};St.Composite=xc;St.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};St.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};St.prototype.GetterByBindingType=[St.prototype._getValue_direct,St.prototype._getValue_array,St.prototype._getValue_arrayElement,St.prototype._getValue_toArray];St.prototype.SetterByBindingTypeAndVersioning=[[St.prototype._setValue_direct,St.prototype._setValue_direct_setNeedsUpdate,St.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[St.prototype._setValue_array,St.prototype._setValue_array_setNeedsUpdate,St.prototype._setValue_array_setMatrixWorldNeedsUpdate],[St.prototype._setValue_arrayElement,St.prototype._setValue_arrayElement_setNeedsUpdate,St.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[St.prototype._setValue_fromArray,St.prototype._setValue_fromArray_setNeedsUpdate,St.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Iy=new Float32Array(1);var au=new gt,Ur=class{constructor(e,t,n=0,r=1/0){this.ray=new di(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new As,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ge("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return au.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(au),this}intersectObject(e,t=!0,n=[]){return vc(e,this,n,t),n.sort(lu),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)vc(e[r],this,n,t);return n.sort(lu),n}};function lu(i,e){return i.distance-e.distance}function vc(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){let s=i.children;for(let a=0,o=s.length;a<o;a++)vc(s[a],e,t,!0)}}var Us=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=je(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(je(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Sc=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};var Or=class extends zi{constructor(e=10,t=10,n=4473924,r=8947848){n=new Je(n),r=new Je(r);let s=t/2,a=e/t,o=e/2,l=[],c=[];for(let u=0,f=0,g=-o;u<=t;u++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);let v=u===s?n:r;v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3,v.toArray(c,f),f+=3}let h=new Pt;h.setAttribute("position",new at(l,3)),h.setAttribute("color",new at(c,3));let d=new fi({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};var Fr=class extends An{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Jc(i,e,t,n){let r=ip(n);switch(t){case zc:return i*e;case Hc:return i*e/r.components*r.byteLength;case za:return i*e/r.components*r.byteLength;case wi:return i*e*2/r.components*r.byteLength;case Va:return i*e*2/r.components*r.byteLength;case Vc:return i*e*3/r.components*r.byteLength;case yn:return i*e*4/r.components*r.byteLength;case Ha:return i*e*4/r.components*r.byteLength;case Vr:case Hr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Gr:case Wr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Wa:case qa:return Math.max(i,16)*Math.max(e,8)/4;case Ga:case Xa:return Math.max(i,8)*Math.max(e,8)/2;case Ya:case $a:case Ja:case Ka:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Za:case Xr:case ja:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Qa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case el:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case tl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case nl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case il:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case sl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case rl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ol:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case al:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ll:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case cl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case hl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ul:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case dl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case fl:case pl:case ml:return Math.ceil(i/4)*Math.ceil(e/4)*16;case gl:case _l:return Math.ceil(i/4)*Math.ceil(e/4)*8;case qr:case yl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ip(i){switch(i){case Qt:case Oc:return{byteLength:1,components:1};case Bs:case Fc:case Dn:return{byteLength:2,components:1};case Ba:case ka:return{byteLength:2,components:4};case In:case Fa:case Ln:return{byteLength:4,components:1};case Bc:case kc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?He("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function yd(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function rp(i){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],v=d[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let v=d[f];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var op=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ap=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,lp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,up=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,dp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,fp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,mp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,gp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_p=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,xp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,vp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Sp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Mp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ep=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Tp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ap=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Rp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Cp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Pp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ip=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Lp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Dp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Np=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Up=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Op="gl_FragColor = linearToOutputTexel( gl_FragColor );",Fp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Bp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,kp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,zp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Vp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Hp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Gp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Wp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Xp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Yp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,$p=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Kp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,jp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Qp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,em=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,tm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,nm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,im=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,sm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,rm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,om=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,am=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lm=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,cm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,um=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,fm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,gm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_m=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ym=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Sm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,bm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Em=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,wm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Tm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Am=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Cm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Pm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Im=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Lm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Dm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Nm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Um=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Om=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Fm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,km=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,zm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Gm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Wm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Xm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,qm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ym=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,$m=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Zm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Jm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Km=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,jm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Qm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,eg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,tg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ng=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,rg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,og=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ag=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ug=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,fg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,pg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,mg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,gg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_g=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Sg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Eg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,wg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ag=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Rg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ig=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ng=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ug=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Og=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qe={alphahash_fragment:op,alphahash_pars_fragment:ap,alphamap_fragment:lp,alphamap_pars_fragment:cp,alphatest_fragment:hp,alphatest_pars_fragment:up,aomap_fragment:dp,aomap_pars_fragment:fp,batching_pars_vertex:pp,batching_vertex:mp,begin_vertex:gp,beginnormal_vertex:_p,bsdfs:yp,iridescence_fragment:xp,bumpmap_pars_fragment:vp,clipping_planes_fragment:Sp,clipping_planes_pars_fragment:Mp,clipping_planes_pars_vertex:bp,clipping_planes_vertex:Ep,color_fragment:wp,color_pars_fragment:Tp,color_pars_vertex:Ap,color_vertex:Rp,common:Cp,cube_uv_reflection_fragment:Pp,defaultnormal_vertex:Ip,displacementmap_pars_vertex:Lp,displacementmap_vertex:Dp,emissivemap_fragment:Np,emissivemap_pars_fragment:Up,colorspace_fragment:Op,colorspace_pars_fragment:Fp,envmap_fragment:Bp,envmap_common_pars_fragment:kp,envmap_pars_fragment:zp,envmap_pars_vertex:Vp,envmap_physical_pars_fragment:jp,envmap_vertex:Hp,fog_vertex:Gp,fog_pars_vertex:Wp,fog_fragment:Xp,fog_pars_fragment:qp,gradientmap_pars_fragment:Yp,lightmap_pars_fragment:$p,lights_lambert_fragment:Zp,lights_lambert_pars_fragment:Jp,lights_pars_begin:Kp,lights_toon_fragment:Qp,lights_toon_pars_fragment:em,lights_phong_fragment:tm,lights_phong_pars_fragment:nm,lights_physical_fragment:im,lights_physical_pars_fragment:sm,lights_fragment_begin:rm,lights_fragment_maps:om,lights_fragment_end:am,lightprobes_pars_fragment:lm,logdepthbuf_fragment:cm,logdepthbuf_pars_fragment:hm,logdepthbuf_pars_vertex:um,logdepthbuf_vertex:dm,map_fragment:fm,map_pars_fragment:pm,map_particle_fragment:mm,map_particle_pars_fragment:gm,metalnessmap_fragment:_m,metalnessmap_pars_fragment:ym,morphinstance_vertex:xm,morphcolor_vertex:vm,morphnormal_vertex:Sm,morphtarget_pars_vertex:Mm,morphtarget_vertex:bm,normal_fragment_begin:Em,normal_fragment_maps:wm,normal_pars_fragment:Tm,normal_pars_vertex:Am,normal_vertex:Rm,normalmap_pars_fragment:Cm,clearcoat_normal_fragment_begin:Pm,clearcoat_normal_fragment_maps:Im,clearcoat_pars_fragment:Lm,iridescence_pars_fragment:Dm,opaque_fragment:Nm,packing:Um,premultiplied_alpha_fragment:Om,project_vertex:Fm,dithering_fragment:Bm,dithering_pars_fragment:km,roughnessmap_fragment:zm,roughnessmap_pars_fragment:Vm,shadowmap_pars_fragment:Hm,shadowmap_pars_vertex:Gm,shadowmap_vertex:Wm,shadowmask_pars_fragment:Xm,skinbase_vertex:qm,skinning_pars_vertex:Ym,skinning_vertex:$m,skinnormal_vertex:Zm,specularmap_fragment:Jm,specularmap_pars_fragment:Km,tonemapping_fragment:jm,tonemapping_pars_fragment:Qm,transmission_fragment:eg,transmission_pars_fragment:tg,uv_pars_fragment:ng,uv_pars_vertex:ig,uv_vertex:sg,worldpos_vertex:rg,background_vert:og,background_frag:ag,backgroundCube_vert:lg,backgroundCube_frag:cg,cube_vert:hg,cube_frag:ug,depth_vert:dg,depth_frag:fg,distance_vert:pg,distance_frag:mg,equirect_vert:gg,equirect_frag:_g,linedashed_vert:yg,linedashed_frag:xg,meshbasic_vert:vg,meshbasic_frag:Sg,meshlambert_vert:Mg,meshlambert_frag:bg,meshmatcap_vert:Eg,meshmatcap_frag:wg,meshnormal_vert:Tg,meshnormal_frag:Ag,meshphong_vert:Rg,meshphong_frag:Cg,meshphysical_vert:Pg,meshphysical_frag:Ig,meshtoon_vert:Lg,meshtoon_frag:Dg,points_vert:Ng,points_frag:Ug,shadow_vert:Og,shadow_frag:Fg,sprite_vert:Bg,sprite_frag:kg},we={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new Me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new Me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},Wn={basic:{uniforms:Xt([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:Xt([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Je(0)},envMapIntensity:{value:1}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:Xt([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:Xt([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:Xt([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new Je(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:Xt([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:Xt([we.points,we.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:Xt([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:Xt([we.common,we.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:Xt([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:Xt([we.sprite,we.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distance:{uniforms:Xt([we.common,we.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distance_vert,fragmentShader:Qe.distance_frag},shadow:{uniforms:Xt([we.lights,we.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Wn.physical={uniforms:Xt([Wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new Me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new Me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new Me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};var Ml={r:0,b:0,g:0},zg=new gt,xd=new Ze;xd.set(-1,0,0,0,1,0,0,0,1);function Vg(i,e,t,n,r,s){let a=new Je(0),o=r===!0?0:1,l,c,h=null,d=0,u=null;function f(b){let S=b.isScene===!0?b.background:null;if(S&&S.isTexture){let x=b.backgroundBlurriness>0;S=e.get(S,x)}return S}function g(b){let S=!1,x=f(b);x===null?m(a,o):x&&x.isColor&&(m(x,1),S=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(b,S){let x=f(S);x&&(x.isCubeTexture||x.mapping===kr)?(c===void 0&&(c=new $t(new mi(1,1,1),new un({name:"BackgroundCubeMaterial",uniforms:$i(Wn.backgroundCube.uniforms),vertexShader:Wn.backgroundCube.vertexShader,fragmentShader:Wn.backgroundCube.fragmentShader,side:Zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,E,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(zg.makeRotationFromEuler(S.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(xd),c.material.toneMapped=rt.getTransfer(x.colorSpace)!==ht,(h!==x||d!==x.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=x,d=x.version,u=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new $t(new Cr(2,2),new un({name:"BackgroundMaterial",uniforms:$i(Wn.background.uniforms),vertexShader:Wn.background.vertexShader,fragmentShader:Wn.background.fragmentShader,side:Si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=rt.getTransfer(x.colorSpace)!==ht,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||d!==x.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=x,d=x.version,u=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function m(b,S){b.getRGB(Ml,Yc(i)),t.buffers.color.setClear(Ml.r,Ml.g,Ml.b,S,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,S=1){a.set(b),o=S,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,m(a,o)},render:g,addToRenderList:v,dispose:p}}function Hg(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=u(null),s=r,a=!1;function o(O,H,Y,U,q){let K=!1,Z=d(O,U,Y,H);s!==Z&&(s=Z,c(s.object)),K=f(O,U,Y,q),K&&g(O,U,Y,q),q!==null&&e.update(q,i.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,x(O,H,Y,U),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return i.createVertexArray()}function c(O){return i.bindVertexArray(O)}function h(O){return i.deleteVertexArray(O)}function d(O,H,Y,U){let q=U.wireframe===!0,K=n[H.id];K===void 0&&(K={},n[H.id]=K);let Z=O.isInstancedMesh===!0?O.id:0,le=K[Z];le===void 0&&(le={},K[Z]=le);let te=le[Y.id];te===void 0&&(te={},le[Y.id]=te);let ne=te[q];return ne===void 0&&(ne=u(l()),te[q]=ne),ne}function u(O){let H=[],Y=[],U=[];for(let q=0;q<t;q++)H[q]=0,Y[q]=0,U[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:Y,attributeDivisors:U,object:O,attributes:{},index:null}}function f(O,H,Y,U){let q=s.attributes,K=H.attributes,Z=0,le=Y.getAttributes();for(let te in le)if(le[te].location>=0){let oe=q[te],Oe=K[te];if(Oe===void 0&&(te==="instanceMatrix"&&O.instanceMatrix&&(Oe=O.instanceMatrix),te==="instanceColor"&&O.instanceColor&&(Oe=O.instanceColor)),oe===void 0||oe.attribute!==Oe||Oe&&oe.data!==Oe.data)return!0;Z++}return s.attributesNum!==Z||s.index!==U}function g(O,H,Y,U){let q={},K=H.attributes,Z=0,le=Y.getAttributes();for(let te in le)if(le[te].location>=0){let oe=K[te];oe===void 0&&(te==="instanceMatrix"&&O.instanceMatrix&&(oe=O.instanceMatrix),te==="instanceColor"&&O.instanceColor&&(oe=O.instanceColor));let Oe={};Oe.attribute=oe,oe&&oe.data&&(Oe.data=oe.data),q[te]=Oe,Z++}s.attributes=q,s.attributesNum=Z,s.index=U}function v(){let O=s.newAttributes;for(let H=0,Y=O.length;H<Y;H++)O[H]=0}function m(O){p(O,0)}function p(O,H){let Y=s.newAttributes,U=s.enabledAttributes,q=s.attributeDivisors;Y[O]=1,U[O]===0&&(i.enableVertexAttribArray(O),U[O]=1),q[O]!==H&&(i.vertexAttribDivisor(O,H),q[O]=H)}function b(){let O=s.newAttributes,H=s.enabledAttributes;for(let Y=0,U=H.length;Y<U;Y++)H[Y]!==O[Y]&&(i.disableVertexAttribArray(Y),H[Y]=0)}function S(O,H,Y,U,q,K,Z){Z===!0?i.vertexAttribIPointer(O,H,Y,q,K):i.vertexAttribPointer(O,H,Y,U,q,K)}function x(O,H,Y,U){v();let q=U.attributes,K=Y.getAttributes(),Z=H.defaultAttributeValues;for(let le in K){let te=K[le];if(te.location>=0){let ne=q[le];if(ne===void 0&&(le==="instanceMatrix"&&O.instanceMatrix&&(ne=O.instanceMatrix),le==="instanceColor"&&O.instanceColor&&(ne=O.instanceColor)),ne!==void 0){let oe=ne.normalized,Oe=ne.itemSize,Ae=e.get(ne);if(Ae===void 0)continue;let tt=Ae.buffer,Be=Ae.type,ot=Ae.bytesPerElement,j=Be===i.INT||Be===i.UNSIGNED_INT||ne.gpuType===Fa;if(ne.isInterleavedBufferAttribute){let re=ne.data,Pe=re.stride,We=ne.offset;if(re.isInstancedInterleavedBuffer){for(let Re=0;Re<te.locationSize;Re++)p(te.location+Re,re.meshPerAttribute);O.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Re=0;Re<te.locationSize;Re++)m(te.location+Re);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let Re=0;Re<te.locationSize;Re++)S(te.location+Re,Oe/te.locationSize,Be,oe,Pe*ot,(We+Oe/te.locationSize*Re)*ot,j)}else{if(ne.isInstancedBufferAttribute){for(let re=0;re<te.locationSize;re++)p(te.location+re,ne.meshPerAttribute);O.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let re=0;re<te.locationSize;re++)m(te.location+re);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let re=0;re<te.locationSize;re++)S(te.location+re,Oe/te.locationSize,Be,oe,Oe*ot,Oe/te.locationSize*re*ot,j)}}else if(Z!==void 0){let oe=Z[le];if(oe!==void 0)switch(oe.length){case 2:i.vertexAttrib2fv(te.location,oe);break;case 3:i.vertexAttrib3fv(te.location,oe);break;case 4:i.vertexAttrib4fv(te.location,oe);break;default:i.vertexAttrib1fv(te.location,oe)}}}}b()}function w(){T();for(let O in n){let H=n[O];for(let Y in H){let U=H[Y];for(let q in U){let K=U[q];for(let Z in K)h(K[Z].object),delete K[Z];delete U[q]}}delete n[O]}}function E(O){if(n[O.id]===void 0)return;let H=n[O.id];for(let Y in H){let U=H[Y];for(let q in U){let K=U[q];for(let Z in K)h(K[Z].object),delete K[Z];delete U[q]}}delete n[O.id]}function P(O){for(let H in n){let Y=n[H];for(let U in Y){let q=Y[U];if(q[O.id]===void 0)continue;let K=q[O.id];for(let Z in K)h(K[Z].object),delete K[Z];delete q[O.id]}}}function y(O){for(let H in n){let Y=n[H],U=O.isInstancedMesh===!0?O.id:0,q=Y[U];if(q!==void 0){for(let K in q){let Z=q[K];for(let le in Z)h(Z[le].object),delete Z[le];delete q[K]}delete Y[U],Object.keys(Y).length===0&&delete n[H]}}}function T(){D(),a=!0,s!==r&&(s=r,c(s.object))}function D(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:T,resetDefaultState:D,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:y,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:m,disableUnusedAttributes:b}}function Gg(i,e,t){let n;function r(l){n=l}function s(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Wg(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(P){return!(P!==yn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let y=P===Dn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Qt&&P!==Ln&&!y&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(He("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&He("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:x,maxSamples:w,samples:E}}function Xg(i){let e=this,t=null,n=0,r=!1,s=!1,a=new rn,o=new Ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||r;return r=u,n=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!r||g===null||g.length===0||s&&!m)s?h(null):c();else{let b=s?0:n,S=b*4,x=p.clippingState||null;l.value=x,x=h(g,u,S,f);for(let w=0;w!==S;++w)x[w]=t[w];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,g){let v=d!==null?d.length:0,m=null;if(v!==0){if(m=l.value,g!==!0||m===null){let p=f+v*4,b=u.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,x=f;S!==v;++S,x+=4)a.copy(d[S]).applyMatrix4(b,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}var Vs=4,qg=6,Yg=20,$g=256,Yr=new Ns,Ku=new Je,Kc=null,jc=0,Qc=0,eh=!1,Zg=new I,Zi=new I,El=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){let{size:a=256,position:o=Zg}=s;Kc=this._renderer.getRenderTarget(),jc=this._renderer.getActiveCubeFace(),Qc=this._renderer.getActiveMipmapLevel(),eh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ed(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Kc,jc,Qc),this._renderer.xr.enabled=eh,e.scissorTest=!1,zs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Mi||e.mapping===qi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Kc=this._renderer.getRenderTarget(),jc=this._renderer.getActiveCubeFace(),Qc=this._renderer.getActiveMipmapLevel(),eh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:Dn,format:yn,colorSpace:ur,depthBuffer:!1},r=ju(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ju(e,t,n);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Jg(s)),this._blurMaterial=jg(s,e,t),this._ggxMaterial=Kg(s,e,t)}return r}_compileMaterial(e){let t=new $t(new Pt,e);this._renderer.compile(t,Yr)}_sceneToCubeUV(e,t,n,r,s){let l=new Wt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Ku),d.toneMapping=Pn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new $t(new mi,new cn({name:"PMREM.Background",side:Zt,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,m=v.material,p=!1,b=e.background;b?b.isColor&&(m.color.copy(b),e.background=null,p=!0):(m.color.copy(Ku),p=!0);for(let S=0;S<6;S++){let x=S%3;x===0?(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[S],s.y,s.z)):x===1?(l.up.set(0,0,c[S]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[S],s.z)):(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[S]));let w=this._cubeSize;zs(r,x*w,S>2?w:0,w,w),d.setRenderTarget(r),p&&d.render(v,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=b}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===Mi||e.mapping===qi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ed()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qu());let s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;let o=s.uniforms;o.envMap.value=e;let l=this._cubeSize;zs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Yr)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:g}=this,v=this._sizeLods[n],m=3*v*(n>g-Vs?n-g+Vs:0),p=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,zs(s,m,p,3*v,2*v),r.setRenderTarget(s),r.render(o,Yr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-n,zs(e,m,p,3*v,2*v),r.setRenderTarget(e),r.render(o,Yr)}_blur(e,t,n,r){let s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[r],d=3*h*(r>this._lodMax-Vs?r-this._lodMax+Vs:0),u=4*(this._cubeSize-h);zs(t,d,u,3*h,2*h),a.setRenderTarget(t),a.render(l,Yr)}};function Jg(i){let e=[],t=[],n=i,r=i-Vs+1+qg;for(let s=0;s<r;s++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,g=new Float32Array(f*u*d),v=new Float32Array(f*u*d);for(let p=0;p<d;p++){let b=p%3*2/3-1,S=p>2?0:-1,x=[b,S,0,b+2/3,S,0,b+2/3,S+1,0,b,S,0,b+2/3,S+1,0,b,S+1,0];g.set(x,f*u*p);for(let w=0;w<u;w++){let E=h[w*2]*2-1,P=h[w*2+1]*2-1;p===0?Zi.set(1,P,E):p===1?Zi.set(-E,1,-P):p===2?Zi.set(-E,P,1):p===3?Zi.set(-1,P,-E):p===4?Zi.set(-E,-1,P):Zi.set(E,P,-1),Zi.toArray(v,(p*u+w)*f)}}let m=new Pt;m.setAttribute("position",new an(g,f)),m.setAttribute("outputDirection",new an(v,f)),t.push(new $t(m,null)),n>Vs&&n--}return{lodMeshes:t,sizeLods:e}}function ju(i,e,t){let n=new jt(i,e,t);return n.texture.mapping=kr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function zs(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Kg(i,e,t){return new un({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:$g,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Al(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function jg(i,e,t){return new un({name:"SphericalGaussianBlur",defines:{SAMPLES:Yg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Al(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Qu(){return new un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Al(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function ed(){return new un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Al(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Al(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var wl=class extends jt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Mr(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new mi(5,5,5),s=new un({name:"CubemapFromEquirect",uniforms:$i(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Zt,blending:Hn});s.uniforms.tEquirect.value=t;let a=new $t(r,s),o=t.minFilter;return t.minFilter===bi&&(t.minFilter=Bt),new La(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}};function Qg(i){let e=new WeakMap,t=new WeakMap,n=null;function r(u,f=!1){return u==null?null:f?a(u):s(u)}function s(u){if(u&&u.isTexture){let f=u.mapping;if(f===Na||f===Ua)if(e.has(u)){let g=e.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let v=new wl(g.height);return v.fromEquirectangularTexture(i,u),e.set(u,v),u.addEventListener("dispose",c),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,g=f===Na||f===Ua,v=f===Mi||f===qi;if(g||v){let m=t.get(u),p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new El(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{let b=u.image;return g&&b&&b.height>0||v&&b&&l(b)?(n===null&&(n=new El(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===Na?u.mapping=Mi:f===Ua&&(u.mapping=qi),u}function l(u){let f=0,g=6;for(let v=0;v<g;v++)u[v]!==void 0&&f++;return f===g}function c(u){let f=u.target;f.removeEventListener("dispose",c);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:d}}function e0(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let r=t(n);return r===null&&Bi("WebGLRenderer: "+n+" extension not supported."),r}}}function t0(i,e,t,n){let r={},s=new WeakMap;function a(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete r[u.id];let f=s.get(u);f&&(e.remove(f),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)e.update(u[f],i.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,g=d.attributes.position,v=0;if(g===void 0)return;if(f!==null){let b=f.array;v=f.version;for(let S=0,x=b.length;S<x;S+=3){let w=b[S+0],E=b[S+1],P=b[S+2];u.push(w,E,E,P,P,w)}}else{let b=g.array;v=g.version;for(let S=0,x=b.length/3-1;S<x;S+=3){let w=S+0,E=S+1,P=S+2;u.push(w,E,E,P,P,w)}}let m=new(g.count>=65535?xr:yr)(u,1);m.version=v;let p=s.get(d);p&&e.remove(p),s.set(d,m)}function h(d){let u=s.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function n0(i,e,t){let n;function r(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(n,u,s,d*a),t.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,s,d*a,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,s,d,0,f);let v=0;for(let m=0;m<f;m++)v+=u[m];t.update(v,n,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function i0(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:Ge("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function s0(i,e,t){let n=new WeakMap,r=new Mt;function s(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let T=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],b=o.morphAttributes.color||[],S=0;f===!0&&(S=1),g===!0&&(S=2),v===!0&&(S=3);let x=o.attributes.position.count*S,w=1;x>e.maxTextureSize&&(w=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let E=new Float32Array(x*w*4*d),P=new mr(E,x,w,d);P.type=Ln,P.needsUpdate=!0;let y=S*4;for(let D=0;D<d;D++){let O=m[D],H=p[D],Y=b[D],U=x*w*4*D;for(let q=0;q<O.count;q++){let K=q*y;f===!0&&(r.fromBufferAttribute(O,q),E[U+K+0]=r.x,E[U+K+1]=r.y,E[U+K+2]=r.z,E[U+K+3]=0),g===!0&&(r.fromBufferAttribute(H,q),E[U+K+4]=r.x,E[U+K+5]=r.y,E[U+K+6]=r.z,E[U+K+7]=0),v===!0&&(r.fromBufferAttribute(Y,q),E[U+K+8]=r.x,E[U+K+9]=r.y,E[U+K+10]=r.z,E[U+K+11]=Y.itemSize===4?r.w:1)}}u={count:d,texture:P,size:new Me(x,w)},n.set(o,u),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:s}}function r0(i,e,t,n,r){let s=new WeakMap;function a(c){let h=r.render.frame,d=c.geometry,u=e.get(c,d);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return u}function o(){s=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var o0={[Cc]:"LINEAR_TONE_MAPPING",[Pc]:"REINHARD_TONE_MAPPING",[Ic]:"CINEON_TONE_MAPPING",[Br]:"ACES_FILMIC_TONE_MAPPING",[Dc]:"AGX_TONE_MAPPING",[Nc]:"NEUTRAL_TONE_MAPPING",[Lc]:"CUSTOM_TONE_MAPPING"};function a0(i,e,t,n,r,s){let a=new jt(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Pt;c.setAttribute("position",new at([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new at([0,2,0,0,2,0],2));let h=new ya({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new $t(c,h),u=new Ns(-1,1,1,-1,0,1),f=null,g=null,v=!1,m,p=null,b=[],S=!1;this.setSize=function(x,w){a.setSize(x,w),o!==null&&o.setSize(x,w),l!==null&&l.setSize(x,w);for(let E=0;E<b.length;E++){let P=b[E];P.setSize&&P.setSize(x,w)}},this.setEffects=function(x){b=x,S=b.length>0&&b[0].isRenderPass===!0;let w=a.width,E=a.height;b.length>0&&o===null&&(o=new jt(w,E,{type:Dn,depthBuffer:!1,stencilBuffer:!1}),l=new jt(w,E,{type:Dn,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<b.length;P++){let y=b[P];y.setSize&&y.setSize(w,E)}},this.begin=function(x,w){if(v||x.toneMapping===Pn&&b.length===0)return!1;if(p=w,w!==null){let E=w.width,P=w.height;(a.width!==E||a.height!==P)&&this.setSize(E,P)}return S===!1&&x.setRenderTarget(a),m=x.toneMapping,x.toneMapping=Pn,!0},this.hasRenderPass=function(){return S},this.end=function(x,w){x.toneMapping=m,v=!0;let E=a,P=o;for(let y=0;y<b.length;y++){let T=b[y];T.enabled!==!1&&(T.render(x,P,E,w),T.needsSwap!==!1&&(E=P,P=P===o?l:o))}if(f!==x.outputColorSpace||g!==x.toneMapping){f=x.outputColorSpace,g=x.toneMapping,h.defines={},rt.getTransfer(f)===ht&&(h.defines.SRGB_TRANSFER="");let y=o0[g];y&&(h.defines[y]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=E.texture,x.setRenderTarget(p),x.render(d,u),p=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var vd=new Yt,ih=new pi(1,1),Sd=new mr,Md=new sa,bd=new Mr,td=[],nd=[],id=new Float32Array(16),sd=new Float32Array(9),rd=new Float32Array(4);function Gs(i,e,t){let n=i[0];if(n<=0||n>0)return i;let r=e*t,s=td[r];if(s===void 0&&(s=new Float32Array(r),td[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function It(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Lt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Rl(i,e){let t=nd[e];t===void 0&&(t=new Int32Array(e),nd[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function l0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function c0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2fv(this.addr,e),Lt(t,e)}}function h0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;i.uniform3fv(this.addr,e),Lt(t,e)}}function u0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4fv(this.addr,e),Lt(t,e)}}function d0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,n))return;rd.set(n),i.uniformMatrix2fv(this.addr,!1,rd),Lt(t,n)}}function f0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,n))return;sd.set(n),i.uniformMatrix3fv(this.addr,!1,sd),Lt(t,n)}}function p0(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Lt(t,e)}else{if(It(t,n))return;id.set(n),i.uniformMatrix4fv(this.addr,!1,id),Lt(t,n)}}function m0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function g0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2iv(this.addr,e),Lt(t,e)}}function _0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;i.uniform3iv(this.addr,e),Lt(t,e)}}function y0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4iv(this.addr,e),Lt(t,e)}}function x0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function v0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;i.uniform2uiv(this.addr,e),Lt(t,e)}}function S0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;i.uniform3uiv(this.addr,e),Lt(t,e)}}function M0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;i.uniform4uiv(this.addr,e),Lt(t,e)}}function b0(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(ih.compareFunction=t.isReversedDepthBuffer()?Sl:vl,s=ih):s=vd,t.setTexture2D(e||s,r)}function E0(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Md,r)}function w0(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||bd,r)}function T0(i,e,t){let n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Sd,r)}function A0(i){switch(i){case 5126:return l0;case 35664:return c0;case 35665:return h0;case 35666:return u0;case 35674:return d0;case 35675:return f0;case 35676:return p0;case 5124:case 35670:return m0;case 35667:case 35671:return g0;case 35668:case 35672:return _0;case 35669:case 35673:return y0;case 5125:return x0;case 36294:return v0;case 36295:return S0;case 36296:return M0;case 35678:case 36198:case 36298:case 36306:case 35682:return b0;case 35679:case 36299:case 36307:return E0;case 35680:case 36300:case 36308:case 36293:return w0;case 36289:case 36303:case 36311:case 36292:return T0}}function R0(i,e){i.uniform1fv(this.addr,e)}function C0(i,e){let t=Gs(e,this.size,2);i.uniform2fv(this.addr,t)}function P0(i,e){let t=Gs(e,this.size,3);i.uniform3fv(this.addr,t)}function I0(i,e){let t=Gs(e,this.size,4);i.uniform4fv(this.addr,t)}function L0(i,e){let t=Gs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function D0(i,e){let t=Gs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function N0(i,e){let t=Gs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function U0(i,e){i.uniform1iv(this.addr,e)}function O0(i,e){i.uniform2iv(this.addr,e)}function F0(i,e){i.uniform3iv(this.addr,e)}function B0(i,e){i.uniform4iv(this.addr,e)}function k0(i,e){i.uniform1uiv(this.addr,e)}function z0(i,e){i.uniform2uiv(this.addr,e)}function V0(i,e){i.uniform3uiv(this.addr,e)}function H0(i,e){i.uniform4uiv(this.addr,e)}function G0(i,e,t){let n=this.cache,r=e.length,s=Rl(t,r);It(n,s)||(i.uniform1iv(this.addr,s),Lt(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=ih:a=vd;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function W0(i,e,t){let n=this.cache,r=e.length,s=Rl(t,r);It(n,s)||(i.uniform1iv(this.addr,s),Lt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Md,s[a])}function X0(i,e,t){let n=this.cache,r=e.length,s=Rl(t,r);It(n,s)||(i.uniform1iv(this.addr,s),Lt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||bd,s[a])}function q0(i,e,t){let n=this.cache,r=e.length,s=Rl(t,r);It(n,s)||(i.uniform1iv(this.addr,s),Lt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Sd,s[a])}function Y0(i){switch(i){case 5126:return R0;case 35664:return C0;case 35665:return P0;case 35666:return I0;case 35674:return L0;case 35675:return D0;case 35676:return N0;case 5124:case 35670:return U0;case 35667:case 35671:return O0;case 35668:case 35672:return F0;case 35669:case 35673:return B0;case 5125:return k0;case 36294:return z0;case 36295:return V0;case 36296:return H0;case 35678:case 36198:case 36298:case 36306:case 35682:return G0;case 35679:case 36299:case 36307:return W0;case 35680:case 36300:case 36308:case 36293:return X0;case 36289:case 36303:case 36311:case 36292:return q0}}var sh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=A0(t.type)}},rh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Y0(t.type)}},oh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let s=0,a=r.length;s!==a;++s){let o=r[s];o.setValue(e,t[o.id],n)}}},th=/(\w+)(\])?(\[|\.)?/g;function od(i,e){i.seq.push(e),i.map[e.id]=e}function $0(i,e,t){let n=i.name,r=n.length;for(th.lastIndex=0;;){let s=th.exec(n),a=th.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){od(t,c===void 0?new sh(o,i,e):new rh(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new oh(o),od(t,d)),t=d}}}var Hs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);$0(o,l,this)}let r=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){let s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,s=e.length;r!==s;++r){let a=e[r];a.id in t&&n.push(a)}return n}};function ad(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Z0=37297,J0=0;function K0(i,e){let t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var ld=new Ze;function j0(i){rt._getMatrix(ld,rt.workingColorSpace,i);let e=`mat3( ${ld.elements.map(t=>t.toFixed(4))} )`;switch(rt.getTransfer(i)){case dr:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return He("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function cd(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+K0(i.getShaderSource(e),o)}else return s}function Q0(i,e){let t=j0(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var e_={[Cc]:"Linear",[Pc]:"Reinhard",[Ic]:"Cineon",[Br]:"ACESFilmic",[Dc]:"AgX",[Nc]:"Neutral",[Lc]:"Custom"};function t_(i,e){let t=e_[e];return t===void 0?(He("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var bl=new I;function n_(){rt.getLuminanceCoefficients(bl);let i=bl.x.toFixed(4),e=bl.y.toFixed(4),t=bl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function i_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zr).join(`
`)}function s_(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function r_(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){let s=i.getActiveAttrib(e,r),a=s.name,o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Zr(i){return i!==""}function hd(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ud(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var o_=/^[ \t]*#include +<([\w\d./]+)>/gm;function ah(i){return i.replace(o_,l_)}var a_=new Map;function l_(i,e){let t=Qe[e];if(t===void 0){let n=a_.get(e);if(n!==void 0)t=Qe[n],He('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return ah(t)}var c_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dd(i){return i.replace(c_,h_)}function h_(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function fd(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var u_={[Wi]:"SHADOWMAP_TYPE_PCF",[Os]:"SHADOWMAP_TYPE_VSM"};function d_(i){return u_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var f_={[Mi]:"ENVMAP_TYPE_CUBE",[qi]:"ENVMAP_TYPE_CUBE",[kr]:"ENVMAP_TYPE_CUBE_UV"};function p_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":f_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var m_={[qi]:"ENVMAP_MODE_REFRACTION"};function g_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":m_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var __={[Rc]:"ENVMAP_BLENDING_MULTIPLY",[Pu]:"ENVMAP_BLENDING_MIX",[Iu]:"ENVMAP_BLENDING_ADD"};function y_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":__[i.combine]||"ENVMAP_BLENDING_NONE"}function x_(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function v_(i,e,t,n){let r=i.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=d_(t),c=p_(t),h=g_(t),d=y_(t),u=x_(t),f=i_(t),g=s_(s),v=r.createProgram(),m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Zr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Zr).join(`
`),p.length>0&&(p+=`
`)):(m=[fd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zr).join(`
`),p=[fd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pn?"#define TONE_MAPPING":"",t.toneMapping!==Pn?Qe.tonemapping_pars_fragment:"",t.toneMapping!==Pn?t_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,Q0("linearToOutputTexel",t.outputColorSpace),n_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Zr).join(`
`)),a=ah(a),a=hd(a,t),a=ud(a,t),o=ah(o),o=hd(o,t),o=ud(o,t),a=dd(a),o=dd(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Wc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Wc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let S=b+m+a,x=b+p+o,w=ad(r,r.VERTEX_SHADER,S),E=ad(r,r.FRAGMENT_SHADER,x);r.attachShader(v,w),r.attachShader(v,E),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function P(O){if(i.debug.checkShaderErrors){let H=r.getProgramInfoLog(v)||"",Y=r.getShaderInfoLog(w)||"",U=r.getShaderInfoLog(E)||"",q=H.trim(),K=Y.trim(),Z=U.trim(),le=!0,te=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(le=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,w,E);else{let ne=cd(r,w,"vertex"),oe=cd(r,E,"fragment");Ge("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+q+`
`+ne+`
`+oe)}else q!==""?He("WebGLProgram: Program Info Log:",q):(K===""||Z==="")&&(te=!1);te&&(O.diagnostics={runnable:le,programLog:q,vertexShader:{log:K,prefix:m},fragmentShader:{log:Z,prefix:p}})}r.deleteShader(w),r.deleteShader(E),y=new Hs(r,v),T=r_(r,v)}let y;this.getUniforms=function(){return y===void 0&&P(this),y};let T;this.getAttributes=function(){return T===void 0&&P(this),T};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=r.getProgramParameter(v,Z0)),D},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=J0++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=E,this}var S_=0,lh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ch(e),t.set(e,n)),n}},ch=class{constructor(e){this.id=S_++,this.code=e,this.usedTimes=0}};function M_(i){return i===wi||i===Xr||i===qr}function b_(i,e,t,n,r,s){let a=new As,o=new lh,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return l.add(y),y===0?"uv":`uv${y}`}function v(y,T,D,O,H,Y){let U=O.fog,q=H.geometry,K=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?O.environment:null,Z=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,le=e.get(y.envMap||K,Z),te=le&&le.mapping===kr?le.image.height:null,ne=f[y.type];y.precision!==null&&(u=n.getMaxPrecision(y.precision),u!==y.precision&&He("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));let oe=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Oe=oe!==void 0?oe.length:0,Ae=0;q.morphAttributes.position!==void 0&&(Ae=1),q.morphAttributes.normal!==void 0&&(Ae=2),q.morphAttributes.color!==void 0&&(Ae=3);let tt,Be,ot,j;if(ne){let pt=Wn[ne];tt=pt.vertexShader,Be=pt.fragmentShader}else{tt=y.vertexShader,Be=y.fragmentShader;let pt=o.getVertexShaderStage(y),lt=o.getFragmentShaderStage(y);o.update(y,pt,lt),ot=pt.id,j=lt.id}let re=i.getRenderTarget(),Pe=i.state.buffers.depth.getReversed(),We=H.isInstancedMesh===!0,Re=H.isBatchedMesh===!0,Xe=!!y.map,ue=!!y.matcap,Ie=!!le,me=!!y.aoMap,Ye=!!y.lightMap,et=!!y.bumpMap&&y.wireframe===!1,ut=!!y.normalMap,_t=!!y.displacementMap,kt=!!y.emissiveMap,yt=!!y.metalnessMap,bt=!!y.roughnessMap,k=y.anisotropy>0,Nt=y.clearcoat>0,ct=y.dispersion>0,L=y.retroreflectivity>0,_=y.iridescence>0,G=y.sheen>0,$=y.transmission>0,Q=k&&!!y.anisotropyMap,de=Nt&&!!y.clearcoatMap,_e=Nt&&!!y.clearcoatNormalMap,ee=Nt&&!!y.clearcoatRoughnessMap,se=_&&!!y.iridescenceMap,ve=_&&!!y.iridescenceThicknessMap,Fe=G&&!!y.sheenColorMap,ye=G&&!!y.sheenRoughnessMap,Se=!!y.specularMap,Le=!!y.specularColorMap,Ve=!!y.specularIntensityMap,$e=$&&!!y.transmissionMap,B=$&&!!y.thicknessMap,ge=!!y.gradientMap,ie=!!y.alphaMap,xe=y.alphaTest>0,be=!!y.alphaHash,ae=!!y.extensions,Ue=Pn;y.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(Ue=i.toneMapping);let Ne={shaderID:ne,shaderType:y.type,shaderName:y.name,vertexShader:tt,fragmentShader:Be,defines:y.defines,customVertexShaderID:ot,customFragmentShaderID:j,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:Re,batchingColor:Re&&H._colorsTexture!==null,instancing:We,instancingColor:We&&H.instanceColor!==null,instancingMorph:We&&H.morphTexture!==null,outputColorSpace:re===null?i.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:rt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Xe,matcap:ue,envMap:Ie,envMapMode:Ie&&le.mapping,envMapCubeUVHeight:te,aoMap:me,lightMap:Ye,bumpMap:et,normalMap:ut,displacementMap:_t,emissiveMap:kt,normalMapObjectSpace:ut&&y.normalMapType===Nu,normalMapTangentSpace:ut&&y.normalMapType===xl,packedNormalMap:ut&&y.normalMapType===xl&&M_(y.normalMap.format),metalnessMap:yt,roughnessMap:bt,anisotropy:k,anisotropyMap:Q,clearcoat:Nt,clearcoatMap:de,clearcoatNormalMap:_e,clearcoatRoughnessMap:ee,dispersion:ct,retroreflection:L,iridescence:_,iridescenceMap:se,iridescenceThicknessMap:ve,sheen:G,sheenColorMap:Fe,sheenRoughnessMap:ye,specularMap:Se,specularColorMap:Le,specularIntensityMap:Ve,transmission:$,transmissionMap:$e,thicknessMap:B,gradientMap:ge,opaque:y.transparent===!1&&y.blending===Fs&&y.alphaToCoverage===!1,alphaMap:ie,alphaTest:xe,alphaHash:be,combine:y.combine,mapUv:Xe&&g(y.map.channel),aoMapUv:me&&g(y.aoMap.channel),lightMapUv:Ye&&g(y.lightMap.channel),bumpMapUv:et&&g(y.bumpMap.channel),normalMapUv:ut&&g(y.normalMap.channel),displacementMapUv:_t&&g(y.displacementMap.channel),emissiveMapUv:kt&&g(y.emissiveMap.channel),metalnessMapUv:yt&&g(y.metalnessMap.channel),roughnessMapUv:bt&&g(y.roughnessMap.channel),anisotropyMapUv:Q&&g(y.anisotropyMap.channel),clearcoatMapUv:de&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:_e&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:se&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:ve&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:ye&&g(y.sheenRoughnessMap.channel),specularMapUv:Se&&g(y.specularMap.channel),specularColorMapUv:Le&&g(y.specularColorMap.channel),specularIntensityMapUv:Ve&&g(y.specularIntensityMap.channel),transmissionMapUv:$e&&g(y.transmissionMap.channel),thicknessMapUv:B&&g(y.thicknessMap.channel),alphaMapUv:ie&&g(y.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(ut||k),vertexNormals:!!q.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!q.attributes.uv&&(Xe||ie),fog:!!U,useFog:y.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||q.attributes.normal===void 0&&ut===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Pe,skinning:H.isSkinnedMesh===!0,hasPositionAttribute:q.attributes.position!==void 0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Oe,morphTextureStride:Ae,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:Y.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ue,decodeVideoTexture:Xe&&y.map.isVideoTexture===!0&&rt.getTransfer(y.map.colorSpace)===ht,decodeVideoTextureEmissive:kt&&y.emissiveMap.isVideoTexture===!0&&rt.getTransfer(y.emissiveMap.colorSpace)===ht,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===_n,flipSided:y.side===Zt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ae&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&y.extensions.multiDraw===!0||Re)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ne.vertexUv1s=l.has(1),Ne.vertexUv2s=l.has(2),Ne.vertexUv3s=l.has(3),l.clear(),Ne}function m(y){let T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(let D in y.defines)T.push(D),T.push(y.defines[D]);return y.isRawShaderMaterial===!1&&(p(T,y),b(T,y),T.push(i.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function p(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numSunLights),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numSunLightShadows),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function b(y,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function S(y){let T=f[y.type],D;if(T){let O=Wn[T];D=$u.clone(O.uniforms)}else D=y.uniforms;return D}function x(y,T){let D=h.get(T);return D!==void 0?++D.usedTimes:(D=new v_(i,T,y,r),c.push(D),h.set(T,D)),D}function w(y){if(--y.usedTimes===0){let T=c.indexOf(y);c[T]=c[c.length-1],c.pop(),h.delete(y.cacheKey),y.destroy()}}function E(y){o.remove(y)}function P(){o.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:S,acquireProgram:x,releaseProgram:w,releaseShaderCache:E,programs:c,dispose:P}}function E_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function w_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function pd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function md(){let i=[],e=0,t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,v,m,p){let b=i[e];return b===void 0?(b={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:m,group:p},i[e]=b):(b.id=u.id,b.object=u,b.geometry=f,b.material=g,b.materialVariant=a(u),b.groupOrder=v,b.renderOrder=u.renderOrder,b.z=m,b.group=p),e++,b}function l(u,f,g,v,m,p,b){b.reversedDepth===!0&&(m=-m);let S=o(u,f,g,v,m,p);g.transmission>0?n.push(S):g.transparent===!0?r.push(S):t.push(S)}function c(u,f,g,v,m,p){let b=o(u,f,g,v,m,p);g.transmission>0?n.unshift(b):g.transparent===!0?r.unshift(b):t.unshift(b)}function h(u,f){t.length>1&&t.sort(u||w_),n.length>1&&n.sort(f||pd),r.length>1&&r.sort(f||pd)}function d(){for(let u=e,f=i.length;u<f;u++){let g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:d,sort:h}}function T_(){let i=new WeakMap;function e(n,r){let s=i.get(n),a;return s===void 0?(a=new md,i.set(n,[a])):r>=s.length?(a=new md,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function A_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new I,color:new Je};break;case"SpotLight":t={position:new I,direction:new I,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function R_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var C_=0;function P_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function I_(i){let e=new A_,t=R_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);let r=new I,s=new gt,a=new gt;function o(c){let h=0,d=0,u=0;for(let H=0;H<9;H++)n.probe[H].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,b=0,S=0,x=0,w=0,E=0,P=0,y=0,T=0,D=0;c.sort(P_);for(let H=0,Y=c.length;H<Y;H++){let U=c[H],q=U.color,K=U.intensity,Z=U.distance,le=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===wi?le=U.shadow.map.texture:le=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)h+=q.r*K,d+=q.g*K,u+=q.b*K;else if(U.isLightProbe){for(let te=0;te<9;te++)n.probe[te].addScaledVector(U.sh.coefficients[te],K);D++}else if(U.isSunLight){let te=e.get(U);if(te.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let ne=U.shadow,oe=t.get(U);oe.shadowIntensity=ne.intensity,oe.shadowBias=ne.bias,oe.shadowNormalBias=ne.normalBias,oe.shadowRadius=ne.radius,oe.shadowMapSize.copy(ne.mapSize).multiply(ne.getFrameExtents()),n.sunShadow[g]=oe,n.sunShadowMap[g]=le;let Oe=ne.getViewportCount();for(let Ae=0;Ae<Oe;Ae++)n.sunShadowMatrix[v+Ae]=ne.getMatrix(Ae),n.sunShadowCascade[v+Ae]=ne._cascadeData[Ae];v+=Oe,g++}n.sun[f]=te,f++}else if(U.isDirectionalLight){let te=e.get(U);if(te.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let ne=U.shadow,oe=t.get(U);oe.shadowIntensity=ne.intensity,oe.shadowBias=ne.bias,oe.shadowNormalBias=ne.normalBias,oe.shadowRadius=ne.radius,oe.shadowMapSize=ne.mapSize,n.directionalShadow[m]=oe,n.directionalShadowMap[m]=le,n.directionalShadowMatrix[m]=U.shadow.matrix,w++}n.directional[m]=te,m++}else if(U.isSpotLight){let te=e.get(U);te.position.setFromMatrixPosition(U.matrixWorld),te.color.copy(q).multiplyScalar(K),te.distance=Z,te.coneCos=Math.cos(U.angle),te.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),te.decay=U.decay,n.spot[b]=te;let ne=U.shadow;if(U.map&&(n.spotLightMap[y]=U.map,y++,ne.updateMatrices(U),U.castShadow&&T++),n.spotLightMatrix[b]=ne.matrix,U.castShadow){let oe=t.get(U);oe.shadowIntensity=ne.intensity,oe.shadowBias=ne.bias,oe.shadowNormalBias=ne.normalBias,oe.shadowRadius=ne.radius,oe.shadowMapSize=ne.mapSize,n.spotShadow[b]=oe,n.spotShadowMap[b]=le,P++}b++}else if(U.isRectAreaLight){let te=e.get(U);te.color.copy(q).multiplyScalar(K),te.halfWidth.set(U.width*.5,0,0),te.halfHeight.set(0,U.height*.5,0),n.rectArea[S]=te,S++}else if(U.isPointLight){let te=e.get(U);if(te.color.copy(U.color).multiplyScalar(U.intensity),te.distance=U.distance,te.decay=U.decay,U.castShadow){let ne=U.shadow,oe=t.get(U);oe.shadowIntensity=ne.intensity,oe.shadowBias=ne.bias,oe.shadowNormalBias=ne.normalBias,oe.shadowRadius=ne.radius,oe.shadowMapSize=ne.mapSize,oe.shadowCameraNear=ne.camera.near,oe.shadowCameraFar=ne.camera.far,n.pointShadow[p]=oe,n.pointShadowMap[p]=le,n.pointShadowMatrix[p]=U.shadow.matrix,E++}n.point[p]=te,p++}else if(U.isHemisphereLight){let te=e.get(U);te.skyColor.copy(U.color).multiplyScalar(K),te.groundColor.copy(U.groundColor).multiplyScalar(K),n.hemi[x]=te,x++}}S>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=we.LTC_FLOAT_1,n.rectAreaLTC2=we.LTC_FLOAT_2):(n.rectAreaLTC1=we.LTC_HALF_1,n.rectAreaLTC2=we.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let O=n.hash;(O.sunLength!==f||O.directionalLength!==m||O.pointLength!==p||O.spotLength!==b||O.rectAreaLength!==S||O.hemiLength!==x||O.numSunShadows!==g||O.numDirectionalShadows!==w||O.numPointShadows!==E||O.numSpotShadows!==P||O.numSpotMaps!==y||O.numLightProbes!==D)&&(n.sun.length=f,n.directional.length=m,n.spot.length=b,n.rectArea.length=S,n.point.length=p,n.hemi.length=x,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=P,n.spotShadowMap.length=P,n.spotLightMatrix.length=P+y-T,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=D,O.sunLength=f,O.directionalLength=m,O.pointLength=p,O.spotLength=b,O.rectAreaLength=S,O.hemiLength=x,O.numSunShadows=g,O.numDirectionalShadows=w,O.numPointShadows=E,O.numSpotShadows=P,O.numSpotMaps=y,O.numLightProbes=D,n.version=C_++)}function l(c,h){let d=0,u=0,f=0,g=0,v=0,m=0,p=h.matrixWorldInverse;for(let b=0,S=c.length;b<S;b++){let x=c[b];if(x.isSunLight){let w=n.sun[d];w.direction.setFromMatrixPosition(x.matrixWorld),w.direction.transformDirection(p),d++}else if(x.isDirectionalLight){let w=n.directional[u];w.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(p),u++}else if(x.isSpotLight){let w=n.spot[g];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(p),w.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(p),g++}else if(x.isRectAreaLight){let w=n.rectArea[v];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(p),a.identity(),s.copy(x.matrixWorld),s.premultiply(p),a.extractRotation(s),w.halfWidth.set(x.width*.5,0,0),w.halfHeight.set(0,x.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),v++}else if(x.isPointLight){let w=n.point[f];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(p),f++}else if(x.isHemisphereLight){let w=n.hemi[m];w.direction.setFromMatrixPosition(x.matrixWorld),w.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:n}}function gd(i){let e=new I_(i),t=[],n=[],r=[];function s(u){d.camera=u,t.length=0,n.length=0,r.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){r.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function L_(i){let e=new WeakMap;function t(r,s=0){let a=e.get(r),o;return a===void 0?(o=new gd(i),e.set(r,[o])):s>=a.length?(o=new gd(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var D_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,N_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,U_=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],O_=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],_d=new gt,$r=new I,nh=new I;function F_(i,e,t){let n=new Ps,r=new Me,s=new Me,a=new Mt,o=new xa,l=new va,c={},h=t.maxTextureSize,d={[Si]:Zt,[Zt]:Si,[_n]:_n},u=new un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Me},radius:{value:4}},vertexShader:D_,fragmentShader:N_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new Pt;g.setAttribute("position",new an(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new $t(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wi;let p=this.type;this.render=function(E,P,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===uu&&(He("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Wi);let T=i.getRenderTarget(),D=i.getActiveCubeFace(),O=i.getActiveMipmapLevel(),H=i.state;H.setBlending(Hn),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);let Y=p!==this.type;Y&&P.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(q=>q.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,q=E.length;U<q;U++){let K=E[U],Z=K.shadow;if(Z===void 0){He("WebGLShadowMap:",K,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;r.copy(Z.mapSize);let le=Z.getFrameExtents();r.multiply(le),s.copy(Z.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/le.x),r.x=s.x*le.x,Z.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/le.y),r.y=s.y*le.y,Z.mapSize.y=s.y));let te=i.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=te,Z.map===null||Y===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===Os){if(K.isPointLight){He("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new jt(r.x,r.y,{format:wi,type:Dn,minFilter:Bt,magFilter:Bt,generateMipmaps:!1}),Z.map.texture.name=K.name+".shadowMap",Z.map.depthTexture=new pi(r.x,r.y,Ln),Z.map.depthTexture.name=K.name+".shadowMapDepth",Z.map.depthTexture.format=zn,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Ot,Z.map.depthTexture.magFilter=Ot}else K.isPointLight?(Z.map=new wl(r.x),Z.map.depthTexture=new ha(r.x,In)):(Z.map=new jt(r.x,r.y),Z.map.depthTexture=new pi(r.x,r.y,In)),Z.map.depthTexture.name=K.name+".shadowMap",Z.map.depthTexture.format=zn,this.type===Wi?(Z.map.depthTexture.compareFunction=te?Sl:vl,Z.map.depthTexture.minFilter=Bt,Z.map.depthTexture.magFilter=Bt):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Ot,Z.map.depthTexture.magFilter=Ot);Z.camera.updateProjectionMatrix()}Z.map.isWebGLCubeRenderTarget!==!0&&(Z.map.width!==r.x||Z.map.height!==r.y)&&Z.map.setSize(r.x,r.y);let ne=Z.map.isWebGLCubeRenderTarget?6:Z.getViewportCount();K.isPointLight!==!0&&Z.updateMatrices(K,y);for(let oe=0;oe<ne;oe++){let Oe=Z.getCamera(oe);if(K.isPointLight){let Ae=Z.camera,tt=Z.matrix,Be=K.distance||Ae.far;Be!==Ae.far&&(Ae.far=Be,Ae.updateProjectionMatrix()),$r.setFromMatrixPosition(K.matrixWorld),Ae.position.copy($r),nh.copy(Ae.position),nh.add(U_[oe]),Ae.up.copy(O_[oe]),Ae.lookAt(nh),Ae.updateMatrixWorld(),tt.makeTranslation(-$r.x,-$r.y,-$r.z),_d.multiplyMatrices(Ae.projectionMatrix,Ae.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(_d,Ae.coordinateSystem,Ae.reversedDepth)}if(Z.map.isWebGLCubeRenderTarget)i.setRenderTarget(Z.map,oe),i.clear();else{oe===0&&(i.setRenderTarget(Z.map),i.clear());let Ae=Z.getViewport(oe);a.set(s.x*Ae.x,s.y*Ae.y,s.x*Ae.z,s.y*Ae.w),H.viewport(a)}n=Z.getFrustum(oe),x(P,y,Oe,K,this.type)}Z.isPointLightShadow!==!0&&this.type===Os&&b(Z,y),Z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(T,D,O)};function b(E,P){let y=e.update(v);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null?E.mapPass=new jt(r.x,r.y,{format:wi,type:Dn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(P,null,y,u,v,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(P,null,y,f,v,null)}function S(E,P,y,T){let D=null,O=y.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(O!==void 0)D=O;else if(D=y.isPointLight===!0?l:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let H=D.uuid,Y=P.uuid,U=c[H];U===void 0&&(U={},c[H]=U);let q=U[Y];q===void 0&&(q=D.clone(),U[Y]=q,P.addEventListener("dispose",w)),D=q}if(D.visible=P.visible,D.wireframe=P.wireframe,T===Os?D.side=P.shadowSide!==null?P.shadowSide:P.side:D.side=P.shadowSide!==null?P.shadowSide:d[P.side],D.alphaMap=P.alphaMap,D.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,D.map=P.map,D.clipShadows=P.clipShadows,D.clippingPlanes=P.clippingPlanes,D.clipIntersection=P.clipIntersection,D.displacementMap=P.displacementMap,D.displacementScale=P.displacementScale,D.displacementBias=P.displacementBias,D.wireframeLinewidth=P.wireframeLinewidth,D.linewidth=P.linewidth,y.isPointLight===!0&&D.isMeshDistanceMaterial===!0){let H=i.properties.get(D);H.light=y}return D}function x(E,P,y,T,D){if(E.visible===!1)return;if(E.layers.test(P.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&D===Os)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,E.matrixWorld);let Y=e.update(E),U=E.material;if(Array.isArray(U)){let q=Y.groups;for(let K=0,Z=q.length;K<Z;K++){let le=q[K],te=U[le.materialIndex];if(te&&te.visible){let ne=S(E,te,T,D);E.onBeforeShadow(i,E,P,y,Y,ne,le),i.renderBufferDirect(y,null,Y,ne,E,le),E.onAfterShadow(i,E,P,y,Y,ne,le)}}}else if(U.visible){let q=S(E,U,T,D);E.onBeforeShadow(i,E,P,y,Y,q,null),i.renderBufferDirect(y,null,Y,q,E,null),E.onAfterShadow(i,E,P,y,Y,q,null)}}let H=E.children;for(let Y=0,U=H.length;Y<U;Y++)x(H[Y],P,y,T,D)}function w(E){E.target.removeEventListener("dispose",w);for(let y in c){let T=c[y],D=E.target.uuid;D in T&&(T[D].dispose(),delete T[D])}}}function B_(i,e){function t(){let B=!1,ge=new Mt,ie=null,xe=new Mt(0,0,0,0);return{setMask:function(be){ie!==be&&!B&&(i.colorMask(be,be,be,be),ie=be)},setLocked:function(be){B=be},setClear:function(be,ae,Ue,Ne,pt){pt===!0&&(be*=Ne,ae*=Ne,Ue*=Ne),ge.set(be,ae,Ue,Ne),xe.equals(ge)===!1&&(i.clearColor(be,ae,Ue,Ne),xe.copy(ge))},reset:function(){B=!1,ie=null,xe.set(-1,0,0,0)}}}function n(){let B=!1,ge=!1,ie=null,xe=null,be=null;return{setReversed:function(ae){if(ge!==ae){let Ue=e.get("EXT_clip_control");ae?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT),ge=ae;let Ne=be;be=null,this.setClear(Ne)}},getReversed:function(){return ge},setTest:function(ae){ae?re(i.DEPTH_TEST):Pe(i.DEPTH_TEST)},setMask:function(ae){ie!==ae&&!B&&(i.depthMask(ae),ie=ae)},setFunc:function(ae){if(ge&&(ae=Xu[ae]),xe!==ae){switch(ae){case qo:i.depthFunc(i.NEVER);break;case Yo:i.depthFunc(i.ALWAYS);break;case $o:i.depthFunc(i.LESS);break;case Ms:i.depthFunc(i.LEQUAL);break;case Zo:i.depthFunc(i.EQUAL);break;case Jo:i.depthFunc(i.GEQUAL);break;case Ko:i.depthFunc(i.GREATER);break;case jo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}xe=ae}},setLocked:function(ae){B=ae},setClear:function(ae){be!==ae&&(be=ae,ge&&(ae=1-ae),i.clearDepth(ae))},reset:function(){B=!1,ie=null,xe=null,be=null,ge=!1}}}function r(){let B=!1,ge=null,ie=null,xe=null,be=null,ae=null,Ue=null,Ne=null,pt=null;return{setTest:function(lt){B||(lt?re(i.STENCIL_TEST):Pe(i.STENCIL_TEST))},setMask:function(lt){ge!==lt&&!B&&(i.stencilMask(lt),ge=lt)},setFunc:function(lt,Jt,At){(ie!==lt||xe!==Jt||be!==At)&&(i.stencilFunc(lt,Jt,At),ie=lt,xe=Jt,be=At)},setOp:function(lt,Jt,At){(ae!==lt||Ue!==Jt||Ne!==At)&&(i.stencilOp(lt,Jt,At),ae=lt,Ue=Jt,Ne=At)},setLocked:function(lt){B=lt},setClear:function(lt){pt!==lt&&(i.clearStencil(lt),pt=lt)},reset:function(){B=!1,ge=null,ie=null,xe=null,be=null,ae=null,Ue=null,Ne=null,pt=null}}}let s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,g=[],v=null,m=!1,p=null,b=null,S=null,x=null,w=null,E=null,P=null,y=new Je(0,0,0),T=0,D=!1,O=null,H=null,Y=null,U=null,q=null,K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,le=0,te=i.getParameter(i.VERSION);te.indexOf("WebGL")!==-1?(le=parseFloat(/^WebGL (\d)/.exec(te)[1]),Z=le>=1):te.indexOf("OpenGL ES")!==-1&&(le=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),Z=le>=2);let ne=null,oe={},Oe=i.getParameter(i.SCISSOR_BOX),Ae=i.getParameter(i.VIEWPORT),tt=new Mt().fromArray(Oe),Be=new Mt().fromArray(Ae);function ot(B,ge,ie,xe){let be=new Uint8Array(4),ae=i.createTexture();i.bindTexture(B,ae),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ue=0;Ue<ie;Ue++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(ge,0,i.RGBA,1,1,xe,0,i.RGBA,i.UNSIGNED_BYTE,be):i.texImage2D(ge+Ue,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,be);return ae}let j={};j[i.TEXTURE_2D]=ot(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=ot(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=ot(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=ot(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),re(i.DEPTH_TEST),a.setFunc(Ms),et(!1),ut(Mc),re(i.CULL_FACE),me(Hn);function re(B){h[B]!==!0&&(i.enable(B),h[B]=!0)}function Pe(B){h[B]!==!1&&(i.disable(B),h[B]=!1)}function We(B,ge){return u[B]!==ge?(i.bindFramebuffer(B,ge),u[B]=ge,B===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ge),B===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ge),!0):!1}function Re(B,ge){let ie=g,xe=!1;if(B){ie=f.get(ge),ie===void 0&&(ie=[],f.set(ge,ie));let be=B.textures;if(ie.length!==be.length||ie[0]!==i.COLOR_ATTACHMENT0){for(let ae=0,Ue=be.length;ae<Ue;ae++)ie[ae]=i.COLOR_ATTACHMENT0+ae;ie.length=be.length,xe=!0}}else ie[0]!==i.BACK&&(ie[0]=i.BACK,xe=!0);xe&&i.drawBuffers(ie)}function Xe(B){return v!==B?(i.useProgram(B),v=B,!0):!1}let ue={[Xi]:i.FUNC_ADD,[fu]:i.FUNC_SUBTRACT,[pu]:i.FUNC_REVERSE_SUBTRACT};ue[mu]=i.MIN,ue[gu]=i.MAX;let Ie={[_u]:i.ZERO,[yu]:i.ONE,[xu]:i.SRC_COLOR,[Tc]:i.SRC_ALPHA,[wu]:i.SRC_ALPHA_SATURATE,[bu]:i.DST_COLOR,[Su]:i.DST_ALPHA,[vu]:i.ONE_MINUS_SRC_COLOR,[Ac]:i.ONE_MINUS_SRC_ALPHA,[Eu]:i.ONE_MINUS_DST_COLOR,[Mu]:i.ONE_MINUS_DST_ALPHA,[Tu]:i.CONSTANT_COLOR,[Au]:i.ONE_MINUS_CONSTANT_COLOR,[Ru]:i.CONSTANT_ALPHA,[Cu]:i.ONE_MINUS_CONSTANT_ALPHA};function me(B,ge,ie,xe,be,ae,Ue,Ne,pt,lt){if(B===Hn){m===!0&&(Pe(i.BLEND),m=!1);return}if(m===!1&&(re(i.BLEND),m=!0),B!==du){if(B!==p||lt!==D){if((b!==Xi||w!==Xi)&&(i.blendEquation(i.FUNC_ADD),b=Xi,w=Xi),lt)switch(B){case Fs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bc:i.blendFunc(i.ONE,i.ONE);break;case Ec:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case wc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ge("WebGLState: Invalid blending: ",B);break}else switch(B){case Fs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ec:Ge("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case wc:Ge("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ge("WebGLState: Invalid blending: ",B);break}S=null,x=null,E=null,P=null,y.set(0,0,0),T=0,p=B,D=lt}return}be=be||ge,ae=ae||ie,Ue=Ue||xe,(ge!==b||be!==w)&&(i.blendEquationSeparate(ue[ge],ue[be]),b=ge,w=be),(ie!==S||xe!==x||ae!==E||Ue!==P)&&(i.blendFuncSeparate(Ie[ie],Ie[xe],Ie[ae],Ie[Ue]),S=ie,x=xe,E=ae,P=Ue),(Ne.equals(y)===!1||pt!==T)&&(i.blendColor(Ne.r,Ne.g,Ne.b,pt),y.copy(Ne),T=pt),p=B,D=!1}function Ye(B,ge){B.side===_n?Pe(i.CULL_FACE):re(i.CULL_FACE);let ie=B.side===Zt;ge&&(ie=!ie),et(ie),B.blending===Fs&&B.transparent===!1?me(Hn):me(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),a.setFunc(B.depthFunc),a.setTest(B.depthTest),a.setMask(B.depthWrite),s.setMask(B.colorWrite);let xe=B.stencilWrite;o.setTest(xe),xe&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),kt(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?re(i.SAMPLE_ALPHA_TO_COVERAGE):Pe(i.SAMPLE_ALPHA_TO_COVERAGE)}function et(B){O!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),O=B)}function ut(B){B!==cu?(re(i.CULL_FACE),B!==H&&(B===Mc?i.cullFace(i.BACK):B===hu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Pe(i.CULL_FACE),H=B}function _t(B){B!==Y&&(Z&&i.lineWidth(B),Y=B)}function kt(B,ge,ie){B?(re(i.POLYGON_OFFSET_FILL),(U!==ge||q!==ie)&&(U=ge,q=ie,a.getReversed()&&(ge=-ge),i.polygonOffset(ge,ie))):Pe(i.POLYGON_OFFSET_FILL)}function yt(B){B?re(i.SCISSOR_TEST):Pe(i.SCISSOR_TEST)}function bt(B){B===void 0&&(B=i.TEXTURE0+K-1),ne!==B&&(i.activeTexture(B),ne=B)}function k(B,ge,ie){ie===void 0&&(ne===null?ie=i.TEXTURE0+K-1:ie=ne);let xe=oe[ie];xe===void 0&&(xe={type:void 0,texture:void 0},oe[ie]=xe),(xe.type!==B||xe.texture!==ge)&&(ne!==ie&&(i.activeTexture(ie),ne=ie),i.bindTexture(B,ge||j[B]),xe.type=B,xe.texture=ge)}function Nt(){let B=oe[ne];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function ct(){try{i.compressedTexImage2D(...arguments)}catch(B){Ge("WebGLState:",B)}}function L(){try{i.compressedTexImage3D(...arguments)}catch(B){Ge("WebGLState:",B)}}function _(){try{i.texSubImage2D(...arguments)}catch(B){Ge("WebGLState:",B)}}function G(){try{i.texSubImage3D(...arguments)}catch(B){Ge("WebGLState:",B)}}function $(){try{i.compressedTexSubImage2D(...arguments)}catch(B){Ge("WebGLState:",B)}}function Q(){try{i.compressedTexSubImage3D(...arguments)}catch(B){Ge("WebGLState:",B)}}function de(){try{i.texStorage2D(...arguments)}catch(B){Ge("WebGLState:",B)}}function _e(){try{i.texStorage3D(...arguments)}catch(B){Ge("WebGLState:",B)}}function ee(){try{i.texImage2D(...arguments)}catch(B){Ge("WebGLState:",B)}}function se(){try{i.texImage3D(...arguments)}catch(B){Ge("WebGLState:",B)}}function ve(B){return d[B]!==void 0?d[B]:i.getParameter(B)}function Fe(B,ge){d[B]!==ge&&(i.pixelStorei(B,ge),d[B]=ge)}function ye(B){tt.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),tt.copy(B))}function Se(B){Be.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),Be.copy(B))}function Le(B,ge){let ie=c.get(ge);ie===void 0&&(ie=new WeakMap,c.set(ge,ie));let xe=ie.get(B);xe===void 0&&(xe=i.getUniformBlockIndex(ge,B.name),ie.set(B,xe))}function Ve(B,ge){let xe=c.get(ge).get(B);l.get(ge)!==xe&&(i.uniformBlockBinding(ge,xe,B.__bindingPointIndex),l.set(ge,xe))}function $e(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},ne=null,oe={},u={},f=new WeakMap,g=[],v=null,m=!1,p=null,b=null,S=null,x=null,w=null,E=null,P=null,y=new Je(0,0,0),T=0,D=!1,O=null,H=null,Y=null,U=null,q=null,tt.set(0,0,i.canvas.width,i.canvas.height),Be.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:re,disable:Pe,bindFramebuffer:We,drawBuffers:Re,useProgram:Xe,setBlending:me,setMaterial:Ye,setFlipSided:et,setCullFace:ut,setLineWidth:_t,setPolygonOffset:kt,setScissorTest:yt,activeTexture:bt,bindTexture:k,unbindTexture:Nt,compressedTexImage2D:ct,compressedTexImage3D:L,texImage2D:ee,texImage3D:se,pixelStorei:Fe,getParameter:ve,updateUBOMapping:Le,uniformBlockBinding:Ve,texStorage2D:de,texStorage3D:_e,texSubImage2D:_,texSubImage3D:G,compressedTexSubImage2D:$,compressedTexSubImage3D:Q,scissor:ye,viewport:Se,reset:$e}}function k_(i,e,t,n,r,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Me,h=new WeakMap,d=new Set,u,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(L,_){return g?new OffscreenCanvas(L,_):fr("canvas")}function m(L,_,G){let $=1,Q=ct(L);if((Q.width>G||Q.height>G)&&($=G/Math.max(Q.width,Q.height)),$<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){let de=Math.floor($*Q.width),_e=Math.floor($*Q.height);u===void 0&&(u=v(de,_e));let ee=_?v(de,_e):u;return ee.width=de,ee.height=_e,ee.getContext("2d").drawImage(L,0,0,de,_e),He("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+de+"x"+_e+")."),ee}else return"data"in L&&He("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),L;return L}function p(L){return L.generateMipmaps}function b(L){i.generateMipmap(L)}function S(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(L,_,G,$,Q,de=!1){if(L!==null){if(i[L]!==void 0)return i[L];He("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let _e;$&&(_e=e.get("EXT_texture_norm16"),_e||He("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ee=_;if(_===i.RED&&(G===i.FLOAT&&(ee=i.R32F),G===i.HALF_FLOAT&&(ee=i.R16F),G===i.UNSIGNED_BYTE&&(ee=i.R8),G===i.UNSIGNED_SHORT&&_e&&(ee=_e.R16_EXT),G===i.SHORT&&_e&&(ee=_e.R16_SNORM_EXT)),_===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(ee=i.R8UI),G===i.UNSIGNED_SHORT&&(ee=i.R16UI),G===i.UNSIGNED_INT&&(ee=i.R32UI),G===i.BYTE&&(ee=i.R8I),G===i.SHORT&&(ee=i.R16I),G===i.INT&&(ee=i.R32I)),_===i.RG&&(G===i.FLOAT&&(ee=i.RG32F),G===i.HALF_FLOAT&&(ee=i.RG16F),G===i.UNSIGNED_BYTE&&(ee=i.RG8),G===i.UNSIGNED_SHORT&&_e&&(ee=_e.RG16_EXT),G===i.SHORT&&_e&&(ee=_e.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(ee=i.RG8UI),G===i.UNSIGNED_SHORT&&(ee=i.RG16UI),G===i.UNSIGNED_INT&&(ee=i.RG32UI),G===i.BYTE&&(ee=i.RG8I),G===i.SHORT&&(ee=i.RG16I),G===i.INT&&(ee=i.RG32I)),_===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(ee=i.RGB8UI),G===i.UNSIGNED_SHORT&&(ee=i.RGB16UI),G===i.UNSIGNED_INT&&(ee=i.RGB32UI),G===i.BYTE&&(ee=i.RGB8I),G===i.SHORT&&(ee=i.RGB16I),G===i.INT&&(ee=i.RGB32I)),_===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(ee=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(ee=i.RGBA16UI),G===i.UNSIGNED_INT&&(ee=i.RGBA32UI),G===i.BYTE&&(ee=i.RGBA8I),G===i.SHORT&&(ee=i.RGBA16I),G===i.INT&&(ee=i.RGBA32I)),_===i.RGB&&(G===i.UNSIGNED_SHORT&&_e&&(ee=_e.RGB16_EXT),G===i.SHORT&&_e&&(ee=_e.RGB16_SNORM_EXT),G===i.UNSIGNED_INT_5_9_9_9_REV&&(ee=i.RGB9_E5),G===i.UNSIGNED_INT_10F_11F_11F_REV&&(ee=i.R11F_G11F_B10F)),_===i.RGBA){let se=de?dr:rt.getTransfer(Q);G===i.FLOAT&&(ee=i.RGBA32F),G===i.HALF_FLOAT&&(ee=i.RGBA16F),G===i.UNSIGNED_BYTE&&(ee=se===ht?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT&&_e&&(ee=_e.RGBA16_EXT),G===i.SHORT&&_e&&(ee=_e.RGBA16_SNORM_EXT),G===i.UNSIGNED_SHORT_4_4_4_4&&(ee=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(ee=i.RGB5_A1)}return(ee===i.R16F||ee===i.R32F||ee===i.RG16F||ee===i.RG32F||ee===i.RGBA16F||ee===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function w(L,_){let G;return L?_===null||_===In||_===ks?G=i.DEPTH24_STENCIL8:_===Ln?G=i.DEPTH32F_STENCIL8:_===Bs&&(G=i.DEPTH24_STENCIL8,He("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===In||_===ks?G=i.DEPTH_COMPONENT24:_===Ln?G=i.DEPTH_COMPONENT32F:_===Bs&&(G=i.DEPTH_COMPONENT16),G}function E(L,_){return p(L)===!0||L.isFramebufferTexture&&L.minFilter!==Ot&&L.minFilter!==Bt?Math.log2(Math.max(_.width,_.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?_.mipmaps.length:1}function P(L){let _=L.target;_.removeEventListener("dispose",P),T(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&d.delete(_)}function y(L){let _=L.target;_.removeEventListener("dispose",y),O(_)}function T(L){let _=n.get(L);if(_.__webglInit===void 0)return;let G=L.source,$=f.get(G);if($){let Q=$[_.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&D(L),Object.keys($).length===0&&f.delete(G)}n.remove(L)}function D(L){let _=n.get(L);i.deleteTexture(_.__webglTexture);let G=L.source,$=f.get(G);delete $[_.__cacheKey],a.memory.textures--}function O(L){let _=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(_.__webglFramebuffer[$]))for(let Q=0;Q<_.__webglFramebuffer[$].length;Q++)i.deleteFramebuffer(_.__webglFramebuffer[$][Q]);else i.deleteFramebuffer(_.__webglFramebuffer[$]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[$])}else{if(Array.isArray(_.__webglFramebuffer))for(let $=0;$<_.__webglFramebuffer.length;$++)i.deleteFramebuffer(_.__webglFramebuffer[$]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let $=0;$<_.__webglColorRenderbuffer.length;$++)_.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[$]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let G=L.textures;for(let $=0,Q=G.length;$<Q;$++){let de=n.get(G[$]);de.__webglTexture&&(i.deleteTexture(de.__webglTexture),a.memory.textures--),n.remove(G[$])}n.remove(L)}let H=0;function Y(){H=0}function U(){return H}function q(L){H=L}function K(){let L=H;return L>=r.maxTextures&&He("WebGLTextures: Trying to use "+(L+1)+" texture units while this GPU supports only "+r.maxTextures),H+=1,L}function Z(L){let _=[];return _.push(L.wrapS),_.push(L.wrapT),_.push(L.wrapR||0),_.push(L.magFilter),_.push(L.minFilter),_.push(L.anisotropy),_.push(L.internalFormat),_.push(L.format),_.push(L.type),_.push(L.generateMipmaps),_.push(L.premultiplyAlpha),_.push(L.flipY),_.push(L.unpackAlignment),_.push(L.colorSpace),_.join()}function le(L,_){let G=n.get(L);if(L.isVideoTexture&&k(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&G.__version!==L.version){let $=L.image;if($===null)He("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)He("WebGLRenderer: Texture marked for update but image is incomplete");else{Pe(G,L,_);return}}else L.isExternalTexture&&(G.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+_)}function te(L,_){let G=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&G.__version!==L.version){Pe(G,L,_);return}else L.isExternalTexture&&(G.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+_)}function ne(L,_){let G=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&G.__version!==L.version){Pe(G,L,_);return}t.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+_)}function oe(L,_){let G=n.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&G.__version!==L.version){We(G,L,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+_)}let Oe={[Qo]:i.REPEAT,[kn]:i.CLAMP_TO_EDGE,[ea]:i.MIRRORED_REPEAT},Ae={[Ot]:i.NEAREST,[Lu]:i.NEAREST_MIPMAP_NEAREST,[zr]:i.NEAREST_MIPMAP_LINEAR,[Bt]:i.LINEAR,[Oa]:i.LINEAR_MIPMAP_NEAREST,[bi]:i.LINEAR_MIPMAP_LINEAR},tt={[Ou]:i.NEVER,[Vu]:i.ALWAYS,[Fu]:i.LESS,[vl]:i.LEQUAL,[Bu]:i.EQUAL,[Sl]:i.GEQUAL,[ku]:i.GREATER,[zu]:i.NOTEQUAL};function Be(L,_){if(_.type===Ln&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Bt||_.magFilter===Oa||_.magFilter===zr||_.magFilter===bi||_.minFilter===Bt||_.minFilter===Oa||_.minFilter===zr||_.minFilter===bi)&&He("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,Oe[_.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,Oe[_.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,Oe[_.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,Ae[_.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,Ae[_.minFilter]),_.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,tt[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ot||_.minFilter!==zr&&_.minFilter!==bi||_.type===Ln&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let G=e.get("EXT_texture_filter_anisotropic");i.texParameterf(L,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function ot(L,_){let G=!1;L.__webglInit===void 0&&(L.__webglInit=!0,_.addEventListener("dispose",P));let $=_.source,Q=f.get($);Q===void 0&&(Q={},f.set($,Q));let de=Z(_);if(de!==L.__cacheKey){Q[de]===void 0&&(Q[de]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),Q[de].usedTimes++;let _e=Q[L.__cacheKey];_e!==void 0&&(Q[L.__cacheKey].usedTimes--,_e.usedTimes===0&&D(_)),L.__cacheKey=de,L.__webglTexture=Q[de].texture}return G}function j(L,_,G){return Math.floor(Math.floor(L/G)/_)}function re(L,_,G,$){let de=L.updateRanges;if(de.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,G,$,_.data);else{de.sort((Fe,ye)=>Fe.start-ye.start);let _e=0;for(let Fe=1;Fe<de.length;Fe++){let ye=de[_e],Se=de[Fe],Le=ye.start+ye.count,Ve=j(Se.start,_.width,4),$e=j(ye.start,_.width,4);Se.start<=Le+1&&Ve===$e&&j(Se.start+Se.count-1,_.width,4)===Ve?ye.count=Math.max(ye.count,Se.start+Se.count-ye.start):(++_e,de[_e]=Se)}de.length=_e+1;let ee=t.getParameter(i.UNPACK_ROW_LENGTH),se=t.getParameter(i.UNPACK_SKIP_PIXELS),ve=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Fe=0,ye=de.length;Fe<ye;Fe++){let Se=de[Fe],Le=Math.floor(Se.start/4),Ve=Math.ceil(Se.count/4),$e=Le%_.width,B=Math.floor(Le/_.width),ge=Ve,ie=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,$e),t.pixelStorei(i.UNPACK_SKIP_ROWS,B),t.texSubImage2D(i.TEXTURE_2D,0,$e,B,ge,ie,G,$,_.data)}L.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,ee),t.pixelStorei(i.UNPACK_SKIP_PIXELS,se),t.pixelStorei(i.UNPACK_SKIP_ROWS,ve)}}function Pe(L,_,G){let $=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&($=i.TEXTURE_3D);let Q=ot(L,_),de=_.source;t.bindTexture($,L.__webglTexture,i.TEXTURE0+G);let _e=n.get(de);if(de.version!==_e.__version||Q===!0){if(t.activeTexture(i.TEXTURE0+G),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let ie=rt.getPrimaries(rt.workingColorSpace),xe=_.colorSpace===ti?null:rt.getPrimaries(_.colorSpace),be=_.colorSpace===ti||ie===xe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,be)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let se=m(_.image,!1,r.maxTextureSize);se=Nt(_,se);let ve=s.convert(_.format,_.colorSpace),Fe=s.convert(_.type),ye=x(_.internalFormat,ve,Fe,_.normalized,_.colorSpace,_.isVideoTexture);Be($,_);let Se,Le=_.mipmaps,Ve=_.isVideoTexture!==!0,$e=_e.__version===void 0||Q===!0,B=de.dataReady,ge=E(_,se);if(_.isDepthTexture)ye=w(_.format===Ei,_.type),$e&&(Ve?t.texStorage2D(i.TEXTURE_2D,1,ye,se.width,se.height):t.texImage2D(i.TEXTURE_2D,0,ye,se.width,se.height,0,ve,Fe,null));else if(_.isDataTexture)if(Le.length>0){Ve&&$e&&t.texStorage2D(i.TEXTURE_2D,ge,ye,Le[0].width,Le[0].height);for(let ie=0,xe=Le.length;ie<xe;ie++)Se=Le[ie],Ve?B&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,Se.width,Se.height,ve,Fe,Se.data):t.texImage2D(i.TEXTURE_2D,ie,ye,Se.width,Se.height,0,ve,Fe,Se.data);_.generateMipmaps=!1}else Ve?($e&&t.texStorage2D(i.TEXTURE_2D,ge,ye,se.width,se.height),B&&re(_,se,ve,Fe)):t.texImage2D(i.TEXTURE_2D,0,ye,se.width,se.height,0,ve,Fe,se.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ve&&$e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,ye,Le[0].width,Le[0].height,se.depth);for(let ie=0,xe=Le.length;ie<xe;ie++)if(Se=Le[ie],_.format!==yn)if(ve!==null)if(Ve){if(B)if(_.layerUpdates.size>0){let be=Jc(Se.width,Se.height,_.format,_.type);for(let ae of _.layerUpdates){let Ue=Se.data.subarray(ae*be/Se.data.BYTES_PER_ELEMENT,(ae+1)*be/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,ae,Se.width,Se.height,1,ve,Ue)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,Se.width,Se.height,se.depth,ve,Se.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,ye,Se.width,Se.height,se.depth,0,Se.data,0,0);else He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?B&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,Se.width,Se.height,se.depth,ve,Fe,Se.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,ye,Se.width,Se.height,se.depth,0,ve,Fe,Se.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Ve&&$e&&t.texStorage2D(i.TEXTURE_2D,ge,ye,Le[0].width,Le[0].height);for(let ie=0,xe=Le.length;ie<xe;ie++)Se=Le[ie],_.format!==yn?ve!==null?Ve?B&&t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,Se.width,Se.height,ve,Se.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,ye,Se.width,Se.height,0,Se.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?B&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,Se.width,Se.height,ve,Fe,Se.data):t.texImage2D(i.TEXTURE_2D,ie,ye,Se.width,Se.height,0,ve,Fe,Se.data)}else if(_.isDataArrayTexture)if(Ve){if($e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,ye,se.width,se.height,se.depth),B)if(_.layerUpdates.size>0){let ie=Jc(se.width,se.height,_.format,_.type);for(let xe of _.layerUpdates){let be=se.data.subarray(xe*ie/se.data.BYTES_PER_ELEMENT,(xe+1)*ie/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,xe,se.width,se.height,1,ve,Fe,be)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,ve,Fe,se.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ye,se.width,se.height,se.depth,0,ve,Fe,se.data);else if(_.isData3DTexture)Ve?($e&&t.texStorage3D(i.TEXTURE_3D,ge,ye,se.width,se.height,se.depth),B&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,ve,Fe,se.data)):t.texImage3D(i.TEXTURE_3D,0,ye,se.width,se.height,se.depth,0,ve,Fe,se.data);else if(_.isFramebufferTexture){if($e)if(Ve)t.texStorage2D(i.TEXTURE_2D,ge,ye,se.width,se.height);else{let ie=se.width,xe=se.height;for(let be=0;be<ge;be++)t.texImage2D(i.TEXTURE_2D,be,ye,ie,xe,0,ve,Fe,null),ie>>=1,xe>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let ie=i.canvas;if(ie.hasAttribute("layoutsubtree")||ie.setAttribute("layoutsubtree","true"),se.parentNode!==ie){ie.appendChild(se),d.add(_),ie.onpaint=xe=>{let be=xe.changedElements;for(let ae of d)be.includes(ae.image)&&(ae.needsUpdate=!0)},ie.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,se);else{let be=i.RGBA,ae=i.RGBA,Ue=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,be,ae,Ue,se)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Le.length>0){if(Ve&&$e){let ie=ct(Le[0]);t.texStorage2D(i.TEXTURE_2D,ge,ye,ie.width,ie.height)}for(let ie=0,xe=Le.length;ie<xe;ie++)Se=Le[ie],Ve?B&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,ve,Fe,Se):t.texImage2D(i.TEXTURE_2D,ie,ye,ve,Fe,Se);_.generateMipmaps=!1}else if(Ve){if($e){let ie=ct(se);t.texStorage2D(i.TEXTURE_2D,ge,ye,ie.width,ie.height)}B&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ve,Fe,se)}else t.texImage2D(i.TEXTURE_2D,0,ye,ve,Fe,se);p(_)&&b($),_e.__version=de.version,_.onUpdate&&_.onUpdate(_)}L.__version=_.version}function We(L,_,G){if(_.image.length!==6)return;let $=ot(L,_),Q=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+G);let de=n.get(Q);if(Q.version!==de.__version||$===!0){t.activeTexture(i.TEXTURE0+G);let _e=rt.getPrimaries(rt.workingColorSpace),ee=_.colorSpace===ti?null:rt.getPrimaries(_.colorSpace),se=_.colorSpace===ti||_e===ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);let ve=_.isCompressedTexture||_.image[0].isCompressedTexture,Fe=_.image[0]&&_.image[0].isDataTexture,ye=[];for(let ae=0;ae<6;ae++)!ve&&!Fe?ye[ae]=m(_.image[ae],!0,r.maxCubemapSize):ye[ae]=Fe?_.image[ae].image:_.image[ae],ye[ae]=Nt(_,ye[ae]);let Se=ye[0],Le=s.convert(_.format,_.colorSpace),Ve=s.convert(_.type),$e=x(_.internalFormat,Le,Ve,_.normalized,_.colorSpace),B=_.isVideoTexture!==!0,ge=de.__version===void 0||$===!0,ie=Q.dataReady,xe=E(_,Se);Be(i.TEXTURE_CUBE_MAP,_);let be;if(ve){B&&ge&&t.texStorage2D(i.TEXTURE_CUBE_MAP,xe,$e,Se.width,Se.height);for(let ae=0;ae<6;ae++){be=ye[ae].mipmaps;for(let Ue=0;Ue<be.length;Ue++){let Ne=be[Ue];_.format!==yn?Le!==null?B?ie&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ue,0,0,Ne.width,Ne.height,Le,Ne.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ue,$e,Ne.width,Ne.height,0,Ne.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):B?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ue,0,0,Ne.width,Ne.height,Le,Ve,Ne.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ue,$e,Ne.width,Ne.height,0,Le,Ve,Ne.data)}}}else{if(be=_.mipmaps,B&&ge){be.length>0&&xe++;let ae=ct(ye[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,xe,$e,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(Fe){B?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,ye[ae].width,ye[ae].height,Le,Ve,ye[ae].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,$e,ye[ae].width,ye[ae].height,0,Le,Ve,ye[ae].data);for(let Ue=0;Ue<be.length;Ue++){let pt=be[Ue].image[ae].image;B?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ue+1,0,0,pt.width,pt.height,Le,Ve,pt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ue+1,$e,pt.width,pt.height,0,Le,Ve,pt.data)}}else{B?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Le,Ve,ye[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,$e,Le,Ve,ye[ae]);for(let Ue=0;Ue<be.length;Ue++){let Ne=be[Ue];B?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ue+1,0,0,Le,Ve,Ne.image[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ue+1,$e,Le,Ve,Ne.image[ae])}}}p(_)&&b(i.TEXTURE_CUBE_MAP),de.__version=Q.version,_.onUpdate&&_.onUpdate(_)}L.__version=_.version}function Re(L,_,G,$,Q,de){let _e=s.convert(G.format,G.colorSpace),ee=s.convert(G.type),se=x(G.internalFormat,_e,ee,G.normalized,G.colorSpace),ve=n.get(_),Fe=n.get(G);if(Fe.__renderTarget=_,!ve.__hasExternalTextures){let ye=Math.max(1,_.width>>de),Se=Math.max(1,_.height>>de);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,de,se,ye,Se,_.depth,0,_e,ee,null):t.texImage2D(Q,de,se,ye,Se,0,_e,ee,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),bt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,Q,Fe.__webglTexture,0,yt(_)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,Q,Fe.__webglTexture,de),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Xe(L,_,G){if(i.bindRenderbuffer(i.RENDERBUFFER,L),_.depthBuffer){let $=_.depthTexture,Q=$&&$.isDepthTexture?$.type:null,de=w(_.stencilBuffer,Q),_e=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;bt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt(_),de,_.width,_.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt(_),de,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,de,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,_e,i.RENDERBUFFER,L)}else{let $=_.textures;for(let Q=0;Q<$.length;Q++){let de=$[Q],_e=s.convert(de.format,de.colorSpace),ee=s.convert(de.type),se=x(de.internalFormat,_e,ee,de.normalized,de.colorSpace);bt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt(_),se,_.width,_.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt(_),se,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,se,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ue(L,_,G){let $=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Q=n.get(_.depthTexture);if(Q.__renderTarget=_,(!Q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),$){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,_.depthTexture.addEventListener("dispose",P)),Q.__webglTexture===void 0){Q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),Be(i.TEXTURE_CUBE_MAP,_.depthTexture);let ve=s.convert(_.depthTexture.format),Fe=s.convert(_.depthTexture.type),ye;_.depthTexture.format===zn?ye=i.DEPTH_COMPONENT24:_.depthTexture.format===Ei&&(ye=i.DEPTH24_STENCIL8);for(let Se=0;Se<6;Se++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,ye,_.width,_.height,0,ve,Fe,null)}}else le(_.depthTexture,0);let de=Q.__webglTexture,_e=yt(_),ee=$?i.TEXTURE_CUBE_MAP_POSITIVE_X+G:i.TEXTURE_2D,se=_.depthTexture.format===Ei?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===zn)bt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,se,ee,de,0,_e):i.framebufferTexture2D(i.FRAMEBUFFER,se,ee,de,0);else if(_.depthTexture.format===Ei)bt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,se,ee,de,0,_e):i.framebufferTexture2D(i.FRAMEBUFFER,se,ee,de,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ie(L){let _=n.get(L),G=L.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==L.depthTexture){let $=L.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),$){let Q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,$.removeEventListener("dispose",Q)};$.addEventListener("dispose",Q),_.__depthDisposeCallback=Q}_.__boundDepthTexture=$}if(L.depthTexture&&!_.__autoAllocateDepthBuffer)if(G)for(let $=0;$<6;$++)ue(_.__webglFramebuffer[$],L,$);else{let $=L.texture.mipmaps;$&&$.length>0?ue(_.__webglFramebuffer[0],L,0):ue(_.__webglFramebuffer,L,0)}else if(G){_.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[$]),_.__webglDepthbuffer[$]===void 0)_.__webglDepthbuffer[$]=i.createRenderbuffer(),Xe(_.__webglDepthbuffer[$],L,!1);else{let Q=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=_.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,de),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,de)}}else{let $=L.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Xe(_.__webglDepthbuffer,L,!1);else{let Q=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,de),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,de)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function me(L,_,G){let $=n.get(L);_!==void 0&&Re($.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&Ie(L)}function Ye(L){let _=L.texture,G=n.get(L),$=n.get(_);L.addEventListener("dispose",y);let Q=L.textures,de=L.isWebGLCubeRenderTarget===!0,_e=Q.length>1;if(_e||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=_.version,a.memory.textures++),de){G.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(_.mipmaps&&_.mipmaps.length>0){G.__webglFramebuffer[ee]=[];for(let se=0;se<_.mipmaps.length;se++)G.__webglFramebuffer[ee][se]=i.createFramebuffer()}else G.__webglFramebuffer[ee]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){G.__webglFramebuffer=[];for(let ee=0;ee<_.mipmaps.length;ee++)G.__webglFramebuffer[ee]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(_e)for(let ee=0,se=Q.length;ee<se;ee++){let ve=n.get(Q[ee]);ve.__webglTexture===void 0&&(ve.__webglTexture=i.createTexture(),a.memory.textures++)}if(L.samples>0&&bt(L)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let ee=0;ee<Q.length;ee++){let se=Q[ee];G.__webglColorRenderbuffer[ee]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[ee]);let ve=s.convert(se.format,se.colorSpace),Fe=s.convert(se.type),ye=x(se.internalFormat,ve,Fe,se.normalized,se.colorSpace,L.isXRRenderTarget===!0),Se=yt(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,Se,ye,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ee,i.RENDERBUFFER,G.__webglColorRenderbuffer[ee])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),Xe(G.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(de){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Be(i.TEXTURE_CUBE_MAP,_);for(let ee=0;ee<6;ee++)if(_.mipmaps&&_.mipmaps.length>0)for(let se=0;se<_.mipmaps.length;se++)Re(G.__webglFramebuffer[ee][se],L,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,se);else Re(G.__webglFramebuffer[ee],L,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);p(_)&&b(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){for(let ee=0,se=Q.length;ee<se;ee++){let ve=Q[ee],Fe=n.get(ve),ye=i.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ye=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ye,Fe.__webglTexture),Be(ye,ve),Re(G.__webglFramebuffer,L,ve,i.COLOR_ATTACHMENT0+ee,ye,0),p(ve)&&b(ye)}t.unbindTexture()}else{let ee=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ee=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ee,$.__webglTexture),Be(ee,_),_.mipmaps&&_.mipmaps.length>0)for(let se=0;se<_.mipmaps.length;se++)Re(G.__webglFramebuffer[se],L,_,i.COLOR_ATTACHMENT0,ee,se);else Re(G.__webglFramebuffer,L,_,i.COLOR_ATTACHMENT0,ee,0);p(_)&&b(ee),t.unbindTexture()}L.depthBuffer&&Ie(L)}function et(L){let _=L.textures;for(let G=0,$=_.length;G<$;G++){let Q=_[G];if(p(Q)){let de=S(L),_e=n.get(Q).__webglTexture;t.bindTexture(de,_e),b(de),t.unbindTexture()}}}let ut=[],_t=[];function kt(L){if(L.samples>0){if(bt(L)===!1){let _=L.textures,G=L.width,$=L.height,Q=i.COLOR_BUFFER_BIT,de=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=n.get(L),ee=_.length>1;if(ee)for(let ve=0;ve<_.length;ve++)t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer);let se=L.texture.mipmaps;se&&se.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let ve=0;ve<_.length;ve++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),ee){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,_e.__webglColorRenderbuffer[ve]);let Fe=n.get(_[ve]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Fe,0)}i.blitFramebuffer(0,0,G,$,0,0,G,$,Q,i.NEAREST),l===!0&&(ut.length=0,_t.length=0,ut.push(i.COLOR_ATTACHMENT0+ve),L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&(ut.push(de),_t.push(de),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,_t)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ut))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ee)for(let ve=0;ve<_.length;ve++){t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,_e.__webglColorRenderbuffer[ve]);let Fe=n.get(_[ve]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,Fe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&l){let _=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function yt(L){return Math.min(r.maxSamples,L.samples)}function bt(L){let _=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function k(L){let _=a.render.frame;h.get(L)!==_&&(h.set(L,_),L.update())}function Nt(L,_){let G=L.colorSpace,$=L.format,Q=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||G!==ur&&G!==ti&&(rt.getTransfer(G)===ht?($!==yn||Q!==Qt)&&He("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ge("WebGLTextures: Unsupported texture color space:",G)),_}function ct(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=Y,this.getTextureUnits=U,this.setTextureUnits=q,this.setTexture2D=le,this.setTexture2DArray=te,this.setTexture3D=ne,this.setTextureCube=oe,this.rebindTextures=me,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=et,this.updateMultisampleRenderTarget=kt,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=Re,this.useMultisampledRTT=bt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function z_(i,e){function t(n,r=ti){let s,a=rt.getTransfer(r);if(n===Qt)return i.UNSIGNED_BYTE;if(n===Ba)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ka)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Bc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===kc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Oc)return i.BYTE;if(n===Fc)return i.SHORT;if(n===Bs)return i.UNSIGNED_SHORT;if(n===Fa)return i.INT;if(n===In)return i.UNSIGNED_INT;if(n===Ln)return i.FLOAT;if(n===Dn)return i.HALF_FLOAT;if(n===zc)return i.ALPHA;if(n===Vc)return i.RGB;if(n===yn)return i.RGBA;if(n===zn)return i.DEPTH_COMPONENT;if(n===Ei)return i.DEPTH_STENCIL;if(n===Hc)return i.RED;if(n===za)return i.RED_INTEGER;if(n===wi)return i.RG;if(n===Va)return i.RG_INTEGER;if(n===Ha)return i.RGBA_INTEGER;if(n===Vr||n===Hr||n===Gr||n===Wr)if(a===ht)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Vr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Hr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Gr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Wr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Vr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Hr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Gr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Wr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ga||n===Wa||n===Xa||n===qa)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Ga)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Wa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Xa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===qa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ya||n===$a||n===Za||n===Ja||n===Ka||n===Xr||n===ja)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ya||n===$a)return a===ht?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Za)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ja)return s.COMPRESSED_R11_EAC;if(n===Ka)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Xr)return s.COMPRESSED_RG11_EAC;if(n===ja)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Qa||n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===ol||n===al||n===ll||n===cl||n===hl||n===ul||n===dl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Qa)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===el)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===tl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===nl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===il)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===sl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===rl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ol)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===al)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ll)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===cl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===hl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ul)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===dl)return a===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fl||n===pl||n===ml)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===fl)return a===ht?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===pl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ml)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===gl||n===_l||n===qr||n===yl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===gl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===_l)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===qr)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===yl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ks?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var V_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,H_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,hh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Er(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new un({vertexShader:V_,fragmentShader:H_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new $t(new Cr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},uh=class extends An{constructor(e,t){super();let n=this,r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,v=typeof XRWebGLBinding<"u",m=new hh,p={},b=t.getContextAttributes(),S=null,x=null,w=[],E=[],P=new Me,y=null,T=null,D=new Wt;D.viewport=new Mt;let O=new Wt;O.viewport=new Mt;let H=[D,O],Y=new Da,U=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let re=w[j];return re===void 0&&(re=new Rs,w[j]=re),re.getTargetRaySpace()},this.getControllerGrip=function(j){let re=w[j];return re===void 0&&(re=new Rs,w[j]=re),re.getGripSpace()},this.getHand=function(j){let re=w[j];return re===void 0&&(re=new Rs,w[j]=re),re.getHandSpace()};function K(j){let re=E.indexOf(j.inputSource);if(re===-1)return;let Pe=w[re];Pe!==void 0&&(Pe.update(j.inputSource,j.frame,c||a),Pe.dispatchEvent({type:j.type,data:j.inputSource}))}function Z(){r.removeEventListener("select",K),r.removeEventListener("selectstart",K),r.removeEventListener("selectend",K),r.removeEventListener("squeeze",K),r.removeEventListener("squeezestart",K),r.removeEventListener("squeezeend",K),r.removeEventListener("end",Z),r.removeEventListener("inputsourceschange",le);for(let j=0;j<w.length;j++){let re=E[j];re!==null&&(E[j]=null,w[j].disconnect(re))}U=null,q=null,m.reset();for(let j in p)delete p[j];if(e.setRenderTarget(S),f=null,u=null,d=null,r=null,x=null,ot.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(P.width,P.height,!1),T!==null){let j=T.camera;j.fov=T.fov,j.zoom=T.zoom,j.updateProjectionMatrix(),T=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,n.isPresenting===!0&&He("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,n.isPresenting===!0&&He("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",K),r.addEventListener("selectstart",K),r.addEventListener("selectend",K),r.addEventListener("squeeze",K),r.addEventListener("squeezestart",K),r.addEventListener("squeezeend",K),r.addEventListener("end",Z),r.addEventListener("inputsourceschange",le),b.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(P),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let Pe=null,We=null,Re=null;b.depth&&(Re=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Pe=b.stencil?Ei:zn,We=b.stencil?ks:In);let Xe={colorFormat:t.RGBA8,depthFormat:Re,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(Xe),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),x=new jt(u.textureWidth,u.textureHeight,{format:yn,type:Qt,depthTexture:new pi(u.textureWidth,u.textureHeight,We,void 0,void 0,void 0,void 0,void 0,void 0,Pe),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let Pe={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,Pe),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new jt(f.framebufferWidth,f.framebufferHeight,{format:yn,type:Qt,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),ot.setContext(r),ot.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function le(j){for(let re=0;re<j.removed.length;re++){let Pe=j.removed[re],We=E.indexOf(Pe);We>=0&&(E[We]=null,w[We].disconnect(Pe))}for(let re=0;re<j.added.length;re++){let Pe=j.added[re],We=E.indexOf(Pe);if(We===-1){for(let Xe=0;Xe<w.length;Xe++)if(Xe>=E.length){E.push(Pe),We=Xe;break}else if(E[Xe]===null){E[Xe]=Pe,We=Xe;break}if(We===-1)break}let Re=w[We];Re&&Re.connect(Pe)}}let te=new I,ne=new I;function oe(j,re,Pe){te.setFromMatrixPosition(re.matrixWorld),ne.setFromMatrixPosition(Pe.matrixWorld);let We=te.distanceTo(ne),Re=re.projectionMatrix.elements,Xe=Pe.projectionMatrix.elements,ue=Re[14]/(Re[10]-1),Ie=Re[14]/(Re[10]+1),me=(Re[9]+1)/Re[5],Ye=(Re[9]-1)/Re[5],et=(Re[8]-1)/Re[0],ut=(Xe[8]+1)/Xe[0],_t=ue*et,kt=ue*ut,yt=We/(-et+ut),bt=yt*-et;if(re.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(bt),j.translateZ(yt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Re[10]===-1)j.projectionMatrix.copy(re.projectionMatrix),j.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{let k=ue+yt,Nt=Ie+yt,ct=_t-bt,L=kt+(We-bt),_=me*Ie/Nt*k,G=Ye*Ie/Nt*k;j.projectionMatrix.makePerspective(ct,L,_,G,k,Nt),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function Oe(j,re){re===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(re.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let re=j.near,Pe=j.far;m.texture!==null&&(m.depthNear>0&&(re=m.depthNear),m.depthFar>0&&(Pe=m.depthFar)),Y.near=O.near=D.near=re,Y.far=O.far=D.far=Pe,(U!==Y.near||q!==Y.far)&&(r.updateRenderState({depthNear:Y.near,depthFar:Y.far}),U=Y.near,q=Y.far),Y.layers.mask=j.layers.mask|6,D.layers.mask=Y.layers.mask&-5,O.layers.mask=Y.layers.mask&-3;let We=j.parent,Re=Y.cameras;Oe(Y,We);for(let Xe=0;Xe<Re.length;Xe++)Oe(Re[Xe],We);Re.length===2?oe(Y,D,O):Y.projectionMatrix.copy(D.projectionMatrix),T===null&&j.isPerspectiveCamera&&(T={camera:j,fov:j.fov,zoom:j.zoom}),Ae(j,Y,We)};function Ae(j,re,Pe){Pe===null?j.matrix.copy(re.matrixWorld):(j.matrix.copy(Pe.matrixWorld),j.matrix.invert(),j.matrix.multiply(re.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(re.projectionMatrix),j.projectionMatrixInverse.copy(re.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=ws*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return Y},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(j){l=j,u!==null&&(u.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(Y)},this.getCameraTexture=function(j){return p[j]};let tt=null;function Be(j,re){if(h=re.getViewerPose(c||a),g=re,h!==null){let Pe=h.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let We=!1;Pe.length!==Y.cameras.length&&(Y.cameras.length=0,We=!0);for(let Ie=0;Ie<Pe.length;Ie++){let me=Pe[Ie],Ye=null;if(f!==null)Ye=f.getViewport(me);else{let ut=d.getViewSubImage(u,me);Ye=ut.viewport,Ie===0&&(e.setRenderTargetTextures(x,ut.colorTexture,ut.depthStencilTexture),e.setRenderTarget(x))}let et=H[Ie];et===void 0&&(et=new Wt,et.layers.enable(Ie),et.viewport=new Mt,H[Ie]=et),et.matrix.fromArray(me.transform.matrix),et.matrix.decompose(et.position,et.quaternion,et.scale),et.projectionMatrix.fromArray(me.projectionMatrix),et.projectionMatrixInverse.copy(et.projectionMatrix).invert(),et.viewport.set(Ye.x,Ye.y,Ye.width,Ye.height),Ie===0&&(Y.matrix.copy(et.matrix),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale)),We===!0&&Y.cameras.push(et)}let Re=r.enabledFeatures;if(Re&&Re.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){d=n.getBinding();let Ie=d.getDepthInformation(Pe[0]);Ie&&Ie.isValid&&Ie.texture&&m.init(Ie,r.renderState)}if(Re&&Re.includes("camera-access")&&v){e.state.unbindTexture(),d=n.getBinding();for(let Ie=0;Ie<Pe.length;Ie++){let me=Pe[Ie].camera;if(me){let Ye=p[me];Ye||(Ye=new Er,p[me]=Ye);let et=d.getCameraImage(me);Ye.sourceTexture=et}}}}for(let Pe=0;Pe<w.length;Pe++){let We=E[Pe],Re=w[Pe];We!==null&&Re!==void 0&&Re.update(We,re,c||a)}tt&&tt(j,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),g=null}let ot=new yd;ot.setAnimationLoop(Be),this.setAnimationLoop=function(j){tt=j},this.dispose=function(){}}},G_=new gt,Ed=new Ze;Ed.set(-1,0,0,0,1,0,0,0,1);function W_(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Yc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,b,S,x){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),v(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,b,S):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Zt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Zt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let b=e.get(p),S=b.envMap,x=b.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4(G_.makeRotationFromEuler(x)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Ed),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Zt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){let b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function X_(i,e,t,n){let r={},s={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,w){let E=w.program;n.uniformBlockBinding(x,E)}function c(x,w){let E=r[x.id];E===void 0&&(m(x),E=h(x),r[x.id]=E,x.addEventListener("dispose",b));let P=w.program;n.updateUBOMapping(x,P);let y=e.render.frame;s[x.id]!==y&&(u(x),s[x.id]=y)}function h(x){let w=d();x.__bindingPointIndex=w;let E=i.createBuffer(),P=x.__size,y=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,P,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,E),E}function d(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Ge("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){let w=r[x.id],E=x.uniforms,P=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let y=0,T=E.length;y<T;y++){let D=E[y];if(Array.isArray(D))for(let O=0,H=D.length;O<H;O++)f(D[O],y,O,P);else f(D,y,0,P)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(x,w,E,P){if(v(x,w,E,P)===!0){let y=x.__offset,T=x.value;if(Array.isArray(T)){let D=0;for(let O=0;O<T.length;O++){let H=T[O],Y=p(H);g(H,x.__data,D),typeof H!="number"&&typeof H!="boolean"&&!H.isMatrix3&&!ArrayBuffer.isView(H)&&(D+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,y,x.__data)}}function g(x,w,E){typeof x=="number"||typeof x=="boolean"?w[0]=x:x.isMatrix3?(w[0]=x.elements[0],w[1]=x.elements[1],w[2]=x.elements[2],w[3]=0,w[4]=x.elements[3],w[5]=x.elements[4],w[6]=x.elements[5],w[7]=0,w[8]=x.elements[6],w[9]=x.elements[7],w[10]=x.elements[8],w[11]=0):ArrayBuffer.isView(x)?w.set(new x.constructor(x.buffer,x.byteOffset,w.length)):x.toArray(w,E)}function v(x,w,E,P){let y=x.value,T=w+"_"+E;if(P[T]===void 0)return typeof y=="number"||typeof y=="boolean"?P[T]=y:ArrayBuffer.isView(y)?P[T]=y.slice():P[T]=y.clone(),!0;{let D=P[T];if(typeof y=="number"||typeof y=="boolean"){if(D!==y)return P[T]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(D.equals(y)===!1)return D.copy(y),!0}}return!1}function m(x){let w=x.uniforms,E=0,P=16;for(let T=0,D=w.length;T<D;T++){let O=Array.isArray(w[T])?w[T]:[w[T]];for(let H=0,Y=O.length;H<Y;H++){let U=O[H],q=Array.isArray(U.value)?U.value:[U.value];for(let K=0,Z=q.length;K<Z;K++){let le=q[K],te=p(le),ne=E%P,oe=ne%te.boundary,Oe=ne+oe;E+=oe,Oe!==0&&P-Oe<te.storage&&(E+=P-Oe),U.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=E,E+=te.storage}}}let y=E%P;return y>0&&(E+=P-y),x.__size=E,x.__cache={},this}function p(x){let w={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(w.boundary=4,w.storage=4):x.isVector2?(w.boundary=8,w.storage=8):x.isVector3||x.isColor?(w.boundary=16,w.storage=12):x.isVector4?(w.boundary=16,w.storage=16):x.isMatrix3?(w.boundary=48,w.storage=48):x.isMatrix4?(w.boundary=64,w.storage=64):x.isTexture?He("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(w.boundary=16,w.storage=x.byteLength):He("WebGLRenderer: Unsupported uniform value type.",x),w}function b(x){let w=x.target;w.removeEventListener("dispose",b);let E=a.indexOf(w.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function S(){for(let x in r)i.deleteBuffer(r[x]);a=[],r={},s={}}return{bind:l,update:c,dispose:S}}var q_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Gn=null;function Y_(){return Gn===null&&(Gn=new oa(q_,16,16,wi,Dn),Gn.name="DFG_LUT",Gn.minFilter=Bt,Gn.magFilter=Bt,Gn.wrapS=kn,Gn.wrapT=kn,Gn.generateMipmaps=!1,Gn.needsUpdate=!0),Gn}var Tl=class{constructor(e={}){let{canvas:t=Hu(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Qt}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let v=f,m=new Set([Ha,Va,za]),p=new Set([Qt,In,Bs,ks,Ba,ka]),b=new Uint32Array(4),S=new Int32Array(4),x=new I,w=null,E=null,P=[],y=[],T=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,O=!1,H=null,Y=null,U=null,q=null;this._outputColorSpace=Gt;let K=0,Z=0,le=null,te=-1,ne=null,oe=new Mt,Oe=new Mt,Ae=null,tt=new Je(0),Be=0,ot=t.width,j=t.height,re=1,Pe=null,We=null,Re=new Mt(0,0,ot,j),Xe=new Mt(0,0,ot,j),ue=!1,Ie=new Ps,me=!1,Ye=!1,et=new gt,ut=new I,_t=new Mt,kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},yt=!1;function bt(){return le===null?re:1}let k=n;function Nt(M,F){return t.getContext(M,F)}let ct,L,_,G,$,Q,de,_e,ee,se,ve,Fe,ye,Se,Le,Ve,$e,B,ge,ie,xe,be,ae;try{let M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",pt,!1),t.addEventListener("webglcontextrestored",lt,!1),t.addEventListener("webglcontextcreationerror",Jt,!1),k===null){let F="webgl2";if(k=Nt(F,M),k===null)throw Nt(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ue()}catch(M){throw t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",lt,!1),t.removeEventListener("webglcontextcreationerror",Jt,!1),Ge("WebGLRenderer: "+M.message),M}function Ue(){ct=new e0(k),ct.init(),xe=new z_(k,ct),L=new Wg(k,ct,e,xe),_=new B_(k,ct),L.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),Y=k.createFramebuffer(),U=k.createFramebuffer(),q=k.createFramebuffer(),G=new i0(k),$=new E_,Q=new k_(k,ct,_,$,L,xe,G),de=new Qg(D),_e=new rp(k),be=new Hg(k,_e),ee=new t0(k,_e,G,be),se=new r0(k,ee,_e,be,G),B=new s0(k,L,Q),Le=new Xg($),ve=new b_(D,de,ct,L,be,Le),Fe=new W_(D,$),ye=new T_,Se=new L_(ct),$e=new Vg(D,de,_,se,g,l),Ve=new F_(D,se,L),ae=new X_(k,G,L,_),ge=new Gg(k,ct,G),ie=new n0(k,ct,G),G.programs=ve.programs,D.capabilities=L,D.extensions=ct,D.properties=$,D.renderLists=ye,D.shadowMap=Ve,D.state=_,D.info=G}v!==Qt&&(T=new a0(v,t.width,t.height,o,r,s));let Ne=new uh(D,k);this.xr=Ne,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){let M=ct.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=ct.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(M){M!==void 0&&(re=M,this.setSize(ot,j,!1))},this.getSize=function(M){return M.set(ot,j)},this.setSize=function(M,F,J=!0){if(Ne.isPresenting){He("WebGLRenderer: Can't change size while VR device is presenting.");return}ot=M,j=F,t.width=Math.floor(M*re),t.height=Math.floor(F*re),J===!0&&(t.style.width=M+"px",t.style.height=F+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,M,F)},this.getDrawingBufferSize=function(M){return M.set(ot*re,j*re).floor()},this.setDrawingBufferSize=function(M,F,J){ot=M,j=F,re=J,t.width=Math.floor(M*J),t.height=Math.floor(F*J),this.setViewport(0,0,M,F)},this.setEffects=function(M){if(v===Qt){Ge("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let F=0;F<M.length;F++)if(M[F].isOutputPass===!0){He("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(oe)},this.getViewport=function(M){return M.copy(Re)},this.setViewport=function(M,F,J,W){M.isVector4?Re.set(M.x,M.y,M.z,M.w):Re.set(M,F,J,W),_.viewport(oe.copy(Re).multiplyScalar(re).round())},this.getScissor=function(M){return M.copy(Xe)},this.setScissor=function(M,F,J,W){M.isVector4?Xe.set(M.x,M.y,M.z,M.w):Xe.set(M,F,J,W),_.scissor(Oe.copy(Xe).multiplyScalar(re).round())},this.getScissorTest=function(){return ue},this.setScissorTest=function(M){_.setScissorTest(ue=M)},this.setOpaqueSort=function(M){Pe=M},this.setTransparentSort=function(M){We=M},this.getClearColor=function(M){return M.copy($e.getClearColor())},this.setClearColor=function(){$e.setClearColor(...arguments)},this.getClearAlpha=function(){return $e.getClearAlpha()},this.setClearAlpha=function(){$e.setClearAlpha(...arguments)},this.clear=function(M=!0,F=!0,J=!0){let W=0;if(M){let X=!1;if(le!==null){let Ee=le.texture.format;X=m.has(Ee)}if(X){let Ee=le.texture.type,Ce=p.has(Ee),A=$e.getClearColor(),C=$e.getClearAlpha(),R=A.r,V=A.g,N=A.b;Ce?(b[0]=R,b[1]=V,b[2]=N,b[3]=C,k.clearBufferuiv(k.COLOR,0,b)):(S[0]=R,S[1]=V,S[2]=N,S[3]=C,k.clearBufferiv(k.COLOR,0,S))}else W|=k.COLOR_BUFFER_BIT}F&&(W|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(W|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&k.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),H=M},this.dispose=function(){t.removeEventListener("webglcontextlost",pt,!1),t.removeEventListener("webglcontextrestored",lt,!1),t.removeEventListener("webglcontextcreationerror",Jt,!1),$e.dispose(),ye.dispose(),Se.dispose(),$.dispose(),de.dispose(),se.dispose(),be.dispose(),ae.dispose(),ve.dispose(),Ne.dispose(),Ne.removeEventListener("sessionstart",no),Ne.removeEventListener("sessionend",io),Kt.stop()};function pt(M){M.preventDefault(),pr("WebGLRenderer: Context Lost."),O=!0}function lt(){pr("WebGLRenderer: Context Restored."),O=!1;let M=G.autoReset,F=Ve.enabled,J=Ve.autoUpdate,W=Ve.needsUpdate,X=Ve.type;Ue(),G.autoReset=M,Ve.enabled=F,Ve.autoUpdate=J,Ve.needsUpdate=W,Ve.type=X}function Jt(M){Ge("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function At(M){let F=M.target;F.removeEventListener("dispose",At),Fl(F)}function Fl(M){Bl(M),$.remove(M)}function Bl(M){let F=$.get(M).programs;F!==void 0&&(F.forEach(function(J){ve.releaseProgram(J)}),M.isShaderMaterial&&ve.releaseShaderCache(M))}this.renderBufferDirect=function(M,F,J,W,X,Ee){F===null&&(F=kt);let Ce=X.isMesh&&X.matrixWorld.determinantAffine()<0,A=ro(M,F,J,W,X);_.setMaterial(W,Ce);let C=J.index,R=1;if(W.wireframe===!0){if(C=ee.getWireframeAttribute(J),C===void 0)return;R=2}let V=J.drawRange,N=J.attributes.position,z=V.start*R,he=(V.start+V.count)*R;Ee!==null&&(z=Math.max(z,Ee.start*R),he=Math.min(he,(Ee.start+Ee.count)*R)),C!==null?(z=Math.max(z,0),he=Math.min(he,C.count)):N!=null&&(z=Math.max(z,0),he=Math.min(he,N.count));let fe=he-z;if(fe<0||fe===1/0)return;be.setup(X,W,A,J,C);let pe,Te=ge;if(C!==null&&(pe=_e.get(C),Te=ie,Te.setIndex(pe)),X.isMesh)W.wireframe===!0?(_.setLineWidth(W.wireframeLinewidth*bt()),Te.setMode(k.LINES)):Te.setMode(k.TRIANGLES);else if(X.isLine){let ke=W.linewidth;ke===void 0&&(ke=1),_.setLineWidth(ke*bt()),X.isLineSegments?Te.setMode(k.LINES):X.isLineLoop?Te.setMode(k.LINE_LOOP):Te.setMode(k.LINE_STRIP)}else X.isPoints?Te.setMode(k.POINTS):X.isSprite&&Te.setMode(k.TRIANGLES);if(X.isBatchedMesh)if(ct.get("WEBGL_multi_draw"))Te.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{let ke=X._multiDrawStarts,ce=X._multiDrawCounts,nt=X._multiDrawCount,De=C?_e.get(C).bytesPerElement:1,st=$.get(W).currentProgram.getUniforms();for(let it=0;it<nt;it++)st.setValue(k,"_gl_DrawID",it),Te.render(ke[it]/De,ce[it])}else if(X.isInstancedMesh)Te.renderInstances(z,fe,X.count);else if(J.isInstancedBufferGeometry){let ke=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,ce=Math.min(J.instanceCount,ke);Te.renderInstances(z,fe,ce)}else Te.render(z,fe)};function $s(M,F,J,W){H!==null&&M.isNodeMaterial&&H.setObject(W,M),me===!0&&Le.setState(M,J,!1),M.transparent===!0&&M.side===_n&&M.forceSinglePass===!1?(M.side=Zt,M.needsUpdate=!0,Ci(M,F,W),M.side=Si,M.needsUpdate=!0,Ci(M,F,W),M.side=_n):Ci(M,F,W)}this.compile=function(M,F,J=null){J===null&&(J=M),H!==null&&H.renderStart(M,F,J),E=Se.get(J),E.init(F),y.push(E),J.traverseVisible(function(X){X.isLight&&X.layers.test(F.layers)&&(E.pushLight(X),X.castShadow&&E.pushShadow(X))}),M!==J&&M.traverseVisible(function(X){X.isLight&&X.layers.test(F.layers)&&(E.pushLight(X),X.castShadow&&E.pushShadow(X))}),E.setupLights(),H!==null&&H.updateLights(E.state.lightsArray),Ye=this.localClippingEnabled,me=Le.init(this.clippingPlanes,Ye),me===!0&&Le.setGlobalState(this.clippingPlanes,F),H!==null&&Ve.render(E.state.shadowsArray,J,F);let W=new Set;return M.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;let Ee=X.material;if(Ee)if(Array.isArray(Ee))for(let Ce=0;Ce<Ee.length;Ce++){let A=Ee[Ce];$s(A,J,F,X),W.add(A)}else $s(Ee,J,F,X),W.add(Ee)}),E=y.pop(),H!==null&&H.renderEnd(),W},this.compileAsync=function(M,F,J=null){let W=this.compile(M,F,J);return new Promise(X=>{function Ee(){if(W.forEach(function(Ce){let C=$.get(Ce).currentProgram;(C===void 0||C.isReady())&&W.delete(Ce)}),W.size===0){X(M);return}setTimeout(Ee,10)}ct.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let ii=null;function Ai(M){ii&&ii(M)}function no(){Kt.stop()}function io(){Kt.start()}let Kt=new yd;Kt.setAnimationLoop(Ai),typeof self<"u"&&Kt.setContext(self),this.setAnimationLoop=function(M){ii=M,Ne.setAnimationLoop(M),M===null?Kt.stop():Kt.start()},Ne.addEventListener("sessionstart",no),Ne.addEventListener("sessionend",io),this.render=function(M,F){if(F!==void 0&&F.isCamera!==!0){Ge("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;H!==null&&H.renderStart(M,F);let J=Ne.enabled===!0&&Ne.isPresenting===!0,W=T!==null&&(le===null||J)&&T.begin(D,le);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Ne.enabled===!0&&Ne.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Ne.cameraAutoUpdate===!0&&Ne.updateCamera(F),F=Ne.getCamera()),M.isScene===!0&&M.onBeforeRender(D,M,F,le),E=Se.get(M,y.length),E.init(F),E.state.textureUnits=Q.getTextureUnits(),y.push(E),et.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Ie.setFromProjectionMatrix(et,Tn,F.reversedDepth),Ye=this.localClippingEnabled,me=Le.init(this.clippingPlanes,Ye),w=ye.get(M,P.length),w.init(),P.push(w),Ne.enabled===!0&&Ne.isPresenting===!0){let Ce=D.xr.getDepthSensingMesh();Ce!==null&&ts(Ce,F,-1/0,D.sortObjects)}ts(M,F,0,D.sortObjects),w.finish(),H!==null&&H.updateLights(E.state.lightsArray),D.sortObjects===!0&&w.sort(Pe,We),yt=Ne.enabled===!1||Ne.isPresenting===!1||Ne.hasDepthSensing()===!1,yt&&$e.addToRenderList(w,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),me===!0&&Le.beginShadows();let X=E.state.shadowsArray;if(Ve.render(X,M,F),me===!0&&Le.endShadows(),(W&&T.hasRenderPass())===!1){let Ce=w.opaque,A=w.transmissive;if(E.setupLights(),F.isArrayCamera){let C=F.cameras;if(A.length>0)for(let R=0,V=C.length;R<V;R++){let N=C[R];so(Ce,A,M,N)}yt&&$e.render(M);for(let R=0,V=C.length;R<V;R++){let N=C[R];Zs(w,M,N,N.viewport)}}else A.length>0&&so(Ce,A,M,F),yt&&$e.render(M),Zs(w,M,F)}le!==null&&Z===0&&(Q.updateMultisampleRenderTarget(le),Q.updateRenderTargetMipmap(le)),W&&T.end(D),M.isScene===!0&&M.onAfterRender(D,M,F),be.resetDefaultState(),te=-1,ne=null,y.pop(),y.length>0?(E=y[y.length-1],Q.setTextureUnits(E.state.textureUnits),me===!0&&Le.setGlobalState(D.clippingPlanes,E.state.camera)):E=null,P.pop(),P.length>0?w=P[P.length-1]:w=null,H!==null&&H.renderEnd()};function ts(M,F,J,W){if(M.visible===!1)return;if(M.layers.test(F.layers)){if(M.isGroup)J=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(F);else if(M.isLightProbeGrid)E.pushLightProbeGrid(M);else if(M.isLight)E.pushLight(M),M.castShadow&&E.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(Ie)){W&&_t.setFromMatrixPosition(M.matrixWorld).applyMatrix4(et);let Ce=se.update(M),A=M.material;A.visible&&w.push(M,Ce,A,J,_t.z,null,F)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(Ie))){let Ce=se.update(M),A=M.material;if(W&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),_t.copy(M.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),_t.copy(Ce.boundingSphere.center)),_t.applyMatrix4(M.matrixWorld).applyMatrix4(et)),Array.isArray(A)){let C=Ce.groups;for(let R=0,V=C.length;R<V;R++){let N=C[R],z=A[N.materialIndex];z&&z.visible&&w.push(M,Ce,z,J,_t.z,N,F)}}else A.visible&&w.push(M,Ce,A,J,_t.z,null,F)}}let Ee=M.children;for(let Ce=0,A=Ee.length;Ce<A;Ce++)ts(Ee[Ce],F,J,W)}function Zs(M,F,J,W){let{opaque:X,transmissive:Ee,transparent:Ce}=M;E.setupLightsView(J),me===!0&&Le.setGlobalState(D.clippingPlanes,J),W&&_.viewport(oe.copy(W)),X.length>0&&Ri(X,F,J),Ee.length>0&&Ri(Ee,F,J),Ce.length>0&&Ri(Ce,F,J),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function so(M,F,J,W){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[W.id]===void 0){let z=ct.has("EXT_color_buffer_half_float")||ct.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[W.id]=new jt(1,1,{generateMipmaps:!0,type:z?Dn:Qt,minFilter:bi,samples:Math.max(4,L.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:rt.workingColorSpace})}let Ee=E.state.transmissionRenderTarget[W.id],Ce=W.viewport||oe;Ee.setSize(Ce.z*D.transmissionResolutionScale,Ce.w*D.transmissionResolutionScale);let A=D.getRenderTarget(),C=D.getActiveCubeFace(),R=D.getActiveMipmapLevel();D.setRenderTarget(Ee),D.getClearColor(tt),Be=D.getClearAlpha(),Be<1&&D.setClearColor(16777215,.5),D.clear(),yt&&$e.render(J);let V=D.toneMapping;D.toneMapping=Pn;let N=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),E.setupLightsView(W),me===!0&&Le.setGlobalState(D.clippingPlanes,W),Ri(M,J,W),Q.updateMultisampleRenderTarget(Ee),Q.updateRenderTargetMipmap(Ee),ct.has("WEBGL_multisampled_render_to_texture")===!1){let z=!1;for(let he=0,fe=F.length;he<fe;he++){let pe=F[he],{object:Te,geometry:ke,material:ce,group:nt}=pe;if(ce.side===_n&&Te.layers.test(W.layers)){let De=ce.side;ce.side=Zt,ce.needsUpdate=!0,Js(Te,J,W,ke,ce,nt),ce.side=De,ce.needsUpdate=!0,z=!0}}z===!0&&(Q.updateMultisampleRenderTarget(Ee),Q.updateRenderTargetMipmap(Ee))}D.setRenderTarget(A,C,R),D.setClearColor(tt,Be),N!==void 0&&(W.viewport=N),D.toneMapping=V}function Ri(M,F,J){let W=F.isScene===!0?F.overrideMaterial:null;for(let X=0,Ee=M.length;X<Ee;X++){let Ce=M[X],{object:A,geometry:C,group:R}=Ce,V=Ce.material;V.allowOverride===!0&&W!==null&&(V=W),A.layers.test(J.layers)&&Js(A,F,J,C,V,R)}}function Js(M,F,J,W,X,Ee){H!==null&&X.isNodeMaterial&&H.setObject(M,X),M.onBeforeRender(D,F,J,W,X,Ee),M.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),X.onBeforeRender(D,F,J,W,M,Ee),X.transparent===!0&&X.side===_n&&X.forceSinglePass===!1?(X.side=Zt,X.needsUpdate=!0,D.renderBufferDirect(J,F,W,X,M,Ee),X.side=Si,X.needsUpdate=!0,D.renderBufferDirect(J,F,W,X,M,Ee),X.side=_n):D.renderBufferDirect(J,F,W,X,M,Ee),M.onAfterRender(D,F,J,W,X,Ee)}function Ci(M,F,J){F.isScene!==!0&&(F=kt);let W=$.get(M),X=E.state.lights,Ee=E.state.shadowsArray,Ce=X.state.version,A=ve.getParameters(M,X.state,Ee,F,J,E.state.lightProbeGridArray),C=ve.getProgramCacheKey(A),R=W.programs;W.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?F.environment:null,W.fog=F.fog;let V=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;W.envMap=de.get(M.envMap||W.environment,V),W.envMapRotation=W.environment!==null&&M.envMap===null?F.environmentRotation:M.envMapRotation,R===void 0&&(M.addEventListener("dispose",At),R=new Map,W.programs=R);let N=R.get(C);if(N!==void 0){if(W.currentProgram===N&&W.lightsStateVersion===Ce)return Sn(M,A),N}else A.uniforms=ve.getUniforms(M),H!==null&&M.isNodeMaterial&&H.build(M,J,A),M.onBeforeCompile(A,D),N=ve.acquireProgram(A,C),R.set(C,N),W.uniforms=A.uniforms;let z=W.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(z.clippingPlanes=Le.uniform),Sn(M,A),W.needsLights=ao(M),W.lightsStateVersion=Ce,W.needsLights&&(z.ambientLightColor.value=X.state.ambient,z.lightProbe.value=X.state.probe,z.sunLights.value=X.state.sun,z.sunLightShadows.value=X.state.sunShadow,z.directionalLights.value=X.state.directional,z.directionalLightShadows.value=X.state.directionalShadow,z.spotLights.value=X.state.spot,z.spotLightShadows.value=X.state.spotShadow,z.rectAreaLights.value=X.state.rectArea,z.ltc_1.value=X.state.rectAreaLTC1,z.ltc_2.value=X.state.rectAreaLTC2,z.pointLights.value=X.state.point,z.pointLightShadows.value=X.state.pointShadow,z.hemisphereLights.value=X.state.hemi,z.sunShadowMatrix.value=X.state.sunShadowMatrix,z.sunShadowCascade.value=X.state.sunShadowCascade,z.directionalShadowMatrix.value=X.state.directionalShadowMatrix,z.spotLightMatrix.value=X.state.spotLightMatrix,z.spotLightMap.value=X.state.spotLightMap,z.pointShadowMatrix.value=X.state.pointShadowMatrix),W.lightProbeGrid=E.state.lightProbeGridArray.length>0,W.currentProgram=N,W.uniformsList=null,N}function Ks(M){if(M.uniformsList===null){let F=M.currentProgram.getUniforms();M.uniformsList=Hs.seqWithValue(F.seq,M.uniforms)}return M.uniformsList}function Sn(M,F){let J=$.get(M);J.outputColorSpace=F.outputColorSpace,J.batching=F.batching,J.batchingColor=F.batchingColor,J.instancing=F.instancing,J.instancingColor=F.instancingColor,J.instancingMorph=F.instancingMorph,J.skinning=F.skinning,J.morphTargets=F.morphTargets,J.morphNormals=F.morphNormals,J.morphColors=F.morphColors,J.morphTargetsCount=F.morphTargetsCount,J.numClippingPlanes=F.numClippingPlanes,J.numIntersection=F.numClipIntersection,J.vertexAlphas=F.vertexAlphas,J.vertexTangents=F.vertexTangents,J.toneMapping=F.toneMapping}function si(M,F){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;x.setFromMatrixPosition(F.matrixWorld);for(let J=0,W=M.length;J<W;J++){let X=M[J];if(X.texture!==null&&X.boundingBox.containsPoint(x))return X}return null}function ro(M,F,J,W,X){F.isScene!==!0&&(F=kt),Q.resetTextureUnits();let Ee=F.fog,Ce=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?F.environment:null,A=le===null?D.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:rt.workingColorSpace,C=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,R=de.get(W.envMap||Ce,C),V=W.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,N=!!J.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),z=!!J.morphAttributes.position,he=!!J.morphAttributes.normal,fe=!!J.morphAttributes.color,pe=Pn;W.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(pe=D.toneMapping);let Te=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,ke=Te!==void 0?Te.length:0,ce=$.get(W),nt=E.state.lights;if(me===!0&&(Ye===!0||M!==ne)){let mt=M===ne&&W.id===te;Le.setState(W,M,mt)}let De=!1;W.version===ce.__version?(ce.needsLights&&ce.lightsStateVersion!==nt.state.version||ce.outputColorSpace!==A||X.isBatchedMesh&&ce.batching===!1||!X.isBatchedMesh&&ce.batching===!0||X.isBatchedMesh&&ce.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&ce.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&ce.instancing===!1||!X.isInstancedMesh&&ce.instancing===!0||X.isSkinnedMesh&&ce.skinning===!1||!X.isSkinnedMesh&&ce.skinning===!0||X.isInstancedMesh&&ce.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&ce.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&ce.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&ce.instancingMorph===!1&&X.morphTexture!==null||ce.envMap!==R||W.fog===!0&&ce.fog!==Ee||ce.numClippingPlanes!==void 0&&(ce.numClippingPlanes!==Le.numPlanes||ce.numIntersection!==Le.numIntersection)||ce.vertexAlphas!==V||ce.vertexTangents!==N||ce.morphTargets!==z||ce.morphNormals!==he||ce.morphColors!==fe||ce.toneMapping!==pe||ce.morphTargetsCount!==ke||!!ce.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(De=!0):(De=!0,ce.__version=W.version);let st=ce.currentProgram;De===!0&&(st=Ci(W,F,X),H&&W.isNodeMaterial&&H.onUpdateProgram(W,st,ce));let it=!1,zt=!1,vt=!1,Ke=st.getUniforms(),Et=ce.uniforms;if(_.useProgram(st.program)&&(it=!0,zt=!0,vt=!0),W.id!==te&&(te=W.id,zt=!0),ce.needsLights){let mt=si(E.state.lightProbeGridArray,X);ce.lightProbeGrid!==mt&&(ce.lightProbeGrid=mt,zt=!0)}if(it||ne!==M){_.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),Ke.setValue(k,"projectionMatrix",M.projectionMatrix),Ke.setValue(k,"viewMatrix",M.matrixWorldInverse);let On=Ke.map.cameraPosition;On!==void 0&&On.setValue(k,ut.setFromMatrixPosition(M.matrixWorld)),L.logarithmicDepthBuffer&&Ke.setValue(k,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Ke.setValue(k,"isOrthographic",M.isOrthographicCamera===!0),ne!==M&&(ne=M,zt=!0,vt=!0)}if(ce.needsLights&&(nt.state.sunShadowMap.length>0&&Ke.setValue(k,"sunShadowMap",nt.state.sunShadowMap,Q),nt.state.directionalShadowMap.length>0&&Ke.setValue(k,"directionalShadowMap",nt.state.directionalShadowMap,Q),nt.state.spotShadowMap.length>0&&Ke.setValue(k,"spotShadowMap",nt.state.spotShadowMap,Q),nt.state.pointShadowMap.length>0&&Ke.setValue(k,"pointShadowMap",nt.state.pointShadowMap,Q)),X.isSkinnedMesh){Ke.setOptional(k,X,"bindMatrix"),Ke.setOptional(k,X,"bindMatrixInverse");let mt=X.skeleton;mt&&(mt.boneTexture===null&&mt.computeBoneTexture(),Ke.setValue(k,"boneTexture",mt.boneTexture,Q))}X.isBatchedMesh&&(Ke.setOptional(k,X,"batchingTexture"),Ke.setValue(k,"batchingTexture",X._matricesTexture,Q),Ke.setOptional(k,X,"batchingIdTexture"),Ke.setValue(k,"batchingIdTexture",X._indirectTexture,Q),Ke.setOptional(k,X,"batchingColorTexture"),X._colorsTexture!==null&&Ke.setValue(k,"batchingColorTexture",X._colorsTexture,Q));let Un=J.morphAttributes;if((Un.position!==void 0||Un.normal!==void 0||Un.color!==void 0)&&B.update(X,J,st),(zt||ce.receiveShadow!==X.receiveShadow)&&(ce.receiveShadow=X.receiveShadow,Ke.setValue(k,"receiveShadow",X.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&F.environment!==null&&(Et.envMapIntensity.value=F.environmentIntensity),Et.dfgLUT!==void 0&&(Et.dfgLUT.value=Y_()),zt){if(Ke.setValue(k,"toneMappingExposure",D.toneMappingExposure),ce.needsLights&&oo(Et,vt),Ee&&W.fog===!0&&Fe.refreshFogUniforms(Et,Ee),Fe.refreshMaterialUniforms(Et,W,re,j,E.state.transmissionRenderTarget[M.id]),ce.needsLights&&ce.lightProbeGrid){let mt=ce.lightProbeGrid;Et.probesSH.value=mt.texture,Et.probesMin.value.copy(mt.boundingBox.min),Et.probesMax.value.copy(mt.boundingBox.max),Et.probesResolution.value.copy(mt.resolution)}Hs.upload(k,Ks(ce),Et,Q)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Hs.upload(k,Ks(ce),Et,Q),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Ke.setValue(k,"center",X.center),Ke.setValue(k,"modelViewMatrix",X.modelViewMatrix),Ke.setValue(k,"normalMatrix",X.normalMatrix),Ke.setValue(k,"modelMatrix",X.matrixWorld),W.uniformsGroups!==void 0){let mt=W.uniformsGroups;for(let On=0,ri=mt.length;On<ri;On++){let qn=mt[On];ae.update(qn,st),ae.bind(qn,st)}}return st}function oo(M,F){M.ambientLightColor.needsUpdate=F,M.lightProbe.needsUpdate=F,M.sunLights.needsUpdate=F,M.sunLightShadows.needsUpdate=F,M.directionalLights.needsUpdate=F,M.directionalLightShadows.needsUpdate=F,M.pointLights.needsUpdate=F,M.pointLightShadows.needsUpdate=F,M.spotLights.needsUpdate=F,M.spotLightShadows.needsUpdate=F,M.rectAreaLights.needsUpdate=F,M.hemisphereLights.needsUpdate=F}function ao(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return le},this.setRenderTargetTextures=function(M,F,J){let W=$.get(M);W.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),$.get(M.texture).__webglTexture=F,$.get(M.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:J,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,F){let J=$.get(M);J.__webglFramebuffer=F,J.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(M,F=0,J=0){le=M,K=F,Z=J;let W=null,X=!1,Ee=!1;if(M){let A=$.get(M);if(A.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(k.FRAMEBUFFER,A.__webglFramebuffer),oe.copy(M.viewport),Oe.copy(M.scissor),Ae=M.scissorTest,_.viewport(oe),_.scissor(Oe),_.setScissorTest(Ae),te=-1;return}else if(A.__webglFramebuffer===void 0)Q.setupRenderTarget(M);else if(A.__hasExternalTextures)Q.rebindTextures(M,$.get(M.texture).__webglTexture,$.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let V=M.depthTexture;if(A.__boundDepthTexture!==V){if(V!==null&&$.has(V)&&(M.width!==V.image.width||M.height!==V.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(M)}}let C=M.texture;(C.isData3DTexture||C.isDataArrayTexture||C.isCompressedArrayTexture)&&(Ee=!0);let R=$.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(R[F])?W=R[F][J]:W=R[F],X=!0):M.samples>0&&Q.useMultisampledRTT(M)===!1?W=$.get(M).__webglMultisampledFramebuffer:Array.isArray(R)?W=R[J]:W=R,oe.copy(M.viewport),Oe.copy(M.scissor),Ae=M.scissorTest}else oe.copy(Re).multiplyScalar(re).floor(),Oe.copy(Xe).multiplyScalar(re).floor(),Ae=ue;if(J!==0&&(W=Y),_.bindFramebuffer(k.FRAMEBUFFER,W)&&_.drawBuffers(M,W),_.viewport(oe),_.scissor(Oe),_.setScissorTest(Ae),X){let A=$.get(M.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+F,A.__webglTexture,J)}else if(Ee){let A=F;for(let C=0;C<M.textures.length;C++){let R=$.get(M.textures[C]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+C,R.__webglTexture,J,A)}}else if(M!==null&&J!==0){let A=$.get(M.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,A.__webglTexture,J)}te=-1};function js(M){let F=$.get(M);return(F.__readFormat!==M.format||F.__readType!==M.type)&&(F.__readFormat=M.format,F.__readType=M.type,F.__formatReadable=L.textureFormatReadable(M.format),F.__typeReadable=L.textureTypeReadable(M.type)),F}this.readRenderTargetPixels=function(M,F,J,W,X,Ee,Ce,A=0){if(!(M&&M.isWebGLRenderTarget)){Ge("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let C=$.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ce!==void 0&&(C=C[Ce]),C){_.bindFramebuffer(k.FRAMEBUFFER,C);try{let R=M.textures[A],V=R.format,N=R.type;M.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+A);let z=js(R);if(z.__formatReadable===!1){Ge("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(z.__typeReadable===!1){Ge("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=M.width-W&&J>=0&&J<=M.height-X&&k.readPixels(F,J,W,X,xe.convert(V),xe.convert(N),Ee)}finally{let R=le!==null?$.get(le).__webglFramebuffer:null;_.bindFramebuffer(k.FRAMEBUFFER,R)}}},this.readRenderTargetPixelsAsync=async function(M,F,J,W,X,Ee,Ce,A=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let C=$.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ce!==void 0&&(C=C[Ce]),C)if(F>=0&&F<=M.width-W&&J>=0&&J<=M.height-X){_.bindFramebuffer(k.FRAMEBUFFER,C);let R=M.textures[A],V=R.format,N=R.type;M.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+A);let z=js(R);if(z.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(z.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let he=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,he),k.bufferData(k.PIXEL_PACK_BUFFER,Ee.byteLength,k.STREAM_READ),k.readPixels(F,J,W,X,xe.convert(V),xe.convert(N),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);let fe=le!==null?$.get(le).__webglFramebuffer:null;_.bindFramebuffer(k.FRAMEBUFFER,fe);let pe=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await Wu(k,pe,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,he),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,Ee),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer(he),k.deleteSync(pe),Ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,F=null,J=0){let W=Math.pow(2,-J),X=Math.floor(M.image.width*W),Ee=Math.floor(M.image.height*W),Ce=F!==null?F.x:0,A=F!==null?F.y:0;Q.setTexture2D(M,0),k.copyTexSubImage2D(k.TEXTURE_2D,J,0,0,Ce,A,X,Ee),_.unbindTexture()},this.copyTextureToTexture=function(M,F,J=null,W=null,X=0,Ee=0){let Ce,A,C,R,V,N,z,he,fe,pe=M.isCompressedTexture?M.mipmaps[Ee]:M.image;if(J!==null)Ce=J.max.x-J.min.x,A=J.max.y-J.min.y,C=J.isBox3?J.max.z-J.min.z:1,R=J.min.x,V=J.min.y,N=J.isBox3?J.min.z:0;else{let Et=Math.pow(2,-X);Ce=Math.floor(pe.width*Et),A=Math.floor(pe.height*Et),M.isDataArrayTexture?C=pe.depth:M.isData3DTexture?C=Math.floor(pe.depth*Et):C=1,R=0,V=0,N=0}W!==null?(z=W.x,he=W.y,fe=W.z):(z=0,he=0,fe=0);let Te=xe.convert(F.format),ke=xe.convert(F.type),ce;F.isData3DTexture?(Q.setTexture3D(F,0),ce=k.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Q.setTexture2DArray(F,0),ce=k.TEXTURE_2D_ARRAY):(Q.setTexture2D(F,0),ce=k.TEXTURE_2D),_.activeTexture(k.TEXTURE0),_.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,F.flipY),_.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),_.pixelStorei(k.UNPACK_ALIGNMENT,F.unpackAlignment);let nt=_.getParameter(k.UNPACK_ROW_LENGTH),De=_.getParameter(k.UNPACK_IMAGE_HEIGHT),st=_.getParameter(k.UNPACK_SKIP_PIXELS),it=_.getParameter(k.UNPACK_SKIP_ROWS),zt=_.getParameter(k.UNPACK_SKIP_IMAGES);_.pixelStorei(k.UNPACK_ROW_LENGTH,pe.width),_.pixelStorei(k.UNPACK_IMAGE_HEIGHT,pe.height),_.pixelStorei(k.UNPACK_SKIP_PIXELS,R),_.pixelStorei(k.UNPACK_SKIP_ROWS,V),_.pixelStorei(k.UNPACK_SKIP_IMAGES,N);let vt=M.isDataArrayTexture||M.isData3DTexture,Ke=F.isDataArrayTexture||F.isData3DTexture;if(M.isDepthTexture){let Et=$.get(M),Un=$.get(F),mt=$.get(Et.__renderTarget),On=$.get(Un.__renderTarget);_.bindFramebuffer(k.READ_FRAMEBUFFER,mt.__webglFramebuffer),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,On.__webglFramebuffer);for(let ri=0;ri<C;ri++)vt&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,$.get(M).__webglTexture,X,N+ri),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,$.get(F).__webglTexture,Ee,fe+ri)),k.blitFramebuffer(R,V,Ce,A,z,he,Ce,A,k.DEPTH_BUFFER_BIT,k.NEAREST);_.bindFramebuffer(k.READ_FRAMEBUFFER,null),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(X!==0||M.isRenderTargetTexture||$.has(M)){let Et=$.get(M),Un=$.get(F);_.bindFramebuffer(k.READ_FRAMEBUFFER,U),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,q);for(let mt=0;mt<C;mt++)vt?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Et.__webglTexture,X,N+mt):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Et.__webglTexture,X),Ke?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Un.__webglTexture,Ee,fe+mt):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Un.__webglTexture,Ee),X!==0?k.blitFramebuffer(R,V,Ce,A,z,he,Ce,A,k.COLOR_BUFFER_BIT,k.NEAREST):Ke?k.copyTexSubImage3D(ce,Ee,z,he,fe+mt,R,V,Ce,A):k.copyTexSubImage2D(ce,Ee,z,he,R,V,Ce,A);_.bindFramebuffer(k.READ_FRAMEBUFFER,null),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else Ke?M.isDataTexture||M.isData3DTexture?k.texSubImage3D(ce,Ee,z,he,fe,Ce,A,C,Te,ke,pe.data):F.isCompressedArrayTexture?k.compressedTexSubImage3D(ce,Ee,z,he,fe,Ce,A,C,Te,pe.data):k.texSubImage3D(ce,Ee,z,he,fe,Ce,A,C,Te,ke,pe):M.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,Ee,z,he,Ce,A,Te,ke,pe.data):M.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,Ee,z,he,pe.width,pe.height,Te,pe.data):k.texSubImage2D(k.TEXTURE_2D,Ee,z,he,Ce,A,Te,ke,pe);_.pixelStorei(k.UNPACK_ROW_LENGTH,nt),_.pixelStorei(k.UNPACK_IMAGE_HEIGHT,De),_.pixelStorei(k.UNPACK_SKIP_PIXELS,st),_.pixelStorei(k.UNPACK_SKIP_ROWS,it),_.pixelStorei(k.UNPACK_SKIP_IMAGES,zt),Ee===0&&F.generateMipmaps&&k.generateMipmap(ce),_.unbindTexture()},this.initRenderTarget=function(M){$.get(M).__webglFramebuffer===void 0&&Q.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Q.setTextureCube(M,0):M.isData3DTexture?Q.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Q.setTexture2DArray(M,0):Q.setTexture2D(M,0),_.unbindTexture()},this.resetState=function(){K=0,Z=0,le=null,_.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=rt._getDrawingBufferColorSpace(e),t.unpackColorSpace=rt._getUnpackColorSpace()}};var wd={type:"change"},fh={type:"start"},Ad={type:"end"},Cl=new di,Td=new rn,Z_=Math.cos(70*Yi.DEG2RAD),Dt=new I,en=2*Math.PI,ft={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},dh=1e-6,Pl=class extends Fr{constructor(e,t=null){super(e,t),this.state=ft.NONE,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Cn.ROTATE,MIDDLE:Cn.DOLLY,RIGHT:Cn.PAN},this.touches={ONE:gn.ROTATE,TWO:gn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new ln,this._lastTargetPosition=new I,this._quat=new ln().setFromUnitVectors(e.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Us,this._sphericalDelta=new Us,this._scale=1,this._panOffset=new I,this._rotateStart=new Me,this._rotateEnd=new Me,this._rotateDelta=new Me,this._panStart=new Me,this._panEnd=new Me,this._panDelta=new Me,this._dollyStart=new Me,this._dollyEnd=new Me,this._dollyDelta=new Me,this._dollyDirection=new I,this._mouse=new Me,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=K_.bind(this),this._onPointerDown=J_.bind(this),this._onPointerUp=j_.bind(this),this._onContextMenu=ry.bind(this),this._onMouseWheel=ty.bind(this),this._onKeyDown=ny.bind(this),this._onTouchStart=iy.bind(this),this._onTouchMove=sy.bind(this),this._onMouseDown=Q_.bind(this),this._onMouseMove=ey.bind(this),this._interceptControlDown=oy.bind(this),this._interceptControlUp=ay.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=ft.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(wd),this.update(),this.state=ft.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Dt.copy(t).sub(this.target),Dt.applyQuaternion(this._quat),this._spherical.setFromVector3(Dt),this.autoRotate&&this.state===ft.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=en:n>Math.PI&&(n-=en),r<-Math.PI?r+=en:r>Math.PI&&(r-=en),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(Dt.setFromSpherical(this._spherical),Dt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Dt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Dt.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){let o=new I(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;let c=new I(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Dt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Cl.origin.copy(this.object.position),Cl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Cl.direction))<Z_?this.object.lookAt(this.target):(Td.setFromNormalAndCoplanarPoint(this.object.up,this.target),Cl.intersectPlane(Td,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>dh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>dh||this._lastTargetPosition.distanceToSquared(this.target)>dh?(this.dispatchEvent(wd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?en/60*this.autoRotateSpeed*e:en/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Dt.setFromMatrixColumn(t,0),Dt.multiplyScalar(-e),this._panOffset.add(Dt)}_panUp(e,t){this.screenSpacePanning===!0?Dt.setFromMatrixColumn(t,1):(Dt.setFromMatrixColumn(t,0),Dt.crossVectors(this.object.up,Dt)),Dt.multiplyScalar(e),this._panOffset.add(Dt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;Dt.copy(r).sub(this.target);let s=Dt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/n.clientHeight,this.object.matrix),this._panUp(2*t*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,s=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(en*this._rotateDelta.x/t.clientHeight),this._rotateUp(en*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(en*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-en*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(en*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-en*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(n*n+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),r=.5*(e.pageX+n.x),s=.5*(e.pageY+n.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(en*this._rotateDelta.x/t.clientHeight),this._rotateUp(en*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Me,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function J_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function K_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function j_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ad),this.state=ft.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Q_(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Cn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ft.DOLLY;break;case Cn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ft.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ft.ROTATE}break;case Cn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ft.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ft.PAN}break;default:this.state=ft.NONE}this.state!==ft.NONE&&this.dispatchEvent(fh)}function ey(i){switch(this.state){case ft.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ft.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ft.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function ty(i){this.enabled===!1||this.enableZoom===!1||this.state!==ft.NONE||(i.preventDefault(),this.dispatchEvent(fh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Ad))}function ny(i){this.enabled!==!1&&this._handleKeyDown(i)}function iy(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case gn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ft.TOUCH_ROTATE;break;case gn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ft.TOUCH_PAN;break;default:this.state=ft.NONE}break;case 2:switch(this.touches.TWO){case gn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ft.TOUCH_DOLLY_PAN;break;case gn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ft.TOUCH_DOLLY_ROTATE;break;default:this.state=ft.NONE}break;default:this.state=ft.NONE}this.state!==ft.NONE&&this.dispatchEvent(fh)}function sy(i){switch(this._trackPointer(i),this.state){case ft.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ft.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ft.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ft.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ft.NONE}}function ry(i){this.enabled!==!1&&i.preventDefault()}function oy(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ay(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Ws=(i,e)=>i<e?-1:i>e?1:0,ph=i=>[...i.nodes].sort((e,t)=>Ws(e.id,t.id)),ly={client:"#69e1dd",gateway:"#62dbdf",auth:"#53acdd",decision:"#efc174",database:"#4de1b3",external:"#edbf78",event:"#f1b676",result:"#74bcff"};function cy(i,e){return i.kind==="store"?"database":i.kind==="external"?"external":i.kind==="decision"?"decision":i.kind==="start"?e?"gateway":"client":i.kind==="end"?"result":"service"}function hy(i){let e=Math.ceil(Math.sqrt(i)),t=Math.ceil(i/e);return[Math.max(9.6,(e-1)*3.1+4.1),5.2,Math.max(7.6,(t-1)*3.4+4.1)]}function Rd(i,e,t){let n=i.models.get(e.id),r=t===null&&i.moduleIds.includes(e.id),s=r?"shell":n?.shape??cy(e,t!==null),a=r?hy(i.documents[e.id].nodes.length):t!==null?[1.7,s==="decision"?1.6:1.5,1.7]:s==="database"?[3.4,3.8,3.4]:[4.4,4.8,4.4];return{id:e.id,node:e,position:[0,t===null?0:.65,0],size:a,shape:s,color:n?.color??ly[s]??"#559eff",shortLabel:n?.shortLabel??[...e.label].slice(0,12).join(""),interior:t!==null,owner:t}}function uy(i){let e=ph(i).map(v=>v.id),t=new Map(e.map(v=>[v,new Set]));for(let v of i.edges)t.get(v.source).add(v.target),v.directed||t.get(v.target).add(v.source);let n=0,r=new Map,s=new Map,a=new Set,o=[],l=[],c=v=>{r.set(v,n),s.set(v,n),n+=1,o.push(v),a.add(v);for(let m of[...t.get(v)].sort(Ws))r.has(m)?a.has(m)&&s.set(v,Math.min(s.get(v),r.get(m))):(c(m),s.set(v,Math.min(s.get(v),s.get(m))));if(s.get(v)===r.get(v)){let m=[],p;do p=o.pop(),a.delete(p),m.push(p);while(p!==v);l.push(m.sort(Ws))}};e.forEach(v=>{r.has(v)||c(v)});let h=new Map(l.flatMap((v,m)=>v.map(p=>[p,m]))),d=l.map(()=>new Set),u=l.map(()=>0);for(let[v,m]of t)for(let p of m){let b=h.get(v),S=h.get(p);b!==S&&!d[b].has(S)&&(d[b].add(S),u[S]+=1)}let f=l.map(()=>0),g=l.map((v,m)=>m).filter(v=>u[v]===0);for(let v=0;v<g.length;v++){let m=g[v];for(let p of d[m])f[p]=Math.max(f[p],f[m]+1),u[p]-=1,u[p]===0&&g.push(p)}return new Map(e.map(v=>[v,f[h.get(v)]]))}function Cd(i){let e=ph(i.document).map(u=>Rd(i,u,null)),t=uy(i.document),n=i.document.view.direction==="DOWN",r=n?2:0,s=n?0:2,a=0;for(let u of[...new Set(t.values())].sort((f,g)=>f-g)){let f=e.filter(p=>t.get(p.id)===u),g=Math.max(...f.map(p=>p.size[r])),m=-(f.reduce((p,b)=>p+b.size[s],0)+(f.length-1)*4)/2;for(let p of f)p.position[r]=a+g/2,p.position[s]=m+p.size[s]/2,m+=p.size[s]+4;a+=g+5}let o=(a-5)/2;e.forEach(u=>{u.position[r]-=o});let l=new Map(e.map(u=>[u.id,u])),c=[...i.moduleIds].sort(Ws).flatMap(u=>{let f=ph(i.documents[u]),g=Math.ceil(Math.sqrt(f.length)),v=Math.ceil(f.length/g),m=l.get(u);return f.map((p,b)=>{let S=Rd(i,p,u);return S.position[0]=m.position[0]+(b%g-(g-1)/2)*3.1,S.position[2]=m.position[2]+(Math.floor(b/g)-(v-1)/2)*3.4,S})}),h=oi(i.document),d=[...i.document.groups].sort((u,f)=>Ws(u.id,f.id)).flatMap(u=>{let f=[...h.groupMembers.get(u.id)??[]].sort(Ws).map(b=>l.get(b));if(f.length===0)return[];let g=Math.min(...f.map(b=>b.position[0]-b.size[0]/2))-2,v=Math.max(...f.map(b=>b.position[0]+b.size[0]/2))+2,m=Math.min(...f.map(b=>b.position[2]-b.size[2]/2))-2,p=Math.max(...f.map(b=>b.position[2]+b.size[2]/2))+2;return[{label:u.label,center:[(g+v)/2,0,(m+p)/2],width:v-g,depth:p-m,color:f[0].color}]});return{overview:e,interior:c,regions:d}}var Ti=i=>new I(...i),Il=i=>Number.isFinite(i)?Math.max(0,Math.min(1,i)):0,Pd=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;function dy(i,e,t){let n="spatial",r=null,s=!1,a=[],o=[],l=0,c=i.querySelector("#fallback"),h=c??document.createElement("div"),d=h.hidden,u=new Set([...e.overview,...e.interior].map(f=>f.id));return c||(h.className="world-fallback",h.textContent="\u5F53\u524D\u6D4F\u89C8\u5668\u65E0\u6CD5\u542F\u7528 WebGL\u3002\u6A21\u5757\u5217\u8868\u3001\u804C\u8D23\u8BF4\u660E\u548C\u6F14\u793A\u6B65\u9AA4\u4ECD\u53EF\u4F7F\u7528\u3002",i.append(h)),h.hidden=!1,{renderer:"unavailable",setMode(f){n=f},setOpenModules(f){a=t.filter(g=>f.includes(g))},setSelection(f){r=f},setIsolation(f){s=f},setDemo(f,g){for(let v of f?.route??[])if(!u.has(v))throw new Error(`\u6F14\u793A\u8DEF\u5F84\u5F15\u7528\u4E0D\u5B58\u5728\u7684\u8282\u70B9\uFF1A${v}`);o=f?[...f.route]:[],l=Il(g)},focus(){},reset(){},state:()=>({mode:n,cutaway:a.length>0,openModules:[...a],shellOpen:Object.fromEntries(t.map(f=>[f,+a.includes(f)])),isolated:s,selectedId:r,camera:[],target:[],objectIds:[...e.overview,...e.interior].map(f=>f.id),demoRoute:o,demoProgress:l,geometryCount:0}),dispose(){c?h.hidden=d:h.remove()}}}function Id(i,e,t){let n=Cd(e),r=e.moduleIds,s=new Set(r),{document:a,documents:o}=e,l=new Rn;for(let A of[...n.overview,...n.interior])l.expandByPoint(new I(A.position[0]-A.size[0]/2-2,0,A.position[2]-A.size[2]/2-2)),l.expandByPoint(new I(A.position[0]+A.size[0]/2+2,A.position[1]+A.size[1]+4,A.position[2]+A.size[2]/2+2));l.isEmpty()&&l.set(new I(-10,0,-10),new I(10,10,10));let c=l.getCenter(new I),h=l.getSize(new I),d=Math.max(h.x,h.z,24),u=Math.max(600,d*32),f;try{f=new Tl({antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch(A){return console.warn("WebGL initialization unavailable",A instanceof Error?A.message:String(A)),dy(i,n,r)}f.setPixelRatio(Math.min(devicePixelRatio,2)),f.setClearColor("#091222"),f.outputColorSpace=Gt,f.toneMapping=Br,f.toneMappingExposure=1.15,f.shadowMap.enabled=!0,f.shadowMap.type=Wi,f.domElement.setAttribute("aria-label","\u53EF\u65CB\u8F6C\u548C\u7F29\u653E\u7684\u7CFB\u7EDF\u67B6\u6784\u6C99\u76D8"),f.domElement.style.cssText="position:absolute;inset:0;display:block;width:100%;height:100%;touch-action:none",i.prepend(f.domElement);let g=i.querySelector("#labels"),v=g??document.createElement("div");g||(v.id="labels",i.append(v)),v.style.position="absolute",v.style.inset="0",v.style.pointerEvents="none",v.style.overflow="hidden";let m=[],p=i.style.cursor,b=new _r;b.fog=new gr("#091222",u*.7,u);let S=new Wt(39,1,.1,u),x=new Pl(S,i);x.enableDamping=!1,x.minDistance=6,x.maxDistance=u*.8,x.minPolarAngle=.2,x.maxPolarAngle=1.35,x.rotateSpeed=.55,x.zoomSpeed=.8,x.panSpeed=.8;let w=new Dr("#b9d8ff","#11202a",2.1);b.add(w);let E=d*.8,P=new Gi("#d9e7ff",3);P.position.set(c.x-E*.5,E,c.z+E*.45),P.target.position.set(c.x,0,c.z),b.add(P.target),P.castShadow=!0,P.shadow.mapSize.set(2048,2048),P.shadow.camera.left=-E,P.shadow.camera.right=E,P.shadow.camera.top=E,P.shadow.camera.bottom=-E,P.shadow.camera.near=1,P.shadow.camera.far=E*4,P.shadow.bias=-3e-4,P.shadow.normalBias=.045,b.add(P);let y=new Gi("#547cff",2);y.position.set(c.x+E*.5,E*.6,c.z-E*.7),y.target.position.set(c.x,0,c.z),b.add(y,y.target);let T=new Gi("#f7ce9c",.6);T.position.set(c.x+E*.6,E*.3,c.z+E*.45),T.target.position.set(c.x,0,c.z),b.add(T,T.target);let D="spatial",O=null,H=null,Y=!1,U=[],q,K=Object.fromEntries(r.map(A=>[A,0])),Z=null,le=0,te="",ne=!1,oe=0,Oe=new Map,Ae=null,tt={kind:"overview"},Be=new Map,ot=[],j=new Set,re=new Set,Pe=new Set,We=[];function Re(A){return j.add(A),A}function Xe(A){return re.add(A),A}function ue(A,C="#000000",R=1){return Xe(new Ds({color:A,emissive:C,emissiveIntensity:.35,roughness:.55,metalness:.25,transparent:R<1,opacity:R,depthWrite:R>=.8}))}function Ie(A,C,R,V,N=!0){let z=new $t(Re(C),R);return V&&z.position.copy(V),z.castShadow=N,z.receiveShadow=!0,A.add(z),z}function me(A,C,R,V){return Ie(A,new mi(...C),V,Ti(R))}function Ye(A,C,R,V=.55){let N=new zi(Re(new wr(C.geometry)),Xe(new fi({color:R,transparent:!0,opacity:V})));return N.position.copy(C.position),N.rotation.copy(C.rotation),A.add(N),N}let et=me(b,[h.x+8,.25,h.z+8],[c.x,-.24,c.z],ue("#0d1d31"));et.castShadow=!1;let ut=d+8,_t=new Or(ut,Math.min(120,Math.max(12,Math.ceil(ut/2))),"#2c4665","#1a2f47");_t.position.set(c.x,-.09,c.z),_t.scale.set((h.x+8)/ut,1,(h.z+8)/ut),_t.material.transparent=!0,_t.material.opacity=.36,j.add(_t.geometry),re.add(_t.material),b.add(_t);for(let A of n.regions){let C=me(b,[A.width,.045,A.depth],[A.center[0],-.075,A.center[2]],ue(new Je(A.color).multiplyScalar(.055)));C.castShadow=!1;let R=Ye(b,C,A.color,.13);R.position.y=-.047}function kt(A){let C=document.createElement("canvas");C.width=640,C.height=132;let R=C.getContext("2d");R.fillStyle="#13283be8",R.beginPath(),R.roundRect(2,2,636,128,15),R.fill(),R.strokeStyle=A.color,R.lineWidth=4,R.stroke(),R.fillStyle=A.color,R.fillRect(20,28,7,76);let V=84,N=Te=>`600 ${Te}px "Microsoft YaHei", "Segoe UI", sans-serif`;R.font=N(V);let z=R.measureText(A.shortLabel).width;z>554&&(V*=554/z,R.font=N(V)),R.textAlign="center",R.textBaseline="middle",R.fillStyle="#eff7ff",R.fillText(A.shortLabel,330,66);let he=new br(C);he.colorSpace=Gt,Pe.add(he);let fe=Xe(new Cs({map:he,transparent:!0,depthWrite:!1,depthTest:!1,toneMapped:!1})),pe=new Sr(fe);return pe.scale.set(A.interior?3.2:5.3,A.interior?.66:1.09,1),pe.renderOrder=18,pe}function yt(A){let C=new on;C.position.copy(Ti(A.position)),C.userData.nodeId=A.id,b.add(C);let R=document.createElement("div");R.className=A.interior?"world-label internal-label":"world-label",R.dataset.nodeId=A.id,R.setAttribute("role","button"),R.tabIndex=0,R.setAttribute("aria-label",`${A.node.label}${s.has(A.id)?"\uFF0C\u70B9\u51FB\u5C55\u5F00\u5185\u90E8\u6559\u5B66\u7ED3\u6784":"\uFF0C\u67E5\u770B\u6A21\u5757\u804C\u8D23"}`),R.title=A.node.label,R.style.cssText="position:absolute;transform:translate(-50%,-50%);pointer-events:auto;background:transparent;border:0;color:transparent;padding:0;border-radius:4px;z-index:2",R.style.setProperty("--module-color",A.color);let V=()=>t(A.id);R.addEventListener("pointerdown",fe=>fe.stopPropagation()),R.addEventListener("click",V),R.addEventListener("keydown",fe=>{(fe.key==="Enter"||fe.key===" ")&&(fe.preventDefault(),V())}),R.addEventListener("mouseenter",()=>M(A.id)),R.addEventListener("mouseleave",()=>M(null)),v.append(R),m.push(R);let N=kt(A);C.add(N);let z=Ie(C,new Pr(Math.max(A.size[0],A.size[2])*.52,Math.max(A.size[0],A.size[2])*.52+(A.interior?.08:.12),64),Xe(new cn({color:A.color,side:_n,transparent:!0,opacity:.8,depthWrite:!1})));z.rotation.x=-Math.PI/2,z.position.y=.075,z.visible=!1;let he={placement:A,group:C,label:R,nameplate:N,halo:z,materials:new Set,baseOpacity:new Map,baseColor:new Map};return Be.set(A.id,he),he}function bt(A){A.group.traverse(C=>{if(!("material"in C)||C===A.halo)return;let R=Array.isArray(C.material)?C.material:[C.material];for(let V of R)(V instanceof Ds||V instanceof cn||V instanceof fi)&&(A.materials.add(V),A.baseOpacity.set(V,V.opacity),A.baseColor.set(V,V.color.clone()))})}function k(A){let{group:C,placement:R}=A,[V,,N]=R.size,z=me(C,[V+.5,.38,N+.5],[0,.19,0],ue("#172a40"));Ye(C,z,R.color,.3),me(C,[V*.6,.06,.065],[0,.43,N/2+.05],ue(R.color,R.color))}function Nt(A){let{group:C,placement:R}=A,[V,N,z]=R.size,he=me(C,[V*.87,N-.8,z*.8],[0,N/2+.08,0],ue("#294b70"));Ye(C,he,R.color,.65),me(C,[V*.96,.3,z*.9],[0,N-.18,0],ue("#3f6085")),me(C,[V*.65,N*.55,.09],[0,N*.47,z*.405],ue("#101f33"));for(let fe=0;fe<3;fe++)me(C,[V*.52,.1,.11],[0,N*.36+fe*.52,z*.42],ue(R.color,R.color)),Ie(C,new _i(.06,8,6),ue(R.color,R.color),new I(V*.34,N*.36+fe*.52,z*.42));for(let fe=-1;fe<=1;fe++)me(C,[.22,.4,z*.5],[fe*V*.23,N+.16,0],ue("#4d7096"));Ie(C,new pn(.07,.07,.65,8),ue("#b3c8e5"),new I(0,N+.55,0)),Ie(C,new _i(.17,12,8),ue(R.color,R.color),new I(0,N+.98,0))}function ct(A){let{group:C,placement:R}=A,V=R.size[0]*.4,N=R.size[1];for(let z=0;z<3;z++){let he=.55+(z+.5)*(N-.65)/3;Ie(C,new pn(V,V,(N-.85)/3,40),ue("#29455f"),new I(0,he,0));let fe=Ie(C,new mn(V,.045,8,40),ue(R.color,R.color),new I(0,he+(N-.85)/6,0));fe.rotation.x=Math.PI/2}Ie(C,new pn(V,V,.12,40),ue("#7795b4"),new I(0,N+.08,0))}function L(A){let{group:C,placement:R}=A,[V,N,z]=R.size,he=ue("#395e79"),fe=me(C,[V*.2,N-.45,z*.62],[-V*.36,N/2,0],he);Ye(C,fe,R.color,.7);let pe=me(C,[V*.2,N-.45,z*.62],[V*.36,N/2,0],he);Ye(C,pe,R.color,.7);let Te=me(C,[V,.75,z*.7],[0,N-.22,0],ue("#4d7690"));Ye(C,Te,R.color,.8),me(C,[V*.48,N*.65,.09],[0,N*.49,0],ue(R.color,R.color,.2));for(let ke of[-V*.25,V*.25])me(C,[.06,N*.74,.08],[ke,N*.49,z*.36],ue(R.color,R.color))}function _(A){let{group:C,placement:R}=A,V=me(C,[3.1,2.1,.45],[0,2,-.1],ue("#668aaa"));V.rotation.x=-.08,Ye(C,V,R.color,.75),me(C,[2.7,1.7,.07],[0,2,.17],ue("#164258",R.color));for(let N=0;N<3;N++)me(C,[1.5-N*.2,.065,.06],[-.3,2.45-N*.3,.22],ue(R.color,R.color));me(C,[.4,1,.4],[0,.85,0],ue("#416480")),me(C,[2.3,.16,1.5],[0,.46,.1],ue("#557892"))}function G(A){let{group:C,placement:R}=A;Ie(C,new pn(1.05,1.4,3.7,6),ue("#325a76"),new I(0,2.35,0));let V=Ie(C,new Hi(.9,0),ue(R.color,R.color),new I(0,3.7,.1));V.scale.y=1.25;for(let N of[1.1,2.1,3.1]){let z=Ie(C,new mn(1.25,.045,8,6),ue(R.color,R.color),new I(0,N,0));z.rotation.x=Math.PI/2}}function $(A){let{group:C,placement:R}=A;for(let V of[-1.2,1.2])me(C,[5.7,.3,.3],[0,1.4,V],ue("#846343"));for(let V of[-2.4,2.4])me(C,[.3,2.1,2.8],[V,1.3,0],ue("#37516b"));for(let V=-1;V<=1;V++){let N=me(C,[1,1.25,1.15],[V*1.55,1.55,0],ue("#655a46",R.color));Ye(C,N,R.color,.8),me(C,[.7,.08,.1],[V*1.55,1.55,.61],ue(R.color,R.color))}me(C,[5.8,.09,.11],[0,2.3,1.35],ue(R.color,R.color))}function Q(A){let{group:C,placement:R}=A;Ie(C,new pn(1.6,1.9,.55,6),ue("#695946"),new I(0,.7,0));let V=Ie(C,new Hi(1.5,0),ue("#dab77d"),new I(0,3,0));V.rotation.y=.4,Ye(C,V,R.color,.85);let N=Ie(C,new mn(1.95,.055,8,48),ue(R.color,R.color),new I(0,2.55,0));N.rotation.x=Math.PI/2}function de(A){let{group:C,placement:R}=A,V=R.id,[N,z,he]=R.size,fe=N-.5,pe=he-.5,Te=z-1.1,ke=.45+Te/2,ce=fe/2-.1,nt=pe/2-.1,De=me(C,[fe,.28,pe],[0,.57,0],ue("#1c3550"));Ye(C,De,R.color,.5);let st=(vt,Ke,Et,Un,mt,On=1,ri=!1)=>{let qn=new on;qn.position.copy(Ti(Ke)),C.add(qn);let Hd=me(qn,vt,[0,0,0],ue(mt,"#102545",On));return Ye(qn,Hd,R.color,.6),We.push({owner:V,roof:ri,group:qn,closed:Ti(Ke),opened:Ti(Et),openedRotation:Ti(Un)}),qn},it=st([fe,.58,pe],[0,z-.4,0],[-N*.1,z+2.8,-he*.75],[-.15,0,-.08],"#40688e",1,!0),zt=new Set(n.interior.filter(vt=>vt.owner===V).map(vt=>vt.shape));if(zt.has("rack"))for(let vt of[-N*.26,0,N*.26]){let Ke=me(it,[1.3,.85,1.8],[vt,.75,0],ue("#2d736b"));Ye(it,Ke,R.color,.8),me(it,[.09,.95,1.9],[vt,.75,0],ue(R.color,R.color))}else if(zt.has("channel")||zt.has("ledger")){for(let vt of[-N/6,N/6]){let Ke=Ie(it,new mn(.82,.14,12,40),ue(R.color,R.color),new I(vt,1.25,0));Ke.rotation.y=.25}me(it,[1.5,.12,.16],[0,1.25,0],ue(R.color,R.color))}else for(let vt of[-N*.25,0,N*.25])me(it,[1.1,.4,Math.min(3,he*.4)],[vt,.46,0],ue("#6c8cad"));me(it,[N*.47,.1,.16],[0,.83,he*.23],ue(R.color,R.color)),st([fe,Te,.22],[0,ke,-nt],[0,ke+1.4,-nt-1.45],[-.18,0,0],"#274e76",.82),st([fe,Te,.22],[0,ke,nt],[0,1.25,nt+1.55],[.72,0,0],"#274e76",.82),st([.22,Te,pe-.4],[-ce,ke,0],[-ce-.15,ke-.4,0],[0,0,-.13],"#284e74",.84),st([.22,Te,pe-.4],[ce,ke,0],[ce+.15,ke-.4,0],[0,0,.13],"#284e74",.84),me(C,[fe-.3,.085,.1],[0,.76,nt-.25],ue(R.color,R.color))}function _e(A){let{placement:C}=A,R=new on;A.group.add(R),R.scale.set(C.size[0]/1.7,C.size[1]/(C.shape==="decision"?1.6:1.5),C.size[2]/1.7);let V=me(R,[1.85,.15,1.85],[0,.08,0],ue("#18344e"));if(Ye(R,V,C.color,.65),C.shape==="decision"){let N=Ie(R,new Hi(.78),ue("#947b43",C.color),new I(0,.92,0));N.rotation.y=Math.PI/4,Ye(R,N,C.color,.95)}else if(C.shape==="database")for(let N of[.43,.93]){Ie(R,new pn(.67,.67,.44,32),ue("#396080"),new I(0,N,0));let z=Ie(R,new mn(.67,.035,8,32),ue(C.color,C.color),new I(0,N+.23,0));z.rotation.x=Math.PI/2}else if(C.shape==="gateway"){for(let z of[-.55,.55])me(R,[.22,1.1,.8],[z,.71,0],ue("#32798b"));let N=me(R,[1.45,.25,.85],[0,1.29,0],ue("#619ca9"));Ye(R,N,C.color,.9)}else if(C.shape==="rack"){for(let N of[-.75,.75])me(R,[.12,1.4,1.4],[N,.85,0],ue("#456f76"));for(let N of[.28,.8,1.35]){me(R,[1.65,.09,1.45],[0,N,0],ue("#476c78"));for(let z of[-.4,.4]){let he=me(R,[.58,.37,.65],[z,N+.24,0],ue("#3e8c75"));Ye(R,he,C.color,.8)}}}else if(C.shape==="adjust"){let N=Ie(R,new mn(.58,.14,12,24),ue("#4c9c83"),new I(0,.98,0));N.rotation.x=Math.PI/2,Ie(R,new pn(.22,.33,.8,16),ue(C.color,C.color),new I(0,.9,0));for(let z of[-.55,.55]){let he=Ie(R,new gi(.18,.45,8),ue(C.color,C.color),new I(z,1.23,.15));z<0&&(he.rotation.z=Math.PI)}me(R,[1.3,.18,1.1],[0,.34,0],ue("#426e70"))}else if(C.shape==="link"){for(let N of[-.38,.38]){let z=Ie(R,new mn(.47,.12,12,28),ue(C.color,C.color),new I(N,.96,0));z.rotation.y=N<0?-.45:.8}me(R,[1.4,.25,1],[0,.36,0],ue("#655780"))}else if(C.shape==="channel"){Ie(R,new mn(.64,.14,12,32),ue(C.color,C.color),new I(0,.95,0));let N=me(R,[.47,.47,.65],[0,.95,.05],ue("#c2afff",C.color));N.rotation.z=Math.PI/4,me(R,[1.4,.25,1],[0,.31,0],ue("#645783"))}else if(C.shape==="ledger")for(let N=0;N<4;N++){let z=me(R,[1.36,.17,1.15],[N%2*.09,.34+N*.26,0],ue(N===3?"#9383b7":"#594e7e"));Ye(R,z,C.color,.7),me(R,[.09,.09,.72],[-.42,.46+N*.26,0],ue(C.color,C.color))}else if(C.shape==="result"){let N=me(R,[1.25,.65,1.15],[0,.48,0],ue("#416579"));Ye(R,N,C.color,.8),me(R,[.12,.7,.12],[0,1.08,0],ue(C.color,C.color));let z=Ie(R,new gi(.32,.58,4),ue(C.color,C.color),new I(0,1.42,0));z.rotation.z=-Math.PI/2}else{let N=me(R,[1.35,1.05,1.35],[0,.69,0],ue("#315472"));Ye(R,N,C.color,.8),me(R,[1,.1,.09],[0,.62,.72],ue(C.color,C.color)),me(R,[1.2,.12,1.2],[0,1.28,0],ue("#56799a"))}}for(let A of n.overview){let C=yt(A);switch(k(C),A.shape){case"shell":de(C);break;case"database":ct(C);break;case"gateway":L(C);break;case"client":_(C);break;case"auth":G(C);break;case"event":$(C);break;case"external":Q(C);break;case"decision":case"rack":case"adjust":case"link":case"channel":case"ledger":case"result":_e(C);break;default:Nt(C)}bt(C)}for(let A of n.interior){let C=yt(A);_e(C),bt(C),C.group.visible=!1}function ee(A){let C=Be.get(A);if(!C)throw new Error(`\u7A7A\u95F4\u5BF9\u8C61\u4E0D\u5B58\u5728\uFF1A${A}`);let R=s.has(A)?A:null;return C.group.position.clone().add(new I(0,R&&K[R]>.5?1.8:C.placement.size[1]+.18,0))}function se(A,C){let R=A.group.position.clone(),V=C.group.position.clone(),N=V.x-R.x,z=V.z-R.z,he=Math.hypot(N,z)||1,fe=N/he,pe=z/he,Te=A.placement.size[0]/2,ke=A.placement.size[2]/2,ce=Math.min(Math.abs(fe)>.001?Te/Math.abs(fe):1/0,Math.abs(pe)>.001?ke/Math.abs(pe):1/0);return R.x+=fe*ce,R.z+=pe*ce,R.y+=A.placement.interior?1:1.05,R}function ve(A,C,R=!1){if(A===C){let Te=ee(A.placement.id),ke=Math.max(1.1,A.placement.size[0]*.65);return new Vi(Te,Te.clone().add(new I(ke,1.5,ke)),Te.clone().add(new I(-ke,1.5,ke)),Te.clone())}if(R||A.placement.interior||C.placement.interior){let Te=ee(A.placement.id),ke=ee(C.placement.id),ce=ke.clone().sub(Te);ce.y=0;let nt=Math.max(.55,Math.min(2.8,ce.length()*.12));return new Vi(Te,Te.clone().addScaledVector(ce,.28).add(new I(0,nt,0)),ke.clone().addScaledVector(ce,-.28).add(new I(0,nt,0)),ke)}let V=se(A,C),N=se(C,A),z=N.clone().sub(V);z.y=0,z.normalize();let he=R?.36:.24,fe=V.clone().addScaledVector(z,.8);fe.y=he;let pe=N.clone().addScaledVector(z,-.8);return pe.y=he,new Is([V,fe,pe,N],!1,"centripetal")}function Fe(A,C,R,V,N){let z=Be.get(C),he=Be.get(R),fe=ve(z,he),pe=new on;b.add(pe);let Te=V?"#709ac5":z.placement.color,ke=Xe(new cn({color:Te,transparent:!0,opacity:V?.42:.4,depthWrite:!1})),ce=Ie(pe,new Ls(fe,V?36:48,V?.025:.035,6,!1),ke,void 0,!1);if(N){let nt=fe.getTangent(.94).normalize();Ie(pe,new gi(V?.1:.14,V?.25:.35,8),ke,fe.getPoint(.94),!1).quaternion.setFromUnitVectors(new I(0,1,0),nt)}ce.userData.connectionId=A,pe.visible=!V,ot.push({id:A,source:C,target:R,group:pe,materials:new Set([ke]),interior:V,owner:V?z.placement.owner:null})}for(let A of a.edges)Fe(A.id,A.source,A.target,!1,A.directed);for(let A of r)for(let C of o[A].edges)Fe(C.id,C.source,C.target,!0,C.directed);let ye=new on;b.add(ye);let Se=Xe(new cn({color:"#91f6ff",depthTest:!1})),Le=Ie(ye,new _i(.18,18,12),Se,void 0,!1),Ve=Xe(new cn({color:"#62dfff",transparent:!0,opacity:.22,depthWrite:!1,depthTest:!1})),$e=Ie(Le,new _i(.34,16,10),Ve,void 0,!1);Le.renderOrder=30,$e.renderOrder=29,Le.visible=!1;let B=null,ge=[];function ie(){for(let A of ge){ye.remove(A),A.geometry.dispose(),j.delete(A.geometry);let C=Array.isArray(A.material)?A.material:[A.material];for(let R of C)R.dispose(),re.delete(R)}ge.length=0,B=null,Le.visible=!1}function xe(){if(ie(),!Z||!Z.route.length)return;let C={request:"#6fe6ff",data:"#a2b9ff",success:"#68f4bd",failure:"#ff988e"}[Z.tone];if(Se.color.set(C),Ve.color.set(C),Z.route.length===1){Le.position.copy(ee(Z.route[0])),Le.visible=!0;return}let R=new Rr;for(let V=0;V<Z.route.length-1;V++){let N=Be.get(Z.route[V]),z=Be.get(Z.route[V+1]),he=ve(N,z,!0);R.add(he);let fe=Xe(new cn({color:C,transparent:!0,opacity:.95,depthWrite:!1})),pe=Ie(ye,new Ls(he,44,.085,8,!1),fe,void 0,!1);pe.renderOrder=4,ge.push(pe);let Te=Ie(ye,new gi(.2,.43,10),Xe(new cn({color:C,transparent:!0,opacity:.95,depthWrite:!1})),he.getPoint(.84),!1);Te.quaternion.setFromUnitVectors(new I(0,1,0),he.getTangent(.84).normalize()),ge.push(Te)}B=R,Le.visible=!0,Le.position.copy(R.getPointAt(le))}function be(){let A=new Set(Z?.route??[]),C=O?Di(e,O):null,R=new Set;if(C){R.add(C);for(let[N,z]of e.owners)z===C&&R.add(N);for(let N of a.edges){let z=N.source===C?N.target:N.target===C?N.source:null;z&&!Di(e,z)&&R.add(z)}}else O&&R.add(O);let V=N=>!O||R.has(N);for(let[N,z]of Be){let he=O===N,fe=H===N,pe=A.has(N),Te=s.has(N)?N:null,ke=!q||q.nodeIds.has(N),ce=1;Z?ce=pe||he||Te&&U.includes(Te)?1:.32:U.length&&!V(N)?ce=.26:U.length&&!z.placement.interior&&!Te&&(ce=.58),!ke&&!he&&!pe&&(ce*=.22),Y&&!V(N)&&(ce*=.08),fe&&(ce=Math.max(ce,.9));let nt=Te?1-K[Te]*.76:1;for(let De of z.materials){let st=ce<.5?.6:fe||he?1.18:1;De.color.copy(z.baseColor.get(De)).multiplyScalar(st),De.opacity=z.baseOpacity.get(De)*ce*nt,De.transparent=De.opacity<.999,De.depthWrite=De.opacity>=.8}z.group.traverse(De=>{De instanceof $t&&De!==z.halo&&(De.castShadow=ce>=.5&&(!Te||K[Te]<.2))}),z.halo.visible=(he||fe||pe)&&(!z.placement.owner||K[z.placement.owner]>.03),z.halo.material.opacity=fe&&!he?.5:.8,z.halo.material.color.set(pe&&Z?{request:"#6fe6ff",data:"#a2b9ff",success:"#68f4bd",failure:"#ff988e"}[Z.tone]:z.placement.color),z.label.dataset.selected=String(he),z.label.dataset.active=String(pe),z.label.dataset.related=String(ke),z.label.setAttribute("aria-pressed",String(he)),z.nameplate.material.opacity=Math.max(.35,ce),z.nameplate.userData.emphasizedVisible=ce>.12}for(let N of ot){let z=Z?.route.some((pe,Te)=>pe===N.source&&Z.route[Te+1]===N.target)??!1,he=!q||q.edgeIds.has(N.id),fe=Z?z?.75:.08:he?U.length&&!N.interior?.2:N.interior?.55:.34:.06;Y&&(!V(N.source)||!V(N.target))&&(fe*=.12);for(let pe of N.materials)pe.opacity=fe;N.group.visible=!N.owner||K[N.owner]>.08}}function ae(A,C){K[A]=C;for(let R of We)R.owner===A&&(R.group.position.copy(R.closed).lerp(R.opened,C),R.group.rotation.set(R.openedRotation.x*C,R.openedRotation.y*C,R.openedRotation.z*C),R.group.scale.setScalar(R.roof?1-C*.95:1),R.group.visible=!R.roof||C<.92);for(let R of n.interior){if(R.owner!==A)continue;let V=Be.get(R.id),N=Ti(R.position),z=Be.get(A).group.position,he=new I(z.x+(N.x-z.x)*.2,.75,z.z+(N.z-z.z)*.2);V.group.position.copy(he).lerp(N,C),V.group.scale.setScalar(.15+.85*C),V.group.visible=C>.025}be()}let Ue=new I;function Ne(A){return Ue.copy(A).project(S),{x:(Ue.x+1)*i.clientWidth/2,y:(1-Ue.y)*i.clientHeight/2,visible:Ue.z>-1&&Ue.z<1}}function pt(){let A=[],C=new Set(Z?.route??[]),R=N=>N.placement.id===O?4:N.placement.id===H?3:C.has(N.placement.id)?2:N.placement.interior?1:0,V=[...Be.values()].sort((N,z)=>R(z)-R(N));for(let N of V){let{placement:z}=N,he=new I(0,z.size[1]+(z.interior?.5:1.1),0);s.has(z.id)&&he.lerp(new I(0,1.2,z.size[2]/2+.2),K[z.id]),N.nameplate.position.copy(he);let fe=N.nameplate.getWorldPosition(new I),pe=Ne(fe),Te=fe.clone().applyMatrix4(S.matrixWorldInverse),ke=i.clientHeight/(2*Math.tan(Yi.degToRad(S.fov)/2)*Math.max(.1,-Te.z)),ce=z.interior?3.2:5.3,nt=Math.min(ce,128/(ke*N.group.scale.x));N.nameplate.scale.set(nt,nt*132/640,1);let De=N.nameplate.scale.x*N.group.scale.x*ke,st=N.nameplate.scale.y*N.group.scale.y*ke,it={left:pe.x-De/2,right:pe.x+De/2,top:pe.y-st/2,bottom:pe.y+st/2},zt=A.some(Ke=>it.left<Ke.right+3&&it.right>Ke.left-3&&it.top<Ke.bottom+3&&it.bottom>Ke.top-3),vt=pe.visible&&N.group.visible&&N.nameplate.userData.emphasizedVisible!==!1&&(!z.owner||K[z.owner]>.65)&&it.left>=2&&it.right<=i.clientWidth-2&&it.top>=2&&it.bottom<=i.clientHeight-2&&(!zt||R(N)>=2);N.nameplate.visible=vt,vt&&A.push(it),N.label.style.visibility=vt?"visible":"hidden",N.label.style.left=`${pe.x}px`,N.label.style.top=`${pe.y}px`,N.label.style.width=`${Math.max(24,De)}px`,N.label.style.height=`${Math.max(22,st)}px`}lt()}function lt(){let A=i.querySelector("#context-card");if(A&&!A.hidden&&O&&Be.has(O)){let R=Be.get(O),V=Ne(R.group.position.clone().add(new I(0,R.placement.size[1]*.7,0)));A.style.visibility=V.visible?"visible":"hidden";let N=A.offsetWidth||280,z=A.offsetHeight||140,he=Di(e,O),fe=he?Be.get(he):R,{position:pe,size:Te}=fe.placement,ke=[];for(let it of[-1,1])for(let zt of[0,1])for(let vt of[-1,1])ke.push(Ne(new I(pe[0]+it*(Te[0]/2+.7),pe[1]+zt*(Te[1]+(he&&U.includes(he)?3.2:.7)),pe[2]+vt*(Te[2]/2+.8))));let ce=Math.min(...ke.map(it=>it.x)),De=Math.max(...ke.map(it=>it.x))+16;De+N>i.clientWidth-16&&(De=ce-N-16),A.style.left=`${Math.max(12,Math.min(i.clientWidth-N-12,De))}px`;let st=i.clientWidth<600?i.clientHeight-z-142:V.y-z*.4;A.style.top=`${Math.max(72,Math.min(i.clientHeight-z-125,st))}px`}let C=i.querySelector("#hover-hint");if(C){let R=H?Be.get(H):void 0;if(C.hidden=!R||H===O||!!Z,R&&!C.hidden){let V=Ne(R.nameplate.getWorldPosition(new I));C.textContent=R.placement.node.label,C.style.left=`${Math.max(12,Math.min(i.clientWidth-(C.offsetWidth||180)-12,V.x+20))}px`,C.style.top=`${Math.max(68,Math.min(i.clientHeight-145,V.y+20))}px`}}}function Jt(){ne||(S.updateMatrixWorld(),pt(),f.render(b,S))}function At(){!ne&&!oe&&(oe=requestAnimationFrame(Fl))}function Fl(A){if(oe=0,ne)return;let C=!1;for(let[R,V]of Oe){let N=Il((A-V.started)/V.duration),z=1-(1-N)**3;ae(R,Yi.lerp(V.from,V.to,z)),N===1&&(Oe.delete(R),C=!0)}if(C&&xe(),Ae){let R=Il((A-Ae.started)/Ae.duration),V=1-(1-R)**3;S.position.copy(Ae.fromPosition).lerp(Ae.toPosition,V),x.target.copy(Ae.fromTarget).lerp(Ae.toTarget,V),x.update(),R===1&&(Ae=null)}Jt(),(Oe.size||Ae)&&At()}function Bl(A,C,R=!0){R&&!Pd()?(Ae={started:performance.now(),duration:650,fromPosition:S.position.clone(),toPosition:A,fromTarget:x.target.clone(),toTarget:C},At()):(Ae=null,S.position.copy(A),x.target.copy(C),x.update(),At())}function $s(){return Ai(n.overview.map(A=>A.id),3.7)}function ii(A){let C=A?[A]:U;return C.length?Ai([...C,...n.interior.filter(R=>R.owner&&C.includes(R.owner)).map(R=>R.id)],1.7):$s()}function Ai(A,C=0,R){let V=new Rn;for(let ce of A){let nt=Be.get(ce);if(!nt)continue;let{position:De,size:st}=nt.placement;V.expandByPoint(new I(De[0]-st[0]/2-.5,De[1],De[2]-st[2]/2-.5)),V.expandByPoint(new I(De[0]+st[0]/2+.5,De[1]+st[1]+1.1+C,De[2]+st[2]/2+.5))}V.isEmpty()&&V.copy(l);let N=R?.clone()??V.getCenter(new I),z=D==="flat"?new I(0,1,15e-5).normalize():new I(12,17,21).normalize(),he=new I(0,1,0).cross(z).normalize(),fe=z.clone().cross(he).normalize(),pe=Math.tan(Yi.degToRad(S.fov)/2),Te=pe*S.aspect,ke=18;for(let ce of[V.min.x,V.max.x])for(let nt of[V.min.y,V.max.y])for(let De of[V.min.z,V.max.z]){let st=new I(ce,nt,De).sub(N),it=st.dot(z);ke=Math.max(ke,it+Math.abs(st.dot(he))/(Te*.82),it+Math.abs(st.dot(fe))/(pe*.8))}return{target:N,position:N.clone().addScaledVector(z,ke)}}function no(){if(!Z)return ii();let A=[...new Set([...Z.route,Z.focusId])],C=new Set(A.map(R=>Be.get(R).placement.owner));return C.size===1&&!C.has(null)?ii([...C][0]):Ai(A,2.7)}function io(A){let C=Be.get(A);if(s.has(A)&&U.includes(A))return ii(A);if(!C.placement.interior)return Ai([A],.5);let R=Ti(C.placement.position).add(new I(0,C.placement.size[1]*.6,0));if(i.clientWidth<600&&C.placement.owner){let he=Ai([C.placement.owner],.7,R);return{target:R,position:R.clone().add(he.position.sub(R).multiplyScalar(1.08))}}let V=Math.max(.45,S.aspect),N=Math.max(1,.9/V),z=D==="flat"?new I(0,15*N,.01):new I(6.4,8.7,10).multiplyScalar(N);return{target:R,position:R.clone().add(z)}}function Kt(A=!1){let C=tt.kind==="demo"?no():tt.kind==="focus"&&tt.id&&Be.has(tt.id)?io(tt.id):U.length?ii():$s();Bl(C.position,C.target,A)}function ts(){x.enableRotate=D==="spatial",x.minPolarAngle=D==="flat"?1e-4:.2,x.maxPolarAngle=D==="flat"?2e-4:1.35,x.mouseButtons.LEFT=D==="flat"?Cn.PAN:Cn.ROTATE,x.touches.ONE=D==="flat"?gn.PAN:gn.ROTATE,x.touches.TWO=gn.DOLLY_PAN}function Zs(A=!0){tt={kind:U.length?"cutaway":"overview"},Kt(A)}function so(A){ne||!Be.has(A)||(tt={kind:"focus",id:A},Kt(!0))}function Ri(){At()}function Js(){Ae=null}x.addEventListener("change",Ri),x.addEventListener("start",Js);let Ci=new Ur,Ks=new Me,Sn=null,si=new Set;function ro(A){if(si.add(A.pointerId),si.size>1){Sn=null;return}A.isPrimary&&(Sn={id:A.pointerId,x:A.clientX,y:A.clientY})}function oo(){Sn=null,si.clear()}function ao(A){let C=f.domElement.getBoundingClientRect();Ks.set((A.clientX-C.left)/C.width*2-1,-(A.clientY-C.top)/C.height*2+1),Ci.setFromCamera(Ks,S);let R=[...Be.values()].filter(N=>N.group.visible).map(N=>N.group),V=Ci.intersectObjects(R,!0);for(let N of V){if(N.object instanceof zi||N.object===Le||N.object===$e)continue;let z=N.object,he=!0;for(;z;){if(!z.visible){he=!1;break}z=z.parent}if(!he)continue;let fe=N.object;for(;fe&&!fe.userData.nodeId;)fe=fe.parent;if(fe?.userData.nodeId){let pe=fe.userData.nodeId;if(s.has(pe)&&K[pe]>.6&&N.object!==Be.get(pe).nameplate)continue;return pe}}return null}function js(A){if(si.delete(A.pointerId),!Sn||A.pointerId!==Sn.id)return;let C=Sn;if(Sn=null,A.button!==0||Math.hypot(A.clientX-C.x,A.clientY-C.y)>5)return;let R=ao(A);R&&t(R)}function M(A){H===A||ne||(H=A,i.style.cursor=A?"pointer":"grab",be(),At())}function F(A){if(!(si.size||A.pointerType==="touch")){if(A.target instanceof HTMLElement&&A.target.closest("#context-card, button, select")){M(null);return}M(ao(A))}}function J(){M(null)}i.addEventListener("pointerdown",ro),i.addEventListener("pointerup",js),i.addEventListener("pointercancel",oo),i.addEventListener("pointermove",F),i.addEventListener("pointerleave",J);function W(){if(ne)return;let A=Math.max(i.clientWidth,1),C=Math.max(i.clientHeight,1);f.setSize(A,C,!1),S.aspect=A/C,S.updateProjectionMatrix(),Kt(!1),At()}let X=new ResizeObserver(W);X.observe(i);let Ee=new ResizeObserver(At),Ce=i.querySelector("#context-card");Ce&&Ee.observe(Ce);for(let A of r)ae(A,0);return ts(),W(),Zs(!1),Jt(),{renderer:"webgl",setMode(A){ne||D===A||(D=A,ts(),Kt(!1))},setOpenModules(A,C=!0){if(ne)return;let R=r.filter(V=>A.includes(V));if(!(R.length===U.length&&R.every((V,N)=>V===U[N]))){U=R,tt={kind:U.length?"cutaway":"overview"};for(let V of r){let N=U.includes(V)?1:0;if(K[V]===N){Oe.delete(V);continue}C&&!Pd()?Oe.set(V,{started:performance.now(),duration:650,from:K[V],to:N}):(Oe.delete(V),ae(V,N))}xe(),be(),At(),Kt(C)}},setSelection(A,C){ne||(O=A,q=C,be(),At())},setIsolation(A){ne||Y===A||(Y=A,be(),At())},setDemo(A,C){if(ne)return;for(let V of A?.route??[])if(!Be.has(V))throw new Error(`\u6F14\u793A\u8DEF\u5F84\u5F15\u7528\u4E0D\u5B58\u5728\u7684\u8282\u70B9\uFF1A${V}`);let R=A?JSON.stringify([A.id,A.tone,A.route]):"";Z=A,le=Il(C),R!==te&&(te=R,xe(),be(),A?(tt={kind:"demo"},Kt(!0)):tt={kind:U.length?"cutaway":"overview"}),B&&Le.position.copy(B.getPointAt(le)),At()},focus:so,reset:()=>Zs(),state:()=>({mode:D,cutaway:U.length>0,openModules:[...U],shellOpen:{...K},isolated:Y,selectedId:O,camera:S.position.toArray(),target:x.target.toArray(),objectIds:[...Be.keys()],demoRoute:[...Z?.route??[]],demoProgress:le,geometryCount:f.info.memory.geometries}),dispose(){if(!ne){ne=!0,cancelAnimationFrame(oe),Oe.clear(),Ae=null,X.disconnect(),Ee.disconnect(),x.removeEventListener("change",Ri),x.removeEventListener("start",Js),x.dispose(),i.removeEventListener("pointerdown",ro),i.removeEventListener("pointerup",js),i.removeEventListener("pointercancel",oo),i.removeEventListener("pointermove",F),i.removeEventListener("pointerleave",J),ie();for(let A of j)A.dispose();for(let A of re)A.dispose();for(let A of Pe)A.dispose();P.shadow.map?.dispose(),f.dispose(),f.domElement.remove();for(let A of m)A.remove();g||v.remove(),m.length=0,si.clear(),Sn=null,Z=null,q=void 0,b.clear(),Be.clear(),ot.length=0,We.length=0,j.clear(),re.clear(),Pe.clear(),i.style.cursor=p}}}}function Ld(i){let e=new Map(i.map(d=>[d.id,d]));function t(d){if(d===null)return[];let u=e.get(d);if(!u)throw new Error(`\u672A\u77E5\u6F14\u793A\u573A\u666F\uFF1A${d}`);return u.steps}function n(d=i[0]?.id??null){return t(d),{scenario:d,status:"idle",index:-1,elapsedMs:0}}function r(d){return t(d.scenario)[d.index]?.durationMs??2200}function s(d){return t(d.scenario).length?d.status==="idle"||d.status==="complete"?{...d,status:"playing",index:0,elapsedMs:0}:{...d,status:"playing"}:{...d}}function a(d){return{...d,status:d.status==="playing"?"paused":d.status}}function o(d){let u=t(d.scenario),f=u.length-1;return f<0?{...d}:d.index>=f?{...d,status:"complete",index:f,elapsedMs:u[f].durationMs}:{...d,status:"paused",index:d.index+1,elapsedMs:0}}function l(d){return d.index<0?{...d}:{...d,status:"paused",index:Math.max(0,d.index-1),elapsedMs:0}}function c(d,u){if(!Number.isFinite(u)||u<0)throw new RangeError("\u6F14\u793A\u65F6\u95F4\u589E\u91CF\u5FC5\u987B\u4E3A\u6709\u9650\u7684\u975E\u8D1F\u6570\u3002");if(d.status!=="playing")return{...d};let f=t(d.scenario),g=d.index,v=d.elapsedMs,m=u;for(;g<f.length;){let p=f[g].durationMs,b=p-v;if(m<b)return{...d,index:g,elapsedMs:v+m};if(m-=b,g===f.length-1)return{...d,status:"complete",index:g,elapsedMs:p};g+=1,v=0}return{...d}}function h(d){let u=t(d.scenario);if(d.index<0||!u.length)return 0;if(d.status==="complete")return 1;let f=u.reduce((g,v)=>g+v.durationMs,0);return(u.slice(0,d.index).reduce((g,v)=>g+v.durationMs,0)+d.elapsedMs)/f}return{getSteps:t,createState:n,stepDuration:r,play:s,pause:a,next:o,previous:l,advance:c,progress:h,reset:d=>n(d.scenario),changeScenario:n}}var Ll=JSON.parse(document.getElementById("blueprint-data").textContent),vn=Ch(Ll),mh=vn.documents,gh=vn.moduleIds,eo=i=>Di(vn,i),{getSteps:jr,createState:fy,stepDuration:py,play:my,pause:gy,next:_y,previous:yy,reset:xy,changeScenario:vy,advance:Sy,progress:My}=Ld(vn.scenarios),Dd=oi(Ll),Nd=new Map(gh.map(i=>[i,oi(mh[i])])),Ji=new Map([...Ll.nodes,...gh.flatMap(i=>mh[i].nodes)].map(i=>[i.id,i])),ze=i=>document.getElementById(i),Ki=ze("node-select"),Ud=ze("context-card"),Tt,Jr="spatial",tn=new Set,Rt=null,xn="none",Xn=!1,Nn=!1,qe=fy(),Kr=0,Xs=null,Ys=null;function ni(i,e){let t=ze(i);t.textContent!==e&&(t.textContent=e)}function qs(i,e){let t=ze(i);t.setAttribute("aria-label",e),t.title=e;let n=t.querySelector(".sr-only");n&&n.textContent!==e&&(n.textContent=e)}function Dl(){cancelAnimationFrame(Kr),Kr=0,Xs=null}function ji(){qe=gy(qe),Dl(),Ul()}function to(){ji(),Ys=null,Tt.setDemo(null,0)}function Qi(i,e=!0){tn=new Set(i),Tt.setOpenModules([...tn],e),document.documentElement.dataset.openModules=[...tn].join(","),document.documentElement.dataset.cutaway=String(tn.size>0)}function Qr(){if(!Rt||xn==="none")return;let i=eo(Rt);return lo(vn.owners.has(Rt)&&i?Nd.get(i):Dd,Rt,xn)}function by(i){let e=Ji.get(i),t=eo(i),n=vn.owners.has(i)&&t?Nd.get(t):Dd,r={confirmed:"\u5DF2\u8BC1\u5B9E",assumed:"\u5047\u8BBE",planned:"\u89C4\u5212"},s=e.sources?.map(l=>`${l.path}${l.line?`:${l.line}`:""}`).join(`
`),a=[...n.incoming.get(i)??[],...n.outgoing.get(i)??[]],o=[...new Map(a.map(l=>[l.id,l])).values()].map(l=>{let c=l.sources?.map(h=>`${h.path}${h.line?`:${h.line}`:""}`).join(`
`);return`${Ji.get(l.source)?.label??l.source} ${l.directed?"\u2192":"\u2014"} ${Ji.get(l.target)?.label??l.target}${l.label?` \xB7 ${l.label}`:""}
${l.kind} \xB7 ${l.evidenceStatus?r[l.evidenceStatus]:"\u4F9D\u636E\u672A\u6807\u6CE8"}${l.details?`
${l.details}`:""}${c?`
\u6765\u6E90\uFF1A${c}`:""}`});return[e.details??e.summary??"",`\u4F9D\u636E\uFF1A${e.evidenceStatus?r[e.evidenceStatus]:"\u672A\u6807\u6CE8"}`,s?`\u6765\u6E90\uFF1A
${s}`:"",o.length?`\u5173\u7CFB\uFF1A
${o.join(`
`)}`:""].filter(Boolean).join(`

`)}function es(){Tt.setSelection(Rt,Qr()),Tt.setIsolation(Xn),Nl()}function _h(i){if(i&&!Ji.has(i))return;to(),Rt=i,xn="none",Nn=!1;let e=eo(i);e&&Qi([...tn,e]),i||(Xn=!1),es(),i&&Tt.focus(i)}function Od(){to(),Rt=null,xn="none",Xn=!1,Nn=!1,Qi([]),es(),Tt.reset(),ze("reset-view").focus({preventScroll:!0})}function Nl(){let i=Rt?Ji.get(Rt):void 0,e=eo(Rt),t=Ys&&qe.index>=0?jr(qe.scenario)[qe.index]:void 0;document.documentElement.dataset.mode=Jr,document.documentElement.dataset.selectedNode=Rt??"",document.documentElement.dataset.highlight=xn,document.documentElement.dataset.isolated=String(Xn),Ud.hidden=!i,ni("context-title",i?.label??""),ni("context-summary",t?.title??i?.summary??"");let n=i?by(i.id):"";ni("context-details",t?`${n}

${t.description}`:n),ze("context-details").hidden=!Nn,ze("more-details").setAttribute("aria-expanded",String(Nn)),qs("more-details",Nn?"\u6536\u8D77\u804C\u8D23\u8BF4\u660E":"\u67E5\u770B\u5B8C\u6574\u804C\u8D23"),ze("toggle-shell").hidden=!e,qs("toggle-shell",e&&tn.has(e)?"\u6536\u62E2\u5F53\u524D\u670D\u52A1":"\u5C55\u5F00\u5F53\u524D\u670D\u52A1"),ze("toggle-shell").setAttribute("aria-expanded",String(!!e&&tn.has(e)));for(let s of["focus-node","isolate-node"])ze(s).disabled=!i||Tt.renderer!=="webgl";ze("isolate-node").setAttribute("aria-pressed",String(Xn)),qs("isolate-node",Xn?"\u663E\u793A\u5468\u56F4\u6A21\u5757":"\u9694\u79BB\u5F53\u524D\u6A21\u5757");let r=Qr();for(let[s,a]of[["show-all","none"],["show-upstream","upstream"],["show-downstream","downstream"]])ze(s).setAttribute("aria-pressed",String(xn===a)),ze(s).disabled=!i,a!=="none"&&qs(s,`${a==="upstream"?"\u4E0A\u6E38":"\u4E0B\u6E38"}${a===xn&&r?` \xB7 ${r.nodeIds.size} \u4E2A\u8282\u70B9`:""}`);ze("back-overview").hidden=!i&&tn.size===0,ni("view-label",e&&tn.has(e)?`${Ji.get(e).label} / \u5185\u90E8`:"\u7CFB\u7EDF\u603B\u89C8"),Ki.value=Rt??"";for(let s of["spatial-view","flat-view","reset-view"])ze(s).disabled=Tt.renderer!=="webgl";ze("flat-view").setAttribute("aria-pressed",String(Jr==="flat")),ze("spatial-view").setAttribute("aria-pressed",String(Jr==="spatial"))}function Ul(){let i=document.activeElement,e=jr(qe.scenario),t=qe.index>=0?e[qe.index]:void 0;document.documentElement.dataset.demoStatus=qe.status,document.documentElement.dataset.demoStep=t?.id??"",document.documentElement.dataset.demoScenario=qe.scenario??"",ni("demo-status",{idle:"\u5C31\u7EEA",playing:"\u64AD\u653E",paused:"\u6682\u505C",complete:"\u5B8C\u6210"}[qe.status]),ni("demo-counter",`${Math.max(0,qe.index+1).toString().padStart(2,"0")} / ${e.length}`),ni("demo-title",t?.title??"\u6D41\u7A0B\u6F14\u793A"),ni("demo-description",t?.description??"\u9009\u62E9\u5DF2\u7F16\u6392\u7684\u573A\u666F\uFF0C\u5F00\u59CB\u64AD\u653E\u6216\u5355\u6B65\u67E5\u770B\u3002");let n=qe.status==="playing"?"\u6682\u505C\u6F14\u793A":qe.status==="complete"?"\u91CD\u65B0\u64AD\u653E":qe.status==="paused"?"\u7EE7\u7EED\u64AD\u653E":"\u5F00\u59CB\u64AD\u653E";qs("demo-play",n),ze("demo-play").dataset.state=qe.status,ze("demo-step").disabled=qe.status==="complete",ze("demo-back").disabled=qe.index<=0,ze("demo-reset").disabled=qe.status==="idle",i instanceof HTMLButtonElement&&i.disabled&&["demo-back","demo-step","demo-reset"].includes(i.id)&&ze("demo-play").focus({preventScroll:!0}),ze("demo-progress").value=My(qe)}function Ol(){let i=jr(qe.scenario),e=qe.index>=0?i[qe.index]??null:null;e&&Ys!==`${qe.scenario}/${e.id}`&&(Qi(i.slice(0,qe.index+1).flatMap(t=>[...t.openModules])),Rt=e.focusId,xn="none",Xn=!1,Nn=!1,Ys=`${qe.scenario}/${e.id}`,es()),Tt.setDemo(e,Math.min(1,qe.elapsedMs/py(qe))),Ul()}function Fd(){Kr||qe.status!=="playing"||(Kr=requestAnimationFrame(i=>{Kr=0;let e=Xs===null?0:Math.min(i-Xs,250);Xs=i,qe=Sy(qe,e),Ol(),qe.status==="playing"?Fd():Xs=null}))}function Bd(){vn.scenarios.length&&(qe.status==="playing"?ji():((qe.status==="idle"||qe.status==="complete")&&(Qi([]),Tt.reset(),Ys=null),qe=my(qe),Xs=null,Ol(),Fd()))}function kd(){vn.scenarios.length&&(Dl(),qe=_y(qe),Ol())}function zd(){vn.scenarios.length&&(Dl(),qe=yy(qe),Ol())}function Vd(i){Dl(),qe=i?vy(i):xy(qe),Ys=null,Rt=null,xn="none",Xn=!1,Nn=!1,Tt.setDemo(null,0),Qi([]),Tt.reset(),es(),Ul()}function yh(i=!0){ze("explorer").hidden=!0,ze("explore-toggle").setAttribute("aria-expanded","false"),i&&ze("explore-toggle").focus({preventScroll:!0})}Tt=Id(ze("stage"),vn,_h);document.documentElement.dataset.renderer=Tt.renderer;Tt.renderer==="unavailable"&&(ze("fallback").hidden=!1);Ki.replaceChildren(new Option("\u9009\u62E9\u6A21\u5757\u6216\u7EC4\u4EF6",""));var xh=document.createElement("optgroup");xh.label="\u7CFB\u7EDF\u6A21\u5757";for(let i of Ll.nodes)xh.append(new Option(i.label,i.id));Ki.append(xh);for(let i of gh){let e=document.createElement("optgroup");e.label=`${Ji.get(i).label}\u5185\u90E8`;for(let t of mh[i].nodes)e.append(new Option(t.label,t.id));Ki.append(e)}ze("demo-scenario").replaceChildren(...vn.scenarios.map(i=>new Option(i.label,i.id)));ze("demo-dock").hidden=vn.scenarios.length===0;Qi([]);Nl();Ul();Ki.addEventListener("change",()=>{_h(Ki.value||null),yh(!1),ze(Rt?Tt.renderer==="webgl"?"focus-node":"more-details":"explore-toggle").focus({preventScroll:!0})});ze("explore-toggle").addEventListener("click",()=>{let i=ze("explorer").hidden;ze("explorer").hidden=!i,ze("explore-toggle").setAttribute("aria-expanded",String(i)),i&&Ki.focus({preventScroll:!0})});ze("explorer-close").addEventListener("click",()=>yh());ze("back-overview").addEventListener("click",Od);ze("close-context").addEventListener("click",()=>{_h(null),ze("explore-toggle").focus({preventScroll:!0})});ze("focus-node").addEventListener("click",()=>{Rt&&(ji(),Tt.focus(Rt))});ze("reset-view").addEventListener("click",()=>{ji(),Tt.reset()});ze("more-details").addEventListener("click",()=>{ji(),Nn=!Nn,Nl(),Tt.setSelection(Rt,Qr())});ze("isolate-node").addEventListener("click",()=>{to(),Xn=!Xn,es()});ze("toggle-shell").addEventListener("click",()=>{let i=eo(Rt);i&&(to(),tn.has(i)?(tn.delete(i),Rt=i):tn.add(i),Nn=!1,xn="none",Qi(tn),es(),Tt.focus(i))});for(let[i,e]of[["spatial-view","spatial"],["flat-view","flat"]])ze(i).addEventListener("click",()=>{Jr=e,Tt.setMode(Jr),Nl()});for(let[i,e]of[["show-all","none"],["show-upstream","upstream"],["show-downstream","downstream"]])ze(i).addEventListener("click",()=>{to(),xn=e,es()});ze("demo-play").addEventListener("click",Bd);ze("demo-step").addEventListener("click",kd);ze("demo-back").addEventListener("click",zd);ze("demo-reset").addEventListener("click",()=>Vd());ze("demo-scenario").addEventListener("change",i=>Vd(i.target.value));ze("fullscreen-view").disabled=!document.fullscreenEnabled;ze("fullscreen-view").addEventListener("click",async()=>{try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch{ni("demo-title","\u5F53\u524D\u6D4F\u89C8\u5668\u672A\u5141\u8BB8\u5168\u5C4F")}});document.addEventListener("fullscreenchange",()=>{ze("fullscreen-view").setAttribute("aria-pressed",String(!!document.fullscreenElement)),qs("fullscreen-view",document.fullscreenElement?"\u9000\u51FA\u5168\u5C4F":"\u5168\u5C4F\u573A\u666F")});for(let i of[Ud,ze("explorer")])i.addEventListener("pointerdown",e=>e.stopPropagation()),i.addEventListener("wheel",e=>e.stopPropagation());document.addEventListener("keydown",i=>{if(i.key==="Escape"){ze("explorer").hidden?(Rt||tn.size)&&Od():yh();return}i.target?.closest('button,input,select,textarea,[contenteditable="true"],[role="button"]')||(i.code==="Space"&&(i.preventDefault(),Bd()),i.key==="ArrowRight"&&(i.preventDefault(),kd()),i.key==="ArrowLeft"&&(i.preventDefault(),zd()))});document.addEventListener("visibilitychange",()=>{document.hidden&&ji()});window.addEventListener("pagehide",i=>{ji(),i.persisted||Tt.dispose()});Object.defineProperty(globalThis,"__sandboxPrototype",{value:{state:()=>({...Tt.state(),highlight:xn,detailsExpanded:Nn,related:Qr()?[...Qr().nodeIds]:[],demo:{...qe,stepsTotal:jr(qe.scenario).length,stepId:qe.index>=0?jr(qe.scenario)[qe.index]?.id:null}})}});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
