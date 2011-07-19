var _inject = (function() {

  function list() {
    var ret = [], ref;

    for(ref in _inject) {
      ret.push(ref);
    }

    return ret;
  }

  return function(scopeIn, ix){

    if(!scopeIn) { return list(); }

    var scope = scopeIn + (ix || '');

    return _inject[scope] ? 

      _inject(scopeIn, ( ix || 0 ) + 1) :

      ('self._inject[scope] = ' + function(block) {
        var result = eval('(' + block + ')');

        return typeof result === 'function' ? 
          result.call(self._inject[scope]._this) : 
          result;
      } + ';self._inject[scope]._this = this;')
      .replace(/scope/g, '"' + scope + '"');
  }
})();
