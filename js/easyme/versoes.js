(function(){

    $(function(){

        $.post("php/botao_versoes_pagamento_pague_seguro.php",{aplicativo:"MEUDINHEIRO"},function(retorno){
            $("#precos-tabela").html(retorno);
        });

         $(".dados.descricao").each(function(){
            var text = $(this).find("span").attr("obs");
            var target = $(this).find("span");
            $(this).qtip({
                content: {
                    text : text,
                    title:{
                        text: ""
                    }
                },
                position: {
                    my : "left center",
                    at : "right center",
                    target : target
                },
                style: {
                    classes: 'qtip-dark',
                    width: 280
                },
                show : {
                    solo: true
                },
                hide: {
                       fixed: true
                }
            });  
         });

         $(".testar-gratis").click(function(){
             jAjax("Termos de uso do Meu Dinheiro Premium","php/alert_aviso_premium.php");
         });
    });    
})();
