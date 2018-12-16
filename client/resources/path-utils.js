const PathUrls = (function(){
  
  let header={
    channelsPath: function(){
      return '/api/channels';
    },
  };
  
  function PathUrls(){
    if(!header){
      header=this 
    }else {
      return header;
    }
  }
  
  return PathUrls;
  
}());

export default PathUrls;