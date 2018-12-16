const Headers = (function(){
  
  let header={
    getHeader: function(){
      return{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
        credentials: 'same-origin'
      }
    },
    postHeader: function(form){
      return{
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(form)}
      },
    deleteHeader: function(){
      return{
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        method: 'DELETE'}
      }
  };
  
  function Headers(){
    if(!header){
      header=this 
    }else {
      return header;
    }
  }
  
  return Headers;
  
}());

export default Headers;