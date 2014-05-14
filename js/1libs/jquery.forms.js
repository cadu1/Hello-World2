(function(window,$){
    
    var 
    /*Este formulario*/
    form,
    /*Campos do formulario (Associativo com o 'name')*/
    fields = {},
    config = {
        action : 'null',
        method : 'POST',
        prevent : true,
        tips : {
            enabled : true,
            config : function(text){
                return {
                    content: {
                        text : text,
                        title:{
                            text: ""
                        }
                    },
                    position: {
                        my : "left top",
                        at : "right center"
                    },
                    style: {
                        classes: 'qtip-dark',
                        width: 200,
                        'left' : '200px;'
                    },
                    show : {
                        solo: true,
                        event : 'focus'
                    },
                    hide: {
                        fixed: true,
                        event : 'blur'
                    }
                }
            }
        },
        error : {
            msg : 'Preencha este campo corretamente',
            inputClass : 'invalid-input',
            msgClass : 'error-msg',
            type : {
                notempty : {
                    msg : 'Este campo não pode estar em branco'
                },
                email : {
                    msg : 'Preencha o campo com um email válido'
                },
                numeric : {
                    msg : 'Apenas números são permitidos'
                },
                equals : {
                    msg : 'Os campos devem ser iguais'
                },
                notfirst : {
                    msg : 'Escolha uma das opções da lista'
                },
                onechecked : {
                    msg : 'Escolha uma das opções'
                },
                cpf : {
                    msg : 'O número de CPF informado é inválido'
                },
                cnpj : {
                    msg : 'O número de CNPJ informado é inválido'
                }
            }
        },
        events : {
            submit : function(){
                
                if(!evalAll()){
                    alert('Por favor, preencha os campos marcados corretamente.');
                    return false;
                }
                return true;
            }
        }
    };
    
    var jForm = function(o,c){
        
        if(!(this instanceof arguments.callee)) return new jForm(o,c);
        
        /*Referencia para a classe*/
        form = o;
        /*Alterando configuracoes basicas*/
        config = $.extend(config,c);
        /*Inicia*/
        init();
    };
    
    var fn = jForm.prototype;
    
    var bind = function(){
        
        var f = $(this),
            evals = f.attr('jform');
        
        f.blur(function(){
            eval.call(this);
        }).bind('focus click',function(){
            error.call(this,'',true);
            
        });       
        
        
        if(config.tips.enabled){
            var t = f.attr('jformtip');
            if(t) f.qtip(config.tips.config(t));
        }
        
        
        /*Se o campo eh numerico, nao deixa digitar outra coisa*/
        if(evals && evals.search('numeric') != -1){
            f.keydown(function(e){
                var key = e.charCode || e.keyCode || 0;
                return  key == 8 || key == 9 || key == 46 || key == 116 ||
                        key == 188 || (key >= 37 && key <= 40) ||
                    (key >= 48 && key <= 57) || (key >= 96 && key <= 105);
            });
        }
        
    };
    
    /*Verifica a validade de um campo*/
    var eval = function(){
        
        var 
        f = this,
        evals = $(f).attr('jform'),
        _error = function(){
            error.apply(f,Array.prototype.slice.call(arguments,0));
        },
        _hasEval = function(e){
            
//            var r = new RegExp('\\W' + e + '\\W' );
            
            return evals.search(e) != -1;
        }
        
        /*Se nao tem nada para tratar, nao coloca nada*/
        if(!evals || $(f).is(':hidden')) return true;
        
        /*Valida campos vazios*/
        if(_hasEval('notempty'))
            if($(this).val().trim() == '')
                return _error('notempty');
        
        /*Valida campos de emails*/
        if(_hasEval('email'))
            if(!$(this).val().trim().match(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/))
                return _error('email');
        
        
        /*Valida campos de confirmacao*/
        if(_hasEval('equals')){
            var eq = evals.match(/equals\(.*\)/)[0].replace(/^equals\(|\)$/g,'');
            if($(fields[eq]).val().trim() != $(this).val().trim())
                return _error('equals');
        }
        
        /*Valida selects*/
        if(_hasEval('notfirst')){
            if($(this).val() == $(this).find('option')[0].value)
                return _error('notfirst');
        }
        
        /*Valida radioboxes*/
        if(_hasEval('onechecked')){
            var n = $(this).attr('name'),
                c = false;
            $(fields[n]).each(function(){
                /*Se possui um checado, sai do loop*/
                if(c = this.checked) return false;
            });
            if(!c) return _error('onechecked');
        }
        
        /*Valida cpf*/
        if(_hasEval('cpf')){
            if($(f).val().trim().length > 0)
                if(window.isCpf && !isCpf($(f).val())) 
                    return _error('cpf');
        }
        
        /*Valida cnpj*/
        if(_hasEval('cnpj')){
            if($(f).val().trim().length > 0)
                if(window.isCnpj && !isCnpj($(f).val())) 
                    return _error('cnpj');
        }
        
        /*Valida tamanhos*/
        var m;
        if( m = $(f).attr('jformminlength') ){
            if($(f).val().length < m)
               return _error('',false,'O campo deve possuir no mínimo ' + m + ' caracteres');
                
        }
        
        return true;
        
    }
    
    var error = fn.error = function(type,unset,msg){
        var f = $(this),
            e = config.error;
        /*Coloca classe de erro no campo*/
        f.toggleClass(e.inputClass,!unset);
        
        /*Exibe mensagem de erro*/
        if(!unset){
            /*Ja existe um erro cadastrado*/
            if(f.siblings('.' + e.msgClass)[0]) return false;
            msg = msg || (e.type[type] ? e.type[type].msg : e.msg);
            f.parent().append('<span class="'+e.msgClass+'">'+msg+'</span>');
        } 
        /*Remove mensagem de erro*/
        else f.siblings('span').remove();
        
        return unset;
    };
    
    
    var evalAll = fn.evalAll = function(){
        var ok = true;
        $.each(fields,function(){
            if(!eval.call(this)) ok = false;
        });
        return ok;
    };
    
    fn.getPost = function(){
        var post = {};
        $.each( fields , function(){
            var name = $(this).attr('name');
            /*Algum problema com este nome*/
            if(!name) return;
            /*Removendo espacos extras*/
            name = name.trim();
            /*Valor de retorno*/
            var v;
            /*Primeiro elemento da lista*/
            var f = $(this[0]);
            /*Se estiver analisando um radio, pega o valor marcado*/
            if(f.is('input[type="radio"]'))
                v = $(this).filter(':checked').val();
            /*Se tiver analisando um checkbox, retorna 1 ou 0*/
            else if(f.is('input[type="checkbox"]'))
                v = $(this).is(':checked') ? 1 : 0;
            /*Senao, pega o valor do campo mesmo*/
            else v = $(this).val();
            /*Armazena*/
            post[ name ] = v;
        });
        return post;
    }; 
        
    function init(){
        /*Adiciona classe ao formulario*/
        form.addClass('jquery-form');
        /*Referencia aos campos*/
        form.find('input,select,button').each(function(){
            var i = this.name;
            /*Se nao existe, cria array*/
            if( fields[i] === undefined ) fields[i] = [this];
            /*Se ja existe, incrementa array*/
            else fields[i].push(this); 
            
            bind.call( this );
        });
        
        
        if(config.prevent) form.submit(function(){return false;});
        
        /*Submit deste formulario*/
        form.one('submit',function s(){
            /*Se deu pau no formulario, recadastra evento*/
            if(config.events.submit.call(form,s) === false)
                form.one('submit',s);
        });
        
        /*Expoe campos*/
        fn.fields = fields;
        
        /*Expoe configuracao*/
        fn.config = config;
    }
        
    /*Extends jQuery*/
    $.fn.form = function(c){
        return this.each(function(){
            /*Guarda referencia para em jForm*/
            $(this).data('jForm' , jForm( $(this) ,c) );
        });
    }
    
    
    
    String.prototype.trim = function()
    {
        return this.replace(/^\s+|\s+$/g, "");
    }
    
})(window,jQuery);