var _inject = (function() {

  function list() {
    var ret = [], ref;

    for(ref in _inject) {
      ret.push(ref);
    }

    ret.clear = function(){
      for(ref in _inject) {
        delete _inject[ref];
      }
    }

    return ret;
  }

  return function(scopeIn, ix){

    if(!scopeIn) { return list(); }

    var scope = scopeIn + ( ix || '' );

    return _inject[scope] ? 

      _inject(scopeIn, ( ix || 0 ) + 1) :

      'self._inject["' + scope + '"] = (' + (function(_this, _arguments) {
         var _argArray = Array.prototype.slice.call(_arguments), _result;

         return function(_block) {

           function _internal() {
             _result = eval('(' + _block + ')');
             return 'function' === typeof _result ? 
               _result.apply(_this, _argArray) : 
               _result;
           }

           return _internal.apply(_this, _argArray);
         }
       }) + ')(this, arguments)'
  }
})();
