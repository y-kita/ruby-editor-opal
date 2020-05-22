import rubyEditor from 'common/ruby_editor'

$(() => {
  rubyEditor.create()
  $('#exec').each(function(i, e) {
    const button = $(e)
    button.click(async () => {
      rubyEditor.exec().then(data => {
        console.log(data)
        console.log(data.output)
        rubyEditor.output(data.output)
      })
    })
  })
})
