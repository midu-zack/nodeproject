
var http =require('http')
var fs = require('fs')
var url = require('url')


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
        res.writeHead(200,{'Content-Type':'text/html'})
        res.end(data)
      }catch(err){
        res.writeHead(500,{'Content-Type':'text/html'})
        res.end("ERROR>>")
      }
    

    
  }else if( route.toLocaleLowerCase() ==='/home?'){
    let data= fs.readFileSync('index.html','utf-8')
      try{
        res.writeHead(200,{'Content-Type':'text/html'})
        res.end(data)
      }catch(err){
        
        res.writeHead(500,{'Content-Type':'text/html'})
        res.end("ERROR IN The PAGE")
    
      }
  
}else if( route==='/submit' &&  method==="POST"){
      
  let body = ''
      
      req.on('data',(chunk)=>{


        body = body + chunk

      });
      req.on('end',()=>{

        try{
          let recevedatas= JSON.parse(body);

        fs.readFile('node.json','utf-8',(err,data)=>{
          if(err){
            res.writeHead(500,{'Content-Type':'text/html'})
            res.end("ERROR IN The PAGE")
        
          }else{
            var stringdata = [];
            stringdata =JSON.parse(data)
            var newarray = stringdata.length + 1

            recevedatas.id = newarray
            stringdata.push(recevedatas) //push new user file to same array as object


            fs.writeFile("node.json", JSON.stringify(stringdata, null, 2), 'utf-8', (err) => {
              if (err) {
                  res.writeHead(500, { 'Content-Type': 'text/html' });
                  res.end(err);
              } else {
                  res.writeHead(200, { 'Content-Type': 'text/html' });
                  res.end("DATA saved ");
              }
          });
          

            
          }
        })

        }catch(err){

          res.writeHead(400,{'Content-Type':'text/plain'})
          res.end('ERROR'+err)

        }
          
      });
}else if(route.toLocaleLowerCase() === '/getdetails' && method === 'GET'){
        fs.readFile("node.json","utf-8",(err,data)=>{
          if(err){
            res.writeHead(400,{'Content-Type':'text/html'})
            res.end(err)

          }else{
            res.writeHead(200,{'Content-Type':'text/html'})
            res.end(data)
          }

        });

}else if(route.toLocaleLowerCase().startsWith() ==="/editdetails" && method==="PUT" ){


    const prsurl=parse.url(route.true); //parse the url and with object 
    const userid =parseInt(prsurl.pathname.split('/').pop());
  
    let body = '';

    req.on("data",(chunk)=>{

    body = body + chunk

  });
  
   

  
  req.on("end",()=>{
    try{
      const modifaid = JSON.parse(body)

      fs.readFile('node.json',"utf-8",(err,jdata)=>{
        if(err){
          res.writeHead(500,{'Content-Type':'text/html'})
            res.end("ERROR IN The PAGE")
        
        }else{
          let modi = JSON.parse(jdata) //old datas stored

          for(let i = 0;i < modi.length ; i++){

            if(modi[i].id===userid){

              modi[i]=modifaid;
              
              break;
            }

            }

            fs.writeFile("node.json", JSON.stringify(modi, null, 2), 'utf-8', (err) => {
              if (err) {
                  res.writeHead(500, { 'Content-Type': 'text/html' });
                  res.end(err);
              } else {
                  res.writeHead(200, { 'Content-Type': 'text/html' });
                  res.end("DATA saved ");
              }
          });
          
        }
      })
    }catch(err){
      res.writeHead(400,{ 'Content-Type': 'text/plain'})
      res.end('error ')
      value="Modify"
    }
  });

  
}else if(method==='Delete'){

}
  else{
   res.writeHead(404,{'content-Type':'text/plain'})
   res.end("NOT FOUND")
  }
  

  
}).listen(2222)    








