(function(window,$){

var iniciar = function(){
    $.post('php/faq/iniciar.php',function(r){
        r = $.parseJSON(r);
        $("#asks,#navbar-ajuda").html('');
        criarListaCategorias(r.cats);
        criarListaPerguntas(r.asks);
        filtros();
    });
}

var resposta = function(id,cb){
    $.post('php/faq/resposta.php',{id:id},function(r){
        cb($.parseJSON(r));
    })
}

function criarListaCategorias(cats){
    var ul = $("#navbar-ajuda");
    $.each(cats,function(){
         ul.append('<li><a class="cat" href="javascript:void(0);" cod="'+this.id+'">'+this.nome+'</a></li>');
    })
}

function criarListaPerguntas(asks){
    var div = $("#asks"),
    regex = /^\s*(&nbsp;)*\s*$/;
    $.each(asks,function(){
         var c = this.c.join(' ');
         div.append('<div class="ask"><div class="ask-header"><a cod="'+this.id+'" cats="'+c+'" href="javascript:void(0);" class="ask">'+this.p+'</a></div></div>');
    });
    $('a.ask').click(function(){
        var ask = $(this).closest('div.ask'),
        id = $(this).attr('cod'),
        loading = $('<img src="img/load.gif" width="20px" class="loading">');
        /*Conteudo esta sendo carregado.. aguarde!!*/
        if(ask.find('.loading')[0]) return;
        if(!ask.find('.answer')[0]){
            $(this).parent().append(loading);
            ask.append('<div class="answer"></div>');
            resposta(id,function(p){
                loading.remove();
                var ans = ask.toggleClass('active').find('.answer').html(p.r);
                ans.find('p,span,a').each(function(){
                    if(regex.test($(this).text())) $(this).remove();
                    $(this).removeAttr('style');
                });
                ans.find('br').remove();
            })
        }else{
            ask.toggleClass('active').find('.answer').toggle();
        }
    })
}

function filtros(){
    var f = $("#searchbar"),
    asks = $('a.ask'),
    _filtrar = function(){
        var v = f.val().toLowerCase(),
        filters = $('.filter').map(function(){
            return parseFloat($(this).attr('cod'));
        }).get();

        asks.each(function(){
            var t = $(this).html().toLowerCase(),
            cats = $.map($(this).attr('cats').split(' '), function(v){
                return parseFloat(v);
            }),
            haveCat = !filters.length ;
            $.each(filters,function(i,v){
                if(haveCat = $.inArray(v, cats) != -1) return false;
            })
            $(this).closest('div.ask').toggle(t.search(v) != -1 && haveCat);
        });
        
        $("#noasks").toggle(!$('div.ask:visible').length);
    },
    _addFilter = function(id,name){
        if($("#filter-"+id)[0]) return;
        var filter = $("<span class='label label-info filter' id='filter-"+id+"' cod='"+id+"'>"+name+"<i class='icon-remove-sign remove-filter' title='Remover este filtro'></i></span>");
        filter.find(".remove-filter").click(function(){
            $(this).closest('.filter').remove();
            _filtrar();
        })
        $("#filters").append(filter);
        $(window).scrollTop(0);

    };
    
    $('.cat').click(function(){
        _addFilter($(this).attr('cod'),$(this).html().trim());
        _filtrar();
    })
    f.keyup(_filtrar);
    f.siblings('button').click(_filtrar);
}

/*Carrega tela inicial*/
$(iniciar);
    
})(window,jQuery);



//
//
//
////$(function(){
//    var link_duvidas = $(".pergunta a");
//    
//    link_duvidas.click(function(){
//        var linha = $(this).closest(".linha-pergunta");
//        var codigo = $(this).attr("cod");
//        var dest = linha.find(".resp-linha-pergunta").show();
//        
//        if(linha.hasClass("enabled"))
//        {
//            linha.removeClass("enabled");
//            dest.hide();
//        }
//        else
//        {
//            linha.addClass("enabled");
//            
//            if(!dest.hasClass("loaded")){
//                exibe_carregando(dest);
//
//                carregar_resposta_duvida(codigo,function(r){
//                    dest.html(r).show().addClass("loaded");
//                });
//            }else{
//                dest.show();
//            }
//        }
//    });
//    
//    faq_busca();
//    
//});
//
//function carregar_resposta_duvida(id,cb){
//    $.post("php/easyme/faq.php",{"id":id},function(r){
//        cb(r);
//    });
//}
//
//function exibe_carregando(dest)
//{
//    var c = "<div style='text-align:center;padding: 5px 0;'><img src='img/load.gif' /></div>";
//    $(dest).html(c);
//}
//
//function faq_busca()
//{
//    var searchable   = $(".searchable"),
//        agrupamentos = $(".agrupamento"),
//        tabela       = $("#tabela-duvidas");
//    
//    var search_field = $("#search-field").keyup(function(){
//        _filter(this.value);
//    });
//    
//    $(".tag").click(function(){
//        var v = $(this).html();
//        _filter(v);
//        search_field.val(v.trim());
//    })
//    
//    function _filter(term)
//    {
//        function __has(search,term){
//            return search.search(term) != -1;
//        }
//        
//        function __highlight(field,term){
//            var v = $(field).html();
//            var search = new RegExp('(^'+term+")|(\\s"+term+")", 'gi');
//            v = v.replace(search," <span class='grifado'>"+term+"</span>");
//            $(field).html(v);
//        }
//        
//        function __clearHighlight(){
//            
//            searchable.each(function(){
//                var v = $(this).html();
//                v = v.replace(new RegExp("<span class=\"*grifado\"*>", 'gi'),"");
//                v = v.replace(new RegExp("</span>", 'gi'),"");
//                $(this).html(v);
//            })
//        }
//        
//        function __hideEmptyGroups(){
//            
//            var all = false;
//            agrupamentos.each(function(){
//                var id = $(this).attr("id");
//                if(!$("."+id+ ":visible")[0])
//                    $(this).hide();
//                else{
//                    $(this).show();
//                    all = true;
//                }
//            });
//            
//            __showNotFound(all);
//        }
//        
//        function __showNotFound(hide)
//        {
//            if(!hide){
//                tabela.hide();
//                $("#notfound").show();
//            }else{
//                tabela.show();
//                $("#notfound").hide();
//            }
//        }
//        
//        function __showAll()
//        {
//            tabela.show();    
//            $(".linha-pergunta").show();
//            agrupamentos.show();
//        }
//        
//        var perguntas = $(".linha-pergunta:visible");
//        
//        tabela.show();
//        
//        __clearHighlight();
//        
//        term = term.trim();
//        if(term.length == 0){
//            return __showAll();
//        } 
//        perguntas.attr("v","");
//        
//        var search = new RegExp('(^'+term+")|(\\s"+term+")", 'gi');
//        
//        searchable.each(function(){
//            var linha = $(this).closest(".linha-pergunta");
//            
//            if(__has($(this).html(),search)){
//                linha.attr("v","1");
//                linha.show();
//                __highlight(this,term);
//            }else{
//                /*Linha ja esta habilitada, ignora*/
//                if(linha.attr("v") == "1") return;
//                linha.hide();
//            }
//        });
//            
//        __hideEmptyGroups();
//    }
//}
