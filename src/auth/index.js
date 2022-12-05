export function saveNo(number) {

      localStorage.setItem("userId", JSON.stringify(number))
  
 
    
  }
  
  export function getNo() {
   
     
    return localStorage.getItem("userId");

  
    
  }

  export function loggedIn() {
   
     
    if(localStorage.getItem("userId") != "null"){
        return true;
    }
    else{
        return false;
    }

  
    
  }