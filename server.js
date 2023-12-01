
 var http =require('http')
 var fs = require('fs')


 http.createServer((req,res)=>{
    var route = req.url
    let method = req.method
    
   

   if(route === '/'){
    let data = fs.readFileSync('index.html',"utf-8")    //line by line check readfilesync
        try{
          res.writeHead(200,{'Content-Type':'text/html'})
          res.end(data);
        } catch(err) {
        
          res.writeHead(500,{'Content-Type':'text/html'})
          res.end("Error!!")
        }
   
    
   
}else if(route.toLowerCase() ==='/form?'){
     let data = fs.readFileSync('form.html',"utf-8")
       try{
        res.writeHead(200,{'content-Type':'text/html'})
        res.end(data)
      }catch(err){
        res.writeHead(500,{'content-Type':'text/html'})
        res.end("ERROR>>")
      }
    

   
}else if( route.toLocaleLowerCase() ==='/home?'){
    let data= fs.readFileSync('index.html','utf-8')
      try{
        res.writeHead(200,{'content-Type':'text/html'})
        res.end(data)
      }catch(err){
       
        res.writeHead(500,{'content-Type':'text/html'})
        res.end("ERROR IN The PAGE")
    
      }
  
}else if( route==='/submit' &&  method==="POST"){
     
  let body = ''
     
      req.on('data',(chunk)=>{


        body = body + chunk

      });
      req.on('end',()=>{

        try{
          let recevedatas= JSON.parse(body)
          console.log(recevedatas);

        fs.readFile('node.json','utf-8',(err,data)=>{
          if(err){
            res.writeHead(500,{'content-Type':'text/html'})
            res.end("ERROR IN The PAGE")
        
          }else{
            const stringdata = [];
            stringdata =JSON.parse(data)
            const newarray = stringdata.length + 1

            recevedatas.id = newarray
            stringdata.push(recevedatas) //PUSHED NEW USER FILE TO SAME ARRAY as object
 
          }
        })

        }catch(err){

          res.writeHead(400,{'content-Type':'text/plain'})
          res.end('ERROR')

        }
          
      })
   }
   else{
    res.writeHead(404,{'content-Type':'text/plain'})
    res.end("NOT FOUND")
   }
  //  else if(req.url==='/ok'){
  //   res.end(fs.readFileSync('./node.json',"utf-8"))
  //  }

   
 }).listen(2000)    








 