(function(window,$){
    
    $(function(){
        
        $('#login-form input[name="email"]').focus();
        
        var er = $("#error-login"),
        loginButton = $("#dologin"),
        originalText = loginButton.html();
        
        var form   = $('#login-form').form({
            action : 'visao/php/easyme/autenticacaoEasyme.php',
            events : {
                submit : function(){
                    er.hide();
                    if(!loginButton.hasClass('disabled') && form.evalAll()){
                        loginButton.html('Aguarde...').addClass('disabled');
                        
                        var f = form.getPost();
                        /*Chave para validar requisicao*/
                        f['xb68badbxad'] = '&d8#TR8yR@jds';

                        $.post( form.config.action , f , function(r){
                                
                            //                                console.log(r);
                            //                                return;
                                
                            r = $.parseJSON(r);
                                
                            if(r.login == 'AUTENTICADO'){
                                /*Carrega configuracoes do usuario*/
                                location.href = 'visao/php/easyme/carregarConfiguracoes';
                                return true;
                            }
                                
                            /*Cadastro cancelado, inicia reativacao*/
                            else if(r.login == 'CADASTRO_CANCELADO')
                                location.href = 'solicitarReativacaoConta';
                                
                            /*Cadastro nao validade, chama tela validacao*/
                            else if(r.login == 'CADASTRO_NAO_VALIDADO')
                                location.href = 'retornoValidacaoCadastro';
                                    
                            /*Dados invalidos*/
                            else {
                                loginButton.html(originalText).removeClass('disabled');
                                er.fadeIn(300);
                            }
                                
                        });
                    }
                    return false;
                }
            }
        }).data('jForm');         
          
          
        $("#prev-google").click(function(){
            window.open('https://accounts.google.com/o/oauth2/auth?client_id=507482723610.apps.googleusercontent.com&redirect_uri=http://www.meudinheiroweb.com.br/visao/php/easyme/autenticacaoGoogle.php&response_type=code&approval_prompt=force&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&access_type=offline','Login','toolbar=no,location=no, directories=no,status=no,menubar=no,scrollbars=no,resizable=no,menubar=no,width=685,height=520');
        });
        $("#prev-face").click(function(){
            window.open('./visao/php/easyme/autenticacaoFacebook','Login','toolbar=no,location=no, directories=no,status=no,menubar=no,scrollbars=no,resizable=no,menubar=no,width=685,height=520');
        });
        
        var info_panel = $("#info-panel"),
        _adjust_width = function(){
            $('.login-page-content').width(info_panel.width());
        };

        $(window).resize(_adjust_width);
        _adjust_width();

var jc = $(".jcarousel");

        jc.jcarousel({
            wrap: 'circular',
             animation: {
                duration: 400,
                easing:   'linear'
             }
        }).jcarouselAutoscroll({
            interval: 3000,
            target: '+=1',
            autostart: true
        });
        
        jc.find('.login-page-content').mouseenter(function(){
            jc.jcarouselAutoscroll('stop');
        }).mouseleave(function(){
            jc.jcarouselAutoscroll('start');
        })
        
        
         $('.jcarousel-prev').jcarouselControl({
            target: '-=1'
        });

        $('.jcarousel-next').jcarouselControl({
            target: '+=1'
        });
        
    });
   
   
})(window,jQuery);


//function twitter_login(){
//    window.open('./visao/php/easyme/solicitaTokenTwitter','Login','toolbar=no,location=no, directories=no,status=no,menubar=no,scrollbars=no,resizable=no,menubar=no,width=560,height=410' );
//}
//function autenticacaoUsuario(origem_login){
//
//    ControladorAutenticacaoUsuario("AUTENTICACAO_USUARIO",origem_login);
//    return (true);
//}
//function formulario_login(){
//    $("#formulario_login").fadeToggle(function(){
//        $(this).find('#email').focus();
//    });
//}
//
//function inicializar_index_aplicativos()
//{
//    inicializar_campos_login();
////    $(".imagem_aplicativo a").fancybox();
//    
//
//
//    $(".cadastrese").click(function(){
//        location.href = "preCadastro";
//    });
//}
//
//function inicializar_index()
//{
//    inicializar_campos_login();
//
//    /*Controla exibicao das imagens grandes de cada minuatura dos aplicativos*/
////    $(".imagem_preview a").fancybox();
//}
//
//function inicializar_campos_login()
//{
//    $("#input_email").placeholder({css:"place_holder"});
//    $("#input_senha").placeholder({css:"place_holder"});
//    
//    var preview_box = $("#preview_aplicativos");
//    $(".aplicativo").click(function(){
//        $(".selected").removeClass("selected");
//        $(this).addClass("selected");
//        $(".preview_aplicativo").hide();
//        $(".first").removeClass("first");
//        $("#preview_" + $(this).attr("app")).fadeIn(100);
//    });
//
//    $("#form_autenticacao_usuario")[0].onsubmit = function(){
//         
//        var origem_login = $("#form_autenticacao_usuario").attr("origem_login");
//        autenticacaoUsuario(origem_login);
//        return false;
//    };
//    
//    $("#input_cadastro").click(function(){
//       location.href = "preCadastro";
//    });
//
//    var cookie_conexao = fun_getCookie('EASYME_CONEXAO');
//    var usuario_login  = fun_getCookie('EASYME_LOGIN');
//
//
//    if(cookie_conexao!=null){
//         ControladorAutenticacaoVerificarCookieContinuarConectado('VERIFICAR_COOKIE_CONTINUAR_CONECTADO',cookie_conexao,usuario_login);
//    }
//}
//
//function slideshow(id,prev_id,next_id)
//{
//    $(id).jcarousel({
//        scroll: 1,
//        wrap : "circular",
//        buttonNextHTML: null,
//        buttonPrevHTML: null,
//        initCallback: botoes
//    });
//    function botoes(c)
//    {
//        $(prev_id).click(function(){
//            c.prev();
//        })
//        $(next_id).click(function(){
//            c.next();
//        })
//    }
//}
