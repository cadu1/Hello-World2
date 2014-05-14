/* Variaveis devem ser globais, pois uma requisicao 
 * precisa finalizar os handles de outra */
var ajaxHandle1,ajaxHandle2;

function post(url,param,callback)
{
    Ajax("POST",url,true,null,callback,criaQueryString(param));
}
function postSync(url,param,callback)
{
    Ajax("POST",url,false,null,callback,criaQueryString(param));
}
function get(url,param,callback)
{
    Ajax("GET",url,true,null,callback,criaQueryString(param));
}
function getSync(url,param,callback)
{
    Ajax("GET",url,false,null,callback,criaQueryString(param));
}

function Ajax(metodo,url,assinc,div,funcao,param)
{
    var msg_conexao = "Carregando...",
        timeout_msg = 0,
        erros       = 0,
        timeout     = 30 * 1000; /*30 segundos*/

    /*Rotinas de execucao*/

    function _run(settings)
    {
        $.ajax(settings);
    }

    function _status(bool, mensagem, nivel,click)
    {
        if(bool){
            var div;
            var classe;
            if(!$('#ajax_status')[0])
            {
                div = $("<div id='ajax_status'></div>");
                $("body").prepend(div);
                var w = $(div).width();
                div.css({"margin-left": -w/2 - 90,left : "50%"});
            }
            else
            {
                div = $("#ajax_status");
            }

            if(!nivel) nivel = "ajax_light";

            switch(nivel)
            {
                case 1 :classe = "ajax_light";break;
                case 2 :classe = "ajax_medium";break;
                case 3 :classe = "ajax_heavy";break;
            }

            if(click) mensagem = "<a href='javascript:void(0);'>"+mensagem+"</a>";

            div.removeAttr("class").html(mensagem).addClass(classe).show().find("a").one("click",function(){
                if(click) click();
            });

        }else{
            $('#ajax_status').hide();
        }
    }

    function _showError(code)
    {
        location.href='error?e=500';
//        _status(true,"Ocorreu um erro inesperado"+(code ? " (" + code +")" : "")+"."+
//                    "<BR>Clique aqui para reportar este erro.",3,function(){
//            location.href="faleconosco?assunto=problema&m=Erro ("+code+")\n";
//        });
    }
    function _showConnectionError()
    {
        _status(true,"Por favor, verifique a sua conexão."+
                "<BR>Clique aqui para tentar novamente.",2,function(){
                timeout_msg = 0;
                _run(ajax);
        });
    }

    /*Tratamento das requisicoes*/

    function _beforeSend(ajax,settings)
    {
        clearTimeout(ajaxHandle1);
        clearTimeout(ajaxHandle2);

        var tempo = settings.timeout / 2;
        ajaxHandle1 = setTimeout(function(){
            _status(true,"Ainda carregando...",!erros?1:2);
        },tempo);

        ajaxHandle2 = setTimeout(function(){
            _status(true,msg_conexao,!erros?1:2);
        },timeout_msg);

    }

    function _error(jqXHR, textStatus, errorThrown)
    {	
        /*Sem conexao*/
        if( (jqXHR.status == 0 && textStatus == "error" && errorThrown == "") || textStatus == "timeout")
            /*Timeout necessario para tratar evento de atualizacao da pagina*/
            setTimeout(_showConnectionError,500);
        /*Outros erros*/
        else if ( jqXHR.status )
            _showError(jqXHR.status);
    }	

    function _complete(jqXHR)
    {
        clearTimeout(ajaxHandle1);
        clearTimeout(ajaxHandle2);
    }

    function _success(r)
    {
        /*Timeouts devem ser limpados aqui por causa da chamada callback abaixo*/
        _complete();
        _status(false);

        if(!valida_sessao_expirada || valida_sessao_expirada(r)){
            if(div) $("#"+div).html(r);
            if(funcao) funcao(r);
        }
    }

    /*Executando requisicao*/
	
    if( $("#i_a").length == 1)
    {
        if(param) param += "&uid="+$("#i_a").val();
        else      url += "&uid="+$("#i_a").val();
    }

    var ajax = {
        url        : url,
        async      : assinc,
        data       : param,
        type       : metodo,
        timeout    : timeout,
        beforeSend : _beforeSend,
        success    : _success,
        error 	   : _error,
        complete   : _complete
    };

    _run(ajax);
	
		
}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	