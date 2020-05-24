import rubyEditor from 'common/ruby_editor'
// try {
//     let test = "(function(Opal) {\n  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice;\n\n  Opal.add_stubs(['$puts']);\n  return self.$puts(\"Hello\")\n})(Opal);\n"
//     // Opal.eval = function(){return eval(test)}
//     Opal.load('opal')
//     Opal.load('opal-parser')
//     var result = Opal.compile(test)
//     console.log(result)
//     // Opal.eval=function(str,options){return eval(Opal.compile(str,options))}
//   }
//   catch (e) {
//     console.log(e)
//     console.log(e.message)
//   }
// var conf = new Function('return ' + "function(Opal) { var return Opal.compile(\"test.to_s\") }(Opal)");
// var conf = new Function('return ' + "function(Opal) { return Opal.compile(\"puts Hello\") }(Opal)");
// console.log(eval(conf()))
// console.log(conf)
// console.log(conf())
// console.log(Opal.RUBY_VERSION)
$(() => {
  rubyEditor.create()
  $('#exec').each(function(i, e) {
    const button = $(e)
    button.click(async () => {
      rubyEditor.compile().then(data => {
        // console.log(data)
        // console.log(data.output)
        rubyEditor.output(data.output)
      })
    })
  })
})
