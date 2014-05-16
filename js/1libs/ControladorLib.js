/* Controlador.js */

var idTimeout = null;

/**
* obtemUrlAjax - rotina que retorna uma URL para realizar requisicoes segundo um aplicativo
*
* @param aplicativo String, nome do aplicativo para obter a URL de requisicao
*
* @returns
*/
function obtemUrlAjax(aplicativo)
{
    if(aplicativo.length>0){
        return "./php/"+aplicativo+"/Ajax.php?";
    }
    return null;
}

/* Rotinas Adaptadoras */


/**
* obtemUrlAjax - rotina que retorna uma URL para realizar requisicoes segundo um aplicativo
*
* @param args String, Array de argumentos
*
* @returns query string em formato GET (p0=AAA&p1=BBB&p2=CCC...)
*/
function criaQueryString(args)
{
    var queryString = "";
    var p = 0;
    for(var i=0;i<args.length;i++) {
        /*ignorando funcoes passadas como parametro*/
        if(typeof(args[i])=="function" || typeof(args[i])=="undefined") continue;

        if(args[i] && typeof(args[i].length) != "undefined" && typeof(args[i]) != "string")
        {
            for(var j = 0 ; j < args[i].length ; j++)
            {
                if(p>0) {
                    queryString += "&";
                }
                queryString += ("p" + (p++) + "=" + encodeURIComponent(args[i][j]));
            }
        }
        else
        {
            if(p>0) {
                queryString += "&";
            }
            queryString += ("p" + (p++) + "=" + encodeURIComponent(args[i]));
        }

    }

    return queryString;
 
}

/**
* obtemArgumentos - rotina que obtem argumentos separados por virgula
*
* @param args String, Array de argumentos
*
* @returns argumentos no formato (AAA,BBB,CCC...)
*/
function obtemArgumentos(args)
{
    var argumentos = "";

    for(i=0;i<args.length;i++) {
        if(i>0) {
            argumentos += ",";
        }
        argumentos += ("'" + args[i] + "'");
    }
    return argumentos;
}

/**
* ControladorMestre - rotina que encapsula a criação de url de um
*                     aplicativo e a chamada de uma requisicao
*
* @param args String, Array de argumentos
* @param div  String, nome da div para receber a resposta
* @param url  String, url da requisicao
*/
function ControladorMestre(args,div,url)
{
    var url_requisicao = url;
    url_requisicao += criaQueryString(args);
    Ajax("GET",url_requisicao,true,div,null);
}


function valida_sessao_expirada(r){
    if(r.search(/^ERROR:SESSAO_EXPIRADA$/) != -1){
        jAlert("Por motivo de segurança, sua sessão foi encerrada em função do tempo de inatividade.<br/>Por favor, faça seu login novamente.","Sessão expirada",function(){
            location.href = "login";
        });
        $("#popup_close").remove();
        return false;
    }
    return true;
}

JSON.stringify = JSON.stringify || function (obj)
{
    var t = typeof (obj);
    if (t != "object" || obj === null)
    {
        // simple data type
        if (t == "string") obj = '"'+obj+'"';
        return String(obj);
    }
    else
    {
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj)
        {
            v = obj[n];t = typeof(v);
            if (t == "string") v = '"'+v+'"';
            else if (t == "object" && v !== null) v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};
