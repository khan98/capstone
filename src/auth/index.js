export function saveNo(type, number) {

      localStorage.setItem("userId", JSON.stringify(number))
  
 
    
  }
  
  export function getNo() {
   
     
    return localStorage.getItem("userId");

  
    
  }