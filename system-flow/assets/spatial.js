"use strict";(()=>{function hs(i){return i.kind==="control"||i.kind==="exception"||i.kind==="feedback"}function Vn(i){let e=new Map(i.nodes.map(l=>[l.id,l])),t=new Map(i.edges.map(l=>[l.id,l])),s=new Map(i.groups.map(l=>[l.id,l])),r=new Map(i.nodes.map(l=>[l.id,[]])),n=new Map(i.nodes.map(l=>[l.id,[]])),a=new Map(i.groups.map(l=>[l.id,new Set])),o=new Map;for(let l of i.nodes){let c=[],h=new Set,d=l.groupId;for(;d&&s.has(d)&&!h.has(d);)h.add(d),c.push(d),a.get(d).add(l.id),d=s.get(d).parentId;o.set(l.id,c)}for(let l of i.edges)n.get(l.source)?.push(l),r.get(l.target)?.push(l);return{document:i,nodes:e,edges:t,groups:s,incoming:r,outgoing:n,groupMembers:a,nodeAncestors:o}}function wo(i,e,t){let s=new Set,r=new Set;for(let a of typeof e=="string"?[e]:e){i.nodes.has(a)&&s.add(a);for(let o of i.groupMembers.get(a)??[])s.add(o)}let n=[...s];for(let a=0;a<n.length;a+=1){let o=n[a],l=t==="upstream"?i.incoming.get(o):i.outgoing.get(o);for(let c of l??[]){if(!c.directed||i.document.view.kind==="flow"&&!hs(c))continue;let h=t==="upstream"?c.source:c.target;i.nodes.has(h)&&(r.add(c.id),s.has(h)||(s.add(h),n.push(h)))}}return{nodeIds:s,edgeIds:r}}function us(i){let{navigation:e,...t}=i,s=new Map([[i.id,t]]),r=new Map,n=new Map,a=new Map;for(let l of i.navigation?.views??[]){s.set(l.document.id,l.document),r.set(l.document.id,l);let c=n.get(l.parentId)??[];c.push(l),n.set(l.parentId,c)}for(let[l,c]of s)a.set(l,new Map([...c.nodes,...(c.spatial?.interiors??[]).flatMap(h=>h.nodes)].map(h=>[h.id,h])));function o(l){let c=[],h=new Set([l]),d=r.get(l);for(;d&&!h.has(d.parentId);){let u=s.get(d.parentId);if(!u)break;h.add(u.id),c.unshift(u),d=r.get(u.id)}return c}return{rootId:i.id,views:s,getView:l=>s.get(l),getNode:(l,c)=>a.get(l)?.get(c),getEntry:l=>r.get(l),getAncestors:o,getChildren:l=>n.get(l)??[],getChild:(l,c)=>(n.get(l)??[]).find(h=>h.ownerId===c),getBridges:(l,c)=>(i.navigation?.bridges??[]).filter(h=>h.source.viewId===l&&h.source.nodeId===c||h.target.viewId===l&&h.target.nodeId===c)}}var gf=Object.getOwnPropertyNames,hc=(i,e)=>function(){return e||(0,i[gf(i)[0]])((e={exports:{}}).exports,e),e.exports},yf=hc({"node_modules/ajv/dist/runtime/ucs2length.js"(i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});function e(t){let s=t.length,r=0,n=0,a;for(;n<s;)r++,a=t.charCodeAt(n++),a>=55296&&a<=56319&&n<s&&(a=t.charCodeAt(n),(a&64512)===56320&&n++);return r}i.default=e,e.code='require("ajv/dist/runtime/ucs2length").default'}}),_f=hc({"node_modules/fast-deep-equal/index.js"(i,e){"use strict";e.exports=function t(s,r){if(s===r)return!0;if(s&&r&&typeof s=="object"&&typeof r=="object"){if(s.constructor!==r.constructor)return!1;var n,a,o;if(Array.isArray(s)){if(n=s.length,n!=r.length)return!1;for(a=n;a--!==0;)if(!t(s[a],r[a]))return!1;return!0}if(s.constructor===RegExp)return s.source===r.source&&s.flags===r.flags;if(s.valueOf!==Object.prototype.valueOf)return s.valueOf()===r.valueOf();if(s.toString!==Object.prototype.toString)return s.toString()===r.toString();if(o=Object.keys(s),n=o.length,n!==Object.keys(r).length)return!1;for(a=n;a--!==0;)if(!Object.prototype.hasOwnProperty.call(r,o[a]))return!1;for(a=n;a--!==0;){var l=o[a];if(!t(s[l],r[l]))return!1}return!0}return s!==s&&r!==r}}}),xf=hc({"node_modules/ajv/dist/runtime/equal.js"(i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=_f();e.code='require("ajv/dist/runtime/equal").default',i.default=e}});var $h=jh,Eo={$schema:"http://json-schema.org/draft-07/schema#",$id:"https://system-blueprint.local/schema/2.0/diagram.json",title:"DiagramDocument",type:"object",additionalProperties:!1,required:["schemaVersion","id","title","view","nodes","edges","groups"],properties:{schemaVersion:{const:"2.0",type:"string"},id:{$ref:"#/definitions/nonEmptyText"},title:{$ref:"#/definitions/nonEmptyText"},description:{type:"string"},sourceRevision:{$ref:"#/definitions/sourceRevision"},navigation:{$ref:"#/definitions/navigation"},view:{type:"object",additionalProperties:!1,required:["kind","direction","theme"],properties:{kind:{enum:["overview","flow","deployment"]},direction:{enum:["RIGHT","DOWN"]},theme:{enum:["light","dark"]},collapsedGroups:{type:"array",uniqueItems:!0,items:{$ref:"#/definitions/nonEmptyText"}},primaryPath:{type:"array",items:{$ref:"#/definitions/nonEmptyText"}}}},nodes:{type:"array",minItems:1,maxItems:100,items:{$ref:"#/definitions/node"}},edges:{type:"array",maxItems:300,items:{$ref:"#/definitions/edge"}},groups:{type:"array",maxItems:20,items:{$ref:"#/definitions/group"}},spatial:{type:"object",additionalProperties:!1,properties:{interiors:{type:"array",maxItems:100,items:{$ref:"#/definitions/interior"}},models:{type:"array",maxItems:100,items:{$ref:"#/definitions/spatialModel"}},scenarios:{type:"array",maxItems:20,items:{$ref:"#/definitions/scenario"}}}}},definitions:{nonEmptyText:{type:"string",minLength:1,pattern:"\\S"},details:{type:"string",maxLength:8e3},evidenceStatus:{enum:["confirmed","assumed","planned"]},source:{type:"object",additionalProperties:!1,required:["path"],properties:{path:{$ref:"#/definitions/nonEmptyText"},line:{type:"integer",minimum:1},sha256:{type:"string",pattern:"^[a-fA-F0-9]{64}$"}}},sources:{type:"array",items:{$ref:"#/definitions/source"}},node:{type:"object",additionalProperties:!1,required:["id","kind","label"],properties:{id:{$ref:"#/definitions/nonEmptyText"},kind:{enum:["start","end","process","decision","store","external","fork","join"]},label:{$ref:"#/definitions/nonEmptyText"},summary:{type:"string"},details:{$ref:"#/definitions/details"},groupId:{$ref:"#/definitions/nonEmptyText"},evidenceStatus:{$ref:"#/definitions/evidenceStatus"},sources:{$ref:"#/definitions/sources"}}},edge:{type:"object",additionalProperties:!1,required:["id","source","target","kind","directed"],properties:{id:{$ref:"#/definitions/nonEmptyText"},source:{$ref:"#/definitions/nonEmptyText"},target:{$ref:"#/definitions/nonEmptyText"},kind:{enum:["control","data","dependency","exception","feedback"]},directed:{type:"boolean"},label:{type:"string"},details:{$ref:"#/definitions/details"},evidenceStatus:{$ref:"#/definitions/evidenceStatus"},sources:{$ref:"#/definitions/sources"}}},interior:{type:"object",additionalProperties:!1,required:["owner","nodes","edges"],properties:{owner:{$ref:"#/definitions/nonEmptyText"},nodes:{type:"array",minItems:1,maxItems:100,items:{$ref:"#/definitions/node"}},edges:{type:"array",maxItems:300,items:{$ref:"#/definitions/edge"}}}},spatialModel:{type:"object",additionalProperties:!1,required:["nodeId","shape"],properties:{nodeId:{$ref:"#/definitions/nonEmptyText"},shape:{enum:["service","shell","gateway","client","database","event","external","auth","decision","rack","adjust","link","channel","ledger","result"]},color:{type:"string",pattern:"^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"},shortLabel:{$ref:"#/definitions/nonEmptyText"}}},scenario:{type:"object",additionalProperties:!1,required:["id","label","steps"],properties:{id:{$ref:"#/definitions/nonEmptyText"},label:{$ref:"#/definitions/nonEmptyText"},steps:{type:"array",minItems:1,maxItems:200,items:{$ref:"#/definitions/demoStep"}}}},demoStep:{type:"object",additionalProperties:!1,required:["id","title","description","route","focusId","tone"],properties:{id:{$ref:"#/definitions/nonEmptyText"},title:{$ref:"#/definitions/nonEmptyText"},description:{type:"string"},route:{type:"array",minItems:1,maxItems:300,items:{$ref:"#/definitions/nonEmptyText"}},focusId:{$ref:"#/definitions/nonEmptyText"},viewId:{$ref:"#/definitions/nonEmptyText"},evidenceStatus:{$ref:"#/definitions/evidenceStatus"},sources:{$ref:"#/definitions/sources"},tone:{enum:["request","data","success","failure"]},durationMs:{type:"integer",minimum:1,maximum:9007199254740991}}},sourceRevision:{type:"object",additionalProperties:!1,required:["commit"],properties:{commit:{type:"string",pattern:"^(?:[a-fA-F0-9]{40}|[a-fA-F0-9]{64})$"},dirty:{type:"boolean"}}},viewDocument:{type:"object",additionalProperties:!1,required:["schemaVersion","id","title","view","nodes","edges","groups"],properties:{schemaVersion:{$ref:"#/properties/schemaVersion"},id:{$ref:"#/definitions/nonEmptyText"},title:{$ref:"#/definitions/nonEmptyText"},description:{type:"string"},sourceRevision:{$ref:"#/definitions/sourceRevision"},view:{$ref:"#/properties/view"},nodes:{$ref:"#/properties/nodes"},edges:{$ref:"#/properties/edges"},groups:{$ref:"#/properties/groups"},spatial:{type:"object",additionalProperties:!1,properties:{interiors:{$ref:"#/properties/spatial/properties/interiors"},models:{$ref:"#/properties/spatial/properties/models"}}}}},viewEndpoint:{type:"object",additionalProperties:!1,required:["viewId","nodeId"],properties:{viewId:{$ref:"#/definitions/nonEmptyText"},nodeId:{$ref:"#/definitions/nonEmptyText"}}},navigation:{type:"object",additionalProperties:!1,required:["views"],properties:{views:{type:"array",maxItems:20,items:{type:"object",additionalProperties:!1,required:["parentId","ownerId","document"],properties:{parentId:{$ref:"#/definitions/nonEmptyText"},ownerId:{$ref:"#/definitions/nonEmptyText"},document:{$ref:"#/definitions/viewDocument"}}}},bridges:{type:"array",maxItems:300,items:{type:"object",additionalProperties:!1,required:["id","source","target","kind","directed"],properties:{id:{$ref:"#/definitions/nonEmptyText"},source:{$ref:"#/definitions/viewEndpoint"},target:{$ref:"#/definitions/viewEndpoint"},kind:{$ref:"#/definitions/edge/properties/kind"},directed:{type:"boolean"},label:{type:"string"},details:{$ref:"#/definitions/details"},evidenceStatus:{$ref:"#/definitions/evidenceStatus"},sources:{$ref:"#/definitions/sources"}}}}}},group:{type:"object",additionalProperties:!1,required:["id","label"],properties:{id:{$ref:"#/definitions/nonEmptyText"},label:{$ref:"#/definitions/nonEmptyText"},parentId:{$ref:"#/definitions/nonEmptyText"},details:{$ref:"#/definitions/details"}}}}},dr=Object.prototype.hasOwnProperty,st=yf().default,Yh=xf().default,ct=new RegExp("\\S","u"),Zh=new RegExp("^(?:[a-fA-F0-9]{40}|[a-fA-F0-9]{64})$","u"),vf={type:"object",additionalProperties:!1,required:["views"],properties:{views:{type:"array",maxItems:20,items:{type:"object",additionalProperties:!1,required:["parentId","ownerId","document"],properties:{parentId:{$ref:"#/definitions/nonEmptyText"},ownerId:{$ref:"#/definitions/nonEmptyText"},document:{$ref:"#/definitions/viewDocument"}}}},bridges:{type:"array",maxItems:300,items:{type:"object",additionalProperties:!1,required:["id","source","target","kind","directed"],properties:{id:{$ref:"#/definitions/nonEmptyText"},source:{$ref:"#/definitions/viewEndpoint"},target:{$ref:"#/definitions/viewEndpoint"},kind:{$ref:"#/definitions/edge/properties/kind"},directed:{type:"boolean"},label:{type:"string"},details:{$ref:"#/definitions/details"},evidenceStatus:{$ref:"#/definitions/evidenceStatus"},sources:{$ref:"#/definitions/sources"}}}}}},Sf={enum:["control","data","dependency","exception","feedback"]},Fo={enum:["confirmed","assumed","planned"]},Mf={type:"object",additionalProperties:!1,required:["schemaVersion","id","title","view","nodes","edges","groups"],properties:{schemaVersion:{$ref:"#/properties/schemaVersion"},id:{$ref:"#/definitions/nonEmptyText"},title:{$ref:"#/definitions/nonEmptyText"},description:{type:"string"},sourceRevision:{$ref:"#/definitions/sourceRevision"},view:{$ref:"#/properties/view"},nodes:{$ref:"#/properties/nodes"},edges:{$ref:"#/properties/edges"},groups:{$ref:"#/properties/groups"},spatial:{type:"object",additionalProperties:!1,properties:{interiors:{$ref:"#/properties/spatial/properties/interiors"},models:{$ref:"#/properties/spatial/properties/models"}}}}},cc={type:"object",additionalProperties:!1,required:["kind","direction","theme"],properties:{kind:{enum:["overview","flow","deployment"]},direction:{enum:["RIGHT","DOWN"]},theme:{enum:["light","dark"]},collapsedGroups:{type:"array",uniqueItems:!0,items:{$ref:"#/definitions/nonEmptyText"}},primaryPath:{type:"array",items:{$ref:"#/definitions/nonEmptyText"}}}};function To(i,{instancePath:e="",parentData:t,parentDataProperty:s,rootData:r=i}={}){let n=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.kind===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"kind"},message:"must have required property 'kind'"};n===null?n=[o]:n.push(o),a++}if(i.direction===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"direction"},message:"must have required property 'direction'"};n===null?n=[o]:n.push(o),a++}if(i.theme===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"theme"},message:"must have required property 'theme'"};n===null?n=[o]:n.push(o),a++}for(let o in i)if(!(o==="kind"||o==="direction"||o==="theme"||o==="collapsedGroups"||o==="primaryPath")){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};n===null?n=[l]:n.push(l),a++}if(i.kind!==void 0){let o=i.kind;if(!(o==="overview"||o==="flow"||o==="deployment")){let l={instancePath:e+"/kind",schemaPath:"#/properties/kind/enum",keyword:"enum",params:{allowedValues:cc.properties.kind.enum},message:"must be equal to one of the allowed values"};n===null?n=[l]:n.push(l),a++}}if(i.direction!==void 0){let o=i.direction;if(!(o==="RIGHT"||o==="DOWN")){let l={instancePath:e+"/direction",schemaPath:"#/properties/direction/enum",keyword:"enum",params:{allowedValues:cc.properties.direction.enum},message:"must be equal to one of the allowed values"};n===null?n=[l]:n.push(l),a++}}if(i.theme!==void 0){let o=i.theme;if(!(o==="light"||o==="dark")){let l={instancePath:e+"/theme",schemaPath:"#/properties/theme/enum",keyword:"enum",params:{allowedValues:cc.properties.theme.enum},message:"must be equal to one of the allowed values"};n===null?n=[l]:n.push(l),a++}}if(i.collapsedGroups!==void 0){let o=i.collapsedGroups;if(Array.isArray(o)){let l=o.length;for(let d=0;d<l;d++){let u=o[d];if(typeof u=="string"){if(st(u)<1){let f={instancePath:e+"/collapsedGroups/"+d,schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[f]:n.push(f),a++}if(!ct.test(u)){let f={instancePath:e+"/collapsedGroups/"+d,schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[f]:n.push(f),a++}}else{let f={instancePath:e+"/collapsedGroups/"+d,schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[f]:n.push(f),a++}}let c=o.length,h;if(c>1){e:for(;c--;)for(h=c;h--;)if(Yh(o[c],o[h])){let d={instancePath:e+"/collapsedGroups",schemaPath:"#/properties/collapsedGroups/uniqueItems",keyword:"uniqueItems",params:{i:c,j:h},message:"must NOT have duplicate items (items ## "+h+" and "+c+" are identical)"};n===null?n=[d]:n.push(d),a++;break e}}}else{let l={instancePath:e+"/collapsedGroups",schemaPath:"#/properties/collapsedGroups/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[l]:n.push(l),a++}}if(i.primaryPath!==void 0){let o=i.primaryPath;if(Array.isArray(o)){let l=o.length;for(let c=0;c<l;c++){let h=o[c];if(typeof h=="string"){if(st(h)<1){let d={instancePath:e+"/primaryPath/"+c,schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[d]:n.push(d),a++}if(!ct.test(h)){let d={instancePath:e+"/primaryPath/"+c,schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[d]:n.push(d),a++}}else{let d={instancePath:e+"/primaryPath/"+c,schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[d]:n.push(d),a++}}}else{let l={instancePath:e+"/primaryPath",schemaPath:"#/properties/primaryPath/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[l]:n.push(l),a++}}}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[o]:n.push(o),a++}return To.errors=n,a===0}var bf={type:"object",additionalProperties:!1,required:["id","kind","label"],properties:{id:{$ref:"#/definitions/nonEmptyText"},kind:{enum:["start","end","process","decision","store","external","fork","join"]},label:{$ref:"#/definitions/nonEmptyText"},summary:{type:"string"},details:{$ref:"#/definitions/details"},groupId:{$ref:"#/definitions/nonEmptyText"},evidenceStatus:{$ref:"#/definitions/evidenceStatus"},sources:{$ref:"#/definitions/sources"}}},wf=new RegExp("^[a-fA-F0-9]{64}$","u");function Ao(i,{instancePath:e="",parentData:t,parentDataProperty:s,rootData:r=i}={}){let n=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.path===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"path"},message:"must have required property 'path'"};n===null?n=[o]:n.push(o),a++}for(let o in i)if(!(o==="path"||o==="line"||o==="sha256")){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};n===null?n=[l]:n.push(l),a++}if(i.path!==void 0){let o=i.path;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/path",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/path",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/path",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.line!==void 0){let o=i.line;if(!(typeof o=="number"&&!(o%1)&&!isNaN(o)&&isFinite(o))){let l={instancePath:e+"/line",schemaPath:"#/properties/line/type",keyword:"type",params:{type:"integer"},message:"must be integer"};n===null?n=[l]:n.push(l),a++}if(typeof o=="number"&&isFinite(o)&&(o<1||isNaN(o))){let l={instancePath:e+"/line",schemaPath:"#/properties/line/minimum",keyword:"minimum",params:{comparison:">=",limit:1},message:"must be >= 1"};n===null?n=[l]:n.push(l),a++}}if(i.sha256!==void 0){let o=i.sha256;if(typeof o=="string"){if(!wf.test(o)){let l={instancePath:e+"/sha256",schemaPath:"#/properties/sha256/pattern",keyword:"pattern",params:{pattern:"^[a-fA-F0-9]{64}$"},message:'must match pattern "^[a-fA-F0-9]{64}$"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/sha256",schemaPath:"#/properties/sha256/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[o]:n.push(o),a++}return Ao.errors=n,a===0}function on(i,{instancePath:e="",parentData:t,parentDataProperty:s,rootData:r=i}={}){let n=null,a=0;if(Array.isArray(i)){let o=i.length;for(let l=0;l<o;l++)Ao(i[l],{instancePath:e+"/"+l,parentData:i,parentDataProperty:l,rootData:r})||(n=n===null?Ao.errors:n.concat(Ao.errors),a=n.length)}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[o]:n.push(o),a++}return on.errors=n,a===0}function Hn(i,{instancePath:e="",parentData:t,parentDataProperty:s,rootData:r=i}={}){let n=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.id===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"id"},message:"must have required property 'id'"};n===null?n=[o]:n.push(o),a++}if(i.kind===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"kind"},message:"must have required property 'kind'"};n===null?n=[o]:n.push(o),a++}if(i.label===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"label"},message:"must have required property 'label'"};n===null?n=[o]:n.push(o),a++}for(let o in i)if(!(o==="id"||o==="kind"||o==="label"||o==="summary"||o==="details"||o==="groupId"||o==="evidenceStatus"||o==="sources")){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};n===null?n=[l]:n.push(l),a++}if(i.id!==void 0){let o=i.id;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.kind!==void 0){let o=i.kind;if(!(o==="start"||o==="end"||o==="process"||o==="decision"||o==="store"||o==="external"||o==="fork"||o==="join")){let l={instancePath:e+"/kind",schemaPath:"#/properties/kind/enum",keyword:"enum",params:{allowedValues:bf.properties.kind.enum},message:"must be equal to one of the allowed values"};n===null?n=[l]:n.push(l),a++}}if(i.label!==void 0){let o=i.label;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/label",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/label",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/label",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.summary!==void 0&&typeof i.summary!="string"){let o={instancePath:e+"/summary",schemaPath:"#/properties/summary/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[o]:n.push(o),a++}if(i.details!==void 0){let o=i.details;if(typeof o=="string"){if(st(o)>8e3){let l={instancePath:e+"/details",schemaPath:"#/definitions/details/maxLength",keyword:"maxLength",params:{limit:8e3},message:"must NOT have more than 8000 characters"};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/details",schemaPath:"#/definitions/details/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.groupId!==void 0){let o=i.groupId;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/groupId",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/groupId",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/groupId",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.evidenceStatus!==void 0){let o=i.evidenceStatus;if(!(o==="confirmed"||o==="assumed"||o==="planned")){let l={instancePath:e+"/evidenceStatus",schemaPath:"#/definitions/evidenceStatus/enum",keyword:"enum",params:{allowedValues:Fo.enum},message:"must be equal to one of the allowed values"};n===null?n=[l]:n.push(l),a++}}i.sources!==void 0&&(on(i.sources,{instancePath:e+"/sources",parentData:i,parentDataProperty:"sources",rootData:r})||(n=n===null?on.errors:n.concat(on.errors),a=n.length))}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[o]:n.push(o),a++}return Hn.errors=n,a===0}function Ro(i,{instancePath:e="",parentData:t,parentDataProperty:s,rootData:r=i}={}){let n=null,a=0;if(Array.isArray(i)){if(i.length>100){let l={instancePath:e,schemaPath:"#/maxItems",keyword:"maxItems",params:{limit:100},message:"must NOT have more than 100 items"};n===null?n=[l]:n.push(l),a++}if(i.length<1){let l={instancePath:e,schemaPath:"#/minItems",keyword:"minItems",params:{limit:1},message:"must NOT have fewer than 1 items"};n===null?n=[l]:n.push(l),a++}let o=i.length;for(let l=0;l<o;l++)Hn(i[l],{instancePath:e+"/"+l,parentData:i,parentDataProperty:l,rootData:r})||(n=n===null?Hn.errors:n.concat(Hn.errors),a=n.length)}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[o]:n.push(o),a++}return Ro.errors=n,a===0}var qh={type:"object",additionalProperties:!1,required:["id","source","target","kind","directed"],properties:{id:{$ref:"#/definitions/nonEmptyText"},source:{$ref:"#/definitions/nonEmptyText"},target:{$ref:"#/definitions/nonEmptyText"},kind:{enum:["control","data","dependency","exception","feedback"]},directed:{type:"boolean"},label:{type:"string"},details:{$ref:"#/definitions/details"},evidenceStatus:{$ref:"#/definitions/evidenceStatus"},sources:{$ref:"#/definitions/sources"}}};function Gn(i,{instancePath:e="",parentData:t,parentDataProperty:s,rootData:r=i}={}){let n=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.id===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"id"},message:"must have required property 'id'"};n===null?n=[o]:n.push(o),a++}if(i.source===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"source"},message:"must have required property 'source'"};n===null?n=[o]:n.push(o),a++}if(i.target===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"target"},message:"must have required property 'target'"};n===null?n=[o]:n.push(o),a++}if(i.kind===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"kind"},message:"must have required property 'kind'"};n===null?n=[o]:n.push(o),a++}if(i.directed===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"directed"},message:"must have required property 'directed'"};n===null?n=[o]:n.push(o),a++}for(let o in i)if(!dr.call(qh.properties,o)){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};n===null?n=[l]:n.push(l),a++}if(i.id!==void 0){let o=i.id;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.source!==void 0){let o=i.source;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/source",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/source",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/source",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.target!==void 0){let o=i.target;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/target",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/target",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/target",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.kind!==void 0){let o=i.kind;if(!(o==="control"||o==="data"||o==="dependency"||o==="exception"||o==="feedback")){let l={instancePath:e+"/kind",schemaPath:"#/properties/kind/enum",keyword:"enum",params:{allowedValues:qh.properties.kind.enum},message:"must be equal to one of the allowed values"};n===null?n=[l]:n.push(l),a++}}if(i.directed!==void 0&&typeof i.directed!="boolean"){let o={instancePath:e+"/directed",schemaPath:"#/properties/directed/type",keyword:"type",params:{type:"boolean"},message:"must be boolean"};n===null?n=[o]:n.push(o),a++}if(i.label!==void 0&&typeof i.label!="string"){let o={instancePath:e+"/label",schemaPath:"#/properties/label/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[o]:n.push(o),a++}if(i.details!==void 0){let o=i.details;if(typeof o=="string"){if(st(o)>8e3){let l={instancePath:e+"/details",schemaPath:"#/definitions/details/maxLength",keyword:"maxLength",params:{limit:8e3},message:"must NOT have more than 8000 characters"};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/details",schemaPath:"#/definitions/details/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.evidenceStatus!==void 0){let o=i.evidenceStatus;if(!(o==="confirmed"||o==="assumed"||o==="planned")){let l={instancePath:e+"/evidenceStatus",schemaPath:"#/definitions/evidenceStatus/enum",keyword:"enum",params:{allowedValues:Fo.enum},message:"must be equal to one of the allowed values"};n===null?n=[l]:n.push(l),a++}}i.sources!==void 0&&(on(i.sources,{instancePath:e+"/sources",parentData:i,parentDataProperty:"sources",rootData:r})||(n=n===null?on.errors:n.concat(on.errors),a=n.length))}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[o]:n.push(o),a++}return Gn.errors=n,a===0}function Po(i,{instancePath:e="",parentData:t,parentDataProperty:s,rootData:r=i}={}){let n=null,a=0;if(Array.isArray(i)){if(i.length>300){let l={instancePath:e,schemaPath:"#/maxItems",keyword:"maxItems",params:{limit:300},message:"must NOT have more than 300 items"};n===null?n=[l]:n.push(l),a++}let o=i.length;for(let l=0;l<o;l++)Gn(i[l],{instancePath:e+"/"+l,parentData:i,parentDataProperty:l,rootData:r})||(n=n===null?Gn.errors:n.concat(Gn.errors),a=n.length)}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[o]:n.push(o),a++}return Po.errors=n,a===0}function zi(i,{instancePath:e="",parentData:t,parentDataProperty:s,rootData:r=i}={}){let n=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.id===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"id"},message:"must have required property 'id'"};n===null?n=[o]:n.push(o),a++}if(i.label===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"label"},message:"must have required property 'label'"};n===null?n=[o]:n.push(o),a++}for(let o in i)if(!(o==="id"||o==="label"||o==="parentId"||o==="details")){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};n===null?n=[l]:n.push(l),a++}if(i.id!==void 0){let o=i.id;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.label!==void 0){let o=i.label;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/label",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/label",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/label",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.parentId!==void 0){let o=i.parentId;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/parentId",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/parentId",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/parentId",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.details!==void 0){let o=i.details;if(typeof o=="string"){if(st(o)>8e3){let l={instancePath:e+"/details",schemaPath:"#/definitions/details/maxLength",keyword:"maxLength",params:{limit:8e3},message:"must NOT have more than 8000 characters"};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/details",schemaPath:"#/definitions/details/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[o]:n.push(o),a++}return zi.errors=n,a===0}function Co(i,{instancePath:e="",parentData:t,parentDataProperty:s,rootData:r=i}={}){let n=null,a=0;if(Array.isArray(i)){if(i.length>20){let l={instancePath:e,schemaPath:"#/maxItems",keyword:"maxItems",params:{limit:20},message:"must NOT have more than 20 items"};n===null?n=[l]:n.push(l),a++}let o=i.length;for(let l=0;l<o;l++)zi(i[l],{instancePath:e+"/"+l,parentData:i,parentDataProperty:l,rootData:r})||(n=n===null?zi.errors:n.concat(zi.errors),a=n.length)}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[o]:n.push(o),a++}return Co.errors=n,a===0}function Vi(i,{instancePath:e="",parentData:t,parentDataProperty:s,rootData:r=i}={}){let n=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.owner===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"owner"},message:"must have required property 'owner'"};n===null?n=[o]:n.push(o),a++}if(i.nodes===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"nodes"},message:"must have required property 'nodes'"};n===null?n=[o]:n.push(o),a++}if(i.edges===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"edges"},message:"must have required property 'edges'"};n===null?n=[o]:n.push(o),a++}for(let o in i)if(!(o==="owner"||o==="nodes"||o==="edges")){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};n===null?n=[l]:n.push(l),a++}if(i.owner!==void 0){let o=i.owner;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/owner",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/owner",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/owner",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.nodes!==void 0){let o=i.nodes;if(Array.isArray(o)){if(o.length>100){let c={instancePath:e+"/nodes",schemaPath:"#/properties/nodes/maxItems",keyword:"maxItems",params:{limit:100},message:"must NOT have more than 100 items"};n===null?n=[c]:n.push(c),a++}if(o.length<1){let c={instancePath:e+"/nodes",schemaPath:"#/properties/nodes/minItems",keyword:"minItems",params:{limit:1},message:"must NOT have fewer than 1 items"};n===null?n=[c]:n.push(c),a++}let l=o.length;for(let c=0;c<l;c++)Hn(o[c],{instancePath:e+"/nodes/"+c,parentData:o,parentDataProperty:c,rootData:r})||(n=n===null?Hn.errors:n.concat(Hn.errors),a=n.length)}else{let l={instancePath:e+"/nodes",schemaPath:"#/properties/nodes/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[l]:n.push(l),a++}}if(i.edges!==void 0){let o=i.edges;if(Array.isArray(o)){if(o.length>300){let c={instancePath:e+"/edges",schemaPath:"#/properties/edges/maxItems",keyword:"maxItems",params:{limit:300},message:"must NOT have more than 300 items"};n===null?n=[c]:n.push(c),a++}let l=o.length;for(let c=0;c<l;c++)Gn(o[c],{instancePath:e+"/edges/"+c,parentData:o,parentDataProperty:c,rootData:r})||(n=n===null?Gn.errors:n.concat(Gn.errors),a=n.length)}else{let l={instancePath:e+"/edges",schemaPath:"#/properties/edges/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[l]:n.push(l),a++}}}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[o]:n.push(o),a++}return Vi.errors=n,a===0}function Io(i,{instancePath:e="",parentData:t,parentDataProperty:s,rootData:r=i}={}){let n=null,a=0;if(Array.isArray(i)){if(i.length>100){let l={instancePath:e,schemaPath:"#/maxItems",keyword:"maxItems",params:{limit:100},message:"must NOT have more than 100 items"};n===null?n=[l]:n.push(l),a++}let o=i.length;for(let l=0;l<o;l++)Vi(i[l],{instancePath:e+"/"+l,parentData:i,parentDataProperty:l,rootData:r})||(n=n===null?Vi.errors:n.concat(Vi.errors),a=n.length)}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[o]:n.push(o),a++}return Io.errors=n,a===0}var Ef={type:"object",additionalProperties:!1,required:["nodeId","shape"],properties:{nodeId:{$ref:"#/definitions/nonEmptyText"},shape:{enum:["service","shell","gateway","client","database","event","external","auth","decision","rack","adjust","link","channel","ledger","result"]},color:{type:"string",pattern:"^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"},shortLabel:{$ref:"#/definitions/nonEmptyText"}}},Tf=new RegExp("^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$","u");function Hi(i,{instancePath:e="",parentData:t,parentDataProperty:s,rootData:r=i}={}){let n=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.nodeId===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"nodeId"},message:"must have required property 'nodeId'"};n===null?n=[o]:n.push(o),a++}if(i.shape===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"shape"},message:"must have required property 'shape'"};n===null?n=[o]:n.push(o),a++}for(let o in i)if(!(o==="nodeId"||o==="shape"||o==="color"||o==="shortLabel")){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};n===null?n=[l]:n.push(l),a++}if(i.nodeId!==void 0){let o=i.nodeId;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/nodeId",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/nodeId",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/nodeId",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.shape!==void 0){let o=i.shape;if(!(o==="service"||o==="shell"||o==="gateway"||o==="client"||o==="database"||o==="event"||o==="external"||o==="auth"||o==="decision"||o==="rack"||o==="adjust"||o==="link"||o==="channel"||o==="ledger"||o==="result")){let l={instancePath:e+"/shape",schemaPath:"#/properties/shape/enum",keyword:"enum",params:{allowedValues:Ef.properties.shape.enum},message:"must be equal to one of the allowed values"};n===null?n=[l]:n.push(l),a++}}if(i.color!==void 0){let o=i.color;if(typeof o=="string"){if(!Tf.test(o)){let l={instancePath:e+"/color",schemaPath:"#/properties/color/pattern",keyword:"pattern",params:{pattern:"^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"},message:'must match pattern "^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/color",schemaPath:"#/properties/color/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.shortLabel!==void 0){let o=i.shortLabel;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/shortLabel",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/shortLabel",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/shortLabel",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[o]:n.push(o),a++}return Hi.errors=n,a===0}function Do(i,{instancePath:e="",parentData:t,parentDataProperty:s,rootData:r=i}={}){let n=null,a=0;if(Array.isArray(i)){if(i.length>100){let l={instancePath:e,schemaPath:"#/maxItems",keyword:"maxItems",params:{limit:100},message:"must NOT have more than 100 items"};n===null?n=[l]:n.push(l),a++}let o=i.length;for(let l=0;l<o;l++)Hi(i[l],{instancePath:e+"/"+l,parentData:i,parentDataProperty:l,rootData:r})||(n=n===null?Hi.errors:n.concat(Hi.errors),a=n.length)}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[o]:n.push(o),a++}return Do.errors=n,a===0}function Lo(i,{instancePath:e="",parentData:t,parentDataProperty:s,rootData:r=i}={}){let n=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.schemaVersion===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"schemaVersion"},message:"must have required property 'schemaVersion'"};n===null?n=[o]:n.push(o),a++}if(i.id===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"id"},message:"must have required property 'id'"};n===null?n=[o]:n.push(o),a++}if(i.title===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"title"},message:"must have required property 'title'"};n===null?n=[o]:n.push(o),a++}if(i.view===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"view"},message:"must have required property 'view'"};n===null?n=[o]:n.push(o),a++}if(i.nodes===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"nodes"},message:"must have required property 'nodes'"};n===null?n=[o]:n.push(o),a++}if(i.edges===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"edges"},message:"must have required property 'edges'"};n===null?n=[o]:n.push(o),a++}if(i.groups===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"groups"},message:"must have required property 'groups'"};n===null?n=[o]:n.push(o),a++}for(let o in i)if(!dr.call(Mf.properties,o)){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};n===null?n=[l]:n.push(l),a++}if(i.schemaVersion!==void 0){let o=i.schemaVersion;if(typeof o!="string"){let l={instancePath:e+"/schemaVersion",schemaPath:"#/properties/schemaVersion/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}if(o!=="2.0"){let l={instancePath:e+"/schemaVersion",schemaPath:"#/properties/schemaVersion/const",keyword:"const",params:{allowedValue:"2.0"},message:"must be equal to constant"};n===null?n=[l]:n.push(l),a++}}if(i.id!==void 0){let o=i.id;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.title!==void 0){let o=i.title;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/title",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/title",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/title",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.description!==void 0&&typeof i.description!="string"){let o={instancePath:e+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[o]:n.push(o),a++}if(i.sourceRevision!==void 0){let o=i.sourceRevision;if(o&&typeof o=="object"&&!Array.isArray(o)){if(o.commit===void 0){let l={instancePath:e+"/sourceRevision",schemaPath:"#/definitions/sourceRevision/required",keyword:"required",params:{missingProperty:"commit"},message:"must have required property 'commit'"};n===null?n=[l]:n.push(l),a++}for(let l in o)if(!(l==="commit"||l==="dirty")){let c={instancePath:e+"/sourceRevision",schemaPath:"#/definitions/sourceRevision/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:l},message:"must NOT have additional properties"};n===null?n=[c]:n.push(c),a++}if(o.commit!==void 0){let l=o.commit;if(typeof l=="string"){if(!Zh.test(l)){let c={instancePath:e+"/sourceRevision/commit",schemaPath:"#/definitions/sourceRevision/properties/commit/pattern",keyword:"pattern",params:{pattern:"^(?:[a-fA-F0-9]{40}|[a-fA-F0-9]{64})$"},message:'must match pattern "^(?:[a-fA-F0-9]{40}|[a-fA-F0-9]{64})$"'};n===null?n=[c]:n.push(c),a++}}else{let c={instancePath:e+"/sourceRevision/commit",schemaPath:"#/definitions/sourceRevision/properties/commit/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[c]:n.push(c),a++}}if(o.dirty!==void 0&&typeof o.dirty!="boolean"){let l={instancePath:e+"/sourceRevision/dirty",schemaPath:"#/definitions/sourceRevision/properties/dirty/type",keyword:"type",params:{type:"boolean"},message:"must be boolean"};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/sourceRevision",schemaPath:"#/definitions/sourceRevision/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[l]:n.push(l),a++}}if(i.view!==void 0&&(To(i.view,{instancePath:e+"/view",parentData:i,parentDataProperty:"view",rootData:r})||(n=n===null?To.errors:n.concat(To.errors),a=n.length)),i.nodes!==void 0&&(Ro(i.nodes,{instancePath:e+"/nodes",parentData:i,parentDataProperty:"nodes",rootData:r})||(n=n===null?Ro.errors:n.concat(Ro.errors),a=n.length)),i.edges!==void 0&&(Po(i.edges,{instancePath:e+"/edges",parentData:i,parentDataProperty:"edges",rootData:r})||(n=n===null?Po.errors:n.concat(Po.errors),a=n.length)),i.groups!==void 0&&(Co(i.groups,{instancePath:e+"/groups",parentData:i,parentDataProperty:"groups",rootData:r})||(n=n===null?Co.errors:n.concat(Co.errors),a=n.length)),i.spatial!==void 0){let o=i.spatial;if(o&&typeof o=="object"&&!Array.isArray(o)){for(let l in o)if(!(l==="interiors"||l==="models")){let c={instancePath:e+"/spatial",schemaPath:"#/properties/spatial/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:l},message:"must NOT have additional properties"};n===null?n=[c]:n.push(c),a++}o.interiors!==void 0&&(Io(o.interiors,{instancePath:e+"/spatial/interiors",parentData:o,parentDataProperty:"interiors",rootData:r})||(n=n===null?Io.errors:n.concat(Io.errors),a=n.length)),o.models!==void 0&&(Do(o.models,{instancePath:e+"/spatial/models",parentData:o,parentDataProperty:"models",rootData:r})||(n=n===null?Do.errors:n.concat(Do.errors),a=n.length))}else{let l={instancePath:e+"/spatial",schemaPath:"#/properties/spatial/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[l]:n.push(l),a++}}}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[o]:n.push(o),a++}return Lo.errors=n,a===0}function ki(i,{instancePath:e="",parentData:t,parentDataProperty:s,rootData:r=i}={}){let n=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.viewId===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"viewId"},message:"must have required property 'viewId'"};n===null?n=[o]:n.push(o),a++}if(i.nodeId===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"nodeId"},message:"must have required property 'nodeId'"};n===null?n=[o]:n.push(o),a++}for(let o in i)if(!(o==="viewId"||o==="nodeId")){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};n===null?n=[l]:n.push(l),a++}if(i.viewId!==void 0){let o=i.viewId;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/viewId",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/viewId",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/viewId",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.nodeId!==void 0){let o=i.nodeId;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/nodeId",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/nodeId",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/nodeId",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[o]:n.push(o),a++}return ki.errors=n,a===0}function No(i,{instancePath:e="",parentData:t,parentDataProperty:s,rootData:r=i}={}){let n=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.views===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"views"},message:"must have required property 'views'"};n===null?n=[o]:n.push(o),a++}for(let o in i)if(!(o==="views"||o==="bridges")){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};n===null?n=[l]:n.push(l),a++}if(i.views!==void 0){let o=i.views;if(Array.isArray(o)){if(o.length>20){let c={instancePath:e+"/views",schemaPath:"#/properties/views/maxItems",keyword:"maxItems",params:{limit:20},message:"must NOT have more than 20 items"};n===null?n=[c]:n.push(c),a++}let l=o.length;for(let c=0;c<l;c++){let h=o[c];if(h&&typeof h=="object"&&!Array.isArray(h)){if(h.parentId===void 0){let d={instancePath:e+"/views/"+c,schemaPath:"#/properties/views/items/required",keyword:"required",params:{missingProperty:"parentId"},message:"must have required property 'parentId'"};n===null?n=[d]:n.push(d),a++}if(h.ownerId===void 0){let d={instancePath:e+"/views/"+c,schemaPath:"#/properties/views/items/required",keyword:"required",params:{missingProperty:"ownerId"},message:"must have required property 'ownerId'"};n===null?n=[d]:n.push(d),a++}if(h.document===void 0){let d={instancePath:e+"/views/"+c,schemaPath:"#/properties/views/items/required",keyword:"required",params:{missingProperty:"document"},message:"must have required property 'document'"};n===null?n=[d]:n.push(d),a++}for(let d in h)if(!(d==="parentId"||d==="ownerId"||d==="document")){let u={instancePath:e+"/views/"+c,schemaPath:"#/properties/views/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:d},message:"must NOT have additional properties"};n===null?n=[u]:n.push(u),a++}if(h.parentId!==void 0){let d=h.parentId;if(typeof d=="string"){if(st(d)<1){let u={instancePath:e+"/views/"+c+"/parentId",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[u]:n.push(u),a++}if(!ct.test(d)){let u={instancePath:e+"/views/"+c+"/parentId",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[u]:n.push(u),a++}}else{let u={instancePath:e+"/views/"+c+"/parentId",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[u]:n.push(u),a++}}if(h.ownerId!==void 0){let d=h.ownerId;if(typeof d=="string"){if(st(d)<1){let u={instancePath:e+"/views/"+c+"/ownerId",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[u]:n.push(u),a++}if(!ct.test(d)){let u={instancePath:e+"/views/"+c+"/ownerId",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[u]:n.push(u),a++}}else{let u={instancePath:e+"/views/"+c+"/ownerId",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[u]:n.push(u),a++}}h.document!==void 0&&(Lo(h.document,{instancePath:e+"/views/"+c+"/document",parentData:h,parentDataProperty:"document",rootData:r})||(n=n===null?Lo.errors:n.concat(Lo.errors),a=n.length))}else{let d={instancePath:e+"/views/"+c,schemaPath:"#/properties/views/items/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[d]:n.push(d),a++}}}else{let l={instancePath:e+"/views",schemaPath:"#/properties/views/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[l]:n.push(l),a++}}if(i.bridges!==void 0){let o=i.bridges;if(Array.isArray(o)){if(o.length>300){let c={instancePath:e+"/bridges",schemaPath:"#/properties/bridges/maxItems",keyword:"maxItems",params:{limit:300},message:"must NOT have more than 300 items"};n===null?n=[c]:n.push(c),a++}let l=o.length;for(let c=0;c<l;c++){let h=o[c];if(h&&typeof h=="object"&&!Array.isArray(h)){if(h.id===void 0){let d={instancePath:e+"/bridges/"+c,schemaPath:"#/properties/bridges/items/required",keyword:"required",params:{missingProperty:"id"},message:"must have required property 'id'"};n===null?n=[d]:n.push(d),a++}if(h.source===void 0){let d={instancePath:e+"/bridges/"+c,schemaPath:"#/properties/bridges/items/required",keyword:"required",params:{missingProperty:"source"},message:"must have required property 'source'"};n===null?n=[d]:n.push(d),a++}if(h.target===void 0){let d={instancePath:e+"/bridges/"+c,schemaPath:"#/properties/bridges/items/required",keyword:"required",params:{missingProperty:"target"},message:"must have required property 'target'"};n===null?n=[d]:n.push(d),a++}if(h.kind===void 0){let d={instancePath:e+"/bridges/"+c,schemaPath:"#/properties/bridges/items/required",keyword:"required",params:{missingProperty:"kind"},message:"must have required property 'kind'"};n===null?n=[d]:n.push(d),a++}if(h.directed===void 0){let d={instancePath:e+"/bridges/"+c,schemaPath:"#/properties/bridges/items/required",keyword:"required",params:{missingProperty:"directed"},message:"must have required property 'directed'"};n===null?n=[d]:n.push(d),a++}for(let d in h)if(!dr.call(vf.properties.bridges.items.properties,d)){let u={instancePath:e+"/bridges/"+c,schemaPath:"#/properties/bridges/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:d},message:"must NOT have additional properties"};n===null?n=[u]:n.push(u),a++}if(h.id!==void 0){let d=h.id;if(typeof d=="string"){if(st(d)<1){let u={instancePath:e+"/bridges/"+c+"/id",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[u]:n.push(u),a++}if(!ct.test(d)){let u={instancePath:e+"/bridges/"+c+"/id",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[u]:n.push(u),a++}}else{let u={instancePath:e+"/bridges/"+c+"/id",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[u]:n.push(u),a++}}if(h.source!==void 0&&(ki(h.source,{instancePath:e+"/bridges/"+c+"/source",parentData:h,parentDataProperty:"source",rootData:r})||(n=n===null?ki.errors:n.concat(ki.errors),a=n.length)),h.target!==void 0&&(ki(h.target,{instancePath:e+"/bridges/"+c+"/target",parentData:h,parentDataProperty:"target",rootData:r})||(n=n===null?ki.errors:n.concat(ki.errors),a=n.length)),h.kind!==void 0){let d=h.kind;if(!(d==="control"||d==="data"||d==="dependency"||d==="exception"||d==="feedback")){let u={instancePath:e+"/bridges/"+c+"/kind",schemaPath:"#/definitions/edge/properties/kind/enum",keyword:"enum",params:{allowedValues:Sf.enum},message:"must be equal to one of the allowed values"};n===null?n=[u]:n.push(u),a++}}if(h.directed!==void 0&&typeof h.directed!="boolean"){let d={instancePath:e+"/bridges/"+c+"/directed",schemaPath:"#/properties/bridges/items/properties/directed/type",keyword:"type",params:{type:"boolean"},message:"must be boolean"};n===null?n=[d]:n.push(d),a++}if(h.label!==void 0&&typeof h.label!="string"){let d={instancePath:e+"/bridges/"+c+"/label",schemaPath:"#/properties/bridges/items/properties/label/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[d]:n.push(d),a++}if(h.details!==void 0){let d=h.details;if(typeof d=="string"){if(st(d)>8e3){let u={instancePath:e+"/bridges/"+c+"/details",schemaPath:"#/definitions/details/maxLength",keyword:"maxLength",params:{limit:8e3},message:"must NOT have more than 8000 characters"};n===null?n=[u]:n.push(u),a++}}else{let u={instancePath:e+"/bridges/"+c+"/details",schemaPath:"#/definitions/details/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[u]:n.push(u),a++}}if(h.evidenceStatus!==void 0){let d=h.evidenceStatus;if(!(d==="confirmed"||d==="assumed"||d==="planned")){let u={instancePath:e+"/bridges/"+c+"/evidenceStatus",schemaPath:"#/definitions/evidenceStatus/enum",keyword:"enum",params:{allowedValues:Fo.enum},message:"must be equal to one of the allowed values"};n===null?n=[u]:n.push(u),a++}}h.sources!==void 0&&(on(h.sources,{instancePath:e+"/bridges/"+c+"/sources",parentData:h,parentDataProperty:"sources",rootData:r})||(n=n===null?on.errors:n.concat(on.errors),a=n.length))}else{let d={instancePath:e+"/bridges/"+c,schemaPath:"#/properties/bridges/items/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[d]:n.push(d),a++}}}else{let l={instancePath:e+"/bridges",schemaPath:"#/properties/bridges/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[l]:n.push(l),a++}}}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[o]:n.push(o),a++}return No.errors=n,a===0}var Xh={type:"object",additionalProperties:!1,required:["id","title","description","route","focusId","tone"],properties:{id:{$ref:"#/definitions/nonEmptyText"},title:{$ref:"#/definitions/nonEmptyText"},description:{type:"string"},route:{type:"array",minItems:1,maxItems:300,items:{$ref:"#/definitions/nonEmptyText"}},focusId:{$ref:"#/definitions/nonEmptyText"},viewId:{$ref:"#/definitions/nonEmptyText"},evidenceStatus:{$ref:"#/definitions/evidenceStatus"},sources:{$ref:"#/definitions/sources"},tone:{enum:["request","data","success","failure"]},durationMs:{type:"integer",minimum:1,maximum:9007199254740991}}};function Uo(i,{instancePath:e="",parentData:t,parentDataProperty:s,rootData:r=i}={}){let n=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.id===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"id"},message:"must have required property 'id'"};n===null?n=[o]:n.push(o),a++}if(i.title===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"title"},message:"must have required property 'title'"};n===null?n=[o]:n.push(o),a++}if(i.description===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"description"},message:"must have required property 'description'"};n===null?n=[o]:n.push(o),a++}if(i.route===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"route"},message:"must have required property 'route'"};n===null?n=[o]:n.push(o),a++}if(i.focusId===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"focusId"},message:"must have required property 'focusId'"};n===null?n=[o]:n.push(o),a++}if(i.tone===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"tone"},message:"must have required property 'tone'"};n===null?n=[o]:n.push(o),a++}for(let o in i)if(!dr.call(Xh.properties,o)){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};n===null?n=[l]:n.push(l),a++}if(i.id!==void 0){let o=i.id;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.title!==void 0){let o=i.title;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/title",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/title",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/title",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.description!==void 0&&typeof i.description!="string"){let o={instancePath:e+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[o]:n.push(o),a++}if(i.route!==void 0){let o=i.route;if(Array.isArray(o)){if(o.length>300){let c={instancePath:e+"/route",schemaPath:"#/properties/route/maxItems",keyword:"maxItems",params:{limit:300},message:"must NOT have more than 300 items"};n===null?n=[c]:n.push(c),a++}if(o.length<1){let c={instancePath:e+"/route",schemaPath:"#/properties/route/minItems",keyword:"minItems",params:{limit:1},message:"must NOT have fewer than 1 items"};n===null?n=[c]:n.push(c),a++}let l=o.length;for(let c=0;c<l;c++){let h=o[c];if(typeof h=="string"){if(st(h)<1){let d={instancePath:e+"/route/"+c,schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[d]:n.push(d),a++}if(!ct.test(h)){let d={instancePath:e+"/route/"+c,schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[d]:n.push(d),a++}}else{let d={instancePath:e+"/route/"+c,schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[d]:n.push(d),a++}}}else{let l={instancePath:e+"/route",schemaPath:"#/properties/route/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[l]:n.push(l),a++}}if(i.focusId!==void 0){let o=i.focusId;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/focusId",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/focusId",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/focusId",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.viewId!==void 0){let o=i.viewId;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/viewId",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/viewId",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/viewId",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.evidenceStatus!==void 0){let o=i.evidenceStatus;if(!(o==="confirmed"||o==="assumed"||o==="planned")){let l={instancePath:e+"/evidenceStatus",schemaPath:"#/definitions/evidenceStatus/enum",keyword:"enum",params:{allowedValues:Fo.enum},message:"must be equal to one of the allowed values"};n===null?n=[l]:n.push(l),a++}}if(i.sources!==void 0&&(on(i.sources,{instancePath:e+"/sources",parentData:i,parentDataProperty:"sources",rootData:r})||(n=n===null?on.errors:n.concat(on.errors),a=n.length)),i.tone!==void 0){let o=i.tone;if(!(o==="request"||o==="data"||o==="success"||o==="failure")){let l={instancePath:e+"/tone",schemaPath:"#/properties/tone/enum",keyword:"enum",params:{allowedValues:Xh.properties.tone.enum},message:"must be equal to one of the allowed values"};n===null?n=[l]:n.push(l),a++}}if(i.durationMs!==void 0){let o=i.durationMs;if(!(typeof o=="number"&&!(o%1)&&!isNaN(o)&&isFinite(o))){let l={instancePath:e+"/durationMs",schemaPath:"#/properties/durationMs/type",keyword:"type",params:{type:"integer"},message:"must be integer"};n===null?n=[l]:n.push(l),a++}if(typeof o=="number"&&isFinite(o)){if(o>9007199254740991||isNaN(o)){let l={instancePath:e+"/durationMs",schemaPath:"#/properties/durationMs/maximum",keyword:"maximum",params:{comparison:"<=",limit:9007199254740991},message:"must be <= 9007199254740991"};n===null?n=[l]:n.push(l),a++}if(o<1||isNaN(o)){let l={instancePath:e+"/durationMs",schemaPath:"#/properties/durationMs/minimum",keyword:"minimum",params:{comparison:">=",limit:1},message:"must be >= 1"};n===null?n=[l]:n.push(l),a++}}}}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[o]:n.push(o),a++}return Uo.errors=n,a===0}function Oo(i,{instancePath:e="",parentData:t,parentDataProperty:s,rootData:r=i}={}){let n=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.id===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"id"},message:"must have required property 'id'"};n===null?n=[o]:n.push(o),a++}if(i.label===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"label"},message:"must have required property 'label'"};n===null?n=[o]:n.push(o),a++}if(i.steps===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"steps"},message:"must have required property 'steps'"};n===null?n=[o]:n.push(o),a++}for(let o in i)if(!(o==="id"||o==="label"||o==="steps")){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};n===null?n=[l]:n.push(l),a++}if(i.id!==void 0){let o=i.id;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.label!==void 0){let o=i.label;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/label",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/label",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/label",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.steps!==void 0){let o=i.steps;if(Array.isArray(o)){if(o.length>200){let c={instancePath:e+"/steps",schemaPath:"#/properties/steps/maxItems",keyword:"maxItems",params:{limit:200},message:"must NOT have more than 200 items"};n===null?n=[c]:n.push(c),a++}if(o.length<1){let c={instancePath:e+"/steps",schemaPath:"#/properties/steps/minItems",keyword:"minItems",params:{limit:1},message:"must NOT have fewer than 1 items"};n===null?n=[c]:n.push(c),a++}let l=o.length;for(let c=0;c<l;c++)Uo(o[c],{instancePath:e+"/steps/"+c,parentData:o,parentDataProperty:c,rootData:r})||(n=n===null?Uo.errors:n.concat(Uo.errors),a=n.length)}else{let l={instancePath:e+"/steps",schemaPath:"#/properties/steps/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[l]:n.push(l),a++}}}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[o]:n.push(o),a++}return Oo.errors=n,a===0}function jh(i,{instancePath:e="",parentData:t,parentDataProperty:s,rootData:r=i}={}){let n=null,a=0;if(i&&typeof i=="object"&&!Array.isArray(i)){if(i.schemaVersion===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"schemaVersion"},message:"must have required property 'schemaVersion'"};n===null?n=[o]:n.push(o),a++}if(i.id===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"id"},message:"must have required property 'id'"};n===null?n=[o]:n.push(o),a++}if(i.title===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"title"},message:"must have required property 'title'"};n===null?n=[o]:n.push(o),a++}if(i.view===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"view"},message:"must have required property 'view'"};n===null?n=[o]:n.push(o),a++}if(i.nodes===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"nodes"},message:"must have required property 'nodes'"};n===null?n=[o]:n.push(o),a++}if(i.edges===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"edges"},message:"must have required property 'edges'"};n===null?n=[o]:n.push(o),a++}if(i.groups===void 0){let o={instancePath:e,schemaPath:"#/required",keyword:"required",params:{missingProperty:"groups"},message:"must have required property 'groups'"};n===null?n=[o]:n.push(o),a++}for(let o in i)if(!dr.call(Eo.properties,o)){let l={instancePath:e,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:o},message:"must NOT have additional properties"};n===null?n=[l]:n.push(l),a++}if(i.schemaVersion!==void 0){let o=i.schemaVersion;if(typeof o!="string"){let l={instancePath:e+"/schemaVersion",schemaPath:"#/properties/schemaVersion/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}if(o!=="2.0"){let l={instancePath:e+"/schemaVersion",schemaPath:"#/properties/schemaVersion/const",keyword:"const",params:{allowedValue:"2.0"},message:"must be equal to constant"};n===null?n=[l]:n.push(l),a++}}if(i.id!==void 0){let o=i.id;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/id",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.title!==void 0){let o=i.title;if(typeof o=="string"){if(st(o)<1){let l={instancePath:e+"/title",schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[l]:n.push(l),a++}if(!ct.test(o)){let l={instancePath:e+"/title",schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/title",schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[l]:n.push(l),a++}}if(i.description!==void 0&&typeof i.description!="string"){let o={instancePath:e+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[o]:n.push(o),a++}if(i.sourceRevision!==void 0){let o=i.sourceRevision;if(o&&typeof o=="object"&&!Array.isArray(o)){if(o.commit===void 0){let l={instancePath:e+"/sourceRevision",schemaPath:"#/definitions/sourceRevision/required",keyword:"required",params:{missingProperty:"commit"},message:"must have required property 'commit'"};n===null?n=[l]:n.push(l),a++}for(let l in o)if(!(l==="commit"||l==="dirty")){let c={instancePath:e+"/sourceRevision",schemaPath:"#/definitions/sourceRevision/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:l},message:"must NOT have additional properties"};n===null?n=[c]:n.push(c),a++}if(o.commit!==void 0){let l=o.commit;if(typeof l=="string"){if(!Zh.test(l)){let c={instancePath:e+"/sourceRevision/commit",schemaPath:"#/definitions/sourceRevision/properties/commit/pattern",keyword:"pattern",params:{pattern:"^(?:[a-fA-F0-9]{40}|[a-fA-F0-9]{64})$"},message:'must match pattern "^(?:[a-fA-F0-9]{40}|[a-fA-F0-9]{64})$"'};n===null?n=[c]:n.push(c),a++}}else{let c={instancePath:e+"/sourceRevision/commit",schemaPath:"#/definitions/sourceRevision/properties/commit/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[c]:n.push(c),a++}}if(o.dirty!==void 0&&typeof o.dirty!="boolean"){let l={instancePath:e+"/sourceRevision/dirty",schemaPath:"#/definitions/sourceRevision/properties/dirty/type",keyword:"type",params:{type:"boolean"},message:"must be boolean"};n===null?n=[l]:n.push(l),a++}}else{let l={instancePath:e+"/sourceRevision",schemaPath:"#/definitions/sourceRevision/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[l]:n.push(l),a++}}if(i.navigation!==void 0&&(No(i.navigation,{instancePath:e+"/navigation",parentData:i,parentDataProperty:"navigation",rootData:r})||(n=n===null?No.errors:n.concat(No.errors),a=n.length)),i.view!==void 0){let o=i.view;if(o&&typeof o=="object"&&!Array.isArray(o)){if(o.kind===void 0){let l={instancePath:e+"/view",schemaPath:"#/properties/view/required",keyword:"required",params:{missingProperty:"kind"},message:"must have required property 'kind'"};n===null?n=[l]:n.push(l),a++}if(o.direction===void 0){let l={instancePath:e+"/view",schemaPath:"#/properties/view/required",keyword:"required",params:{missingProperty:"direction"},message:"must have required property 'direction'"};n===null?n=[l]:n.push(l),a++}if(o.theme===void 0){let l={instancePath:e+"/view",schemaPath:"#/properties/view/required",keyword:"required",params:{missingProperty:"theme"},message:"must have required property 'theme'"};n===null?n=[l]:n.push(l),a++}for(let l in o)if(!(l==="kind"||l==="direction"||l==="theme"||l==="collapsedGroups"||l==="primaryPath")){let c={instancePath:e+"/view",schemaPath:"#/properties/view/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:l},message:"must NOT have additional properties"};n===null?n=[c]:n.push(c),a++}if(o.kind!==void 0){let l=o.kind;if(!(l==="overview"||l==="flow"||l==="deployment")){let c={instancePath:e+"/view/kind",schemaPath:"#/properties/view/properties/kind/enum",keyword:"enum",params:{allowedValues:Eo.properties.view.properties.kind.enum},message:"must be equal to one of the allowed values"};n===null?n=[c]:n.push(c),a++}}if(o.direction!==void 0){let l=o.direction;if(!(l==="RIGHT"||l==="DOWN")){let c={instancePath:e+"/view/direction",schemaPath:"#/properties/view/properties/direction/enum",keyword:"enum",params:{allowedValues:Eo.properties.view.properties.direction.enum},message:"must be equal to one of the allowed values"};n===null?n=[c]:n.push(c),a++}}if(o.theme!==void 0){let l=o.theme;if(!(l==="light"||l==="dark")){let c={instancePath:e+"/view/theme",schemaPath:"#/properties/view/properties/theme/enum",keyword:"enum",params:{allowedValues:Eo.properties.view.properties.theme.enum},message:"must be equal to one of the allowed values"};n===null?n=[c]:n.push(c),a++}}if(o.collapsedGroups!==void 0){let l=o.collapsedGroups;if(Array.isArray(l)){let c=l.length;for(let u=0;u<c;u++){let f=l[u];if(typeof f=="string"){if(st(f)<1){let y={instancePath:e+"/view/collapsedGroups/"+u,schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[y]:n.push(y),a++}if(!ct.test(f)){let y={instancePath:e+"/view/collapsedGroups/"+u,schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[y]:n.push(y),a++}}else{let y={instancePath:e+"/view/collapsedGroups/"+u,schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[y]:n.push(y),a++}}let h=l.length,d;if(h>1){e:for(;h--;)for(d=h;d--;)if(Yh(l[h],l[d])){let u={instancePath:e+"/view/collapsedGroups",schemaPath:"#/properties/view/properties/collapsedGroups/uniqueItems",keyword:"uniqueItems",params:{i:h,j:d},message:"must NOT have duplicate items (items ## "+d+" and "+h+" are identical)"};n===null?n=[u]:n.push(u),a++;break e}}}else{let c={instancePath:e+"/view/collapsedGroups",schemaPath:"#/properties/view/properties/collapsedGroups/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[c]:n.push(c),a++}}if(o.primaryPath!==void 0){let l=o.primaryPath;if(Array.isArray(l)){let c=l.length;for(let h=0;h<c;h++){let d=l[h];if(typeof d=="string"){if(st(d)<1){let u={instancePath:e+"/view/primaryPath/"+h,schemaPath:"#/definitions/nonEmptyText/minLength",keyword:"minLength",params:{limit:1},message:"must NOT have fewer than 1 characters"};n===null?n=[u]:n.push(u),a++}if(!ct.test(d)){let u={instancePath:e+"/view/primaryPath/"+h,schemaPath:"#/definitions/nonEmptyText/pattern",keyword:"pattern",params:{pattern:"\\S"},message:'must match pattern "\\S"'};n===null?n=[u]:n.push(u),a++}}else{let u={instancePath:e+"/view/primaryPath/"+h,schemaPath:"#/definitions/nonEmptyText/type",keyword:"type",params:{type:"string"},message:"must be string"};n===null?n=[u]:n.push(u),a++}}}else{let c={instancePath:e+"/view/primaryPath",schemaPath:"#/properties/view/properties/primaryPath/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[c]:n.push(c),a++}}}else{let l={instancePath:e+"/view",schemaPath:"#/properties/view/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[l]:n.push(l),a++}}if(i.nodes!==void 0){let o=i.nodes;if(Array.isArray(o)){if(o.length>100){let c={instancePath:e+"/nodes",schemaPath:"#/properties/nodes/maxItems",keyword:"maxItems",params:{limit:100},message:"must NOT have more than 100 items"};n===null?n=[c]:n.push(c),a++}if(o.length<1){let c={instancePath:e+"/nodes",schemaPath:"#/properties/nodes/minItems",keyword:"minItems",params:{limit:1},message:"must NOT have fewer than 1 items"};n===null?n=[c]:n.push(c),a++}let l=o.length;for(let c=0;c<l;c++)Hn(o[c],{instancePath:e+"/nodes/"+c,parentData:o,parentDataProperty:c,rootData:r})||(n=n===null?Hn.errors:n.concat(Hn.errors),a=n.length)}else{let l={instancePath:e+"/nodes",schemaPath:"#/properties/nodes/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[l]:n.push(l),a++}}if(i.edges!==void 0){let o=i.edges;if(Array.isArray(o)){if(o.length>300){let c={instancePath:e+"/edges",schemaPath:"#/properties/edges/maxItems",keyword:"maxItems",params:{limit:300},message:"must NOT have more than 300 items"};n===null?n=[c]:n.push(c),a++}let l=o.length;for(let c=0;c<l;c++)Gn(o[c],{instancePath:e+"/edges/"+c,parentData:o,parentDataProperty:c,rootData:r})||(n=n===null?Gn.errors:n.concat(Gn.errors),a=n.length)}else{let l={instancePath:e+"/edges",schemaPath:"#/properties/edges/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[l]:n.push(l),a++}}if(i.groups!==void 0){let o=i.groups;if(Array.isArray(o)){if(o.length>20){let c={instancePath:e+"/groups",schemaPath:"#/properties/groups/maxItems",keyword:"maxItems",params:{limit:20},message:"must NOT have more than 20 items"};n===null?n=[c]:n.push(c),a++}let l=o.length;for(let c=0;c<l;c++)zi(o[c],{instancePath:e+"/groups/"+c,parentData:o,parentDataProperty:c,rootData:r})||(n=n===null?zi.errors:n.concat(zi.errors),a=n.length)}else{let l={instancePath:e+"/groups",schemaPath:"#/properties/groups/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[l]:n.push(l),a++}}if(i.spatial!==void 0){let o=i.spatial;if(o&&typeof o=="object"&&!Array.isArray(o)){for(let l in o)if(!(l==="interiors"||l==="models"||l==="scenarios")){let c={instancePath:e+"/spatial",schemaPath:"#/properties/spatial/additionalProperties",keyword:"additionalProperties",params:{additionalProperty:l},message:"must NOT have additional properties"};n===null?n=[c]:n.push(c),a++}if(o.interiors!==void 0){let l=o.interiors;if(Array.isArray(l)){if(l.length>100){let h={instancePath:e+"/spatial/interiors",schemaPath:"#/properties/spatial/properties/interiors/maxItems",keyword:"maxItems",params:{limit:100},message:"must NOT have more than 100 items"};n===null?n=[h]:n.push(h),a++}let c=l.length;for(let h=0;h<c;h++)Vi(l[h],{instancePath:e+"/spatial/interiors/"+h,parentData:l,parentDataProperty:h,rootData:r})||(n=n===null?Vi.errors:n.concat(Vi.errors),a=n.length)}else{let c={instancePath:e+"/spatial/interiors",schemaPath:"#/properties/spatial/properties/interiors/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[c]:n.push(c),a++}}if(o.models!==void 0){let l=o.models;if(Array.isArray(l)){if(l.length>100){let h={instancePath:e+"/spatial/models",schemaPath:"#/properties/spatial/properties/models/maxItems",keyword:"maxItems",params:{limit:100},message:"must NOT have more than 100 items"};n===null?n=[h]:n.push(h),a++}let c=l.length;for(let h=0;h<c;h++)Hi(l[h],{instancePath:e+"/spatial/models/"+h,parentData:l,parentDataProperty:h,rootData:r})||(n=n===null?Hi.errors:n.concat(Hi.errors),a=n.length)}else{let c={instancePath:e+"/spatial/models",schemaPath:"#/properties/spatial/properties/models/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[c]:n.push(c),a++}}if(o.scenarios!==void 0){let l=o.scenarios;if(Array.isArray(l)){if(l.length>20){let h={instancePath:e+"/spatial/scenarios",schemaPath:"#/properties/spatial/properties/scenarios/maxItems",keyword:"maxItems",params:{limit:20},message:"must NOT have more than 20 items"};n===null?n=[h]:n.push(h),a++}let c=l.length;for(let h=0;h<c;h++)Oo(l[h],{instancePath:e+"/spatial/scenarios/"+h,parentData:l,parentDataProperty:h,rootData:r})||(n=n===null?Oo.errors:n.concat(Oo.errors),a=n.length)}else{let c={instancePath:e+"/spatial/scenarios",schemaPath:"#/properties/spatial/properties/scenarios/type",keyword:"type",params:{type:"array"},message:"must be array"};n===null?n=[c]:n.push(c),a++}}}else{let l={instancePath:e+"/spatial",schemaPath:"#/properties/spatial/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[l]:n.push(l),a++}}}else{let o={instancePath:e,schemaPath:"#/type",keyword:"type",params:{type:"object"},message:"must be object"};n===null?n=[o]:n.push(o),a++}return jh.errors=n,a===0}function Af(i){let e=[],t=(r,n)=>{e.push({id:r.id,path:n,status:r.evidenceStatus??"assumed",sources:r.sources??[]})},s=(r,n)=>{r.nodes.forEach((a,o)=>t(a,`${n}/nodes/${o}`)),r.edges.forEach((a,o)=>t(a,`${n}/edges/${o}`)),(r.spatial?.interiors??[]).forEach((a,o)=>{a.nodes.forEach((l,c)=>t(l,`${n}/spatial/interiors/${o}/nodes/${c}`)),a.edges.forEach((l,c)=>t(l,`${n}/spatial/interiors/${o}/edges/${c}`))})};return s(i,""),(i.navigation?.views??[]).forEach((r,n)=>s(r.document,`/navigation/views/${n}/document`)),(i.spatial?.scenarios??[]).forEach((r,n)=>{r.steps.forEach((a,o)=>t(a,`/spatial/scenarios/${n}/steps/${o}`))}),(i.navigation?.bridges??[]).forEach((r,n)=>t(r,`/navigation/bridges/${n}`)),e}function Jh(i){return Af(i).filter(e=>e.status==="confirmed"&&!e.sources.some(t=>t.path.trim().length>0)).map(e=>({code:"SOURCE_MISSING",path:`${e.path}/sources`,ids:[e.id],severity:"warning",message:"confirmed \u4FE1\u606F\u9700\u8981\u81F3\u5C11\u4E00\u4E2A\u975E\u7A7A\u6765\u6E90\uFF1B\u6765\u6E90\u4E00\u81F4\u4ECD\u9700\u4EBA\u5DE5\u6838\u5BF9\u63CF\u8FF0\u4E0E\u8C03\u7528\u8BED\u4E49\u3002"}))}var Rf=2*1024*1024,Kh=$h;function Qh(i){return i.replaceAll("~","~0").replaceAll("/","~1")}function Pf(i){let e=i.instancePath;return i.keyword==="required"&&(e+=`/${Qh(String(i.params.missingProperty))}`),i.keyword==="additionalProperties"&&(e+=`/${Qh(String(i.params.additionalProperty))}`),{code:`SCHEMA_${i.keyword.replace(/[A-Z]/g,t=>`_${t}`).toUpperCase()}`,path:e,ids:[],severity:"error",message:`${e||"/"}: ${i.message??"\u7ED3\u6784\u4E0D\u7B26\u5408 schema"}`}}function eu(i,e,t=""){let s=Vn(i);i.nodes.forEach((r,n)=>{let a=s.outgoing.get(r.id)??[];if(r.kind==="decision"){let o=a.filter(hs);o.length<2&&e("DECISION_BRANCH_COUNT",`${t}/nodes/${n}/kind`,[r.id],"decision \u5728\u6D41\u7A0B\u5B50\u56FE\u4E2D\u81F3\u5C11\u9700\u8981\u4E24\u4E2A\u51FA\u53E3\uFF0Cdata/dependency \u4E0D\u8BA1\u5165\u3002");let l=new Set;for(let c of o){let h=c.label?.trim(),d=`${t}/edges/${i.edges.indexOf(c)}/label`;h?l.has(h)&&e("DECISION_CONDITION_DUPLICATE",d,[r.id,c.id],"\u540C\u4E00\u5224\u65AD\u8282\u70B9\u7684\u51FA\u53E3\u6761\u4EF6\u5FC5\u987B\u53EF\u533A\u5206\u3002"):e("DECISION_CONDITION_MISSING",d,[r.id,c.id],"\u5224\u65AD\u51FA\u53E3\u5FC5\u987B\u6709\u975E\u7A7A\u6761\u4EF6\uFF0C\u4E0D\u80FD\u81EA\u52A8\u63A8\u65AD\u662F\u6216\u5426\u3002"),h&&l.add(h)}}r.kind==="fork"&&a.filter(o=>o.kind==="control").length<2&&e("FORK_BRANCH_COUNT",`${t}/nodes/${n}/kind`,[r.id],"fork \u81F3\u5C11\u9700\u8981\u4E24\u4E2A control \u51FA\u53E3\u3002"),r.kind==="join"&&(s.incoming.get(r.id)??[]).filter(o=>o.kind==="control").length<2&&e("JOIN_BRANCH_COUNT",`${t}/nodes/${n}/kind`,[r.id],"join \u81F3\u5C11\u9700\u8981\u4E24\u4E2A control \u5165\u53E3\u3002")})}function uc(i){let e=[],t=(p,b,I,N,O="error")=>{e.push({code:p,path:b,ids:I,message:N,severity:O})};try{let p=JSON.stringify(i);if(p!==void 0&&new TextEncoder().encode(p).byteLength>Rf)return t("DOCUMENT_SIZE_LIMIT","",[],"\u56FE\u6570\u636E\u8D85\u8FC7 2 MiB\uFF0C\u8BF7\u63D0\u70BC\u4E3A\u603B\u89C8\u4E0E\u5B50\u56FE\uFF0C\u4E0D\u8981\u653E\u5165\u5B8C\u6574\u6E90\u7801\u6216\u65E5\u5FD7\u3002"),{valid:!1,diagnostics:e}}catch(p){return t("DOCUMENT_NOT_JSON","",[],`\u56FE\u6570\u636E\u65E0\u6CD5\u8868\u793A\u4E3A JSON\uFF1A${p instanceof Error?p.message:String(p)}`),{valid:!1,diagnostics:e}}if(!Kh(i))return{valid:!1,diagnostics:(Kh.errors??[]).map(Pf)};let s=i,r=us(s),n=new Set([s.id]),a=new Map;(s.navigation?.views??[]).forEach((p,b)=>{let I=`/navigation/views/${b}`;n.has(p.document.id)&&t("NAVIGATION_VIEW_DUPLICATE",`${I}/document/id`,[p.document.id],"\u6839\u56FE\u548C\u5B50\u56FE\u7684\u89C6\u56FE ID \u5FC5\u987B\u552F\u4E00\u3002"),n.add(p.document.id),r.getView(p.parentId)?r.getNode(p.parentId,p.ownerId)||t("NAVIGATION_OWNER_MISSING",`${I}/ownerId`,[p.parentId,p.ownerId],"\u5B50\u56FE\u5165\u53E3\u5FC5\u987B\u5F15\u7528\u7236\u89C6\u56FE\u7684\u603B\u89C8\u6216\u5185\u90E8\u8282\u70B9\u3002"):t("NAVIGATION_PARENT_MISSING",`${I}/parentId`,[p.parentId],"\u7236\u89C6\u56FE\u5FC5\u987B\u5F15\u7528\u6839\u56FE\u6216\u5DF2\u5B9A\u4E49\u7684\u5B50\u56FE\u3002");let N=a.get(p.parentId)??new Set;N.has(p.ownerId)&&t("NAVIGATION_ENTRY_DUPLICATE",`${I}/ownerId`,[p.parentId,p.ownerId],"\u540C\u4E00\u7236\u89C6\u56FE\u8282\u70B9\u53EA\u80FD\u6620\u5C04\u4E00\u4E2A\u5B50\u56FE\u3002"),N.add(p.ownerId),a.set(p.parentId,N);let O=new Set([p.document.id]),H=p.parentId,F=0;for(;;){if(F+=1,O.has(H)){t("NAVIGATION_CYCLE",`${I}/parentId`,[...O,H],"\u5B50\u56FE\u7236\u94FE\u4E0D\u80FD\u5F62\u6210\u5FAA\u73AF\u3002");break}if(O.add(H),H===s.id)break;let W=r.getEntry(H);if(!W){t("NAVIGATION_ROOT_UNREACHABLE",`${I}/parentId`,[...O],"\u6BCF\u4E2A\u5B50\u56FE\u7236\u94FE\u5FC5\u987B\u8FDE\u63A5\u5230\u6839\u56FE\u3002");break}H=W.parentId}F>4&&t("NAVIGATION_DEPTH_LIMIT",`${I}/parentId`,[...O],"\u6700\u591A\u652F\u6301\u56DB\u6B21\u7236\u5B50\u8DF3\u8F6C\uFF1B\u8BF7\u5408\u5E76\u5C42\u7EA7\u3002");for(let W of uc(p.document).diagnostics)e.push({...W,path:`${I}/document${W.path}`})});let o=new Set;(s.navigation?.bridges??[]).forEach((p,b)=>{let I=`/navigation/bridges/${b}`;o.has(p.id)&&t("NAVIGATION_BRIDGE_DUPLICATE",`${I}/id`,[p.id],"\u8DE8\u89C6\u56FE\u5173\u8054 ID \u5FC5\u987B\u552F\u4E00\u3002"),o.add(p.id);for(let N of["source","target"]){let O=p[N];r.getView(O.viewId)?r.getNode(O.viewId,O.nodeId)||t("NAVIGATION_BRIDGE_NODE_MISSING",`${I}/${N}/nodeId`,[p.id,O.viewId,O.nodeId],"\u5173\u8054\u7AEF\u70B9\u5FC5\u987B\u5F15\u7528\u8BE5\u89C6\u56FE\u7684\u603B\u89C8\u6216\u5185\u90E8\u8282\u70B9\u3002"):t("NAVIGATION_BRIDGE_VIEW_MISSING",`${I}/${N}/viewId`,[p.id,O.viewId],"\u5173\u8054\u7AEF\u70B9\u5FC5\u987B\u5F15\u7528\u5DF2\u6709\u89C6\u56FE\u3002")}["control","exception","feedback"].includes(p.kind)&&!p.directed&&t("FLOW_EDGE_UNDIRECTED",`${I}/directed`,[p.id],"control\u3001exception \u548C feedback \u5173\u8054\u5FC5\u987B\u6709\u660E\u786E\u65B9\u5411\u3002")});let l=new Set,c=new Set,h=new Set;s.nodes.forEach((p,b)=>{c.has(p.id)&&t("ID_DUPLICATE",`/nodes/${b}/id`,[p.id],"\u8282\u70B9\u548C\u7EC4 ID \u5FC5\u987B\u5728\u540C\u4E00\u547D\u540D\u7A7A\u95F4\u5185\u552F\u4E00\u3002"),c.add(p.id),l.add(p.id)}),s.groups.forEach((p,b)=>{c.has(p.id)&&t("ID_DUPLICATE",`/groups/${b}/id`,[p.id],"\u8282\u70B9\u548C\u7EC4 ID \u5FC5\u987B\u5728\u540C\u4E00\u547D\u540D\u7A7A\u95F4\u5185\u552F\u4E00\u3002"),c.add(p.id)});let d=new Map(s.groups.map(p=>[p.id,p]));s.nodes.forEach((p,b)=>{p.groupId&&!d.has(p.groupId)&&t("NODE_GROUP_MISSING",`/nodes/${b}/groupId`,[p.id,p.groupId],"\u8282\u70B9\u5F15\u7528\u7684\u5206\u7EC4\u4E0D\u5B58\u5728\u3002")}),s.groups.forEach((p,b)=>{p.parentId&&!d.has(p.parentId)&&t("GROUP_PARENT_MISSING",`/groups/${b}/parentId`,[p.id,p.parentId],"\u7236\u5206\u7EC4\u4E0D\u5B58\u5728\u3002");let I=new Set,N=p;for(;N;){if(I.has(N.id)){t("GROUP_CYCLE",`/groups/${b}/parentId`,[...I],"\u5206\u7EC4\u5F52\u5C5E\u4E0D\u80FD\u5F62\u6210\u5FAA\u73AF\u3002");break}I.add(N.id),N=N.parentId?d.get(N.parentId):void 0}I.size>2&&t("GROUP_DEPTH_LIMIT",`/groups/${b}/parentId`,[...I],"\u5206\u7EC4\u6700\u591A\u652F\u6301\u4E24\u5C42\uFF1B\u8BF7\u5408\u5E76\u5C42\u7EA7\u6216\u62C6\u4E3A\u5B50\u56FE\u3002")}),s.edges.forEach((p,b)=>{h.has(p.id)&&t("EDGE_ID_DUPLICATE",`/edges/${b}/id`,[p.id],"\u8FB9 ID \u5FC5\u987B\u5728\u6587\u6863\u5185\u552F\u4E00\u3002"),h.add(p.id),l.has(p.source)||t("EDGE_SOURCE_MISSING",`/edges/${b}/source`,[p.id,p.source],"\u8FB9\u7684 source \u5FC5\u987B\u5F15\u7528\u5DF2\u6709\u8282\u70B9\u3002"),l.has(p.target)||t("EDGE_TARGET_MISSING",`/edges/${b}/target`,[p.id,p.target],"\u8FB9\u7684 target \u5FC5\u987B\u5F15\u7528\u5DF2\u6709\u8282\u70B9\u3002"),hs(p)&&!p.directed&&t("FLOW_EDGE_UNDIRECTED",`/edges/${b}/directed`,[p.id],"control\u3001exception \u548C feedback \u6D41\u7A0B\u8FB9\u5FC5\u987B\u6709\u660E\u786E\u65B9\u5411\u3002")});let u=Vn(s);s.groups.forEach((p,b)=>{u.groupMembers.get(p.id)?.size||t("GROUP_EMPTY",`/groups/${b}`,[p.id],"\u5206\u7EC4\u5FC5\u987B\u76F4\u63A5\u6216\u901A\u8FC7\u5B50\u7EC4\u5305\u542B\u8282\u70B9\u3002")}),eu(s,t);let f=new Set,y;(s.view.primaryPath??[]).forEach((p,b)=>{let I=`/view/primaryPath/${b}`,N=u.edges.get(p);N||t("PRIMARY_EDGE_MISSING",I,[p],"\u4E3B\u8DEF\u5F84\u5F15\u7528\u7684\u8FB9\u4E0D\u5B58\u5728\u3002"),f.has(p)&&t("PRIMARY_EDGE_DUPLICATE",I,[p],"\u4E3B\u8DEF\u5F84\u4E0D\u80FD\u91CD\u590D\u5F15\u7528\u540C\u4E00\u6761\u8FB9\u3002"),f.add(p),N&&!N.directed&&t("PRIMARY_EDGE_UNDIRECTED",I,[p],"\u4E3B\u8DEF\u5F84\u53EA\u80FD\u4F7F\u7528\u6709\u5411\u8FB9\u3002"),y&&N&&y.target!==N.source&&t("PRIMARY_PATH_DISCONNECTED",I,[y.id,p],"\u4E3B\u8DEF\u5F84\u76F8\u90BB\u8FB9\u5FC5\u987B\u6309\u7167 source \u2192 target \u8FDE\u7EED\u8FDE\u63A5\u3002"),y=N}),(s.view.collapsedGroups??[]).forEach((p,b)=>{d.has(p)||t("COLLAPSED_GROUP_MISSING",`/view/collapsedGroups/${b}`,[p],"\u521D\u59CB\u6298\u53E0\u72B6\u6001\u5F15\u7528\u7684\u7EC4\u4E0D\u5B58\u5728\u3002")});let x=s.spatial?.interiors??[],g=new Set(l),m=new Set,M=s.nodes.length,P=s.edges.length;x.forEach((p,b)=>{let I=`/spatial/interiors/${b}`;l.has(p.owner)||t("SPATIAL_OWNER_MISSING",`${I}/owner`,[p.owner],"\u5256\u9762 owner \u5FC5\u987B\u5F15\u7528\u603B\u89C8\u8282\u70B9\u3002"),m.has(p.owner)&&t("SPATIAL_OWNER_DUPLICATE",`${I}/owner`,[p.owner],"\u540C\u4E00\u4E2A\u603B\u89C8\u8282\u70B9\u53EA\u80FD\u5B9A\u4E49\u4E00\u4E2A\u5256\u9762\u3002"),m.add(p.owner),M+=p.nodes.length,P+=p.edges.length;let N=new Set(p.nodes.map(O=>O.id));p.nodes.forEach((O,H)=>{c.has(O.id)&&t("ID_DUPLICATE",`${I}/nodes/${H}/id`,[O.id],"\u603B\u89C8\u3001\u7EC4\u548C\u6240\u6709\u5256\u9762\u7684\u8282\u70B9 ID \u5FC5\u987B\u5728\u540C\u4E00\u547D\u540D\u7A7A\u95F4\u5185\u552F\u4E00\u3002"),c.add(O.id),g.add(O.id),O.groupId&&!d.has(O.groupId)&&t("NODE_GROUP_MISSING",`${I}/nodes/${H}/groupId`,[O.id,O.groupId],"\u5185\u90E8\u8282\u70B9\u5F15\u7528\u7684\u5206\u7EC4\u4E0D\u5B58\u5728\u3002")}),p.edges.forEach((O,H)=>{let F=`${I}/edges/${H}`;h.has(O.id)&&t("EDGE_ID_DUPLICATE",`${F}/id`,[O.id],"\u603B\u89C8\u548C\u6240\u6709\u5256\u9762\u7684\u8FB9 ID \u5FC5\u987B\u5728\u6587\u6863\u5185\u552F\u4E00\u3002"),h.add(O.id),N.has(O.source)||t("EDGE_SOURCE_MISSING",`${F}/source`,[O.id,O.source],"\u5185\u90E8\u8FB9\u7684 source \u5FC5\u987B\u5F15\u7528\u540C\u4E00\u5256\u9762\u7684\u8282\u70B9\u3002"),N.has(O.target)||t("EDGE_TARGET_MISSING",`${F}/target`,[O.id,O.target],"\u5185\u90E8\u8FB9\u7684 target \u5FC5\u987B\u5F15\u7528\u540C\u4E00\u5256\u9762\u7684\u8282\u70B9\u3002"),hs(O)&&!O.directed&&t("FLOW_EDGE_UNDIRECTED",`${F}/directed`,[O.id],"control\u3001exception \u548C feedback \u6D41\u7A0B\u8FB9\u5FC5\u987B\u6709\u660E\u786E\u65B9\u5411\u3002")}),eu({...s,nodes:p.nodes,edges:p.edges,groups:[]},t,I)}),M>100&&t("SPATIAL_NODE_LIMIT","/spatial/interiors",[],"\u603B\u89C8\u548C\u6240\u6709\u5256\u9762\u5408\u8BA1\u6700\u591A 100 \u4E2A\u8282\u70B9\u3002"),P>300&&t("SPATIAL_EDGE_LIMIT","/spatial/interiors",[],"\u603B\u89C8\u548C\u6240\u6709\u5256\u9762\u5408\u8BA1\u6700\u591A 300 \u6761\u8FB9\u3002");let v=new Set;(s.spatial?.models??[]).forEach((p,b)=>{let I=`/spatial/models/${b}/nodeId`;g.has(p.nodeId)||t("SPATIAL_MODEL_NODE_MISSING",I,[p.nodeId],"\u6A21\u578B\u5FC5\u987B\u5F15\u7528\u5DF2\u6709\u603B\u89C8\u6216\u5185\u90E8\u8282\u70B9\u3002"),v.has(p.nodeId)&&t("SPATIAL_MODEL_DUPLICATE",I,[p.nodeId],"\u540C\u4E00\u8282\u70B9\u53EA\u80FD\u5B9A\u4E49\u4E00\u4E2A\u6A21\u578B\u5916\u89C2\u3002"),v.add(p.nodeId)});let T=new Set;if((s.spatial?.scenarios??[]).forEach((p,b)=>{let I=`/spatial/scenarios/${b}`;T.has(p.id)&&t("SPATIAL_SCENARIO_DUPLICATE",`${I}/id`,[p.id],"\u6F14\u793A\u573A\u666F ID \u5FC5\u987B\u552F\u4E00\u3002"),T.add(p.id);let N=new Set,O=0;p.steps.forEach((H,F)=>{let W=`${I}/steps/${F}`,j=H.viewId??s.id,Y=r.getView(j);Y||t("SPATIAL_STEP_VIEW_MISSING",`${W}/viewId`,[p.id,H.id,j],"\u6F14\u793A\u6B65\u9AA4\u5FC5\u987B\u5F15\u7528\u5DF2\u6709\u89C6\u56FE\u3002"),N.has(H.id)&&t("SPATIAL_STEP_DUPLICATE",`${W}/id`,[p.id,H.id],"\u540C\u4E00\u573A\u666F\u7684\u6B65\u9AA4 ID \u5FC5\u987B\u552F\u4E00\u3002"),N.add(H.id),H.route.forEach((le,K)=>{Y&&!r.getNode(j,le)&&t("SPATIAL_ROUTE_NODE_MISSING",`${W}/route/${K}`,[p.id,H.id,le],"\u6F14\u793A\u8DEF\u5F84\u5FC5\u987B\u5F15\u7528\u6B65\u9AA4\u89C6\u56FE\u5185\u7684\u603B\u89C8\u6216\u5185\u90E8\u8282\u70B9\u3002")}),Y&&!r.getNode(j,H.focusId)&&t("SPATIAL_FOCUS_NODE_MISSING",`${W}/focusId`,[p.id,H.id,H.focusId],"\u6F14\u793A\u7126\u70B9\u5FC5\u987B\u5F15\u7528\u6B65\u9AA4\u89C6\u56FE\u5185\u7684\u603B\u89C8\u6216\u5185\u90E8\u8282\u70B9\u3002"),O+=H.durationMs??2200}),Number.isSafeInteger(O)||t("SPATIAL_DURATION_LIMIT",`${I}/steps`,[p.id],"\u573A\u666F\u603B\u65F6\u957F\u4E0D\u80FD\u8D85\u8FC7\u5B89\u5168\u6574\u6570\u8303\u56F4\u3002")}),!e.some(p=>p.severity==="error")){let p=new Set,b=[];for(let N of s.nodes){if(p.has(N.id))continue;let O=[N.id];p.add(N.id);for(let H=0;H<O.length;H+=1){let F=O[H];for(let W of[...u.incoming.get(F),...u.outgoing.get(F)]){let j=W.source===F?W.target:W.source;p.has(j)||(p.add(j),O.push(j))}}b.push(O)}b.length>1&&t("GRAPH_DISCONNECTED","/nodes",b.slice(1).flat(),`\u56FE\u4E2D\u5305\u542B ${b.length} \u4E2A\u4E92\u4E0D\u8FDE\u901A\u7684\u5B50\u56FE\uFF1B\u8BF7\u786E\u8BA4\u8FD9\u662F\u9884\u671F\u8868\u8FBE\u3002`,"warning");let I=s.nodes.filter(N=>N.kind==="start").map(N=>N.id);if(s.view.kind==="flow"&&I.length>0){let N=wo(u,I,"downstream").nodeIds,O=new Set(s.edges.filter(hs).flatMap(F=>[F.source,F.target])),H=s.nodes.filter(F=>O.has(F.id)&&!N.has(F.id)).map(F=>F.id);H.length>0&&t("GRAPH_UNREACHABLE","/nodes",H,"\u8FD9\u4E9B\u6D41\u7A0B\u8282\u70B9\u65E0\u6CD5\u4ECE\u4EFB\u4F55 start \u8282\u70B9\u6CBF\u6D41\u7A0B\u65B9\u5411\u5230\u8FBE\uFF0C\u8BF7\u786E\u8BA4\u5165\u53E3\u548C\u8FB9\u65B9\u5411\u3002","warning")}}let w=new Set(e.map(p=>`${p.code}\0${p.path}`));for(let p of Jh(s))w.has(`${p.code}\0${p.path}`)||e.push(p);let L=!e.some(p=>p.severity==="error");return{valid:L,...L?{document:s}:{},diagnostics:e}}function dc(i,e=i.id){let t=uc(i);if(!t.valid)throw new Error(t.diagnostics.filter(o=>o.severity==="error").map(o=>`${o.code} ${o.path}: ${o.message}`).join(`
`));let s=us(i),r=s.getView(e);if(!r)throw new Error(`\u672A\u77E5\u89C6\u56FE\uFF1A${e}`);let n=tu(r),a=new Map([...s.views].map(([o,l])=>[o,tu(l)]));return n.scenarios=(i.spatial?.scenarios??[]).map(o=>({id:o.id,label:o.label,steps:o.steps.map(l=>({...l,viewId:l.viewId??i.id,route:[...l.route],durationMs:l.durationMs??2200,openModules:[...new Set([...l.route,l.focusId].map(c=>Gi(a.get(l.viewId??i.id),c)).filter(c=>c!==null))]}))})),n}function tu(i){let e=Object.create(null),t=new Map,s=[],r=new Map(i.nodes.map(o=>[o.id,o])),n=new Map(i.groups.map(o=>[o.id,o]));for(let o of i.spatial?.interiors??[]){s.push(o.owner);let l=new Set;for(let c of o.nodes){t.set(c.id,o.owner);let h=c.groupId;for(;h&&!l.has(h);)l.add(h),h=n.get(h)?.parentId}e[o.owner]={schemaVersion:i.schemaVersion,id:`${i.id}:${o.owner}`,title:`${r.get(o.owner).label} \xB7 \u5185\u90E8\u7EC4\u4EF6`,...i.description===void 0?{}:{description:i.description},view:{kind:i.view.kind,direction:i.view.direction,theme:i.view.theme},nodes:o.nodes,edges:o.edges,groups:i.groups.filter(c=>l.has(c.id))}}return{document:i,moduleIds:s,documents:e,owners:t,models:new Map((i.spatial?.models??[]).map(({nodeId:o,...l})=>[o,l])),scenarios:[]}}function Gi(i,e){return e===null?null:i.owners.get(e)??(i.moduleIds.includes(e)?e:null)}var Ln={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Mn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Uu=0,Zc=1,Ou=2;var es=1,Fu=2,qs=3,Ri=0,Jt=1,bn=2,Zn=0,Xs=1,jc=2,Jc=3,Kc=4,Bu=5;var ts=100,ku=101,zu=102,Vu=103,Hu=104,Gu=200,Wu=201,qu=202,Xu=203,Qc=204,eh=205,$u=206,Yu=207,Zu=208,ju=209,Ju=210,Ku=211,Qu=212,ed=213,td=214,fa=0,pa=1,ma=2,Is=3,ga=4,ya=5,_a=6,xa=7,th=0,nd=1,id=2,Nn=0,nh=1,ih=2,sh=3,Kr=4,rh=5,oh=6,ah=7;var lh=300,Pi=301,ns=302,tl=303,nl=304,Qr=306,va=1e3,Xn=1001,Sa=1002,Bt=1003,sd=1004;var eo=1005;var zt=1006,il=1007;var Ci=1008;var nn=1009,ch=1010,hh=1011,$s=1012,sl=1013,Un=1014,On=1015,Fn=1016,rl=1017,ol=1018,Ys=1020,uh=35902,dh=35899,fh=1021,ph=1022,wn=1023,$n=1026,Ii=1027,mh=1028,al=1029,Di=1030,ll=1031;var cl=1033,to=33776,no=33777,io=33778,so=33779,hl=35840,ul=35841,dl=35842,fl=35843,pl=36196,ml=37492,gl=37496,yl=37488,_l=37489,ro=37490,xl=37491,vl=37808,Sl=37809,Ml=37810,bl=37811,wl=37812,El=37813,Tl=37814,Al=37815,Rl=37816,Pl=37817,Cl=37818,Il=37819,Dl=37820,Ll=37821,Nl=36492,Ul=36494,Ol=36495,Fl=36283,Bl=36284,oo=36285,kl=36286;var wr=2300,Ma=2301,ua=2302,zc=2303,Vc=2400,Hc=2401,Gc=2402;var rd=3200;var zl=0,od=1,ai="",qt="srgb",Er="srgb-linear",Tr="linear",dt="srgb";var da=7680;var ad=519,ld=512,cd=513,hd=514,Vl=515,ud=516,dd=517,Hl=518,fd=519,gh=35044;var yh="300 es",Cn=2e3,Ds=2001;function Cf(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function If(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Ar(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function pd(){let i=Ar("canvas");return i.style.display="block",i}var nu={},Ls=null;function Rr(...i){let e="THREE."+i.shift();Ls?Ls("log",e,...i):console.log(e,...i)}function md(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function He(...i){i=md(i);let e="THREE."+i.shift();if(Ls)Ls("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ge(...i){i=md(i);let e="THREE."+i.shift();if(Ls)Ls("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Yi(...i){let e=i.join(" ");e in nu||(nu[e]=!0,He(...i))}function gd(i,e,t){return new Promise(function(s,r){function n(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(n,t);break;default:s()}}setTimeout(n,t)})}var yd={[fa]:pa,[ma]:_a,[ga]:xa,[Is]:ya,[pa]:fa,[_a]:ma,[xa]:ga,[ya]:Is},In=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(t)===-1&&s[e].push(t)}hasEventListener(e,t){let s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(t)!==-1}removeEventListener(e,t){let s=this._listeners;if(s===void 0)return;let r=s[e];if(r!==void 0){let n=r.indexOf(t);n!==-1&&r.splice(n,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let s=t[e.type];if(s!==void 0){e.target=this;let r=s.slice(0);for(let n=0,a=r.length;n<a;n++)r[n].call(this,e);e.target=null}}},Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],iu=1234567,Ps=Math.PI/180,Ns=180/Math.PI;function si(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Gt[i&255]+Gt[i>>8&255]+Gt[i>>16&255]+Gt[i>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[s&255]+Gt[s>>8&255]+Gt[s>>16&255]+Gt[s>>24&255]).toLowerCase()}function Ke(i,e,t){return Math.max(e,Math.min(t,i))}function _h(i,e){return(i%e+e)%e}function Df(i,e,t,s,r){return s+(i-e)*(r-s)/(t-e)}function Lf(i,e,t){return i!==e?(t-i)/(e-i):0}function Sr(i,e,t){return(1-t)*i+t*e}function Nf(i,e,t,s){return Sr(i,e,1-Math.exp(-t*s))}function Uf(i,e=1){return e-Math.abs(_h(i,e*2)-e)}function Of(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Ff(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Bf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function kf(i,e){return i+Math.random()*(e-i)}function zf(i){return i*(.5-Math.random())}function Vf(i){i!==void 0&&(iu=i);let e=iu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Hf(i){return i*Ps}function Gf(i){return i*Ns}function Wf(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function qf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Xf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function $f(i,e,t,s,r){let n=Math.cos,a=Math.sin,o=n(t/2),l=a(t/2),c=n((e+s)/2),h=a((e+s)/2),d=n((e-s)/2),u=a((e-s)/2),f=n((s-e)/2),y=a((s-e)/2);switch(r){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*y,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*y,o*c);break;case"ZYZ":i.set(l*y,l*f,o*h,o*c);break;default:He("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Pn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function pt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var is={DEG2RAD:Ps,RAD2DEG:Ns,generateUUID:si,clamp:Ke,euclideanModulo:_h,mapLinear:Df,inverseLerp:Lf,lerp:Sr,damp:Nf,pingpong:Uf,smoothstep:Of,smootherstep:Ff,randInt:Bf,randFloat:kf,randFloatSpread:zf,seededRandom:Vf,degToRad:Hf,radToDeg:Gf,isPowerOfTwo:Wf,ceilPowerOfTwo:qf,floorPowerOfTwo:Xf,setQuaternionFromProperEuler:$f,normalize:pt,denormalize:Pn},Me=class i{static{i.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,s=this.y,r=e.elements;return this.x=r[0]*t+r[3]*s+r[6],this.y=r[1]*t+r[4]*s+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){let s=this.length();return this.divideScalar(s||1).multiplyScalar(Ke(s,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let s=this.dot(e)/t;return Math.acos(Ke(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,s=this.y-e.y;return t*t+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let s=Math.cos(t),r=Math.sin(t),n=this.x-e.x,a=this.y-e.y;return this.x=n*s-a*r+e.x,this.y=n*r+a*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},dn=class{constructor(e=0,t=0,s=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=s,this._w=r}static slerpFlat(e,t,s,r,n,a,o){let l=s[r+0],c=s[r+1],h=s[r+2],d=s[r+3],u=n[a+0],f=n[a+1],y=n[a+2],x=n[a+3];if(d!==x||l!==u||c!==f||h!==y){let g=l*u+c*f+h*y+d*x;g<0&&(u=-u,f=-f,y=-y,x=-x,g=-g);let m=1-o;if(g<.9995){let M=Math.acos(g),P=Math.sin(M);m=Math.sin(m*M)/P,o=Math.sin(o*M)/P,l=l*m+u*o,c=c*m+f*o,h=h*m+y*o,d=d*m+x*o}else{l=l*m+u*o,c=c*m+f*o,h=h*m+y*o,d=d*m+x*o;let M=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=M,c*=M,h*=M,d*=M}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,s,r,n,a){let o=s[r],l=s[r+1],c=s[r+2],h=s[r+3],d=n[a],u=n[a+1],f=n[a+2],y=n[a+3];return e[t]=o*y+h*d+l*f-c*u,e[t+1]=l*y+h*u+c*d-o*f,e[t+2]=c*y+h*f+o*u-l*d,e[t+3]=h*y-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,s,r){return this._x=e,this._y=t,this._z=s,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let s=e._x,r=e._y,n=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(s/2),h=o(r/2),d=o(n/2),u=l(s/2),f=l(r/2),y=l(n/2);switch(a){case"XYZ":this._x=u*h*d+c*f*y,this._y=c*f*d-u*h*y,this._z=c*h*y+u*f*d,this._w=c*h*d-u*f*y;break;case"YXZ":this._x=u*h*d+c*f*y,this._y=c*f*d-u*h*y,this._z=c*h*y-u*f*d,this._w=c*h*d+u*f*y;break;case"ZXY":this._x=u*h*d-c*f*y,this._y=c*f*d+u*h*y,this._z=c*h*y+u*f*d,this._w=c*h*d-u*f*y;break;case"ZYX":this._x=u*h*d-c*f*y,this._y=c*f*d+u*h*y,this._z=c*h*y-u*f*d,this._w=c*h*d+u*f*y;break;case"YZX":this._x=u*h*d+c*f*y,this._y=c*f*d+u*h*y,this._z=c*h*y-u*f*d,this._w=c*h*d-u*f*y;break;case"XZY":this._x=u*h*d-c*f*y,this._y=c*f*d-u*h*y,this._z=c*h*y+u*f*d,this._w=c*h*d+u*f*y;break;default:He("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let s=t/2,r=Math.sin(s);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,s=t[0],r=t[4],n=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=s+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(n-c)*f,this._z=(a-r)*f}else if(s>o&&s>d){let f=2*Math.sqrt(1+s-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(n+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-s-d);this._w=(n-c)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-s-o);this._w=(a-r)/f,this._x=(n+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let s=e.dot(t)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){let s=this.angleTo(e);if(s===0)return this;let r=Math.min(1,t/s);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let s=e._x,r=e._y,n=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=s*h+a*o+r*c-n*l,this._y=r*h+a*l+n*o-s*c,this._z=n*h+a*c+s*l-r*o,this._w=a*h-s*o-r*l-n*c,this._onChangeCallback(),this}slerp(e,t){let s=e._x,r=e._y,n=e._z,a=e._w,o=this.dot(e);o<0&&(s=-s,r=-r,n=-n,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+s*t,this._y=this._y*l+r*t,this._z=this._z*l+n*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+s*t,this._y=this._y*l+r*t,this._z=this._z*l+n*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,s){return this.copy(e).slerp(t,s)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),s=Math.random(),r=Math.sqrt(1-s),n=Math.sqrt(s);return this.set(r*Math.sin(e),r*Math.cos(e),n*Math.sin(t),n*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},C=class i{static{i.prototype.isVector3=!0}constructor(e=0,t=0,s=0){this.x=e,this.y=t,this.z=s}set(e,t,s){return s===void 0&&(s=this.z),this.x=e,this.y=t,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(su.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(su.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,s=this.y,r=this.z,n=e.elements;return this.x=n[0]*t+n[3]*s+n[6]*r,this.y=n[1]*t+n[4]*s+n[7]*r,this.z=n[2]*t+n[5]*s+n[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,s=this.y,r=this.z,n=e.elements,a=1/(n[3]*t+n[7]*s+n[11]*r+n[15]);return this.x=(n[0]*t+n[4]*s+n[8]*r+n[12])*a,this.y=(n[1]*t+n[5]*s+n[9]*r+n[13])*a,this.z=(n[2]*t+n[6]*s+n[10]*r+n[14])*a,this}applyQuaternion(e){let t=this.x,s=this.y,r=this.z,n=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*s),h=2*(o*t-n*r),d=2*(n*s-a*t);return this.x=t+l*c+a*d-o*h,this.y=s+l*h+o*c-n*d,this.z=r+l*d+n*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,s=this.y,r=this.z,n=e.elements;return this.x=n[0]*t+n[4]*s+n[8]*r,this.y=n[1]*t+n[5]*s+n[9]*r,this.z=n[2]*t+n[6]*s+n[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){let s=this.length();return this.divideScalar(s||1).multiplyScalar(Ke(s,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let s=e.x,r=e.y,n=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-n*o,this.y=n*a-s*l,this.z=s*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let s=e.dot(this)/t;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return fc.copy(this).projectOnVector(e),this.sub(fc)}reflect(e){return this.sub(fc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let s=this.dot(e)/t;return Math.acos(Ke(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,s=this.y-e.y,r=this.z-e.z;return t*t+s*s+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,s){let r=Math.sin(t)*e;return this.x=r*Math.sin(s),this.y=Math.cos(t)*e,this.z=r*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,s){return this.x=e*Math.sin(t),this.y=s,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=s,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,s=Math.sqrt(1-t*t);return this.x=s*Math.cos(e),this.y=t,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},fc=new C,su=new dn,Ze=class i{static{i.prototype.isMatrix3=!0}constructor(e,t,s,r,n,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,s,r,n,a,o,l,c)}set(e,t,s,r,n,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=n,h[5]=l,h[6]=s,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,s=e.elements;return t[0]=s[0],t[1]=s[1],t[2]=s[2],t[3]=s[3],t[4]=s[4],t[5]=s[5],t[6]=s[6],t[7]=s[7],t[8]=s[8],this}extractBasis(e,t,s){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let s=e.elements,r=t.elements,n=this.elements,a=s[0],o=s[3],l=s[6],c=s[1],h=s[4],d=s[7],u=s[2],f=s[5],y=s[8],x=r[0],g=r[3],m=r[6],M=r[1],P=r[4],v=r[7],T=r[2],w=r[5],L=r[8];return n[0]=a*x+o*M+l*T,n[3]=a*g+o*P+l*w,n[6]=a*m+o*v+l*L,n[1]=c*x+h*M+d*T,n[4]=c*g+h*P+d*w,n[7]=c*m+h*v+d*L,n[2]=u*x+f*M+y*T,n[5]=u*g+f*P+y*w,n[8]=u*m+f*v+y*L,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],s=e[1],r=e[2],n=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-s*n*h+s*o*l+r*n*c-r*a*l}invert(){let e=this.elements,t=e[0],s=e[1],r=e[2],n=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*n,f=c*n-a*l,y=t*d+s*u+r*f;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/y;return e[0]=d*x,e[1]=(r*c-h*s)*x,e[2]=(o*s-r*a)*x,e[3]=u*x,e[4]=(h*t-r*l)*x,e[5]=(r*n-o*t)*x,e[6]=f*x,e[7]=(s*l-c*t)*x,e[8]=(a*t-s*n)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,s,r,n,a,o){let l=Math.cos(n),c=Math.sin(n);return this.set(s*l,s*c,-s*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Yi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(pc.makeScale(e,t)),this}rotate(e){return Yi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(pc.makeRotation(-e)),this}translate(e,t){return Yi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(pc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,s,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,s=e.elements;for(let r=0;r<9;r++)if(t[r]!==s[r])return!1;return!0}fromArray(e,t=0){for(let s=0;s<9;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){let s=this.elements;return e[t]=s[0],e[t+1]=s[1],e[t+2]=s[2],e[t+3]=s[3],e[t+4]=s[4],e[t+5]=s[5],e[t+6]=s[6],e[t+7]=s[7],e[t+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}},pc=new Ze,ru=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ou=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Yf(){let i={enabled:!0,workingColorSpace:Er,spaces:{},convert:function(r,n,a){return this.enabled===!1||n===a||!n||!a||(this.spaces[n].transfer===dt&&(r.r=ri(r.r),r.g=ri(r.g),r.b=ri(r.b)),this.spaces[n].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[n].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===dt&&(r.r=Cs(r.r),r.g=Cs(r.g),r.b=Cs(r.b))),r},workingToColorSpace:function(r,n){return this.convert(r,this.workingColorSpace,n)},colorSpaceToWorking:function(r,n){return this.convert(r,n,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ai?Tr:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,n=this.workingColorSpace){return r.fromArray(this.spaces[n].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,n,a){return r.copy(this.spaces[n].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,n){return Yi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,n)},toWorkingColorSpace:function(r,n){return Yi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,n)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],s=[.3127,.329];return i.define({[Er]:{primaries:e,whitePoint:s,transfer:Tr,toXYZ:ru,fromXYZ:ou,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:qt},outputColorSpaceConfig:{drawingBufferColorSpace:qt}},[qt]:{primaries:e,whitePoint:s,transfer:dt,toXYZ:ru,fromXYZ:ou,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:qt}}}),i}var ot=Yf();function ri(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Cs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ds,ba=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{ds===void 0&&(ds=Ar("canvas")),ds.width=e.width,ds.height=e.height;let r=ds.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),s=ds}return s.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ar("canvas");t.width=e.width,t.height=e.height;let s=t.getContext("2d");s.drawImage(e,0,0,e.width,e.height);let r=s.getImageData(0,0,e.width,e.height),n=r.data;for(let a=0;a<n.length;a++)n[a]=ri(n[a]/255)*255;return s.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let s=0;s<t.length;s++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[s]=Math.floor(ri(t[s]/255)*255):t[s]=ri(t[s]);return{data:t,width:e.width,height:e.height}}else return He("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Zf=0,Us=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Zf++}),this.uuid=si(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let s={uuid:this.uuid,url:""},r=this.data;if(r!==null){let n;if(Array.isArray(r)){n=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?n.push(mc(r[a].image)):n.push(mc(r[a]))}else n=mc(r);s.url=n}return t||(e.images[this.uuid]=s),s}};function mc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ba.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(He("Texture: Unable to serialize Texture."),{})}var jf=0,gc=new C,Zt=class i extends In{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,s=Xn,r=Xn,n=zt,a=Ci,o=wn,l=nn,c=i.DEFAULT_ANISOTROPY,h=ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=si(),this.name="",this.source=new Us(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=s,this.wrapT=r,this.magFilter=n,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Me(0,0),this.repeat=new Me(1,1),this.center=new Me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(gc).x}get height(){return this.source.getSize(gc).y}get depth(){return this.source.getSize(gc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let s=e[t];if(s===void 0){He(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){He(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&s&&r.isVector2&&s.isVector2||r&&s&&r.isVector3&&s.isVector3||r&&s&&r.isMatrix3&&s.isMatrix3?r.copy(s):this[t]=s}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),t||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==lh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case va:e.x=e.x-Math.floor(e.x);break;case Xn:e.x=e.x<0?0:1;break;case Sa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case va:e.y=e.y-Math.floor(e.y);break;case Xn:e.y=e.y<0?0:1;break;case Sa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Zt.DEFAULT_IMAGE=null;Zt.DEFAULT_MAPPING=lh;Zt.DEFAULT_ANISOTROPY=1;var Et=class i{static{i.prototype.isVector4=!0}constructor(e=0,t=0,s=0,r=1){this.x=e,this.y=t,this.z=s,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,s,r){return this.x=e,this.y=t,this.z=s,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,s=this.y,r=this.z,n=this.w,a=e.elements;return this.x=a[0]*t+a[4]*s+a[8]*r+a[12]*n,this.y=a[1]*t+a[5]*s+a[9]*r+a[13]*n,this.z=a[2]*t+a[6]*s+a[10]*r+a[14]*n,this.w=a[3]*t+a[7]*s+a[11]*r+a[15]*n,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,s,r,n,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],y=l[9],x=l[2],g=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(y-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(y+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let P=(c+1)/2,v=(f+1)/2,T=(m+1)/2,w=(h+u)/4,L=(d+x)/4,p=(y+g)/4;return P>v&&P>T?P<.01?(s=0,r=.707106781,n=.707106781):(s=Math.sqrt(P),r=w/s,n=L/s):v>T?v<.01?(s=.707106781,r=0,n=.707106781):(r=Math.sqrt(v),s=w/r,n=p/r):T<.01?(s=.707106781,r=.707106781,n=0):(n=Math.sqrt(T),s=L/n,r=p/n),this.set(s,r,n,t),this}let M=Math.sqrt((g-y)*(g-y)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(g-y)/M,this.y=(d-x)/M,this.z=(u-h)/M,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){let s=this.length();return this.divideScalar(s||1).multiplyScalar(Ke(s,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this.w=e.w+(t.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},wa=class extends In{constructor(e=1,t=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},s),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=s.depth,this.scissor=new Et(0,0,e,t),this.scissorTest=!1,this.viewport=new Et(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:s.depth},n=new Zt(r),a=s.count;for(let o=0;o<a;o++)this.textures[o]=n.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveColorBuffer=s.resolveColorBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.storeMultisampledColorBuffer=s.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=s.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=s.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview,this.useArrayDepthTexture=s.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:zt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,s=1){if(this.width!==e||this.height!==t||this.depth!==s){this.width=e,this.height=t,this.depth=s;for(let r=0,n=this.textures.length;r<n;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=s,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,s=e.textures.length;t<s;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Us(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},tn=class extends wa{constructor(e=1,t=1,s={}){super(e,t,s),this.isWebGLRenderTarget=!0}},Pr=class extends Zt{constructor(e=null,t=1,s=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:s,depth:r},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ea=class extends Zt{constructor(e=null,t=1,s=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:s,depth:r},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var vt=class i{static{i.prototype.isMatrix4=!0}constructor(e,t,s,r,n,a,o,l,c,h,d,u,f,y,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,s,r,n,a,o,l,c,h,d,u,f,y,x,g)}set(e,t,s,r,n,a,o,l,c,h,d,u,f,y,x,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=s,m[12]=r,m[1]=n,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=y,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,s=e.elements;return t[0]=s[0],t[1]=s[1],t[2]=s[2],t[3]=s[3],t[4]=s[4],t[5]=s[5],t[6]=s[6],t[7]=s[7],t[8]=s[8],t[9]=s[9],t[10]=s[10],t[11]=s[11],t[12]=s[12],t[13]=s[13],t[14]=s[14],t[15]=s[15],this}copyPosition(e){let t=this.elements,s=e.elements;return t[12]=s[12],t[13]=s[13],t[14]=s[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,s){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),s.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(e,t,s){return this.set(e.x,t.x,s.x,0,e.y,t.y,s.y,0,e.z,t.z,s.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,s=e.elements,r=1/fs.setFromMatrixColumn(e,0).length(),n=1/fs.setFromMatrixColumn(e,1).length(),a=1/fs.setFromMatrixColumn(e,2).length();return t[0]=s[0]*r,t[1]=s[1]*r,t[2]=s[2]*r,t[3]=0,t[4]=s[4]*n,t[5]=s[5]*n,t[6]=s[6]*n,t[7]=0,t[8]=s[8]*a,t[9]=s[9]*a,t[10]=s[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,s=e.x,r=e.y,n=e.z,a=Math.cos(s),o=Math.sin(s),l=Math.cos(r),c=Math.sin(r),h=Math.cos(n),d=Math.sin(n);if(e.order==="XYZ"){let u=a*h,f=a*d,y=o*h,x=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+y*c,t[5]=u-x*c,t[9]=-o*l,t[2]=x-u*c,t[6]=y+f*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*h,f=l*d,y=c*h,x=c*d;t[0]=u+x*o,t[4]=y*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-y,t[6]=x+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*h,f=l*d,y=c*h,x=c*d;t[0]=u-x*o,t[4]=-a*d,t[8]=y+f*o,t[1]=f+y*o,t[5]=a*h,t[9]=x-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*h,f=a*d,y=o*h,x=o*d;t[0]=l*h,t[4]=y*c-f,t[8]=u*c+x,t[1]=l*d,t[5]=x*c+u,t[9]=f*c-y,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,f=a*c,y=o*l,x=o*c;t[0]=l*h,t[4]=x-u*d,t[8]=y*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+y,t[10]=u-x*d}else if(e.order==="XZY"){let u=a*l,f=a*c,y=o*l,x=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+x,t[5]=a*h,t[9]=f*d-y,t[2]=y*d-f,t[6]=o*h,t[10]=x*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Jf,e,Kf)}lookAt(e,t,s){let r=this.elements;return an.subVectors(e,t),an.lengthSq()===0&&(an.z=1),an.normalize(),pi.crossVectors(s,an),pi.lengthSq()===0&&(Math.abs(s.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),pi.crossVectors(s,an)),pi.normalize(),Bo.crossVectors(an,pi),r[0]=pi.x,r[4]=Bo.x,r[8]=an.x,r[1]=pi.y,r[5]=Bo.y,r[9]=an.y,r[2]=pi.z,r[6]=Bo.z,r[10]=an.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let s=e.elements,r=t.elements,n=this.elements,a=s[0],o=s[4],l=s[8],c=s[12],h=s[1],d=s[5],u=s[9],f=s[13],y=s[2],x=s[6],g=s[10],m=s[14],M=s[3],P=s[7],v=s[11],T=s[15],w=r[0],L=r[4],p=r[8],b=r[12],I=r[1],N=r[5],O=r[9],H=r[13],F=r[2],W=r[6],j=r[10],Y=r[14],le=r[3],K=r[7],ne=r[11],oe=r[15];return n[0]=a*w+o*I+l*F+c*le,n[4]=a*L+o*N+l*W+c*K,n[8]=a*p+o*O+l*j+c*ne,n[12]=a*b+o*H+l*Y+c*oe,n[1]=h*w+d*I+u*F+f*le,n[5]=h*L+d*N+u*W+f*K,n[9]=h*p+d*O+u*j+f*ne,n[13]=h*b+d*H+u*Y+f*oe,n[2]=y*w+x*I+g*F+m*le,n[6]=y*L+x*N+g*W+m*K,n[10]=y*p+x*O+g*j+m*ne,n[14]=y*b+x*H+g*Y+m*oe,n[3]=M*w+P*I+v*F+T*le,n[7]=M*L+P*N+v*W+T*K,n[11]=M*p+P*O+v*j+T*ne,n[15]=M*b+P*H+v*Y+T*oe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],s=e[4],r=e[8],n=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],y=e[3],x=e[7],g=e[11],m=e[15],M=l*f-c*u,P=o*f-c*d,v=o*u-l*d,T=a*f-c*h,w=a*u-l*h,L=a*d-o*h;return t*(x*M-g*P+m*v)-s*(y*M-g*T+m*w)+r*(y*P-x*T+m*L)-n*(y*v-x*w+g*L)}determinantAffine(){let e=this.elements,t=e[0],s=e[4],r=e[8],n=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-s*(n*h-o*l)+r*(n*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,s){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=s),this}invert(){let e=this.elements,t=e[0],s=e[1],r=e[2],n=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],y=e[12],x=e[13],g=e[14],m=e[15],M=t*o-s*a,P=t*l-r*a,v=t*c-n*a,T=s*l-r*o,w=s*c-n*o,L=r*c-n*l,p=h*x-d*y,b=h*g-u*y,I=h*m-f*y,N=d*g-u*x,O=d*m-f*x,H=u*m-f*g,F=M*H-P*O+v*N+T*I-w*b+L*p;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let W=1/F;return e[0]=(o*H-l*O+c*N)*W,e[1]=(r*O-s*H-n*N)*W,e[2]=(x*L-g*w+m*T)*W,e[3]=(u*w-d*L-f*T)*W,e[4]=(l*I-a*H-c*b)*W,e[5]=(t*H-r*I+n*b)*W,e[6]=(g*v-y*L-m*P)*W,e[7]=(h*L-u*v+f*P)*W,e[8]=(a*O-o*I+c*p)*W,e[9]=(s*I-t*O-n*p)*W,e[10]=(y*w-x*v+m*M)*W,e[11]=(d*v-h*w-f*M)*W,e[12]=(o*b-a*N-l*p)*W,e[13]=(t*N-s*b+r*p)*W,e[14]=(x*P-y*T-g*M)*W,e[15]=(h*T-d*P+u*M)*W,this}scale(e){let t=this.elements,s=e.x,r=e.y,n=e.z;return t[0]*=s,t[4]*=r,t[8]*=n,t[1]*=s,t[5]*=r,t[9]*=n,t[2]*=s,t[6]*=r,t[10]*=n,t[3]*=s,t[7]*=r,t[11]*=n,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,s,r))}makeTranslation(e,t,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,s,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,t,-s,0,0,s,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),s=Math.sin(e);return this.set(t,0,s,0,0,1,0,0,-s,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,0,s,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let s=Math.cos(t),r=Math.sin(t),n=1-s,a=e.x,o=e.y,l=e.z,c=n*a,h=n*o;return this.set(c*a+s,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+s,h*l-r*a,0,c*l-r*o,h*l+r*a,n*l*l+s,0,0,0,0,1),this}makeScale(e,t,s){return this.set(e,0,0,0,0,t,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,t,s,r,n,a){return this.set(1,s,n,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,s){let r=this.elements,n=t._x,a=t._y,o=t._z,l=t._w,c=n+n,h=a+a,d=o+o,u=n*c,f=n*h,y=n*d,x=a*h,g=a*d,m=o*d,M=l*c,P=l*h,v=l*d,T=s.x,w=s.y,L=s.z;return r[0]=(1-(x+m))*T,r[1]=(f+v)*T,r[2]=(y-P)*T,r[3]=0,r[4]=(f-v)*w,r[5]=(1-(u+m))*w,r[6]=(g+M)*w,r[7]=0,r[8]=(y+P)*L,r[9]=(g-M)*L,r[10]=(1-(u+x))*L,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,s){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let n=this.determinantAffine();if(n===0)return s.set(1,1,1),t.identity(),this;let a=fs.set(r[0],r[1],r[2]).length(),o=fs.set(r[4],r[5],r[6]).length(),l=fs.set(r[8],r[9],r[10]).length();n<0&&(a=-a),Tn.copy(this);let c=1/a,h=1/o,d=1/l;return Tn.elements[0]*=c,Tn.elements[1]*=c,Tn.elements[2]*=c,Tn.elements[4]*=h,Tn.elements[5]*=h,Tn.elements[6]*=h,Tn.elements[8]*=d,Tn.elements[9]*=d,Tn.elements[10]*=d,t.setFromRotationMatrix(Tn),s.x=a,s.y=o,s.z=l,this}makePerspective(e,t,s,r,n,a,o=Cn,l=!1){let c=this.elements,h=2*n/(t-e),d=2*n/(s-r),u=(t+e)/(t-e),f=(s+r)/(s-r),y,x;if(l)y=n/(a-n),x=a*n/(a-n);else if(o===Cn)y=-(a+n)/(a-n),x=-2*a*n/(a-n);else if(o===Ds)y=-a/(a-n),x=-a*n/(a-n);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=y,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,s,r,n,a,o=Cn,l=!1){let c=this.elements,h=2/(t-e),d=2/(s-r),u=-(t+e)/(t-e),f=-(s+r)/(s-r),y,x;if(l)y=1/(a-n),x=a/(a-n);else if(o===Cn)y=-2/(a-n),x=-(a+n)/(a-n);else if(o===Ds)y=-1/(a-n),x=-n/(a-n);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=y,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,s=e.elements;for(let r=0;r<16;r++)if(t[r]!==s[r])return!1;return!0}fromArray(e,t=0){for(let s=0;s<16;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){let s=this.elements;return e[t]=s[0],e[t+1]=s[1],e[t+2]=s[2],e[t+3]=s[3],e[t+4]=s[4],e[t+5]=s[5],e[t+6]=s[6],e[t+7]=s[7],e[t+8]=s[8],e[t+9]=s[9],e[t+10]=s[10],e[t+11]=s[11],e[t+12]=s[12],e[t+13]=s[13],e[t+14]=s[14],e[t+15]=s[15],e}},fs=new C,Tn=new vt,Jf=new C(0,0,0),Kf=new C(1,1,1),pi=new C,Bo=new C,an=new C,au=new vt,lu=new dn,oi=class i{constructor(e=0,t=0,s=0,r=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=s,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,s,r=this._order){return this._x=e,this._y=t,this._z=s,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,s=!0){let r=e.elements,n=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],d=r[2],u=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,n)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,n),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,n));break;case"ZYX":this._y=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,n)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,n)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,n)):(this._x=Math.atan2(-h,f),this._y=0);break;default:He("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,s){return au.makeRotationFromQuaternion(e),this.setFromRotationMatrix(au,t,s)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return lu.setFromEuler(this),this.setFromQuaternion(lu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};oi.DEFAULT_ORDER="XYZ";var Os=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Qf=0,cu=new C,ps=new dn,Qn=new vt,ko=new C,fr=new C,ep=new C,tp=new dn,hu=new C(1,0,0),uu=new C(0,1,0),du=new C(0,0,1),fu={type:"added"},np={type:"removed"},ms={type:"childadded",child:null},yc={type:"childremoved",child:null},kt=class i extends In{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qf++}),this.uuid=si(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new C,t=new oi,s=new dn,r=new C(1,1,1);function n(){s.setFromEuler(t,!1)}function a(){t.setFromQuaternion(s,void 0,!1)}t._onChange(n),s._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new vt},normalMatrix:{value:new Ze}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Os,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ps.setFromAxisAngle(e,t),this.quaternion.multiply(ps),this}rotateOnWorldAxis(e,t){return ps.setFromAxisAngle(e,t),this.quaternion.premultiply(ps),this}rotateX(e){return this.rotateOnAxis(hu,e)}rotateY(e){return this.rotateOnAxis(uu,e)}rotateZ(e){return this.rotateOnAxis(du,e)}translateOnAxis(e,t){return cu.copy(e).applyQuaternion(this.quaternion),this.position.add(cu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(hu,e)}translateY(e){return this.translateOnAxis(uu,e)}translateZ(e){return this.translateOnAxis(du,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Qn.copy(this.matrixWorld).invert())}lookAt(e,t,s){e.isVector3?ko.copy(e):ko.set(e,t,s);let r=this.parent;this.updateWorldMatrix(!0,!1),fr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qn.lookAt(fr,ko,this.up):Qn.lookAt(ko,fr,this.up),this.quaternion.setFromRotationMatrix(Qn),r&&(Qn.extractRotation(r.matrixWorld),ps.setFromRotationMatrix(Qn),this.quaternion.premultiply(ps.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ge("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(fu),ms.child=e,this.dispatchEvent(ms),ms.child=null):Ge("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(np),yc.child=e,this.dispatchEvent(yc),yc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(fu),ms.child=e,this.dispatchEvent(ms),ms.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let s=0,r=this.children.length;s<r;s++){let a=this.children[s].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,s=[]){this[e]===t&&s.push(this);let r=this.children;for(let n=0,a=r.length;n<a;n++)r[n].getObjectsByProperty(e,t,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fr,e,ep),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fr,tp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let s=0,r=t.length;s<r;s++)t[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let s=0,r=t.length;s<r;s++)t[s].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,s=e.y,r=e.z,n=this.matrix.elements;n[12]+=t-n[0]*t-n[4]*s-n[8]*r,n[13]+=s-n[1]*t-n[5]*s-n[9]*r,n[14]+=r-n[2]*t-n[6]*s-n[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let s=0,r=t.length;s<r;s++)t[s].updateMatrixWorld(e)}updateWorldMatrix(e,t,s=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||s)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,s=!0),t===!0){let n=this.children;for(let a=0,o=n.length;a<o;a++)n[a].updateWorldMatrix(!1,!0,s)}}toJSON(e){let t=e===void 0||typeof e=="string",s={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function n(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=n(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];n(e.shapes,d)}else n(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(n(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(n(e.materials,this.material[l]));r.material=o}else r.material=n(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];r.animations.push(n(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),y=a(e.nodes);o.length>0&&(s.geometries=o),l.length>0&&(s.materials=l),c.length>0&&(s.textures=c),h.length>0&&(s.images=h),d.length>0&&(s.shapes=d),u.length>0&&(s.skeletons=u),f.length>0&&(s.animations=f),y.length>0&&(s.nodes=y)}return s.object=r,s;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let s=0;s<e.children.length;s++){let r=e.children[s];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};kt.DEFAULT_UP=new C(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var hn=class extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}},ip={type:"move"},Fs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let s of e.hand.values())this._getHandJoint(t,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,s){let r=null,n=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,s),m=this._getHandJoint(c,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,y=.005;c.inputState.pinching&&u>f+y?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-y&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(n=t.getPose(e.gripSpace,s),n!==null&&(l.matrix.fromArray(n.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,n.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(n.linearVelocity)):l.hasLinearVelocity=!1,n.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(n.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,s),r===null&&n!==null&&(r=n),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ip)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=n!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let s=new hn;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[t.jointName]=s,e.add(s)}return e.joints[t.jointName]}},_d={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mi={h:0,s:0,l:0},zo={h:0,s:0,l:0};function _c(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var je=class{constructor(e,t,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,s)}set(e,t,s){if(t===void 0&&s===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.colorSpaceToWorking(this,t),this}setRGB(e,t,s,r=ot.workingColorSpace){return this.r=e,this.g=t,this.b=s,ot.colorSpaceToWorking(this,r),this}setHSL(e,t,s,r=ot.workingColorSpace){if(e=_h(e,1),t=Ke(t,0,1),s=Ke(s,0,1),t===0)this.r=this.g=this.b=s;else{let n=s<=.5?s*(1+t):s+t-s*t,a=2*s-n;this.r=_c(a,n,e+1/3),this.g=_c(a,n,e),this.b=_c(a,n,e-1/3)}return ot.colorSpaceToWorking(this,r),this}setStyle(e,t=qt){function s(n){n!==void 0&&parseFloat(n)<1&&He("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let n,a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(n=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return s(n[4]),this.setRGB(Math.min(255,parseInt(n[1],10))/255,Math.min(255,parseInt(n[2],10))/255,Math.min(255,parseInt(n[3],10))/255,t);if(n=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return s(n[4]),this.setRGB(Math.min(100,parseInt(n[1],10))/100,Math.min(100,parseInt(n[2],10))/100,Math.min(100,parseInt(n[3],10))/100,t);break;case"hsl":case"hsla":if(n=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return s(n[4]),this.setHSL(parseFloat(n[1])/360,parseFloat(n[2])/100,parseFloat(n[3])/100,t);break;default:He("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],a=n.length;if(a===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(n,16),t);He("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){let s=_d[e.toLowerCase()];return s!==void 0?this.setHex(s,t):He("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ri(e.r),this.g=ri(e.g),this.b=ri(e.b),this}copyLinearToSRGB(e){return this.r=Cs(e.r),this.g=Cs(e.g),this.b=Cs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return ot.workingToColorSpace(Wt.copy(this),e),Math.round(Ke(Wt.r*255,0,255))*65536+Math.round(Ke(Wt.g*255,0,255))*256+Math.round(Ke(Wt.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.workingToColorSpace(Wt.copy(this),t);let s=Wt.r,r=Wt.g,n=Wt.b,a=Math.max(s,r,n),o=Math.min(s,r,n),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case s:l=(r-n)/d+(r<n?6:0);break;case r:l=(n-s)/d+2;break;case n:l=(s-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=ot.workingColorSpace){return ot.workingToColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=qt){ot.workingToColorSpace(Wt.copy(this),e);let t=Wt.r,s=Wt.g,r=Wt.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${s.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(s*255)},${Math.round(r*255)})`}offsetHSL(e,t,s){return this.getHSL(mi),this.setHSL(mi.h+e,mi.s+t,mi.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,s){return this.r=e.r+(t.r-e.r)*s,this.g=e.g+(t.g-e.g)*s,this.b=e.b+(t.b-e.b)*s,this}lerpHSL(e,t){this.getHSL(mi),e.getHSL(zo);let s=Sr(mi.h,zo.h,t),r=Sr(mi.s,zo.s,t),n=Sr(mi.l,zo.l,t);return this.setHSL(s,r,n),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,s=this.g,r=this.b,n=e.elements;return this.r=n[0]*t+n[3]*s+n[6]*r,this.g=n[1]*t+n[4]*s+n[7]*r,this.b=n[2]*t+n[5]*s+n[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Wt=new je;je.NAMES=_d;var Cr=class i{constructor(e,t=1,s=1e3){this.isFog=!0,this.name="",this.color=new je(e),this.near=t,this.far=s}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ir=class extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new oi,this.environmentIntensity=1,this.environmentRotation=new oi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},An=new C,ei=new C,xc=new C,ti=new C,gs=new C,ys=new C,pu=new C,vc=new C,Sc=new C,Mc=new C,bc=new Et,wc=new Et,Ec=new Et,qn=class i{constructor(e=new C,t=new C,s=new C){this.a=e,this.b=t,this.c=s}static getNormal(e,t,s,r){r.subVectors(s,t),An.subVectors(e,t),r.cross(An);let n=r.lengthSq();return n>0?r.multiplyScalar(1/Math.sqrt(n)):r.set(0,0,0)}static getBarycoord(e,t,s,r,n){An.subVectors(r,t),ei.subVectors(s,t),xc.subVectors(e,t);let a=An.dot(An),o=An.dot(ei),l=An.dot(xc),c=ei.dot(ei),h=ei.dot(xc),d=a*c-o*o;if(d===0)return n.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,y=(a*h-o*l)*u;return n.set(1-f-y,y,f)}static containsPoint(e,t,s,r){return this.getBarycoord(e,t,s,r,ti)===null?!1:ti.x>=0&&ti.y>=0&&ti.x+ti.y<=1}static getInterpolation(e,t,s,r,n,a,o,l){return this.getBarycoord(e,t,s,r,ti)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(n,ti.x),l.addScaledVector(a,ti.y),l.addScaledVector(o,ti.z),l)}static getInterpolatedAttribute(e,t,s,r,n,a){return bc.setScalar(0),wc.setScalar(0),Ec.setScalar(0),bc.fromBufferAttribute(e,t),wc.fromBufferAttribute(e,s),Ec.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(bc,n.x),a.addScaledVector(wc,n.y),a.addScaledVector(Ec,n.z),a}static isFrontFacing(e,t,s,r){return An.subVectors(s,t),ei.subVectors(e,t),An.cross(ei).dot(r)<0}set(e,t,s){return this.a.copy(e),this.b.copy(t),this.c.copy(s),this}setFromPointsAndIndices(e,t,s,r){return this.a.copy(e[t]),this.b.copy(e[s]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,s,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return An.subVectors(this.c,this.b),ei.subVectors(this.a,this.b),An.cross(ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,s,r,n){return i.getInterpolation(e,this.a,this.b,this.c,t,s,r,n)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let s=this.a,r=this.b,n=this.c,a,o;gs.subVectors(r,s),ys.subVectors(n,s),vc.subVectors(e,s);let l=gs.dot(vc),c=ys.dot(vc);if(l<=0&&c<=0)return t.copy(s);Sc.subVectors(e,r);let h=gs.dot(Sc),d=ys.dot(Sc);if(h>=0&&d<=h)return t.copy(r);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(s).addScaledVector(gs,a);Mc.subVectors(e,n);let f=gs.dot(Mc),y=ys.dot(Mc);if(y>=0&&f<=y)return t.copy(n);let x=f*c-l*y;if(x<=0&&c>=0&&y<=0)return o=c/(c-y),t.copy(s).addScaledVector(ys,o);let g=h*y-f*d;if(g<=0&&d-h>=0&&f-y>=0)return pu.subVectors(n,r),o=(d-h)/(d-h+(f-y)),t.copy(r).addScaledVector(pu,o);let m=1/(g+x+u);return a=x*m,o=u*m,t.copy(s).addScaledVector(gs,a).addScaledVector(ys,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Dn=class{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,s=e.length;t<s;t+=3)this.expandByPoint(Rn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,s=e.count;t<s;t++)this.expandByPoint(Rn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,s=e.length;t<s;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let s=Rn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let s=e.geometry;if(s!==void 0){let n=s.getAttribute("position");if(t===!0&&n!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=n.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Rn):Rn.fromBufferAttribute(n,a),Rn.applyMatrix4(e.matrixWorld),this.expandByPoint(Rn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Vo.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),Vo.copy(s.boundingBox)),Vo.applyMatrix4(e.matrixWorld),this.union(Vo)}let r=e.children;for(let n=0,a=r.length;n<a;n++)this.expandByObject(r[n],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Rn),Rn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,s;return e.normal.x>0?(t=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),t<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(pr),Ho.subVectors(this.max,pr),_s.subVectors(e.a,pr),xs.subVectors(e.b,pr),vs.subVectors(e.c,pr),gi.subVectors(xs,_s),yi.subVectors(vs,xs),Wi.subVectors(_s,vs);let t=[0,-gi.z,gi.y,0,-yi.z,yi.y,0,-Wi.z,Wi.y,gi.z,0,-gi.x,yi.z,0,-yi.x,Wi.z,0,-Wi.x,-gi.y,gi.x,0,-yi.y,yi.x,0,-Wi.y,Wi.x,0];return!Tc(t,_s,xs,vs,Ho)||(t=[1,0,0,0,1,0,0,0,1],!Tc(t,_s,xs,vs,Ho))?!1:(Go.crossVectors(gi,yi),t=[Go.x,Go.y,Go.z],Tc(t,_s,xs,vs,Ho))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Rn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Rn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ni),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ni=[new C,new C,new C,new C,new C,new C,new C,new C],Rn=new C,Vo=new Dn,_s=new C,xs=new C,vs=new C,gi=new C,yi=new C,Wi=new C,pr=new C,Ho=new C,Go=new C,qi=new C;function Tc(i,e,t,s,r){for(let n=0,a=i.length-3;n<=a;n+=3){qi.fromArray(i,n);let o=r.x*Math.abs(qi.x)+r.y*Math.abs(qi.y)+r.z*Math.abs(qi.z),l=e.dot(qi),c=t.dot(qi),h=s.dot(qi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Ct=new C,Wo=new Me,sp=0,un=class extends In{constructor(e,t,s=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:sp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=s,this.usage=gh,this.updateRanges=[],this.gpuType=On,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,s){e*=this.itemSize,s*=t.itemSize;for(let r=0,n=this.itemSize;r<n;r++)this.array[e+r]=t.array[s+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,s=this.count;t<s;t++)Wo.fromBufferAttribute(this,t),Wo.applyMatrix3(e),this.setXY(t,Wo.x,Wo.y);else if(this.itemSize===3)for(let t=0,s=this.count;t<s;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix3(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyMatrix4(e){for(let t=0,s=this.count;t<s;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix4(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let t=0,s=this.count;t<s;t++)Ct.fromBufferAttribute(this,t),Ct.applyNormalMatrix(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let t=0,s=this.count;t<s;t++)Ct.fromBufferAttribute(this,t),Ct.transformDirection(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let s=this.array[e*this.itemSize+t];return this.normalized&&(s=Pn(s,this.array)),s}setComponent(e,t,s){return this.normalized&&(s=pt(s,this.array)),this.array[e*this.itemSize+t]=s,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pn(t,this.array)),t}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pn(t,this.array)),t}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pn(t,this.array)),t}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,s){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),s=pt(s,this.array)),this.array[e+0]=t,this.array[e+1]=s,this}setXYZ(e,t,s,r){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),s=pt(s,this.array),r=pt(r,this.array)),this.array[e+0]=t,this.array[e+1]=s,this.array[e+2]=r,this}setXYZW(e,t,s,r,n){return e*=this.itemSize,this.normalized&&(t=pt(t,this.array),s=pt(s,this.array),r=pt(r,this.array),n=pt(n,this.array)),this.array[e+0]=t,this.array[e+1]=s,this.array[e+2]=r,this.array[e+3]=n,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Dr=class extends un{constructor(e,t,s){super(new Uint16Array(e),t,s)}};var Lr=class extends un{constructor(e,t,s){super(new Uint32Array(e),t,s)}};var lt=class extends un{constructor(e,t,s){super(new Float32Array(e),t,s)}},rp=new Dn,mr=new C,Ac=new C,Zi=class{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let s=this.center;t!==void 0?s.copy(t):rp.setFromPoints(e).getCenter(s);let r=0;for(let n=0,a=e.length;n<a;n++)r=Math.max(r,s.distanceToSquared(e[n]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let s=this.center.distanceToSquared(e);return t.copy(e),s>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;mr.subVectors(e,this.center);let t=mr.lengthSq();if(t>this.radius*this.radius){let s=Math.sqrt(t),r=(s-this.radius)*.5;this.center.addScaledVector(mr,r/s),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ac.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(mr.copy(e.center).add(Ac)),this.expandByPoint(mr.copy(e.center).sub(Ac))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},op=0,xn=new vt,Rc=new kt,Ss=new C,ln=new Dn,gr=new Dn,Ft=new C,It=class i extends In{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:op++}),this.uuid=si(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Cf(e)?Lr:Dr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,s=0){this.groups.push({start:e,count:t,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let s=this.attributes.normal;if(s!==void 0){let n=new Ze().getNormalMatrix(e);s.applyNormalMatrix(n),s.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return xn.makeRotationFromQuaternion(e),this.applyMatrix4(xn),this}rotateX(e){return xn.makeRotationX(e),this.applyMatrix4(xn),this}rotateY(e){return xn.makeRotationY(e),this.applyMatrix4(xn),this}rotateZ(e){return xn.makeRotationZ(e),this.applyMatrix4(xn),this}translate(e,t,s){return xn.makeTranslation(e,t,s),this.applyMatrix4(xn),this}scale(e,t,s){return xn.makeScale(e,t,s),this.applyMatrix4(xn),this}lookAt(e){return Rc.lookAt(e),Rc.updateMatrix(),this.applyMatrix4(Rc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ss).negate(),this.translate(Ss.x,Ss.y,Ss.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let s=[];for(let r=0,n=e.length;r<n;r++){let a=e[r];s.push(a.x,a.y,a.z||0)}this.setAttribute("position",new lt(s,3))}else{let s=Math.min(e.length,t.count);for(let r=0;r<s;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&He("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Dn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ge("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){let n=t[s];ln.setFromBufferAttribute(n),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,ln.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,ln.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(ln.min),this.boundingBox.expandByPoint(ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ge('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ge("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){let s=this.boundingSphere.center;if(ln.setFromBufferAttribute(e),t)for(let n=0,a=t.length;n<a;n++){let o=t[n];gr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ft.addVectors(ln.min,gr.min),ln.expandByPoint(Ft),Ft.addVectors(ln.max,gr.max),ln.expandByPoint(Ft)):(ln.expandByPoint(gr.min),ln.expandByPoint(gr.max))}ln.getCenter(s);let r=0;for(let n=0,a=e.count;n<a;n++)Ft.fromBufferAttribute(e,n),r=Math.max(r,s.distanceToSquared(Ft));if(t)for(let n=0,a=t.length;n<a;n++){let o=t[n],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ft.fromBufferAttribute(o,c),l&&(Ss.fromBufferAttribute(e,c),Ft.add(Ss)),r=Math.max(r,s.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ge('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ge("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let s=t.position,r=t.normal,n=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==s.count)&&(a=new un(new Float32Array(4*s.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let p=0;p<s.count;p++)o[p]=new C,l[p]=new C;let c=new C,h=new C,d=new C,u=new Me,f=new Me,y=new Me,x=new C,g=new C;function m(p,b,I){c.fromBufferAttribute(s,p),h.fromBufferAttribute(s,b),d.fromBufferAttribute(s,I),u.fromBufferAttribute(n,p),f.fromBufferAttribute(n,b),y.fromBufferAttribute(n,I),h.sub(c),d.sub(c),f.sub(u),y.sub(u);let N=1/(f.x*y.y-y.x*f.y);isFinite(N)&&(x.copy(h).multiplyScalar(y.y).addScaledVector(d,-f.y).multiplyScalar(N),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-y.x).multiplyScalar(N),o[p].add(x),o[b].add(x),o[I].add(x),l[p].add(g),l[b].add(g),l[I].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let p=0,b=M.length;p<b;++p){let I=M[p],N=I.start,O=I.count;for(let H=N,F=N+O;H<F;H+=3)m(e.getX(H+0),e.getX(H+1),e.getX(H+2))}let P=new C,v=new C,T=new C,w=new C;function L(p){T.fromBufferAttribute(r,p),w.copy(T);let b=o[p];P.copy(b),P.sub(T.multiplyScalar(T.dot(b))).normalize(),v.crossVectors(w,b);let N=v.dot(l[p])<0?-1:1;a.setXYZW(p,P.x,P.y,P.z,N)}for(let p=0,b=M.length;p<b;++p){let I=M[p],N=I.start,O=I.count;for(let H=N,F=N+O;H<F;H+=3)L(e.getX(H+0)),L(e.getX(H+1)),L(e.getX(H+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let s=this.getAttribute("normal");if(s===void 0||s.count!==t.count)s=new un(new Float32Array(t.count*3),3),this.setAttribute("normal",s);else for(let u=0,f=s.count;u<f;u++)s.setXYZ(u,0,0,0);let r=new C,n=new C,a=new C,o=new C,l=new C,c=new C,h=new C,d=new C;if(e)for(let u=0,f=e.count;u<f;u+=3){let y=e.getX(u+0),x=e.getX(u+1),g=e.getX(u+2);r.fromBufferAttribute(t,y),n.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),h.subVectors(a,n),d.subVectors(r,n),h.cross(d),o.fromBufferAttribute(s,y),l.fromBufferAttribute(s,x),c.fromBufferAttribute(s,g),o.add(h),l.add(h),c.add(h),s.setXYZ(y,o.x,o.y,o.z),s.setXYZ(x,l.x,l.y,l.z),s.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)r.fromBufferAttribute(t,u+0),n.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,n),d.subVectors(r,n),h.cross(d),s.setXYZ(u+0,h.x,h.y,h.z),s.setXYZ(u+1,h.x,h.y,h.z),s.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,s=e.count;t<s;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,y=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*h;for(let m=0;m<h;m++)u[y++]=c[f++]}return new un(u,h,d)}if(this.index===null)return He("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,s=this.index.array,r=this.attributes;for(let o in r){let l=r[o],c=e(l,s);t.setAttribute(o,c)}let n=this.morphAttributes;for(let o in n){let l=[],c=n[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=e(u,s);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let s=this.attributes;for(let l in s){let c=s[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},n=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(r[l]=h,n=!0)}n&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let s=e.index;s!==null&&this.setIndex(s.clone());let r=e.attributes;for(let c in r){let h=r[c];this.setAttribute(c,h.clone(t))}let n=e.morphAttributes;for(let c in n){let h=[],d=n[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ta=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=gh,this.updateRanges=[],this.version=0,this.uuid=si()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,s){e*=this.stride,s*=t.stride;for(let r=0,n=this.stride;r<n;r++)this.array[e+r]=t.array[s+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=si()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),s=new this.constructor(t,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=si()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Yt=new C,Nr=class i{constructor(e,t,s,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=s,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,s=this.data.count;t<s;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix4(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let t=0,s=this.count;t<s;t++)Yt.fromBufferAttribute(this,t),Yt.applyNormalMatrix(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let t=0,s=this.count;t<s;t++)Yt.fromBufferAttribute(this,t),Yt.transformDirection(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}getComponent(e,t){let s=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(s=Pn(s,this.array)),s}setComponent(e,t,s){return this.normalized&&(s=pt(s,this.array)),this.data.array[e*this.data.stride+this.offset+t]=s,this}setX(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=pt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Pn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Pn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Pn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Pn(t,this.array)),t}setXY(e,t,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),s=pt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=s,this}setXYZ(e,t,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),s=pt(s,this.array),r=pt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=s,this.data.array[e+2]=r,this}setXYZW(e,t,s,r,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=pt(t,this.array),s=pt(s,this.array),r=pt(r,this.array),n=pt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=s,this.data.array[e+2]=r,this.data.array[e+3]=n,this}clone(e){if(e===void 0){Rr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let s=0;s<this.count;s++){let r=s*this.data.stride+this.offset;for(let n=0;n<this.itemSize;n++)t.push(this.data.array[r+n])}return new un(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Rr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let s=0;s<this.count;s++){let r=s*this.data.stride+this.offset;for(let n=0;n<this.itemSize;n++)t.push(this.data.array[r+n])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Pc=new C,ap=new C,lp=new Ze,cn=class{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,s,r){return this.normal.set(e,t,s),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,s){let r=Pc.subVectors(s,t).cross(ap.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,s=!0){let r=e.delta(Pc),n=this.normal.dot(r);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/n;return s===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return t<0&&s>0||s<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let s=t||lp.getNormalMatrix(e),r=this.coplanarPoint(Pc).applyMatrix4(e),n=this.normal.applyMatrix3(s).normalize();return this.constant=-r.dot(n),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},cp=0,Yn=class extends In{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cp++}),this.uuid=si(),this.name="",this.type="Material",this.blending=Xs,this.side=Ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qc,this.blendDst=eh,this.blendEquation=ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=Is,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ad,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=da,this.stencilZFail=da,this.stencilZPass=da,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let s=e[t];if(s===void 0){He(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){He(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(s):r&&r.isVector2&&s&&s.isVector2||r&&r.isEuler&&s&&s.isEuler||r&&r.isVector3&&s&&s.isVector3?r.copy(s):this[t]=s}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,s.blending=this.blending,s.side=this.side,s.shadowSide=this.shadowSide,s.vertexColors=this.vertexColors,s.opacity=this.opacity,s.transparent=this.transparent,s.blendSrc=this.blendSrc,s.blendDst=this.blendDst,s.blendEquation=this.blendEquation,s.blendSrcAlpha=this.blendSrcAlpha,s.blendDstAlpha=this.blendDstAlpha,s.blendEquationAlpha=this.blendEquationAlpha,s.blendColor=this.blendColor.getHex(),s.blendAlpha=this.blendAlpha,s.depthFunc=this.depthFunc,s.depthTest=this.depthTest,s.depthWrite=this.depthWrite,s.colorWrite=this.colorWrite,s.clipIntersection=this.clipIntersection,s.clipShadows=this.clipShadows,s.stencilWriteMask=this.stencilWriteMask,s.stencilFunc=this.stencilFunc,s.stencilRef=this.stencilRef,s.stencilFuncMask=this.stencilFuncMask,s.stencilFail=this.stencilFail,s.stencilZFail=this.stencilZFail,s.stencilZPass=this.stencilZPass,s.stencilWrite=this.stencilWrite,s.polygonOffset=this.polygonOffset,s.polygonOffsetFactor=this.polygonOffsetFactor,s.polygonOffsetUnits=this.polygonOffsetUnits,s.dithering=this.dithering,s.alphaTest=this.alphaTest,s.alphaHash=this.alphaHash,s.alphaToCoverage=this.alphaToCoverage,s.premultipliedAlpha=this.premultipliedAlpha,s.forceSinglePass=this.forceSinglePass,s.allowOverride=this.allowOverride,s.visible=this.visible,s.toneMapped=this.toneMapped,s.name=this.name,this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(s.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(s.clippingPlanes=this.clippingPlanes.map(n=>n.toJSON())),this.rotation!==void 0&&(s.rotation=this.rotation),this.depthPacking!==void 0&&(s.depthPacking=this.depthPacking),this.linewidth!==void 0&&(s.linewidth=this.linewidth),this.linecap!==void 0&&(s.linecap=this.linecap),this.linejoin!==void 0&&(s.linejoin=this.linejoin),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.wireframe!==void 0&&(s.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(s.flatShading=this.flatShading),this.fog!==void 0&&(s.fog=this.fog),Object.keys(this.userData).length>0&&(s.userData=this.userData);function r(n){let a=[];for(let o in n){let l=n[o];delete l.metadata,a.push(l)}return a}if(t){let n=r(e.textures),a=r(e.images);n.length>0&&(s.textures=n),a.length>0&&(s.images=a)}return s}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new je().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(s=>new cn().fromJSON(s))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let s=e.normalScale;Array.isArray(s)===!1&&(s=[s,s]),this.normalScale=new Me().fromArray(s)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Me().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,s=null;if(t!==null){let r=t.length;s=new Array(r);for(let n=0;n!==r;++n)s[n]=t[n].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Bs=class extends Yn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new je(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ms,yr=new C,bs=new C,ws=new C,Es=new Me,_r=new Me,xd=new vt,qo=new C,xr=new C,Xo=new C,mu=new Me,Cc=new Me,gu=new Me,Ur=class extends kt{constructor(e=new Bs){if(super(),this.isSprite=!0,this.type="Sprite",Ms===void 0){Ms=new It;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),s=new Ta(t,5);Ms.setIndex([0,1,2,0,2,3]),Ms.setAttribute("position",new Nr(s,3,0,!1)),Ms.setAttribute("uv",new Nr(s,2,3,!1))}this.geometry=Ms,this.material=e,this.center=new Me(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Ge('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),bs.setFromMatrixScale(this.matrixWorld),xd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ws.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&bs.multiplyScalar(-ws.z);let s=this.material.rotation,r,n;s!==0&&(n=Math.cos(s),r=Math.sin(s));let a=this.center;$o(qo.set(-.5,-.5,0),ws,a,bs,r,n),$o(xr.set(.5,-.5,0),ws,a,bs,r,n),$o(Xo.set(.5,.5,0),ws,a,bs,r,n),mu.set(0,0),Cc.set(1,0),gu.set(1,1);let o=e.ray.intersectTriangle(qo,xr,Xo,!1,yr);if(o===null&&($o(xr.set(-.5,.5,0),ws,a,bs,r,n),Cc.set(0,1),o=e.ray.intersectTriangle(qo,Xo,xr,!1,yr),o===null))return;let l=e.ray.origin.distanceTo(yr);l<e.near||l>e.far||t.push({distance:l,point:yr.clone(),uv:qn.getInterpolation(yr,qo,xr,Xo,mu,Cc,gu,new Me),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function $o(i,e,t,s,r,n){Es.subVectors(i,t).addScalar(.5).multiply(s),r!==void 0?(_r.x=n*Es.x-r*Es.y,_r.y=r*Es.x+n*Es.y):_r.copy(Es),i.copy(e),i.x+=_r.x,i.y+=_r.y,i.applyMatrix4(xd)}var ii=new C,Ic=new C,Yo=new C,Zo=new C,xi=class{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ii)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let s=t.dot(this.direction);return s<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ii.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ii.copy(this.origin).addScaledVector(this.direction,t),ii.distanceToSquared(e))}distanceSqToSegment(e,t,s,r){Ic.copy(e).add(t).multiplyScalar(.5),Yo.copy(t).sub(e).normalize(),Zo.copy(this.origin).sub(Ic);let n=e.distanceTo(t)*.5,a=-this.direction.dot(Yo),o=Zo.dot(this.direction),l=-Zo.dot(Yo),c=Zo.lengthSq(),h=Math.abs(1-a*a),d,u,f,y;if(h>0)if(d=a*l-o,u=a*o-l,y=n*h,d>=0)if(u>=-y)if(u<=y){let x=1/h;d*=x,u*=x,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=n,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-n,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-y?(d=Math.max(0,-(-a*n+o)),u=d>0?-n:Math.min(Math.max(-n,-l),n),f=-d*d+u*(u+2*l)+c):u<=y?(d=0,u=Math.min(Math.max(-n,-l),n),f=u*(u+2*l)+c):(d=Math.max(0,-(a*n+o)),u=d>0?n:Math.min(Math.max(-n,-l),n),f=-d*d+u*(u+2*l)+c);else u=a>0?-n:n,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return s&&s.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Ic).addScaledVector(Yo,u),f}intersectSphere(e,t){if(e.radius<0)return null;ii.subVectors(e.center,this.origin);let s=ii.dot(this.direction),r=ii.dot(ii)-s*s,n=e.radius*e.radius;if(r>n)return null;let a=Math.sqrt(n-r),o=s-a,l=s+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let s=-(this.origin.dot(e.normal)+e.constant)/t;return s>=0?s:null}intersectPlane(e,t){let s=this.distanceToPlane(e);return s===null?null:this.at(s,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let s,r,n,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(s=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(s=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),h>=0?(n=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(n=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),s>a||n>r||((n>s||isNaN(s))&&(s=n),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),s>l||o>r)||((o>s||s!==s)&&(s=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(s>=0?s:r,t)}intersectsBox(e){return this.intersectBox(e,ii)!==null}intersectTriangle(e,t,s,r,n){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=e.x-a.x,u=e.y-a.y,f=e.z-a.z,y=t.x-a.x,x=t.y-a.y,g=t.z-a.z,m=s.x-a.x,M=s.y-a.y,P=s.z-a.z,v=Math.abs(l),T=Math.abs(c),w=Math.abs(h),L,p,b,I,N,O,H,F,W,j,Y,le;if(v>=T&&v>=w?(b=l,O=d,W=y,le=m,l>=0?(L=c,p=h,I=u,N=f,H=x,F=g,j=M,Y=P):(L=h,p=c,I=f,N=u,H=g,F=x,j=P,Y=M)):T>=w?(b=c,O=u,W=x,le=M,c>=0?(L=h,p=l,I=f,N=d,H=g,F=y,j=P,Y=m):(L=l,p=h,I=d,N=f,H=y,F=g,j=m,Y=P)):(b=h,O=f,W=g,le=P,h>=0?(L=l,p=c,I=d,N=u,H=y,F=x,j=m,Y=M):(L=c,p=l,I=u,N=d,H=x,F=y,j=M,Y=m)),b===0)return null;let K=L/b,ne=p/b,oe=1/b,Fe=I-K*O,Ae=N-ne*O,tt=H-K*W,ke=F-ne*W,at=j-K*le,Q=Y-ne*le,re=at*ke-Q*tt,Ce=Fe*Q-Ae*at,We=tt*Ae-ke*Fe;if(r){if(re<0||Ce<0||We<0)return null}else if((re<0||Ce<0||We<0)&&(re>0||Ce>0||We>0))return null;let Re=re+Ce+We;if(Re===0)return null;let qe=oe*(re*O+Ce*W+We*le);return(Re>0?qe<0:qe>0)?null:this.at(qe/Re,n)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},fn=class extends Yn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.combine=th,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},yu=new vt,Xi=new xi,jo=new Zi,_u=new C,Jo=new C,Ko=new C,Qo=new C,Dc=new C,ea=new C,xu=new C,ta=new C,jt=class extends kt{constructor(e=new It,t=new fn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,s=Object.keys(t);if(s.length>0){let r=t[s[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let n=0,a=r.length;n<a;n++){let o=r[n].name||String(n);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=n}}}}getVertexPosition(e,t){let s=this.geometry,r=s.attributes.position,n=s.morphAttributes.position,a=s.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(n&&o){ea.set(0,0,0);for(let l=0,c=n.length;l<c;l++){let h=o[l],d=n[l];h!==0&&(Dc.fromBufferAttribute(d,e),a?ea.addScaledVector(Dc,h):ea.addScaledVector(Dc.sub(t),h))}t.add(ea)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let s=this.geometry,r=this.material,n=this.matrixWorld;r!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),jo.copy(s.boundingSphere),jo.applyMatrix4(n),Xi.copy(e.ray).recast(e.near),!(jo.containsPoint(Xi.origin)===!1&&(Xi.intersectSphere(jo,_u)===null||Xi.origin.distanceToSquared(_u)>(e.far-e.near)**2))&&(yu.copy(n).invert(),Xi.copy(e.ray).applyMatrix4(yu),!(s.boundingBox!==null&&Xi.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,t,Xi)))}_computeIntersections(e,t,s){let r,n=this.geometry,a=this.material,o=n.index,l=n.attributes.position,c=n.attributes.uv,h=n.attributes.uv1,d=n.attributes.normal,u=n.groups,f=n.drawRange;if(o!==null)if(Array.isArray(a))for(let y=0,x=u.length;y<x;y++){let g=u[y],m=a[g.materialIndex],M=Math.max(g.start,f.start),P=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let v=M,T=P;v<T;v+=3){let w=o.getX(v),L=o.getX(v+1),p=o.getX(v+2);r=na(this,m,e,s,c,h,d,w,L,p),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let y=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let g=y,m=x;g<m;g+=3){let M=o.getX(g),P=o.getX(g+1),v=o.getX(g+2);r=na(this,a,e,s,c,h,d,M,P,v),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let y=0,x=u.length;y<x;y++){let g=u[y],m=a[g.materialIndex],M=Math.max(g.start,f.start),P=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let v=M,T=P;v<T;v+=3){let w=v,L=v+1,p=v+2;r=na(this,m,e,s,c,h,d,w,L,p),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{let y=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let g=y,m=x;g<m;g+=3){let M=g,P=g+1,v=g+2;r=na(this,a,e,s,c,h,d,M,P,v),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}};function hp(i,e,t,s,r,n,a,o){let l;if(e.side===Jt?l=s.intersectTriangle(a,n,r,!0,o):l=s.intersectTriangle(r,n,a,e.side===Ri,o),l===null)return null;ta.copy(o),ta.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(ta);return c<t.near||c>t.far?null:{distance:c,point:ta.clone(),object:i}}function na(i,e,t,s,r,n,a,o,l,c){i.getVertexPosition(o,Jo),i.getVertexPosition(l,Ko),i.getVertexPosition(c,Qo);let h=hp(i,e,t,s,Jo,Ko,Qo,xu);if(h){let d=new C;qn.getBarycoord(xu,Jo,Ko,Qo,d),r&&(h.uv=qn.getInterpolatedAttribute(r,o,l,c,d,new Me)),n&&(h.uv1=qn.getInterpolatedAttribute(n,o,l,c,d,new Me)),a&&(h.normal=qn.getInterpolatedAttribute(a,o,l,c,d,new C),h.normal.dot(s.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new C,materialIndex:0};qn.getNormal(Jo,Ko,Qo,u.normal),h.face=u,h.barycoord=d}return h}var Aa=class extends Zt{constructor(e=null,t=1,s=1,r,n,a,o,l,c=Bt,h=Bt,d,u){super(null,a,o,l,c,h,r,n,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var $i=new Zi,up=new Me(.5,.5),ia=new C,ks=class{constructor(e=new cn,t=new cn,s=new cn,r=new cn,n=new cn,a=new cn){this.planes=[e,t,s,r,n,a]}set(e,t,s,r,n,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(s),o[3].copy(r),o[4].copy(n),o[5].copy(a),this}copy(e){let t=this.planes;for(let s=0;s<6;s++)t[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,t=Cn,s=!1){let r=this.planes,n=e.elements,a=n[0],o=n[1],l=n[2],c=n[3],h=n[4],d=n[5],u=n[6],f=n[7],y=n[8],x=n[9],g=n[10],m=n[11],M=n[12],P=n[13],v=n[14],T=n[15];if(r[0].setComponents(c-a,f-h,m-y,T-M).normalize(),r[1].setComponents(c+a,f+h,m+y,T+M).normalize(),r[2].setComponents(c+o,f+d,m+x,T+P).normalize(),r[3].setComponents(c-o,f-d,m-x,T-P).normalize(),s)r[4].setComponents(l,u,g,v).normalize(),r[5].setComponents(c-l,f-u,m-g,T-v).normalize();else if(r[4].setComponents(c-l,f-u,m-g,T-v).normalize(),t===Cn)r[5].setComponents(c+l,f+u,m+g,T+v).normalize();else if(t===Ds)r[5].setComponents(l,u,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),$i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($i)}intersectsSprite(e){$i.center.set(0,0,0);let t=up.distanceTo(e.center);return $i.radius=.7071067811865476+t,$i.applyMatrix4(e.matrixWorld),this.intersectsSphere($i)}intersectsSphere(e){let t=this.planes,s=e.center,r=-e.radius;for(let n=0;n<6;n++)if(t[n].distanceToPoint(s)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let s=0;s<6;s++){let r=t[s];if(ia.x=r.normal.x>0?e.max.x:e.min.x,ia.y=r.normal.y>0?e.max.y:e.min.y,ia.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ia)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let s=0;s<6;s++)if(t[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var vi=class extends Yn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ra=new C,Pa=new C,vu=new vt,vr=new xi,sa=new Zi,Lc=new C,Su=new C,Ca=class extends kt{constructor(e=new It,t=new vi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,s=[0];for(let r=1,n=t.count;r<n;r++)Ra.fromBufferAttribute(t,r-1),Pa.fromBufferAttribute(t,r),s[r]=s[r-1],s[r]+=Ra.distanceTo(Pa);e.setAttribute("lineDistance",new lt(s,1))}else He("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let s=this.geometry,r=this.matrixWorld,n=e.params.Line.threshold,a=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),sa.copy(s.boundingSphere),sa.applyMatrix4(r),sa.radius+=n,e.ray.intersectsSphere(sa)===!1)return;vu.copy(r).invert(),vr.copy(e.ray).applyMatrix4(vu);let o=n/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=s.index,u=s.attributes.position;if(h!==null){let f=Math.max(0,a.start),y=Math.min(h.count,a.start+a.count);for(let x=f,g=y-1;x<g;x+=c){let m=h.getX(x),M=h.getX(x+1),P=ra(this,e,vr,l,m,M,x);P&&t.push(P)}if(this.isLineLoop){let x=h.getX(y-1),g=h.getX(f),m=ra(this,e,vr,l,x,g,y-1);m&&t.push(m)}}else{let f=Math.max(0,a.start),y=Math.min(u.count,a.start+a.count);for(let x=f,g=y-1;x<g;x+=c){let m=ra(this,e,vr,l,x,x+1,x);m&&t.push(m)}if(this.isLineLoop){let x=ra(this,e,vr,l,y-1,f,y-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,s=Object.keys(t);if(s.length>0){let r=t[s[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let n=0,a=r.length;n<a;n++){let o=r[n].name||String(n);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=n}}}}};function ra(i,e,t,s,r,n,a){let o=i.geometry.attributes.position;if(Ra.fromBufferAttribute(o,r),Pa.fromBufferAttribute(o,n),t.distanceSqToSegment(Ra,Pa,Lc,Su)>s)return;Lc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Lc);if(!(c<e.near||c>e.far))return{distance:c,point:Su.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Mu=new C,bu=new C,ji=class extends Ca{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,s=[];for(let r=0,n=t.count;r<n;r+=2)Mu.fromBufferAttribute(t,r),bu.fromBufferAttribute(t,r+1),s[r]=r===0?0:s[r-1],s[r+1]=s[r]+Mu.distanceTo(bu);e.setAttribute("lineDistance",new lt(s,1))}else He("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Or=class extends Zt{constructor(e=[],t=Pi,s,r,n,a,o,l,c,h){super(e,t,s,r,n,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Fr=class extends Zt{constructor(e,t,s,r,n,a,o,l,c){super(e,t,s,r,n,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Si=class extends Zt{constructor(e,t,s=Un,r,n,a,o=Bt,l=Bt,c,h=$n,d=1){if(h!==$n&&h!==Ii)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,r,n,a,o,l,h,s,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Us(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ia=class extends Si{constructor(e,t=Un,s=Pi,r,n,a=Bt,o=Bt,l,c=$n){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,s,r,n,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Br=class extends Zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Mi=class i extends It{constructor(e=1,t=1,s=1,r=1,n=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:s,widthSegments:r,heightSegments:n,depthSegments:a};let o=this;r=Math.floor(r),n=Math.floor(n),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;y("z","y","x",-1,-1,s,t,e,a,n,0),y("z","y","x",1,-1,s,t,-e,a,n,1),y("x","z","y",1,1,e,s,t,r,a,2),y("x","z","y",1,-1,e,s,-t,r,a,3),y("x","y","z",1,-1,e,t,s,r,n,4),y("x","y","z",-1,-1,e,t,-s,r,n,5),this.setIndex(l),this.setAttribute("position",new lt(c,3)),this.setAttribute("normal",new lt(h,3)),this.setAttribute("uv",new lt(d,2));function y(x,g,m,M,P,v,T,w,L,p,b){let I=v/L,N=T/p,O=v/2,H=T/2,F=w/2,W=L+1,j=p+1,Y=0,le=0,K=new C;for(let ne=0;ne<j;ne++){let oe=ne*N-H;for(let Fe=0;Fe<W;Fe++){let Ae=Fe*I-O;K[x]=Ae*M,K[g]=oe*P,K[m]=F,c.push(K.x,K.y,K.z),K[x]=0,K[g]=0,K[m]=w>0?1:-1,h.push(K.x,K.y,K.z),d.push(Fe/L),d.push(1-ne/p),Y+=1}}for(let ne=0;ne<p;ne++)for(let oe=0;oe<L;oe++){let Fe=u+oe+W*ne,Ae=u+oe+W*(ne+1),tt=u+(oe+1)+W*(ne+1),ke=u+(oe+1)+W*ne;l.push(Fe,Ae,ke),l.push(Ae,tt,ke),le+=6}o.addGroup(f,le,b),f+=le,u+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var vn=class i extends It{constructor(e=1,t=1,s=1,r=32,n=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:s,radialSegments:r,heightSegments:n,openEnded:a,thetaStart:o,thetaLength:l};let c=this;r=Math.floor(r),n=Math.floor(n);let h=[],d=[],u=[],f=[],y=0,x=[],g=s/2,m=0;M(),a===!1&&(e>0&&P(!0),t>0&&P(!1)),this.setIndex(h),this.setAttribute("position",new lt(d,3)),this.setAttribute("normal",new lt(u,3)),this.setAttribute("uv",new lt(f,2));function M(){let v=new C,T=new C,w=0,L=(t-e)/s;for(let p=0;p<=n;p++){let b=[],I=p/n,N=I*(t-e)+e;for(let O=0;O<=r;O++){let H=O/r,F=H*l+o,W=Math.sin(F),j=Math.cos(F);T.x=N*W,T.y=-I*s+g,T.z=N*j,d.push(T.x,T.y,T.z),v.set(W,L,j).normalize(),u.push(v.x,v.y,v.z),f.push(H,1-I),b.push(y++)}x.push(b)}for(let p=0;p<r;p++)for(let b=0;b<n;b++){let I=x[b][p],N=x[b+1][p],O=x[b+1][p+1],H=x[b][p+1];(e>0||b!==0)&&(h.push(I,N,H),w+=3),(t>0||b!==n-1)&&(h.push(N,O,H),w+=3)}c.addGroup(m,w,0),m+=w}function P(v){let T=y,w=new Me,L=new C,p=0,b=v===!0?e:t,I=v===!0?1:-1;for(let O=1;O<=r;O++)d.push(0,g*I,0),u.push(0,I,0),f.push(.5,.5),y++;let N=y;for(let O=0;O<=r;O++){let F=O/r*l+o,W=Math.cos(F),j=Math.sin(F);L.x=b*j,L.y=g*I,L.z=b*W,d.push(L.x,L.y,L.z),u.push(0,I,0),w.x=W*.5+.5,w.y=j*.5*I+.5,f.push(w.x,w.y),y++}for(let O=0;O<r;O++){let H=T+O,F=N+O;v===!0?h.push(F,F+1,H):h.push(F+1,F,H),p+=3}c.addGroup(m,p,v===!0?1:2),m+=p}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},bi=class i extends vn{constructor(e=1,t=1,s=32,r=1,n=!1,a=0,o=Math.PI*2){super(0,e,t,s,r,n,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:s,heightSegments:r,openEnded:n,thetaStart:a,thetaLength:o}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Da=class i extends It{constructor(e=[],t=[],s=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:s,detail:r};let n=[],a=[];o(r),c(s),h(),this.setAttribute("position",new lt(n,3)),this.setAttribute("normal",new lt(n.slice(),3)),this.setAttribute("uv",new lt(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(M){let P=new C,v=new C,T=new C;for(let w=0;w<t.length;w+=3)f(t[w+0],P),f(t[w+1],v),f(t[w+2],T),l(P,v,T,M)}function l(M,P,v,T){let w=T+1,L=[];for(let p=0;p<=w;p++){L[p]=[];let b=M.clone().lerp(v,p/w),I=P.clone().lerp(v,p/w),N=w-p;for(let O=0;O<=N;O++)O===0&&p===w?L[p][O]=b:L[p][O]=b.clone().lerp(I,O/N)}for(let p=0;p<w;p++)for(let b=0;b<2*(w-p)-1;b++){let I=Math.floor(b/2);b%2===0?(u(L[p][I+1]),u(L[p+1][I]),u(L[p][I])):(u(L[p][I+1]),u(L[p+1][I+1]),u(L[p+1][I]))}}function c(M){let P=new C;for(let v=0;v<n.length;v+=3)P.x=n[v+0],P.y=n[v+1],P.z=n[v+2],P.normalize().multiplyScalar(M),n[v+0]=P.x,n[v+1]=P.y,n[v+2]=P.z}function h(){let M=new C;for(let P=0;P<n.length;P+=3){M.x=n[P+0],M.y=n[P+1],M.z=n[P+2];let v=g(M)/2/Math.PI+.5,T=m(M)/Math.PI+.5;a.push(v,1-T)}y(),d()}function d(){for(let M=0;M<a.length;M+=6){let P=a[M+0],v=a[M+2],T=a[M+4],w=Math.max(P,v,T),L=Math.min(P,v,T);w>.9&&L<.1&&(P<.2&&(a[M+0]+=1),v<.2&&(a[M+2]+=1),T<.2&&(a[M+4]+=1))}}function u(M){n.push(M.x,M.y,M.z)}function f(M,P){let v=M*3;P.x=e[v+0],P.y=e[v+1],P.z=e[v+2]}function y(){let M=new C,P=new C,v=new C,T=new C,w=new Me,L=new Me,p=new Me;for(let b=0,I=0;b<n.length;b+=9,I+=6){M.set(n[b+0],n[b+1],n[b+2]),P.set(n[b+3],n[b+4],n[b+5]),v.set(n[b+6],n[b+7],n[b+8]),w.set(a[I+0],a[I+1]),L.set(a[I+2],a[I+3]),p.set(a[I+4],a[I+5]),T.copy(M).add(P).add(v).divideScalar(3);let N=g(T);x(w,I+0,M,N),x(L,I+2,P,N),x(p,I+4,v,N)}}function x(M,P,v,T){T<0&&M.x===1&&(a[P]=M.x-1),v.x===0&&v.z===0&&(a[P]=T/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.vertices,e.indices,e.radius,e.detail)}};var oa=new C,aa=new C,Nc=new C,la=new qn,kr=class extends It{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),n=Math.cos(Ps*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let y=0;y<l;y+=3){a?(c[0]=a.getX(y),c[1]=a.getX(y+1),c[2]=a.getX(y+2)):(c[0]=y,c[1]=y+1,c[2]=y+2);let{a:x,b:g,c:m}=la;if(x.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),m.fromBufferAttribute(o,c[2]),la.getNormal(Nc),d[0]=`${Math.round(x.x*r)},${Math.round(x.y*r)},${Math.round(x.z*r)}`,d[1]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,d[2]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let M=0;M<3;M++){let P=(M+1)%3,v=d[M],T=d[P],w=la[h[M]],L=la[h[P]],p=`${v}_${T}`,b=`${T}_${v}`;b in u&&u[b]?(Nc.dot(u[b].normal)<=n&&(f.push(w.x,w.y,w.z),f.push(L.x,L.y,L.z)),u[b]=null):p in u||(u[p]={index0:c[M],index1:c[P],normal:Nc.clone()})}}for(let y in u)if(u[y]){let{index0:x,index1:g}=u[y];oa.fromBufferAttribute(o,x),aa.fromBufferAttribute(o,g),f.push(oa.x,oa.y,oa.z),f.push(aa.x,aa.y,aa.z)}this.setAttribute("position",new lt(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},pn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){He("Curve: .getPoint() not implemented.")}getPointAt(e,t){let s=this.getUtoTmapping(e);return this.getPoint(s,t)}getPoints(e=5){let t=[];for(let s=0;s<=e;s++)t.push(this.getPoint(s/e));return t}getSpacedPoints(e=5){let t=[];for(let s=0;s<=e;s++)t.push(this.getPointAt(s/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],s,r=this.getPoint(0),n=0;t.push(0);for(let a=1;a<=e;a++)s=this.getPoint(a/e),n+=s.distanceTo(r),t.push(n),r=s;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let s=this.getLengths(),r=0,n=s.length,a;t?a=t:a=e*s[n-1];let o=0,l=n-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=s[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,s[r]===a)return r/(n-1);let h=s[r],u=s[r+1]-h,f=(a-h)/u;return(r+f)/(n-1)}getTangent(e,t){let r=e-1e-4,n=e+1e-4;r<0&&(r=0),n>1&&(n=1);let a=this.getPoint(r),o=this.getPoint(n),l=t||(a.isVector2?new Me:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let s=this.getUtoTmapping(e);return this.getTangent(s,t)}computeFrenetFrames(e,t=!1){let s=new C,r=[],n=[],a=[],o=new C,l=new vt;for(let f=0;f<=e;f++){let y=f/e;r[f]=this.getTangentAt(y,new C)}n[0]=new C,a[0]=new C;let c=Number.MAX_VALUE,h=Math.abs(r[0].x),d=Math.abs(r[0].y),u=Math.abs(r[0].z);h<=c&&(c=h,s.set(1,0,0)),d<=c&&(c=d,s.set(0,1,0)),u<=c&&s.set(0,0,1),o.crossVectors(r[0],s).normalize(),n[0].crossVectors(r[0],o),a[0].crossVectors(r[0],n[0]);for(let f=1;f<=e;f++){if(n[f]=n[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();let y=Math.acos(Ke(r[f-1].dot(r[f]),-1,1));n[f].applyMatrix4(l.makeRotationAxis(o,y))}a[f].crossVectors(r[f],n[f])}if(t===!0){let f=Math.acos(Ke(n[0].dot(n[e]),-1,1));f/=e,r[0].dot(o.crossVectors(n[0],n[e]))>0&&(f=-f);for(let y=1;y<=e;y++)n[y].applyMatrix4(l.makeRotationAxis(r[y],f*y)),a[y].crossVectors(r[y],n[y])}return{tangents:r,normals:n,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},zr=class extends pn{constructor(e=0,t=0,s=1,r=1,n=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=s,this.yRadius=r,this.aStartAngle=n,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new Me){let s=t,r=Math.PI*2,n=this.aEndAngle-this.aStartAngle,a=Math.abs(n)<Number.EPSILON;for(;n<0;)n+=r;for(;n>r;)n-=r;n<Number.EPSILON&&(a?n=0:n=r),this.aClockwise===!0&&!a&&(n===r?n=-r:n=n-r);let o=this.aStartAngle+e*n,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return s.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},La=class extends zr{constructor(e,t,s,r,n,a){super(e,t,s,s,r,n,a),this.isArcCurve=!0,this.type="ArcCurve"}};function xh(){let i=0,e=0,t=0,s=0;function r(n,a,o,l){i=n,e=o,t=-3*n+3*a-2*o-l,s=2*n-2*a+o+l}return{initCatmullRom:function(n,a,o,l,c){r(a,o,c*(o-n),c*(l-a))},initNonuniformCatmullRom:function(n,a,o,l,c,h,d){let u=(a-n)/c-(o-n)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,r(a,o,u,f)},calc:function(n){let a=n*n,o=a*n;return i+e*n+t*a+s*o}}}var wu=new C,Eu=new C,Uc=new xh,Oc=new xh,Fc=new xh,zs=class extends pn{constructor(e=[],t=!1,s="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=s,this.tension=r}getPoint(e,t=new C){let s=t,r=this.points,n=r.length,a=(n-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/n)+1)*n:l===0&&o===n-1&&(o=n-2,l=1);let c,h;this.closed||o>0?c=r[(o-1)%n]:(Eu.subVectors(r[0],r[1]).add(r[0]),c=Eu);let d=r[o%n],u=r[(o+1)%n];if(this.closed||o+2<n?h=r[(o+2)%n]:(wu.subVectors(r[n-1],r[n-2]).add(r[n-1]),h=wu),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,y=Math.pow(c.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);x<1e-4&&(x=1),y<1e-4&&(y=x),g<1e-4&&(g=x),Uc.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,y,x,g),Oc.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,y,x,g),Fc.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,y,x,g)}else this.curveType==="catmullrom"&&(Uc.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Oc.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Fc.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return s.set(Uc.calc(l),Oc.calc(l),Fc.calc(l)),s}copy(e){super.copy(e),this.points=[];for(let t=0,s=e.points.length;t<s;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,s=this.points.length;t<s;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,s=e.points.length;t<s;t++){let r=e.points[t];this.points.push(new C().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Tu(i,e,t,s,r){let n=(s-e)*.5,a=(r-t)*.5,o=i*i,l=i*o;return(2*t-2*s+n+a)*l+(-3*t+3*s-2*n-a)*o+n*i+t}function dp(i,e){let t=1-i;return t*t*e}function fp(i,e){return 2*(1-i)*i*e}function pp(i,e){return i*i*e}function Mr(i,e,t,s){return dp(i,e)+fp(i,t)+pp(i,s)}function mp(i,e){let t=1-i;return t*t*t*e}function gp(i,e){let t=1-i;return 3*t*t*i*e}function yp(i,e){return 3*(1-i)*i*i*e}function _p(i,e){return i*i*i*e}function br(i,e,t,s,r){return mp(i,e)+gp(i,t)+yp(i,s)+_p(i,r)}var Na=class extends pn{constructor(e=new Me,t=new Me,s=new Me,r=new Me){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=s,this.v3=r}getPoint(e,t=new Me){let s=t,r=this.v0,n=this.v1,a=this.v2,o=this.v3;return s.set(br(e,r.x,n.x,a.x,o.x),br(e,r.y,n.y,a.y,o.y)),s}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ji=class extends pn{constructor(e=new C,t=new C,s=new C,r=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=s,this.v3=r}getPoint(e,t=new C){let s=t,r=this.v0,n=this.v1,a=this.v2,o=this.v3;return s.set(br(e,r.x,n.x,a.x,o.x),br(e,r.y,n.y,a.y,o.y),br(e,r.z,n.z,a.z,o.z)),s}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ua=class extends pn{constructor(e=new Me,t=new Me){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Me){let s=t;return e===1?s.copy(this.v2):(s.copy(this.v2).sub(this.v1),s.multiplyScalar(e).add(this.v1)),s}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Me){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Oa=class extends pn{constructor(e=new C,t=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new C){let s=t;return e===1?s.copy(this.v2):(s.copy(this.v2).sub(this.v1),s.multiplyScalar(e).add(this.v1)),s}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new C){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Fa=class extends pn{constructor(e=new Me,t=new Me,s=new Me){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=s}getPoint(e,t=new Me){let s=t,r=this.v0,n=this.v1,a=this.v2;return s.set(Mr(e,r.x,n.x,a.x),Mr(e,r.y,n.y,a.y)),s}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Vr=class extends pn{constructor(e=new C,t=new C,s=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=s}getPoint(e,t=new C){let s=t,r=this.v0,n=this.v1,a=this.v2;return s.set(Mr(e,r.x,n.x,a.x),Mr(e,r.y,n.y,a.y),Mr(e,r.z,n.z,a.z)),s}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ba=class extends pn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Me){let s=t,r=this.points,n=(r.length-1)*e,a=Math.floor(n),o=n-a,l=r[a===0?a:a-1],c=r[a],h=r[a>r.length-2?r.length-1:a+1],d=r[a>r.length-3?r.length-1:a+2];return s.set(Tu(o,l.x,c.x,h.x,d.x),Tu(o,l.y,c.y,h.y,d.y)),s}copy(e){super.copy(e),this.points=[];for(let t=0,s=e.points.length;t<s;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,s=this.points.length;t<s;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,s=e.points.length;t<s;t++){let r=e.points[t];this.points.push(new Me().fromArray(r))}return this}},Wc=Object.freeze({__proto__:null,ArcCurve:La,CatmullRomCurve3:zs,CubicBezierCurve:Na,CubicBezierCurve3:Ji,EllipseCurve:zr,LineCurve:Ua,LineCurve3:Oa,QuadraticBezierCurve:Fa,QuadraticBezierCurve3:Vr,SplineCurve:Ba}),Hr=class extends pn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let s=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Wc[s](t,e))}return this}getPoint(e,t){let s=e*this.getLength(),r=this.getCurveLengths(),n=0;for(;n<r.length;){if(r[n]>=s){let a=r[n]-s,o=this.curves[n],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}n++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let s=0,r=this.curves.length;s<r;s++)t+=this.curves[s].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let s=0;s<=e;s++)t.push(this.getPoint(s/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],s;for(let r=0,n=this.curves;r<n.length;r++){let a=n[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];s&&s.equals(h)||(t.push(h),s=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,s=e.curves.length;t<s;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,s=this.curves.length;t<s;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,s=e.curves.length;t<s;t++){let r=e.curves[t];this.curves.push(new Wc[r.type]().fromJSON(r))}return this}};var Ki=class i extends Da{constructor(e=1,t=0){let s=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(s,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new i(e.radius,e.detail)}},Gr=class i extends It{constructor(e=1,t=1,s=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:s,heightSegments:r};let n=e/2,a=t/2,o=Math.floor(s),l=Math.floor(r),c=o+1,h=l+1,d=e/o,u=t/l,f=[],y=[],x=[],g=[];for(let m=0;m<h;m++){let M=m*u-a;for(let P=0;P<c;P++){let v=P*d-n;y.push(v,-M,0),x.push(0,0,1),g.push(P/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<o;M++){let P=M+c*m,v=M+c*(m+1),T=M+1+c*(m+1),w=M+1+c*m;f.push(P,v,w),f.push(v,T,w)}this.setIndex(f),this.setAttribute("position",new lt(y,3)),this.setAttribute("normal",new lt(x,3)),this.setAttribute("uv",new lt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Wr=class i extends It{constructor(e=.5,t=1,s=32,r=1,n=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:s,phiSegments:r,thetaStart:n,thetaLength:a},s=Math.max(3,s),r=Math.max(1,r);let o=[],l=[],c=[],h=[],d=e,u=(t-e)/r,f=new C,y=new Me;for(let x=0;x<=r;x++){for(let g=0;g<=s;g++){let m=n+g/s*a;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),y.x=(f.x/t+1)/2,y.y=(f.y/t+1)/2,h.push(y.x,y.y)}d+=u}for(let x=0;x<r;x++){let g=x*(s+1);for(let m=0;m<s;m++){let M=m+g,P=M,v=M+s+1,T=M+s+2,w=M+1;o.push(P,v,w),o.push(v,T,w)}}this.setIndex(o),this.setAttribute("position",new lt(l,3)),this.setAttribute("normal",new lt(c,3)),this.setAttribute("uv",new lt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var wi=class i extends It{constructor(e=1,t=32,s=16,r=0,n=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:s,phiStart:r,phiLength:n,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),s=Math.max(2,Math.floor(s));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new C,u=new C,f=[],y=[],x=[],g=[];for(let m=0;m<=s;m++){let M=[],P=m/s,v=a+P*o,T=e*Math.cos(v),w=Math.sqrt(e*e-T*T),L=0;m===0&&a===0?L=.5/t:m===s&&l===Math.PI&&(L=-.5/t);for(let p=0;p<=t;p++){let b=p/t,I=r+b*n;d.x=-w*Math.cos(I),d.y=T,d.z=w*Math.sin(I),y.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),g.push(b+L,1-P),M.push(c++)}h.push(M)}for(let m=0;m<s;m++)for(let M=0;M<t;M++){let P=h[m][M+1],v=h[m][M],T=h[m+1][M],w=h[m+1][M+1];(m!==0||a>0)&&f.push(P,v,w),(m!==s-1||l<Math.PI)&&f.push(v,T,w)}this.setIndex(f),this.setAttribute("position",new lt(y,3)),this.setAttribute("normal",new lt(x,3)),this.setAttribute("uv",new lt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Sn=class i extends It{constructor(e=1,t=.4,s=12,r=48,n=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:s,tubularSegments:r,arc:n,thetaStart:a,thetaLength:o},s=Math.floor(s),r=Math.floor(r);let l=[],c=[],h=[],d=[],u=new C,f=new C,y=new C;for(let x=0;x<=s;x++){let g=a+x/s*o;for(let m=0;m<=r;m++){let M=m/r*n;f.x=(e+t*Math.cos(g))*Math.cos(M),f.y=(e+t*Math.cos(g))*Math.sin(M),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),u.x=e*Math.cos(M),u.y=e*Math.sin(M),y.subVectors(f,u).normalize(),h.push(y.x,y.y,y.z),d.push(m/r),d.push(x/s)}}for(let x=1;x<=s;x++)for(let g=1;g<=r;g++){let m=(r+1)*x+g-1,M=(r+1)*(x-1)+g-1,P=(r+1)*(x-1)+g,v=(r+1)*x+g;l.push(m,M,v),l.push(M,P,v)}this.setIndex(l),this.setAttribute("position",new lt(c,3)),this.setAttribute("normal",new lt(h,3)),this.setAttribute("uv",new lt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var Vs=class i extends It{constructor(e=new Vr(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),t=64,s=1,r=8,n=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:s,radialSegments:r,closed:n};let a=e.computeFrenetFrames(t,n);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new C,l=new C,c=new Me,h=new C,d=[],u=[],f=[],y=[];x(),this.setIndex(y),this.setAttribute("position",new lt(d,3)),this.setAttribute("normal",new lt(u,3)),this.setAttribute("uv",new lt(f,2));function x(){for(let P=0;P<t;P++)g(P);g(n===!1?t:0),M(),m()}function g(P){h=e.getPointAt(P/t,h);let v=a.normals[P],T=a.binormals[P];for(let w=0;w<=r;w++){let L=w/r*Math.PI*2,p=Math.sin(L),b=-Math.cos(L);l.x=b*v.x+p*T.x,l.y=b*v.y+p*T.y,l.z=b*v.z+p*T.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+s*l.x,o.y=h.y+s*l.y,o.z=h.z+s*l.z,d.push(o.x,o.y,o.z)}}function m(){for(let P=1;P<=t;P++)for(let v=1;v<=r;v++){let T=(r+1)*(P-1)+(v-1),w=(r+1)*P+(v-1),L=(r+1)*P+v,p=(r+1)*(P-1)+v;y.push(T,w,p),y.push(w,L,p)}}function M(){for(let P=0;P<=t;P++)for(let v=0;v<=r;v++)c.x=P/t,c.y=v/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new Wc[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function ss(i){let e={};for(let t in i){e[t]={};for(let s in i[t]){let r=i[t][s];if(Au(r))r.isRenderTargetTexture?(He("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][s]=null):e[t][s]=r.clone();else if(Array.isArray(r))if(Au(r[0])){let n=[];for(let a=0,o=r.length;a<o;a++)n[a]=r[a].clone();e[t][s]=n}else e[t][s]=r.slice();else e[t][s]=r}}return e}function $t(i){let e={};for(let t=0;t<i.length;t++){let s=ss(i[t]);for(let r in s)e[r]=s[r]}return e}function Au(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function xp(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function vh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ot.workingColorSpace}var vd={clone:ss,merge:$t},vp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,mn=class extends Yn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vp,this.fragmentShader=Sp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ss(e.uniforms),this.uniformsGroups=xp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let s={};for(let r in this.extensions)this.extensions[r]===!0&&(s[r]=!0);return Object.keys(s).length>0&&(t.extensions=s),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let s in e.uniforms){let r=e.uniforms[s];switch(this.uniforms[s]={},r.type){case"t":this.uniforms[s].value=t[r.value]||null;break;case"c":this.uniforms[s].value=new je().setHex(r.value);break;case"v2":this.uniforms[s].value=new Me().fromArray(r.value);break;case"v3":this.uniforms[s].value=new C().fromArray(r.value);break;case"v4":this.uniforms[s].value=new Et().fromArray(r.value);break;case"m3":this.uniforms[s].value=new Ze().fromArray(r.value);break;case"m4":this.uniforms[s].value=new vt().fromArray(r.value);break;default:this.uniforms[s].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let s in e.extensions)this.extensions[s]=e.extensions[s];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ka=class extends mn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Hs=class extends Yn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zl,this.normalScale=new Me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new oi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var za=class extends Yn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=rd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Va=class extends Yn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ts(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Bc(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var Ei=class{constructor(e,t,s,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(s),this.sampleValues=t,this.valueSize=s,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,s=this._cachedIndex,r=t[s],n=t[s-1];e:{t:{let a;n:{i:if(!(e<r)){for(let o=s+2;;){if(r===void 0){if(e<n)break i;return s=t.length,this._cachedIndex=s,this.copySampleValue_(s-1)}if(s===o)break;if(n=r,r=t[++s],e<r)break t}a=t.length;break n}if(!(e>=n)){let o=t[1];e<o&&(s=2,n=o);for(let l=s-2;;){if(n===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===l)break;if(r=n,n=t[--s-1],e>=n)break t}a=s,s=0;break n}break e}for(;s<a;){let o=s+a>>>1;e<t[o]?a=o:s=o+1}if(r=t[s],n=t[s-1],n===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return s=t.length,this._cachedIndex=s,this.copySampleValue_(s-1)}this._cachedIndex=s,this.intervalChanged_(s,n,r)}return this.interpolate_(s,n,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,s=this.sampleValues,r=this.valueSize,n=e*r;for(let a=0;a!==r;++a)t[a]=s[n+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ha=class extends Ei{constructor(e,t,s,r){super(e,t,s,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Vc,endingEnd:Vc}}intervalChanged_(e,t,s){let r=this.parameterPositions,n=e-2,a=e+1,o=r[n],l=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Hc:n=e,o=2*t-s;break;case Gc:n=r.length-2,o=t+r[n]-r[n+1];break;default:n=e,o=s}if(l===void 0)switch(this.getSettings_().endingEnd){case Hc:a=e,l=2*s-t;break;case Gc:a=1,l=s+r[1]-r[0];break;default:a=e-1,l=t}let c=(s-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-s),this._offsetPrev=n*h,this._offsetNext=a*h}interpolate_(e,t,s,r){let n=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,y=(s-t)/(r-t),x=y*y,g=x*y,m=-u*g+2*u*x-u*y,M=(1+u)*g+(-1.5-2*u)*x+(-.5+u)*y+1,P=(-1-f)*g+(1.5+f)*x+.5*y,v=f*g-f*x;for(let T=0;T!==o;++T)n[T]=m*a[h+T]+M*a[c+T]+P*a[l+T]+v*a[d+T];return n}},Ga=class extends Ei{constructor(e,t,s,r){super(e,t,s,r)}interpolate_(e,t,s,r){let n=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(s-t)/(r-t),d=1-h;for(let u=0;u!==o;++u)n[u]=a[c+u]*d+a[l+u]*h;return n}},Wa=class extends Ei{constructor(e,t,s,r){super(e,t,s,r)}interpolate_(e){return this.copySampleValue_(e-1)}},qa=class extends Ei{interpolate_(e,t,s,r){let n=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let y=(s-t)/(r-t),x=1-y;for(let g=0;g!==o;++g)n[g]=a[c+g]*x+a[l+g]*y;return n}let u=o*2,f=e-1;for(let y=0;y!==o;++y){let x=a[c+y],g=a[l+y],m=f*u+y*2,M=d[m],P=d[m+1],v=e*u+y*2,T=h[v],w=h[v+1],L=bp(s,t,M,T,r);n[y]=Sd(L,x,P,w,g)}return n}};function Sd(i,e,t,s,r){let n=1-i;return n*n*n*e+3*n*n*i*t+3*n*i*i*s+i*i*i*r}function Mp(i,e,t,s,r){let n=1-i;return 3*n*n*(t-e)+6*n*i*(s-t)+3*i*i*(r-s)}function bp(i,e,t,s,r){let n=(i-e)/(r-e);for(let a=0;a<8;a++){let o=Sd(n,e,t,s,r)-i;if(Math.abs(o)<1e-10)break;let l=Mp(n,e,t,s,r);if(Math.abs(l)<1e-10)break;n=Math.max(0,Math.min(1,n-o/l))}return n}var gn=class{constructor(e,t,s,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ts(t,this.TimeBufferType),this.values=Ts(s,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,s;if(t.toJSON!==this.toJSON)s=t.toJSON(e);else{s={name:e.name,times:Ts(e.times,Array),values:Ts(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(s.interpolation=r),Bc(e.settings)&&(s.settings={inTangents:Ts(e.settings.inTangents,Array),outTangents:Ts(e.settings.outTangents,Array)})}return s.type=e.ValueTypeName,s}InterpolantFactoryMethodDiscrete(e){return new Wa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ga(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ha(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new qa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case wr:t=this.InterpolantFactoryMethodDiscrete;break;case Ma:t=this.InterpolantFactoryMethodLinear;break;case ua:t=this.InterpolantFactoryMethodSmooth;break;case zc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let s="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(s);return He("KeyframeTrack:",s),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return wr;case this.InterpolantFactoryMethodLinear:return Ma;case this.InterpolantFactoryMethodSmooth:return ua;case this.InterpolantFactoryMethodBezier:return zc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let s=0,r=t.length;s!==r;++s)t[s]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let s=0,r=t.length;s!==r;++s)t[s]*=e;Bc(this.settings)&&(Ru(this.settings.inTangents,e),Ru(this.settings.outTangents,e))}return this}trim(e,t){let s=this.times,r=s.length,n=0,a=r-1;for(;n!==r&&s[n]<e;)++n;for(;a!==-1&&s[a]>t;)--a;if(++a,n!==0||a!==r){n>=a&&(a=Math.max(a,1),n=a-1);let o=this.getValueSize();this.times=s.slice(n,a),this.values=this.values.slice(n*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ge("KeyframeTrack: Invalid value size in track.",this),e=!1);let s=this.times,r=this.values,n=s.length;n===0&&(Ge("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==n;o++){let l=s[o];if(typeof l=="number"&&isNaN(l)){Ge("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ge("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(r!==void 0&&If(r))for(let o=0,l=r.length;o!==l;++o){let c=r[o];if(isNaN(c)){Ge("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),s=this.getValueSize(),r=this.getInterpolation()===ua,n=e.length-1,a=1;for(let o=1;o<n;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(r)l=!0;else{let d=o*s,u=d-s,f=d+s;for(let y=0;y!==s;++y){let x=t[d+y];if(x!==t[u+y]||x!==t[f+y]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*s,u=a*s;for(let f=0;f!==s;++f)t[u+f]=t[d+f]}++a}}if(n>0){e[a]=e[n];for(let o=n*s,l=a*s,c=0;c!==s;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*s)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),s=this.constructor,r=new s(this.name,e,t);return r.createInterpolant=this.createInterpolant,Bc(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Ru(i,e){for(let t=0,s=i.length;t!==s;t+=2)i[t]*=e}gn.prototype.ValueTypeName="";gn.prototype.TimeBufferType=Float32Array;gn.prototype.ValueBufferType=Float32Array;gn.prototype.DefaultInterpolation=Ma;var Ti=class extends gn{constructor(e,t,s){super(e,t,s)}};Ti.prototype.ValueTypeName="bool";Ti.prototype.ValueBufferType=Array;Ti.prototype.DefaultInterpolation=wr;Ti.prototype.InterpolantFactoryMethodLinear=void 0;Ti.prototype.InterpolantFactoryMethodSmooth=void 0;var Xa=class extends gn{constructor(e,t,s,r){super(e,t,s,r)}};Xa.prototype.ValueTypeName="color";var $a=class extends gn{constructor(e,t,s,r){super(e,t,s,r)}};$a.prototype.ValueTypeName="number";var Ya=class extends Ei{constructor(e,t,s,r){super(e,t,s,r)}interpolate_(e,t,s,r){let n=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(s-t)/(r-t),c=e*o;for(let h=c+o;c!==h;c+=4)dn.slerpFlat(n,0,a,c-o,a,c,l);return n}},qr=class extends gn{constructor(e,t,s,r){super(e,t,s,r)}InterpolantFactoryMethodLinear(e){return new Ya(this.times,this.values,this.getValueSize(),e)}};qr.prototype.ValueTypeName="quaternion";qr.prototype.InterpolantFactoryMethodSmooth=void 0;var Ai=class extends gn{constructor(e,t,s){super(e,t,s)}};Ai.prototype.ValueTypeName="string";Ai.prototype.ValueBufferType=Array;Ai.prototype.DefaultInterpolation=wr;Ai.prototype.InterpolantFactoryMethodLinear=void 0;Ai.prototype.InterpolantFactoryMethodSmooth=void 0;var Za=class extends gn{constructor(e,t,s,r){super(e,t,s,r)}};Za.prototype.ValueTypeName="vector";var ja=class{constructor(e,t,s){let r=this,n=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=s,this._abortController=null,this.itemStart=function(h){o++,n===!1&&r.onStart!==void 0&&r.onStart(h,a,o),n=!0},this.itemEnd=function(h){a++,r.onProgress!==void 0&&r.onProgress(h,a,o),a===o&&(n=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],y=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return y}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Md=new ja,Ja=class{constructor(e){this.manager=e!==void 0?e:Md,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let s=this;return new Promise(function(r,n){s.load(e,r,t,n)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ja.DEFAULT_MATERIAL_NAME="__DEFAULT";var Xr=class extends kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new je(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},$r=class extends Xr{constructor(e,t,s){super(e,s),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},kc=new vt,Pu=new C,Cu=new C,Ka=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Me(512,512),this.mapType=nn,this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ks,this._frameExtents=new Me(1,1),this._viewportCount=1,this._viewports=[new Et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Pu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Pu),Cu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Cu),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,s,r){kc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),s.setFromProjectionMatrix(kc,e.coordinateSystem,e.reversedDepth);let n=this._frameExtents,a=r?r.z/n.x:1,o=r?r.w/n.y:1,l=r?r.x/n.x:0,c=r?r.y/n.y:0;e.coordinateSystem===Ds||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(kc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},ca=new C,ha=new dn,Wn=new C,Yr=class extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=Cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ca,ha,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ca,ha,Wn.set(1,1,1)).invert()}updateWorldMatrix(e,t,s=!1){super.updateWorldMatrix(e,t,s),this.matrixWorld.decompose(ca,ha,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ca,ha,Wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},_i=new C,Iu=new Me,Du=new Me,Xt=class extends Yr{constructor(e=50,t=1,s=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ns*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ps*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ns*2*Math.atan(Math.tan(Ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,s){_i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(_i.x,_i.y).multiplyScalar(-e/_i.z),_i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(_i.x,_i.y).multiplyScalar(-e/_i.z)}getViewSize(e,t){return this.getViewBounds(e,Iu,Du),t.subVectors(Du,Iu)}setViewOffset(e,t,s,r,n,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=s,this.view.offsetY=r,this.view.width=n,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ps*.5*this.fov)/this.zoom,s=2*t,r=this.aspect*s,n=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;n+=a.offsetX*r/l,t-=a.offsetY*s/c,r*=a.width/l,s*=a.height/c}let o=this.filmOffset;o!==0&&(n+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(n,n+r,t,t-s,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Gs=class extends Yr{constructor(e=-1,t=1,s=1,r=-1,n=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=s,this.bottom=r,this.near=n,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,s,r,n,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=s,this.view.offsetY=r,this.view.width=n,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,r=(this.top+this.bottom)/2,n=s-e,a=s+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;n+=c*this.view.offsetX,a=n+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(n,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},qc=class extends Ka{constructor(){super(new Gs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Qi=class extends Xr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new qc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var As=-90,Rs=1,Qa=class extends kt{constructor(e,t,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Xt(As,Rs,e,t);r.layers=this.layers,this.add(r);let n=new Xt(As,Rs,e,t);n.layers=this.layers,this.add(n);let a=new Xt(As,Rs,e,t);a.layers=this.layers,this.add(a);let o=new Xt(As,Rs,e,t);o.layers=this.layers,this.add(o);let l=new Xt(As,Rs,e,t);l.layers=this.layers,this.add(l);let c=new Xt(As,Rs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[s,r,n,a,o,l]=t;for(let c of t)this.remove(c);if(e===Cn)s.up.set(0,1,0),s.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),n.up.set(0,0,-1),n.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ds)s.up.set(0,-1,0),s.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),n.up.set(0,0,1),n.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:s,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[n,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),y=e.xr.enabled;e.xr.enabled=!1;let x=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(s,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,n),e.setRenderTarget(s,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(s,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(s,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(s,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),s.texture.generateMipmaps=x,e.setRenderTarget(s,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=y,s.texture.needsPMREMUpdate=!0}},el=class extends Xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Sh="\\[\\]\\.:\\/",wp=new RegExp("["+Sh+"]","g"),Mh="[^"+Sh+"]",Ep="[^"+Sh.replace("\\.","")+"]",Tp=/((?:WC+[\/:])*)/.source.replace("WC",Mh),Ap=/(WCOD+)?/.source.replace("WCOD",Ep),Rp=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Mh),Pp=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Mh),Cp=new RegExp("^"+Tp+Ap+Rp+Pp+"$"),Ip=["material","materials","bones","map"],Xc=class{constructor(e,t,s){let r=s||wt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let s=this._targetGroup.nCachedObjects_,r=this._bindings[s];r!==void 0&&r.getValue(e,t)}setValue(e,t){let s=this._bindings;for(let r=this._targetGroup.nCachedObjects_,n=s.length;r!==n;++r)s[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,s=e.length;t!==s;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,s=e.length;t!==s;++t)e[t].unbind()}},wt=class i{constructor(e,t,s){this.path=t,this.parsedPath=s||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,s){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,s):new i(e,t,s)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(wp,"")}static parseTrackName(e){let t=Cp.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let s={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=s.nodeName&&s.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let n=s.nodeName.substring(r+1);Ip.indexOf(n)!==-1&&(s.nodeName=s.nodeName.substring(0,r),s.objectName=n)}if(s.propertyName===null||s.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return s}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let s=e.skeleton.getBoneByName(t);if(s!==void 0)return s}if(e.children){let s=function(n){for(let a=0;a<n.length;a++){let o=n[a];if(o.name===t||o.uuid===t)return o;let l=s(o.children);if(l)return l}return null},r=s(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let s=this.resolvedProperty;for(let r=0,n=s.length;r!==n;++r)e[t++]=s[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let s=this.resolvedProperty;for(let r=0,n=s.length;r!==n;++r)s[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let s=this.resolvedProperty;for(let r=0,n=s.length;r!==n;++r)s[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let s=this.resolvedProperty;for(let r=0,n=s.length;r!==n;++r)s[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,s=t.objectName,r=t.propertyName,n=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){He("PropertyBinding: No target node found for track: "+this.path+".");return}if(s){let c=t.objectIndex;switch(s){case"materials":if(!e.material){Ge("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ge("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ge("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ge("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ge("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[s]===void 0){Ge("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[s]}if(c!==void 0){if(e[c]===void 0){Ge("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[r];if(a===void 0){let c=t.nodeName;Ge("PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(n!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){Ge("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ge("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[n]!==void 0&&(n=e.morphTargetDictionary[n])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=n}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};wt.Composite=Xc;wt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};wt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};wt.prototype.GetterByBindingType=[wt.prototype._getValue_direct,wt.prototype._getValue_array,wt.prototype._getValue_arrayElement,wt.prototype._getValue_toArray];wt.prototype.SetterByBindingTypeAndVersioning=[[wt.prototype._setValue_direct,wt.prototype._setValue_direct_setNeedsUpdate,wt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_array,wt.prototype._setValue_array_setNeedsUpdate,wt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_arrayElement,wt.prototype._setValue_arrayElement_setNeedsUpdate,wt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_fromArray,wt.prototype._setValue_fromArray_setNeedsUpdate,wt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var dx=new Float32Array(1);var Lu=new vt,Zr=class{constructor(e,t,s=0,r=1/0){this.ray=new xi(e,t),this.near=s,this.far=r,this.camera=null,this.layers=new Os,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ge("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Lu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Lu),this}intersectObject(e,t=!0,s=[]){return $c(e,this,s,t),s.sort(Nu),s}intersectObjects(e,t=!0,s=[]){for(let r=0,n=e.length;r<n;r++)$c(e[r],this,s,t);return s.sort(Nu),s}};function Nu(i,e){return i.distance-e.distance}function $c(i,e,t,s){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&s===!0){let n=i.children;for(let a=0,o=n.length;a<o;a++)$c(n[a],e,t,!0)}}var Ws=class{constructor(e=1,t=0,s=0){this.radius=e,this.phi=t,this.theta=s}set(e,t,s){return this.radius=e,this.phi=t,this.theta=s,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ke(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,s){return this.radius=Math.sqrt(e*e+t*t+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,s),this.phi=Math.acos(Ke(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Yc=class i{static{i.prototype.isMatrix2=!0}constructor(e,t,s,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,s,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let s=0;s<4;s++)this.elements[s]=e[s+t];return this}set(e,t,s,r){let n=this.elements;return n[0]=e,n[2]=t,n[1]=s,n[3]=r,this}};var jr=class extends ji{constructor(e=10,t=10,s=4473924,r=8947848){s=new je(s),r=new je(r);let n=t/2,a=e/t,o=e/2,l=[],c=[];for(let u=0,f=0,y=-o;u<=t;u++,y+=a){l.push(-o,0,y,o,0,y),l.push(y,0,-o,y,0,o);let x=u===n?s:r;x.toArray(c,f),f+=3,x.toArray(c,f),f+=3,x.toArray(c,f),f+=3,x.toArray(c,f),f+=3}let h=new It;h.setAttribute("position",new lt(l,3)),h.setAttribute("color",new lt(c,3));let d=new vi({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};var Jr=class extends In{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function bh(i,e,t,s){let r=Dp(s);switch(t){case fh:return i*e;case mh:return i*e/r.components*r.byteLength;case al:return i*e/r.components*r.byteLength;case Di:return i*e*2/r.components*r.byteLength;case ll:return i*e*2/r.components*r.byteLength;case ph:return i*e*3/r.components*r.byteLength;case wn:return i*e*4/r.components*r.byteLength;case cl:return i*e*4/r.components*r.byteLength;case to:case no:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case io:case so:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ul:case fl:return Math.max(i,16)*Math.max(e,8)/4;case hl:case dl:return Math.max(i,8)*Math.max(e,8)/2;case pl:case ml:case yl:case _l:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case gl:case ro:case xl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case vl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Sl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ml:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case bl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case wl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case El:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Tl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Al:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Rl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Pl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Cl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Il:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Dl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ll:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Nl:case Ul:case Ol:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Fl:case Bl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case oo:case kl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Dp(i){switch(i){case nn:case ch:return{byteLength:1,components:1};case $s:case hh:case Fn:return{byteLength:2,components:1};case rl:case ol:return{byteLength:2,components:4};case Un:case sl:case On:return{byteLength:4,components:1};case uh:case dh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?He("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Wd(){let i=null,e=!1,t=null,s=null;function r(n,a){s=i.requestAnimationFrame(r),t(n,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(s=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(n){t=n},setContext:function(n){i=n}}}function Np(i){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function s(o,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,y)=>f.start-y.start);let u=0;for(let f=1;f<d.length;f++){let y=d[u],x=d[f];x.start<=y.start+y.count+1?y.count=Math.max(y.count,x.start+x.count-y.start):(++u,d[u]=x)}d.length=u+1;for(let f=0,y=d.length;f<y;f++){let x=d[f];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function n(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(c.buffer,o,l),c.version=o.version}}return{get:r,remove:n,update:a}}var Up=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Op=`#ifdef USE_ALPHAHASH
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
#endif`,Fp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vp=`#ifdef USE_AOMAP
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
#endif`,Hp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gp=`#ifdef USE_BATCHING
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
#endif`,Wp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$p=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Yp=`#ifdef USE_IRIDESCENCE
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
#endif`,Zp=`#ifdef USE_BUMPMAP
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
#endif`,jp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Jp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Kp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,em=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,tm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,nm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,im=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,sm=`#define PI 3.141592653589793
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
} // validated`,rm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,om=`vec3 transformedNormal = objectNormal;
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
#endif`,am=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,um="gl_FragColor = linearToOutputTexel( gl_FragColor );",dm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fm=`#ifdef USE_ENVMAP
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
#endif`,pm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,mm=`#ifdef USE_ENVMAP
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
#endif`,gm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ym=`#ifdef USE_ENVMAP
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
#endif`,_m=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Sm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Mm=`#ifdef USE_GRADIENTMAP
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
}`,bm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Em=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Am=`#ifdef USE_ENVMAP
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
#endif`,Rm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Pm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Im=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dm=`PhysicalMaterial material;
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
#endif`,Lm=`uniform sampler2D dfgLUT;
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
}`,Nm=`
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
#endif`,Um=`#if defined( RE_IndirectDiffuse )
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
#endif`,Om=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fm=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Bm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,km=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,qm=`#if defined( USE_POINTS_UV )
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
#endif`,Xm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$m=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ym=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Zm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jm=`#ifdef USE_MORPHTARGETS
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
#endif`,Km=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,eg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,tg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ng=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ig=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,sg=`#ifdef USE_NORMALMAP
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
#endif`,rg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,og=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ag=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ug=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,fg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_g=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,vg=`float getShadowMask() {
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
}`,Sg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Mg=`#ifdef USE_SKINNING
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
#endif`,bg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wg=`#ifdef USE_SKINNING
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
#endif`,Eg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ag=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Rg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pg=`#ifdef USE_TRANSMISSION
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
#endif`,Cg=`#ifdef USE_TRANSMISSION
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
#endif`,Ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ng=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ug=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Og=`uniform sampler2D t2D;
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
}`,Fg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,kg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vg=`#include <common>
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
}`,Hg=`#if DEPTH_PACKING == 3200
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
}`,Gg=`#define DISTANCE
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
}`,Wg=`#define DISTANCE
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
}`,qg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Xg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$g=`uniform float scale;
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
}`,Yg=`uniform vec3 diffuse;
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
}`,Zg=`#include <common>
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
}`,jg=`uniform vec3 diffuse;
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
}`,Jg=`#define LAMBERT
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
}`,Kg=`#define LAMBERT
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
}`,Qg=`#define MATCAP
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
}`,e0=`#define MATCAP
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
}`,t0=`#define NORMAL
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
}`,n0=`#define NORMAL
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
}`,i0=`#define PHONG
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
}`,s0=`#define PHONG
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
}`,r0=`#define STANDARD
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
}`,o0=`#define STANDARD
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
}`,a0=`#define TOON
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
}`,l0=`#define TOON
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
}`,c0=`uniform float size;
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
}`,h0=`uniform vec3 diffuse;
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
}`,u0=`#include <common>
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
}`,d0=`uniform vec3 color;
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
}`,f0=`uniform float rotation;
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
}`,p0=`uniform vec3 diffuse;
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
}`,Qe={alphahash_fragment:Up,alphahash_pars_fragment:Op,alphamap_fragment:Fp,alphamap_pars_fragment:Bp,alphatest_fragment:kp,alphatest_pars_fragment:zp,aomap_fragment:Vp,aomap_pars_fragment:Hp,batching_pars_vertex:Gp,batching_vertex:Wp,begin_vertex:qp,beginnormal_vertex:Xp,bsdfs:$p,iridescence_fragment:Yp,bumpmap_pars_fragment:Zp,clipping_planes_fragment:jp,clipping_planes_pars_fragment:Jp,clipping_planes_pars_vertex:Kp,clipping_planes_vertex:Qp,color_fragment:em,color_pars_fragment:tm,color_pars_vertex:nm,color_vertex:im,common:sm,cube_uv_reflection_fragment:rm,defaultnormal_vertex:om,displacementmap_pars_vertex:am,displacementmap_vertex:lm,emissivemap_fragment:cm,emissivemap_pars_fragment:hm,colorspace_fragment:um,colorspace_pars_fragment:dm,envmap_fragment:fm,envmap_common_pars_fragment:pm,envmap_pars_fragment:mm,envmap_pars_vertex:gm,envmap_physical_pars_fragment:Am,envmap_vertex:ym,fog_vertex:_m,fog_pars_vertex:xm,fog_fragment:vm,fog_pars_fragment:Sm,gradientmap_pars_fragment:Mm,lightmap_pars_fragment:bm,lights_lambert_fragment:wm,lights_lambert_pars_fragment:Em,lights_pars_begin:Tm,lights_toon_fragment:Rm,lights_toon_pars_fragment:Pm,lights_phong_fragment:Cm,lights_phong_pars_fragment:Im,lights_physical_fragment:Dm,lights_physical_pars_fragment:Lm,lights_fragment_begin:Nm,lights_fragment_maps:Um,lights_fragment_end:Om,lightprobes_pars_fragment:Fm,logdepthbuf_fragment:Bm,logdepthbuf_pars_fragment:km,logdepthbuf_pars_vertex:zm,logdepthbuf_vertex:Vm,map_fragment:Hm,map_pars_fragment:Gm,map_particle_fragment:Wm,map_particle_pars_fragment:qm,metalnessmap_fragment:Xm,metalnessmap_pars_fragment:$m,morphinstance_vertex:Ym,morphcolor_vertex:Zm,morphnormal_vertex:jm,morphtarget_pars_vertex:Jm,morphtarget_vertex:Km,normal_fragment_begin:Qm,normal_fragment_maps:eg,normal_pars_fragment:tg,normal_pars_vertex:ng,normal_vertex:ig,normalmap_pars_fragment:sg,clearcoat_normal_fragment_begin:rg,clearcoat_normal_fragment_maps:og,clearcoat_pars_fragment:ag,iridescence_pars_fragment:lg,opaque_fragment:cg,packing:hg,premultiplied_alpha_fragment:ug,project_vertex:dg,dithering_fragment:fg,dithering_pars_fragment:pg,roughnessmap_fragment:mg,roughnessmap_pars_fragment:gg,shadowmap_pars_fragment:yg,shadowmap_pars_vertex:_g,shadowmap_vertex:xg,shadowmask_pars_fragment:vg,skinbase_vertex:Sg,skinning_pars_vertex:Mg,skinning_vertex:bg,skinnormal_vertex:wg,specularmap_fragment:Eg,specularmap_pars_fragment:Tg,tonemapping_fragment:Ag,tonemapping_pars_fragment:Rg,transmission_fragment:Pg,transmission_pars_fragment:Cg,uv_pars_fragment:Ig,uv_pars_vertex:Dg,uv_vertex:Lg,worldpos_vertex:Ng,background_vert:Ug,background_frag:Og,backgroundCube_vert:Fg,backgroundCube_frag:Bg,cube_vert:kg,cube_frag:zg,depth_vert:Vg,depth_frag:Hg,distance_vert:Gg,distance_frag:Wg,equirect_vert:qg,equirect_frag:Xg,linedashed_vert:$g,linedashed_frag:Yg,meshbasic_vert:Zg,meshbasic_frag:jg,meshlambert_vert:Jg,meshlambert_frag:Kg,meshmatcap_vert:Qg,meshmatcap_frag:e0,meshnormal_vert:t0,meshnormal_frag:n0,meshphong_vert:i0,meshphong_frag:s0,meshphysical_vert:r0,meshphysical_frag:o0,meshtoon_vert:a0,meshtoon_frag:l0,points_vert:c0,points_frag:h0,shadow_vert:u0,shadow_frag:d0,sprite_vert:f0,sprite_frag:p0},Ee={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new Me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new C},probesMax:{value:new C},probesResolution:{value:new C}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new Me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},Jn={basic:{uniforms:$t([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:$t([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new je(0)},envMapIntensity:{value:1}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:$t([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:$t([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:$t([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new je(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:$t([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:$t([Ee.points,Ee.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:$t([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:$t([Ee.common,Ee.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:$t([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:$t([Ee.sprite,Ee.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distance:{uniforms:$t([Ee.common,Ee.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distance_vert,fragmentShader:Qe.distance_frag},shadow:{uniforms:$t([Ee.lights,Ee.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Jn.physical={uniforms:$t([Jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new Me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new Me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new Me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};var Gl={r:0,b:0,g:0},m0=new vt,qd=new Ze;qd.set(-1,0,0,0,1,0,0,0,1);function g0(i,e,t,s,r,n){let a=new je(0),o=r===!0?0:1,l,c,h=null,d=0,u=null;function f(M){let P=M.isScene===!0?M.background:null;if(P&&P.isTexture){let v=M.backgroundBlurriness>0;P=e.get(P,v)}return P}function y(M){let P=!1,v=f(M);v===null?g(a,o):v&&v.isColor&&(g(v,1),P=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,n):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,n),(i.autoClear||P)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(M,P){let v=f(P);v&&(v.isCubeTexture||v.mapping===Qr)?(c===void 0&&(c=new jt(new Mi(1,1,1),new mn({name:"BackgroundCubeMaterial",uniforms:ss(Jn.backgroundCube.uniforms),vertexShader:Jn.backgroundCube.vertexShader,fragmentShader:Jn.backgroundCube.fragmentShader,side:Jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,w,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=P.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(m0.makeRotationFromEuler(P.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(qd),c.material.toneMapped=ot.getTransfer(v.colorSpace)!==dt,(h!==v||d!==v.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,u=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new jt(new Gr(2,2),new mn({name:"BackgroundMaterial",uniforms:ss(Jn.background.uniforms),vertexShader:Jn.background.vertexShader,fragmentShader:Jn.background.fragmentShader,side:Ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=P.backgroundIntensity,l.material.toneMapped=ot.getTransfer(v.colorSpace)!==dt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,u=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function g(M,P){M.getRGB(Gl,vh(i)),t.buffers.color.setClear(Gl.r,Gl.g,Gl.b,P,n)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,P=1){a.set(M),o=P,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,g(a,o)},render:y,addToRenderList:x,dispose:m}}function y0(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),s={},r=u(null),n=r,a=!1;function o(N,O,H,F,W){let j=!1,Y=d(N,F,H,O);n!==Y&&(n=Y,c(n.object)),j=f(N,F,H,W),j&&y(N,F,H,W),W!==null&&e.update(W,i.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,v(N,O,H,F),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return i.createVertexArray()}function c(N){return i.bindVertexArray(N)}function h(N){return i.deleteVertexArray(N)}function d(N,O,H,F){let W=F.wireframe===!0,j=s[O.id];j===void 0&&(j={},s[O.id]=j);let Y=N.isInstancedMesh===!0?N.id:0,le=j[Y];le===void 0&&(le={},j[Y]=le);let K=le[H.id];K===void 0&&(K={},le[H.id]=K);let ne=K[W];return ne===void 0&&(ne=u(l()),K[W]=ne),ne}function u(N){let O=[],H=[],F=[];for(let W=0;W<t;W++)O[W]=0,H[W]=0,F[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:H,attributeDivisors:F,object:N,attributes:{},index:null}}function f(N,O,H,F){let W=n.attributes,j=O.attributes,Y=0,le=H.getAttributes();for(let K in le)if(le[K].location>=0){let oe=W[K],Fe=j[K];if(Fe===void 0&&(K==="instanceMatrix"&&N.instanceMatrix&&(Fe=N.instanceMatrix),K==="instanceColor"&&N.instanceColor&&(Fe=N.instanceColor)),oe===void 0||oe.attribute!==Fe||Fe&&oe.data!==Fe.data)return!0;Y++}return n.attributesNum!==Y||n.index!==F}function y(N,O,H,F){let W={},j=O.attributes,Y=0,le=H.getAttributes();for(let K in le)if(le[K].location>=0){let oe=j[K];oe===void 0&&(K==="instanceMatrix"&&N.instanceMatrix&&(oe=N.instanceMatrix),K==="instanceColor"&&N.instanceColor&&(oe=N.instanceColor));let Fe={};Fe.attribute=oe,oe&&oe.data&&(Fe.data=oe.data),W[K]=Fe,Y++}n.attributes=W,n.attributesNum=Y,n.index=F}function x(){let N=n.newAttributes;for(let O=0,H=N.length;O<H;O++)N[O]=0}function g(N){m(N,0)}function m(N,O){let H=n.newAttributes,F=n.enabledAttributes,W=n.attributeDivisors;H[N]=1,F[N]===0&&(i.enableVertexAttribArray(N),F[N]=1),W[N]!==O&&(i.vertexAttribDivisor(N,O),W[N]=O)}function M(){let N=n.newAttributes,O=n.enabledAttributes;for(let H=0,F=O.length;H<F;H++)O[H]!==N[H]&&(i.disableVertexAttribArray(H),O[H]=0)}function P(N,O,H,F,W,j,Y){Y===!0?i.vertexAttribIPointer(N,O,H,W,j):i.vertexAttribPointer(N,O,H,F,W,j)}function v(N,O,H,F){x();let W=F.attributes,j=H.getAttributes(),Y=O.defaultAttributeValues;for(let le in j){let K=j[le];if(K.location>=0){let ne=W[le];if(ne===void 0&&(le==="instanceMatrix"&&N.instanceMatrix&&(ne=N.instanceMatrix),le==="instanceColor"&&N.instanceColor&&(ne=N.instanceColor)),ne!==void 0){let oe=ne.normalized,Fe=ne.itemSize,Ae=e.get(ne);if(Ae===void 0)continue;let tt=Ae.buffer,ke=Ae.type,at=Ae.bytesPerElement,Q=ke===i.INT||ke===i.UNSIGNED_INT||ne.gpuType===sl;if(ne.isInterleavedBufferAttribute){let re=ne.data,Ce=re.stride,We=ne.offset;if(re.isInstancedInterleavedBuffer){for(let Re=0;Re<K.locationSize;Re++)m(K.location+Re,re.meshPerAttribute);N.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Re=0;Re<K.locationSize;Re++)g(K.location+Re);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let Re=0;Re<K.locationSize;Re++)P(K.location+Re,Fe/K.locationSize,ke,oe,Ce*at,(We+Fe/K.locationSize*Re)*at,Q)}else{if(ne.isInstancedBufferAttribute){for(let re=0;re<K.locationSize;re++)m(K.location+re,ne.meshPerAttribute);N.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let re=0;re<K.locationSize;re++)g(K.location+re);i.bindBuffer(i.ARRAY_BUFFER,tt);for(let re=0;re<K.locationSize;re++)P(K.location+re,Fe/K.locationSize,ke,oe,Fe*at,Fe/K.locationSize*re*at,Q)}}else if(Y!==void 0){let oe=Y[le];if(oe!==void 0)switch(oe.length){case 2:i.vertexAttrib2fv(K.location,oe);break;case 3:i.vertexAttrib3fv(K.location,oe);break;case 4:i.vertexAttrib4fv(K.location,oe);break;default:i.vertexAttrib1fv(K.location,oe)}}}}M()}function T(){b();for(let N in s){let O=s[N];for(let H in O){let F=O[H];for(let W in F){let j=F[W];for(let Y in j)h(j[Y].object),delete j[Y];delete F[W]}}delete s[N]}}function w(N){if(s[N.id]===void 0)return;let O=s[N.id];for(let H in O){let F=O[H];for(let W in F){let j=F[W];for(let Y in j)h(j[Y].object),delete j[Y];delete F[W]}}delete s[N.id]}function L(N){for(let O in s){let H=s[O];for(let F in H){let W=H[F];if(W[N.id]===void 0)continue;let j=W[N.id];for(let Y in j)h(j[Y].object),delete j[Y];delete W[N.id]}}}function p(N){for(let O in s){let H=s[O],F=N.isInstancedMesh===!0?N.id:0,W=H[F];if(W!==void 0){for(let j in W){let Y=W[j];for(let le in Y)h(Y[le].object),delete Y[le];delete W[j]}delete H[F],Object.keys(H).length===0&&delete s[O]}}}function b(){I(),a=!0,n!==r&&(n=r,c(n.object))}function I(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:b,resetDefaultState:I,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:p,releaseStatesOfProgram:L,initAttributes:x,enableAttribute:g,disableUnusedAttributes:M}}function _0(i,e,t){let s;function r(l){s=l}function n(l,c){i.drawArrays(s,l,c),t.update(c,s,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(s,l,c,h),t.update(c,s,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,s,1)}this.setMode=r,this.render=n,this.renderInstances=a,this.renderMultiDraw=o}function x0(i,e,t,s){let r;function n(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let L=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(L){return!(L!==wn&&s.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){let p=L===Fn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==nn&&L!==On&&!p&&s.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(He("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&He("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),P=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:n,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:y,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:M,maxVaryings:P,maxFragmentUniforms:v,maxSamples:T,samples:w}}function v0(i){let e=this,t=null,s=0,r=!1,n=!1,a=new cn,o=new Ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||s!==0||r;return r=u,s=d.length,f},this.beginShadows=function(){n=!0,h(null)},this.endShadows=function(){n=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let y=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,m=i.get(d);if(!r||y===null||y.length===0||n&&!g)n?h(null):c();else{let M=n?0:s,P=M*4,v=m.clippingState||null;l.value=v,v=h(y,u,P,f);for(let T=0;T!==P;++T)v[T]=t[T];m.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function h(d,u,f,y){let x=d!==null?d.length:0,g=null;if(x!==0){if(g=l.value,y!==!0||g===null){let m=f+x*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(g===null||g.length<m)&&(g=new Float32Array(m));for(let P=0,v=f;P!==x;++P,v+=4)a.copy(d[P]).applyMatrix4(M,o),a.normal.toArray(g,v),g[v+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}var js=4,S0=6,M0=20,b0=256,ao=new Gs,bd=new je,wh=null,Eh=0,Th=0,Ah=!1,w0=new C,rs=new C,ql=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,s=.1,r=100,n={}){let{size:a=256,position:o=w0}=n;wh=this._renderer.getRenderTarget(),Eh=this._renderer.getActiveCubeFace(),Th=this._renderer.getActiveMipmapLevel(),Ah=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,s,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Td(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ed(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(wh,Eh,Th),this._renderer.xr.enabled=Ah,e.scissorTest=!1,Zs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Pi||e.mapping===ns?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),wh=this._renderer.getRenderTarget(),Eh=this._renderer.getActiveCubeFace(),Th=this._renderer.getActiveMipmapLevel(),Ah=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let s=t||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,s={magFilter:zt,minFilter:zt,generateMipmaps:!1,type:Fn,format:wn,colorSpace:Er,depthBuffer:!1},r=wd(e,t,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wd(e,t,s);let{_lodMax:n}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=E0(n)),this._blurMaterial=A0(n,e,t),this._ggxMaterial=T0(n,e,t)}return r}_compileMaterial(e){let t=new jt(new It,e);this._renderer.compile(t,ao)}_sceneToCubeUV(e,t,s,r,n){let l=new Xt(90,1,t,s),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(bd),d.toneMapping=Nn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new jt(new Mi,new fn({name:"PMREM.Background",side:Jt,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,g=x.material,m=!1,M=e.background;M?M.isColor&&(g.color.copy(M),e.background=null,m=!0):(g.color.copy(bd),m=!0);for(let P=0;P<6;P++){let v=P%3;v===0?(l.up.set(0,c[P],0),l.position.set(n.x,n.y,n.z),l.lookAt(n.x+h[P],n.y,n.z)):v===1?(l.up.set(0,0,c[P]),l.position.set(n.x,n.y,n.z),l.lookAt(n.x,n.y+h[P],n.z)):(l.up.set(0,c[P],0),l.position.set(n.x,n.y,n.z),l.lookAt(n.x,n.y,n.z+h[P]));let T=this._cubeSize;Zs(r,v*T,P>2?T:0,T,T),d.setRenderTarget(r),m&&d.render(x,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=M}_textureToCubeUV(e,t){let s=this._renderer,r=e.mapping===Pi||e.mapping===ns;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Td()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ed());let n=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=n;let o=n.uniforms;o.envMap.value=e;let l=this._cubeSize;Zs(t,0,0,3*l,2*l),s.setRenderTarget(t),s.render(a,ao)}_applyPMREM(e){let t=this._renderer,s=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let n=1;n<r;n++)this._applyGGXFilter(e,n-1,n);t.autoClear=s}_applyGGXFilter(e,t,s){let r=this._renderer,n=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[s];o.material=a;let l=a.uniforms,c=s/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:y}=this,x=this._sizeLods[s],g=3*x*(s>y-js?s-y+js:0),m=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=y-t,Zs(n,g,m,3*x,2*x),r.setRenderTarget(n),r.render(o,ao),l.envMap.value=n.texture,l.roughness.value=0,l.mipInt.value=y-s,Zs(e,g,m,3*x,2*x),r.setRenderTarget(e),r.render(o,ao)}_blur(e,t,s,r){let n=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,n,t,s,a),this._blurPass(n,e,s,s,a)}_blurPass(e,t,s,r,n){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=n,c.mipInt.value=this._lodMax-s;let h=this._sizeLods[r],d=3*h*(r>this._lodMax-js?r-this._lodMax+js:0),u=4*(this._cubeSize-h);Zs(t,d,u,3*h,2*h),a.setRenderTarget(t),a.render(l,ao)}};function E0(i){let e=[],t=[],s=i,r=i-js+1+S0;for(let n=0;n<r;n++){let a=Math.pow(2,s);e.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,y=new Float32Array(f*u*d),x=new Float32Array(f*u*d);for(let m=0;m<d;m++){let M=m%3*2/3-1,P=m>2?0:-1,v=[M,P,0,M+2/3,P,0,M+2/3,P+1,0,M,P,0,M+2/3,P+1,0,M,P+1,0];y.set(v,f*u*m);for(let T=0;T<u;T++){let w=h[T*2]*2-1,L=h[T*2+1]*2-1;m===0?rs.set(1,L,w):m===1?rs.set(-w,1,-L):m===2?rs.set(-w,L,1):m===3?rs.set(-1,L,-w):m===4?rs.set(-w,-1,L):rs.set(w,L,-1),rs.toArray(x,(m*u+T)*f)}}let g=new It;g.setAttribute("position",new un(y,f)),g.setAttribute("outputDirection",new un(x,f)),t.push(new jt(g,null)),s>js&&s--}return{lodMeshes:t,sizeLods:e}}function wd(i,e,t){let s=new tn(i,e,t);return s.texture.mapping=Qr,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Zs(i,e,t,s,r){i.viewport.set(e,t,s,r),i.scissor.set(e,t,s,r)}function T0(i,e,t){return new mn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:b0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Yl(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function A0(i,e,t){return new mn({name:"SphericalGaussianBlur",defines:{SAMPLES:M0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Yl(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Ed(){return new mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yl(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Td(){return new mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Yl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Xl=class extends tn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let s={width:e,height:e,depth:1},r=[s,s,s,s,s,s];this.texture=new Or(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Mi(5,5,5),n=new mn({name:"CubemapFromEquirect",uniforms:ss(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Jt,blending:Zn});n.uniforms.tEquirect.value=t;let a=new jt(r,n),o=t.minFilter;return t.minFilter===Ci&&(t.minFilter=zt),new Qa(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,s=!0,r=!0){let n=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,s,r);e.setRenderTarget(n)}};function R0(i){let e=new WeakMap,t=new WeakMap,s=null;function r(u,f=!1){return u==null?null:f?a(u):n(u)}function n(u){if(u&&u.isTexture){let f=u.mapping;if(f===tl||f===nl)if(e.has(u)){let y=e.get(u).texture;return o(y,u.mapping)}else{let y=u.image;if(y&&y.height>0){let x=new Xl(y.height);return x.fromEquirectangularTexture(i,u),e.set(u,x),u.addEventListener("dispose",c),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,y=f===tl||f===nl,x=f===Pi||f===ns;if(y||x){let g=t.get(u),m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return s===null&&(s=new ql(i)),g=y?s.fromEquirectangular(u,g):s.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{let M=u.image;return y&&M&&M.height>0||x&&M&&l(M)?(s===null&&(s=new ql(i)),g=y?s.fromEquirectangular(u):s.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,f){return f===tl?u.mapping=Pi:f===nl&&(u.mapping=ns),u}function l(u){let f=0,y=6;for(let x=0;x<y;x++)u[x]!==void 0&&f++;return f===y}function c(u){let f=u.target;f.removeEventListener("dispose",c);let y=e.get(f);y!==void 0&&(e.delete(f),y.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let y=t.get(f);y!==void 0&&(t.delete(f),y.dispose())}function d(){e=new WeakMap,t=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:r,dispose:d}}function P0(i){let e={};function t(s){if(e[s]!==void 0)return e[s];let r=i.getExtension(s);return e[s]=r,r}return{has:function(s){return t(s)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(s){let r=t(s);return r===null&&Yi("WebGLRenderer: "+s+" extension not supported."),r}}}function C0(i,e,t,s){let r={},n=new WeakMap;function a(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let y in u.attributes)e.remove(u.attributes[y]);u.removeEventListener("dispose",a),delete r[u.id];let f=n.get(u);f&&(e.remove(f),n.delete(u)),s.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)e.update(u[f],i.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,y=d.attributes.position,x=0;if(y===void 0)return;if(f!==null){let M=f.array;x=f.version;for(let P=0,v=M.length;P<v;P+=3){let T=M[P+0],w=M[P+1],L=M[P+2];u.push(T,w,w,L,L,T)}}else{let M=y.array;x=y.version;for(let P=0,v=M.length/3-1;P<v;P+=3){let T=P+0,w=P+1,L=P+2;u.push(T,w,w,L,L,T)}}let g=new(y.count>=65535?Lr:Dr)(u,1);g.version=x;let m=n.get(d);m&&e.remove(m),n.set(d,g)}function h(d){let u=n.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return n.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function I0(i,e,t){let s;function r(d){s=d}let n,a;function o(d){n=d.type,a=d.bytesPerElement}function l(d,u){i.drawElements(s,u,n,d*a),t.update(u,s,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(s,u,n,d*a,f),t.update(u,s,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,u,0,n,d,0,f);let x=0;for(let g=0;g<f;g++)x+=u[g];t.update(x,s,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function D0(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function s(n,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(n/3);break;case i.LINES:t.lines+=o*(n/2);break;case i.LINE_STRIP:t.lines+=o*(n-1);break;case i.LINE_LOOP:t.lines+=o*n;break;case i.POINTS:t.points+=o*n;break;default:Ge("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:s}}function L0(i,e,t){let s=new WeakMap,r=new Et;function n(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=s.get(o);if(u===void 0||u.count!==d){let b=function(){L.dispose(),s.delete(o),o.removeEventListener("dispose",b)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],P=0;f===!0&&(P=1),y===!0&&(P=2),x===!0&&(P=3);let v=o.attributes.position.count*P,T=1;v>e.maxTextureSize&&(T=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let w=new Float32Array(v*T*4*d),L=new Pr(w,v,T,d);L.type=On,L.needsUpdate=!0;let p=P*4;for(let I=0;I<d;I++){let N=g[I],O=m[I],H=M[I],F=v*T*4*I;for(let W=0;W<N.count;W++){let j=W*p;f===!0&&(r.fromBufferAttribute(N,W),w[F+j+0]=r.x,w[F+j+1]=r.y,w[F+j+2]=r.z,w[F+j+3]=0),y===!0&&(r.fromBufferAttribute(O,W),w[F+j+4]=r.x,w[F+j+5]=r.y,w[F+j+6]=r.z,w[F+j+7]=0),x===!0&&(r.fromBufferAttribute(H,W),w[F+j+8]=r.x,w[F+j+9]=r.y,w[F+j+10]=r.z,w[F+j+11]=H.itemSize===4?r.w:1)}}u={count:d,texture:L,size:new Me(v,T)},s.set(o,u),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let y=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",y),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:n}}function N0(i,e,t,s,r){let n=new WeakMap;function a(c){let h=r.render.frame,d=c.geometry,u=e.get(c,d);if(n.get(u)!==h&&(e.update(u),n.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),n.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),n.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;n.get(f)!==h&&(f.update(),n.set(f,h))}return u}function o(){n=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),s.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var U0={[nh]:"LINEAR_TONE_MAPPING",[ih]:"REINHARD_TONE_MAPPING",[sh]:"CINEON_TONE_MAPPING",[Kr]:"ACES_FILMIC_TONE_MAPPING",[oh]:"AGX_TONE_MAPPING",[ah]:"NEUTRAL_TONE_MAPPING",[rh]:"CUSTOM_TONE_MAPPING"};function O0(i,e,t,s,r,n){let a=new tn(e,t,{type:i,depthBuffer:r,stencilBuffer:n,samples:s?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new It;c.setAttribute("position",new lt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new lt([0,2,0,0,2,0],2));let h=new ka({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new jt(c,h),u=new Gs(-1,1,1,-1,0,1),f=null,y=null,x=!1,g,m=null,M=[],P=!1;this.setSize=function(v,T){a.setSize(v,T),o!==null&&o.setSize(v,T),l!==null&&l.setSize(v,T);for(let w=0;w<M.length;w++){let L=M[w];L.setSize&&L.setSize(v,T)}},this.setEffects=function(v){M=v,P=M.length>0&&M[0].isRenderPass===!0;let T=a.width,w=a.height;M.length>0&&o===null&&(o=new tn(T,w,{type:Fn,depthBuffer:!1,stencilBuffer:!1}),l=new tn(T,w,{type:Fn,depthBuffer:!1,stencilBuffer:!1}));for(let L=0;L<M.length;L++){let p=M[L];p.setSize&&p.setSize(T,w)}},this.begin=function(v,T){if(x||v.toneMapping===Nn&&M.length===0)return!1;if(m=T,T!==null){let w=T.width,L=T.height;(a.width!==w||a.height!==L)&&this.setSize(w,L)}return P===!1&&v.setRenderTarget(a),g=v.toneMapping,v.toneMapping=Nn,!0},this.hasRenderPass=function(){return P},this.end=function(v,T){v.toneMapping=g,x=!0;let w=a,L=o;for(let p=0;p<M.length;p++){let b=M[p];b.enabled!==!1&&(b.render(v,L,w,T),b.needsSwap!==!1&&(w=L,L=L===o?l:o))}if(f!==v.outputColorSpace||y!==v.toneMapping){f=v.outputColorSpace,y=v.toneMapping,h.defines={},ot.getTransfer(f)===dt&&(h.defines.SRGB_TRANSFER="");let p=U0[y];p&&(h.defines[p]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=w.texture,v.setRenderTarget(m),v.render(d,u),m=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var Xd=new Zt,Ch=new Si(1,1),$d=new Pr,Yd=new Ea,Zd=new Or,Ad=[],Rd=[],Pd=new Float32Array(16),Cd=new Float32Array(9),Id=new Float32Array(4);function Ks(i,e,t){let s=i[0];if(s<=0||s>0)return i;let r=e*t,n=Ad[r];if(n===void 0&&(n=new Float32Array(r),Ad[r]=n),e!==0){s.toArray(n,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(n,o)}return n}function Lt(i,e){if(i.length!==e.length)return!1;for(let t=0,s=i.length;t<s;t++)if(i[t]!==e[t])return!1;return!0}function Nt(i,e){for(let t=0,s=e.length;t<s;t++)i[t]=e[t]}function Zl(i,e){let t=Rd[e];t===void 0&&(t=new Int32Array(e),Rd[e]=t);for(let s=0;s!==e;++s)t[s]=i.allocateTextureUnit();return t}function F0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function B0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2fv(this.addr,e),Nt(t,e)}}function k0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;i.uniform3fv(this.addr,e),Nt(t,e)}}function z0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4fv(this.addr,e),Nt(t,e)}}function V0(i,e){let t=this.cache,s=e.elements;if(s===void 0){if(Lt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(Lt(t,s))return;Id.set(s),i.uniformMatrix2fv(this.addr,!1,Id),Nt(t,s)}}function H0(i,e){let t=this.cache,s=e.elements;if(s===void 0){if(Lt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(Lt(t,s))return;Cd.set(s),i.uniformMatrix3fv(this.addr,!1,Cd),Nt(t,s)}}function G0(i,e){let t=this.cache,s=e.elements;if(s===void 0){if(Lt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(Lt(t,s))return;Pd.set(s),i.uniformMatrix4fv(this.addr,!1,Pd),Nt(t,s)}}function W0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function q0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2iv(this.addr,e),Nt(t,e)}}function X0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;i.uniform3iv(this.addr,e),Nt(t,e)}}function $0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4iv(this.addr,e),Nt(t,e)}}function Y0(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Z0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;i.uniform2uiv(this.addr,e),Nt(t,e)}}function j0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;i.uniform3uiv(this.addr,e),Nt(t,e)}}function J0(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;i.uniform4uiv(this.addr,e),Nt(t,e)}}function K0(i,e,t){let s=this.cache,r=t.allocateTextureUnit();s[0]!==r&&(i.uniform1i(this.addr,r),s[0]=r);let n;this.type===i.SAMPLER_2D_SHADOW?(Ch.compareFunction=t.isReversedDepthBuffer()?Hl:Vl,n=Ch):n=Xd,t.setTexture2D(e||n,r)}function Q0(i,e,t){let s=this.cache,r=t.allocateTextureUnit();s[0]!==r&&(i.uniform1i(this.addr,r),s[0]=r),t.setTexture3D(e||Yd,r)}function ey(i,e,t){let s=this.cache,r=t.allocateTextureUnit();s[0]!==r&&(i.uniform1i(this.addr,r),s[0]=r),t.setTextureCube(e||Zd,r)}function ty(i,e,t){let s=this.cache,r=t.allocateTextureUnit();s[0]!==r&&(i.uniform1i(this.addr,r),s[0]=r),t.setTexture2DArray(e||$d,r)}function ny(i){switch(i){case 5126:return F0;case 35664:return B0;case 35665:return k0;case 35666:return z0;case 35674:return V0;case 35675:return H0;case 35676:return G0;case 5124:case 35670:return W0;case 35667:case 35671:return q0;case 35668:case 35672:return X0;case 35669:case 35673:return $0;case 5125:return Y0;case 36294:return Z0;case 36295:return j0;case 36296:return J0;case 35678:case 36198:case 36298:case 36306:case 35682:return K0;case 35679:case 36299:case 36307:return Q0;case 35680:case 36300:case 36308:case 36293:return ey;case 36289:case 36303:case 36311:case 36292:return ty}}function iy(i,e){i.uniform1fv(this.addr,e)}function sy(i,e){let t=Ks(e,this.size,2);i.uniform2fv(this.addr,t)}function ry(i,e){let t=Ks(e,this.size,3);i.uniform3fv(this.addr,t)}function oy(i,e){let t=Ks(e,this.size,4);i.uniform4fv(this.addr,t)}function ay(i,e){let t=Ks(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ly(i,e){let t=Ks(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function cy(i,e){let t=Ks(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function hy(i,e){i.uniform1iv(this.addr,e)}function uy(i,e){i.uniform2iv(this.addr,e)}function dy(i,e){i.uniform3iv(this.addr,e)}function fy(i,e){i.uniform4iv(this.addr,e)}function py(i,e){i.uniform1uiv(this.addr,e)}function my(i,e){i.uniform2uiv(this.addr,e)}function gy(i,e){i.uniform3uiv(this.addr,e)}function yy(i,e){i.uniform4uiv(this.addr,e)}function _y(i,e,t){let s=this.cache,r=e.length,n=Zl(t,r);Lt(s,n)||(i.uniform1iv(this.addr,n),Nt(s,n));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ch:a=Xd;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,n[o])}function xy(i,e,t){let s=this.cache,r=e.length,n=Zl(t,r);Lt(s,n)||(i.uniform1iv(this.addr,n),Nt(s,n));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Yd,n[a])}function vy(i,e,t){let s=this.cache,r=e.length,n=Zl(t,r);Lt(s,n)||(i.uniform1iv(this.addr,n),Nt(s,n));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Zd,n[a])}function Sy(i,e,t){let s=this.cache,r=e.length,n=Zl(t,r);Lt(s,n)||(i.uniform1iv(this.addr,n),Nt(s,n));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||$d,n[a])}function My(i){switch(i){case 5126:return iy;case 35664:return sy;case 35665:return ry;case 35666:return oy;case 35674:return ay;case 35675:return ly;case 35676:return cy;case 5124:case 35670:return hy;case 35667:case 35671:return uy;case 35668:case 35672:return dy;case 35669:case 35673:return fy;case 5125:return py;case 36294:return my;case 36295:return gy;case 36296:return yy;case 35678:case 36198:case 36298:case 36306:case 35682:return _y;case 35679:case 36299:case 36307:return xy;case 35680:case 36300:case 36308:case 36293:return vy;case 36289:case 36303:case 36311:case 36292:return Sy}}var Ih=class{constructor(e,t,s){this.id=e,this.addr=s,this.cache=[],this.type=t.type,this.setValue=ny(t.type)}},Dh=class{constructor(e,t,s){this.id=e,this.addr=s,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=My(t.type)}},Lh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,s){let r=this.seq;for(let n=0,a=r.length;n!==a;++n){let o=r[n];o.setValue(e,t[o.id],s)}}},Rh=/(\w+)(\])?(\[|\.)?/g;function Dd(i,e){i.seq.push(e),i.map[e.id]=e}function by(i,e,t){let s=i.name,r=s.length;for(Rh.lastIndex=0;;){let n=Rh.exec(s),a=Rh.lastIndex,o=n[1],l=n[2]==="]",c=n[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){Dd(t,c===void 0?new Ih(o,i,e):new Dh(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Lh(o),Dd(t,d)),t=d}}}var Js=class{constructor(e,t){this.seq=[],this.map={};let s=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<s;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);by(o,l,this)}let r=[],n=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):n.push(a);r.length>0&&(this.seq=r.concat(n))}setValue(e,t,s,r){let n=this.map[t];n!==void 0&&n.setValue(e,s,r)}setOptional(e,t,s){let r=t[s];r!==void 0&&this.setValue(e,s,r)}static upload(e,t,s,r){for(let n=0,a=t.length;n!==a;++n){let o=t[n],l=s[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){let s=[];for(let r=0,n=e.length;r!==n;++r){let a=e[r];a.id in t&&s.push(a)}return s}};function Ld(i,e,t){let s=i.createShader(e);return i.shaderSource(s,t),i.compileShader(s),s}var wy=37297,Ey=0;function Ty(i,e){let t=i.split(`
`),s=[],r=Math.max(e-6,0),n=Math.min(e+6,t.length);for(let a=r;a<n;a++){let o=a+1;s.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return s.join(`
`)}var Nd=new Ze;function Ay(i){ot._getMatrix(Nd,ot.workingColorSpace,i);let e=`mat3( ${Nd.elements.map(t=>t.toFixed(4))} )`;switch(ot.getTransfer(i)){case Tr:return[e,"LinearTransferOETF"];case dt:return[e,"sRGBTransferOETF"];default:return He("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ud(i,e,t){let s=i.getShaderParameter(e,i.COMPILE_STATUS),n=(i.getShaderInfoLog(e)||"").trim();if(s&&n==="")return"";let a=/ERROR: 0:(\d+)/.exec(n);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+n+`

`+Ty(i.getShaderSource(e),o)}else return n}function Ry(i,e){let t=Ay(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Py={[nh]:"Linear",[ih]:"Reinhard",[sh]:"Cineon",[Kr]:"ACESFilmic",[oh]:"AgX",[ah]:"Neutral",[rh]:"Custom"};function Cy(i,e){let t=Py[e];return t===void 0?(He("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Wl=new C;function Iy(){ot.getLuminanceCoefficients(Wl);let i=Wl.x.toFixed(4),e=Wl.y.toFixed(4),t=Wl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Dy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(co).join(`
`)}function Ly(i){let e=[];for(let t in i){let s=i[t];s!==!1&&e.push("#define "+t+" "+s)}return e.join(`
`)}function Ny(i,e){let t={},s=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<s;r++){let n=i.getActiveAttrib(e,r),a=n.name,o=1;n.type===i.FLOAT_MAT2&&(o=2),n.type===i.FLOAT_MAT3&&(o=3),n.type===i.FLOAT_MAT4&&(o=4),t[a]={type:n.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function co(i){return i!==""}function Od(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Fd(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Uy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nh(i){return i.replace(Uy,Fy)}var Oy=new Map;function Fy(i,e){let t=Qe[e];if(t===void 0){let s=Oy.get(e);if(s!==void 0)t=Qe[s],He('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Nh(t)}var By=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bd(i){return i.replace(By,ky)}function ky(i,e,t,s){let r="";for(let n=parseInt(e);n<parseInt(t);n++)r+=s.replace(/\[\s*i\s*\]/g,"[ "+n+" ]").replace(/UNROLLED_LOOP_INDEX/g,n);return r}function kd(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var zy={[es]:"SHADOWMAP_TYPE_PCF",[qs]:"SHADOWMAP_TYPE_VSM"};function Vy(i){return zy[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Hy={[Pi]:"ENVMAP_TYPE_CUBE",[ns]:"ENVMAP_TYPE_CUBE",[Qr]:"ENVMAP_TYPE_CUBE_UV"};function Gy(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Hy[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Wy={[ns]:"ENVMAP_MODE_REFRACTION"};function qy(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Wy[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Xy={[th]:"ENVMAP_BLENDING_MULTIPLY",[nd]:"ENVMAP_BLENDING_MIX",[id]:"ENVMAP_BLENDING_ADD"};function $y(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Xy[i.combine]||"ENVMAP_BLENDING_NONE"}function Yy(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:s,maxMip:t}}function Zy(i,e,t,s){let r=i.getContext(),n=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Vy(t),c=Gy(t),h=qy(t),d=$y(t),u=Yy(t),f=Dy(t),y=Ly(n),x=r.createProgram(),g,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(co).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(co).join(`
`),m.length>0&&(m+=`
`)):(g=[kd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(co).join(`
`),m=[kd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Nn?"#define TONE_MAPPING":"",t.toneMapping!==Nn?Qe.tonemapping_pars_fragment:"",t.toneMapping!==Nn?Cy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,Ry("linearToOutputTexel",t.outputColorSpace),Iy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(co).join(`
`)),a=Nh(a),a=Od(a,t),a=Fd(a,t),o=Nh(o),o=Od(o,t),o=Fd(o,t),a=Bd(a),o=Bd(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===yh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===yh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let P=M+g+a,v=M+m+o,T=Ld(r,r.VERTEX_SHADER,P),w=Ld(r,r.FRAGMENT_SHADER,v);r.attachShader(x,T),r.attachShader(x,w),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function L(N){if(i.debug.checkShaderErrors){let O=r.getProgramInfoLog(x)||"",H=r.getShaderInfoLog(T)||"",F=r.getShaderInfoLog(w)||"",W=O.trim(),j=H.trim(),Y=F.trim(),le=!0,K=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(le=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,x,T,w);else{let ne=Ud(r,T,"vertex"),oe=Ud(r,w,"fragment");Ge("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+W+`
`+ne+`
`+oe)}else W!==""?He("WebGLProgram: Program Info Log:",W):(j===""||Y==="")&&(K=!1);K&&(N.diagnostics={runnable:le,programLog:W,vertexShader:{log:j,prefix:g},fragmentShader:{log:Y,prefix:m}})}r.deleteShader(T),r.deleteShader(w),p=new Js(r,x),b=Ny(r,x)}let p;this.getUniforms=function(){return p===void 0&&L(this),p};let b;this.getAttributes=function(){return b===void 0&&L(this),b};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=r.getProgramParameter(x,wy)),I},this.destroy=function(){s.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ey++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=w,this}var jy=0,Uh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,s){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let s of t)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,s=t.get(e);return s===void 0&&(s=new Set,t.set(e,s)),s}_getShaderStage(e){let t=this.shaderCache,s=t.get(e);return s===void 0&&(s=new Oh(e),t.set(e,s)),s}},Oh=class{constructor(e){this.id=jy++,this.code=e,this.usedTimes=0}};function Jy(i){return i===Di||i===ro||i===oo}function Ky(i,e,t,s,r,n){let a=new Os,o=new Uh,l=new Set,c=[],h=new Map,d=s.logarithmicDepthBuffer,u=s.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(p){return l.add(p),p===0?"uv":`uv${p}`}function x(p,b,I,N,O,H){let F=N.fog,W=O.geometry,j=p.isMeshStandardMaterial||p.isMeshLambertMaterial||p.isMeshPhongMaterial?N.environment:null,Y=p.isMeshStandardMaterial||p.isMeshLambertMaterial&&!p.envMap||p.isMeshPhongMaterial&&!p.envMap,le=e.get(p.envMap||j,Y),K=le&&le.mapping===Qr?le.image.height:null,ne=f[p.type];p.precision!==null&&(u=s.getMaxPrecision(p.precision),u!==p.precision&&He("WebGLProgram.getParameters:",p.precision,"not supported, using",u,"instead."));let oe=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Fe=oe!==void 0?oe.length:0,Ae=0;W.morphAttributes.position!==void 0&&(Ae=1),W.morphAttributes.normal!==void 0&&(Ae=2),W.morphAttributes.color!==void 0&&(Ae=3);let tt,ke,at,Q;if(ne){let _t=Jn[ne];tt=_t.vertexShader,ke=_t.fragmentShader}else{tt=p.vertexShader,ke=p.fragmentShader;let _t=o.getVertexShaderStage(p),ht=o.getFragmentShaderStage(p);o.update(p,_t,ht),at=_t.id,Q=ht.id}let re=i.getRenderTarget(),Ce=i.state.buffers.depth.getReversed(),We=O.isInstancedMesh===!0,Re=O.isBatchedMesh===!0,qe=!!p.map,ue=!!p.matcap,Ie=!!le,me=!!p.aoMap,$e=!!p.lightMap,et=!!p.bumpMap&&p.wireframe===!1,ft=!!p.normalMap,St=!!p.displacementMap,Vt=!!p.emissiveMap,Mt=!!p.metalnessMap,Tt=!!p.roughnessMap,z=p.anisotropy>0,Ot=p.clearcoat>0,ut=p.dispersion>0,D=p.retroreflectivity>0,_=p.iridescence>0,q=p.sheen>0,Z=p.transmission>0,ee=z&&!!p.anisotropyMap,de=Ot&&!!p.clearcoatMap,ye=Ot&&!!p.clearcoatNormalMap,te=Ot&&!!p.clearcoatRoughnessMap,se=_&&!!p.iridescenceMap,ve=_&&!!p.iridescenceThicknessMap,Be=q&&!!p.sheenColorMap,_e=q&&!!p.sheenRoughnessMap,Se=!!p.specularMap,De=!!p.specularColorMap,Ve=!!p.specularIntensityMap,Ye=Z&&!!p.transmissionMap,k=Z&&!!p.thicknessMap,ge=!!p.gradientMap,ie=!!p.alphaMap,xe=p.alphaTest>0,be=!!p.alphaHash,ae=!!p.extensions,Oe=Nn;p.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(Oe=i.toneMapping);let Ue={shaderID:ne,shaderType:p.type,shaderName:p.name,vertexShader:tt,fragmentShader:ke,defines:p.defines,customVertexShaderID:at,customFragmentShaderID:Q,isRawShaderMaterial:p.isRawShaderMaterial===!0,glslVersion:p.glslVersion,precision:u,batching:Re,batchingColor:Re&&O._colorsTexture!==null,instancing:We,instancingColor:We&&O.instanceColor!==null,instancingMorph:We&&O.morphTexture!==null,outputColorSpace:re===null?i.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:ot.workingColorSpace,alphaToCoverage:!!p.alphaToCoverage,map:qe,matcap:ue,envMap:Ie,envMapMode:Ie&&le.mapping,envMapCubeUVHeight:K,aoMap:me,lightMap:$e,bumpMap:et,normalMap:ft,displacementMap:St,emissiveMap:Vt,normalMapObjectSpace:ft&&p.normalMapType===od,normalMapTangentSpace:ft&&p.normalMapType===zl,packedNormalMap:ft&&p.normalMapType===zl&&Jy(p.normalMap.format),metalnessMap:Mt,roughnessMap:Tt,anisotropy:z,anisotropyMap:ee,clearcoat:Ot,clearcoatMap:de,clearcoatNormalMap:ye,clearcoatRoughnessMap:te,dispersion:ut,retroreflection:D,iridescence:_,iridescenceMap:se,iridescenceThicknessMap:ve,sheen:q,sheenColorMap:Be,sheenRoughnessMap:_e,specularMap:Se,specularColorMap:De,specularIntensityMap:Ve,transmission:Z,transmissionMap:Ye,thicknessMap:k,gradientMap:ge,opaque:p.transparent===!1&&p.blending===Xs&&p.alphaToCoverage===!1,alphaMap:ie,alphaTest:xe,alphaHash:be,combine:p.combine,mapUv:qe&&y(p.map.channel),aoMapUv:me&&y(p.aoMap.channel),lightMapUv:$e&&y(p.lightMap.channel),bumpMapUv:et&&y(p.bumpMap.channel),normalMapUv:ft&&y(p.normalMap.channel),displacementMapUv:St&&y(p.displacementMap.channel),emissiveMapUv:Vt&&y(p.emissiveMap.channel),metalnessMapUv:Mt&&y(p.metalnessMap.channel),roughnessMapUv:Tt&&y(p.roughnessMap.channel),anisotropyMapUv:ee&&y(p.anisotropyMap.channel),clearcoatMapUv:de&&y(p.clearcoatMap.channel),clearcoatNormalMapUv:ye&&y(p.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&y(p.clearcoatRoughnessMap.channel),iridescenceMapUv:se&&y(p.iridescenceMap.channel),iridescenceThicknessMapUv:ve&&y(p.iridescenceThicknessMap.channel),sheenColorMapUv:Be&&y(p.sheenColorMap.channel),sheenRoughnessMapUv:_e&&y(p.sheenRoughnessMap.channel),specularMapUv:Se&&y(p.specularMap.channel),specularColorMapUv:De&&y(p.specularColorMap.channel),specularIntensityMapUv:Ve&&y(p.specularIntensityMap.channel),transmissionMapUv:Ye&&y(p.transmissionMap.channel),thicknessMapUv:k&&y(p.thicknessMap.channel),alphaMapUv:ie&&y(p.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(ft||z),vertexNormals:!!W.attributes.normal,vertexColors:p.vertexColors,vertexAlphas:p.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!W.attributes.uv&&(qe||ie),fog:!!F,useFog:p.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:p.wireframe===!1&&(p.flatShading===!0||W.attributes.normal===void 0&&ft===!1&&(p.isMeshLambertMaterial||p.isMeshPhongMaterial||p.isMeshStandardMaterial||p.isMeshPhysicalMaterial)),sizeAttenuation:p.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ce,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:W.attributes.position!==void 0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:Fe,morphTextureStride:Ae,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:H.length,numClippingPlanes:n.numPlanes,numClipIntersection:n.numIntersection,dithering:p.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Oe,decodeVideoTexture:qe&&p.map.isVideoTexture===!0&&ot.getTransfer(p.map.colorSpace)===dt,decodeVideoTextureEmissive:Vt&&p.emissiveMap.isVideoTexture===!0&&ot.getTransfer(p.emissiveMap.colorSpace)===dt,premultipliedAlpha:p.premultipliedAlpha,doubleSided:p.side===bn,flipSided:p.side===Jt,useDepthPacking:p.depthPacking>=0,depthPacking:p.depthPacking||0,index0AttributeName:p.index0AttributeName,extensionClipCullDistance:ae&&p.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&p.extensions.multiDraw===!0||Re)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:p.customProgramCacheKey()};return Ue.vertexUv1s=l.has(1),Ue.vertexUv2s=l.has(2),Ue.vertexUv3s=l.has(3),l.clear(),Ue}function g(p){let b=[];if(p.shaderID?b.push(p.shaderID):(b.push(p.customVertexShaderID),b.push(p.customFragmentShaderID)),p.defines!==void 0)for(let I in p.defines)b.push(I),b.push(p.defines[I]);return p.isRawShaderMaterial===!1&&(m(b,p),M(b,p),b.push(i.outputColorSpace)),b.push(p.customProgramCacheKey),b.join()}function m(p,b){p.push(b.precision),p.push(b.outputColorSpace),p.push(b.envMapMode),p.push(b.envMapCubeUVHeight),p.push(b.mapUv),p.push(b.alphaMapUv),p.push(b.lightMapUv),p.push(b.aoMapUv),p.push(b.bumpMapUv),p.push(b.normalMapUv),p.push(b.displacementMapUv),p.push(b.emissiveMapUv),p.push(b.metalnessMapUv),p.push(b.roughnessMapUv),p.push(b.anisotropyMapUv),p.push(b.clearcoatMapUv),p.push(b.clearcoatNormalMapUv),p.push(b.clearcoatRoughnessMapUv),p.push(b.iridescenceMapUv),p.push(b.iridescenceThicknessMapUv),p.push(b.sheenColorMapUv),p.push(b.sheenRoughnessMapUv),p.push(b.specularMapUv),p.push(b.specularColorMapUv),p.push(b.specularIntensityMapUv),p.push(b.transmissionMapUv),p.push(b.thicknessMapUv),p.push(b.combine),p.push(b.fogExp2),p.push(b.sizeAttenuation),p.push(b.morphTargetsCount),p.push(b.morphAttributeCount),p.push(b.numSunLights),p.push(b.numDirLights),p.push(b.numPointLights),p.push(b.numSpotLights),p.push(b.numSpotLightMaps),p.push(b.numHemiLights),p.push(b.numRectAreaLights),p.push(b.numSunLightShadows),p.push(b.numDirLightShadows),p.push(b.numPointLightShadows),p.push(b.numSpotLightShadows),p.push(b.numSpotLightShadowsWithMaps),p.push(b.numLightProbes),p.push(b.shadowMapType),p.push(b.toneMapping),p.push(b.numClippingPlanes),p.push(b.numClipIntersection),p.push(b.depthPacking)}function M(p,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.retroreflection&&a.enable(24),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),p.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),p.push(a.mask)}function P(p){let b=f[p.type],I;if(b){let N=Jn[b];I=vd.clone(N.uniforms)}else I=p.uniforms;return I}function v(p,b){let I=h.get(b);return I!==void 0?++I.usedTimes:(I=new Zy(i,b,p,r),c.push(I),h.set(b,I)),I}function T(p){if(--p.usedTimes===0){let b=c.indexOf(p);c[b]=c[c.length-1],c.pop(),h.delete(p.cacheKey),p.destroy()}}function w(p){o.remove(p)}function L(){o.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:P,acquireProgram:v,releaseProgram:T,releaseShaderCache:w,programs:c,dispose:L}}function Qy(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function s(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function n(){i=new WeakMap}return{has:e,get:t,remove:s,update:r,dispose:n}}function e_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function zd(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Vd(){let i=[],e=0,t=[],s=[],r=[];function n(){e=0,t.length=0,s.length=0,r.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,y,x,g,m){let M=i[e];return M===void 0?(M={id:u.id,object:u,geometry:f,material:y,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:g,group:m},i[e]=M):(M.id=u.id,M.object=u,M.geometry=f,M.material=y,M.materialVariant=a(u),M.groupOrder=x,M.renderOrder=u.renderOrder,M.z=g,M.group=m),e++,M}function l(u,f,y,x,g,m,M){M.reversedDepth===!0&&(g=-g);let P=o(u,f,y,x,g,m);y.transmission>0?s.push(P):y.transparent===!0?r.push(P):t.push(P)}function c(u,f,y,x,g,m){let M=o(u,f,y,x,g,m);y.transmission>0?s.unshift(M):y.transparent===!0?r.unshift(M):t.unshift(M)}function h(u,f){t.length>1&&t.sort(u||e_),s.length>1&&s.sort(f||zd),r.length>1&&r.sort(f||zd)}function d(){for(let u=e,f=i.length;u<f;u++){let y=i[u];if(y.id===null)break;y.id=null,y.object=null,y.geometry=null,y.material=null,y.group=null}}return{opaque:t,transmissive:s,transparent:r,init:n,push:l,unshift:c,finish:d,sort:h}}function t_(){let i=new WeakMap;function e(s,r){let n=i.get(s),a;return n===void 0?(a=new Vd,i.set(s,[a])):r>=n.length?(a=new Vd,n.push(a)):a=n[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function n_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new C,color:new je};break;case"SpotLight":t={position:new C,direction:new C,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new je,groundColor:new je};break;case"RectAreaLight":t={color:new je,position:new C,halfWidth:new C,halfHeight:new C};break}return i[e.id]=t,t}}}function i_(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var s_=0;function r_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function o_(i){let e=new n_,t=i_(),s={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)s.probe.push(new C);let r=new C,n=new vt,a=new vt;function o(c){let h=0,d=0,u=0;for(let O=0;O<9;O++)s.probe[O].set(0,0,0);let f=0,y=0,x=0,g=0,m=0,M=0,P=0,v=0,T=0,w=0,L=0,p=0,b=0,I=0;c.sort(r_);for(let O=0,H=c.length;O<H;O++){let F=c[O],W=F.color,j=F.intensity,Y=F.distance,le=null;if(F.shadow&&F.shadow.map&&(F.shadow.map.texture.format===Di?le=F.shadow.map.texture:le=F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)h+=W.r*j,d+=W.g*j,u+=W.b*j;else if(F.isLightProbe){for(let K=0;K<9;K++)s.probe[K].addScaledVector(F.sh.coefficients[K],j);I++}else if(F.isSunLight){let K=e.get(F);if(K.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let ne=F.shadow,oe=t.get(F);oe.shadowIntensity=ne.intensity,oe.shadowBias=ne.bias,oe.shadowNormalBias=ne.normalBias,oe.shadowRadius=ne.radius,oe.shadowMapSize.copy(ne.mapSize).multiply(ne.getFrameExtents()),s.sunShadow[y]=oe,s.sunShadowMap[y]=le;let Fe=ne.getViewportCount();for(let Ae=0;Ae<Fe;Ae++)s.sunShadowMatrix[x+Ae]=ne.getMatrix(Ae),s.sunShadowCascade[x+Ae]=ne._cascadeData[Ae];x+=Fe,y++}s.sun[f]=K,f++}else if(F.isDirectionalLight){let K=e.get(F);if(K.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let ne=F.shadow,oe=t.get(F);oe.shadowIntensity=ne.intensity,oe.shadowBias=ne.bias,oe.shadowNormalBias=ne.normalBias,oe.shadowRadius=ne.radius,oe.shadowMapSize=ne.mapSize,s.directionalShadow[g]=oe,s.directionalShadowMap[g]=le,s.directionalShadowMatrix[g]=F.shadow.matrix,T++}s.directional[g]=K,g++}else if(F.isSpotLight){let K=e.get(F);K.position.setFromMatrixPosition(F.matrixWorld),K.color.copy(W).multiplyScalar(j),K.distance=Y,K.coneCos=Math.cos(F.angle),K.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),K.decay=F.decay,s.spot[M]=K;let ne=F.shadow;if(F.map&&(s.spotLightMap[p]=F.map,p++,ne.updateMatrices(F),F.castShadow&&b++),s.spotLightMatrix[M]=ne.matrix,F.castShadow){let oe=t.get(F);oe.shadowIntensity=ne.intensity,oe.shadowBias=ne.bias,oe.shadowNormalBias=ne.normalBias,oe.shadowRadius=ne.radius,oe.shadowMapSize=ne.mapSize,s.spotShadow[M]=oe,s.spotShadowMap[M]=le,L++}M++}else if(F.isRectAreaLight){let K=e.get(F);K.color.copy(W).multiplyScalar(j),K.halfWidth.set(F.width*.5,0,0),K.halfHeight.set(0,F.height*.5,0),s.rectArea[P]=K,P++}else if(F.isPointLight){let K=e.get(F);if(K.color.copy(F.color).multiplyScalar(F.intensity),K.distance=F.distance,K.decay=F.decay,F.castShadow){let ne=F.shadow,oe=t.get(F);oe.shadowIntensity=ne.intensity,oe.shadowBias=ne.bias,oe.shadowNormalBias=ne.normalBias,oe.shadowRadius=ne.radius,oe.shadowMapSize=ne.mapSize,oe.shadowCameraNear=ne.camera.near,oe.shadowCameraFar=ne.camera.far,s.pointShadow[m]=oe,s.pointShadowMap[m]=le,s.pointShadowMatrix[m]=F.shadow.matrix,w++}s.point[m]=K,m++}else if(F.isHemisphereLight){let K=e.get(F);K.skyColor.copy(F.color).multiplyScalar(j),K.groundColor.copy(F.groundColor).multiplyScalar(j),s.hemi[v]=K,v++}}P>0&&(i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Ee.LTC_FLOAT_1,s.rectAreaLTC2=Ee.LTC_FLOAT_2):(s.rectAreaLTC1=Ee.LTC_HALF_1,s.rectAreaLTC2=Ee.LTC_HALF_2)),s.ambient[0]=h,s.ambient[1]=d,s.ambient[2]=u;let N=s.hash;(N.sunLength!==f||N.directionalLength!==g||N.pointLength!==m||N.spotLength!==M||N.rectAreaLength!==P||N.hemiLength!==v||N.numSunShadows!==y||N.numDirectionalShadows!==T||N.numPointShadows!==w||N.numSpotShadows!==L||N.numSpotMaps!==p||N.numLightProbes!==I)&&(s.sun.length=f,s.directional.length=g,s.spot.length=M,s.rectArea.length=P,s.point.length=m,s.hemi.length=v,s.sunShadow.length=y,s.sunShadowMap.length=y,s.sunShadowMatrix.length=x,s.sunShadowCascade.length=x,s.directionalShadow.length=T,s.directionalShadowMap.length=T,s.directionalShadowMatrix.length=T,s.pointShadow.length=w,s.pointShadowMap.length=w,s.pointShadowMatrix.length=w,s.spotShadow.length=L,s.spotShadowMap.length=L,s.spotLightMatrix.length=L+p-b,s.spotLightMap.length=p,s.numSpotLightShadowsWithMaps=b,s.numLightProbes=I,N.sunLength=f,N.directionalLength=g,N.pointLength=m,N.spotLength=M,N.rectAreaLength=P,N.hemiLength=v,N.numSunShadows=y,N.numDirectionalShadows=T,N.numPointShadows=w,N.numSpotShadows=L,N.numSpotMaps=p,N.numLightProbes=I,s.version=s_++)}function l(c,h){let d=0,u=0,f=0,y=0,x=0,g=0,m=h.matrixWorldInverse;for(let M=0,P=c.length;M<P;M++){let v=c[M];if(v.isSunLight){let T=s.sun[d];T.direction.setFromMatrixPosition(v.matrixWorld),T.direction.transformDirection(m),d++}else if(v.isDirectionalLight){let T=s.directional[u];T.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(m),u++}else if(v.isSpotLight){let T=s.spot[y];T.position.setFromMatrixPosition(v.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(m),y++}else if(v.isRectAreaLight){let T=s.rectArea[x];T.position.setFromMatrixPosition(v.matrixWorld),T.position.applyMatrix4(m),a.identity(),n.copy(v.matrixWorld),n.premultiply(m),a.extractRotation(n),T.halfWidth.set(v.width*.5,0,0),T.halfHeight.set(0,v.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),x++}else if(v.isPointLight){let T=s.point[f];T.position.setFromMatrixPosition(v.matrixWorld),T.position.applyMatrix4(m),f++}else if(v.isHemisphereLight){let T=s.hemi[g];T.direction.setFromMatrixPosition(v.matrixWorld),T.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:s}}function Hd(i){let e=new o_(i),t=[],s=[],r=[];function n(u){d.camera=u,t.length=0,s.length=0,r.length=0}function a(u){t.push(u)}function o(u){s.push(u)}function l(u){r.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:s,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:n,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function a_(i){let e=new WeakMap;function t(r,n=0){let a=e.get(r),o;return a===void 0?(o=new Hd(i),e.set(r,[o])):n>=a.length?(o=new Hd(i),a.push(o)):o=a[n],o}function s(){e=new WeakMap}return{get:t,dispose:s}}var l_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,c_=`uniform sampler2D shadow_pass;
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
}`,h_=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],u_=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],Gd=new vt,lo=new C,Ph=new C;function d_(i,e,t){let s=new ks,r=new Me,n=new Me,a=new Et,o=new za,l=new Va,c={},h=t.maxTextureSize,d={[Ri]:Jt,[Jt]:Ri,[bn]:bn},u=new mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Me},radius:{value:4}},vertexShader:l_,fragmentShader:c_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let y=new It;y.setAttribute("position",new un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new jt(y,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=es;let m=this.type;this.render=function(w,L,p){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===Fu&&(He("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=es);let b=i.getRenderTarget(),I=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Zn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let H=m!==this.type;H&&L.traverse(function(F){F.material&&(Array.isArray(F.material)?F.material.forEach(W=>W.needsUpdate=!0):F.material.needsUpdate=!0)});for(let F=0,W=w.length;F<W;F++){let j=w[F],Y=j.shadow;if(Y===void 0){He("WebGLShadowMap:",j,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;r.copy(Y.mapSize);let le=Y.getFrameExtents();r.multiply(le),n.copy(Y.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(n.x=Math.floor(h/le.x),r.x=n.x*le.x,Y.mapSize.x=n.x),r.y>h&&(n.y=Math.floor(h/le.y),r.y=n.y*le.y,Y.mapSize.y=n.y));let K=i.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=K,Y.map===null||H===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===qs){if(j.isPointLight){He("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new tn(r.x,r.y,{format:Di,type:Fn,minFilter:zt,magFilter:zt,generateMipmaps:!1}),Y.map.texture.name=j.name+".shadowMap",Y.map.depthTexture=new Si(r.x,r.y,On),Y.map.depthTexture.name=j.name+".shadowMapDepth",Y.map.depthTexture.format=$n,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Bt,Y.map.depthTexture.magFilter=Bt}else j.isPointLight?(Y.map=new Xl(r.x),Y.map.depthTexture=new Ia(r.x,Un)):(Y.map=new tn(r.x,r.y),Y.map.depthTexture=new Si(r.x,r.y,Un)),Y.map.depthTexture.name=j.name+".shadowMap",Y.map.depthTexture.format=$n,this.type===es?(Y.map.depthTexture.compareFunction=K?Hl:Vl,Y.map.depthTexture.minFilter=zt,Y.map.depthTexture.magFilter=zt):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Bt,Y.map.depthTexture.magFilter=Bt);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==r.x||Y.map.height!==r.y)&&Y.map.setSize(r.x,r.y);let ne=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();j.isPointLight!==!0&&Y.updateMatrices(j,p);for(let oe=0;oe<ne;oe++){let Fe=Y.getCamera(oe);if(j.isPointLight){let Ae=Y.camera,tt=Y.matrix,ke=j.distance||Ae.far;ke!==Ae.far&&(Ae.far=ke,Ae.updateProjectionMatrix()),lo.setFromMatrixPosition(j.matrixWorld),Ae.position.copy(lo),Ph.copy(Ae.position),Ph.add(h_[oe]),Ae.up.copy(u_[oe]),Ae.lookAt(Ph),Ae.updateMatrixWorld(),tt.makeTranslation(-lo.x,-lo.y,-lo.z),Gd.multiplyMatrices(Ae.projectionMatrix,Ae.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(Gd,Ae.coordinateSystem,Ae.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)i.setRenderTarget(Y.map,oe),i.clear();else{oe===0&&(i.setRenderTarget(Y.map),i.clear());let Ae=Y.getViewport(oe);a.set(n.x*Ae.x,n.y*Ae.y,n.x*Ae.z,n.y*Ae.w),O.viewport(a)}s=Y.getFrustum(oe),v(L,p,Fe,j,this.type)}Y.isPointLightShadow!==!0&&this.type===qs&&M(Y,p),Y.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(b,I,N)};function M(w,L){let p=e.update(x);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null?w.mapPass=new tn(r.x,r.y,{format:Di,type:Fn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value.set(w.map.width,w.map.height),u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(L,null,p,u,x,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(L,null,p,f,x,null)}function P(w,L,p,b){let I=null,N=p.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(N!==void 0)I=N;else if(I=p.isPointLight===!0?l:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){let O=I.uuid,H=L.uuid,F=c[O];F===void 0&&(F={},c[O]=F);let W=F[H];W===void 0&&(W=I.clone(),F[H]=W,L.addEventListener("dispose",T)),I=W}if(I.visible=L.visible,I.wireframe=L.wireframe,b===qs?I.side=L.shadowSide!==null?L.shadowSide:L.side:I.side=L.shadowSide!==null?L.shadowSide:d[L.side],I.alphaMap=L.alphaMap,I.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,I.map=L.map,I.clipShadows=L.clipShadows,I.clippingPlanes=L.clippingPlanes,I.clipIntersection=L.clipIntersection,I.displacementMap=L.displacementMap,I.displacementScale=L.displacementScale,I.displacementBias=L.displacementBias,I.wireframeLinewidth=L.wireframeLinewidth,I.linewidth=L.linewidth,p.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let O=i.properties.get(I);O.light=p}return I}function v(w,L,p,b,I){if(w.visible===!1)return;if(w.layers.test(L.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&I===qs)&&(!w.frustumCulled||w.intersectsFrustum(s))){w.modelViewMatrix.multiplyMatrices(p.matrixWorldInverse,w.matrixWorld);let H=e.update(w),F=w.material;if(Array.isArray(F)){let W=H.groups;for(let j=0,Y=W.length;j<Y;j++){let le=W[j],K=F[le.materialIndex];if(K&&K.visible){let ne=P(w,K,b,I);w.onBeforeShadow(i,w,L,p,H,ne,le),i.renderBufferDirect(p,null,H,ne,w,le),w.onAfterShadow(i,w,L,p,H,ne,le)}}}else if(F.visible){let W=P(w,F,b,I);w.onBeforeShadow(i,w,L,p,H,W,null),i.renderBufferDirect(p,null,H,W,w,null),w.onAfterShadow(i,w,L,p,H,W,null)}}let O=w.children;for(let H=0,F=O.length;H<F;H++)v(O[H],L,p,b,I)}function T(w){w.target.removeEventListener("dispose",T);for(let p in c){let b=c[p],I=w.target.uuid;I in b&&(b[I].dispose(),delete b[I])}}}function f_(i,e){function t(){let k=!1,ge=new Et,ie=null,xe=new Et(0,0,0,0);return{setMask:function(be){ie!==be&&!k&&(i.colorMask(be,be,be,be),ie=be)},setLocked:function(be){k=be},setClear:function(be,ae,Oe,Ue,_t){_t===!0&&(be*=Ue,ae*=Ue,Oe*=Ue),ge.set(be,ae,Oe,Ue),xe.equals(ge)===!1&&(i.clearColor(be,ae,Oe,Ue),xe.copy(ge))},reset:function(){k=!1,ie=null,xe.set(-1,0,0,0)}}}function s(){let k=!1,ge=!1,ie=null,xe=null,be=null;return{setReversed:function(ae){if(ge!==ae){let Oe=e.get("EXT_clip_control");ae?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT),ge=ae;let Ue=be;be=null,this.setClear(Ue)}},getReversed:function(){return ge},setTest:function(ae){ae?re(i.DEPTH_TEST):Ce(i.DEPTH_TEST)},setMask:function(ae){ie!==ae&&!k&&(i.depthMask(ae),ie=ae)},setFunc:function(ae){if(ge&&(ae=yd[ae]),xe!==ae){switch(ae){case fa:i.depthFunc(i.NEVER);break;case pa:i.depthFunc(i.ALWAYS);break;case ma:i.depthFunc(i.LESS);break;case Is:i.depthFunc(i.LEQUAL);break;case ga:i.depthFunc(i.EQUAL);break;case ya:i.depthFunc(i.GEQUAL);break;case _a:i.depthFunc(i.GREATER);break;case xa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}xe=ae}},setLocked:function(ae){k=ae},setClear:function(ae){be!==ae&&(be=ae,ge&&(ae=1-ae),i.clearDepth(ae))},reset:function(){k=!1,ie=null,xe=null,be=null,ge=!1}}}function r(){let k=!1,ge=null,ie=null,xe=null,be=null,ae=null,Oe=null,Ue=null,_t=null;return{setTest:function(ht){k||(ht?re(i.STENCIL_TEST):Ce(i.STENCIL_TEST))},setMask:function(ht){ge!==ht&&!k&&(i.stencilMask(ht),ge=ht)},setFunc:function(ht,Qt,Rt){(ie!==ht||xe!==Qt||be!==Rt)&&(i.stencilFunc(ht,Qt,Rt),ie=ht,xe=Qt,be=Rt)},setOp:function(ht,Qt,Rt){(ae!==ht||Oe!==Qt||Ue!==Rt)&&(i.stencilOp(ht,Qt,Rt),ae=ht,Oe=Qt,Ue=Rt)},setLocked:function(ht){k=ht},setClear:function(ht){_t!==ht&&(i.clearStencil(ht),_t=ht)},reset:function(){k=!1,ge=null,ie=null,xe=null,be=null,ae=null,Oe=null,Ue=null,_t=null}}}let n=new t,a=new s,o=new r,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,y=[],x=null,g=!1,m=null,M=null,P=null,v=null,T=null,w=null,L=null,p=new je(0,0,0),b=0,I=!1,N=null,O=null,H=null,F=null,W=null,j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,le=0,K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(le=parseFloat(/^WebGL (\d)/.exec(K)[1]),Y=le>=1):K.indexOf("OpenGL ES")!==-1&&(le=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),Y=le>=2);let ne=null,oe={},Fe=i.getParameter(i.SCISSOR_BOX),Ae=i.getParameter(i.VIEWPORT),tt=new Et().fromArray(Fe),ke=new Et().fromArray(Ae);function at(k,ge,ie,xe){let be=new Uint8Array(4),ae=i.createTexture();i.bindTexture(k,ae),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Oe=0;Oe<ie;Oe++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(ge,0,i.RGBA,1,1,xe,0,i.RGBA,i.UNSIGNED_BYTE,be):i.texImage2D(ge+Oe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,be);return ae}let Q={};Q[i.TEXTURE_2D]=at(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=at(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=at(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=at(i.TEXTURE_3D,i.TEXTURE_3D,1,1),n.setClear(0,0,0,1),a.setClear(1),o.setClear(0),re(i.DEPTH_TEST),a.setFunc(Is),et(!1),ft(Zc),re(i.CULL_FACE),me(Zn);function re(k){h[k]!==!0&&(i.enable(k),h[k]=!0)}function Ce(k){h[k]!==!1&&(i.disable(k),h[k]=!1)}function We(k,ge){return u[k]!==ge?(i.bindFramebuffer(k,ge),u[k]=ge,k===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ge),k===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ge),!0):!1}function Re(k,ge){let ie=y,xe=!1;if(k){ie=f.get(ge),ie===void 0&&(ie=[],f.set(ge,ie));let be=k.textures;if(ie.length!==be.length||ie[0]!==i.COLOR_ATTACHMENT0){for(let ae=0,Oe=be.length;ae<Oe;ae++)ie[ae]=i.COLOR_ATTACHMENT0+ae;ie.length=be.length,xe=!0}}else ie[0]!==i.BACK&&(ie[0]=i.BACK,xe=!0);xe&&i.drawBuffers(ie)}function qe(k){return x!==k?(i.useProgram(k),x=k,!0):!1}let ue={[ts]:i.FUNC_ADD,[ku]:i.FUNC_SUBTRACT,[zu]:i.FUNC_REVERSE_SUBTRACT};ue[Vu]=i.MIN,ue[Hu]=i.MAX;let Ie={[Gu]:i.ZERO,[Wu]:i.ONE,[qu]:i.SRC_COLOR,[Qc]:i.SRC_ALPHA,[Ju]:i.SRC_ALPHA_SATURATE,[Zu]:i.DST_COLOR,[$u]:i.DST_ALPHA,[Xu]:i.ONE_MINUS_SRC_COLOR,[eh]:i.ONE_MINUS_SRC_ALPHA,[ju]:i.ONE_MINUS_DST_COLOR,[Yu]:i.ONE_MINUS_DST_ALPHA,[Ku]:i.CONSTANT_COLOR,[Qu]:i.ONE_MINUS_CONSTANT_COLOR,[ed]:i.CONSTANT_ALPHA,[td]:i.ONE_MINUS_CONSTANT_ALPHA};function me(k,ge,ie,xe,be,ae,Oe,Ue,_t,ht){if(k===Zn){g===!0&&(Ce(i.BLEND),g=!1);return}if(g===!1&&(re(i.BLEND),g=!0),k!==Bu){if(k!==m||ht!==I){if((M!==ts||T!==ts)&&(i.blendEquation(i.FUNC_ADD),M=ts,T=ts),ht)switch(k){case Xs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case jc:i.blendFunc(i.ONE,i.ONE);break;case Jc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Kc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ge("WebGLState: Invalid blending: ",k);break}else switch(k){case Xs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case jc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Jc:Ge("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Kc:Ge("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ge("WebGLState: Invalid blending: ",k);break}P=null,v=null,w=null,L=null,p.set(0,0,0),b=0,m=k,I=ht}return}be=be||ge,ae=ae||ie,Oe=Oe||xe,(ge!==M||be!==T)&&(i.blendEquationSeparate(ue[ge],ue[be]),M=ge,T=be),(ie!==P||xe!==v||ae!==w||Oe!==L)&&(i.blendFuncSeparate(Ie[ie],Ie[xe],Ie[ae],Ie[Oe]),P=ie,v=xe,w=ae,L=Oe),(Ue.equals(p)===!1||_t!==b)&&(i.blendColor(Ue.r,Ue.g,Ue.b,_t),p.copy(Ue),b=_t),m=k,I=!1}function $e(k,ge){k.side===bn?Ce(i.CULL_FACE):re(i.CULL_FACE);let ie=k.side===Jt;ge&&(ie=!ie),et(ie),k.blending===Xs&&k.transparent===!1?me(Zn):me(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),n.setMask(k.colorWrite);let xe=k.stencilWrite;o.setTest(xe),xe&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Vt(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?re(i.SAMPLE_ALPHA_TO_COVERAGE):Ce(i.SAMPLE_ALPHA_TO_COVERAGE)}function et(k){N!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),N=k)}function ft(k){k!==Uu?(re(i.CULL_FACE),k!==O&&(k===Zc?i.cullFace(i.BACK):k===Ou?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ce(i.CULL_FACE),O=k}function St(k){k!==H&&(Y&&i.lineWidth(k),H=k)}function Vt(k,ge,ie){k?(re(i.POLYGON_OFFSET_FILL),(F!==ge||W!==ie)&&(F=ge,W=ie,a.getReversed()&&(ge=-ge),i.polygonOffset(ge,ie))):Ce(i.POLYGON_OFFSET_FILL)}function Mt(k){k?re(i.SCISSOR_TEST):Ce(i.SCISSOR_TEST)}function Tt(k){k===void 0&&(k=i.TEXTURE0+j-1),ne!==k&&(i.activeTexture(k),ne=k)}function z(k,ge,ie){ie===void 0&&(ne===null?ie=i.TEXTURE0+j-1:ie=ne);let xe=oe[ie];xe===void 0&&(xe={type:void 0,texture:void 0},oe[ie]=xe),(xe.type!==k||xe.texture!==ge)&&(ne!==ie&&(i.activeTexture(ie),ne=ie),i.bindTexture(k,ge||Q[k]),xe.type=k,xe.texture=ge)}function Ot(){let k=oe[ne];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function ut(){try{i.compressedTexImage2D(...arguments)}catch(k){Ge("WebGLState:",k)}}function D(){try{i.compressedTexImage3D(...arguments)}catch(k){Ge("WebGLState:",k)}}function _(){try{i.texSubImage2D(...arguments)}catch(k){Ge("WebGLState:",k)}}function q(){try{i.texSubImage3D(...arguments)}catch(k){Ge("WebGLState:",k)}}function Z(){try{i.compressedTexSubImage2D(...arguments)}catch(k){Ge("WebGLState:",k)}}function ee(){try{i.compressedTexSubImage3D(...arguments)}catch(k){Ge("WebGLState:",k)}}function de(){try{i.texStorage2D(...arguments)}catch(k){Ge("WebGLState:",k)}}function ye(){try{i.texStorage3D(...arguments)}catch(k){Ge("WebGLState:",k)}}function te(){try{i.texImage2D(...arguments)}catch(k){Ge("WebGLState:",k)}}function se(){try{i.texImage3D(...arguments)}catch(k){Ge("WebGLState:",k)}}function ve(k){return d[k]!==void 0?d[k]:i.getParameter(k)}function Be(k,ge){d[k]!==ge&&(i.pixelStorei(k,ge),d[k]=ge)}function _e(k){tt.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),tt.copy(k))}function Se(k){ke.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),ke.copy(k))}function De(k,ge){let ie=c.get(ge);ie===void 0&&(ie=new WeakMap,c.set(ge,ie));let xe=ie.get(k);xe===void 0&&(xe=i.getUniformBlockIndex(ge,k.name),ie.set(k,xe))}function Ve(k,ge){let xe=c.get(ge).get(k);l.get(ge)!==xe&&(i.uniformBlockBinding(ge,xe,k.__bindingPointIndex),l.set(ge,xe))}function Ye(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},ne=null,oe={},u={},f=new WeakMap,y=[],x=null,g=!1,m=null,M=null,P=null,v=null,T=null,w=null,L=null,p=new je(0,0,0),b=0,I=!1,N=null,O=null,H=null,F=null,W=null,tt.set(0,0,i.canvas.width,i.canvas.height),ke.set(0,0,i.canvas.width,i.canvas.height),n.reset(),a.reset(),o.reset()}return{buffers:{color:n,depth:a,stencil:o},enable:re,disable:Ce,bindFramebuffer:We,drawBuffers:Re,useProgram:qe,setBlending:me,setMaterial:$e,setFlipSided:et,setCullFace:ft,setLineWidth:St,setPolygonOffset:Vt,setScissorTest:Mt,activeTexture:Tt,bindTexture:z,unbindTexture:Ot,compressedTexImage2D:ut,compressedTexImage3D:D,texImage2D:te,texImage3D:se,pixelStorei:Be,getParameter:ve,updateUBOMapping:De,uniformBlockBinding:Ve,texStorage2D:de,texStorage3D:ye,texSubImage2D:_,texSubImage3D:q,compressedTexSubImage2D:Z,compressedTexSubImage3D:ee,scissor:_e,viewport:Se,reset:Ye}}function p_(i,e,t,s,r,n,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Me,h=new WeakMap,d=new Set,u,f=new WeakMap,y=!1;try{y=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(D,_){return y?new OffscreenCanvas(D,_):Ar("canvas")}function g(D,_,q){let Z=1,ee=ut(D);if((ee.width>q||ee.height>q)&&(Z=q/Math.max(ee.width,ee.height)),Z<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){let de=Math.floor(Z*ee.width),ye=Math.floor(Z*ee.height);u===void 0&&(u=x(de,ye));let te=_?x(de,ye):u;return te.width=de,te.height=ye,te.getContext("2d").drawImage(D,0,0,de,ye),He("WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+de+"x"+ye+")."),te}else return"data"in D&&He("WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),D;return D}function m(D){return D.generateMipmaps}function M(D){i.generateMipmap(D)}function P(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(D,_,q,Z,ee,de=!1){if(D!==null){if(i[D]!==void 0)return i[D];He("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let ye;Z&&(ye=e.get("EXT_texture_norm16"),ye||He("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let te=_;if(_===i.RED&&(q===i.FLOAT&&(te=i.R32F),q===i.HALF_FLOAT&&(te=i.R16F),q===i.UNSIGNED_BYTE&&(te=i.R8),q===i.UNSIGNED_SHORT&&ye&&(te=ye.R16_EXT),q===i.SHORT&&ye&&(te=ye.R16_SNORM_EXT)),_===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(te=i.R8UI),q===i.UNSIGNED_SHORT&&(te=i.R16UI),q===i.UNSIGNED_INT&&(te=i.R32UI),q===i.BYTE&&(te=i.R8I),q===i.SHORT&&(te=i.R16I),q===i.INT&&(te=i.R32I)),_===i.RG&&(q===i.FLOAT&&(te=i.RG32F),q===i.HALF_FLOAT&&(te=i.RG16F),q===i.UNSIGNED_BYTE&&(te=i.RG8),q===i.UNSIGNED_SHORT&&ye&&(te=ye.RG16_EXT),q===i.SHORT&&ye&&(te=ye.RG16_SNORM_EXT)),_===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(te=i.RG8UI),q===i.UNSIGNED_SHORT&&(te=i.RG16UI),q===i.UNSIGNED_INT&&(te=i.RG32UI),q===i.BYTE&&(te=i.RG8I),q===i.SHORT&&(te=i.RG16I),q===i.INT&&(te=i.RG32I)),_===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(te=i.RGB8UI),q===i.UNSIGNED_SHORT&&(te=i.RGB16UI),q===i.UNSIGNED_INT&&(te=i.RGB32UI),q===i.BYTE&&(te=i.RGB8I),q===i.SHORT&&(te=i.RGB16I),q===i.INT&&(te=i.RGB32I)),_===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(te=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(te=i.RGBA16UI),q===i.UNSIGNED_INT&&(te=i.RGBA32UI),q===i.BYTE&&(te=i.RGBA8I),q===i.SHORT&&(te=i.RGBA16I),q===i.INT&&(te=i.RGBA32I)),_===i.RGB&&(q===i.UNSIGNED_SHORT&&ye&&(te=ye.RGB16_EXT),q===i.SHORT&&ye&&(te=ye.RGB16_SNORM_EXT),q===i.UNSIGNED_INT_5_9_9_9_REV&&(te=i.RGB9_E5),q===i.UNSIGNED_INT_10F_11F_11F_REV&&(te=i.R11F_G11F_B10F)),_===i.RGBA){let se=de?Tr:ot.getTransfer(ee);q===i.FLOAT&&(te=i.RGBA32F),q===i.HALF_FLOAT&&(te=i.RGBA16F),q===i.UNSIGNED_BYTE&&(te=se===dt?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT&&ye&&(te=ye.RGBA16_EXT),q===i.SHORT&&ye&&(te=ye.RGBA16_SNORM_EXT),q===i.UNSIGNED_SHORT_4_4_4_4&&(te=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(te=i.RGB5_A1)}return(te===i.R16F||te===i.R32F||te===i.RG16F||te===i.RG32F||te===i.RGBA16F||te===i.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function T(D,_){let q;return D?_===null||_===Un||_===Ys?q=i.DEPTH24_STENCIL8:_===On?q=i.DEPTH32F_STENCIL8:_===$s&&(q=i.DEPTH24_STENCIL8,He("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Un||_===Ys?q=i.DEPTH_COMPONENT24:_===On?q=i.DEPTH_COMPONENT32F:_===$s&&(q=i.DEPTH_COMPONENT16),q}function w(D,_){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==Bt&&D.minFilter!==zt?Math.log2(Math.max(_.width,_.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?_.mipmaps.length:1}function L(D){let _=D.target;_.removeEventListener("dispose",L),b(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&d.delete(_)}function p(D){let _=D.target;_.removeEventListener("dispose",p),N(_)}function b(D){let _=s.get(D);if(_.__webglInit===void 0)return;let q=D.source,Z=f.get(q);if(Z){let ee=Z[_.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&I(D),Object.keys(Z).length===0&&f.delete(q)}s.remove(D)}function I(D){let _=s.get(D);i.deleteTexture(_.__webglTexture);let q=D.source,Z=f.get(q);delete Z[_.__cacheKey],a.memory.textures--}function N(D){let _=s.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),s.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(_.__webglFramebuffer[Z]))for(let ee=0;ee<_.__webglFramebuffer[Z].length;ee++)i.deleteFramebuffer(_.__webglFramebuffer[Z][ee]);else i.deleteFramebuffer(_.__webglFramebuffer[Z]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Z])}else{if(Array.isArray(_.__webglFramebuffer))for(let Z=0;Z<_.__webglFramebuffer.length;Z++)i.deleteFramebuffer(_.__webglFramebuffer[Z]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Z=0;Z<_.__webglColorRenderbuffer.length;Z++)_.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Z]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let q=D.textures;for(let Z=0,ee=q.length;Z<ee;Z++){let de=s.get(q[Z]);de.__webglTexture&&(i.deleteTexture(de.__webglTexture),a.memory.textures--),s.remove(q[Z])}s.remove(D)}let O=0;function H(){O=0}function F(){return O}function W(D){O=D}function j(){let D=O;return D>=r.maxTextures&&He("WebGLTextures: Trying to use "+(D+1)+" texture units while this GPU supports only "+r.maxTextures),O+=1,D}function Y(D){let _=[];return _.push(D.wrapS),_.push(D.wrapT),_.push(D.wrapR||0),_.push(D.magFilter),_.push(D.minFilter),_.push(D.anisotropy),_.push(D.internalFormat),_.push(D.format),_.push(D.type),_.push(D.generateMipmaps),_.push(D.premultiplyAlpha),_.push(D.flipY),_.push(D.unpackAlignment),_.push(D.colorSpace),_.join()}function le(D,_){let q=s.get(D);if(D.isVideoTexture&&z(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&q.__version!==D.version){let Z=D.image;if(Z===null)He("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)He("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(q,D,_);return}}else D.isExternalTexture&&(q.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+_)}function K(D,_){let q=s.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&q.__version!==D.version){Ce(q,D,_);return}else D.isExternalTexture&&(q.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+_)}function ne(D,_){let q=s.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&q.__version!==D.version){Ce(q,D,_);return}t.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+_)}function oe(D,_){let q=s.get(D);if(D.isCubeDepthTexture!==!0&&D.version>0&&q.__version!==D.version){We(q,D,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+_)}let Fe={[va]:i.REPEAT,[Xn]:i.CLAMP_TO_EDGE,[Sa]:i.MIRRORED_REPEAT},Ae={[Bt]:i.NEAREST,[sd]:i.NEAREST_MIPMAP_NEAREST,[eo]:i.NEAREST_MIPMAP_LINEAR,[zt]:i.LINEAR,[il]:i.LINEAR_MIPMAP_NEAREST,[Ci]:i.LINEAR_MIPMAP_LINEAR},tt={[ld]:i.NEVER,[fd]:i.ALWAYS,[cd]:i.LESS,[Vl]:i.LEQUAL,[hd]:i.EQUAL,[Hl]:i.GEQUAL,[ud]:i.GREATER,[dd]:i.NOTEQUAL};function ke(D,_){if(_.type===On&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===zt||_.magFilter===il||_.magFilter===eo||_.magFilter===Ci||_.minFilter===zt||_.minFilter===il||_.minFilter===eo||_.minFilter===Ci)&&He("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,Fe[_.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,Fe[_.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,Fe[_.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,Ae[_.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,Ae[_.minFilter]),_.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,tt[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Bt||_.minFilter!==eo&&_.minFilter!==Ci||_.type===On&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||s.get(_).__currentAnisotropy){let q=e.get("EXT_texture_filter_anisotropic");i.texParameterf(D,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),s.get(_).__currentAnisotropy=_.anisotropy}}}function at(D,_){let q=!1;D.__webglInit===void 0&&(D.__webglInit=!0,_.addEventListener("dispose",L));let Z=_.source,ee=f.get(Z);ee===void 0&&(ee={},f.set(Z,ee));let de=Y(_);if(de!==D.__cacheKey){ee[de]===void 0&&(ee[de]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,q=!0),ee[de].usedTimes++;let ye=ee[D.__cacheKey];ye!==void 0&&(ee[D.__cacheKey].usedTimes--,ye.usedTimes===0&&I(_)),D.__cacheKey=de,D.__webglTexture=ee[de].texture}return q}function Q(D,_,q){return Math.floor(Math.floor(D/q)/_)}function re(D,_,q,Z){let de=D.updateRanges;if(de.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,q,Z,_.data);else{de.sort((Be,_e)=>Be.start-_e.start);let ye=0;for(let Be=1;Be<de.length;Be++){let _e=de[ye],Se=de[Be],De=_e.start+_e.count,Ve=Q(Se.start,_.width,4),Ye=Q(_e.start,_.width,4);Se.start<=De+1&&Ve===Ye&&Q(Se.start+Se.count-1,_.width,4)===Ve?_e.count=Math.max(_e.count,Se.start+Se.count-_e.start):(++ye,de[ye]=Se)}de.length=ye+1;let te=t.getParameter(i.UNPACK_ROW_LENGTH),se=t.getParameter(i.UNPACK_SKIP_PIXELS),ve=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Be=0,_e=de.length;Be<_e;Be++){let Se=de[Be],De=Math.floor(Se.start/4),Ve=Math.ceil(Se.count/4),Ye=De%_.width,k=Math.floor(De/_.width),ge=Ve,ie=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ye),t.pixelStorei(i.UNPACK_SKIP_ROWS,k),t.texSubImage2D(i.TEXTURE_2D,0,Ye,k,ge,ie,q,Z,_.data)}D.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,te),t.pixelStorei(i.UNPACK_SKIP_PIXELS,se),t.pixelStorei(i.UNPACK_SKIP_ROWS,ve)}}function Ce(D,_,q){let Z=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Z=i.TEXTURE_3D);let ee=at(D,_),de=_.source;t.bindTexture(Z,D.__webglTexture,i.TEXTURE0+q);let ye=s.get(de);if(de.version!==ye.__version||ee===!0){if(t.activeTexture(i.TEXTURE0+q),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let ie=ot.getPrimaries(ot.workingColorSpace),xe=_.colorSpace===ai?null:ot.getPrimaries(_.colorSpace),be=_.colorSpace===ai||ie===xe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,be)}t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment);let se=g(_.image,!1,r.maxTextureSize);se=Ot(_,se);let ve=n.convert(_.format,_.colorSpace),Be=n.convert(_.type),_e=v(_.internalFormat,ve,Be,_.normalized,_.colorSpace,_.isVideoTexture);ke(Z,_);let Se,De=_.mipmaps,Ve=_.isVideoTexture!==!0,Ye=ye.__version===void 0||ee===!0,k=de.dataReady,ge=w(_,se);if(_.isDepthTexture)_e=T(_.format===Ii,_.type),Ye&&(Ve?t.texStorage2D(i.TEXTURE_2D,1,_e,se.width,se.height):t.texImage2D(i.TEXTURE_2D,0,_e,se.width,se.height,0,ve,Be,null));else if(_.isDataTexture)if(De.length>0){Ve&&Ye&&t.texStorage2D(i.TEXTURE_2D,ge,_e,De[0].width,De[0].height);for(let ie=0,xe=De.length;ie<xe;ie++)Se=De[ie],Ve?k&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,Se.width,Se.height,ve,Be,Se.data):t.texImage2D(i.TEXTURE_2D,ie,_e,Se.width,Se.height,0,ve,Be,Se.data);_.generateMipmaps=!1}else Ve?(Ye&&t.texStorage2D(i.TEXTURE_2D,ge,_e,se.width,se.height),k&&re(_,se,ve,Be)):t.texImage2D(i.TEXTURE_2D,0,_e,se.width,se.height,0,ve,Be,se.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ve&&Ye&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,_e,De[0].width,De[0].height,se.depth);for(let ie=0,xe=De.length;ie<xe;ie++)if(Se=De[ie],_.format!==wn)if(ve!==null)if(Ve){if(k)if(_.layerUpdates.size>0){let be=bh(Se.width,Se.height,_.format,_.type);for(let ae of _.layerUpdates){let Oe=Se.data.subarray(ae*be/Se.data.BYTES_PER_ELEMENT,(ae+1)*be/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,ae,Se.width,Se.height,1,ve,Oe)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,Se.width,Se.height,se.depth,ve,Se.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,_e,Se.width,Se.height,se.depth,0,Se.data,0,0);else He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?k&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,Se.width,Se.height,se.depth,ve,Be,Se.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,_e,Se.width,Se.height,se.depth,0,ve,Be,Se.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Ve&&Ye&&t.texStorage2D(i.TEXTURE_2D,ge,_e,De[0].width,De[0].height);for(let ie=0,xe=De.length;ie<xe;ie++)Se=De[ie],_.format!==wn?ve!==null?Ve?k&&t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,Se.width,Se.height,ve,Se.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,_e,Se.width,Se.height,0,Se.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?k&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,Se.width,Se.height,ve,Be,Se.data):t.texImage2D(i.TEXTURE_2D,ie,_e,Se.width,Se.height,0,ve,Be,Se.data)}else if(_.isDataArrayTexture)if(Ve){if(Ye&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,_e,se.width,se.height,se.depth),k)if(_.layerUpdates.size>0){let ie=bh(se.width,se.height,_.format,_.type);for(let xe of _.layerUpdates){let be=se.data.subarray(xe*ie/se.data.BYTES_PER_ELEMENT,(xe+1)*ie/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,xe,se.width,se.height,1,ve,Be,be)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,ve,Be,se.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,_e,se.width,se.height,se.depth,0,ve,Be,se.data);else if(_.isData3DTexture)Ve?(Ye&&t.texStorage3D(i.TEXTURE_3D,ge,_e,se.width,se.height,se.depth),k&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,ve,Be,se.data)):t.texImage3D(i.TEXTURE_3D,0,_e,se.width,se.height,se.depth,0,ve,Be,se.data);else if(_.isFramebufferTexture){if(Ye)if(Ve)t.texStorage2D(i.TEXTURE_2D,ge,_e,se.width,se.height);else{let ie=se.width,xe=se.height;for(let be=0;be<ge;be++)t.texImage2D(i.TEXTURE_2D,be,_e,ie,xe,0,ve,Be,null),ie>>=1,xe>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in i){let ie=i.canvas;if(ie.hasAttribute("layoutsubtree")||ie.setAttribute("layoutsubtree","true"),se.parentNode!==ie){ie.appendChild(se),d.add(_),ie.onpaint=xe=>{let be=xe.changedElements;for(let ae of d)be.includes(ae.image)&&(ae.needsUpdate=!0)},ie.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,se);else{let be=i.RGBA,ae=i.RGBA,Oe=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,be,ae,Oe,se)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(De.length>0){if(Ve&&Ye){let ie=ut(De[0]);t.texStorage2D(i.TEXTURE_2D,ge,_e,ie.width,ie.height)}for(let ie=0,xe=De.length;ie<xe;ie++)Se=De[ie],Ve?k&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,ve,Be,Se):t.texImage2D(i.TEXTURE_2D,ie,_e,ve,Be,Se);_.generateMipmaps=!1}else if(Ve){if(Ye){let ie=ut(se);t.texStorage2D(i.TEXTURE_2D,ge,_e,ie.width,ie.height)}k&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ve,Be,se)}else t.texImage2D(i.TEXTURE_2D,0,_e,ve,Be,se);m(_)&&M(Z),ye.__version=de.version,_.onUpdate&&_.onUpdate(_)}D.__version=_.version}function We(D,_,q){if(_.image.length!==6)return;let Z=at(D,_),ee=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+q);let de=s.get(ee);if(ee.version!==de.__version||Z===!0){t.activeTexture(i.TEXTURE0+q);let ye=ot.getPrimaries(ot.workingColorSpace),te=_.colorSpace===ai?null:ot.getPrimaries(_.colorSpace),se=_.colorSpace===ai||ye===te?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);let ve=_.isCompressedTexture||_.image[0].isCompressedTexture,Be=_.image[0]&&_.image[0].isDataTexture,_e=[];for(let ae=0;ae<6;ae++)!ve&&!Be?_e[ae]=g(_.image[ae],!0,r.maxCubemapSize):_e[ae]=Be?_.image[ae].image:_.image[ae],_e[ae]=Ot(_,_e[ae]);let Se=_e[0],De=n.convert(_.format,_.colorSpace),Ve=n.convert(_.type),Ye=v(_.internalFormat,De,Ve,_.normalized,_.colorSpace),k=_.isVideoTexture!==!0,ge=de.__version===void 0||Z===!0,ie=ee.dataReady,xe=w(_,Se);ke(i.TEXTURE_CUBE_MAP,_);let be;if(ve){k&&ge&&t.texStorage2D(i.TEXTURE_CUBE_MAP,xe,Ye,Se.width,Se.height);for(let ae=0;ae<6;ae++){be=_e[ae].mipmaps;for(let Oe=0;Oe<be.length;Oe++){let Ue=be[Oe];_.format!==wn?De!==null?k?ie&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe,0,0,Ue.width,Ue.height,De,Ue.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe,Ye,Ue.width,Ue.height,0,Ue.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe,0,0,Ue.width,Ue.height,De,Ve,Ue.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe,Ye,Ue.width,Ue.height,0,De,Ve,Ue.data)}}}else{if(be=_.mipmaps,k&&ge){be.length>0&&xe++;let ae=ut(_e[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,xe,Ye,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(Be){k?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,_e[ae].width,_e[ae].height,De,Ve,_e[ae].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ye,_e[ae].width,_e[ae].height,0,De,Ve,_e[ae].data);for(let Oe=0;Oe<be.length;Oe++){let _t=be[Oe].image[ae].image;k?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe+1,0,0,_t.width,_t.height,De,Ve,_t.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe+1,Ye,_t.width,_t.height,0,De,Ve,_t.data)}}else{k?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,De,Ve,_e[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ye,De,Ve,_e[ae]);for(let Oe=0;Oe<be.length;Oe++){let Ue=be[Oe];k?ie&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe+1,0,0,De,Ve,Ue.image[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Oe+1,Ye,De,Ve,Ue.image[ae])}}}m(_)&&M(i.TEXTURE_CUBE_MAP),de.__version=ee.version,_.onUpdate&&_.onUpdate(_)}D.__version=_.version}function Re(D,_,q,Z,ee,de){let ye=n.convert(q.format,q.colorSpace),te=n.convert(q.type),se=v(q.internalFormat,ye,te,q.normalized,q.colorSpace),ve=s.get(_),Be=s.get(q);if(Be.__renderTarget=_,!ve.__hasExternalTextures){let _e=Math.max(1,_.width>>de),Se=Math.max(1,_.height>>de);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,de,se,_e,Se,_.depth,0,ye,te,null):t.texImage2D(ee,de,se,_e,Se,0,ye,te,null)}t.bindFramebuffer(i.FRAMEBUFFER,D),Tt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,ee,Be.__webglTexture,0,Mt(_)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,ee,Be.__webglTexture,de),t.bindFramebuffer(i.FRAMEBUFFER,null)}function qe(D,_,q){if(i.bindRenderbuffer(i.RENDERBUFFER,D),_.depthBuffer){let Z=_.depthTexture,ee=Z&&Z.isDepthTexture?Z.type:null,de=T(_.stencilBuffer,ee),ye=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Tt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Mt(_),de,_.width,_.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt(_),de,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,de,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ye,i.RENDERBUFFER,D)}else{let Z=_.textures;for(let ee=0;ee<Z.length;ee++){let de=Z[ee],ye=n.convert(de.format,de.colorSpace),te=n.convert(de.type),se=v(de.internalFormat,ye,te,de.normalized,de.colorSpace);Tt(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Mt(_),se,_.width,_.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt(_),se,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,se,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ue(D,_,q){let Z=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,D),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ee=s.get(_.depthTexture);if(ee.__renderTarget=_,(!ee.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Z){if(ee.__webglInit===void 0&&(ee.__webglInit=!0,_.depthTexture.addEventListener("dispose",L)),ee.__webglTexture===void 0){ee.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,ee.__webglTexture),ke(i.TEXTURE_CUBE_MAP,_.depthTexture);let ve=n.convert(_.depthTexture.format),Be=n.convert(_.depthTexture.type),_e;_.depthTexture.format===$n?_e=i.DEPTH_COMPONENT24:_.depthTexture.format===Ii&&(_e=i.DEPTH24_STENCIL8);for(let Se=0;Se<6;Se++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,_e,_.width,_.height,0,ve,Be,null)}}else le(_.depthTexture,0);let de=ee.__webglTexture,ye=Mt(_),te=Z?i.TEXTURE_CUBE_MAP_POSITIVE_X+q:i.TEXTURE_2D,se=_.depthTexture.format===Ii?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===$n)Tt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,se,te,de,0,ye):i.framebufferTexture2D(i.FRAMEBUFFER,se,te,de,0);else if(_.depthTexture.format===Ii)Tt(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,se,te,de,0,ye):i.framebufferTexture2D(i.FRAMEBUFFER,se,te,de,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ie(D){let _=s.get(D),q=D.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==D.depthTexture){let Z=D.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Z){let ee=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Z.removeEventListener("dispose",ee)};Z.addEventListener("dispose",ee),_.__depthDisposeCallback=ee}_.__boundDepthTexture=Z}if(D.depthTexture&&!_.__autoAllocateDepthBuffer)if(q)for(let Z=0;Z<6;Z++)ue(_.__webglFramebuffer[Z],D,Z);else{let Z=D.texture.mipmaps;Z&&Z.length>0?ue(_.__webglFramebuffer[0],D,0):ue(_.__webglFramebuffer,D,0)}else if(q){_.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Z]),_.__webglDepthbuffer[Z]===void 0)_.__webglDepthbuffer[Z]=i.createRenderbuffer(),qe(_.__webglDepthbuffer[Z],D,!1);else{let ee=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=_.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,de),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,de)}}else{let Z=D.texture.mipmaps;if(Z&&Z.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),qe(_.__webglDepthbuffer,D,!1);else{let ee=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,de=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,de),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,de)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function me(D,_,q){let Z=s.get(D);_!==void 0&&Re(Z.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&Ie(D)}function $e(D){let _=D.texture,q=s.get(D),Z=s.get(_);D.addEventListener("dispose",p);let ee=D.textures,de=D.isWebGLCubeRenderTarget===!0,ye=ee.length>1;if(ye||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=_.version,a.memory.textures++),de){q.__webglFramebuffer=[];for(let te=0;te<6;te++)if(_.mipmaps&&_.mipmaps.length>0){q.__webglFramebuffer[te]=[];for(let se=0;se<_.mipmaps.length;se++)q.__webglFramebuffer[te][se]=i.createFramebuffer()}else q.__webglFramebuffer[te]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){q.__webglFramebuffer=[];for(let te=0;te<_.mipmaps.length;te++)q.__webglFramebuffer[te]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(ye)for(let te=0,se=ee.length;te<se;te++){let ve=s.get(ee[te]);ve.__webglTexture===void 0&&(ve.__webglTexture=i.createTexture(),a.memory.textures++)}if(D.samples>0&&Tt(D)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let te=0;te<ee.length;te++){let se=ee[te];q.__webglColorRenderbuffer[te]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[te]);let ve=n.convert(se.format,se.colorSpace),Be=n.convert(se.type),_e=v(se.internalFormat,ve,Be,se.normalized,se.colorSpace,D.isXRRenderTarget===!0),Se=Mt(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,Se,_e,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+te,i.RENDERBUFFER,q.__webglColorRenderbuffer[te])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),qe(q.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(de){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),ke(i.TEXTURE_CUBE_MAP,_);for(let te=0;te<6;te++)if(_.mipmaps&&_.mipmaps.length>0)for(let se=0;se<_.mipmaps.length;se++)Re(q.__webglFramebuffer[te][se],D,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+te,se);else Re(q.__webglFramebuffer[te],D,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0);m(_)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let te=0,se=ee.length;te<se;te++){let ve=ee[te],Be=s.get(ve),_e=i.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(_e=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(_e,Be.__webglTexture),ke(_e,ve),Re(q.__webglFramebuffer,D,ve,i.COLOR_ATTACHMENT0+te,_e,0),m(ve)&&M(_e)}t.unbindTexture()}else{let te=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(te=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(te,Z.__webglTexture),ke(te,_),_.mipmaps&&_.mipmaps.length>0)for(let se=0;se<_.mipmaps.length;se++)Re(q.__webglFramebuffer[se],D,_,i.COLOR_ATTACHMENT0,te,se);else Re(q.__webglFramebuffer,D,_,i.COLOR_ATTACHMENT0,te,0);m(_)&&M(te),t.unbindTexture()}D.depthBuffer&&Ie(D)}function et(D){let _=D.textures;for(let q=0,Z=_.length;q<Z;q++){let ee=_[q];if(m(ee)){let de=P(D),ye=s.get(ee).__webglTexture;t.bindTexture(de,ye),M(de),t.unbindTexture()}}}let ft=[],St=[];function Vt(D){if(D.samples>0){if(Tt(D)===!1){let _=D.textures,q=D.width,Z=D.height,ee=i.COLOR_BUFFER_BIT,de=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ye=s.get(D),te=_.length>1;if(te)for(let ve=0;ve<_.length;ve++)t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer);let se=D.texture.mipmaps;se&&se.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let ve=0;ve<_.length;ve++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),te){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ye.__webglColorRenderbuffer[ve]);let Be=s.get(_[ve]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Be,0)}i.blitFramebuffer(0,0,q,Z,0,0,q,Z,ee,i.NEAREST),l===!0&&(ft.length=0,St.length=0,ft.push(i.COLOR_ATTACHMENT0+ve),D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&(ft.push(de),St.push(de),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,St)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ft))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),te)for(let ve=0;ve<_.length;ve++){t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.RENDERBUFFER,ye.__webglColorRenderbuffer[ve]);let Be=s.get(_[ve]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ve,i.TEXTURE_2D,Be,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&l){let _=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function Mt(D){return Math.min(r.maxSamples,D.samples)}function Tt(D){let _=s.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function z(D){let _=a.render.frame;h.get(D)!==_&&(h.set(D,_),D.update())}function Ot(D,_){let q=D.colorSpace,Z=D.format,ee=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||q!==Er&&q!==ai&&(ot.getTransfer(q)===dt?(Z!==wn||ee!==nn)&&He("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ge("WebGLTextures: Unsupported texture color space:",q)),_}function ut(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=j,this.resetTextureUnits=H,this.getTextureUnits=F,this.setTextureUnits=W,this.setTexture2D=le,this.setTexture2DArray=K,this.setTexture3D=ne,this.setTextureCube=oe,this.rebindTextures=me,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=et,this.updateMultisampleRenderTarget=Vt,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=Re,this.useMultisampledRTT=Tt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function m_(i,e){function t(s,r=ai){let n,a=ot.getTransfer(r);if(s===nn)return i.UNSIGNED_BYTE;if(s===rl)return i.UNSIGNED_SHORT_4_4_4_4;if(s===ol)return i.UNSIGNED_SHORT_5_5_5_1;if(s===uh)return i.UNSIGNED_INT_5_9_9_9_REV;if(s===dh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(s===ch)return i.BYTE;if(s===hh)return i.SHORT;if(s===$s)return i.UNSIGNED_SHORT;if(s===sl)return i.INT;if(s===Un)return i.UNSIGNED_INT;if(s===On)return i.FLOAT;if(s===Fn)return i.HALF_FLOAT;if(s===fh)return i.ALPHA;if(s===ph)return i.RGB;if(s===wn)return i.RGBA;if(s===$n)return i.DEPTH_COMPONENT;if(s===Ii)return i.DEPTH_STENCIL;if(s===mh)return i.RED;if(s===al)return i.RED_INTEGER;if(s===Di)return i.RG;if(s===ll)return i.RG_INTEGER;if(s===cl)return i.RGBA_INTEGER;if(s===to||s===no||s===io||s===so)if(a===dt)if(n=e.get("WEBGL_compressed_texture_s3tc_srgb"),n!==null){if(s===to)return n.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===no)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===io)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===so)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(n=e.get("WEBGL_compressed_texture_s3tc"),n!==null){if(s===to)return n.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===no)return n.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===io)return n.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===so)return n.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===hl||s===ul||s===dl||s===fl)if(n=e.get("WEBGL_compressed_texture_pvrtc"),n!==null){if(s===hl)return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===ul)return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===dl)return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===fl)return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===pl||s===ml||s===gl||s===yl||s===_l||s===ro||s===xl)if(n=e.get("WEBGL_compressed_texture_etc"),n!==null){if(s===pl||s===ml)return a===dt?n.COMPRESSED_SRGB8_ETC2:n.COMPRESSED_RGB8_ETC2;if(s===gl)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:n.COMPRESSED_RGBA8_ETC2_EAC;if(s===yl)return n.COMPRESSED_R11_EAC;if(s===_l)return n.COMPRESSED_SIGNED_R11_EAC;if(s===ro)return n.COMPRESSED_RG11_EAC;if(s===xl)return n.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===vl||s===Sl||s===Ml||s===bl||s===wl||s===El||s===Tl||s===Al||s===Rl||s===Pl||s===Cl||s===Il||s===Dl||s===Ll)if(n=e.get("WEBGL_compressed_texture_astc"),n!==null){if(s===vl)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:n.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Sl)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:n.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Ml)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:n.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===bl)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:n.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===wl)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:n.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===El)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:n.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Tl)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:n.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Al)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:n.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Rl)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:n.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Pl)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:n.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Cl)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:n.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Il)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:n.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Dl)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:n.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Ll)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:n.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Nl||s===Ul||s===Ol)if(n=e.get("EXT_texture_compression_bptc"),n!==null){if(s===Nl)return a===dt?n.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:n.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Ul)return n.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Ol)return n.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Fl||s===Bl||s===oo||s===kl)if(n=e.get("EXT_texture_compression_rgtc"),n!==null){if(s===Fl)return n.COMPRESSED_RED_RGTC1_EXT;if(s===Bl)return n.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===oo)return n.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===kl)return n.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Ys?i.UNSIGNED_INT_24_8:i[s]!==void 0?i[s]:null}return{convert:t}}var g_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,y_=`
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

}`,Fh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let s=new Br(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,s=new mn({vertexShader:g_,fragmentShader:y_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new jt(new Gr(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Bh=class extends In{constructor(e,t){super();let s=this,r=null,n=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,y=null,x=typeof XRWebGLBinding<"u",g=new Fh,m={},M=t.getContextAttributes(),P=null,v=null,T=[],w=[],L=new Me,p=null,b=null,I=new Xt;I.viewport=new Et;let N=new Xt;N.viewport=new Et;let O=[I,N],H=new el,F=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let re=T[Q];return re===void 0&&(re=new Fs,T[Q]=re),re.getTargetRaySpace()},this.getControllerGrip=function(Q){let re=T[Q];return re===void 0&&(re=new Fs,T[Q]=re),re.getGripSpace()},this.getHand=function(Q){let re=T[Q];return re===void 0&&(re=new Fs,T[Q]=re),re.getHandSpace()};function j(Q){let re=w.indexOf(Q.inputSource);if(re===-1)return;let Ce=T[re];Ce!==void 0&&(Ce.update(Q.inputSource,Q.frame,c||a),Ce.dispatchEvent({type:Q.type,data:Q.inputSource}))}function Y(){r.removeEventListener("select",j),r.removeEventListener("selectstart",j),r.removeEventListener("selectend",j),r.removeEventListener("squeeze",j),r.removeEventListener("squeezestart",j),r.removeEventListener("squeezeend",j),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",le);for(let Q=0;Q<T.length;Q++){let re=w[Q];re!==null&&(w[Q]=null,T[Q].disconnect(re))}F=null,W=null,g.reset();for(let Q in m)delete m[Q];if(e.setRenderTarget(P),f=null,u=null,d=null,r=null,v=null,at.stop(),s.isPresenting=!1,e.setPixelRatio(p),e.setSize(L.width,L.height,!1),b!==null){let Q=b.camera;Q.fov=b.fov,Q.zoom=b.zoom,Q.updateProjectionMatrix(),b=null}s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){n=Q,s.isPresenting===!0&&He("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,s.isPresenting===!0&&He("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return y},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(P=e.getRenderTarget(),r.addEventListener("select",j),r.addEventListener("selectstart",j),r.addEventListener("selectend",j),r.addEventListener("squeeze",j),r.addEventListener("squeezestart",j),r.addEventListener("squeezeend",j),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",le),M.xrCompatible!==!0&&await t.makeXRCompatible(),p=e.getPixelRatio(),e.getSize(L),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ce=null,We=null,Re=null;M.depth&&(Re=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ce=M.stencil?Ii:$n,We=M.stencil?Ys:Un);let qe={colorFormat:t.RGBA8,depthFormat:Re,scaleFactor:n};d=this.getBinding(),u=d.createProjectionLayer(qe),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),v=new tn(u.textureWidth,u.textureHeight,{format:wn,type:nn,depthTexture:new Si(u.textureWidth,u.textureHeight,We,void 0,void 0,void 0,void 0,void 0,void 0,Ce),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let Ce={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:n};f=new XRWebGLLayer(r,t,Ce),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new tn(f.framebufferWidth,f.framebufferHeight,{format:wn,type:nn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),at.setContext(r),at.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function le(Q){for(let re=0;re<Q.removed.length;re++){let Ce=Q.removed[re],We=w.indexOf(Ce);We>=0&&(w[We]=null,T[We].disconnect(Ce))}for(let re=0;re<Q.added.length;re++){let Ce=Q.added[re],We=w.indexOf(Ce);if(We===-1){for(let qe=0;qe<T.length;qe++)if(qe>=w.length){w.push(Ce),We=qe;break}else if(w[qe]===null){w[qe]=Ce,We=qe;break}if(We===-1)break}let Re=T[We];Re&&Re.connect(Ce)}}let K=new C,ne=new C;function oe(Q,re,Ce){K.setFromMatrixPosition(re.matrixWorld),ne.setFromMatrixPosition(Ce.matrixWorld);let We=K.distanceTo(ne),Re=re.projectionMatrix.elements,qe=Ce.projectionMatrix.elements,ue=Re[14]/(Re[10]-1),Ie=Re[14]/(Re[10]+1),me=(Re[9]+1)/Re[5],$e=(Re[9]-1)/Re[5],et=(Re[8]-1)/Re[0],ft=(qe[8]+1)/qe[0],St=ue*et,Vt=ue*ft,Mt=We/(-et+ft),Tt=Mt*-et;if(re.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Tt),Q.translateZ(Mt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Re[10]===-1)Q.projectionMatrix.copy(re.projectionMatrix),Q.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{let z=ue+Mt,Ot=Ie+Mt,ut=St-Tt,D=Vt+(We-Tt),_=me*Ie/Ot*z,q=$e*Ie/Ot*z;Q.projectionMatrix.makePerspective(ut,D,_,q,z,Ot),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function Fe(Q,re){re===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(re.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let re=Q.near,Ce=Q.far;g.texture!==null&&(g.depthNear>0&&(re=g.depthNear),g.depthFar>0&&(Ce=g.depthFar)),H.near=N.near=I.near=re,H.far=N.far=I.far=Ce,(F!==H.near||W!==H.far)&&(r.updateRenderState({depthNear:H.near,depthFar:H.far}),F=H.near,W=H.far),H.layers.mask=Q.layers.mask|6,I.layers.mask=H.layers.mask&-5,N.layers.mask=H.layers.mask&-3;let We=Q.parent,Re=H.cameras;Fe(H,We);for(let qe=0;qe<Re.length;qe++)Fe(Re[qe],We);Re.length===2?oe(H,I,N):H.projectionMatrix.copy(I.projectionMatrix),b===null&&Q.isPerspectiveCamera&&(b={camera:Q,fov:Q.fov,zoom:Q.zoom}),Ae(Q,H,We)};function Ae(Q,re,Ce){Ce===null?Q.matrix.copy(re.matrixWorld):(Q.matrix.copy(Ce.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(re.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(re.projectionMatrix),Q.projectionMatrixInverse.copy(re.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Ns*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Q){l=Q,u!==null&&(u.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(H)},this.getCameraTexture=function(Q){return m[Q]};let tt=null;function ke(Q,re){if(h=re.getViewerPose(c||a),y=re,h!==null){let Ce=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let We=!1;Ce.length!==H.cameras.length&&(H.cameras.length=0,We=!0);for(let Ie=0;Ie<Ce.length;Ie++){let me=Ce[Ie],$e=null;if(f!==null)$e=f.getViewport(me);else{let ft=d.getViewSubImage(u,me);$e=ft.viewport,Ie===0&&(e.setRenderTargetTextures(v,ft.colorTexture,ft.depthStencilTexture),e.setRenderTarget(v))}let et=O[Ie];et===void 0&&(et=new Xt,et.layers.enable(Ie),et.viewport=new Et,O[Ie]=et),et.matrix.fromArray(me.transform.matrix),et.matrix.decompose(et.position,et.quaternion,et.scale),et.projectionMatrix.fromArray(me.projectionMatrix),et.projectionMatrixInverse.copy(et.projectionMatrix).invert(),et.viewport.set($e.x,$e.y,$e.width,$e.height),Ie===0&&(H.matrix.copy(et.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),We===!0&&H.cameras.push(et)}let Re=r.enabledFeatures;if(Re&&Re.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){d=s.getBinding();let Ie=d.getDepthInformation(Ce[0]);Ie&&Ie.isValid&&Ie.texture&&g.init(Ie,r.renderState)}if(Re&&Re.includes("camera-access")&&x){e.state.unbindTexture(),d=s.getBinding();for(let Ie=0;Ie<Ce.length;Ie++){let me=Ce[Ie].camera;if(me){let $e=m[me];$e||($e=new Br,m[me]=$e);let et=d.getCameraImage(me);$e.sourceTexture=et}}}}for(let Ce=0;Ce<T.length;Ce++){let We=w[Ce],Re=T[Ce];We!==null&&Re!==void 0&&Re.update(We,re,c||a)}tt&&tt(Q,re),re.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:re}),y=null}let at=new Wd;at.setAnimationLoop(ke),this.setAnimationLoop=function(Q){tt=Q},this.dispose=function(){}}},__=new vt,jd=new Ze;jd.set(-1,0,0,0,1,0,0,0,1);function x_(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function s(g,m){m.color.getRGB(g.fogColor.value,vh(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function r(g,m,M,P,v){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?n(g,m):m.isMeshLambertMaterial?(n(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(n(g,m),d(g,m)):m.isMeshPhongMaterial?(n(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(n(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,v)):m.isMeshMatcapMaterial?(n(g,m),y(g,m)):m.isMeshDepthMaterial?n(g,m):m.isMeshDistanceMaterial?(n(g,m),x(g,m)):m.isMeshNormalMaterial?n(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,M,P):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function n(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Jt&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Jt&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let M=e.get(m),P=M.envMap,v=M.envMapRotation;P&&(g.envMap.value=P,g.envMapRotation.value.setFromMatrix4(__.makeRotationFromEuler(v)).transpose(),P.isCubeTexture&&P.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(jd),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,M,P){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*M,g.scale.value=P*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,M){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Jt&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function y(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){let M=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:r}}function v_(i,e,t,s){let r={},n={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,T){let w=T.program;s.uniformBlockBinding(v,w)}function c(v,T){let w=r[v.id];w===void 0&&(g(v),w=h(v),r[v.id]=w,v.addEventListener("dispose",M));let L=T.program;s.updateUBOMapping(v,L);let p=e.render.frame;n[v.id]!==p&&(u(v),n[v.id]=p)}function h(v){let T=d();v.__bindingPointIndex=T;let w=i.createBuffer(),L=v.__size,p=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,L,p),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,w),w}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Ge("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let T=r[v.id],w=v.uniforms,L=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let p=0,b=w.length;p<b;p++){let I=w[p];if(Array.isArray(I))for(let N=0,O=I.length;N<O;N++)f(I[N],p,N,L);else f(I,p,0,L)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,T,w,L){if(x(v,T,w,L)===!0){let p=v.__offset,b=v.value;if(Array.isArray(b)){let I=0;for(let N=0;N<b.length;N++){let O=b[N],H=m(O);y(O,v.__data,I),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(I+=H.storage/Float32Array.BYTES_PER_ELEMENT)}}else y(b,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,p,v.__data)}}function y(v,T,w){typeof v=="number"||typeof v=="boolean"?T[0]=v:v.isMatrix3?(T[0]=v.elements[0],T[1]=v.elements[1],T[2]=v.elements[2],T[3]=0,T[4]=v.elements[3],T[5]=v.elements[4],T[6]=v.elements[5],T[7]=0,T[8]=v.elements[6],T[9]=v.elements[7],T[10]=v.elements[8],T[11]=0):ArrayBuffer.isView(v)?T.set(new v.constructor(v.buffer,v.byteOffset,T.length)):v.toArray(T,w)}function x(v,T,w,L){let p=v.value,b=T+"_"+w;if(L[b]===void 0)return typeof p=="number"||typeof p=="boolean"?L[b]=p:ArrayBuffer.isView(p)?L[b]=p.slice():L[b]=p.clone(),!0;{let I=L[b];if(typeof p=="number"||typeof p=="boolean"){if(I!==p)return L[b]=p,!0}else{if(ArrayBuffer.isView(p))return!0;if(I.equals(p)===!1)return I.copy(p),!0}}return!1}function g(v){let T=v.uniforms,w=0,L=16;for(let b=0,I=T.length;b<I;b++){let N=Array.isArray(T[b])?T[b]:[T[b]];for(let O=0,H=N.length;O<H;O++){let F=N[O],W=Array.isArray(F.value)?F.value:[F.value];for(let j=0,Y=W.length;j<Y;j++){let le=W[j],K=m(le),ne=w%L,oe=ne%K.boundary,Fe=ne+oe;w+=oe,Fe!==0&&L-Fe<K.storage&&(w+=L-Fe),F.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=w,w+=K.storage}}}let p=w%L;return p>0&&(w+=L-p),v.__size=w,v.__cache={},this}function m(v){let T={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(T.boundary=4,T.storage=4):v.isVector2?(T.boundary=8,T.storage=8):v.isVector3||v.isColor?(T.boundary=16,T.storage=12):v.isVector4?(T.boundary=16,T.storage=16):v.isMatrix3?(T.boundary=48,T.storage=48):v.isMatrix4?(T.boundary=64,T.storage=64):v.isTexture?He("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(T.boundary=16,T.storage=v.byteLength):He("WebGLRenderer: Unsupported uniform value type.",v),T}function M(v){let T=v.target;T.removeEventListener("dispose",M);let w=a.indexOf(T.__bindingPointIndex);a.splice(w,1),i.deleteBuffer(r[T.id]),delete r[T.id],delete n[T.id]}function P(){for(let v in r)i.deleteBuffer(r[v]);a=[],r={},n={}}return{bind:l,update:c,dispose:P}}var S_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),jn=null;function M_(){return jn===null&&(jn=new Aa(S_,16,16,Di,Fn),jn.name="DFG_LUT",jn.minFilter=zt,jn.magFilter=zt,jn.wrapS=Xn,jn.wrapT=Xn,jn.generateMipmaps=!1,jn.needsUpdate=!0),jn}var $l=class{constructor(e={}){let{canvas:t=pd(),context:s=null,depth:r=!0,stencil:n=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=nn}=e;this.isWebGLRenderer=!0;let y;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");y=s.getContextAttributes().alpha}else y=a;let x=f,g=new Set([cl,ll,al]),m=new Set([nn,Un,$s,Ys,rl,ol]),M=new Uint32Array(4),P=new Int32Array(4),v=new C,T=null,w=null,L=[],p=[],b=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Nn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,N=!1,O=null,H=null,F=null,W=null;this._outputColorSpace=qt;let j=0,Y=0,le=null,K=-1,ne=null,oe=new Et,Fe=new Et,Ae=null,tt=new je(0),ke=0,at=t.width,Q=t.height,re=1,Ce=null,We=null,Re=new Et(0,0,at,Q),qe=new Et(0,0,at,Q),ue=!1,Ie=new ks,me=!1,$e=!1,et=new vt,ft=new C,St=new Et,Vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Mt=!1;function Tt(){return le===null?re:1}let z=s;function Ot(S,B){return t.getContext(S,B)}let ut,D,_,q,Z,ee,de,ye,te,se,ve,Be,_e,Se,De,Ve,Ye,k,ge,ie,xe,be,ae;try{let S={alpha:!0,depth:r,stencil:n,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",_t,!1),t.addEventListener("webglcontextrestored",ht,!1),t.addEventListener("webglcontextcreationerror",Qt,!1),z===null){let B="webgl2";if(z=Ot(B,S),z===null)throw Ot(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Oe()}catch(S){throw t.removeEventListener("webglcontextlost",_t,!1),t.removeEventListener("webglcontextrestored",ht,!1),t.removeEventListener("webglcontextcreationerror",Qt,!1),Ge("WebGLRenderer: "+S.message),S}function Oe(){ut=new P0(z),ut.init(),xe=new m_(z,ut),D=new x0(z,ut,e,xe),_=new f_(z,ut),D.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),H=z.createFramebuffer(),F=z.createFramebuffer(),W=z.createFramebuffer(),q=new D0(z),Z=new Qy,ee=new p_(z,ut,_,Z,D,xe,q),de=new R0(I),ye=new Np(z),be=new y0(z,ye),te=new C0(z,ye,q,be),se=new N0(z,te,ye,be,q),k=new L0(z,D,ee),De=new v0(Z),ve=new Ky(I,de,ut,D,be,De),Be=new x_(I,Z),_e=new t_,Se=new a_(ut),Ye=new g0(I,de,_,se,y,l),Ve=new d_(I,se,D),ae=new v_(z,q,D,_),ge=new _0(z,ut,q),ie=new I0(z,ut,q),q.programs=ve.programs,I.capabilities=D,I.extensions=ut,I.properties=Z,I.renderLists=_e,I.shadowMap=Ve,I.state=_,I.info=q}x!==nn&&(b=new O0(x,t.width,t.height,o,r,n));let Ue=new Bh(I,z);this.xr=Ue,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let S=ut.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=ut.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(S){S!==void 0&&(re=S,this.setSize(at,Q,!1))},this.getSize=function(S){return S.set(at,Q)},this.setSize=function(S,B,J=!0){if(Ue.isPresenting){He("WebGLRenderer: Can't change size while VR device is presenting.");return}at=S,Q=B,t.width=Math.floor(S*re),t.height=Math.floor(B*re),J===!0&&(t.style.width=S+"px",t.style.height=B+"px"),b!==null&&b.setSize(t.width,t.height),this.setViewport(0,0,S,B)},this.getDrawingBufferSize=function(S){return S.set(at*re,Q*re).floor()},this.setDrawingBufferSize=function(S,B,J){at=S,Q=B,re=J,t.width=Math.floor(S*J),t.height=Math.floor(B*J),this.setViewport(0,0,S,B)},this.setEffects=function(S){if(x===nn){Ge("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let B=0;B<S.length;B++)if(S[B].isOutputPass===!0){He("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}b.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(oe)},this.getViewport=function(S){return S.copy(Re)},this.setViewport=function(S,B,J,X){S.isVector4?Re.set(S.x,S.y,S.z,S.w):Re.set(S,B,J,X),_.viewport(oe.copy(Re).multiplyScalar(re).round())},this.getScissor=function(S){return S.copy(qe)},this.setScissor=function(S,B,J,X){S.isVector4?qe.set(S.x,S.y,S.z,S.w):qe.set(S,B,J,X),_.scissor(Fe.copy(qe).multiplyScalar(re).round())},this.getScissorTest=function(){return ue},this.setScissorTest=function(S){_.setScissorTest(ue=S)},this.setOpaqueSort=function(S){Ce=S},this.setTransparentSort=function(S){We=S},this.getClearColor=function(S){return S.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor(...arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha(...arguments)},this.clear=function(S=!0,B=!0,J=!0){let X=0;if(S){let $=!1;if(le!==null){let we=le.texture.format;$=g.has(we)}if($){let we=le.texture.type,Pe=m.has(we),E=Ye.getClearColor(),R=Ye.getClearAlpha(),A=E.r,G=E.g,U=E.b;Pe?(M[0]=A,M[1]=G,M[2]=U,M[3]=R,z.clearBufferuiv(z.COLOR,0,M)):(P[0]=A,P[1]=G,P[2]=U,P[3]=R,z.clearBufferiv(z.COLOR,0,P))}else X|=z.COLOR_BUFFER_BIT}B&&(X|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(X|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&z.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),O=S},this.dispose=function(){t.removeEventListener("webglcontextlost",_t,!1),t.removeEventListener("webglcontextrestored",ht,!1),t.removeEventListener("webglcontextcreationerror",Qt,!1),Ye.dispose(),_e.dispose(),Se.dispose(),Z.dispose(),de.dispose(),se.dispose(),be.dispose(),ae.dispose(),ve.dispose(),Ue.dispose(),Ue.removeEventListener("sessionstart",_o),Ue.removeEventListener("sessionend",xo),en.stop()};function _t(S){S.preventDefault(),Rr("WebGLRenderer: Context Lost."),N=!0}function ht(){Rr("WebGLRenderer: Context Restored."),N=!1;let S=q.autoReset,B=Ve.enabled,J=Ve.autoUpdate,X=Ve.needsUpdate,$=Ve.type;Oe(),q.autoReset=S,Ve.enabled=B,Ve.autoUpdate=J,Ve.needsUpdate=X,Ve.type=$}function Qt(S){Ge("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Rt(S){let B=S.target;B.removeEventListener("dispose",Rt),ac(B)}function ac(S){lc(S),Z.remove(S)}function lc(S){let B=Z.get(S).programs;B!==void 0&&(B.forEach(function(J){ve.releaseProgram(J)}),S.isShaderMaterial&&ve.releaseShaderCache(S))}this.renderBufferDirect=function(S,B,J,X,$,we){B===null&&(B=Vt);let Pe=$.isMesh&&$.matrixWorld.determinantAffine()<0,E=So(S,B,J,X,$);_.setMaterial(X,Pe);let R=J.index,A=1;if(X.wireframe===!0){if(R=te.getWireframeAttribute(J),R===void 0)return;A=2}let G=J.drawRange,U=J.attributes.position,V=G.start*A,he=(G.start+G.count)*A;we!==null&&(V=Math.max(V,we.start*A),he=Math.min(he,(we.start+we.count)*A)),R!==null?(V=Math.max(V,0),he=Math.min(he,R.count)):U!=null&&(V=Math.max(V,0),he=Math.min(he,U.count));let fe=he-V;if(fe<0||fe===1/0)return;be.setup($,X,E,J,R);let pe,Te=ge;if(R!==null&&(pe=ye.get(R),Te=ie,Te.setIndex(pe)),$.isMesh)X.wireframe===!0?(_.setLineWidth(X.wireframeLinewidth*Tt()),Te.setMode(z.LINES)):Te.setMode(z.TRIANGLES);else if($.isLine){let ze=X.linewidth;ze===void 0&&(ze=1),_.setLineWidth(ze*Tt()),$.isLineSegments?Te.setMode(z.LINES):$.isLineLoop?Te.setMode(z.LINE_LOOP):Te.setMode(z.LINE_STRIP)}else $.isPoints?Te.setMode(z.POINTS):$.isSprite&&Te.setMode(z.TRIANGLES);if($.isBatchedMesh)if(ut.get("WEBGL_multi_draw"))Te.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{let ze=$._multiDrawStarts,ce=$._multiDrawCounts,nt=$._multiDrawCount,Ne=R?ye.get(R).bytesPerElement:1,rt=Z.get(X).currentProgram.getUniforms();for(let it=0;it<nt;it++)rt.setValue(z,"_gl_DrawID",it),Te.render(ze[it]/Ne,ce[it])}else if($.isInstancedMesh)Te.renderInstances(V,fe,$.count);else if(J.isInstancedBufferGeometry){let ze=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,ce=Math.min(J.instanceCount,ze);Te.renderInstances(V,fe,ce)}else Te.render(V,fe)};function ar(S,B,J,X){O!==null&&S.isNodeMaterial&&O.setObject(X,S),me===!0&&De.setState(S,J,!1),S.transparent===!0&&S.side===bn&&S.forceSinglePass===!1?(S.side=Jt,S.needsUpdate=!0,Bi(S,B,X),S.side=Ri,S.needsUpdate=!0,Bi(S,B,X),S.side=bn):Bi(S,B,X)}this.compile=function(S,B,J=null){J===null&&(J=S),O!==null&&O.renderStart(S,B,J),w=Se.get(J),w.init(B),p.push(w),J.traverseVisible(function($){$.isLight&&$.layers.test(B.layers)&&(w.pushLight($),$.castShadow&&w.pushShadow($))}),S!==J&&S.traverseVisible(function($){$.isLight&&$.layers.test(B.layers)&&(w.pushLight($),$.castShadow&&w.pushShadow($))}),w.setupLights(),O!==null&&O.updateLights(w.state.lightsArray),$e=this.localClippingEnabled,me=De.init(this.clippingPlanes,$e),me===!0&&De.setGlobalState(this.clippingPlanes,B),O!==null&&Ve.render(w.state.shadowsArray,J,B);let X=new Set;return S.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;let we=$.material;if(we)if(Array.isArray(we))for(let Pe=0;Pe<we.length;Pe++){let E=we[Pe];ar(E,J,B,$),X.add(E)}else ar(we,J,B,$),X.add(we)}),w=p.pop(),O!==null&&O.renderEnd(),X},this.compileAsync=function(S,B,J=null){let X=this.compile(S,B,J);return new Promise($=>{function we(){if(X.forEach(function(Pe){let R=Z.get(Pe).currentProgram;(R===void 0||R.isReady())&&X.delete(Pe)}),X.size===0){$(S);return}setTimeout(we,10)}ut.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let ui=null;function Oi(S){ui&&ui(S)}function _o(){en.stop()}function xo(){en.start()}let en=new Wd;en.setAnimationLoop(Oi),typeof self<"u"&&en.setContext(self),this.setAnimationLoop=function(S){ui=S,Ue.setAnimationLoop(S),S===null?en.stop():en.start()},Ue.addEventListener("sessionstart",_o),Ue.addEventListener("sessionend",xo),this.render=function(S,B){if(B!==void 0&&B.isCamera!==!0){Ge("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;O!==null&&O.renderStart(S,B);let J=Ue.enabled===!0&&Ue.isPresenting===!0,X=b!==null&&(le===null||J)&&b.begin(I,le);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(b===null||b.isCompositing()===!1)&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera(B),B=Ue.getCamera()),S.isScene===!0&&S.onBeforeRender(I,S,B,le),w=Se.get(S,p.length),w.init(B),w.state.textureUnits=ee.getTextureUnits(),p.push(w),et.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Ie.setFromProjectionMatrix(et,Cn,B.reversedDepth),$e=this.localClippingEnabled,me=De.init(this.clippingPlanes,$e),T=_e.get(S,L.length),T.init(),L.push(T),Ue.enabled===!0&&Ue.isPresenting===!0){let Pe=I.xr.getDepthSensingMesh();Pe!==null&&cs(Pe,B,-1/0,I.sortObjects)}cs(S,B,0,I.sortObjects),T.finish(),O!==null&&O.updateLights(w.state.lightsArray),I.sortObjects===!0&&T.sort(Ce,We),Mt=Ue.enabled===!1||Ue.isPresenting===!1||Ue.hasDepthSensing()===!1,Mt&&Ye.addToRenderList(T,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),me===!0&&De.beginShadows();let $=w.state.shadowsArray;if(Ve.render($,S,B),me===!0&&De.endShadows(),(X&&b.hasRenderPass())===!1){let Pe=T.opaque,E=T.transmissive;if(w.setupLights(),B.isArrayCamera){let R=B.cameras;if(E.length>0)for(let A=0,G=R.length;A<G;A++){let U=R[A];vo(Pe,E,S,U)}Mt&&Ye.render(S);for(let A=0,G=R.length;A<G;A++){let U=R[A];lr(T,S,U,U.viewport)}}else E.length>0&&vo(Pe,E,S,B),Mt&&Ye.render(S),lr(T,S,B)}le!==null&&Y===0&&(ee.updateMultisampleRenderTarget(le),ee.updateRenderTargetMipmap(le)),X&&b.end(I),S.isScene===!0&&S.onAfterRender(I,S,B),be.resetDefaultState(),K=-1,ne=null,p.pop(),p.length>0?(w=p[p.length-1],ee.setTextureUnits(w.state.textureUnits),me===!0&&De.setGlobalState(I.clippingPlanes,w.state.camera)):w=null,L.pop(),L.length>0?T=L[L.length-1]:T=null,O!==null&&O.renderEnd()};function cs(S,B,J,X){if(S.visible===!1)return;if(S.layers.test(B.layers)){if(S.isGroup)J=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(B);else if(S.isLightProbeGrid)w.pushLightProbeGrid(S);else if(S.isLight)w.pushLight(S),S.castShadow&&w.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||S.intersectsFrustum(Ie)){X&&St.setFromMatrixPosition(S.matrixWorld).applyMatrix4(et);let Pe=se.update(S),E=S.material;E.visible&&T.push(S,Pe,E,J,St.z,null,B)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||S.intersectsFrustum(Ie))){let Pe=se.update(S),E=S.material;if(X&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),St.copy(S.boundingSphere.center)):(Pe.boundingSphere===null&&Pe.computeBoundingSphere(),St.copy(Pe.boundingSphere.center)),St.applyMatrix4(S.matrixWorld).applyMatrix4(et)),Array.isArray(E)){let R=Pe.groups;for(let A=0,G=R.length;A<G;A++){let U=R[A],V=E[U.materialIndex];V&&V.visible&&T.push(S,Pe,V,J,St.z,U,B)}}else E.visible&&T.push(S,Pe,E,J,St.z,null,B)}}let we=S.children;for(let Pe=0,E=we.length;Pe<E;Pe++)cs(we[Pe],B,J,X)}function lr(S,B,J,X){let{opaque:$,transmissive:we,transparent:Pe}=S;w.setupLightsView(J),me===!0&&De.setGlobalState(I.clippingPlanes,J),X&&_.viewport(oe.copy(X)),$.length>0&&Fi($,B,J),we.length>0&&Fi(we,B,J),Pe.length>0&&Fi(Pe,B,J),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function vo(S,B,J,X){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[X.id]===void 0){let V=ut.has("EXT_color_buffer_half_float")||ut.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[X.id]=new tn(1,1,{generateMipmaps:!0,type:V?Fn:nn,minFilter:Ci,samples:Math.max(4,D.samples),stencilBuffer:n,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ot.workingColorSpace})}let we=w.state.transmissionRenderTarget[X.id],Pe=X.viewport||oe;we.setSize(Pe.z*I.transmissionResolutionScale,Pe.w*I.transmissionResolutionScale);let E=I.getRenderTarget(),R=I.getActiveCubeFace(),A=I.getActiveMipmapLevel();I.setRenderTarget(we),I.getClearColor(tt),ke=I.getClearAlpha(),ke<1&&I.setClearColor(16777215,.5),I.clear(),Mt&&Ye.render(J);let G=I.toneMapping;I.toneMapping=Nn;let U=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),w.setupLightsView(X),me===!0&&De.setGlobalState(I.clippingPlanes,X),Fi(S,J,X),ee.updateMultisampleRenderTarget(we),ee.updateRenderTargetMipmap(we),ut.has("WEBGL_multisampled_render_to_texture")===!1){let V=!1;for(let he=0,fe=B.length;he<fe;he++){let pe=B[he],{object:Te,geometry:ze,material:ce,group:nt}=pe;if(ce.side===bn&&Te.layers.test(X.layers)){let Ne=ce.side;ce.side=Jt,ce.needsUpdate=!0,cr(Te,J,X,ze,ce,nt),ce.side=Ne,ce.needsUpdate=!0,V=!0}}V===!0&&(ee.updateMultisampleRenderTarget(we),ee.updateRenderTargetMipmap(we))}I.setRenderTarget(E,R,A),I.setClearColor(tt,ke),U!==void 0&&(X.viewport=U),I.toneMapping=G}function Fi(S,B,J){let X=B.isScene===!0?B.overrideMaterial:null;for(let $=0,we=S.length;$<we;$++){let Pe=S[$],{object:E,geometry:R,group:A}=Pe,G=Pe.material;G.allowOverride===!0&&X!==null&&(G=X),E.layers.test(J.layers)&&cr(E,B,J,R,G,A)}}function cr(S,B,J,X,$,we){O!==null&&$.isNodeMaterial&&O.setObject(S,$),S.onBeforeRender(I,B,J,X,$,we),S.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),$.onBeforeRender(I,B,J,X,S,we),$.transparent===!0&&$.side===bn&&$.forceSinglePass===!1?($.side=Jt,$.needsUpdate=!0,I.renderBufferDirect(J,B,X,$,S,we),$.side=Ri,$.needsUpdate=!0,I.renderBufferDirect(J,B,X,$,S,we),$.side=bn):I.renderBufferDirect(J,B,X,$,S,we),S.onAfterRender(I,B,J,X,$,we)}function Bi(S,B,J){B.isScene!==!0&&(B=Vt);let X=Z.get(S),$=w.state.lights,we=w.state.shadowsArray,Pe=$.state.version,E=ve.getParameters(S,$.state,we,B,J,w.state.lightProbeGridArray),R=ve.getProgramCacheKey(E),A=X.programs;X.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?B.environment:null,X.fog=B.fog;let G=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;X.envMap=de.get(S.envMap||X.environment,G),X.envMapRotation=X.environment!==null&&S.envMap===null?B.environmentRotation:S.envMapRotation,A===void 0&&(S.addEventListener("dispose",Rt),A=new Map,X.programs=A);let U=A.get(R);if(U!==void 0){if(X.currentProgram===U&&X.lightsStateVersion===Pe)return En(S,E),U}else E.uniforms=ve.getUniforms(S),O!==null&&S.isNodeMaterial&&O.build(S,J,E),S.onBeforeCompile(E,I),U=ve.acquireProgram(E,R),A.set(R,U),X.uniforms=E.uniforms;let V=X.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(V.clippingPlanes=De.uniform),En(S,E),X.needsLights=bo(S),X.lightsStateVersion=Pe,X.needsLights&&(V.ambientLightColor.value=$.state.ambient,V.lightProbe.value=$.state.probe,V.sunLights.value=$.state.sun,V.sunLightShadows.value=$.state.sunShadow,V.directionalLights.value=$.state.directional,V.directionalLightShadows.value=$.state.directionalShadow,V.spotLights.value=$.state.spot,V.spotLightShadows.value=$.state.spotShadow,V.rectAreaLights.value=$.state.rectArea,V.ltc_1.value=$.state.rectAreaLTC1,V.ltc_2.value=$.state.rectAreaLTC2,V.pointLights.value=$.state.point,V.pointLightShadows.value=$.state.pointShadow,V.hemisphereLights.value=$.state.hemi,V.sunShadowMatrix.value=$.state.sunShadowMatrix,V.sunShadowCascade.value=$.state.sunShadowCascade,V.directionalShadowMatrix.value=$.state.directionalShadowMatrix,V.spotLightMatrix.value=$.state.spotLightMatrix,V.spotLightMap.value=$.state.spotLightMap,V.pointShadowMatrix.value=$.state.pointShadowMatrix),X.lightProbeGrid=w.state.lightProbeGridArray.length>0,X.currentProgram=U,X.uniformsList=null,U}function hr(S){if(S.uniformsList===null){let B=S.currentProgram.getUniforms();S.uniformsList=Js.seqWithValue(B.seq,S.uniforms)}return S.uniformsList}function En(S,B){let J=Z.get(S);J.outputColorSpace=B.outputColorSpace,J.batching=B.batching,J.batchingColor=B.batchingColor,J.instancing=B.instancing,J.instancingColor=B.instancingColor,J.instancingMorph=B.instancingMorph,J.skinning=B.skinning,J.morphTargets=B.morphTargets,J.morphNormals=B.morphNormals,J.morphColors=B.morphColors,J.morphTargetsCount=B.morphTargetsCount,J.numClippingPlanes=B.numClippingPlanes,J.numIntersection=B.numClipIntersection,J.vertexAlphas=B.vertexAlphas,J.vertexTangents=B.vertexTangents,J.toneMapping=B.toneMapping}function di(S,B){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;v.setFromMatrixPosition(B.matrixWorld);for(let J=0,X=S.length;J<X;J++){let $=S[J];if($.texture!==null&&$.boundingBox.containsPoint(v))return $}return null}function So(S,B,J,X,$){B.isScene!==!0&&(B=Vt),ee.resetTextureUnits();let we=B.fog,Pe=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?B.environment:null,E=le===null?I.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:ot.workingColorSpace,R=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,A=de.get(X.envMap||Pe,R),G=X.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,U=!!J.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),V=!!J.morphAttributes.position,he=!!J.morphAttributes.normal,fe=!!J.morphAttributes.color,pe=Nn;X.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(pe=I.toneMapping);let Te=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,ze=Te!==void 0?Te.length:0,ce=Z.get(X),nt=w.state.lights;if(me===!0&&($e===!0||S!==ne)){let xt=S===ne&&X.id===K;De.setState(X,S,xt)}let Ne=!1;X.version===ce.__version?(ce.needsLights&&ce.lightsStateVersion!==nt.state.version||ce.outputColorSpace!==E||$.isBatchedMesh&&ce.batching===!1||!$.isBatchedMesh&&ce.batching===!0||$.isBatchedMesh&&ce.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&ce.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&ce.instancing===!1||!$.isInstancedMesh&&ce.instancing===!0||$.isSkinnedMesh&&ce.skinning===!1||!$.isSkinnedMesh&&ce.skinning===!0||$.isInstancedMesh&&ce.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&ce.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&ce.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&ce.instancingMorph===!1&&$.morphTexture!==null||ce.envMap!==A||X.fog===!0&&ce.fog!==we||ce.numClippingPlanes!==void 0&&(ce.numClippingPlanes!==De.numPlanes||ce.numIntersection!==De.numIntersection)||ce.vertexAlphas!==G||ce.vertexTangents!==U||ce.morphTargets!==V||ce.morphNormals!==he||ce.morphColors!==fe||ce.toneMapping!==pe||ce.morphTargetsCount!==ze||!!ce.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(Ne=!0):(Ne=!0,ce.__version=X.version);let rt=ce.currentProgram;Ne===!0&&(rt=Bi(X,B,$),O&&X.isNodeMaterial&&O.onUpdateProgram(X,rt,ce));let it=!1,Ht=!1,bt=!1,Je=rt.getUniforms(),At=ce.uniforms;if(_.useProgram(rt.program)&&(it=!0,Ht=!0,bt=!0),X.id!==K&&(K=X.id,Ht=!0),ce.needsLights){let xt=di(w.state.lightProbeGridArray,$);ce.lightProbeGrid!==xt&&(ce.lightProbeGrid=xt,Ht=!0)}if(it||ne!==S){_.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),Je.setValue(z,"projectionMatrix",S.projectionMatrix),Je.setValue(z,"viewMatrix",S.matrixWorldInverse);let zn=Je.map.cameraPosition;zn!==void 0&&zn.setValue(z,ft.setFromMatrixPosition(S.matrixWorld)),D.logarithmicDepthBuffer&&Je.setValue(z,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Je.setValue(z,"isOrthographic",S.isOrthographicCamera===!0),ne!==S&&(ne=S,Ht=!0,bt=!0)}if(ce.needsLights&&(nt.state.sunShadowMap.length>0&&Je.setValue(z,"sunShadowMap",nt.state.sunShadowMap,ee),nt.state.directionalShadowMap.length>0&&Je.setValue(z,"directionalShadowMap",nt.state.directionalShadowMap,ee),nt.state.spotShadowMap.length>0&&Je.setValue(z,"spotShadowMap",nt.state.spotShadowMap,ee),nt.state.pointShadowMap.length>0&&Je.setValue(z,"pointShadowMap",nt.state.pointShadowMap,ee)),$.isSkinnedMesh){Je.setOptional(z,$,"bindMatrix"),Je.setOptional(z,$,"bindMatrixInverse");let xt=$.skeleton;xt&&(xt.boneTexture===null&&xt.computeBoneTexture(),Je.setValue(z,"boneTexture",xt.boneTexture,ee))}$.isBatchedMesh&&(Je.setOptional(z,$,"batchingTexture"),Je.setValue(z,"batchingTexture",$._matricesTexture,ee),Je.setOptional(z,$,"batchingIdTexture"),Je.setValue(z,"batchingIdTexture",$._indirectTexture,ee),Je.setOptional(z,$,"batchingColorTexture"),$._colorsTexture!==null&&Je.setValue(z,"batchingColorTexture",$._colorsTexture,ee));let kn=J.morphAttributes;if((kn.position!==void 0||kn.normal!==void 0||kn.color!==void 0)&&k.update($,J,rt),(Ht||ce.receiveShadow!==$.receiveShadow)&&(ce.receiveShadow=$.receiveShadow,Je.setValue(z,"receiveShadow",$.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&B.environment!==null&&(At.envMapIntensity.value=B.environmentIntensity),At.dfgLUT!==void 0&&(At.dfgLUT.value=M_()),Ht){if(Je.setValue(z,"toneMappingExposure",I.toneMappingExposure),ce.needsLights&&Mo(At,bt),we&&X.fog===!0&&Be.refreshFogUniforms(At,we),Be.refreshMaterialUniforms(At,X,re,Q,w.state.transmissionRenderTarget[S.id]),ce.needsLights&&ce.lightProbeGrid){let xt=ce.lightProbeGrid;At.probesSH.value=xt.texture,At.probesMin.value.copy(xt.boundingBox.min),At.probesMax.value.copy(xt.boundingBox.max),At.probesResolution.value.copy(xt.resolution)}Js.upload(z,hr(ce),At,ee)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Js.upload(z,hr(ce),At,ee),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Je.setValue(z,"center",$.center),Je.setValue(z,"modelViewMatrix",$.modelViewMatrix),Je.setValue(z,"normalMatrix",$.normalMatrix),Je.setValue(z,"modelMatrix",$.matrixWorld),X.uniformsGroups!==void 0){let xt=X.uniformsGroups;for(let zn=0,fi=xt.length;zn<fi;zn++){let Kn=xt[zn];ae.update(Kn,rt),ae.bind(Kn,rt)}}return rt}function Mo(S,B){S.ambientLightColor.needsUpdate=B,S.lightProbe.needsUpdate=B,S.sunLights.needsUpdate=B,S.sunLightShadows.needsUpdate=B,S.directionalLights.needsUpdate=B,S.directionalLightShadows.needsUpdate=B,S.pointLights.needsUpdate=B,S.pointLightShadows.needsUpdate=B,S.spotLights.needsUpdate=B,S.spotLightShadows.needsUpdate=B,S.rectAreaLights.needsUpdate=B,S.hemisphereLights.needsUpdate=B}function bo(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return le},this.setRenderTargetTextures=function(S,B,J){let X=Z.get(S);X.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),Z.get(S.texture).__webglTexture=B,Z.get(S.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:J,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,B){let J=Z.get(S);J.__webglFramebuffer=B,J.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(S,B=0,J=0){le=S,j=B,Y=J;let X=null,$=!1,we=!1;if(S){let E=Z.get(S);if(E.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(z.FRAMEBUFFER,E.__webglFramebuffer),oe.copy(S.viewport),Fe.copy(S.scissor),Ae=S.scissorTest,_.viewport(oe),_.scissor(Fe),_.setScissorTest(Ae),K=-1;return}else if(E.__webglFramebuffer===void 0)ee.setupRenderTarget(S);else if(E.__hasExternalTextures)ee.rebindTextures(S,Z.get(S.texture).__webglTexture,Z.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let G=S.depthTexture;if(E.__boundDepthTexture!==G){if(G!==null&&Z.has(G)&&(S.width!==G.image.width||S.height!==G.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ee.setupDepthRenderbuffer(S)}}let R=S.texture;(R.isData3DTexture||R.isDataArrayTexture||R.isCompressedArrayTexture)&&(we=!0);let A=Z.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(A[B])?X=A[B][J]:X=A[B],$=!0):S.samples>0&&ee.useMultisampledRTT(S)===!1?X=Z.get(S).__webglMultisampledFramebuffer:Array.isArray(A)?X=A[J]:X=A,oe.copy(S.viewport),Fe.copy(S.scissor),Ae=S.scissorTest}else oe.copy(Re).multiplyScalar(re).floor(),Fe.copy(qe).multiplyScalar(re).floor(),Ae=ue;if(J!==0&&(X=H),_.bindFramebuffer(z.FRAMEBUFFER,X)&&_.drawBuffers(S,X),_.viewport(oe),_.scissor(Fe),_.setScissorTest(Ae),$){let E=Z.get(S.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+B,E.__webglTexture,J)}else if(we){let E=B;for(let R=0;R<S.textures.length;R++){let A=Z.get(S.textures[R]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+R,A.__webglTexture,J,E)}}else if(S!==null&&J!==0){let E=Z.get(S.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,E.__webglTexture,J)}K=-1};function ur(S){let B=Z.get(S);return(B.__readFormat!==S.format||B.__readType!==S.type)&&(B.__readFormat=S.format,B.__readType=S.type,B.__formatReadable=D.textureFormatReadable(S.format),B.__typeReadable=D.textureTypeReadable(S.type)),B}this.readRenderTargetPixels=function(S,B,J,X,$,we,Pe,E=0){if(!(S&&S.isWebGLRenderTarget)){Ge("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let R=Z.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Pe!==void 0&&(R=R[Pe]),R){_.bindFramebuffer(z.FRAMEBUFFER,R);try{let A=S.textures[E],G=A.format,U=A.type;S.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+E);let V=ur(A);if(V.__formatReadable===!1){Ge("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(V.__typeReadable===!1){Ge("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=S.width-X&&J>=0&&J<=S.height-$&&z.readPixels(B,J,X,$,xe.convert(G),xe.convert(U),we)}finally{let A=le!==null?Z.get(le).__webglFramebuffer:null;_.bindFramebuffer(z.FRAMEBUFFER,A)}}},this.readRenderTargetPixelsAsync=async function(S,B,J,X,$,we,Pe,E=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let R=Z.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Pe!==void 0&&(R=R[Pe]),R)if(B>=0&&B<=S.width-X&&J>=0&&J<=S.height-$){_.bindFramebuffer(z.FRAMEBUFFER,R);let A=S.textures[E],G=A.format,U=A.type;S.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+E);let V=ur(A);if(V.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(V.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let he=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,he),z.bufferData(z.PIXEL_PACK_BUFFER,we.byteLength,z.STREAM_READ),z.readPixels(B,J,X,$,xe.convert(G),xe.convert(U),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);let fe=le!==null?Z.get(le).__webglFramebuffer:null;_.bindFramebuffer(z.FRAMEBUFFER,fe);let pe=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await gd(z,pe,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,he),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,we),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(he),z.deleteSync(pe),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,B=null,J=0){let X=Math.pow(2,-J),$=Math.floor(S.image.width*X),we=Math.floor(S.image.height*X),Pe=B!==null?B.x:0,E=B!==null?B.y:0;ee.setTexture2D(S,0),z.copyTexSubImage2D(z.TEXTURE_2D,J,0,0,Pe,E,$,we),_.unbindTexture()},this.copyTextureToTexture=function(S,B,J=null,X=null,$=0,we=0){let Pe,E,R,A,G,U,V,he,fe,pe=S.isCompressedTexture?S.mipmaps[we]:S.image;if(J!==null)Pe=J.max.x-J.min.x,E=J.max.y-J.min.y,R=J.isBox3?J.max.z-J.min.z:1,A=J.min.x,G=J.min.y,U=J.isBox3?J.min.z:0;else{let At=Math.pow(2,-$);Pe=Math.floor(pe.width*At),E=Math.floor(pe.height*At),S.isDataArrayTexture?R=pe.depth:S.isData3DTexture?R=Math.floor(pe.depth*At):R=1,A=0,G=0,U=0}X!==null?(V=X.x,he=X.y,fe=X.z):(V=0,he=0,fe=0);let Te=xe.convert(B.format),ze=xe.convert(B.type),ce;B.isData3DTexture?(ee.setTexture3D(B,0),ce=z.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(ee.setTexture2DArray(B,0),ce=z.TEXTURE_2D_ARRAY):(ee.setTexture2D(B,0),ce=z.TEXTURE_2D),_.activeTexture(z.TEXTURE0),_.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,B.flipY),_.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),_.pixelStorei(z.UNPACK_ALIGNMENT,B.unpackAlignment);let nt=_.getParameter(z.UNPACK_ROW_LENGTH),Ne=_.getParameter(z.UNPACK_IMAGE_HEIGHT),rt=_.getParameter(z.UNPACK_SKIP_PIXELS),it=_.getParameter(z.UNPACK_SKIP_ROWS),Ht=_.getParameter(z.UNPACK_SKIP_IMAGES);_.pixelStorei(z.UNPACK_ROW_LENGTH,pe.width),_.pixelStorei(z.UNPACK_IMAGE_HEIGHT,pe.height),_.pixelStorei(z.UNPACK_SKIP_PIXELS,A),_.pixelStorei(z.UNPACK_SKIP_ROWS,G),_.pixelStorei(z.UNPACK_SKIP_IMAGES,U);let bt=S.isDataArrayTexture||S.isData3DTexture,Je=B.isDataArrayTexture||B.isData3DTexture;if(S.isDepthTexture){let At=Z.get(S),kn=Z.get(B),xt=Z.get(At.__renderTarget),zn=Z.get(kn.__renderTarget);_.bindFramebuffer(z.READ_FRAMEBUFFER,xt.__webglFramebuffer),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,zn.__webglFramebuffer);for(let fi=0;fi<R;fi++)bt&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Z.get(S).__webglTexture,$,U+fi),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Z.get(B).__webglTexture,we,fe+fi)),z.blitFramebuffer(A,G,Pe,E,V,he,Pe,E,z.DEPTH_BUFFER_BIT,z.NEAREST);_.bindFramebuffer(z.READ_FRAMEBUFFER,null),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if($!==0||S.isRenderTargetTexture||Z.has(S)){let At=Z.get(S),kn=Z.get(B);_.bindFramebuffer(z.READ_FRAMEBUFFER,F),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,W);for(let xt=0;xt<R;xt++)bt?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,At.__webglTexture,$,U+xt):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,At.__webglTexture,$),Je?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,kn.__webglTexture,we,fe+xt):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,kn.__webglTexture,we),$!==0?z.blitFramebuffer(A,G,Pe,E,V,he,Pe,E,z.COLOR_BUFFER_BIT,z.NEAREST):Je?z.copyTexSubImage3D(ce,we,V,he,fe+xt,A,G,Pe,E):z.copyTexSubImage2D(ce,we,V,he,A,G,Pe,E);_.bindFramebuffer(z.READ_FRAMEBUFFER,null),_.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Je?S.isDataTexture||S.isData3DTexture?z.texSubImage3D(ce,we,V,he,fe,Pe,E,R,Te,ze,pe.data):B.isCompressedArrayTexture?z.compressedTexSubImage3D(ce,we,V,he,fe,Pe,E,R,Te,pe.data):z.texSubImage3D(ce,we,V,he,fe,Pe,E,R,Te,ze,pe):S.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,we,V,he,Pe,E,Te,ze,pe.data):S.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,we,V,he,pe.width,pe.height,Te,pe.data):z.texSubImage2D(z.TEXTURE_2D,we,V,he,Pe,E,Te,ze,pe);_.pixelStorei(z.UNPACK_ROW_LENGTH,nt),_.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Ne),_.pixelStorei(z.UNPACK_SKIP_PIXELS,rt),_.pixelStorei(z.UNPACK_SKIP_ROWS,it),_.pixelStorei(z.UNPACK_SKIP_IMAGES,Ht),we===0&&B.generateMipmaps&&z.generateMipmap(ce),_.unbindTexture()},this.initRenderTarget=function(S){Z.get(S).__webglFramebuffer===void 0&&ee.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?ee.setTextureCube(S,0):S.isData3DTexture?ee.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?ee.setTexture2DArray(S,0):ee.setTexture2D(S,0),_.unbindTexture()},this.resetState=function(){j=0,Y=0,le=null,_.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ot._getDrawingBufferColorSpace(e),t.unpackColorSpace=ot._getUnpackColorSpace()}};var Jd={type:"change"},zh={type:"start"},Qd={type:"end"},jl=new xi,Kd=new cn,w_=Math.cos(70*is.DEG2RAD),Ut=new C,sn=2*Math.PI,mt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},kh=1e-6,Jl=class extends Jr{constructor(e,t=null){super(e,t),this.state=mt.NONE,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ln.ROTATE,MIDDLE:Ln.DOLLY,RIGHT:Ln.PAN},this.touches={ONE:Mn.ROTATE,TWO:Mn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new C,this._lastQuaternion=new dn,this._lastTargetPosition=new C,this._quat=new dn().setFromUnitVectors(e.up,new C(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ws,this._sphericalDelta=new Ws,this._scale=1,this._panOffset=new C,this._rotateStart=new Me,this._rotateEnd=new Me,this._rotateDelta=new Me,this._panStart=new Me,this._panEnd=new Me,this._panDelta=new Me,this._dollyStart=new Me,this._dollyEnd=new Me,this._dollyDelta=new Me,this._dollyDirection=new C,this._mouse=new Me,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=T_.bind(this),this._onPointerDown=E_.bind(this),this._onPointerUp=A_.bind(this),this._onContextMenu=N_.bind(this),this._onMouseWheel=C_.bind(this),this._onKeyDown=I_.bind(this),this._onTouchStart=D_.bind(this),this._onTouchMove=L_.bind(this),this._onMouseDown=R_.bind(this),this._onMouseMove=P_.bind(this),this._interceptControlDown=U_.bind(this),this._interceptControlUp=O_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=mt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Jd),this.update(),this.state=mt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Ut.copy(t).sub(this.target),Ut.applyQuaternion(this._quat),this._spherical.setFromVector3(Ut),this.autoRotate&&this.state===mt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(s)&&isFinite(r)&&(s<-Math.PI?s+=sn:s>Math.PI&&(s-=sn),r<-Math.PI?r+=sn:r>Math.PI&&(r-=sn),s<=r?this._spherical.theta=Math.max(s,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+r)/2?Math.max(s,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let n=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),n=a!=this._spherical.radius}if(Ut.setFromSpherical(this._spherical),Ut.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ut),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Ut.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),n=!!l}else if(this.object.isOrthographicCamera){let o=new C(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),n=l!==this.object.zoom;let c=new C(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Ut.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(jl.origin.copy(this.object.position),jl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(jl.direction))<w_?this.object.lookAt(this.target):(Kd.setFromNormalAndCoplanarPoint(this.object.up,this.target),jl.intersectPlane(Kd,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),n=!0)}return this._scale=1,this._performCursorZoom=!1,n||this._lastPosition.distanceToSquared(this.object.position)>kh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>kh||this._lastTargetPosition.distanceToSquared(this.target)>kh?(this.dispatchEvent(Jd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?sn/60*this.autoRotateSpeed*e:sn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ut.setFromMatrixColumn(t,0),Ut.multiplyScalar(-e),this._panOffset.add(Ut)}_panUp(e,t){this.screenSpacePanning===!0?Ut.setFromMatrixColumn(t,1):(Ut.setFromMatrixColumn(t,0),Ut.crossVectors(this.object.up,Ut)),Ut.multiplyScalar(e),this._panOffset.add(Ut)}_pan(e,t){let s=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;Ut.copy(r).sub(this.target);let n=Ut.length();n*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*n/s.clientHeight,this.object.matrix),this._panUp(2*t*n/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let s=this.domElement.getBoundingClientRect(),r=e-s.left,n=t-s.top,a=s.width,o=s.height;this._mouse.x=r/a*2-1,this._mouse.y=-(n/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),s=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(s,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),s=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(s,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),s=e.pageX-t.x,r=e.pageY-t.y,n=Math.sqrt(s*s+r*r);this._dollyStart.set(0,n)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let s=this._getSecondPointerPosition(e),r=.5*(e.pageX+s.x),n=.5*(e.pageY+s.y);this._rotateEnd.set(r,n)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),s=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(s,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),s=e.pageX-t.x,r=e.pageY-t.y,n=Math.sqrt(s*s+r*r);this._dollyEnd.set(0,n),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Me,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,s={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}};function E_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function T_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function A_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Qd),this.state=mt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function R_(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ln.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=mt.DOLLY;break;case Ln.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=mt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=mt.ROTATE}break;case Ln.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=mt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=mt.PAN}break;default:this.state=mt.NONE}this.state!==mt.NONE&&this.dispatchEvent(zh)}function P_(i){switch(this.state){case mt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case mt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case mt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function C_(i){this.enabled===!1||this.enableZoom===!1||this.state!==mt.NONE||(i.preventDefault(),this.dispatchEvent(zh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Qd))}function I_(i){this.enabled!==!1&&this._handleKeyDown(i)}function D_(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Mn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=mt.TOUCH_ROTATE;break;case Mn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=mt.TOUCH_PAN;break;default:this.state=mt.NONE}break;case 2:switch(this.touches.TWO){case Mn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=mt.TOUCH_DOLLY_PAN;break;case Mn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=mt.TOUCH_DOLLY_ROTATE;break;default:this.state=mt.NONE}break;default:this.state=mt.NONE}this.state!==mt.NONE&&this.dispatchEvent(zh)}function L_(i){switch(this._trackPointer(i),this.state){case mt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case mt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case mt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case mt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=mt.NONE}}function N_(i){this.enabled!==!1&&i.preventDefault()}function U_(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function O_(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Qs=(i,e)=>i<e?-1:i>e?1:0,Vh=i=>[...i.nodes].sort((e,t)=>Qs(e.id,t.id)),F_={client:"#69e1dd",gateway:"#62dbdf",auth:"#53acdd",decision:"#efc174",database:"#4de1b3",external:"#edbf78",event:"#f1b676",result:"#74bcff"};function B_(i,e){return i.kind==="store"?"database":i.kind==="external"?"external":i.kind==="decision"?"decision":i.kind==="start"?e?"gateway":"client":i.kind==="end"?"result":"service"}function k_(i){let e=Math.ceil(Math.sqrt(i)),t=Math.ceil(i/e);return[Math.max(9.6,(e-1)*3.1+4.1),5.2,Math.max(7.6,(t-1)*3.4+4.1)]}function ef(i,e,t){let s=i.models.get(e.id),r=t===null&&i.moduleIds.includes(e.id),n=r?"shell":s?.shape??B_(e,t!==null),a=r?k_(i.documents[e.id].nodes.length):t!==null?[1.7,n==="decision"?1.6:1.5,1.7]:n==="database"?[3.4,3.8,3.4]:[4.4,4.8,4.4];return{id:e.id,node:e,position:[0,t===null?0:.65,0],size:a,shape:n,color:s?.color??F_[n]??"#559eff",shortLabel:s?.shortLabel??[...e.label].slice(0,12).join(""),interior:t!==null,owner:t}}function z_(i){let e=Vh(i).map(x=>x.id),t=new Map(e.map(x=>[x,new Set]));for(let x of i.edges)t.get(x.source).add(x.target),x.directed||t.get(x.target).add(x.source);let s=0,r=new Map,n=new Map,a=new Set,o=[],l=[],c=x=>{r.set(x,s),n.set(x,s),s+=1,o.push(x),a.add(x);for(let g of[...t.get(x)].sort(Qs))r.has(g)?a.has(g)&&n.set(x,Math.min(n.get(x),r.get(g))):(c(g),n.set(x,Math.min(n.get(x),n.get(g))));if(n.get(x)===r.get(x)){let g=[],m;do m=o.pop(),a.delete(m),g.push(m);while(m!==x);l.push(g.sort(Qs))}};e.forEach(x=>{r.has(x)||c(x)});let h=new Map(l.flatMap((x,g)=>x.map(m=>[m,g]))),d=l.map(()=>new Set),u=l.map(()=>0);for(let[x,g]of t)for(let m of g){let M=h.get(x),P=h.get(m);M!==P&&!d[M].has(P)&&(d[M].add(P),u[P]+=1)}let f=l.map(()=>0),y=l.map((x,g)=>g).filter(x=>u[x]===0);for(let x=0;x<y.length;x++){let g=y[x];for(let m of d[g])f[m]=Math.max(f[m],f[g]+1),u[m]-=1,u[m]===0&&y.push(m)}return new Map(e.map(x=>[x,f[h.get(x)]]))}function tf(i){let e=Vh(i.document).map(u=>ef(i,u,null)),t=z_(i.document),s=i.document.view.direction==="DOWN",r=s?2:0,n=s?0:2,a=0;for(let u of[...new Set(t.values())].sort((f,y)=>f-y)){let f=e.filter(m=>t.get(m.id)===u),y=Math.max(...f.map(m=>m.size[r])),g=-(f.reduce((m,M)=>m+M.size[n],0)+(f.length-1)*4)/2;for(let m of f)m.position[r]=a+y/2,m.position[n]=g+m.size[n]/2,g+=m.size[n]+4;a+=y+5}let o=(a-5)/2;e.forEach(u=>{u.position[r]-=o});let l=new Map(e.map(u=>[u.id,u])),c=[...i.moduleIds].sort(Qs).flatMap(u=>{let f=Vh(i.documents[u]),y=Math.ceil(Math.sqrt(f.length)),x=Math.ceil(f.length/y),g=l.get(u);return f.map((m,M)=>{let P=ef(i,m,u);return P.position[0]=g.position[0]+(M%y-(y-1)/2)*3.1,P.position[2]=g.position[2]+(Math.floor(M/y)-(x-1)/2)*3.4,P})}),h=Vn(i.document),d=[...i.document.groups].sort((u,f)=>Qs(u.id,f.id)).flatMap(u=>{let f=[...h.groupMembers.get(u.id)??[]].sort(Qs).map(M=>l.get(M));if(f.length===0)return[];let y=Math.min(...f.map(M=>M.position[0]-M.size[0]/2))-2,x=Math.max(...f.map(M=>M.position[0]+M.size[0]/2))+2,g=Math.min(...f.map(M=>M.position[2]-M.size[2]/2))-2,m=Math.max(...f.map(M=>M.position[2]+M.size[2]/2))+2;return[{label:u.label,center:[(y+x)/2,0,(g+m)/2],width:x-y,depth:m-g,color:f[0].color}]});return{overview:e,interior:c,regions:d}}var Li=i=>new C(...i),Kl=i=>Number.isFinite(i)?Math.max(0,Math.min(1,i)):0,nf=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;function V_(i,e,t){let s="spatial",r=null,n=!1,a=[],o=[],l=0,c=i.querySelector("#fallback"),h=c??document.createElement("div"),d=h.hidden,u=new Set([...e.overview,...e.interior].map(f=>f.id));return c||(h.className="world-fallback",h.textContent="\u5F53\u524D\u6D4F\u89C8\u5668\u65E0\u6CD5\u542F\u7528 WebGL\u3002\u6A21\u5757\u5217\u8868\u3001\u804C\u8D23\u8BF4\u660E\u548C\u6F14\u793A\u6B65\u9AA4\u4ECD\u53EF\u4F7F\u7528\u3002",i.append(h)),h.hidden=!1,{renderer:"unavailable",setMode(f){s=f},setOpenModules(f){a=t.filter(y=>f.includes(y))},setSelection(f){r=f},setIsolation(f){n=f},setDemo(f,y){for(let x of f?.route??[])if(!u.has(x))throw new Error(`\u6F14\u793A\u8DEF\u5F84\u5F15\u7528\u4E0D\u5B58\u5728\u7684\u8282\u70B9\uFF1A${x}`);o=f?[...f.route]:[],l=Kl(y)},focus(){},reset(){},state:()=>({mode:s,cutaway:a.length>0,openModules:[...a],shellOpen:Object.fromEntries(t.map(f=>[f,+a.includes(f)])),isolated:n,selectedId:r,camera:[],target:[],objectIds:[...e.overview,...e.interior].map(f=>f.id),demoRoute:o,demoProgress:l,geometryCount:0}),dispose(){c?h.hidden=d:h.remove()}}}function Hh(i,e,t){let s=tf(e),r=e.moduleIds,n=new Set(r),{document:a,documents:o}=e,l=new Dn;for(let E of[...s.overview,...s.interior])l.expandByPoint(new C(E.position[0]-E.size[0]/2-2,0,E.position[2]-E.size[2]/2-2)),l.expandByPoint(new C(E.position[0]+E.size[0]/2+2,E.position[1]+E.size[1]+4,E.position[2]+E.size[2]/2+2));l.isEmpty()&&l.set(new C(-10,0,-10),new C(10,10,10));let c=l.getCenter(new C),h=l.getSize(new C),d=Math.max(h.x,h.z,24),u=Math.max(600,d*32),f;try{f=new $l({antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch(E){return console.warn("WebGL initialization unavailable",E instanceof Error?E.message:String(E)),V_(i,s,r)}f.setPixelRatio(Math.min(devicePixelRatio,2)),f.setClearColor("#091222"),f.outputColorSpace=qt,f.toneMapping=Kr,f.toneMappingExposure=1.15,f.shadowMap.enabled=!0,f.shadowMap.type=es,f.domElement.setAttribute("aria-label","\u53EF\u65CB\u8F6C\u548C\u7F29\u653E\u7684\u7CFB\u7EDF\u67B6\u6784\u6C99\u76D8"),f.domElement.style.cssText="position:absolute;inset:0;display:block;width:100%;height:100%;touch-action:none",i.prepend(f.domElement);let y=i.querySelector("#labels"),x=y??document.createElement("div");y||(x.id="labels",i.append(x)),x.style.position="absolute",x.style.inset="0",x.style.pointerEvents="none",x.style.overflow="hidden";let g=[],m=i.style.cursor,M=new Ir;M.fog=new Cr("#091222",u*.7,u);let P=new Xt(39,1,.1,u),v=new Jl(P,i);v.enableDamping=!1,v.minDistance=6,v.maxDistance=u*.8,v.minPolarAngle=.2,v.maxPolarAngle=1.35,v.rotateSpeed=.55,v.zoomSpeed=.8,v.panSpeed=.8;let T=new $r("#b9d8ff","#11202a",2.1);M.add(T);let w=d*.8,L=new Qi("#d9e7ff",3);L.position.set(c.x-w*.5,w,c.z+w*.45),L.target.position.set(c.x,0,c.z),M.add(L.target),L.castShadow=!0,L.shadow.mapSize.set(2048,2048),L.shadow.camera.left=-w,L.shadow.camera.right=w,L.shadow.camera.top=w,L.shadow.camera.bottom=-w,L.shadow.camera.near=1,L.shadow.camera.far=w*4,L.shadow.bias=-3e-4,L.shadow.normalBias=.045,M.add(L);let p=new Qi("#547cff",2);p.position.set(c.x+w*.5,w*.6,c.z-w*.7),p.target.position.set(c.x,0,c.z),M.add(p,p.target);let b=new Qi("#f7ce9c",.6);b.position.set(c.x+w*.6,w*.3,c.z+w*.45),b.target.position.set(c.x,0,c.z),M.add(b,b.target);let I="spatial",N=null,O=null,H=!1,F=[],W,j=Object.fromEntries(r.map(E=>[E,0])),Y=null,le=0,K="",ne=!1,oe=0,Fe=new Map,Ae=null,tt={kind:"overview"},ke=new Map,at=[],Q=new Set,re=new Set,Ce=new Set,We=[];function Re(E){return Q.add(E),E}function qe(E){return re.add(E),E}function ue(E,R="#000000",A=1){return qe(new Hs({color:E,emissive:R,emissiveIntensity:.35,roughness:.55,metalness:.25,transparent:A<1,opacity:A,depthWrite:A>=.8}))}function Ie(E,R,A,G,U=!0){let V=new jt(Re(R),A);return G&&V.position.copy(G),V.castShadow=U,V.receiveShadow=!0,E.add(V),V}function me(E,R,A,G){return Ie(E,new Mi(...R),G,Li(A))}function $e(E,R,A,G=.55){let U=new ji(Re(new kr(R.geometry)),qe(new vi({color:A,transparent:!0,opacity:G})));return U.position.copy(R.position),U.rotation.copy(R.rotation),E.add(U),U}let et=me(M,[h.x+8,.25,h.z+8],[c.x,-.24,c.z],ue("#0d1d31"));et.castShadow=!1;let ft=d+8,St=new jr(ft,Math.min(120,Math.max(12,Math.ceil(ft/2))),"#2c4665","#1a2f47");St.position.set(c.x,-.09,c.z),St.scale.set((h.x+8)/ft,1,(h.z+8)/ft),St.material.transparent=!0,St.material.opacity=.36,Q.add(St.geometry),re.add(St.material),M.add(St);for(let E of s.regions){let R=me(M,[E.width,.045,E.depth],[E.center[0],-.075,E.center[2]],ue(new je(E.color).multiplyScalar(.055)));R.castShadow=!1;let A=$e(M,R,E.color,.13);A.position.y=-.047}function Vt(E){let R=document.createElement("canvas");R.width=640,R.height=132;let A=R.getContext("2d");A.fillStyle="#13283be8",A.beginPath(),A.roundRect(2,2,636,128,15),A.fill(),A.strokeStyle=E.color,A.lineWidth=4,A.stroke(),A.fillStyle=E.color,A.fillRect(20,28,7,76);let G=84,U=Te=>`600 ${Te}px "Microsoft YaHei", "Segoe UI", sans-serif`;A.font=U(G);let V=A.measureText(E.shortLabel).width;V>554&&(G*=554/V,A.font=U(G)),A.textAlign="center",A.textBaseline="middle",A.fillStyle="#eff7ff",A.fillText(E.shortLabel,330,66);let he=new Fr(R);he.colorSpace=qt,Ce.add(he);let fe=qe(new Bs({map:he,transparent:!0,depthWrite:!1,depthTest:!1,toneMapped:!1})),pe=new Ur(fe);return pe.scale.set(E.interior?3.2:5.3,E.interior?.66:1.09,1),pe.renderOrder=18,pe}function Mt(E){let R=new hn;R.position.copy(Li(E.position)),R.userData.nodeId=E.id,M.add(R);let A=document.createElement("div");A.className=E.interior?"world-label internal-label":"world-label",A.dataset.nodeId=E.id,A.setAttribute("role","button"),A.tabIndex=0,A.setAttribute("aria-label",`${E.node.label}${n.has(E.id)?"\uFF0C\u70B9\u51FB\u5C55\u5F00\u5185\u90E8\u6559\u5B66\u7ED3\u6784":"\uFF0C\u67E5\u770B\u6A21\u5757\u804C\u8D23"}`),A.title=E.node.label,A.style.cssText="position:absolute;transform:translate(-50%,-50%);pointer-events:auto;background:transparent;border:0;color:transparent;padding:0;border-radius:4px;z-index:2",A.style.setProperty("--module-color",E.color);let G=()=>t(E.id);A.addEventListener("pointerdown",fe=>fe.stopPropagation()),A.addEventListener("click",G),A.addEventListener("keydown",fe=>{(fe.key==="Enter"||fe.key===" ")&&(fe.preventDefault(),G())}),A.addEventListener("mouseenter",()=>S(E.id)),A.addEventListener("mouseleave",()=>S(null)),x.append(A),g.push(A);let U=Vt(E);R.add(U);let V=Ie(R,new Wr(Math.max(E.size[0],E.size[2])*.52,Math.max(E.size[0],E.size[2])*.52+(E.interior?.08:.12),64),qe(new fn({color:E.color,side:bn,transparent:!0,opacity:.8,depthWrite:!1})));V.rotation.x=-Math.PI/2,V.position.y=.075,V.visible=!1;let he={placement:E,group:R,label:A,nameplate:U,halo:V,materials:new Set,baseOpacity:new Map,baseColor:new Map};return ke.set(E.id,he),he}function Tt(E){E.group.traverse(R=>{if(!("material"in R)||R===E.halo)return;let A=Array.isArray(R.material)?R.material:[R.material];for(let G of A)(G instanceof Hs||G instanceof fn||G instanceof vi)&&(E.materials.add(G),E.baseOpacity.set(G,G.opacity),E.baseColor.set(G,G.color.clone()))})}function z(E){let{group:R,placement:A}=E,[G,,U]=A.size,V=me(R,[G+.5,.38,U+.5],[0,.19,0],ue("#172a40"));$e(R,V,A.color,.3),me(R,[G*.6,.06,.065],[0,.43,U/2+.05],ue(A.color,A.color))}function Ot(E){let{group:R,placement:A}=E,[G,U,V]=A.size,he=me(R,[G*.87,U-.8,V*.8],[0,U/2+.08,0],ue("#294b70"));$e(R,he,A.color,.65),me(R,[G*.96,.3,V*.9],[0,U-.18,0],ue("#3f6085")),me(R,[G*.65,U*.55,.09],[0,U*.47,V*.405],ue("#101f33"));for(let fe=0;fe<3;fe++)me(R,[G*.52,.1,.11],[0,U*.36+fe*.52,V*.42],ue(A.color,A.color)),Ie(R,new wi(.06,8,6),ue(A.color,A.color),new C(G*.34,U*.36+fe*.52,V*.42));for(let fe=-1;fe<=1;fe++)me(R,[.22,.4,V*.5],[fe*G*.23,U+.16,0],ue("#4d7096"));Ie(R,new vn(.07,.07,.65,8),ue("#b3c8e5"),new C(0,U+.55,0)),Ie(R,new wi(.17,12,8),ue(A.color,A.color),new C(0,U+.98,0))}function ut(E){let{group:R,placement:A}=E,G=A.size[0]*.4,U=A.size[1];for(let V=0;V<3;V++){let he=.55+(V+.5)*(U-.65)/3;Ie(R,new vn(G,G,(U-.85)/3,40),ue("#29455f"),new C(0,he,0));let fe=Ie(R,new Sn(G,.045,8,40),ue(A.color,A.color),new C(0,he+(U-.85)/6,0));fe.rotation.x=Math.PI/2}Ie(R,new vn(G,G,.12,40),ue("#7795b4"),new C(0,U+.08,0))}function D(E){let{group:R,placement:A}=E,[G,U,V]=A.size,he=ue("#395e79"),fe=me(R,[G*.2,U-.45,V*.62],[-G*.36,U/2,0],he);$e(R,fe,A.color,.7);let pe=me(R,[G*.2,U-.45,V*.62],[G*.36,U/2,0],he);$e(R,pe,A.color,.7);let Te=me(R,[G,.75,V*.7],[0,U-.22,0],ue("#4d7690"));$e(R,Te,A.color,.8),me(R,[G*.48,U*.65,.09],[0,U*.49,0],ue(A.color,A.color,.2));for(let ze of[-G*.25,G*.25])me(R,[.06,U*.74,.08],[ze,U*.49,V*.36],ue(A.color,A.color))}function _(E){let{group:R,placement:A}=E,G=me(R,[3.1,2.1,.45],[0,2,-.1],ue("#668aaa"));G.rotation.x=-.08,$e(R,G,A.color,.75),me(R,[2.7,1.7,.07],[0,2,.17],ue("#164258",A.color));for(let U=0;U<3;U++)me(R,[1.5-U*.2,.065,.06],[-.3,2.45-U*.3,.22],ue(A.color,A.color));me(R,[.4,1,.4],[0,.85,0],ue("#416480")),me(R,[2.3,.16,1.5],[0,.46,.1],ue("#557892"))}function q(E){let{group:R,placement:A}=E;Ie(R,new vn(1.05,1.4,3.7,6),ue("#325a76"),new C(0,2.35,0));let G=Ie(R,new Ki(.9,0),ue(A.color,A.color),new C(0,3.7,.1));G.scale.y=1.25;for(let U of[1.1,2.1,3.1]){let V=Ie(R,new Sn(1.25,.045,8,6),ue(A.color,A.color),new C(0,U,0));V.rotation.x=Math.PI/2}}function Z(E){let{group:R,placement:A}=E;for(let G of[-1.2,1.2])me(R,[5.7,.3,.3],[0,1.4,G],ue("#846343"));for(let G of[-2.4,2.4])me(R,[.3,2.1,2.8],[G,1.3,0],ue("#37516b"));for(let G=-1;G<=1;G++){let U=me(R,[1,1.25,1.15],[G*1.55,1.55,0],ue("#655a46",A.color));$e(R,U,A.color,.8),me(R,[.7,.08,.1],[G*1.55,1.55,.61],ue(A.color,A.color))}me(R,[5.8,.09,.11],[0,2.3,1.35],ue(A.color,A.color))}function ee(E){let{group:R,placement:A}=E;Ie(R,new vn(1.6,1.9,.55,6),ue("#695946"),new C(0,.7,0));let G=Ie(R,new Ki(1.5,0),ue("#dab77d"),new C(0,3,0));G.rotation.y=.4,$e(R,G,A.color,.85);let U=Ie(R,new Sn(1.95,.055,8,48),ue(A.color,A.color),new C(0,2.55,0));U.rotation.x=Math.PI/2}function de(E){let{group:R,placement:A}=E,G=A.id,[U,V,he]=A.size,fe=U-.5,pe=he-.5,Te=V-1.1,ze=.45+Te/2,ce=fe/2-.1,nt=pe/2-.1,Ne=me(R,[fe,.28,pe],[0,.57,0],ue("#1c3550"));$e(R,Ne,A.color,.5);let rt=(bt,Je,At,kn,xt,zn=1,fi=!1)=>{let Kn=new hn;Kn.position.copy(Li(Je)),R.add(Kn);let mf=me(Kn,bt,[0,0,0],ue(xt,"#102545",zn));return $e(Kn,mf,A.color,.6),We.push({owner:G,roof:fi,group:Kn,closed:Li(Je),opened:Li(At),openedRotation:Li(kn)}),Kn},it=rt([fe,.58,pe],[0,V-.4,0],[-U*.1,V+2.8,-he*.75],[-.15,0,-.08],"#40688e",1,!0),Ht=new Set(s.interior.filter(bt=>bt.owner===G).map(bt=>bt.shape));if(Ht.has("rack"))for(let bt of[-U*.26,0,U*.26]){let Je=me(it,[1.3,.85,1.8],[bt,.75,0],ue("#2d736b"));$e(it,Je,A.color,.8),me(it,[.09,.95,1.9],[bt,.75,0],ue(A.color,A.color))}else if(Ht.has("channel")||Ht.has("ledger")){for(let bt of[-U/6,U/6]){let Je=Ie(it,new Sn(.82,.14,12,40),ue(A.color,A.color),new C(bt,1.25,0));Je.rotation.y=.25}me(it,[1.5,.12,.16],[0,1.25,0],ue(A.color,A.color))}else for(let bt of[-U*.25,0,U*.25])me(it,[1.1,.4,Math.min(3,he*.4)],[bt,.46,0],ue("#6c8cad"));me(it,[U*.47,.1,.16],[0,.83,he*.23],ue(A.color,A.color)),rt([fe,Te,.22],[0,ze,-nt],[0,ze+1.4,-nt-1.45],[-.18,0,0],"#274e76",.82),rt([fe,Te,.22],[0,ze,nt],[0,1.25,nt+1.55],[.72,0,0],"#274e76",.82),rt([.22,Te,pe-.4],[-ce,ze,0],[-ce-.15,ze-.4,0],[0,0,-.13],"#284e74",.84),rt([.22,Te,pe-.4],[ce,ze,0],[ce+.15,ze-.4,0],[0,0,.13],"#284e74",.84),me(R,[fe-.3,.085,.1],[0,.76,nt-.25],ue(A.color,A.color))}function ye(E){let{placement:R}=E,A=new hn;E.group.add(A),A.scale.set(R.size[0]/1.7,R.size[1]/(R.shape==="decision"?1.6:1.5),R.size[2]/1.7);let G=me(A,[1.85,.15,1.85],[0,.08,0],ue("#18344e"));if($e(A,G,R.color,.65),R.shape==="decision"){let U=Ie(A,new Ki(.78),ue("#947b43",R.color),new C(0,.92,0));U.rotation.y=Math.PI/4,$e(A,U,R.color,.95)}else if(R.shape==="database")for(let U of[.43,.93]){Ie(A,new vn(.67,.67,.44,32),ue("#396080"),new C(0,U,0));let V=Ie(A,new Sn(.67,.035,8,32),ue(R.color,R.color),new C(0,U+.23,0));V.rotation.x=Math.PI/2}else if(R.shape==="gateway"){for(let V of[-.55,.55])me(A,[.22,1.1,.8],[V,.71,0],ue("#32798b"));let U=me(A,[1.45,.25,.85],[0,1.29,0],ue("#619ca9"));$e(A,U,R.color,.9)}else if(R.shape==="rack"){for(let U of[-.75,.75])me(A,[.12,1.4,1.4],[U,.85,0],ue("#456f76"));for(let U of[.28,.8,1.35]){me(A,[1.65,.09,1.45],[0,U,0],ue("#476c78"));for(let V of[-.4,.4]){let he=me(A,[.58,.37,.65],[V,U+.24,0],ue("#3e8c75"));$e(A,he,R.color,.8)}}}else if(R.shape==="adjust"){let U=Ie(A,new Sn(.58,.14,12,24),ue("#4c9c83"),new C(0,.98,0));U.rotation.x=Math.PI/2,Ie(A,new vn(.22,.33,.8,16),ue(R.color,R.color),new C(0,.9,0));for(let V of[-.55,.55]){let he=Ie(A,new bi(.18,.45,8),ue(R.color,R.color),new C(V,1.23,.15));V<0&&(he.rotation.z=Math.PI)}me(A,[1.3,.18,1.1],[0,.34,0],ue("#426e70"))}else if(R.shape==="link"){for(let U of[-.38,.38]){let V=Ie(A,new Sn(.47,.12,12,28),ue(R.color,R.color),new C(U,.96,0));V.rotation.y=U<0?-.45:.8}me(A,[1.4,.25,1],[0,.36,0],ue("#655780"))}else if(R.shape==="channel"){Ie(A,new Sn(.64,.14,12,32),ue(R.color,R.color),new C(0,.95,0));let U=me(A,[.47,.47,.65],[0,.95,.05],ue("#c2afff",R.color));U.rotation.z=Math.PI/4,me(A,[1.4,.25,1],[0,.31,0],ue("#645783"))}else if(R.shape==="ledger")for(let U=0;U<4;U++){let V=me(A,[1.36,.17,1.15],[U%2*.09,.34+U*.26,0],ue(U===3?"#9383b7":"#594e7e"));$e(A,V,R.color,.7),me(A,[.09,.09,.72],[-.42,.46+U*.26,0],ue(R.color,R.color))}else if(R.shape==="result"){let U=me(A,[1.25,.65,1.15],[0,.48,0],ue("#416579"));$e(A,U,R.color,.8),me(A,[.12,.7,.12],[0,1.08,0],ue(R.color,R.color));let V=Ie(A,new bi(.32,.58,4),ue(R.color,R.color),new C(0,1.42,0));V.rotation.z=-Math.PI/2}else{let U=me(A,[1.35,1.05,1.35],[0,.69,0],ue("#315472"));$e(A,U,R.color,.8),me(A,[1,.1,.09],[0,.62,.72],ue(R.color,R.color)),me(A,[1.2,.12,1.2],[0,1.28,0],ue("#56799a"))}}for(let E of s.overview){let R=Mt(E);switch(z(R),E.shape){case"shell":de(R);break;case"database":ut(R);break;case"gateway":D(R);break;case"client":_(R);break;case"auth":q(R);break;case"event":Z(R);break;case"external":ee(R);break;case"decision":case"rack":case"adjust":case"link":case"channel":case"ledger":case"result":ye(R);break;default:Ot(R)}Tt(R)}for(let E of s.interior){let R=Mt(E);ye(R),Tt(R),R.group.visible=!1}function te(E){let R=ke.get(E);if(!R)throw new Error(`\u7A7A\u95F4\u5BF9\u8C61\u4E0D\u5B58\u5728\uFF1A${E}`);let A=n.has(E)?E:null;return R.group.position.clone().add(new C(0,A&&j[A]>.5?1.8:R.placement.size[1]+.18,0))}function se(E,R){let A=E.group.position.clone(),G=R.group.position.clone(),U=G.x-A.x,V=G.z-A.z,he=Math.hypot(U,V)||1,fe=U/he,pe=V/he,Te=E.placement.size[0]/2,ze=E.placement.size[2]/2,ce=Math.min(Math.abs(fe)>.001?Te/Math.abs(fe):1/0,Math.abs(pe)>.001?ze/Math.abs(pe):1/0);return A.x+=fe*ce,A.z+=pe*ce,A.y+=E.placement.interior?1:1.05,A}function ve(E,R,A=!1){if(E===R){let Te=te(E.placement.id),ze=Math.max(1.1,E.placement.size[0]*.65);return new Ji(Te,Te.clone().add(new C(ze,1.5,ze)),Te.clone().add(new C(-ze,1.5,ze)),Te.clone())}if(A||E.placement.interior||R.placement.interior){let Te=te(E.placement.id),ze=te(R.placement.id),ce=ze.clone().sub(Te);ce.y=0;let nt=Math.max(.55,Math.min(2.8,ce.length()*.12));return new Ji(Te,Te.clone().addScaledVector(ce,.28).add(new C(0,nt,0)),ze.clone().addScaledVector(ce,-.28).add(new C(0,nt,0)),ze)}let G=se(E,R),U=se(R,E),V=U.clone().sub(G);V.y=0,V.normalize();let he=A?.36:.24,fe=G.clone().addScaledVector(V,.8);fe.y=he;let pe=U.clone().addScaledVector(V,-.8);return pe.y=he,new zs([G,fe,pe,U],!1,"centripetal")}function Be(E,R,A,G,U){let V=ke.get(R),he=ke.get(A),fe=ve(V,he),pe=new hn;M.add(pe);let Te=G?"#709ac5":V.placement.color,ze=qe(new fn({color:Te,transparent:!0,opacity:G?.42:.4,depthWrite:!1})),ce=Ie(pe,new Vs(fe,G?36:48,G?.025:.035,6,!1),ze,void 0,!1);if(U){let nt=fe.getTangent(.94).normalize();Ie(pe,new bi(G?.1:.14,G?.25:.35,8),ze,fe.getPoint(.94),!1).quaternion.setFromUnitVectors(new C(0,1,0),nt)}ce.userData.connectionId=E,pe.visible=!G,at.push({id:E,source:R,target:A,group:pe,materials:new Set([ze]),interior:G,owner:G?V.placement.owner:null})}for(let E of a.edges)Be(E.id,E.source,E.target,!1,E.directed);for(let E of r)for(let R of o[E].edges)Be(R.id,R.source,R.target,!0,R.directed);let _e=new hn;M.add(_e);let Se=qe(new fn({color:"#91f6ff",depthTest:!1})),De=Ie(_e,new wi(.18,18,12),Se,void 0,!1),Ve=qe(new fn({color:"#62dfff",transparent:!0,opacity:.22,depthWrite:!1,depthTest:!1})),Ye=Ie(De,new wi(.34,16,10),Ve,void 0,!1);De.renderOrder=30,Ye.renderOrder=29,De.visible=!1;let k=null,ge=[];function ie(){for(let E of ge){_e.remove(E),E.geometry.dispose(),Q.delete(E.geometry);let R=Array.isArray(E.material)?E.material:[E.material];for(let A of R)A.dispose(),re.delete(A)}ge.length=0,k=null,De.visible=!1}function xe(){if(ie(),!Y||!Y.route.length)return;let R={request:"#6fe6ff",data:"#a2b9ff",success:"#68f4bd",failure:"#ff988e"}[Y.tone];if(Se.color.set(R),Ve.color.set(R),Y.route.length===1){De.position.copy(te(Y.route[0])),De.visible=!0;return}let A=new Hr;for(let G=0;G<Y.route.length-1;G++){let U=ke.get(Y.route[G]),V=ke.get(Y.route[G+1]),he=ve(U,V,!0);A.add(he);let fe=qe(new fn({color:R,transparent:!0,opacity:.95,depthWrite:!1})),pe=Ie(_e,new Vs(he,44,.085,8,!1),fe,void 0,!1);pe.renderOrder=4,ge.push(pe);let Te=Ie(_e,new bi(.2,.43,10),qe(new fn({color:R,transparent:!0,opacity:.95,depthWrite:!1})),he.getPoint(.84),!1);Te.quaternion.setFromUnitVectors(new C(0,1,0),he.getTangent(.84).normalize()),ge.push(Te)}k=A,De.visible=!0,De.position.copy(A.getPointAt(le))}function be(){let E=new Set(Y?.route??[]),R=N?Gi(e,N):null,A=new Set;if(R){A.add(R);for(let[U,V]of e.owners)V===R&&A.add(U);for(let U of a.edges){let V=U.source===R?U.target:U.target===R?U.source:null;V&&!Gi(e,V)&&A.add(V)}}else N&&A.add(N);let G=U=>!N||A.has(U);for(let[U,V]of ke){let he=N===U,fe=O===U,pe=E.has(U),Te=n.has(U)?U:null,ze=!W||W.nodeIds.has(U),ce=1;Y?ce=pe||he||Te&&F.includes(Te)?1:.32:F.length&&!G(U)?ce=.26:F.length&&!V.placement.interior&&!Te&&(ce=.58),!ze&&!he&&!pe&&(ce*=.22),H&&!G(U)&&(ce*=.08),fe&&(ce=Math.max(ce,.9));let nt=Te?1-j[Te]*.76:1;for(let Ne of V.materials){let rt=ce<.5?.6:fe||he?1.18:1;Ne.color.copy(V.baseColor.get(Ne)).multiplyScalar(rt),Ne.opacity=V.baseOpacity.get(Ne)*ce*nt,Ne.transparent=Ne.opacity<.999,Ne.depthWrite=Ne.opacity>=.8}V.group.traverse(Ne=>{Ne instanceof jt&&Ne!==V.halo&&(Ne.castShadow=ce>=.5&&(!Te||j[Te]<.2))}),V.halo.visible=(he||fe||pe)&&(!V.placement.owner||j[V.placement.owner]>.03),V.halo.material.opacity=fe&&!he?.5:.8,V.halo.material.color.set(pe&&Y?{request:"#6fe6ff",data:"#a2b9ff",success:"#68f4bd",failure:"#ff988e"}[Y.tone]:V.placement.color),V.label.dataset.selected=String(he),V.label.dataset.active=String(pe),V.label.dataset.related=String(ze),V.label.setAttribute("aria-pressed",String(he)),V.nameplate.material.opacity=Math.max(.35,ce),V.nameplate.userData.emphasizedVisible=ce>.12}for(let U of at){let V=Y?.route.some((pe,Te)=>pe===U.source&&Y.route[Te+1]===U.target)??!1,he=!W||W.edgeIds.has(U.id),fe=Y?V?.75:.08:he?F.length&&!U.interior?.2:U.interior?.55:.34:.06;H&&(!G(U.source)||!G(U.target))&&(fe*=.12);for(let pe of U.materials)pe.opacity=fe;U.group.visible=!U.owner||j[U.owner]>.08}}function ae(E,R){j[E]=R;for(let A of We)A.owner===E&&(A.group.position.copy(A.closed).lerp(A.opened,R),A.group.rotation.set(A.openedRotation.x*R,A.openedRotation.y*R,A.openedRotation.z*R),A.group.scale.setScalar(A.roof?1-R*.95:1),A.group.visible=!A.roof||R<.92);for(let A of s.interior){if(A.owner!==E)continue;let G=ke.get(A.id),U=Li(A.position),V=ke.get(E).group.position,he=new C(V.x+(U.x-V.x)*.2,.75,V.z+(U.z-V.z)*.2);G.group.position.copy(he).lerp(U,R),G.group.scale.setScalar(.15+.85*R),G.group.visible=R>.025}be()}let Oe=new C;function Ue(E){return Oe.copy(E).project(P),{x:(Oe.x+1)*i.clientWidth/2,y:(1-Oe.y)*i.clientHeight/2,visible:Oe.z>-1&&Oe.z<1}}function _t(){let E=[],R=new Set(Y?.route??[]),A=U=>U.placement.id===N?4:U.placement.id===O?3:R.has(U.placement.id)?2:U.placement.interior?1:0,G=[...ke.values()].sort((U,V)=>A(V)-A(U));for(let U of G){let{placement:V}=U,he=new C(0,V.size[1]+(V.interior?.5:1.1),0);n.has(V.id)&&he.lerp(new C(0,1.2,V.size[2]/2+.2),j[V.id]),U.nameplate.position.copy(he);let fe=U.nameplate.getWorldPosition(new C),pe=Ue(fe),Te=fe.clone().applyMatrix4(P.matrixWorldInverse),ze=i.clientHeight/(2*Math.tan(is.degToRad(P.fov)/2)*Math.max(.1,-Te.z)),ce=V.interior?3.2:5.3,nt=Math.min(ce,128/(ze*U.group.scale.x));U.nameplate.scale.set(nt,nt*132/640,1);let Ne=U.nameplate.scale.x*U.group.scale.x*ze,rt=U.nameplate.scale.y*U.group.scale.y*ze,it={left:pe.x-Ne/2,right:pe.x+Ne/2,top:pe.y-rt/2,bottom:pe.y+rt/2},Ht=E.some(Je=>it.left<Je.right+3&&it.right>Je.left-3&&it.top<Je.bottom+3&&it.bottom>Je.top-3),bt=pe.visible&&U.group.visible&&U.nameplate.userData.emphasizedVisible!==!1&&(!V.owner||j[V.owner]>.65)&&it.left>=2&&it.right<=i.clientWidth-2&&it.top>=2&&it.bottom<=i.clientHeight-2&&(!Ht||A(U)>=2);U.nameplate.visible=bt,bt&&E.push(it),U.label.style.visibility=bt?"visible":"hidden",U.label.style.left=`${pe.x}px`,U.label.style.top=`${pe.y}px`,U.label.style.width=`${Math.max(24,Ne)}px`,U.label.style.height=`${Math.max(22,rt)}px`}ht()}function ht(){let E=i.querySelector("#context-card");if(E&&!E.hidden&&N&&ke.has(N)){let A=ke.get(N),G=Ue(A.group.position.clone().add(new C(0,A.placement.size[1]*.7,0)));E.style.visibility=G.visible?"visible":"hidden";let U=E.offsetWidth||280,V=E.offsetHeight||140,he=Gi(e,N),fe=he?ke.get(he):A,{position:pe,size:Te}=fe.placement,ze=[];for(let it of[-1,1])for(let Ht of[0,1])for(let bt of[-1,1])ze.push(Ue(new C(pe[0]+it*(Te[0]/2+.7),pe[1]+Ht*(Te[1]+(he&&F.includes(he)?3.2:.7)),pe[2]+bt*(Te[2]/2+.8))));let ce=Math.min(...ze.map(it=>it.x)),Ne=Math.max(...ze.map(it=>it.x))+16;Ne+U>i.clientWidth-16&&(Ne=ce-U-16),E.style.left=`${Math.max(12,Math.min(i.clientWidth-U-12,Ne))}px`;let rt=i.clientWidth<600?i.clientHeight-V-142:G.y-V*.4;E.style.top=`${Math.max(72,Math.min(i.clientHeight-V-125,rt))}px`}let R=i.querySelector("#hover-hint");if(R){let A=O?ke.get(O):void 0;if(R.hidden=!A||O===N||!!Y,A&&!R.hidden){let G=Ue(A.nameplate.getWorldPosition(new C));R.textContent=A.placement.node.label,R.style.left=`${Math.max(12,Math.min(i.clientWidth-(R.offsetWidth||180)-12,G.x+20))}px`,R.style.top=`${Math.max(68,Math.min(i.clientHeight-145,G.y+20))}px`}}}function Qt(){ne||(P.updateMatrixWorld(),_t(),f.render(M,P))}function Rt(){!ne&&!oe&&(oe=requestAnimationFrame(ac))}function ac(E){if(oe=0,ne)return;let R=!1;for(let[A,G]of Fe){let U=Kl((E-G.started)/G.duration),V=1-(1-U)**3;ae(A,is.lerp(G.from,G.to,V)),U===1&&(Fe.delete(A),R=!0)}if(R&&xe(),Ae){let A=Kl((E-Ae.started)/Ae.duration),G=1-(1-A)**3;P.position.copy(Ae.fromPosition).lerp(Ae.toPosition,G),v.target.copy(Ae.fromTarget).lerp(Ae.toTarget,G),v.update(),A===1&&(Ae=null)}Qt(),(Fe.size||Ae)&&Rt()}function lc(E,R,A=!0){A&&!nf()?(Ae={started:performance.now(),duration:650,fromPosition:P.position.clone(),toPosition:E,fromTarget:v.target.clone(),toTarget:R},Rt()):(Ae=null,P.position.copy(E),v.target.copy(R),v.update(),Rt())}function ar(){return Oi(s.overview.map(E=>E.id),3.7)}function ui(E){let R=E?[E]:F;return R.length?Oi([...R,...s.interior.filter(A=>A.owner&&R.includes(A.owner)).map(A=>A.id)],1.7):ar()}function Oi(E,R=0,A){let G=new Dn;for(let ce of E){let nt=ke.get(ce);if(!nt)continue;let{position:Ne,size:rt}=nt.placement;G.expandByPoint(new C(Ne[0]-rt[0]/2-.5,Ne[1],Ne[2]-rt[2]/2-.5)),G.expandByPoint(new C(Ne[0]+rt[0]/2+.5,Ne[1]+rt[1]+1.1+R,Ne[2]+rt[2]/2+.5))}G.isEmpty()&&G.copy(l);let U=A?.clone()??G.getCenter(new C),V=I==="flat"?new C(0,1,15e-5).normalize():new C(12,17,21).normalize(),he=new C(0,1,0).cross(V).normalize(),fe=V.clone().cross(he).normalize(),pe=Math.tan(is.degToRad(P.fov)/2),Te=pe*P.aspect,ze=18;for(let ce of[G.min.x,G.max.x])for(let nt of[G.min.y,G.max.y])for(let Ne of[G.min.z,G.max.z]){let rt=new C(ce,nt,Ne).sub(U),it=rt.dot(V);ze=Math.max(ze,it+Math.abs(rt.dot(he))/(Te*.82),it+Math.abs(rt.dot(fe))/(pe*.8))}return{target:U,position:U.clone().addScaledVector(V,ze)}}function _o(){if(!Y)return ui();let E=[...new Set([...Y.route,Y.focusId])],R=new Set(E.map(A=>ke.get(A).placement.owner));return R.size===1&&!R.has(null)?ui([...R][0]):Oi(E,2.7)}function xo(E){let R=ke.get(E);if(n.has(E)&&F.includes(E))return ui(E);if(!R.placement.interior)return Oi([E],.5);let A=Li(R.placement.position).add(new C(0,R.placement.size[1]*.6,0));if(i.clientWidth<600&&R.placement.owner){let he=Oi([R.placement.owner],.7,A);return{target:A,position:A.clone().add(he.position.sub(A).multiplyScalar(1.08))}}let G=Math.max(.45,P.aspect),U=Math.max(1,.9/G),V=I==="flat"?new C(0,15*U,.01):new C(6.4,8.7,10).multiplyScalar(U);return{target:A,position:A.clone().add(V)}}function en(E=!1){let R=tt.kind==="demo"?_o():tt.kind==="focus"&&tt.id&&ke.has(tt.id)?xo(tt.id):F.length?ui():ar();lc(R.position,R.target,E)}function cs(){v.enableRotate=I==="spatial",v.minPolarAngle=I==="flat"?1e-4:.2,v.maxPolarAngle=I==="flat"?2e-4:1.35,v.mouseButtons.LEFT=I==="flat"?Ln.PAN:Ln.ROTATE,v.touches.ONE=I==="flat"?Mn.PAN:Mn.ROTATE,v.touches.TWO=Mn.DOLLY_PAN}function lr(E=!0){tt={kind:F.length?"cutaway":"overview"},en(E)}function vo(E){ne||!ke.has(E)||(tt={kind:"focus",id:E},en(!0))}function Fi(){Rt()}function cr(){Ae=null}v.addEventListener("change",Fi),v.addEventListener("start",cr);let Bi=new Zr,hr=new Me,En=null,di=new Set;function So(E){if(di.add(E.pointerId),di.size>1){En=null;return}E.isPrimary&&(En={id:E.pointerId,x:E.clientX,y:E.clientY})}function Mo(){En=null,di.clear()}function bo(E){let R=f.domElement.getBoundingClientRect();hr.set((E.clientX-R.left)/R.width*2-1,-(E.clientY-R.top)/R.height*2+1),Bi.setFromCamera(hr,P);let A=[...ke.values()].filter(U=>U.group.visible).map(U=>U.group),G=Bi.intersectObjects(A,!0);for(let U of G){if(U.object instanceof ji||U.object===De||U.object===Ye)continue;let V=U.object,he=!0;for(;V;){if(!V.visible){he=!1;break}V=V.parent}if(!he)continue;let fe=U.object;for(;fe&&!fe.userData.nodeId;)fe=fe.parent;if(fe?.userData.nodeId){let pe=fe.userData.nodeId;if(n.has(pe)&&j[pe]>.6&&U.object!==ke.get(pe).nameplate)continue;return pe}}return null}function ur(E){if(di.delete(E.pointerId),!En||E.pointerId!==En.id)return;let R=En;if(En=null,E.button!==0||Math.hypot(E.clientX-R.x,E.clientY-R.y)>5)return;let A=bo(E);A&&t(A)}function S(E){O===E||ne||(O=E,i.style.cursor=E?"pointer":"grab",be(),Rt())}function B(E){if(!(di.size||E.pointerType==="touch")){if(E.target instanceof HTMLElement&&E.target.closest("#context-card, button, select")){S(null);return}S(bo(E))}}function J(){S(null)}i.addEventListener("pointerdown",So),i.addEventListener("pointerup",ur),i.addEventListener("pointercancel",Mo),i.addEventListener("pointermove",B),i.addEventListener("pointerleave",J);function X(){if(ne)return;let E=Math.max(i.clientWidth,1),R=Math.max(i.clientHeight,1);f.setSize(E,R,!1),P.aspect=E/R,P.updateProjectionMatrix(),en(!1),Rt()}let $=new ResizeObserver(X);$.observe(i);let we=new ResizeObserver(Rt),Pe=i.querySelector("#context-card");Pe&&we.observe(Pe);for(let E of r)ae(E,0);return cs(),X(),lr(!1),Qt(),{renderer:"webgl",setMode(E){ne||I===E||(I=E,cs(),en(!1))},setOpenModules(E,R=!0){if(ne)return;let A=r.filter(G=>E.includes(G));if(!(A.length===F.length&&A.every((G,U)=>G===F[U]))){F=A,tt={kind:F.length?"cutaway":"overview"};for(let G of r){let U=F.includes(G)?1:0;if(j[G]===U){Fe.delete(G);continue}R&&!nf()?Fe.set(G,{started:performance.now(),duration:650,from:j[G],to:U}):(Fe.delete(G),ae(G,U))}xe(),be(),Rt(),en(R)}},setSelection(E,R){ne||(N=E,W=R,be(),Rt())},setIsolation(E){ne||H===E||(H=E,be(),Rt())},setDemo(E,R){if(ne)return;for(let G of E?.route??[])if(!ke.has(G))throw new Error(`\u6F14\u793A\u8DEF\u5F84\u5F15\u7528\u4E0D\u5B58\u5728\u7684\u8282\u70B9\uFF1A${G}`);let A=E?JSON.stringify([E.id,E.tone,E.route]):"";Y=E,le=Kl(R),A!==K&&(K=A,xe(),be(),E?(tt={kind:"demo"},en(!0)):tt={kind:F.length?"cutaway":"overview"}),k&&De.position.copy(k.getPointAt(le)),Rt()},focus:vo,reset:()=>lr(),state:()=>({mode:I,cutaway:F.length>0,openModules:[...F],shellOpen:{...j},isolated:H,selectedId:N,camera:P.position.toArray(),target:v.target.toArray(),objectIds:[...ke.keys()],demoRoute:[...Y?.route??[]],demoProgress:le,geometryCount:f.info.memory.geometries}),dispose(){if(!ne){ne=!0,cancelAnimationFrame(oe),Fe.clear(),Ae=null,$.disconnect(),we.disconnect(),v.removeEventListener("change",Fi),v.removeEventListener("start",cr),v.dispose(),i.removeEventListener("pointerdown",So),i.removeEventListener("pointerup",ur),i.removeEventListener("pointercancel",Mo),i.removeEventListener("pointermove",B),i.removeEventListener("pointerleave",J),ie();for(let E of Q)E.dispose();for(let E of re)E.dispose();for(let E of Ce)E.dispose();L.shadow.map?.dispose(),f.dispose(),f.forceContextLoss(),f.domElement.remove();for(let E of g)E.remove();y||x.remove(),g.length=0,di.clear(),En=null,Y=null,W=void 0,M.clear(),ke.clear(),at.length=0,We.length=0,Q.clear(),re.clear(),Ce.clear(),i.style.cursor=m}}}}function sf(i){let e=new Map(i.map(d=>[d.id,d]));function t(d){if(d===null)return[];let u=e.get(d);if(!u)throw new Error(`\u672A\u77E5\u6F14\u793A\u573A\u666F\uFF1A${d}`);return u.steps}function s(d=i[0]?.id??null){return t(d),{scenario:d,status:"idle",index:-1,elapsedMs:0}}function r(d){return t(d.scenario)[d.index]?.durationMs??2200}function n(d){return t(d.scenario).length?d.status==="idle"||d.status==="complete"?{...d,status:"playing",index:0,elapsedMs:0}:{...d,status:"playing"}:{...d}}function a(d){return{...d,status:d.status==="playing"?"paused":d.status}}function o(d){let u=t(d.scenario),f=u.length-1;return f<0?{...d}:d.index>=f?{...d,status:"complete",index:f,elapsedMs:u[f].durationMs}:{...d,status:"paused",index:d.index+1,elapsedMs:0}}function l(d){return d.index<0?{...d}:{...d,status:"paused",index:Math.max(0,d.index-1),elapsedMs:0}}function c(d,u){if(!Number.isFinite(u)||u<0)throw new RangeError("\u6F14\u793A\u65F6\u95F4\u589E\u91CF\u5FC5\u987B\u4E3A\u6709\u9650\u7684\u975E\u8D1F\u6570\u3002");if(d.status!=="playing")return{...d};let f=t(d.scenario),y=d.index,x=d.elapsedMs,g=u;for(;y<f.length;){let m=f[y].durationMs,M=m-x;if(g<M)return{...d,index:y,elapsedMs:x+g};if(g-=M,y===f.length-1)return{...d,status:"complete",index:y,elapsedMs:m};y+=1,x=0}return{...d}}function h(d){let u=t(d.scenario);if(d.index<0||!u.length)return 0;if(d.status==="complete")return 1;let f=u.reduce((y,x)=>y+x.durationMs,0);return(u.slice(0,d.index).reduce((y,x)=>y+x.durationMs,0)+d.elapsedMs)/f}return{getSteps:t,createState:s,stepDuration:r,play:n,pause:a,next:o,previous:l,advance:c,progress:h,reset:d=>s(d.scenario),changeScenario:s}}var po=JSON.parse(document.getElementById("blueprint-data").textContent),Dt=us(po),Pt=po.id,Kt=dc(po),rf=new Map([[Pt,Kt]]),rr=Kt.scenarios,Ni=Kt.document,nr=Kt.documents,ir=Kt.moduleIds,mo=i=>Gi(Kt,i),{getSteps:uo,createState:H_,stepDuration:G_,play:W_,pause:q_,next:X_,previous:$_,reset:Y_,changeScenario:Z_,advance:j_,progress:J_}=sf(rr),Gh=Vn(Ni),Wh=new Map(ir.map(i=>[i,Vn(nr[i])])),Ui=new Map([...Ni.nodes,...ir.flatMap(i=>nr[i].nodes)].map(i=>[i.id,i])),Le=i=>document.getElementById(i),os=Le("node-select"),Ql=Le("context-card"),yt,sr="spatial",rn=new Set,gt=null,yn="none",Bn=!1,_n=!1,Xe=H_(),ho=0,er=null,as=null;function li(i,e){let t=Le(i);t.textContent!==e&&(t.textContent=e)}function tr(i,e){let t=Le(i);t.setAttribute("aria-label",e),t.title=e;let s=t.querySelector(".sr-only");s&&s.textContent!==e&&(s.textContent=e)}function ec(){cancelAnimationFrame(ho),ho=0,er=null}function ls(){Xe=q_(Xe),ec(),sc()}function or(){ls(),as=null,yt.setDemo(null,0)}function of(){os.replaceChildren(new Option("\u9009\u62E9\u6A21\u5757\u6216\u7EC4\u4EF6",""));let i=document.createElement("optgroup");i.label="\u7CFB\u7EDF\u6A21\u5757";for(let e of Ni.nodes)i.append(new Option(e.label,e.id));os.append(i);for(let e of ir){let t=document.createElement("optgroup");t.label=`${Ui.get(e).label}\u5185\u90E8`;for(let s of nr[e].nodes)t.append(new Option(s.label,s.id));os.append(t)}}function af(){document.documentElement.dataset.viewId=Pt;let i=Le("view-breadcrumbs");i.hidden=!po.navigation?.views.length,document.documentElement.dataset.navigation=String(!i.hidden),i.replaceChildren();for(let e of[...Dt.getAncestors(Pt),Ni]){let t=document.createElement("button");t.textContent=e.title,t.dataset.viewId=e.id,e.id===Pt?(t.disabled=!0,t.setAttribute("aria-current","page")):t.addEventListener("click",()=>nc(e.id)),i.append(t)}Le("back-view").hidden=Pt===Dt.rootId,tc()}function tc(){let i=Le("view-breadcrumbs"),e=i.hidden?0:Math.ceil(i.getBoundingClientRect().bottom+12);document.documentElement.style.setProperty("--navigation-clearance",`${e}px`)}function go(i){if(i!==Pt){if(!Dt.getView(i))throw new Error(`\u672A\u77E5\u89C6\u56FE\uFF1A${i}`);yt.dispose(),Pt=i,Kt=rf.get(i)??dc(po,i),rf.set(i,Kt),Ni=Kt.document,nr=Kt.documents,ir=Kt.moduleIds,Gh=Vn(Ni),Wh=new Map(ir.map(e=>[e,Vn(nr[e])])),Ui=new Map([...Ni.nodes,...ir.flatMap(e=>nr[e].nodes)].map(e=>[e.id,e])),gt=null,yn="none",Bn=!1,_n=!1,as=null,Ql.hidden=!0;for(let e of["left","top","visibility"])Ql.style.removeProperty(e);Le("hover-hint").hidden=!0,yt=Hh(Le("stage"),Kt,yo),yt.setMode(sr),document.documentElement.dataset.renderer=yt.renderer,Le("fallback").hidden=yt.renderer!=="unavailable",of(),ci([],!1),af(),hi()}}function nc(i,e){or(),go(i),yo(e??null),oc(!1),e||(ci([]),yt.reset()),hi()}function ci(i,e=!0){rn=new Set(i),yt.setOpenModules([...rn],e),document.documentElement.dataset.openModules=[...rn].join(","),document.documentElement.dataset.cutaway=String(rn.size>0)}function fo(){if(!gt||yn==="none")return;let i=mo(gt);return wo(Kt.owners.has(gt)&&i?Wh.get(i):Gh,gt,yn)}function K_(i){let e=Ui.get(i),t=mo(i),s=Kt.owners.has(i)&&t?Wh.get(t):Gh,r={confirmed:"\u5DF2\u8BC1\u5B9E",assumed:"\u5047\u8BBE",planned:"\u89C4\u5212"},n=e.sources?.map(l=>`${l.path}${l.line?`:${l.line}`:""}`).join(`
`),a=[...s.incoming.get(i)??[],...s.outgoing.get(i)??[]],o=[...new Map(a.map(l=>[l.id,l])).values()].map(l=>{let c=l.sources?.map(h=>`${h.path}${h.line?`:${h.line}`:""}`).join(`
`);return`${Ui.get(l.source)?.label??l.source} ${l.directed?"\u2192":"\u2014"} ${Ui.get(l.target)?.label??l.target}${l.label?` \xB7 ${l.label}`:""}
${l.kind} \xB7 ${l.evidenceStatus?r[l.evidenceStatus]:"\u4F9D\u636E\u672A\u6807\u6CE8"}${l.details?`
${l.details}`:""}${c?`
\u6765\u6E90\uFF1A${c}`:""}`});return[e.details??e.summary??"",`\u4F9D\u636E\uFF1A${e.evidenceStatus?r[e.evidenceStatus]:"\u672A\u6807\u6CE8"}`,n?`\u6765\u6E90\uFF1A
${n}`:"",o.length?`\u5173\u7CFB\uFF1A
${o.join(`
`)}`:""].filter(Boolean).join(`

`)}function hi(){yt.setSelection(gt,fo()),yt.setIsolation(Bn),ic()}function yo(i){if(i&&!Ui.has(i))return;or(),gt=i,yn="none",_n=!1;let e=mo(i);e&&ci([...rn,e]),i||(Bn=!1),hi(),i&&yt.focus(i)}function lf(){Pt!==Dt.rootId&&go(Dt.rootId),or(),gt=null,yn="none",Bn=!1,_n=!1,ci([]),hi(),yt.reset(),Le("reset-view").focus({preventScroll:!0})}function Q_(){let i=Le("bridge-links"),e=gt?Dt.getBridges(Pt,gt):[];i.hidden=!_n||e.length===0,i.replaceChildren();let t={confirmed:"\u5DF2\u8BC1\u5B9E",assumed:"\u5047\u8BBE",planned:"\u89C4\u5212"};for(let s of e){let r=document.createElement("div"),n=document.createElement("p"),a=c=>`${Dt.getView(c.viewId).title} \xB7 ${Dt.getNode(c.viewId,c.nodeId).label} (${c.viewId}/${c.nodeId})`;n.textContent=[s.label??"\u89C6\u56FE\u5173\u8054",`${a(s.source)} ${s.directed?"\u2192":"\u2014"} ${a(s.target)}`,`${s.kind} \xB7 ${s.evidenceStatus?t[s.evidenceStatus]:"\u4F9D\u636E\u672A\u6807\u6CE8"}`,s.details??"",...(s.sources??[]).map(c=>`\u6765\u6E90\uFF1A${c.path}${c.line?`:${c.line}`:""}`)].filter(Boolean).join(`
`);let o=s.source.viewId===Pt&&s.source.nodeId===gt?s.target:s.source,l=document.createElement("button");l.dataset.bridgeId=s.id,l.dataset.targetViewId=o.viewId,l.dataset.targetNodeId=o.nodeId,l.textContent=`\u524D\u5F80 ${Dt.getView(o.viewId).title} \xB7 ${Dt.getNode(o.viewId,o.nodeId).label}`,l.addEventListener("click",()=>nc(o.viewId,o.nodeId)),r.append(n,l),i.append(r)}}function ic(){let i=gt?Ui.get(gt):void 0,e=mo(gt),t=as&&Xe.index>=0?uo(Xe.scenario)[Xe.index]:void 0;document.documentElement.dataset.mode=sr,document.documentElement.dataset.selectedNode=gt??"",document.documentElement.dataset.highlight=yn,document.documentElement.dataset.isolated=String(Bn),Ql.hidden=!i,li("context-title",i?.label??""),li("context-summary",t?.title??i?.summary??"");let s=i?K_(i.id):"";li("context-details",t?`${s}

${t.description}`:s),Le("context-details").hidden=!_n,Q_(),Le("enter-view").hidden=!gt||!Dt.getChild(Pt,gt),Le("more-details").setAttribute("aria-expanded",String(_n)),tr("more-details",_n?"\u6536\u8D77\u804C\u8D23\u8BF4\u660E":"\u67E5\u770B\u5B8C\u6574\u804C\u8D23"),Le("toggle-shell").hidden=!e,tr("toggle-shell",e&&rn.has(e)?"\u6536\u62E2\u5F53\u524D\u670D\u52A1":"\u5C55\u5F00\u5F53\u524D\u670D\u52A1"),Le("toggle-shell").setAttribute("aria-expanded",String(!!e&&rn.has(e)));for(let n of["focus-node","isolate-node"])Le(n).disabled=!i||yt.renderer!=="webgl";Le("isolate-node").setAttribute("aria-pressed",String(Bn)),tr("isolate-node",Bn?"\u663E\u793A\u5468\u56F4\u6A21\u5757":"\u9694\u79BB\u5F53\u524D\u6A21\u5757");let r=fo();for(let[n,a]of[["show-all","none"],["show-upstream","upstream"],["show-downstream","downstream"]])Le(n).setAttribute("aria-pressed",String(yn===a)),Le(n).disabled=!i,a!=="none"&&tr(n,`${a==="upstream"?"\u4E0A\u6E38":"\u4E0B\u6E38"}${a===yn&&r?` \xB7 ${r.nodeIds.size} \u4E2A\u8282\u70B9`:""}`);Le("back-overview").hidden=Pt===Dt.rootId&&!i&&rn.size===0,li("view-label",e&&rn.has(e)?`${Ui.get(e).label} / \u5185\u90E8`:Pt===Dt.rootId?"\u7CFB\u7EDF\u603B\u89C8":Ni.title),os.value=gt??"";for(let n of["spatial-view","flat-view","reset-view"])Le(n).disabled=yt.renderer!=="webgl";Le("flat-view").setAttribute("aria-pressed",String(sr==="flat")),Le("spatial-view").setAttribute("aria-pressed",String(sr==="spatial"))}function sc(){let i=document.activeElement,e=uo(Xe.scenario),t=Xe.index>=0?e[Xe.index]:void 0;document.documentElement.dataset.demoStatus=Xe.status,document.documentElement.dataset.demoStep=t?.id??"",document.documentElement.dataset.demoScenario=Xe.scenario??"",li("demo-status",{idle:"\u5C31\u7EEA",playing:"\u64AD\u653E",paused:"\u6682\u505C",complete:"\u5B8C\u6210"}[Xe.status]),li("demo-counter",`${Math.max(0,Xe.index+1).toString().padStart(2,"0")} / ${e.length}`),li("demo-title",t?.title??"\u6D41\u7A0B\u6F14\u793A"),li("demo-description",t?.description??"\u9009\u62E9\u5DF2\u7F16\u6392\u7684\u573A\u666F\uFF0C\u5F00\u59CB\u64AD\u653E\u6216\u5355\u6B65\u67E5\u770B\u3002");let s=Xe.status==="playing"?"\u6682\u505C\u6F14\u793A":Xe.status==="complete"?"\u91CD\u65B0\u64AD\u653E":Xe.status==="paused"?"\u7EE7\u7EED\u64AD\u653E":"\u5F00\u59CB\u64AD\u653E";tr("demo-play",s),Le("demo-play").dataset.state=Xe.status,Le("demo-step").disabled=Xe.status==="complete",Le("demo-back").disabled=Xe.index<=0,Le("demo-reset").disabled=Xe.status==="idle",i instanceof HTMLButtonElement&&i.disabled&&["demo-back","demo-step","demo-reset"].includes(i.id)&&Le("demo-play").focus({preventScroll:!0}),Le("demo-progress").value=J_(Xe)}function rc(){let i=uo(Xe.scenario),e=Xe.index>=0?i[Xe.index]??null:null;e&&(Pt!==e.viewId||as!==`${Xe.scenario}/${e.id}`)&&(go(e.viewId??Dt.rootId),ci(i.slice(0,Xe.index+1).filter(t=>t.viewId===Pt).flatMap(t=>[...t.openModules])),gt=e.focusId,yn="none",Bn=!1,_n=!1,as=`${Xe.scenario}/${e.id}`,hi()),yt.setDemo(e,Math.min(1,Xe.elapsedMs/G_(Xe))),sc()}function cf(){ho||Xe.status!=="playing"||(ho=requestAnimationFrame(i=>{ho=0;let e=er===null?0:Math.min(i-er,250);er=i,Xe=j_(Xe,e),rc(),Xe.status==="playing"?cf():er=null}))}function hf(){rr.length&&(Xe.status==="playing"?ls():((Xe.status==="idle"||Xe.status==="complete")&&(go(Dt.rootId),ci([]),yt.reset(),as=null),Xe=W_(Xe),er=null,rc(),cf()))}function uf(){rr.length&&(ec(),Xe=X_(Xe),rc())}function df(){rr.length&&(ec(),Xe=$_(Xe),rc())}function ff(i){ec(),Xe=i?Z_(i):Y_(Xe),go(Dt.rootId),as=null,gt=null,yn="none",Bn=!1,_n=!1,yt.setDemo(null,0),ci([]),yt.reset(),hi(),sc()}function oc(i=!0){Le("explorer").hidden=!0,Le("explore-toggle").setAttribute("aria-expanded","false"),i&&Le("explore-toggle").focus({preventScroll:!0})}yt=Hh(Le("stage"),Kt,yo);document.documentElement.dataset.renderer=yt.renderer;yt.renderer==="unavailable"&&(Le("fallback").hidden=!1);of();af();var pf=new ResizeObserver(tc);pf.observe(Le("view-breadcrumbs"));window.addEventListener("resize",tc);Le("demo-scenario").replaceChildren(...rr.map(i=>new Option(i.label,i.id)));Le("demo-dock").hidden=rr.length===0;ci([]);ic();sc();os.addEventListener("change",()=>{yo(os.value||null),oc(!1),Le(gt?yt.renderer==="webgl"?"focus-node":"more-details":"explore-toggle").focus({preventScroll:!0})});Le("explore-toggle").addEventListener("click",()=>{let i=Le("explorer").hidden;Le("explorer").hidden=!i,Le("explore-toggle").setAttribute("aria-expanded",String(i)),i&&os.focus({preventScroll:!0})});Le("explorer-close").addEventListener("click",()=>oc());Le("back-overview").addEventListener("click",lf);Le("back-view").addEventListener("click",()=>{let i=Dt.getEntry(Pt);i&&nc(i.parentId)});Le("enter-view").addEventListener("click",()=>{let i=gt&&Dt.getChild(Pt,gt);i&&nc(i.document.id)});Le("close-context").addEventListener("click",()=>{yo(null),Le("explore-toggle").focus({preventScroll:!0})});Le("focus-node").addEventListener("click",()=>{gt&&(ls(),yt.focus(gt))});Le("reset-view").addEventListener("click",()=>{ls(),yt.reset()});Le("more-details").addEventListener("click",()=>{ls(),_n=!_n,ic(),yt.setSelection(gt,fo())});Le("isolate-node").addEventListener("click",()=>{or(),Bn=!Bn,hi()});Le("toggle-shell").addEventListener("click",()=>{let i=mo(gt);i&&(or(),rn.has(i)?(rn.delete(i),gt=i):rn.add(i),_n=!1,yn="none",ci(rn),hi(),yt.focus(i))});for(let[i,e]of[["spatial-view","spatial"],["flat-view","flat"]])Le(i).addEventListener("click",()=>{sr=e,yt.setMode(sr),ic()});for(let[i,e]of[["show-all","none"],["show-upstream","upstream"],["show-downstream","downstream"]])Le(i).addEventListener("click",()=>{or(),yn=e,hi()});Le("demo-play").addEventListener("click",hf);Le("demo-step").addEventListener("click",uf);Le("demo-back").addEventListener("click",df);Le("demo-reset").addEventListener("click",()=>ff());Le("demo-scenario").addEventListener("change",i=>ff(i.target.value));Le("fullscreen-view").disabled=!document.fullscreenEnabled;Le("fullscreen-view").addEventListener("click",async()=>{try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch{li("demo-title","\u5F53\u524D\u6D4F\u89C8\u5668\u672A\u5141\u8BB8\u5168\u5C4F")}});document.addEventListener("fullscreenchange",()=>{Le("fullscreen-view").setAttribute("aria-pressed",String(!!document.fullscreenElement)),tr("fullscreen-view",document.fullscreenElement?"\u9000\u51FA\u5168\u5C4F":"\u5168\u5C4F\u573A\u666F")});for(let i of[Ql,Le("explorer")])i.addEventListener("pointerdown",e=>e.stopPropagation()),i.addEventListener("wheel",e=>e.stopPropagation());document.addEventListener("keydown",i=>{if(i.key==="Escape"){Le("explorer").hidden?(gt||rn.size||Pt!==Dt.rootId)&&lf():oc();return}i.target?.closest('button,input,select,textarea,[contenteditable="true"],[role="button"]')||(i.code==="Space"&&(i.preventDefault(),hf()),i.key==="ArrowRight"&&(i.preventDefault(),uf()),i.key==="ArrowLeft"&&(i.preventDefault(),df()))});document.addEventListener("visibilitychange",()=>{document.hidden&&ls()});window.addEventListener("pagehide",i=>{ls(),i.persisted||(pf.disconnect(),window.removeEventListener("resize",tc),yt.dispose())});Object.defineProperty(globalThis,"__sandboxPrototype",{value:{state:()=>({...yt.state(),viewId:Pt,viewPath:[...Dt.getAncestors(Pt).map(i=>i.id),Pt],highlight:yn,detailsExpanded:_n,related:fo()?[...fo().nodeIds]:[],demo:{...Xe,stepsTotal:uo(Xe.scenario).length,stepId:Xe.index>=0?uo(Xe.scenario)[Xe.index]?.id:null}})}});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
