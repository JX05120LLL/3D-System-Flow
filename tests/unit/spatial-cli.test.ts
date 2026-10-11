import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';

const run = (name:string,args:string[]) => spawnSync(process.execPath,[resolve(`system-flow/scripts/${name}.mjs`),...args],{encoding:'utf8',timeout:15000});
const doc = {schemaVersion:'2.0',id:'arbitrary-architecture',title:'文档处理',view:{kind:'overview',direction:'RIGHT',theme:'light'},nodes:[{id:'reader',kind:'process',label:'读取器'}],edges:[],groups:[]};
async function setup(model:unknown=doc) {
  const directory=await mkdtemp(join(tmpdir(),'spatial 中文 '));
  const input=join(directory,'任意 图.json'), output=join(directory,'三维 图.html');
  await writeFile(input,JSON.stringify(model));
  return {input,output,directory};
}

test('formal CLI generates 3D from an ordinary legacy diagram without sample-specific data',async()=>{
  const {input,output}=await setup();
  const result=run('generate',[input,'--renderer','3d','--output',output]);
  assert.equal(result.status,0,result.stderr);
  const html=await readFile(output,'utf8');
  assert.match(html,/<html[^>]*data-system-flow-renderer="3d"/);
  assert.match(html,/Three\.js MIT license/);
  const data=JSON.parse(html.match(/<script id="blueprint-data" type="application\/json">([\s\S]*?)<\/script>/)![1]!);
  assert.deepEqual(data,doc);
  assert.equal(JSON.parse(result.stdout).renderer,'3d');
});

test('explicit 2d and omitted renderer produce the same existing reader',async()=>{
  const {input,output,directory}=await setup();
  const explicit=join(directory,'二维 图.html');
  assert.equal(run('generate',[input,'--output',output]).status,0);
  assert.equal(run('generate',[input,'--output',explicit,'--renderer','2d']).status,0);
  assert.deepEqual(await readFile(output),await readFile(explicit));
});

test('invalid renderer refuses before replacing an existing output',async()=>{
  const {input,output}=await setup(); await writeFile(output,'用户已有文件');
  const result=run('generate',[input,'--output',output,'--renderer','vr','--overwrite']);
  assert.equal(result.status,2);assert.match(result.stderr,/2d.*3d/);
  assert.equal(await readFile(output,'utf8'),'用户已有文件');
});

test('3D data embedding escapes closing scripts and preserves arbitrary labels without executing markup',async()=>{
  const label='</script><script>globalThis.injected=true</script>';
  const {input,output}=await setup({...doc,title:label,nodes:[{...doc.nodes[0],label}]});
  const result=run('generate',[input,'--output',output,'--renderer','3d']);
  assert.equal(result.status,0,result.stderr);
  const html=await readFile(output,'utf8');
  assert.ok(!html.includes('<script>globalThis.injected=true</script>'));
  const raw=html.match(/<script id="blueprint-data" type="application\/json">([\s\S]*?)<\/script>/)![1]!;
  assert.equal(JSON.parse(raw).nodes[0].label,label);
});

test('3D exports refuse before browser startup and do not overwrite an existing artifact',async()=>{
  const {input,output,directory}=await setup();
  assert.equal(run('generate',[input,'--output',output,'--renderer','3d']).status,0);
  for(const format of ['svg','png','jpg']) {
    const target=join(directory,'已有.'+format);await writeFile(target,'保留');
    const result=run('export',[output,'--format',format,'--output',target,'--overwrite']);
    assert.equal(result.status,2,result.stderr);assert.match(result.stderr,/--renderer 2d/);
    assert.equal(await readFile(target,'utf8'),'保留');
  }
});

test('invalid internal owner refuses generation without altering output',async()=>{
  const {input,output}=await setup({...doc,spatial:{interiors:[{owner:'missing',nodes:[{id:'extract',kind:'process',label:'提取'}],edges:[]}]}});
  await writeFile(output,'保留');
  const result=run('generate',[input,'--output',output,'--renderer','3d','--overwrite']);
  assert.equal(result.status,2);assert.match(result.stderr,/SPATIAL_OWNER_MISSING/);
  assert.equal(await readFile(output,'utf8'),'保留');
});
