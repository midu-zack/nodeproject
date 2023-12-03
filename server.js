
 var http =require('http')
 var fs = require('fs')
const { parse } = require('path')


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
          let recevedatas= JSON.parse(body)

          console.log(recevedatas);

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
 
}else if(route.toLocaleLowerCase ==="/editdetails" && method==="PUT" ){

  const prsurl=parse.url(route.true);
  const userid =parseInt(prsurl.pathname.split('/').pop());


  let body = '';
  req.on("data",(chunk)=>{
    body = body + chunk
  });

  req.on("data",()=>{
    try{
      const modifaid = JSON.parse(body)

      fs.readFile('node.json',"utf-8",(err,data)=>{
        if(err){
          res.writeHead(500,{'Content-Type':'text/html'})
            res.end("ERROR IN The PAGE")
        
        }else{
          let modi = JSON.parse(data)

          for(let i = 0;i <data.length ; i++){
            if(modi[i].id===userid){
              modi[i]=modifaid;
              break;
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
        }
      })
    }catch{

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








 