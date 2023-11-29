 var http =require('http')
 var fs =require('fs')
 
 http.createServer((req,response)=>{
   

   if(req.url==='/'){
    let save = fs.readFileSync('index.html',"utf-8") //line by line check readfilesync
    response.write(save)
    response.end();


   }else if(req.url==='/form?'){
    let save1 = fs.readFileSync('form.html',"utf-8")
    response.end(save1)

   }else if(req.url==='/home?'){
    let save3 = fs.readFileSync('index.html','utf-8')
    response.end(save3)
   }

   
 }).listen(2000)    