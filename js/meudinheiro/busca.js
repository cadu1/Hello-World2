(function(MD,$){
    

var Busca = function(){},
fn = Busca.prototype,
Ajax = fn.Ajax = MD.Controlador('BUSCA');

MD.Busca = new Busca;

var pagina = fn.pagina = function(){

    preparaExibicao("link_cabecalho_busca");

    Ajax('HEADER',function(r){
        conteudo(r,'#conteudo');
        eventos();
        buscar();
        
    })
}

function eventos(){
    $(".search-words").focus().keyup(function(e){
        var key = e.charCode || e.keyCode || 0;
        var val = $(this).val().trim();
        /*Busca quando apertar enter*/
        if(val.length > 0 && key == 13 ){
            _toggleAdvanced(false);
            buscar(true);
        } 
    });
    
    function _toggleAdvanced(b){
        var a = $("#advanced-search");
        if(!a.hasClass('b')){
            a.toggle(b);
        }else{
            jConfirm('Deseja mudar agora para a versão Premium para ter acesso à esta e outras funcionalidades?','Busca avançada indisponível',function(r){
                if(r) location.href = 'versoes';
            },{
                ok : 'Sim',
                cancel : 'Não'
            })
        }
    }
    
    $("#clear-search").click(function(){
        pagina();
    })
    
    $(".buscar").click(function(){
        buscar(true);
//        if(buscar(true))//{
            //_toggleAdvanced(false);
        //}
        _toggleAdvanced(false);
    });
    
    $(".autocompleteselect").autocompleteselect().multipleSelect();
    
    $('.search-date').calendario().current_date_format().val('');
    
    $("#search-value").numeric(true);
    
    $("#filtrar").click(function(){
        _toggleAdvanced(true);
    });
    
    $("#close-advanced-search").click(function(){
        _toggleAdvanced(false);
    })
    
    $("#main-search-input").focus(function(){
        _toggleAdvanced(false);
    });
    
    $('.search-words').keyup(function(){
        
        if($(this).is("#main-search-input")){
            $('.search-words:not(#main-search-input)').val($(this).val());
        }else{
            $('#main-search-input').val($(this).val());
        }
        
        
    })
}



var buscar = fn.buscar = function(second){
    
    var filtros = _montar();

    if(!filtros) return false;

    Ajax('BUSCAR',JSON.stringify(filtros),second,function(r){
        conteudo(r,'#resultado-busca',function(){
            var ajuda = !!$("#ajuda-busca")[0];
            $("#busca-header").toggleClass('empty',ajuda);
            if(ajuda){
                $("#filtrar").qtip( {
                    content: {
                        text : 'Clique aqui para habilitar a busca avançada.',
                        title:{
                            text: ""
                        }
                    },
                    position: {
                        my : "center left",
                        at : "right center"
                    },
                    style: {
                        classes: 'qtip-dark',
                        width: 170,
                        'left' : '200px;'
                    },
                    show : {
                        ready : true
                    },
                    hide: {
                        fixed: true
                    }
                });
            }else{
                actionsmd();
                $('td.detailed i').detailedmd({p0:'LANCAMENTOS' , p1: 'DETAILED'});
                $("#filtrar").qtip('destroy');
                MD.Agenda.actionButtons();
            }
            
        });
        
        return true;
    })
    
    function _montar(){
        var 
        words = $(".search-words").val().trim(),
        description = $("#search-description").val().trim(),
        periodb = $('.search-date#periodb').val().formatDateMySql(),
        periode = $('.search-date#periode').val().formatDateMySql(),
        categories = $("#search-categories").data('multipleSelect').getValues(),
        accounts = $("#search-accounts").data('multipleSelect').getValues(),
        centers = $("#search-centers").data('multipleSelect').getValues(),
        contacts = $("#search-contacts").data('multipleSelect').getValues(),
        forms = $("#search-forms").data('multipleSelect').getValues(),
        projects = $("#search-projects").data('multipleSelect').getValues(),
        document = $("#search-document").val().trim();
        
        var rx = /,\s*/;
        
        words = words != '' ? words.split(rx) : '';
        description= words != '' ? description.split(rx) : '';
        
        
        
        if( (periodb != '' && !validaData(periodb)) || (periode != '' && !validaData(periode)) || datecmp(periodb,periode)>0){
            jAlert('O período informado é inválido','Período inválido');
            return;
        }
        
        var value = $("#search-value").validate({
           msg : "Valor inválido",
           alert : true,
           func: function(input){
                var exp = /^[-]?\d+,?\d{1,2}$/;
                var val = $(input).val().trim();
                return exp.test(val) || val.length == 0;
           }
        });
        if(!value){ return; }
        return {
            words : words,
            description: description,
            categories:categories,
            accounts : accounts,
            centers : centers,
            contacts : contacts,
            forms : forms,
            projects: projects,
            document : document,
            value : value === true ? '' : value.parseFloat(),
            periodb : periodb,
            periode : periode
        };
    }
    
}
    
})(window.MD,jQuery);