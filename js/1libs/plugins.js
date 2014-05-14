Date.prototype.getString = function()
{
    var y = this.getFullYear();
    var m = this.getMonth() + 1;
    var d = this.getDate();

    return String(y+"-"+m+"-"+d);
}

Date.prototype.br = function()
{
    var ano = this.getFullYear();
    var mes = this.getMonth() + 1;
    var dia = this.getDate();
    mes = mes > 9 ? mes : "0"+mes;
    dia = dia > 9 ? dia : "0"+dia;

    return dia+"/"+mes+"/"+ano;
}
Date.prototype.set = function(date_string)
{
    var date = date_string.split("-");
    this.setFullYear(date[0]);
    this.setMonth( date[1] ? parseFloat(date[1]) - 1 : 0 );
    this.setDate( date[2] ? date[2] : null );
}
Date.prototype.add = function(quant,interval)
{	
    switch(interval)
    {
        case "DAY":this.setDate(this.getDate() + quant);break;
        case "WEEK":this.setDate(this.getDate() + 7*quant);break;
        case "YEAR":this.setFullYear(this.getFullYear() + quant);break;
        case "MONTH": 
        default:this.setMonth(this.getMonth() + quant);break;
    }
}

String.prototype.replaceAll = function(bgn, end)
{
    var str = this;
    var pos = str.indexOf(bgn);
    while (pos > -1){
        str = str.replace(bgn, end);
        pos = str.indexOf(bgn);
    }
    return String(str);
}
String.prototype.remove_acentuacao = function()
{
    var acentos = "àèìòùâêîôûäëïöüáéíóúãõÀÈÌÒÙÂÊÎÔÛÄËÏÖÜÁÉÍÓÚÃÕ";
    var traducao = "aeiouaeiouaeiouaeiouaoAEIOUAEIOUAEIOUAEIOUAO";
    var pos, carac;
    var aux = "";

    for (var i=0; i < this.length; i++)
    {
        carac = this.charAt(i);
        pos  = acentos.indexOf(carac);
        if (pos > -1)
            aux += traducao.charAt (pos);
        else
            aux += this.charAt(i);
    }
    return aux;
}
String.prototype.trim = function()
{
    return this.replace(/^\s+|\s+$/g, "");
}
String.prototype.firstToUpper = function()
{
    return this.charAt(0).toUpperCase() + this.substr(1,this.length - 1).toLowerCase();
}
String.prototype.reverse = function()
{
    var retorno = "";
    for(var i= (this.length - 1) ; i >= 0  ; i--) retorno += this.charAt(i);
    return retorno;
}
String.prototype.format_date_br = function()
{
    var data = this.split("-");
    return data[2]+"/"+data[1]+"/"+data[0];
}
String.prototype.parseFloat = function()
{
    if(typeof(this) == "number") return this;

    return parseFloat (this.replace(/[a-zA-Z\$\s\.]/g,'').replace(",",".") );
}
String.prototype.formatDateMySql = function()
{
    var trimmed = this.replace(/\s/g,'');
    /*Verifica se data jah estah formatada*/
    if(trimmed.charAt(4) == "-" || trimmed.length == 0) return this;
    var dia = trimmed.substr(0,2);
    var mes = trimmed.substr(3,2);
    var ano = trimmed.substr(6,4);
    return ano+"-"+mes+"-"+dia;

}
String.prototype.left = function(len){
    return this.substring(0,len);
}
String.prototype.right = function(len){
    
    var l = this.length;
    if( len >= l ) return this;
    return this.substr(l-len,len);
}

Number.prototype.number_format = function(decimals,decimals_separator,thousands_separator)
{
	var 
        n = parseFloat(this.toFixed(decimals)),
	signal = n < 0 ? '-' : '',
	n = Math.abs(n).toString(),
	Int = n.split('.')[0], // parte inteira
	Dec = n.split('.')[1] || '0', // parte decimal
	ret = '', i,j;
	//Monta parte inteira
	for( i = Int.length -1 ,j = 0; i >= 0 ; i--, j++){
		ret += Int.charAt(i);
		if(!((j+1)%3) && i) ret += thousands_separator;
	}
	ret = ret.reverse();
	//Adiciona zeros a direita
	for(i = Dec.length ; i < decimals; i++) Dec += '0';
	//Adiciona parte decimal
	ret += (decimals_separator + Dec);
	//Concatena sinal ao numero
	return signal + ret;
}

Number.prototype.formatCurrency = function(usePrefix){
    return (usePrefix ? "R$ " : "") + this.number_format(2, ",", ".");
}

Array.prototype.remove = function(idx)
{
    var retorno = new Array();
    for(var i=0 ; i < this.length ; i++)
    {
        if(i != idx) retorno.push(this[i])
    }
    return retorno;
}

function log(){
    if(console){
        for(var i = 0; i < arguments.length ; i++) console.log(arguments[i]);
    }
}


$.extend($.fn,
{
    numeric: function(negative)
    {
        negative = negative !== undefined ? negative : false;
        return this.each(function()
        {
            $(this).keydown(function(e)
            {
                var key = e.charCode || e.keyCode || 0;
                return (
                    key == 8 ||
                    key == 9 ||
                    key == 46 ||
                    key == 116 || // F5
                    (negative && key == 189) ||
                    key == 188 || // ,
                    (key >= 37 && key <= 40) ||
                    (key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105));
            });
        });
    },
    current_date_format: function(o)
    {
        return this.each(function(){
            if(!o) o = {};
            if(!o.mask) o.mask = "99/99/9999";

            var v = $(this).val();

            var data_atual = getData(" / ");
            if(!v.length) $(this).val(data_atual);
            else{
                $(this).val( v.replaceAll(' ','') );
            }
    
            if(o.mask) $(this).mask(o.mask,{placeholder:"  "});

            return $(this);
        });
    },
    block: function(o)
    {
        return this.each(function()
        {
            $(this).keydown(function(e)
            {
                return false;
            });
        });
        
    },
    show_hidden_content: function(o)
    {
        if(!o) o = {};
        if(!o.hidden_elem) o.hidden_elem = $(this).siblings(".hidden");
        $(this).click(function(){
            if($(o.hidden_elem).filter(":hidden").length)
            {
                $(o.hidden_elem).show();
                if(o.begin) o.begin();
            }
            else
            {
                $(o.hidden_elem).hide();
                if(o.end) o.end();
            }
        });
        return $(this);
    },
    validate: function(o)
    {
//        alert(this.length);
//        var retorno =  $(this).each(function(e){
            if(!o) o = {};
            if(!o.erro_class) o.erro_class = "invalid_input";
            if(!o.msg_div) o.msg_div = $(this).siblings(".error_box");
            if(!o.msg) o.msg = "Preencha este campo corretamente."
            if(!o.alert) o.alert = false;
            if(!o.clear) o.clear = true;
            if(!o.clear_event) o.clear_event = "focus";

            if(o.clear)
            {
                $(this).bind(o.clear_event,function(){
                    $(this).removeClass(o.erro_class);
                    if(o.msg_div) o.msg_div.html("");
                });
            }

            if(o.func.call(this,this) == false)
            {
                $(this).addClass(o.erro_class);
                if(o.msg_div) $(o.msg_div).html(o.msg);
                if(o.alert) alert(o.msg);
                return false;
            }
            else
            {
                $(this).removeClass(o.erro_class);
                if(o.msg_div) $(o.msg_div).html("");
                return ($(this).val().length) ? $(this).val() : true;
            }
//        });

//        return retorno.length == 1 ? retorno.val() : retorno ;
    },
    dropdown : function()
    {
        var max_h = 200;
        return this.each(function(){
            var box = $(this).siblings(".drop-box");
            var w = box.siblings(".button").width();
            var p_w = w + 80;
            
            box.slideDown(20,function(){
                /*A width deve ser setada antes da altura, pois aquela influencia esta*/
                if(box.width() < (p_w)) box.width(p_w);
                
                if(box.height() > max_h)
                {
                    box.height(max_h);
                    box.css("overflow-y","scroll");
                }


            }).closeout().find(".drop-item").click(function(){
                    box.fadeOut(0);
            });
        });
    },
    /*
     *Centraliza este elemento na tela
     **/
    center : function()
    {
        $(this).css("position","absolute");
        $(this).css("top", (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop() + "px");
        $(this).css("left", (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft() + "px");
    },
    /*
     * Move este elemento para outro lugar.
     * @param new_parent Destino deste elemento.
     **/
    move : function(new_parent)
    {
        console.log(new_parent);
        var clone = $(this).clone(true,true);
        $(this).remove();
        $(clone).appendTo(new_parent);
    },
    /*
     * Esconde um elemento na tela ao clicar fora dele.
     * @return jQuery jQuery Object
     **/
    closeout : function(o)
    {
        if(!o) o = {};
        if(!o.event) o.event = {};
        
        return this.each(function(){
            var mouse_inside;
            var elem = this;

            $(this).hover(function(){
                mouse_inside=true;
            }, function(){
                mouse_inside=false;
            });


            $("body").mouseup(function(e){
                
                if(!mouse_inside  )
                {
                    $(elem).fadeOut(0,function(){
                        if(o.event.close) o.event.close();
                    });
                    $(this).unbind(e);
                }
            });
        });
    },
    /*
     * Exibe uma mensagem num campo de input caso este esteja vazio
     * @return jQuery jQuery Object
     **/
    placeholder : function(o)
    {
        var defaults =
        {
            msg : "Digite algo",
            css : "placeholder"
        };

        o = $.extend(defaults, o);

        return this.each(function()
        {
            var that = this;
            o.msg = $(this).attr("placeholder") ? $(this).attr("placeholder") : o.msg;
            
            function show()
            {
                if (!$(that).val().length) $(that).val(o.msg).addClass(o.css);
            }
            function clear()
            {
                if (!$(that).val().length || $(that).val() == o.msg ) $(that).val("").removeClass(o.css);
            }

            $(this).blur(function(){
                show();
            }).focus(function(){
                clear();
            });

            show();

            return this;

        });
    },

    ajuda : function()
    {
        return this.each(function(){
            
            if(!$(this).attr("parsed"))
            {
                $(this).attr("parsed",1);
                var title = $(this).attr("tit");
                var pos = $(this).attr("pos").toString();

                $(this).qtip({
                    content : {
                        attr : "tip",
                        title: {
                            text: title,
                            button: 'Fechar'
                        }
                    },
                    show: {
                        event: 'click',
                        solo : true
                    },
                   events: {
                        show: function(event, api) {
                            /*Botao que ativou o tooltip*/
                            var tt = api.elements.target;
                            /*Se esta invisivel, entao nao exibe tooltip*/
                            if($(tt).attr("visible") == 0) event.preventDefault(); // Stop it!
                        }
                    },
                    hide: {
                        event: 'unfocus'
                    },
                    position: {
                          my: pos
                    },
                    style: {
                        classes: 'ui-tooltip-rounded',
                        width: 280
                    }
                });
            }
        });
    } ,
    /**
     * Marca todos os checkbox inputs passados ao clicar em this.
    */
    checkAll : function(inputs){
        return this.each(function(){
           /*Pai*/
           var that = this;
           
           $(this).unbind('click').click(function(){
               var status = this.checked;
               $(inputs).each(function(){
                   /*Esta com o status do pai? Ignora*/
                   if(this.checked == status) return;
                   /*Muda o status do check antes de clicar - Simula clique humano*/
                   this.checked = !this.checked;
                   $(this).click(); /*Apos o clique o status muda novamente*/
                   /*Retorna ao status do clique anterior*/
                   this.checked = !this.checked;
               });
           });
           /*Monitora os inputs para atualizar o pai se precisar*/
           inputs.unbind('click').click(function(){
               var a = false;
               inputs.each(function(){
                   that.checked = this.checked;
                   return that.checked;
               });
           });
        });
    },
    enableButton : function(){
        return this.each(function(){
            return $(this).removeClass("disabled");
        });
    },
    disableButton : function(){
        return this.each(function(){
            return $(this).addClass("disabled");
        });
    },
    isEnabledButton : function(){
        return !$(this).hasClass("disabled");
    },
    isDisabledButton : function(){
        return $(this).hasClass("disabled");
    }
});