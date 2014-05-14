(function(window,$){
    
    var 
    stack = [],
    JDialogButton = function(jqueryButton){
        var btn = jqueryButton,
            originalText = btn.button('option','label');
        
        this.disable = function(text){ 
            btn.button({
                disabled : true,
                label : text || originalText
            }); 
        };
        this.enable = function(){ 
            btn.button({
                disabled : false,
                label : originalText
            }); 
         };
    },
    /*Construtor*/
    JDialog = function(config){
        
        if( !(this instanceof arguments.callee) ) return new JDialog(config);
        
        var 
        that = this,
        /*Atalho*/
        fn = arguments.callee.prototype,
        /*Este dialog*/
        dialog,
        /*Configuracoes padrao desse dialog*/
        cfg = $.extend(true,{
            autoOpen: false,
            resizable : false,
            dialogClass : ' jdialog modal ' + (config.closeButton === false ? 'no-close' : ''),
            width: 'auto',
            modal: true,
            closeOnEscape : false,
            buttons : {},
            keepCentral : true,
            /*Icone de close*/
            close : function(){
                close.call(that);
            },
            open : function(){
                window.setTimeout(function() {
                    $(document).unbind('mousedown.dialog-overlay mouseup.dialog-overlay')
                }, 100);
                center.call(that);
                $(this).find('.ui-dialog-content').css({
                    'min-height' : 0
                });
            },
            /*Trecho das configuracoes que nao eh do UI*/
            showButtons : true,
            scroll : {
                enabled : false,
                o : '.ui-dialog-content'
            }
        },config);
//
        $.each(cfg.buttons,function(b,fn){
            cfg.buttons[b] = function(){
                var btn = new JDialogButton($(this).siblings(".ui-dialog-buttonpane").find("button:contains('"+b+"')"));
                fn.call(btn);
            };
        });
        
        /*Usado caso config.showButtons seja false*/
        var hiddenButtons = cfg.buttons;

        function _new(){

            var d =  $("<div></div>").appendTo('body');
            
            if(cfg.showButtons === false){
                cfg.buttons = {};
            }
            
            /*Sobreescreve configuracoes*/
            return d.dialog( cfg );
        }
        
        /*Metodos publicos*/
        
        var open = this.open = function(){
            dialog.dialog('open');
            return this;
        };
        
        var close = this.close = function(){
            dialog.remove();
            stack.pop();
            return this;
        };
        
        var html = this.html = function(text){
            dialog.html(text);
            return this;
        };
        
        var center = this.center = function(){
            try{
                dialog.dialog('option', 'position', 'center');
            }catch(err){/*A janela ja pode ter sido fechada..*/}
            
            return this;
        };
        
        this.showButtons = function(){
            try{
                dialog.dialog('option','buttons', hiddenButtons );
                
//                console.log(dialog.closest('.ui-dialog').find('.ui-dialog-buttonset'))
//                dialog.closest('.ui-dialog').find('.ui-dialog-buttonset').addClass('btn-group').find('button').addClass('btn').removeClass('ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only');
                
            }catch(err){/*A janela ja pode ter sido fechada..*/}
            return center.call(this);
        }
        
        /*Criando o dialog*/
        this.dialog = dialog = _new( );
        
        /*Tornando o acesso a ajax publico*/
        this.ajax = config.ajax;
        
        
        stack.push(this);
            
        this.id = stack.length;
        
        if(cfg.scroll.enabled){
            this.scroll = (function(){
                var S = function(){
                    var 
                    /*Atalho*/
                    fn = this,
                    /*Controle de criacao do scroll*/
                    criado = fn.criado = false,
                    /*Objeto destino*/
                    o = function(){
                        return dialog.find(cfg.scroll.o);
                    },
                    /*Inicializa scroll*/
                    /*Atualiza o scroll*/
                    update = fn.update = function(){
                        destroy();
                        
                        if(!fn.criado){
                            /*Atualiza objeto destino do scroll*/
                            /*62% da algura de window*/
                            var 
                            h = o().height(),
                            wh = $(window).height() * .70;
                            /*Popup cabe na tela, nao cria scroll*/
                            if(h >= wh){
                                setHeight(wh);
                                /*Exibe scroll*/
                                o().jScrollPane();

                                fn.criado = true;
                            }
                        }
                        /*Centers dialog*/
                        center();
                    },
                    init = fn.init = update,
                    destroy = function(){   
                        /*Senao esta criado, nao pode chamar metodo abaixo*/
                        if(!fn.criado) return;

                        o().data('jsp').reinitialise();
                        
                        if(!o().data('jsp').getIsScrollableV()){
                            fn.criado = false;
                            /*Soh pode ser chamado caso ja exista*/
                            o().data('jsp').destroy();
                            /*Deve ser colocado apos a destruicao*/
                            setHeight('auto');
                        }
                    },
                    setHeight = function(v){
                        /*Nao deve ser utilizado max-height por causa do IE8*/
                        o().css('height',v);
                    };
                };

                /*Objeto de controle do scroll*/
                return new S;
            })();
        }
        
        /*Setando texto padrao*/
        html(cfg.html);
        
        $(window).resize(function(){ center(); });
    };
    
    
    var _dialog = function(config){
        /*Cria um novo JDialog*/
        return new JDialog(config);
    };
    
    /*Tornando publico*/
    window.jDialog = function(config){
        
        if(!config.html) config.html = "<div style='text-align:center; padding-bottom: 10px;'><img src='visao/img/load.gif' width='20'/></div>";
        
        var d = _dialog(config).open();
        
        /*Executa callback passando o dialog como referencia*/
        config.ajax && config.ajax.call(d.dialog);
        
        return d;
        
    };
    
    window.centerjDialog = function(){
        /*Elimina da pila*/
        var last = stack[stack.length - 1];
        /*Fecha dialog*/
        if(last) last.center();
    }


    /*Rotinas antigas - Depreciadas*/
    
    /*Fecha o ultimo dialog aberto*/
    var pop = window.cancelar_jAjax = function(){
        /*Elimina da pila*/
        var last = stack[stack.length - 1];
        /*Fecha dialog*/
        if(last) last.close();
    };
    
    window.jAlert = function(msg,title,callback,buttons){
        
        var but = {};
        
        buttons = buttons || {};
        buttons.ok = buttons.ok || 'Ok';
        
        but[buttons.ok] = function(){
            pop();
            if(callback) callback();
        };
        return _dialog({
            title   : title,
            buttons : but,
            html    : msg
        }).open();
    };
    
    window.jConfirm = function(msg,title,callback,buttons){
        var but = {};
        
        buttons = buttons || {};
        buttons.ok = buttons.ok || 'Ok';
        buttons.cancel = buttons.cancel || 'Cancelar';
        
        but[buttons.ok] = function(){_exec(true);};
        but[buttons.cancel] = function(){_exec(false);}
        
        function _exec(b){ 
            pop();
            if(callback) callback(b);
        }
        
        return _dialog({
            title   : title,
            buttons : but,
            html    : msg
        }).open();
    };
    
    window.jPrompt = function(msg,value,title,callback,buttons){
        
        var but = {},
            i = $( "<input type='text' class='jinput' value='"+value+"' style='width:300px;'/>");
        
        buttons = buttons || {};
        buttons.ok = buttons.ok || 'Ok';
        buttons.cancel = buttons.cancel || 'Cancelar';
        
        but[buttons.ok] = function(){_exec(i.val());};
        but[buttons.cancel] = function(){_exec(false);}
        
        
        
        function _exec(b){ 
            pop();
            if(callback) callback(b);
        }
        
        var m = !msg ? i : i.wrap("<div>"+msg+"<br></div>").parent();
        
        return _dialog({
            title   : title,
            buttons : but,
            html    : m[0]
        }).open();
    };
    
    window.jAjax = function(title,script,args){
        
        var d = _dialog({
            title : title,
            html : "<div style='text-align:center; padding-bottom: 10px;'><img src='visao/img/load.gif' width='20'/></div>"
        }),
        errort = false,
        timeout = setTimeout(function(){
            d.close();
            jAlert('Por favor, verifique sua conexão com a\n internet e tente novamente.',"Erro inesperado");
            errort = true;
        },30000)
        
        $.post(script,args,function(r){
            /*Ignora retorno da requisicao*/
            if(errort) return;
            /*Evendo ocorreu normalmente*/
            clearInterval(timeout);
            if(!window.valida_sessao_expirada || window.valida_sessao_expirada(r)){
                d.html(r).center();
            }
        }).fail(function(jqXHR){
            if(jqXHR.status == 500) location.href = 'error?e=500'            
        });
        
        return d.open();
        
    };
    
    
    
})(this,jQuery);