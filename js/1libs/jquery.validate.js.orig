$.extend($.fn,
{
    validateForm : function(o)
    {
        var table = this;

        var defaults = {
            type : ".validate",
            field : {
                
            }
        };

        o = $.extend(true,defaults,o);

        var fields = $(table).find(o.type);
        
        var valid = true;
        
        fields.each(function(){
            
            var field = $(this);
            /*Tipo deste campo*/
            var type = field.attr("eval");
            /*Sobreescreve o tipo padrao caso esteja setado*/
            if(type) o.field.type = type;
            
            var r = field.validateField(o.field);
            
            valid = !valid ? valid : r;            
        });
             
        return valid;
    },
    
    
    validateField : function(o){
        
        var input = $(this);

        var defaults = {
            type : "text",
            errorClass :  "invalid_input",
            msgDest : input.siblings(".error_box"),
            msg : "Preencha este campo corretamente.",
            alert : false,
            onFocusClear : true,
            placeHolder : true,
            eval : function(){
//                alert($(this).html())
                switch(this.type)
                {
                    case "text":
//                    {
//                        return input.val().strlen > 0;     
//                    } 
                    case "date":
//                    {
//                        return input.val().strlen > 0;     
//                    } 
                    case "phone":
                    {
                        return input.val().length > 0;     
                    } 
                    case "mail":
                    {
                        var expEmail = /^[\w!#$%&'*+\/=?^`{|}~-]+(\.[\w!#$%&'*+\/=?^`{|}~-]+)*@(([\w-]+\.)+[A-Za-z]{2,6}|\[\d{1,3}(\.\d{1,3}){3}\])$/;
                        return expEmail.test(input.val());
                    } 
                    case "url":
                    {
                        var expUrl = /^(http(s)?:\/\/)?(((www)\.){1}|(\w+(\.|\-){1})){1}((\w)|(\.))+((\w)*|([_%:~?=!+\#(),&.\-\/]))+$/;
                        return expUrl.test(input.val()); 
                    } 
                }
            },
            events : {
                
            }
        };
        
        o = $.extend(true,defaults,o);
        
        function clearError()
        {
            input.removeClass(o.errorClass);
            if(o.msgDiv) o.msgDiv.html("");
            return true;
        }
        
        function displayError()
        {
            input.addClass(o.errorClass);
            if(o.msgDiv) $(o.msgDiv).html(o.msg);
            if(o.alert) alert(o.msg);
            return false;
        }
        
        /*Eh para limpar no focus? Entao limpa*/
        if(o.onFocusClear) input.unbind("focus").focus(clearError);
        
        /*O campo utiliza algum placeHolder ? */
        if(o.placeHolder && input.attr("ph")) input.placeholder({css:"place_holder"});
        
        /*Verifica se o campo eh valido*/
        if( o.eval(input) == false) return displayError()
        else return clearError();
        
        return this;
        
    }
    
});