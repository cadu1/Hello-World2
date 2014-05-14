(function($){
    
    var trim = /^\s+|\s+$/gi;
    
    function AutoCompleteSelect(o,c){
        /*jquerying..*/
        o = $(o);
        
        var 
        input = $("<input type='text' class='autocompleteselect-input cad-input-text autocomplete-input'/>").
            insertAfter( o.hide() ).attr('tabindex',o.attr('tabindex')),
        cfg = $.extend(true,{
            addnew : {
                link : $(o).siblings('.link-add'),
                action : function(){}
            }
        },c);
        
        
        if($(cfg.addnew.link)[0]){
            $(cfg.addnew.link).click(function(){
                cfg.addnew.action(function(item,cb){
                    var novo = $("<option value='"+item.value+"'>"+item.label+"</option>"),
                        incluiu = false;
                    o.find('option').each(function(e){
                        /*Se a primeira opcao for um 'Nenhum', continue*/
                        if(!e && !this.value) return;
                        var n = $(this).text().replace(trim,'');
                        if(n >= item.label){
                            novo.insertBefore(this);
                            incluiu = true;
                            return false; //Breaks the loop
                        } 
                    });
                    /*Tera que ser incluido no fim da lista*/
                    if(!incluiu) o.append(novo);
                    /*Seleciona opcao recem incluida*/
                    o.val(item.value).change();
                    
                    /*Monta o autocomplete de novo*/
                    input.autocomplete('option','source',_source());
                    
                    cb && cb();
                 });
            });
        }
        
        
        /*Seta o autocomplete com o valor corrente do select*/
        var _setSelected = function(){ input.val(o.find('option:selected').text().replace(trim,'')); }
        /*Caso haja alguma mudanca do valor do select via JS, muda o autocomplete*/
        o.change(function(){
            _setSelected();
            /*Monta o autocomplete de novo*/
            input.autocomplete('option','source',_source());
        });

        
        function _create(){
            /*Cria o autocomplete*/
            input.autocomplete({
                minLength: 0,
                source : _source(),
                focus: function( event, ui ) { return false; },
                select: function( event, ui ) {
                    $(input).val(ui.item.label);
                    o.val(ui.item.value).change();
                    return false;
                }
            }).click(function(){
                if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
                    input.autocomplete( "close" );
                    return;
                }
                input.autocomplete( "search", "" ).focus();
            }).bind('keyup blur alert focus',function(){
                /*Removendo acessibilidade (atrapalha scrollPanel)*/
                $('.ui-helper-hidden-accessible').remove();
            }).blur(_setSelected)
            .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
                return  $( "<li></li>" ).data( "item.autocomplete", item ).
                append( "<a>" + item.label + "</a>").appendTo( ul );
            };
            /*Inicializa campo autocomplete*/
            _setSelected();
        }
        
        function _source(){
            return o.find('option').map(function(){
                return {
                    /*Texto da option*/
                    label : $(this).text().replace(trim,''),
                    /*Valor da option*/
                    value : $(this).val()
                };
            }).get();
        }
        
        /*Dados publicos*/
        this.input = input;
        
        _create();
    }
    
    /*Tornando metodo de jQuery tambem*/
    $.fn.autocompleteselect = function(c){
        return this.each(function(){
            /*Salvando informacoes na data do select*/
            $(this).data( 'acs' , new AutoCompleteSelect( this,c ) );
        })
    };
    
    
})(jQuery);