if(jQuery){
    (function($){
        $.extend($.fn,{

            slide_easy: function(img)
            {
                /*Configuracoes do objeto de imagem*/
                if(!img) img = {};
                if(!img.width_all) img.width_all = ""; 			/*Width default das imagens*/
                if(!img.main) img.main = 0; 				/*Posicao da selecionada na lista*/
                if(!img.width_main) img.width_main = img.width_all; 	/*Width da imagem selecionada*/
                if(!img.animation_speed) img.animation_speed = "slow"; 	/*Velocidade de animacao default*/

                var imgs = $(this).find(".easy_data img"); /*Array de imagens*/

                /*Constantes para indicar tipo de animacao*/
                var DEF_EXPANDIR = 1;
                var DEF_CONTRAIR = 2;

                /*Cria eventos para determinada imagem*/
                function bind(pos)
                {
                    imgs.eq(pos)
                    .bind("mouseover",function(){
                        highlight(pos);
                        /*Previne a animacao de ser chamada mais de uma vez*/
                        $(this).one("mouseout",function(){
                            no_highlight(pos);
                        });
                    });
                }
                /*Gera highlight*/
                function highlight(pos)
                {
                    /*Para a animacao anterior*/
                    imgs.eq(img.main).stop(true,true).width(img.width_all);
                    /*Seta a posicao da imagem atual em img.main*/
                    img.main = pos;
                    /*Realiza expansao*/
                    animate(pos,DEF_EXPANDIR);
                }
                /*Remove highlight*/
                function no_highlight(pos)
                {
                    /*Realiza reducao*/
                    animate(pos,DEF_CONTRAIR);
                }
                /*Anima a imagem*/
                function animate(pos,tipo)
                {
                    var imagem_atual = imgs.eq(pos);
                    var w = img.width_main - img.width_all;
                    var s = (tipo == DEF_EXPANDIR) ? ("+="+w) : ("-="+w) ;

                    imagem_atual.animate({
                        width: s
                    },img.animation_speed);
                }

                /*Inicializa eventos para cada imagem*/
                imgs.each(function(e){
                    bind(e);
                });

                /*Seta width default para todas as imagens*/
                imgs.width(img.width_all);
            }
        });
    })(jQuery);
}