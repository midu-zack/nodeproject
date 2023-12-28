const http =require('http')
const fs = require('fs')
const url = require('url')
const { parse } = require('path')
const { Server } = require('https')
const { Console } = require('console')


http.createServer((req,res)=>{

   const route = req.url;
   const method = req.method;
   
   

  if(route === '/' ||  route.toLowerCase() ==='/home?'){
       try{
          const data = fs.readFileSync('index.html',"utf-8")    //line by line check readfileAsync
    
         res.writeHead(200,{'Content-Type':'text/html'})
         res.end(data);
       } catch(err) {
       
         res.writeHead(500,{'Content-Type':'text/html'})
         res.end("Error!!")
       }
  
   
  
  }else if(route.toLowerCase() ==='/form?'){
      try{

       const data = fs.readFileSync('form.html',"utf-8")
      
        res.writeHead(200,{'Content-Type':'text/html'})
        res.end(data)
      }catch(err){
        res.writeHead(500,{'Content-Type':'text/html'})
        res.end("ERROR>>")
      }
    

    
  }
//   else if( route.toLowerCase() ==='/home?'){
//     try{
//         const data= fs.readFileSync('index.html','utf-8')
//         res.writeHead(200,{'Content-Type':'text/html'})
//         res.end(data)
//     }catch(err){
        
//         res.writeHead(500,{'Content-Type':'text/html'})
//         res.end("ERROR IN The PAGE")
    
//       }
  
// } 

else if( route==='/submit' &&  method==="POST"){
  
  try{

  let body = ''
      
      req.on('data',(chunk)=>{


        body = body + chunk

      });
      req.on('end',()=>{


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
            stringdata.push(recevedatas) //push new user file  array 


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

        
      });
      
      }catch(err){

        res.writeHead(400,{'Content-Type':'text/plain'})
         res.end('ERROR'+err)

       }
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

}else if(route.toLocaleLowerCase().startsWith("/editdetails") && method === 'PUT' ){


    const prsurl = url.parse(route,true); //total datas 
    const userid = parseInt(prsurl.pathname.split('/').pop()); // focus to id only 

    console.log(userid);
  
    let body = '' ;

    req.on("data",(chunk)=>{

    body = body + chunk

  });
  
   

  
  req.on("end",()=>{

    try{

      const modifaid = JSON.parse(body)

      fs.readFile('node.json' , "utf-8" , (err,jdata)=>{
        if(err){
          res.writeHead(500,{'Content-Type':'text/html'})
            res.end("ERROR IN The PAGE")
        
        }else{
          let modi = JSON.parse(jdata) //old datas stored

           console.log(modifaid);

          for(let i = 0;i < modi.length ; i++){

            if(modi[i].id===userid){  //modify data connect in old id   ..same aanoo nn check cheyuunuu

                console.log("hello");


              modi[i]=modifaid;  // edit cheydha id um old id um same aano chodhikaa

              

              break;
            }

            }

            fs.writeFile("node.json", JSON.stringify(modi, null, 2), 'utf-8', (err) => {
              if (err) {
                  res.writeHead(500, { 'Content-Type': 'text/html' });
                  res.end("oo", err);
              } else {
                  res.writeHead(200, { 'Content-Type': 'text/html' });
                  res.end("DATA saved ");
              }
          });
          
        }
      })
    }catch(err){
      res.writeHead(400,{ 'Content-Type' : 'text/plain'})
      res.end('error ')
       
    }
  });

  
}else if(route.toLocaleLowerCase().startsWith('/deleteuser') && method==='DELETE'){

 
  const parseurl = url.parse(route,true);  // all off data
  const userid =parseInt(parseurl.pathname.split('/').pop()); // find in edit data id

  console.log("Received DELETE request for user ID:", userid);

  const jsondata = require('./node.json');  // all off data in node.json file


  const updatedata = jsondata.filter((otheruserid) => otheruserid.id !== userid);

  for(let i=0 ; i < updatedata.length ; i++){
    
    updatedata[i].id = i + 1;
  }
   
  const updatedatajson = JSON.stringify(updatedata,null,2);


  fs.writeFile('node.json',updatedatajson,(err)=>{
    if(err){
      console.log("not working deletion ");
      res.writeHead(500,{"Content-Type": "text/plain"});
      res.end('error please check ')
    }else {
      console.log(" deletion  working");
      res.writeHead(200,{"Content-Type": "text/plain"});
      res.end('succesfully')
    }

  })

  

}
  else{
   res.writeHead(404,{'content-Type':'text/plain'})
   res.end(" SERVER NOT FOUND")
  }
  

  
}).listen(3000)

 
 


