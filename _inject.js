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

      ('self._inject["' + scope + '"] = (' + (function() {
         var _RAND_ = { 
           that: arguments[0],
           arg: Array.prototype.slice.call(arguments[1]) 
         };

         return function() {
           _RAND_.block = arguments[0];

           return (function () {
             _RAND_.result = eval('(' + _RAND_.block + ')');
             return 'function' === typeof _RAND_.result ? 
               _RAND_.result.apply(_RAND_.that, _RAND_.arg) : 
               _RAND_.result;
           }).apply(_RAND_.that, _RAND_.arg);
         }
       })).replace(/_RAND_/g, '__INJECT__' + Math.random().toString().substr(2)) + ')(this, arguments)';
  }
})();
