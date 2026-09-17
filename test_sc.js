var sc = new ActiveXObject('MSScriptControl.ScriptControl');
sc.Language = 'JScript';
try {
  sc.Eval('1 + 1');
} catch(e) { }
