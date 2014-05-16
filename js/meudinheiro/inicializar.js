/*Objeto global Meudinheiro*/
window.MD = {};


(function Inicializar(window,MD,$){
    
    
    /*Criando classe estatica*/
    if(!(this instanceof arguments.callee)) return new arguments.callee(window,MD,$);
    
    /*Tornando publico e criando atalho*/
    var fn = MD.Inicializar = this;
    
    /*Auxiliar para controlar as Hashes - Verificar necessidade...*/
    fn.hashes = null;
    
    fn.pagina = function(){
        return fn.hashes.getCurrent();
    };
    
    /*Monitorar o login*/
    (function loginStatusMonitor(){
        var h = setInterval(function(){
            $.post('php/easyme/_update_status_login.php',{a:'nz68besd'},function(r){
                /*Se deu algum erro, para de executar a rotina*/
                r == 1 || clearInterval(h);
            });
        },60 * 1000);
    })();
    
    /* Caso nao tenha conteudo suficiente para dar altura, seta com oo tamnho de 
     * window (inclusive no resize de window)*/
    $(function(){
        function res(){$("#center-panel").css("min-height",$(window).height() - 100);}
        $(window).resize(res);
        res();

        $(".navbar-fixed-top").scrollwatch({
            on : function(){$(this).toggleClass('scrolled',true)},
            off : function(){$(this).toggleClass('scrolled',false)}
        })
        
        var closed = !MD.C.get('Geral.menuOpened');
        
        var titulos = $("#main-menu .qtitle").map(function(){
            return $(this).attr('title');
        }).get();

        $("#main-container,.brand").toggleClass('min-sidebar',closed);
        $("#sidebar-collapse i").toggleClass('icon-chevron-sign-left',!closed);
        $("#sidebar-collapse i").toggleClass('icon-chevron-sign-right',closed);
        $("#sidebar-collapse").click(function(){
            $("#main-container,.brand").toggleClass('min-sidebar');
            $(this).find('i').toggleClass('icon-chevron-sign-left icon-chevron-sign-right');
            closed = !closed;
            MD.C.set('Geral.menuOpened',!closed);
            
            if(!closed){
                $("#main-menu .qtitle").removeClass('qtitle').attr('title','').qtip('destroy',true);
            }else{
                $("#main-menu > li > .link-main-menu").each(function(i){
                    $(this).attr('title',titulos[i]).addClass('qtitle');
                }).qtitle();
            }
            
        });
        
        /*Titulos por qtip*/
        qtitle();
        
        if(!closed) $("#main-menu .qtitle").removeClass('qtitle').attr('title','').qtip('destroy',true);

    });
    
})(window,window.MD,jQuery);


/**
 * Painel lateral do MD
 **/
(function(window,MD,$){
    
    var RightPanel = function(){},
    
    fn = RightPanel.prototype,
    
    MIN_WINDOW_SIZE = 800;
    
    MD.RP = new RightPanel;
    
    var state,
        hoverClass = 'right-panel-toggle-hover';
    
    var panel,
        content,
        center,
        toggle,
        bClose,
        acts,
        config,
        hasShown; //Tem painel para ser exibido
    
    var isStatic = false;
    
    var handler;
    
    var i = 0;
    
    fn.check = function(ehConteudo){
        /*Removendo conteudo anterior*/
        var ant = $("#right-panel .append-right-panel"),
        e = !!ant[0];
        /*Remove painel antigo*/
        if(ehConteudo) ant.remove();
        
        var p = has();
        
        hasShown = !!p;
        /*Tem painel novo*/
        if(p){
            
            isStatic = false;
            ant.remove();
            
            /*Move o conteudo para a direita*/
            $(p).appendTo(content.data('jsp').getContentPane()).show();
            
            if(state == 'FIXED') show();
            else toggle.show();
            
        }else hide();
        
    }
    
    fn.onChangeState = function(){};
    
    var changeState = fn.changeState = function(s){
        /*Soh exibe lateral se tiver conteudo la..*/
        if(!hasShown) return;
        state = s;
        acts.removeClass('active');
        if(s == 'FIXED'){
            show();
            acts.filter('.pin-right-panel').addClass('active');
        }else if(s == 'CLICK'){
            acts.filter('.click-right-panel').addClass('active');
            hide();
        }else if(s == 'HOVER'){
            acts.filter('.hover-right-panel').addClass('active');
            hide();
        }
        bClose.toggle(s != 'FIXED');
        MD.RP.onChangeState && MD.RP.onChangeState(s);
    }
    
    var toggleStatic = fn.toggleStatic = function(toggle){
        isStatic = toggle;
        config.toggle(!toggle);
        if(toggle) show();
        else if(state != 'FIXED') hide();
    }
    
    function has(){
        return $('.append-right-panel')[0] || false;
    }
        
    function show(){
        center.addClass("right-panel-enabled");
        panel.show()
        toggle.hide();
        makeSmall();
    }

    function hide(){
        center.removeClass("right-panel-enabled");
        panel.hide();
        toggle.toggle(!!has() && state != 'FIXED');
    }
    
    var makeSmall = fn.makeSmall = function(){
        if($(window).width() < MIN_WINDOW_SIZE){
            center.removeClass("right-panel-enabled");
            panel.addClass('smallscreen');
        }else{
            panel.removeClass('smallscreen');
            if(panel.is(":visible")){
                center.addClass("right-panel-enabled");
            }
        }
    }
    
    var updateHeight = updateHeight = function(){
        panel.height($(window).height() - $(".navbar-fixed-top").height() - 3);
    }
    
    var updateSize = fn.updateSize = function(){
        makeSmall();
        updateHeight();
    }
    
    /*Eventos da configuracao do painel*/
    $(function(){
        panel = $("#right-panel").addClass('right-panel-collapsed');
        content = $("#right-panel-content");
        center = $("#center-panel");
        toggle = $("#right-panel-toggle");
        bClose = $("#right-panel-close");
        config = $("#right-panel-config");
        
        acts = $('.right-panel-action').click(function(){
            /*Painel fixo*/
            if($(this).hasClass('pin-right-panel')) changeState('FIXED');
            /*Painel abre no clique*/
            else if($(this).hasClass('click-right-panel')) changeState('CLICK');
            /*Painel abre no hover*/
            else if($(this).hasClass('hover-right-panel')) changeState('HOVER');
        });
        
        var a = $('.right-panel-action.active');
        state = a.hasClass('pin-right-panel') ? 'FIXED' : 
                a.hasClass('click-right-panel') ? 'CLICK' : 'HOVER';
        
        bClose.toggle(state != 'FIXED');
        
        var hoverTimer = 0,timeout = 200;
        
        toggle.mouseenter(function(){
            hoverTimer = setTimeout(function(){
                if(state=='HOVER') show();    
            },timeout);
        }).click(show);
        panel.mouseleave(function(){
            hoverTimer = setTimeout(function(){
                if(state=='HOVER' && !isStatic) hide();
            },timeout);
        });
        
        toggle.mouseleave(function(){
            clearInterval(hoverTimer);
        })
        panel.mouseenter(function(){
            clearInterval(hoverTimer);
        })
               
        bClose.click(hide);
        
        updateHeight();
        
        content.height(panel.height() - $("#right-panel-config").height()).jScrollPane();
        setInterval(function(){ content.data('jsp').reinitialise(); },100);
        
        
        $(window).resize(updateSize);
        

        $("#right-panel-config .action-begin").each(function(){
            var canShow = true;
            
            var content = $(this).siblings('.actions-menu').click(function(e){
                api.set('hide.delay',0).hide().set('hide.delay',1000);
                canShow = false;
            }),
            api = $(this).qtip({
                content : { text: content },
                position : {
                    my : 'bottom right',
                    at : 'top center',
                    container : $(this)
                },
                events : {
                    show : function(event,api){
                        if(!canShow){
                            canShow = true;
                            return false;
                        }
                    }
                },
                show: {
                    solo : true,
                    event: 'click mouseenter',
                    delay : 200
                },
                hide : { delay : 200 },
                style: {
                    tip: { corner: false },
                    classes: 'qtip-light qtip-actions-menu'
                }
            }).qtip('api');
        })

    });
    
})(window,window.MD,$);


/*Controle de hashes*/
(function(window,MD,$){
//    
    var HM = MD.HM = function(){
        var fn = this, hash; //Current hash
        function get(){ return MD.Inicializar.hashes.getCurrent(); }
        fn.init = function(){ hash = get(); };
        fn.check = function(){ return hash == get(); };
    };
    
})(window,window.MD,$);


/*
 * Carrega e processa servicos iniciais
 * @returns void
 */
function inicializar()
{
//    animacoes_menus();
    
    integracao_incorporativa();
    
    MD.Inicializar.hashes = HashesMD();
    
    $('.donone').click(function(){return false;})
    
//    inicializar_busca_lancamentos();
    
//    iniciar_lembretes();
    
//    tratar_ajuda_easyme();
    
}


var global_search;
function inicializar_busca_lancamentos()
{
    var botao_busca = $("#button-busca")
    var box_busca = $("#box-busca-lancamentos")
    var box_busca_avancada = $("#box-busca-lancamentos-avancado")
    var fechar_busca = $("#close-search");
    var fechar_busca_avancada = $(".close-advanced-search");
    var busca_avancada = $("#advanced-search");
    
    var words_search = $("#search-words");
    var description_search = $("#search-description");
    var categories_search = $("#search-categories");
    var accounts_search = $("#search-accounts");
    var centers_search = $("#search-centers");
    var contacts_search = $("#search-contacts");
    var forms_search = $("#search-forms");
    var document_search = $("#search-document");
    var value_search = $("#search-value");
    var periodb_search = $("#search-periodb");
    var periode_search = $("#search-periode");
    
    var cabecalho = $("#cabecalho");
    
    var usuario_premium = box_busca_avancada[0];
    
    box_busca.find("input").placeholder();
    
    botao_busca.click(function(){
        box_busca.toggle().find("input").focus();
//        $(this).toggle();
    });
    fechar_busca.click(function(){
//        botao_busca.toggle();
        box_busca.toggle();
    });
    fechar_busca_avancada.click(function(){
        _close_advanced_search();
    })
        
    /*Abrindo campo de busca avancada*/
    busca_avancada.click(function(){
        
        if(usuario_premium){
            _hide_search_bar_buttons();

            box_busca_avancada.show();
        }else{
            jConfirm("Deseja mudar agora para a versão Premium para ter acesso à esta e outras funcionalidades?", "Busca avançada indisponível",function(r){
                if(r)
                {
//                    botao_busca.toggle();
                    box_busca.toggle();
                    tela_escolha_modo();
                }
            },{
                ok : "Sim",
                cancel: "Agora não"
            });
        }
    });
    
    
    var search_bar = box_busca.find("input").keyup(function(e){
        
        /*Copiando resultado para busca avancada*/
        words_search.val(this.value);
            
        var key = e.charCode || e.keyCode || 0;
        var val = $(this).val().trim();

        /*Busca quando apertar enter*/
        if(val.length > 0 && key == 13 ){
            _search(JSON.stringify({words:val.split(/,\s*/)}));
        } 
        
    }).focus(function(){ /*Forca o fechamento do campo de busca avancada caso haja foco aqui*/
        _close_advanced_search();
    });
    
    /*Tratamentos do campo de busca avancado*/
    if(usuario_premium)
    {
        var hoje = get_date("Y-n-j").split("-");
        var ano_mais_um = new Date(parseFloat(hoje[0])+1,parseFloat(hoje[1])-1,hoje[2]);
        var ano_menos_um = new Date(parseFloat(hoje[0])-1,parseFloat(hoje[1])-1,hoje[2]);

        var mindate = periodb_search.attr("mindate").split("-");
        var maxdate = periodb_search.attr("maxdate").split("-");

        periodb_search.calendario({
            minDate : new Date(parseFloat(mindate[0]),parseFloat(mindate[1])-1,mindate[2]),
            maxDate : new Date(parseFloat(maxdate[0]),parseFloat(maxdate[1])-1,maxdate[2])
        });
        periode_search.calendario({
            minDate : new Date(parseFloat(mindate[0]),parseFloat(mindate[1])-1,mindate[2]),
            maxDate : new Date(parseFloat(maxdate[0]),parseFloat(maxdate[1])-1,maxdate[2])
        });


        box_busca_avancada.find("input[type='text']").keyup(function(e){
            var key = e.charCode || e.keyCode || 0;
            if(this.value.length > 0 && key == 13 ) _advanced_search();
        })

        $("#advanced-search-button").click(function(){
            _advanced_search();
        });


        categories_search.tokenInput("php/carregar_categorias_tokeninput.php", {
            theme: "facebook",
            hintText : "Digite uma categoria",
            noResultsText : "Não foram encontradas categorias",
            searchingText : "Buscando categorias..."
        });

        accounts_search.tokenInput("php/carregar_contas_tokeninput.php", {
            theme: "facebook",
            hintText : "Digite uma conta",
            noResultsText : "Não foram encontradas contas",
            searchingText : "Buscando contas..."
        });

        centers_search.tokenInput("php/carregar_centros_tokeninput.php", {
            theme: "facebook",
            hintText : "Digite um centro",
            noResultsText : "Não foram encontrados centros",
            searchingText : "Buscando centros..."
        });

        contacts_search.tokenInput("php/carregar_contatos_tokeninput.php", {
            theme: "facebook",
            hintText : "Digite um contato",
            noResultsText : "Não foram encontrados contatos",
            searchingText : "Buscando contatos..."
        });
        
        forms_search.tokenInput("php/carregar_formaspgto_tokeninput.php", {
            theme: "facebook",
            hintText : "Digite uma forma de pagamento",
            noResultsText : "Não foram encontrados formas de pagto.",
            searchingText : "Buscando formas de pagto..."
        });
    }
    
    function _advanced_search()
    {
        var words = words_search.val().trim().split(/,\s*/);
        var description = description_search.val().trim().split(/,\s*/);
        
        var categories = [] , 
            categories_arr = categories_search.tokenInput("get");
        for(var i = 0 ; i < categories_arr.length ; i++) categories[i] = categories_arr[i].id;
        
        var accounts = [] , 
            accounts_arr = accounts_search.tokenInput("get");
        for(i = 0 ; i < accounts_arr.length ; i++) accounts[i] = accounts_arr[i].id;
        
        var centers = [] , 
            centers_arr = centers_search.tokenInput("get");
        for(i = 0 ; i < centers_arr.length ; i++) centers[i] = centers_arr[i].id;
        
        var contacts = [] , 
            contacts_arr = contacts_search.tokenInput("get");
        for(i = 0 ; i < contacts_arr.length ; i++) contacts[i] = contacts_arr[i].id;
        
        var forms = [] , 
            forms_arr = forms_search.tokenInput("get");
        for(i = 0 ; i < forms_arr.length ; i++) forms[i] = forms_arr[i].id;
        
        var value = value_search.validate({
           msg : "Valor inválido",
           alert : true,
           func: function(input){
                var exp = /^[-]?\d+,?\d{1,2}$/;
                var val = $(input).val().trim();
                return exp.test(val) || val.length == 0;
           }
        });
        
        var document = document_search.val().trim();
        
         var periodb = periodb_search.validate({
            msg : "Data de início inválda",
            alert : true,
            func:function(input){return fun_validaData($(input).val().replaceAll(" ",""))}
        });
        
         var periode = periode_search.validate({
            msg : "Data de fim inválda",
            alert : true,
            func:function(input){return fun_validaData($(input).val().replaceAll(" ",""))}
        });
        
        if(periodb && periode && value)
        {
            periodb = periodb.replaceAll(" ","").formatDateMySql();
            periode = periode.replaceAll(" ","").formatDateMySql();
            
            value = value === true ? "" : value.parseFloat();
            
            if( datecmp(periode,periodb) >= 0)
            {
                
                var val = JSON.stringify({
                    words:words,
                    description: description,
                    categories:categories,
                    accounts : accounts,
                    centers : centers,
                    contacts : contacts,
                    forms : forms,
                    document : document,
                    value : value,
                    periodb : periodb,
                    periode : periode
                });

                box_busca.find("input").val(words_search.val().trim());

                display_loading_gif_ajax($("#conteudo"));
                _close_advanced_search();
                _search(val);
            }
            else
            {
                alert("Data de inicio maior que data de fim.");
            }
        }
        
    }
    
    function _hide_search_bar_buttons()
    {
        fechar_busca.hide();
        busca_avancada.hide();
    }
    
    function _show_search_bar_buttons()
    {
        if(!vertical()) fechar_busca.show();
        busca_avancada.show();
    }
    
    function _close_advanced_search()
    {
        box_busca_avancada.hide();
        if(!vertical()) fechar_busca.show();
        busca_avancada.show();
    }
    
    function _search(data)
    {
        global_search = data;
        
        var conteudo = $("#conteudo");
        display_loading_gif_ajax(conteudo);
        marcar_link_cabecalho();
        ControladorMeuDinheiro("BUSCAR_LANCAMENTOS",data,function(r){
//            search_history[val] = r;
            conteudo.html(r);
        });
    }    
}

function animacoes_menus()
{
    $(".button-alterar-visualizacao").click(function(){
        
        var table = $("#main-table");
        var conteudo = $("#main-table-td-right");
        conteudo.find("#conteudo").html("");
        var td = conteudo.clone();
        $(".sublist").hide();
        
        $("#button-busca").parent().toggle();
        
        $("#box-busca-lancamentos-avancado").hide();
        
        $(this).parent().hide();
        
        if(vertical()){
            conteudo.remove();
            table.append("<tr></tr>");
            table.find("tr:last").append(td);
            table.removeClass("vertical").addClass("horizontal");
            $("#button-alterar-visualizacao-vertical").parent().show();
            $("#box-busca-lancamentos").hide();
            $("#close-search").show();
            $("#ajuda_busca_tooltip").qtip('option','position.my', 'top right');
            
            ControladorConfiguracoes("ALTERNAR_VISUALIZACAO_VERTICAL",0);
        }else{
            table.find("tr:last").remove();
            table.find("tr").append(td);
            table.removeClass("horizontal").addClass("vertical");
            $("#button-alterar-visualizacao-horizontal").parent().show();
            $("#box-busca-lancamentos").show();
            $("#close-search").hide();
            $("#ajuda_busca_tooltip").qtip('option','position.my', 'top left');
            
            ControladorConfiguracoes("ALTERNAR_VISUALIZACAO_VERTICAL",1);
        }
        MD.Inicializar.hashes.reloadCurrentHash();
        //menu_funcionalidades( getAncora() );
    });
        
    $(".link-main-menu").click(function(){
        var link = $(this);
        var l = $(this).siblings(".sublist");
        if(l[0]){
            
            if(l.is(":visible")){
                l.slideUp(400);
            }else{
                l.slideDown(400,function(){
                    if(!vertical())
                        $(this).closeout();
                });
            }
        } 
    });
        
    $("#main-list").sortable({
        delay : 200,
        containment: 'parent' ,
        update : function(){

            var list = $(this);
            var itens = list.children("li");
            var tabs = [];                

            itens.each(function(){
                var main = $(this).children("a").attr("id");

                var sub = $(this).children(".sublist").find("ul li a").map(function(){
                    return this.id;
                }).get().join(',');

                tabs.push({
                    id : main,
                    sub : sub
                });
            });

            ControladorConfiguracoes("SALVAR_ESTADO_ABAS",JSON.stringify(tabs));        
        }
    });
        
    
}

function integracao_incorporativa()
{
    $("#fechar-incorporativa").click(function(){
        $("#box-noticias-incorporativa").hide();
    });
    $("#box-incorporativa").click(function(){
        $("#box-noticias-incorporativa").show();
    });
}