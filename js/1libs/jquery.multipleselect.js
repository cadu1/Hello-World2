(function(window,$){
    
    var 
    MS = function( o , c ){
        var 
        /*Elemento select na tela*/
        obj = $(o),
        /*Configuracoes padrao*/
        config = $.extend(true,{
            dest : null,
            style : '',
            items : [],
            createItem : function(value,name){
              
                var choosen = $("<span class='multiple-select-item-choosen label label-important' style='margin: 0 2px;' value='"+value+"'></span>");
                var choosenName = $("<span class='multiple-select-item-choosen-name' style='padding-right:3px;'>"+name+"</span>").appendTo(choosen);
                var choosenDel = $("<i class='icon-remove-sign multiple-select-item-choosen-del'></i>").appendTo(choosen);
                
                return choosen;
              
            },
            events : {
                beforeSelect : function(value){/*Chamada antes de escolher uma opcao*/ return true;},
                select : function(value){/*Chamada quando escolhida uma opcao*/ return true;},
                unselect : function(value){/*Chamada quando removida uma opcao*/ return true;},
                remove : function(value){/*Chamada apos removida uma opcao*/ return true;}
            }
        },c),
        /*Atalho*/
        fn = this,
        /*Lista de escolhidos para que nao haja repeticao*/
        push_stack = {};
        
        function init(){
            
            /*Convertendo destino*/
            config.dest = $('<span class="multipleselect-dest"></span>')[0];
            
            obj.parent().append(config.dest);
            
            /*Preload items*/
            $.each(config.items,function(){
                push(this.value,this.name);
            });
            
            obj.change(function(){
                var 
                /*valor do select*/
                value = this.value,
                /*nome da opcao*/
                name = $(this).find('option:selected').html().trim();
                
                if(!config.events.beforeSelect.call(o,value)) return false;
                /*Exibe*/
                push(value,name);
                /*Setando a primeira opcao novamente*/
                this.value = 0;
            });
        }
        
        var push = fn.push = function(value,name){
            /*Ja esta sendo exibido? Nao exibe de novo*/
            if(value == 0 || push_stack[value] !== undefined) return false;

            var item = config.createItem.call(o,value,name);
            /*Nao foi criado nenhum item*/
            if(!item) return false;
            item.find('.multiple-select-item-choosen-del').on('click',function(){
                return config.events.unselect.call(o,value) ? remove(value) : false;
            });
            /*Coloca na tela*/
            obj.siblings(config.dest).append(item);
            /*Ok, ja foi exibido*/
            push_stack[value] = item;
            
            config.events.select.call(o,value);
            return true;
        }
        
        
        
        var remove = fn.remove = function(value){
            push_stack[value].remove();
            delete push_stack[value];
            config.events.remove();
            return true;
        }
        
        /*Retorna todos os valores selecionados*/
        this.getValues = function(){
            return $.map(push_stack,function(v,key){
                return key;
            });
        }
        
        /*Inicia*/
        init();
    };    
    
    /*Tornando metodo de jQuery tambem*/
    $.fn.multipleSelect = function(c){
        return this.each(function(){
            /*Salvando informacoes na data do select*/
            $(this).data( 'multipleSelect' , new MS( this,c ) );
        })
    };
    

    
})(window,jQuery);