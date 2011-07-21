## Arbitrary code injection
Imagine if you could create a hook inside a function in javascript that gives you a window into that instantiation.

You could run arbitrary code using the `arguments` or the `this` object or any local variables that function had.

You could run a function over again without a reload, essentially replaying all the code.

#### that is precisely what this library does.

This was talked about [on stackoverflow](http://stackoverflow.com/questions/6713538/ruby-style-blocks-in-javascript)

You could view the demo.html, which has been conveniently placed here for observation

    // Watch as we can execute specifically scoped code arbitrarily after
    // the function is done.
    function some_time_later() {

      // Here we utilize the reference created below to do arbitrary things 
      document.body.innerHTML += [

        // We'll increment the internal variable, usually inaccessible.
        'Incrementing an internal variable: ' + _inject.ref('++internal'),

        // Display the arguments that were passed in in that specific instance
        'Showing the function arguments: ' + _inject.ref(
          "Array.prototype.slice.call(arguments).join(' :: ')"
        ),

        // We can even pass in entire functions.  They will maintain the scope and
        // relevancy of the function; as if the code was run at the point of injection
        // at the time of injection.
        'Injecting an entire function: ' + _inject.ref(function(){
          return Array.prototype.slice.call(arguments).join(' :: ')
        }),

        // Here we show how we've preserved the this pointer.
        'Showing that the this pointer is preserved: ' + _inject.ref('this.pointer'),

        // And now, all together: 
        //
        //  * a preserved this pointer 
        //  * an internal variable
        //  * an argument that was passed in
        // 
        // All in a normal function without any special work.
        'A medley of features: ' + _inject.ref(function(){ 
          return [
            this.pointer, 
            internal, 
            arguments[0]
          ].join(' :: ') 
         })
      ].join('<br>');
    }

    // This library preserves function arguments so that you can write
    // live, on the fly code on a running system as if you are directly 
    // in the middle of a specific instantiation of any given function, 
    // anywhere in your application.
    (function (arg0, arg1){
      // It also preserves the this object in an eloquent manner
      // that requires no extra effort on your part and is available
      // for arbitrary real-time interactive inspection and manipulation
      this.pointer = 'internal-this';

      // Normally the variable below would be inaccessible outside of this
      // function. This library gives you the freedom inspect and manipulate a 
      // specific instance of these variables and then utilize them in this 
      // exact context of the function.
      var internal = 1;

      // To invoke the library, simply call something like:
      eval(_inject('ref'));

      // After this is done, you've created a function at _inject.ref 
      // that accepts blocks of code, either as strings or entire 
      // functions that can be globally at any time within the current 
      // scope of this function, even after the function has returned
      //
      // You can use it to do post-mortem debugging in a debug
      // console such as those that are included in IE and Chrome
      // or in Firebug.

    }) ( 'arg0', 'arg1' );

    some_time_later();

    setTimeout(some_time_later, 1000);
