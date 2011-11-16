var _inject = (function() {

  function list() {
    var ret = {}, ref;

    for(ref in _inject) {
      ret[ref] = {
        timestamp: _inject[ref].timestamp,
        linenumber: _inject[ref].stack
      };
    }

    return ret;
  }

  return function(scopeIn, block){
    var 
      scope = scopeIn, 
      ix = 0;

    if(!scopeIn) { return list(); }
    if(block) { return _inject[scope](block); }

    // find a unique reference
    while(_inject[scope]) {
      scope = scopeIn + ix++;
    }

    return (
       'try { arguments } catch(e) { arguments = [] } ' +
       'self._inject["' + scope + '"] = (' + (function() {
       var RAND = { 
         that: arguments[0],
         arg: Array.prototype.slice.call(arguments[1]) 
       };
        
       function RAND_callback() {
         RAND.block = arguments[0];

         return (function() {
           RAND.result = eval('(' + RAND.block + ')');

           return 'function' === typeof RAND.result ? 
             RAND.result.apply(RAND.that, RAND.arg) : 
             RAND.result;

         }).apply(RAND.that, RAND.arg);
       }

       RAND_callback.timestamp = new Date();

       try {
         throw Error();
       } catch(e){

         if(e.stack) {

           RAND_callback.stack = e.stack
             .split('\n')[2]
             .split(/@|> /)[1]
             .replace(/[\)\(]/g,'');

         } else if (e.lineNumber) {
           RAND_callback.stack = e.lineNumber;
         }
       }

       return RAND_callback;
     }) + ')(this, arguments)')
     .replace(/RAND/g, '__INJECT__' + Math.random().toString().substr(2)) 
  }
})();
