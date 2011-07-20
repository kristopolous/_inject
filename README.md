## Arbitrary code injection

This was talked about [on stackoverflow](http://stackoverflow.com/questions/6713538/ruby-style-blocks-in-javascript)

You could view the demo.html, which has been conveniently placed here for observation

    function A (){
      // Usually if you call a function from here, you have
      // to pass apply or call in order to preserve the this object.
      // It can get cludgeoned as you know and can often times be
      // hard to get at with debugging tools.
      //
      // This library preserve the this object in an eloquent manner
      // that requires next to nothing effort on your part and is available
      // for arbitrary real-time interactive inspection and manipulation
      this.pointer = 'internal-this';

      // Normally the variable below would be inaccessible outside of
      // A. However, sometimes you need to inspect a specific instance
      // of these variables and need the freedom to run arbitrary code on them.
      // This library can do this.
      var internal = 1;

      // This code snippet creates a function called
      // _inject.ref that accepts blocks of code, either
      // as strings or entire functions that can be run
      // in the current scope of this function, at an arbitrary
      // time after the function exits.

      // You can use it to do post-mortem debugging in a debug
      // console such as those that are included in IE and Chrome
      // or in firebug.
      eval(_inject('ref'));
    }

    // The arguments array is generally inaccessible in functions
    // outside the direct scope of the function that utilizes them.
    // 
    // The _inject library preserves and passes them in, so you can
    // write live code as if you are directly in the middle of a 
    // specific instantiation of any given function, anywhere in your
    // application.
    A('arg0','arg1');

    document.write([
      // operations
      'Incrementing an internal variable: ' + _inject.ref('++internal'),

      // quoted snippets with local references
      'Showing the function arguments: ' + _inject.ref("Array.prototype.slice.call(arguments).join(' :: ')"),

      // entire functions
      'Injecting an entire function: ' + _inject.ref(function(){return Array.prototype.slice.call(arguments).join(' :: ')}),

      // preservation of 'this'
      'Showing that the this pointer is preserved: ' + _inject.ref('this.pointer'),

      // even in entire functions
      'A medley of features: ' + _inject.ref(function(){ return [this.pointer, internal, arguments[0]].join(' :: ') })
    ].join('<br>'));

