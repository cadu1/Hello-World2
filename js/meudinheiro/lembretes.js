(function(window,MD,$){
    
var Lembretes = function(){},
fn = Lembretes.prototype,
Ajax = fn.Ajax = new MD.Controlador('LEMBRETES');
MD.Lembretes = new Lembretes;

function iniciar(){
    carregar(_handle)
}

var carregar = function(cb){
    Ajax('CARREGAR',function(r){
        cb && cb($.parseJSON(r));
    })
}

function _handle(ms){
    /*Configuracoes*/
    $(function(){

        var 
        size = ms.length,
        last = 0,
        timeout = 3000,
        h, // Handler for the interval
        box = $("#preview-lembretes"),
        bNext = $("#preview-lembretes-actions .next"),
        bPrev = $("#preview-lembretes-actions .prev"),
        bRead = $("#preview-lembretes-actions .read"),
        counter = $("#lembretes .badge").html(size),
        icounter = $("#preview-lembretes-counter"),
        title = $("#preview-lembretes-title"),
        content = $("#preview-lembretes-content"),
        footer = $("#preview-lembretes-footer"),
        _show = function(){
            box.show();
            if(size == 0){
                title.html('Nenhuma mensagem não lida no momento.')
                content.hide();
                footer.hide();
                counter.hide();
                setTimeout(_close,2000);
                return;
            }
            /*Chegou ao ultimo pela animacao? fecha..*/
            if(last == size && h !== null){
                _close();
                return;
            }
            title.html(ms[last].title);
            content.show().html(ms[last].content).find('a').attr('target','_blank');;
            footer.show();
            counter.show();
            icounter.html( (last+1) + "/" + size);
            bNext.toggleClass('disabled',last+1 == size);
            bPrev.toggleClass('disabled',last == 0);
        },
        _next = function(){ _show(++last); },
        _prev = function(){ _show(--last); },
        _restart = function(){ 
            if(h === undefined){ //Previne o recadastro do evento
                h = setInterval(_next,timeout); 
            }
        },
        _stop = function(){
            h = clearInterval(h);
        },
        _close = function(){
            _stop();
            box.off('mouseenter mouseleave');
            box.fadeOut();
        };

        box.mouseenter(_stop).mouseleave(_restart);
        $("#preview-lembretes-close").click(_close);

        bNext.click(function(){
            if(!$(this).hasClass('disabled')) _next();
        });
        bPrev.click(function(){
            if(!$(this).hasClass('disabled')) _prev();
        });
        bRead.click(function(){
            if(size > 0){ 
                Ajax('MARCAR_LIDA',ms[last].id);
                size--;
                counter.html(size);
                ms.splice(last,1);
                if(last > 0) last--;
            }
            _show();
        })
        
        $("#lembretes").click(function(){
            last=0;
            _show();
        })
        
        if(size > 0){
            _restart();
            _show();
        }
        
    });
}

  
iniciar();
 
    
//    get(obtemUrlAjax("easyme"),["CARREGAR_MENSAGENS_USUARIO","meudinheiro"],function(msg){
//        processaMensagemUsuario(msg);
//    });

})(window,window.MD,jQuery);



var controleMensagem;


function carregar_lembretes(){
    
    /*Desmarca todos os links do cabecalho*/
    marcar_link_cabecalho();
    
    ControladorMeuDinheiro("CARREGAR_LEMBRETES_USUARIO",function(r){
        $("#conteudo").html(r);
    })

}

function processaMensagemUsuario(msg)
{
    if(msg != "null")
    {
        msg = $.parseJSON(msg);

        exibeAreaNotificacoes(msg);
    }
}

function exibeAreaNotificacoes(mensagem)
{
    var contador = $("#msg-count");
    if(mensagem.total > 0) contador.html(mensagem.total).show();
    
    if(mensagem.mensagem)
    {
//        alert('ei')
        var script = "";
        
        if(mensagem.script && mensagem.script.length > 0)
        {
            mensagem.mensagem = "<a href='javascript:void(0);'>" + mensagem.mensagem + "</a>";
            script = "<script>$(function(){ $('#conteudo_outras_info a').click(function(){"+ mensagem.script +" })})</script>";
        }

        if($("#conteudo_outras_info").html().trim().length == 0)
            $("#conteudo_outras_info").html(mensagem.mensagem + script);
        
        
        $("#outras_info").fadeIn(100);

    }
    
    $("#fechar_outras_info a").one("click",function(){
        var quant = parseFloat(contador.html());
        
        marcar_mensagem_usuario_lida(mensagem.codigo);
        
        $("#outras_info").fadeOut(100);
        
        if(!isNaN(quant) && quant > 1){
            contador.html(quant-1);
        }else{
            contador.hide();
        }
        
    });
}

function marcar_mensagem_usuario_lida(codigo,callback)
{
    if(codigo){
        get(obtemUrlAjax("easyme"),["LER_MENSAGEM_USUARIO",codigo],function(){
            if(callback) callback();
        });
    }
}

function tratar_tela_notificacoes_usuario()
{
    var marcar_todas_como_lidas = function()
    {
        jConfirm("Deseja remover todas as mensagens?","Remover mensagens",function(r){
            if(r)
            {
                var linha = $("#notificacoes_usuario .linha_msg");
                var codigos = new Array();
                linha.each(function(){
                    codigos.push($(this).attr("cod"));
                });

                get(obtemUrlAjax("easyme"),["LER_MENSAGENS_USUARIO",JSON.stringify(codigos)],function(r){
                    carregar_lembretes();
                });
            }
            else
            {
                $("#ferramentas_notificacoes_usuario a").one("click",marcar_todas_como_lidas);
            }
        });
        
    }

    $("#ferramentas_notificacoes_usuario a").one("click",marcar_todas_como_lidas);


    $(".marcar_lida").one("click",function(){
       var linha = $(this).closest("tr");
       var cod = linha.attr("cod");
       marcar_mensagem_usuario_lida(cod,function(){
           linha.fadeOut(200,function(){
               var quant = $("#notificacoes_usuario table .linha_msg:visible").length;
               if( quant == 0)
                    carregar_lembretes();
                else 
                    $("#msg-count").html(quant);
           });
       })
    });
}
