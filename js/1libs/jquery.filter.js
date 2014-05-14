(function(window,$){
    
var 
TableFilter = window.TableFilter = function( o , c){
    
    var 
    fn = this,
    cfg = $.extend(true,{
        trigger : $('.filter-trigger'),
        /*Caminho para o manager deste filtro*/
        manager : $('.filter-manager'),
        /*Destino dos filtros ativos*/
        activeDest :  $('.active-filters'),
        /*Titulo de remocao do filtro*/
        removeTitle :  'Remover este filtro',
        /*Titulo de remocao do filtro*/
        removeGroupTitle :  'Remover todos os filtros deste tipo',
        ajax : false,
        /*Filtros para pre-inicializar o filtro*/
        activeFilters :  null,
        filterClass : 'filtered',
        rowClass : 'tr', // Looks for tr
        visible : false, //Os filtros estao abertos por padrao?
        events : {
            /*Os filtros sao exibidos*/
            show : function() { },
            /*Os filtros sao escondidos*/
            hide : function() { },
            /*Toda vez que eh filtrado alguma coisa*/
            update : function(){  },
            /*Clique no botao de salvar filtros*/
            save : function(){  },
            /*Recupera filtros para o estado inicial*/
            restore : function(){ 
                loadFilters(cfg.activeFilters);    
            },
            /*Nao tem nenhum resultado para exibir..*/
            empty : function(){
                $(o).siblings('.filter-empty').remove()
                $(o).hide().after("<h2 class=' text-center filter-empty'>Sem resultados para os filtros escolhidos</h2>");
            },
            /*Tem Algum resultado para exibir..*/
            nempty : function(){
                $(o).show().siblings('.filter-empty').remove();
            }
        }
        
    },c),
    /*Lista de filtros disponiveis*/
    filters = $(cfg.manager).find('.filter-list a'),
    /*Grupos de filtros ativos*/
    activeGroups = {},
    activeGroupsLen = 0,
    /*Grupos de filtros*/
    groups = {},
    rows = [],
    Filter = function(pdom, pval, plabel){
        var 
        val = this.val = pdom ? $(pdom).attr('filter-value') : pval,
        label = this.label = pdom ? $(pdom).text() : plabel,
        dom = this.dom = $("<span class='label label-info active-filter' "+
                    " filter-value='"+val+"'>"+label+"<i class='icon-remove-sign"+
                    " filter-remove' title='"+cfg.removeTitle+"'><i/></span>"),
        /*Linhas associadas a este filtro*/
        rows = this.rows = [];
        
        this.remove = function(){ dom.remove(); }
        
    },
    Group = function(dom){
        
        var 
        type = this.type = $(dom).attr('filter-type'),
        label = this.label = $(dom).find('.filter-label').text(),
        /*Filtros desse grupo*/
        filters = {},
        /*Filtros ativos desse grupo*/
        afilters = {},
        /*Filtros inativos desse grupo*/
        ifilters = {},
        /*Quantidade de filtros ativos*/
        length = 0,
        /*Checkbox de filtro inverso*/
        inverse = $(dom).find('.filter-inverse input'),
        /*Checkbox de filtro xor*/
        xor = $(dom).find('.filter-xor input'),
        /*Destino de exibicao desse grupo*/
        dest = $("<div class='active-filter-group'><div class='active-filter-group-label'><span class='filter-group-inverse-label'>(inv)</span><span class='label'>"+label+"<i class='icon-remove-sign"+
                    " filter-remove group-remove' title='"+cfg.removeGroupTitle+"'><i/></span></div><div class='active-filter-group-list'></div></div"),
        /*Destino da lista de exibicao desse grupo*/
        destList = dest.find('.active-filter-group-list'),
        destInvLabel = dest.find('.filter-group-inverse-label'),
        /*Habilita um filtro deste grupo*/
        on = this.on = function(val,dontFilter){
            var f = filters[val];
            
            if(!afilters[val] && f){
                
                if(xor.is(':checked')) offAll(true);
                
                /*Exibindo display*/
                dest.show();
                destInvLabel.toggle( inverse.is(":checked") );
                destList.append( f.dom.css('display','inline-block') );
                /*Referencia filtro ativo*/
                afilters[val] = f;
                /*Desliga filtro inativo*/
                delete ifilters[val];
                length++;
                f.dom.find('.filter-remove').click(function(){ off(f.val); });
                
                /*Ativando grupo*/
                if(!activeGroups[type]){
                    activeGroups[type] = this;
                    activeGroupsLen++;
                }
                
                /*Filtra tela*/
                if(!dontFilter) filter();
            }
        
        },
        /*Desabilita um filtro deste grupo*/
        off = this.off = function(val,noFilter){
            /*Marcando filtro como inativo*/
            ifilters[val] = filters[val];
            /*Remove filtro ativo*/
            afilters[val].remove();
            delete afilters[val];
            
            if(!--length){
                /*Apaga grupo da tela se nao tem mais elementos*/
                dest.toggle(false);
                /*Ativando grupo*/
                delete activeGroups[type];
                activeGroupsLen--;
            }
            /*Filtra tela novamente*/
            if(!noFilter) filter();
        },
        update = this.update = function(){
            destInvLabel.toggle( inverse.is(":checked") );
            /*Filtra tela*/
            filter();
        },
        associateRow = this.associateRow = function(val,row){
            if(filters[val])
                filters[val].rows.push(row);
        },
        offAll = this.offAll = function(noFilter){
            $.each(afilters,function(){ off(this.val,noFilter); });
        },
        getConfig = this.getConfig = function(){
            return {
                inverse : inverse.is(":checked"),
                xor : xor.is(":checked")
            };
        },
        setConfig = this.setConfig = function(cfg){
            inverse.prop('checked',cfg.inverse);
            xor.prop('checked',cfg.xor);
        };
        
        this.isOn = function(){ return !!length; }
        
        this.getActiveFiltersRows = function(){
            /*Eh para filtra inversamente ?*/
            var inv = inverse.is(":checked"),
                ar =  !inv ? afilters : ifilters;
            var rows = $.map(ar,function(filter){
                return filter.rows;
            });
            if(inv){
                rows = $.grep(rows,function(row){
                    /*Se linha nao possui um array de filtros para um determinado tipo,
                     * entao nao preciso nem procurar..*/
                    if(typeof row.types[type] != 'object') return true;
                    var found = false;
                    $.each(afilters,function(filter_id){
                        found = $.inArray(filter_id,row.types[type]) !== -1;
                        if(found) return false;
                    });
                    return !found;
                });
            }
            return rows;
        };
        
        this.getActiveFilters = function(checkInverse){
            if(checkInverse) return !inverse.is(":checked") ? afilters : ifilters;
            return  afilters ;
        };
        
        filters[0] = new Filter(null,0,"Sem " + label);
        $(dom).find('.filter-list li a').each(function(){
            var f = new Filter(this);
            filters[f.val] = f;
            ifilters[f.val] = f;
        });
        
        /*Cria espaco para exibicao do grupo*/
        $(cfg.activeDest).append(dest);
        
        dest.find('.group-remove').click(function(){
            offAll();
        });
        
    },
    Row = function( dom ){
        
        var 
        /*DOM da linha*/
        tr = this.dom = $(dom).closest(cfg.rowClass),
        /*Os filtros que esta linha atende*/
        types = this.types = $.parseJSON( $(dom).text() );
        this.toggle = function(toggle){ tr.toggle(toggle).toggleClass(cfg.filterClass,!toggle); };
        
        this.isOn = function(){return tr.is(':visible');};
        
        $(dom).remove();
    };
    
    
    function addFilter(type,val){
        /*Ativa filtro no grupo respectivo*/
        groups[type].on(val);
    }
    
    function filter(){
        
        if(!cfg.ajax){
            /*Linhas ativas*/
            var arows = array_intersect.apply(this,$.map(groups,function(g){
                if(g.isOn()) return [g.getActiveFiltersRows()];
            }));

            if(!arows.length && activeGroupsLen) cfg.events.empty();
            else cfg.events.nempty();
            
            /*Exibe todas as linha senao houver nenhum filtro ativo*/
            $.each(rows,function(){ this.toggle( !activeGroupsLen ); });
            /*Exibe as linhas ativas*/
            $.each(arows,function(){ this.toggle(true); });
        }
        
//        var counter = activeGroupsLen > 0 ? 'Filtros ativos ('+activeGroupsLen+')' : 'Filtros';
        var counter = activeGroupsLen > 0 ? '('+activeGroupsLen+')' : '';
        $('.filter-counter').html(counter);
        
        eventUpdate();
//        cfg.events.update.call(fn,activeGroups);
    }
    
    function eventUpdate(){
        cfg.events.update.call(fn,activeGroups);
    }
    
 
    function array_intersect(a) {
        /*Caso base*/
        if(!a ||arguments.length == 1) return a || [];
        /*Array sem o primeiro elemento*/
        var sub = Array.prototype.slice.call(arguments);
        /*Remove o primeiro elemento*/
        sub.shift();
        return $.map(a,function(av){
            return $.inArray(av,  array_intersect.apply(this, sub) ) != -1 ? av : undefined;
        });
    }
    
    this.getRows = function(){
        return rows;
    }
    
    this.encode = function(){
        var json = {};
        $.each(groups,function(i,g){
            json[this.type] = {
              af  : $.map(this.getActiveFilters(),function(f){ return f.val; }),
              cfg : this.getConfig()
            };
        });
        return json;
    };
    
    var loadFilters = this.loadFilters = function(jsonFilters){
        if(jsonFilters){
            $.each(jsonFilters,function(type,filters){
                /*Pode haver um filtro salvo de um grupo inexistente(removido)*/
                if(groups[type]){
                    var af = filters.af,
                        cfg = filters.cfg;
                    if(cfg){
                        groups[type].setConfig(cfg);
                    }
                    if(af){
                        $.each(af,function(i,f){
                            groups[type].on(f,true);
                        });
                    }
                }
            });
        }
        filter();
    };
    
    var clear = this.clear = function(){
        $.each(activeGroups,function(i,g){ g.offAll() });
    };
    
    var update = this.update = function(){
        delete rows;
        rows = [];
        /*Se a filtragem acontece via ajax, nao preciso me preocupar em varrer linhas*/
        if(!cfg.ajax){
            /*Lendo todas as linhas*/
            $(o).find('.filter-data').each(function(){
                /*Cria nova linha*/
                var r = new Row( this );
                /*Para cada tipo encontrado, associa o respectivo grupo*/
                $.each(r.types,function(i,v){
                    /*Linha atente a uma lista de tipos*/
                    if(typeof v == 'object' && v != null){
                        $.each(v,function(){
                            groups[i] && groups[i].associateRow(this,r);
                        });
                    }else
                        /*A linha pode fazer referencia a um grupo que nao foi criado nos filtros*/
                        groups[i] && groups[i].associateRow(v,r);
                });
                rows.push(r);
            });
        }
        filter();
    }
    
    /*Criando os grupos de filtros*/
    $(cfg.manager).find(".filter-button").each(function(){
        var g = new Group(this);
        groups[g.type] = g;
    });
    
    /*Clique na opcao*/
    filters.off('click').click(function(){
        var 
        /*Tipo do filtro*/
        type = $(this).closest('.filter-button').attr('filter-type'),
        /*Valor do filtro*/
        val = $(this).attr('filter-value');
        /*Adiciona o filtro na lista de filtros ativos*/
        addFilter(type,val);
    });
    
    $(cfg.manager).find('.filter-list .filter-inverse input').off('click').click(function(){
        var type = $(this).closest('.filter-button').attr('filter-type');
        groups[type].update();
    });
    
    $(cfg.manager).find('.filter-list .filter-xor input').off('click').click(function(){
        eventUpdate();
    });
    
    $(cfg.trigger).off('click').click(function(){
        var visible = $(cfg.manager).toggle().is(':visible');
        if(visible) cfg.events.show();
        else cfg.events.hide();
        $(this).find('.icon-caret-down,.icon-caret-up').toggleClass('icon-caret-down icon-caret-up');
    });
    
    $(cfg.manager).find('.filter-save').off('click').click(function(){
        cfg.events.save.call(fn);
    });
    
    $(cfg.manager).find('.filter-clear').off('click').click(clear);
    
    $(cfg.manager).find('.filter-restore').off('click').click(function(){
        cfg.events.restore.call(fn);
    });
    
    cfg.manager.toggle(cfg.visible);
    cfg.trigger.find('i:last').toggleClass('icon-caret-down',!cfg.visible).toggleClass('icon-caret-up',cfg.visible);

    loadFilters(cfg.activeFilters);
};

})(window,jQuery);

