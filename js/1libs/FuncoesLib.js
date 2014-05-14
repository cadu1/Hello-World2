

function fun_validaCampos()
{
    var erro = false;

    for(i=0; i<arguments.length;i++){
        arguments[i].css({"border":"1px solid #ccc"});
    }
    for(i=0; i<arguments.length;i++){
        if(arguments[i].val().trim().length == 0){
            erro = true;
            arguments[i].css({"border":"1px solid red"});
        }
    }
    return erro;
}

function fun_removeEspacos(str)
{
    return str.replace(/^\s*/, "").replace(/\s*$/, "");
}

function fun_validaURL(url)
{
//    www.google.com.br
//        /search?hl=pt-BR&q=negando+expressão+regular+%2520+url+adf+as+&aq=f&aqi=&aql=&oq=
//    www.google.com.br/search?hl=pt-BR&q=negando+expressão+regular+%2520+url+adf+as+&aq=f&aqi=&aql=&oq=

    var expUrl = /^(http(s)?:\/\/)?(((www)\.){1}|(\w+(\.|\-){1})){1}((\w)|(\.))+((\w)*|([_%:~?=!+\#(),&.\-\/]))+$/;
    return expUrl.test(url);
}
function fun_isNumeric(value)
{
    var exp = /^[-]?\d*\.?\d*$/;
    return exp.test(value);
}
//Funcoes genericas
function fun_validaEmail(email)
{
    var expEmail = /^[\w!#$%&'*+\/=?^`{|}~-]+(\.[\w!#$%&'*+\/=?^`{|}~-]+)*@(([\w-]+\.)+[A-Za-z]{2,6}|\[\d{1,3}(\.\d{1,3}){3}\])$/;
    return expEmail.test(email);
}

/*Valida formato da data.*/
function fun_validaData(valor)
{
    var expReg = /^((0[1-9]|[12]\d)\/(0[1-9]|1[0-2])|30\/(0[13-9]|1[0-2])|31\/(0[13578]|1[02]))\/(19|20)?\d{2}$/;

    if(expReg.test(valor)){
        var erro = true;

        var dia = valor.substring(0,2);
        var mes = valor.substring(3,5);
        var ano = valor.substring(6,10);

        if ((mes == 4 || mes == 6 || mes == 9 || mes == 11 ) && dia > 30){
            erro = false;
        }
        else{
            if ((ano % 4) != 0 && mes == 2 && dia > 28){
                erro = false;
            }
            else{
                 if ((ano%4) == 0 && mes == 2 && dia > 29){
                     erro = false;
                  }
             }
        }
        return erro;
    }
    else{
        return (false);
    }
}
function fun_setCookie(c_name,value,exdays)
{ 
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

function fun_getCookie(c_name)
{
    var i;
    var x;
    var y;
    var ARRcookies = document.cookie.split(";");

    for (i = 0 ; i<ARRcookies.length ; i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x == c_name)
        {
           return unescape(y);
        }
    }
    return (null);
}
/**
 * Funcao semelhante a date() do php
 * @param format Qualquer formato de date
 * @param dateparam Uma stringDate ou o tempo em milisegundos.
*/
function get_date(format,dateparam)
{
    var that = this,
        jsdate, f, formatChr = /\\?([a-z])/gi,
        formatChrCb,
        // Keep this here (works, but for code commented-out
        // below for file size reasons)
        //, tal= [],
        _pad = function (n, c) {
            if ((n = n + "").length < c) {
                    return new Array((++c) - n.length).join("0") + n;
            } else {
                    return n;
            }
        };

    formatChrCb = function (t, s) {
        return f[t] ? f[t]() : s;
    };

    f = {
        // Day
        d: function () { // Day of month w/leading 0; 01..31
                return _pad(f.j(), 2);
        },
        w: function () { // Day of week; 0[Sun]..6[Sat]
                return jsdate.getDay();
        },
        j: function () { // Day of month; 1..31
                return jsdate.getDate();
        },

        // Month
        m: function () { // Month w/leading 0; 01...12
                return _pad(f.n(), 2);
        },
        n: function () { // Month; 1...12
                return jsdate.getMonth() + 1;
        },
        // Year
        Y: function () { // Full year; e.g. 1980...2010
                return jsdate.getFullYear();
        },
        y: function () { // Last two digits of year; 00...99
                return (f.Y() + "").slice(-2);
        }
    };

    this.date = function (format) {
        that = this;
        jsdate = !dateparam ? new Date() : 
                    (typeof dateparam == "string" ? 
                    new Date(dateparam.replace(/-/g,"/")) : new Date(dateparam));
        return format.replace(formatChr, formatChrCb);
    };
    return this.date(format);
}


function add_date(date,quant,interval)
{
    /*Resolve problema da data 2013-10-20*/
    if(date && date.trim().length == 10) date += " 01:00:00";
    
    var o = new Date(date.replace(/-/g,"/"));
    interval = !interval ? "MONTH" : interval;

    switch(interval)
    {
        case "DAY"   : o.setDate(o.getDate() + quant); break;
        case "MONTH" : o.setMonth(o.getMonth() + quant); break;
        case "YEAR"  : o.setFullYear(o.getFullYear() + quant); break;
        case "WEEK"  : o.setDate(o.getDate() + quant*7); break;
    }
    
    var aux = get_date("Y-m-d",o.getTime());

    if( (interval == "MONTH" || interval == "YEAR") && date.length >= 10 && ( date.substr(8,2) != aux.substr(8,2) ) )
    {
            aux = sub_date( aux.substr(0,7) + '-01' ,1,"DAY");
//            var ano_mes = aux.substr(0,7);				
//            aux = ano_mes + "-" + last_day(ano_mes);
    }
    
    return aux;
}

function sub_date(date,quant,interval)
{
    return add_date(date,-quant,interval);
//    var o = new Date(date.replace(/-/g,"/"));
//    interval = !interval ? "MONTH" : interval;
//
//    switch(interval)
//    {
//        case "DAY"   : o.setDate(o.getDate() - quant); break
//        case "MONTH" : o.setMonth(o.getMonth() - quant); break
//        case "YEAR"  : o.setFullYear(o.getFullYear() - quant); break
//        case "WEEK"  : o.setDate(o.getDate() - quant*7); break
//    }
//
//    return get_date("Y-m-d",o.getTime());
}

/*Realiza $date1 - $date2 */
function diff_date(date1,date2,interval,frequency)
{
    var i = 0;
    interval = !interval ? "MONTH" : interval;
    frequency = !frequency ? 1 : frequency;
    if(frequency)
    {
        if(datecmp(date1,date2) > 0)
        {
            while(datecmp(date1,date2) > 0)
            {
                date1 = sub_date(date1, frequency , interval);
                i++;
            }
        }
        else if(datecmp(date1,date2) < 0)
        {
            while(datecmp(date1,date2) < 0)
            {
                date1 = add_date(date1, frequency , interval);
                i--;
            }
        }
    }
    return i;
}

//function last_day(ano_mes){
//    if(!ano_mes) ano_mes = date("Y-m");
//    return sub_date(add_date(ano_mes,1,"MONTH") , 1 , "DAY" ).substr(8,2);
//}

/*Compara duas datas (yyyy-mm-dd), se date1 menor que date2
* retorna negativo, caso contrario positivo, senao zero. */
function datecmp(date1,date2)
{
    date1 = new Date(date1.replace(/-/g,"/"));
    date2 = new Date(date2.replace(/-/g,"/"));
    var diff = date1.getTime() - date2.getTime();
    return diff < 0 ? -1 : (diff > 0 ? 1 : 0) ;
}

function datebtw(date,start,end)
{
    var inf,sup;
    /*Se data antes do limite inferior, retorna negativo*/
    if( (inf = datecmp(date,start)) < 0 ) return inf;
    /*Se data depois do limite superior, retorna positivo*/
    if( (sup = datecmp(date,end)) > 0 ) return sup;
    /*Senao retorna 0*/
    return 0;
}

function getData(mascara)
{
    var hoje = new Date();
    var data = new Array();

    data[0] = hoje.getDate().toString();
    data[0] = data[0].length == 1 ? "0"+data[0]: data[0];
    
    data[1] = (hoje.getMonth()+1).toString();
    data[1] = data[1].length == 1 ? "0"+data[1]: data[1];
    data[2] = hoje.getFullYear();

    return data.join(mascara);
}


function date_reverse(date,separator)
{
    date = date.split(separator);
    var new_date = new Array();
    new_date[0] = date[2];
    new_date[1] = date[1];
    new_date[2] = date[0];
    return new_date;
}

function fun_validaHora(hora)
{
    if(hora.trim().length == 5)
    {
        if( (parseInt(hora.substring(0,2),10)<0 || parseInt(hora.substring(0,2),10)>23) ||
            (parseInt(hora.substring(3,6),10)<0 || parseInt(hora.substring(3,6),10)>59) )
        {
            return false;
        }
    }
    else{
        return false;
    }
    
    return true;
}

function get_nome_meses(pos)
{
    var meses = ["Janeiro","Fevereiro","Março","Abril","Maio",
                 "Junho","Julho","Agosto","Setembro","Outubro",
                 "Novembro","Dezembro"];
        
        pos = parseFloat(pos);
  return pos<=0 || pos>12 ? meses : meses[pos-1];
}

function get_array_anos(quant,prev)
{
    var anos = [],
    y = parseFloat(get_date("Y"));
    prev = prev !== undefined ? prev : true;
    for(var i=0;i<quant;i++)
    {
        var ano =  y +  i;
        if(prev) ano -= Math.ceil(quant/2 - 0.5)  ;
        anos.push(ano);
    }
    return anos;
}

function json(o){
    return JSON.stringify(o);
}

function validaData(data){
    return data && fun_validaData(data.format_date_br());
}