//var controleMensagem;
//
//function inicializa_cabecalho_aplicativo()
//{
//    controleMensagem = true;
//
////    $(".pin_easyme,#engrenagem_configuracao").mouseover(function(){
////        $("#pin_easyme").toggleClass("link_cabecalho_hover");
////    }).mouseout(function(){
////        $("#pin_easyme").toggleClass("link_cabecalho_hover");
////    });
//
//    /*Exibe caixa de aplicativos easyme*/
//    $(".pin_easyme").click(function(){
//        $("#aplicativos_easyme").show().closeout();
//    });
//    $(".closeout-close-pin").click(function(e){
//        e.stopPropagation();
//        $("#aplicativos_easyme").hide();
//    });
//    
//}
//
//function verificaMensagemUsuario(aplicativo,callback)
//{
//    if(controleMensagem && $("#conteudo_outras_info")[0] && $("#conteudo_outras_info").html().trim().length == 0)
//    {
//        get(obtemUrlAjax("easyme"),["CARREGAR_MENSAGENS_USUARIO",aplicativo],function(msg)
//        {
//            processaMensagemUsuario(msg);
//            callback();
//        });
//    }
//    else
//    {
//        callback();
//    }
//
//    controleMensagem = false;
//}
//
//function processaMensagemUsuario(msg)
//{
//    if(msg != "null")
//    {
//        msg = $.parseJSON(msg);
//
//        exibeAreaNotificacoes(msg);
//    }
//}
//
//function exibeAreaNotificacoes(mensagem)
//{
//    var bmsg = false;
//    if(mensagem)
//    {
//        bmsg = true;
//        var script = "";
//        
//        if(mensagem.script && mensagem.script.length > 0)
//        {
//            mensagem.mensagem = "<a href='javascript:void(0);'>" + mensagem.mensagem + "</a>";
//            script = "<script>$(function(){ $('#conteudo_outras_info a').click(function(){"+ mensagem.script +" })})</script>";
//        }
//        $("#conteudo_outras_info").html(mensagem.mensagem + script);
//
//        $("<div id='exibe_todas_info'><a href='javascript: void(0);'>Exibir todas</a></div>").
//            insertAfter("#fechar_outras_info").click(function(){
//            $("#fechar_outras_info a").click();
//            jAjax("Lembretes Easyme","visao/php/easyme/exibeMensagensUsuario.php");
//        });
//    }
//    
//    $("#fechar_outras_info a").one("click",function(){
//        $("#ante_cabecalho").height(48);
//        if(bmsg) marcar_mensagem_usuario_lida(mensagem.codigo);
//        $("#outras_info").fadeOut(100);
//    });
//    $("#ante_cabecalho").height(60);
//    $("#outras_info").fadeIn(100);
//}
//
//function marcar_mensagem_usuario_lida(codigo,callback)
//{
//    get(obtemUrlAjax("easyme"),["LER_MENSAGEM_USUARIO",codigo],function(){
//        if(callback) callback();
//    });
//}
//
//function tratar_tela_notificacoes_usuario()
//{
//    if($("#notificacoes_usuario table").height() > 250 )
//    {
//        $("#notificacoes_usuario").css("overflow-y","scroll");
//        $("#notificacoes_usuario table").width(545);
//    }
//
//    $("#fechar_mensagens_usuario").click(function(){
//        cancelar_jAjax();
//    });
//
//    var marcar_todas_como_lidas = function()
//    {
//        var r = confirm("Deseja remover todas as mensagens?");
//        if(r)
//        {
//            var linha = $("#notificacoes_usuario .linha_msg");
//            var codigos = new Array();
//            linha.each(function(){
//                codigos.push($(this).attr("cod"));
//            });
//
//            get(obtemUrlAjax("easyme"),["LER_MENSAGENS_USUARIO",JSON.stringify(codigos)],function(r){
//                cancelar_jAjax();
//            });
//        }
//        else
//        {
//            $("#ferramentas_notificacoes_usuario a").one("click",marcar_todas_como_lidas);
//        }
//    }
//
//    $("#ferramentas_notificacoes_usuario a").one("click",marcar_todas_como_lidas);
//
//
//    $(".marcar_lida").one("click",function(){
//       var linha = $(this).closest("tr");
//       var cod = linha.attr("cod");
//       marcar_mensagem_usuario_lida(cod,function(){
//           linha.fadeOut(200,function(){
//               if($("#notificacoes_usuario table .linha_msg:visible").length == 0)
//               {
//                    cancelar_jAjax();
//               }
//           });
//       })
//    });
//}
//
//function tratar_ajuda_easyme()
//{
//    var ajuda = $("#ajuda_easyme");
//
//   ajuda.qtip({
//        content: {
//            text : "Para habilitar/desabilitar a ajuda, clique neste link.<BR><BR>Quando a ajuda estiver habilitada, clique nos ícones <img src='visao/img/help-icon-white-bg.png'/> para exibi-la.",
//            title:{
//                text: "Como utilizar a ajuda Easyme"
//            }
//        },
//        position: {
//            my : "top center",
//            at : "bottom center"
//        },
//        style: {
//            classes: 'ui-tooltip-rounded'
//        },
//        show : {
//            solo: true
//        }
//    });
//    
//    ajuda.click(function(){
//        var status = $(this).hasClass("enabled");
//        ControladorEasyme("HABILITAR_AJUDA",status ? 0 : 1,function(r){
//            var tt = $(".tooltip");
//            if(status){
//                tt.attr({"visible":0,src:"visao/img/blank.png"}).addClass("disabled");
//                ajuda.removeClass("enabled");
//             }else{
//                tt.attr({"visible":1,src:"visao/img/help-icon-white-bg.png"}).removeClass("disabled");
//                ajuda.addClass("enabled");
//             }
//        });
//    });
//    
//    $.extend($.fn,
//    {
//        calendario : function(o)
//        {
//            var defaults =
//            {
//                minDate   : null,
//                maxDate   : null,
//                yearRange : "c-1:c+2",
//                onClose   : function() {return true;},
//                onSelect  : null
//            };
//
//            o = $.extend(defaults, o);
//
//            return this.each(function()
//            {
//                return $(this).datepicker("destroy").datepicker(
//                {
//                    minDate  : o.minDate,
//                    maxDate  : o.maxDate,
//                    onClose  : o.onClose,
//                    yearRange: o.yearRange,
//                    onSelect : o.onSelect
//                });
//            });
//        }
//    });
//}
//
