// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>
// <body>
//   <style>
//     body {
//         background-color: #f0f0f0;
//     }

//     .login-container {
//         max-width: 400px;
//         margin: 100px auto;
//         background-color: #ffffff;
//         padding: 20px;
//         border-radius: 10px;
//         box-shadow: 0px 0px 10px 0px #000000;
//     }

//     .form-group {
//         margin-bottom: 20px;
//     }

//     .form-group label {
//         font-weight: bold;
//         color: #333;
//     }

//     .form-group input {
//         width: 100%;
//         padding: 10px;
//         border: 2px solid #3498db;
//         border-radius: 5px;
//     }

//     .btn-login {
//         width: 100%;
//         padding: 12px;
//         background-color: #27ae60;
//         color: #ffffff;
//         border: none;
//         border-radius: 5px;
//         cursor: pointer;
//     }

//     .btn-login:hover {
//         background-color: #219653;
//     }
// </style>


//     </head>
//     <body>
    
//     <div class="container">
//       <div class="login-container">
//         <h2 class="text-center  m-4" style="  font-weight: 800; color: #d2e100;">DETAILS</h2>
//         <form action="/submit" onsubmit="return validateForm()" method="post" >
//           <div class="form-group">
//             <label for="name">Name:</label>
//             <input type="text" class="form-control"  id="nickname" placeholder="Enter your name "value="">
//             <p id="nameform" style="color: #e10000;"></p>
//           </div>
//           <div class="form-group">
//             <label for="phone">Phone Number:</label>
//             <input type="number" class="form-control" id="phonenumber" placeholder="Enter your phone number" value="">
//             <p id="numberform" style="color: #e10000;"></p>
//           </div>
//           <div class="form-group">
//             <label for="age">Age:</label>
//             <input type="number" class="form-control" id="ageold" placeholder="Enter your age" value="">
//             <p id="ageform" style="color: #e10000;"></p>
//           </div>
//           <div class="form-group">
//             <label for="gmail">Gmail:</label>
//             <input type="email" class="form-control" id="mail" placeholder="Enter your Gmail" value="">
//             <p id="gmailform" style="color: #e10000;"></p>
//           </div>
         
//           <button type="submit" class="btn btn-login " >Submit </button>
    
        
//         </form>

//         <form action="/home" method="get " class="pt-3">
//           <button type="submit" class="btn btn-login " style=" background-color: #e10000;" >All USERS</button>
//          </form>
//       </div>
//     </div>
//     </body>

//     <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
//     <script>
//       let tname  ;
//       let fname ;
//       let telphone  ;
//       let fphone;
//       let yearold;
//       let fage;
//       let fmail;
//       let fgmail

//       function validateForm(){
      
//          tname = document.getElementById('nickname').value;
//          fname = document.getElementById('nameform')
//          telphone = document.getElementById('phonenumber').value;
//          fphone = document.getElementById('numberform')
//          yearold = document.getElementById('ageold').value;
//          fage = document.getElementById('ageform')
//          fmail = document.getElementById('mail').value
//          fgmail = document.getElementById('gmailform')
    
    
//       if(tname === ''){
//         fname.innerHTML = "Name field is required"
//          return false
//       }
//       if(telphone === ''){
//         fphone.innerHTML = 'Number field is required'
//         return false
//       } 
//       else if(!telphone.value.length < 10){
//         fphone.innerHTML = 'Number must 10 Digits.'
//         return false
//       }
      

//       if(yearold === ''){
//         fage.innerHTML = 'Age field is required'
//         return false
       
//       } 


//       if(fmail === ''){
//         fgmail.innerHTML='Email field is required. '
         
//           return false
//       }  
//       else if(!fmail.value.match(mailRegex)){

//         fgmail.innerHTML='Invalid email format. '
//         return false
//       }
       
//         const data = {
//           name:tname,
//           phonenumber:telphone,
//           age:yearold,
//           gmail:fmail
//         }

//         fetch("/submit",{
//           method:"POST",
//           headers:{"Content-Type": "application/json"},
//           body : JSON.stringify(data),
          
//         })

//         .then((response)=>{


//           if(response.ok){

//             Swal.fire({
//             title: "successfully!",
//             icon: "success",
//             timer: 2000,
//             timerProgressBar: true,
//             showConfirmButton: false,
//       });setInterval(() => {
//            window.location.reload()
//       }, 2000);

            
//           }
//           else{
            
//             response.status;
//             response.statusText;

//           }

//         });
        
//          return false;
      
//         }
 
    
//     </script>
   
// </body>
// </html>

