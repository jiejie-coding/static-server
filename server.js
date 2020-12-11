var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有美女发送请求过来了' + pathWithQuery)

  let content;
  response.statusCode = 200
  
  let filePath = path === '/' ? "/index.html" : path;

  let index = filePath.lastIndexOf('.');
  let suffer = filePath.substr(index);
  const fileType = {
    ".html":"text/html",
    ".css":"text/css",
    ".js":"text/javascript",
    ".jpg":"image/jpeg"
  }
  response.setHeader('Content-Type', `${fileType[suffer] || "text/html"} ;charset=utf-8`)
  try {
    content = fs.readFileSync(`./public${filePath}`);
    
  }catch(error) {
    content = "文件不存在";
    response.statusCode = 404;
  }
  response.write(content)
  response.end()

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)