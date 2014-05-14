(function(window,MD,$){
    
    var PDI = function(){},
    fn = PDI.prototype,
    Ajax = fn.Ajax = new MD.Controlador('PDI');
    
    MD.PDI = new PDI;
    
    
    var iniciar = fn.iniciar = function(){
      
        var d = new jDialog({
            draggable : false,
           ajax : function(){
               Ajax('INICIAR',function(r){
                   d.html(r).center()   ;
                   
                   var share = $("#pdi-link-share"),
                   _select = function(){
                       share.select();
                   };
                   
                   share.click(_select).keydown(function(e){
                       var key = e.key || e.keyCode || e.which;
                       if(key != 17 && key != 67) return false;
                   });
                   
                   $("#pdi-copy").click(_select);
                   
                   $("#pdi-mail-template").click(function(){
                       var dd = new jDialog({
                          title : 'Modelo de email',
                          html : "Enviando modelo...",
                          showButtons : false,
                          buttons : {
                              Fechar : function(){
                                  dd.close();
                              }
                          }
                       });
                       Ajax('ENVIAR_TEMPLATE',function(r){
                           dd.html(r).showButtons();
                       });
                   });
                   
                   $("#pdi-share-facebook").click(function(){
                       var url = share.val();
                        window.open(
                            'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url), 
                            'facebook-share-dialog', 
                            'width=626,height=436'); 
                        return false;
                   });
                   
                   $("#pdi-share-twitter").click(function(){
                       var url = share.val(),
                       text = $(this).attr('text');
                        window.open(
                            'https://twitter.com/intent/tweet?url='+encodeURIComponent(url)+"&text="+text, 
                            'twitter-share-dialog', 
                            'width=626,height=436'); 
                        return false;
                   });
                   
                   $("#pdi-share-plus").click(function(){
                       var url = share.val();
                        window.open(
                            'https://plus.google.com/share?url='+encodeURIComponent(url), 
                            'plus-share-dialog', 
                            'width=626,height=436'); 
                        return false;
                   });
                   
                   $("#pdi-rules").click(function(){
                      var dd = new jDialog({
                            title : 'Regulamento programa de indicações',
                            draggable : false,
                            showButtons : false,
                            ajax : function(){
                                Ajax('TERMOS',function(r){
                                    dd.html(r).showButtons();
                                });
                            },
                            buttons:{
                                Fechar : function(){
                                    dd.close();
                                }
                            }
                      });
                   });
                   
                   $("#pdi-history").click(function(){
                       MD.Configuracoes.iniciar(-1);
                   })
                                      
               });
           }
           
        });
        
    };
    
    $(function(){
        $("#pdi").click(iniciar);
    });
    
    
    
})(window,window.MD,jQuery);