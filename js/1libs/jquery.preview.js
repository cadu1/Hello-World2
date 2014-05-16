$.extend($.fn,
{
    preview: function(o)
    {
        if(!o.position) o.position = "left center";
        
        if(o.ajax){
            o.title = "Carregando...";
            o.text  = "<img src='img/uploading.gif' />";
        }
        /**
         * Descricao dos atribudos do objeto o:
         * 
         * text : Texto que serah exibido no preview
         * title : Titulo que serah exibido no preview
         */
        $(this).qtip({
            content: {
                text : o.text,
                title:{
                    text: o.title,
                    button: 'Fechar'
                },
                ajax : o.ajax
            },
            
            
            position: {
                my : o.position,
                at : "left center"
            },
            style: {
                classes: 'qtip-light'
            },
            hide: {
                event: 'unfocus'
            },
            show : {
                event: 'click',
                solo: true
            }
        });
    }
});