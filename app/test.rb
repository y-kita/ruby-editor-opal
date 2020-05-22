require "open3"
require "tempfile"

str = <<-EOS
def test(name)
  puts name
  puts "Hello!!!!!!!!!! #\{name\}"
  puts 1 + 1
  puts 1 * 2
  puts 10 \/ 5
  puts 10 % 5
end

test('taro')
EOS

Tempfile.create(["foo", ".rb"]) do |f|
  f.puts str
  puts f.path
  f.gets
  out, err, status = Open3.capture3("ruby #{f.path}")
  puts out               #=> "a\n"
  p err               #=> "bar\nbaz\nfoo\n"
  p status.exitstatus #=> 0
end
