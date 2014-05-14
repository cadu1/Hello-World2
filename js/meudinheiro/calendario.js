(function(window,MD,$){
    
    var 
    /*Regex que verifica uma data no formato aaaa-mm-dd*/
    regData = /^\d{4}-\d{2}-\d{2}$/,
    /*Classe principal*/
    Periodos = function(o){

        if( !(this instanceof arguments.callee) ) return new Periodos( o );
        
        /*Definicoes padrao*/
        var h,
            def,
            config,
            botoes,
            datas,
            desc,
            that=this;
        
        function createElements(){
            h.append(''
            +'<div class="btn-group">'
            +   '<button class="btn btn-small periodb nav-meses"><i class="icon-chevron-left"></i></button>'
            +   '<button class="btn btn-small descPeriodo unique"><span class="nomeMeses"></span></button>'
            +   '<button class="btn btn-small periodf nav-meses"><i class="icon-chevron-right"></i></button>'
            +'</div>'
            +'<div class="btn-group">'
            +   '<button class="btn btn-small perioda"><i class="icon-circle-arrow-down"></i><span style="padding-left:3px;">'+def.text.abutton+'</span></button>'
            +'</div>'
            +'<div class="escolha_periodo">'
            +   '<div style="font-size:12px;font-weight:bold;" class="text-center">'+def.text.escolhaPeriodoTitulo+'</div>'
            +   '<div class="text-center">'
            +       '<select class="escolha_periodo_meses">' + _optionsMeses() +   '</select>'
            +       '<select class="escolha_periodo_ano">' + _optionsAnos() +   '</select>'
            +   '</div>'
            +   '<div class="btn-group" style="display:block;text-align:center;">'
            +       '<button class="btn btn-small botao_escolha_periodo disabled">Ir</button>'
            +       '<button class="btn btn-small botao_fechar_escolha_periodo">Fechar</button>'
            +   '</div>'
            +'</div>'
            );
            
            function _optionsMeses(){
                
                var meses = get_nome_meses(0),
                u = def.config.desc.unico;
                if(!u){
                    var nomes = meses,
                    diaInicio = parseFloat(def.config.datas.ini.substr(8,2));
                    meses = {};
                    for(var i=0, size = nomes.length - 1; i < nomes.length ; i++ ){
                        meses[ appendZero(i+1) + "-" + appendZero(diaInicio) ] = appendZero(diaInicio) + '/' + nomes[i].substr(0,3) + ' - ' +
                                    appendZero((diaInicio - 1)) + '/' + nomes[ i != size ? i+1 : 0 ].substr(0,3);
                    }
                }
                
                var mesDia = def.config.datas.ini.substr(5,5);
                
                return $.map(meses,function(v,i){
                    return '<option value="'+(u ? appendZero(i+1)+'-01' : i)+'" '+( (!u && mesDia == i) || (u && (appendZero(i+1)) == mesDia.substr(0,2))?'selected' : '')+'>'+v+'</option>';
                }).join('');
            }
            function _optionsAnos(){
                var y = def.config.datas.ini.substring(0, 4);
                return $.map(get_array_anos(7,true),function(v,i){
                    return '<option value="'+v+'" '+(v==y?'selected':'')+'>'+v+'</option>';
                }).join('');
            }
        }
        
        /*Carrega os valores padrao quando instancia novo obj*/
        function loadDefaults(){
            
            h = $('.header-calendar');
            var c = $.parseJSON(h.html());
            h.html('').show();
            
            if(!c) return false;
            
            def = {
                config : {
                    h : h ,
                    datas : {
                        base : c.ini,
                        min  : c.min,
                        max  : c.max,
                        ini  : c.ini,
                        fim  : c.fim,
                        intervalo : 'MONTH',
                        frequencia : c.freq || 1
                    },
                    desc : {
                        unico :  c.unico || c.ini.substr(8,2) == '01'
                    }
                },
                text : {
                    abutton : 'Mês atual',
                    escolhaPeriodoTitulo : 'Ir para o mês de'
                },
                exibicao : exibicao,
                exec : function(){alert('Implementar exec');},
                validate : function(){return true;}
            };
            
            /*Sobrescrevendo configuracoes*/
            def = $.extend(true,def, o);
            
            createElements();
            
            def.config.desc.o = h.find(".descPeriodo");
            
            def.config.botoes =  {
                ant : h.find(".periodb"),
                seg : h.find(".periodf"),
                cur : h.find(".perioda"),
                mes : h.find('.escolha_periodo_meses'),
                ano : h.find('.escolha_periodo_ano'),
                esc : h.find('.botao_escolha_periodo'),
                fesc : h.find('.botao_fechar_escolha_periodo')
            };

            /*Atalhos*/
            config = def.config;
            botoes = config.botoes;
            datas  = config.datas;
            desc   = config.desc;

            /*Rotina padrao de exibicao*/
            function exibicao (){
                
                if(!desc.unico){
                    var nomeInicio = datas.ini.right(2) + "/" + get_nome_meses( datas.ini.substr(5,2) ).left(3);
                    var nomeFim    = datas.fim.right(2) + "/" + get_nome_meses( datas.fim.substr(5,2) ).left(3);
                    desc.o.find('.nomeMeses').html(nomeInicio + " até " + nomeFim);
                }else{
                    desc.o.find('.nomeMeses').html(get_nome_meses( datas.ini.substr(5,2) ) + " " +  datas.ini.substr(0,4));
                }
                return true;
            }
        }
                
        /*Cria todos os eventos que serao utilizados*/
        function createEvents(){
            /*Clique no botao anterior*/
            botoes.ant.click(function(){
                if(!$(this).hasClass("disabled")) sub();
            });

            /*Clique no botao de proxima fatura*/
            botoes.seg.click(function(){
                if(!$(this).hasClass("disabled")) add();
            });

            /*Clique no botao de carregar a fatura aberta*/
            botoes.cur.click(function(){
                process( datas.base );
            });

            /*Se esta habilitado a escolha de outro periodo, chama rotina*/
            if( datas.frequencia == 1 ) choose_other();

            function choose_other(){
                /*A caixa para escolha de periodo*/
                var box = h.find('.escolha_periodo');
                /*Funcao que exibe a janela*/
                var _show_box = function(){ box.fadeIn(300); }
                /*Funcao que cria evento especifico para abrir no hover*/
                var _showByEnter = function(){
                    /*Evita que soh de passar rapidamente abra a janela*/
                    var h = setTimeout(_show_box,100);
                    $(this).one('mouseleave',function(){
                        clearInterval(h);
                    });
                }
                /*Funcao que esconde a janela*/
                var _hide_box = function(){
                    box.fadeOut(300,function(){                
                        /*Recadastrando evento para abrir no hover*/
                        desc.o.one('mouseenter',_showByEnter);        
                    });
                }
                /*Funcao que habilita/desabilita botao de busca*/
                var _toggleBotoesBusca = function(){
                    /*Data escolhida nos combos*/
                    var data = botoes.ano.val() + '-' + botoes.mes.val();
                    /*Data original*/
                    var b = data == datas.ini;
                    /*Se houve mudanca de data, habilita, senao, desabilita*/
                    botoes.esc.toggleClass('disabled',b);
                }

                /*Cadastrando evento inicial de hover*/
                desc.o.one('mouseenter',_showByEnter);
                /*Evento para celulares*/
                desc.o.click(_showByEnter);
                /*Cadastrando evento para fechar pelo botao*/
                botoes.fesc.click(_hide_box);
                
                /**
                 * FIREFOX/IE Hack [BEGIN]
                 * Firefox e IE precisam de tratamento especial para o evento
                 * de hover no select
                 */
                var overSelect = false,
                isFocus = false,
                _overSelectFalse = function(){overSelect = isFocus;},
                _overSelectTrue = function(){overSelect = true;},
                _focusTrue = function(){isFocus=true;},
                _focusFalse = function(){isFocus=false;};
                botoes.mes.hover(_overSelectTrue,_overSelectFalse).focus(_focusTrue).blur(_focusFalse);
                /**
                 * FIREFOX/IE Hack [END]
                 */
                
                /*Cadastrando evento para fechar quando o mouse sair...*/
                h.mouseleave(function(){
                    /*Mas soh sai se o botao de buscar periodo estiver desabilitado*/
                    if(botoes.esc.hasClass('disabled') && !overSelect) _hide_box();
                })
                /*Cadastra evendo no botao de mes*/
                botoes.mes.change(_toggleBotoesBusca);
                /*Cadastra evendo no botao de ano*/
                botoes.ano.change(_toggleBotoesBusca);
                /*Cadastra evento no botao de busca*/
                botoes.esc.click(function(){
                    if(!$(this).hasClass('disabled')){
                        $(this).addClass('disabled');
                        _hide_box();
                        process( botoes.ano.val() + '-' + botoes.mes.val() );
                    }
                });
            }
        }

        function add(){
            process( add_date(datas.ini , datas.frequencia , datas.intervalo) );
        }

        function sub(){
            process( sub_date(datas.ini , datas.frequencia , datas.intervalo) );
        }

        function process(data){
            /*Valida esta data*/
            if(!def.validate.call(datas,data)) return;
            /*Seta data do objeto*/
            datas.ini = data;
            /*Proximo (mes-1)*/
            datas.fim = sub_date(add_date(datas.ini , datas.frequencia , datas.intervalo),1,'DAY');
            /*Exibe/esconde botoes*/
            toggleButtons();
            /*Exibicao do usuario*/
            if(def.exibicao.call(config,datas) !== false)
                /*Chama cb do usuario apenas se exibicao retornou diferente de falso*/
                def.exec.call(config,datas.ini,datas.fim);
        }

        function toggleButtons(){
            /*Exibe botao para voltar para mes atual, senao esta nele*/
            botoes.cur.toggle(datas.ini != datas.base);
            /*Desabilita botao para voltar se existe um minimo e ja passou dele*/
            botoes.ant.toggleClass('disabled', (datas.min && datas.min.match(regData) && (datas.ini <= datas.min)) ? true : false );
            /*Desabilita botao para avancar se existe um maximo e ja passou dele*/
            botoes.seg.toggleClass('disabled', (datas.max && datas.max.match(regData) && (datas.ini >= datas.max)) ? true : false );
        }

        function appendZero(n){
            return n < 10 ? '0'+n : n;
        }

        /*Metodos publicos*/

        /*Retorna o inicio do periodo*/
        this.getInicio = function(){return datas.ini;};
        /*Retorna o fim do periodo*/
        this.getFim = function(){return datas.fim;};
        /*Retorna se esta no inicio do periodo*/
        this.periodoAtual = function(){return datas.ini == datas.base;}

        /*Carregando padrao*/
        if( loadDefaults() !== false){
            /*Cria eventos nos botoes*/
            createEvents();
            /*As vezes um botao ja pode estar desabilitado no inicio*/
            toggleButtons();

            //console.log(def);
            def.exibicao.call(config,datas);
        }
    };
    
    /*Expondo*/
    MD.headerPeriodos = Periodos;
    
})(window,window.MD,jQuery);



//(function(window,MD,$){
//    
//    var 
//    /*Regex que verifica uma data no formato aaaa-mm-dd*/
//    regData = /^\d{4}-\d{2}-\d{2}$/,
//    /*Classe principal*/
//    Periodos = function(o){
//
//        if( !(this instanceof arguments.callee) ) return new Periodos( o );
//        
//        /*Definicoes padrao*/
//        var def,config,botoes,datas,desc,that=this;
//        
//        /*Carrega os valores padrao quando instancia novo obj*/
//        function loadDefaults(){
//            var h = $('.table-periodos');
//
//            def = {
//                config : {
//                    h : h ,
//                    datas : {
//                        base : h.attr("ini"),
//                        min  : h.attr("min"),
//                        max  : h.attr("max"),
//                        ini  : h.attr("ini"),
//                        fim  : h.attr("fim"),
//                        intervalo : 'MONTH',
//                        frequencia : 1
//                    },
//                    botoes : {
//                        ant : h.find(".periodb"),
//                        seg : h.find(".periodf"),
//                        cur : h.find(".perioda"),
//                        mes : h.find('.escolha_periodo_meses'),
//                        ano : h.find('.escolha_periodo_ano'),
//                        esc : h.find('.botao_escolha_periodo'),
//                        fesc : h.find('.botao_fechar_escolha_periodo')
//                    },
//                    desc : {
//                        o : h.find(".descPeriodo"),
//                        unico :   h.find(".descPeriodo.unique").length > 0
//                    }
//                },
//                exibicao : exibicao,
//                exec : function(){alert('Implementar exec');},
//                validate : function(){return true;}
//            };
//
//            /*Atalhos*/
//            config = def.config;
//            botoes = config.botoes;
//            datas  = config.datas;
//            desc   = config.desc;
//
//            /*Rotina padrao de exibicao*/
//            function exibicao (){
//                
//                if(!desc.unico){
//                    var nomeInicio = datas.ini.right(2) + "/" + get_nome_meses( datas.ini.substr(5,2) ).left(3);
//                    var nomeFim    = datas.fim.right(2) + "/" + get_nome_meses( datas.fim.substr(5,2) ).left(3);
//                    desc.o.find('.ini').html(nomeInicio);
//                    desc.o.find('.fim').html(nomeFim);
//                }else{
//                    desc.o.find('.nomeMeses').html(get_nome_meses( datas.ini.substr(5,2) ) + " " +  datas.ini.substr(0,4));
//                }
//                return true;
//            }
//        }
//        
//        /*Cria todos os eventos que serao utilizados*/
//        function createEvents(){
//            /*Clique no botao anterior*/
//            botoes.ant.click(function(){
//                if(!$(this).hasClass("disabled")) sub();
//            });
//
//            /*Clique no botao de proxima fatura*/
//            botoes.seg.click(function(){
//                if(!$(this).hasClass("disabled")) add();
//            });
//
//            /*Clique no botao de carregar a fatura aberta*/
//            botoes.cur.click(function(){
//                process( datas.base );
//            });
//
//            /*Se esta habilitado a escolha de outro periodo, chama rotina*/
//            if( true ) choose_other();
//
//            function choose_other(){
//                /*A caixa para escolha de periodo*/
//                var box = desc.o.find('.escolha_periodo');
//                /*Funcao que exibe a janela*/
//                var _show_box = function(){box.fadeIn(300);}
//                /*Funcao que cria evento especifico para abrir no hover*/
//                var _showByEnter = function(){
//                    /*Evita que soh de passar rapidamente abra a janela*/
//                    var h = setTimeout(_show_box,100);
//                    $(this).one('mouseleave',function(){
//                        clearInterval(h);
//                    });
//                }
//                /*Funcao que esconde a janela*/
//                var _hide_box = function(){
//                    box.fadeOut(300,function(){                
//                        /*Recadastrando evento para abrir no hover*/
//                        desc.o.one('mouseenter',_showByEnter);        
//                    });
//                }
//                /*Funcao que habilita/desabilita botao de busca*/
//                var _toggleBotoesBusca = function(){
//                    /*Data escolhida nos combos*/
//                    var data = botoes.ano.val() + '-' + botoes.mes.val();
//                    /*Data original*/
//                    var b = data == datas.ini;
//                    /*Se houve mudanca de data, habilita, senao, desabilita*/
//                    botoes.esc.toggleClass('disabled',b);
//                }
//
//                /*Cadastrando evento inicial de hover*/
//                desc.o.one('mouseenter',_showByEnter);
//                /*Cadastrando evento para fechar pelo botao*/
//                botoes.fesc.click(_hide_box);
//                
//                /**
//                 * FIREFOX/IE Hack [BEGIN]
//                 * Firefox e IE precisam de tratamento especial para o evento
//                 * de hover no select
//                 */
//                var overSelect = false,
//                isFocus = false,
//                _overSelectFalse = function(){overSelect = isFocus;},
//                _overSelectTrue = function(){overSelect = true;},
//                _focusTrue = function(){isFocus=true;},
//                _focusFalse = function(){isFocus=false;};
//                botoes.mes.hover(_overSelectTrue,_overSelectFalse).focus(_focusTrue).blur(_focusFalse);
//                /**
//                 * FIREFOX/IE Hack [END]
//                 */
//                
//                /*Cadastrando evento para fechar quando o mouse sair...*/
//                desc.o.mouseleave(function(){
//                    /*Mas soh sai se o botao de buscar periodo estiver desabilitado*/
//                    if(botoes.esc.hasClass('disabled') && !overSelect) _hide_box();
//                })
//                /*Cadastra evendo no botao de mes*/
//                botoes.mes.change(_toggleBotoesBusca);
//                /*Cadastra evendo no botao de ano*/
//                botoes.ano.change(_toggleBotoesBusca);
//                /*Cadastra evento no botao de busca*/
//                botoes.esc.click(function(){
//                    if(!$(this).hasClass('disabled')){
//                        $(this).addClass('disabled');
//                        _hide_box();
//                        process( botoes.ano.val() + '-' + botoes.mes.val() );
//                    }
//                });
//            }
//        }
//
//        function add(){
//            process( add_date(datas.ini , datas.frequencia , datas.intervalo) );
//        }
//
//        function sub(){
//            process( sub_date(datas.ini , datas.frequencia , datas.intervalo) );
//        }
//
//        function process(data){
//            /*Valida esta data*/
//            if(!def.validate.call(datas,data)) return;
//            /*Seta data do objeto*/
//            datas.ini = data;
//            /*Proximo (mes-1)*/
//            datas.fim = sub_date(add_date(datas.ini , datas.frequencia , datas.intervalo),1,'DAY');
//            /*Exibe/esconde botoes*/
//            toggleButtons();
//            /*Exibicao do usuario*/
//            if(def.exibicao.call(config,datas) !== false)
//                /*Chama cb do usuario apenas se exibicao retornou diferente de falso*/
//                def.exec.call(config,datas.ini,datas.fim);
//        }
//
//        function toggleButtons(){
//            /*Exibe botao para voltar para mes atual, senao esta nele*/
//            botoes.cur.toggle(datas.ini != datas.base);
//            /*Desabilita botao para voltar se existe um minimo e ja passou dele*/
//            botoes.ant.toggleClass('disabled', (datas.min && datas.min.match(regData) && (datas.ini <= datas.min)) ? true : false );
//            /*Desabilita botao para avancar se existe um maximo e ja passou dele*/
//            botoes.seg.toggleClass('disabled', (datas.max && datas.max.match(regData) && (datas.ini >= datas.max)) ? true : false );
//        }
//
//        /*Metodos publicos*/
//
//        /*Retorna o inicio do periodo*/
//        this.getInicio = function(){return datas.ini;};
//        /*Retorna o fim do periodo*/
//        this.getFim = function(){return datas.fim;};
//        /*Retorna se esta no inicio do periodo*/
//        this.periodoAtual = function(){return datas.ini == datas.base;}
//
//        
//        /*Carregando padrao*/
//        loadDefaults();
//        /*Sobrescrevendo configuracoes*/
//        def = $.extend(true,def, o);
//        /*Cria eventos nos botoes*/
//        createEvents();
//        /*As vezes um botao ja pode estar desabilitado no inicio*/
//        toggleButtons();
//        
//        //console.log(def);
//        def.exibicao.call(config,datas);
//    };
//    
//    /*Expondo*/
//    MD.headerPeriodos = Periodos;
//    
//})(window,window.MD,jQuery);
