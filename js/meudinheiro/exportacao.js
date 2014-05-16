(function(MD,$){
    
var 
Exportacao = function(){},
fn = Exportacao.prototype,
Ajax = new MD.Controlador('EXPORTACAO');

MD.Exportacao = new Exportacao;

var pagina = fn.pagina = function(){
    preparaExibicao("link_cabecalho_exportacao");
    Ajax("INICIO",function(r){
        conteudo(r,"#conteudo",function(){
            eventosTela();
        });
    });
}
    
function eventosTela(){
    
    var inicio = $("#inicio-expo"),
           fim = $("#fim-expo");
    
    inicio.calendario({
        onClose: function(){
            _cria_campo_data_fim();
        }
    });
    
    _cria_campo_data_fim();
    
    function _cria_campo_data_fim()
    {
        var data_inicio = inicio.val().replaceAll(" ", "").formatDateMySql();
        
        data_inicio = data_inicio.split("-");
        fim.calendario({
            minDate : new Date(data_inicio[0],parseFloat(data_inicio[1]) - 1,data_inicio[2]),
            maxDate : new Date(parseFloat(data_inicio[0]) + 1,parseFloat(data_inicio[1]) - 1,data_inicio[2]) /*1 ano a partir da data de inicio*/
        });
    }
    
    
    $("#botao-exportar").click(function(e){
        
        var configuracoes = {
            destino : $("input[name='destinoexpo']:checked").val(),
            periodo : {
                inicio : inicio.val().replaceAll(" ","").formatDateMySql(),
                fim    : fim.val().replaceAll(" ","").formatDateMySql()
            },
            incluir : {}
        };
        
        $("#incluir input[type='checkbox']").each(function(){
            configuracoes.incluir[$(this).attr('name')] = this.checked ? 1 : 0;
        });
        
        var periodo = configuracoes.periodo;
        
        if( datecmp( periodo.inicio , periodo.fim ) > 0 ){
            jAlert('A data de início deve ser menor que a de fim.','Periodo inválido');
            return;
        
        }else if( diff_date(periodo.fim, periodo.inicio, 'MONTH') > 12){
            jAlert('O período máximo permitido é de 1 ano.','Periodo inválido');
            return;
        }
        
        

        var get = '?c=' + json(configuracoes).replace(/\"/g,'\'');

        var status = $("#statusexpo").html('<img src="img/uploading.gif" style="vertical-align:middle;">');

        Ajax('QUANTIDADE_LANCAMENTOS',periodo.inicio,periodo.fim,function(r){
            
            r = $.parseJSON(r);
            
            if(r.quantidade <= r.max){
                
                status.html('Exportando <b>' + r.quantidade + '</b> lançamentos. Por favor, aguarde.');
                $("#download").html(
                    '<iframe src="./php/exportarLancamentos.php'+get+'" width="0" height="0"></iframe>'
                );    
            }else{
                status.html('');
                jAlert('Foram encontrados <b>' + r.quantidade + '</b> lançamentos.<br/>O '+
                       'limite permitido por exportação é de <b>' + r.max + 
                       '</b> lançamentos.<br/><br/>Por favor, diminua o período e tente novamente.','Quantidade máxima excedida');
            }
        });
        
        
        
    });
    
    
    
    
    
    
    var checkboxes = $("#incluir input[type='checkbox']"),
            master = $("#checkAll");
            
    master.click(function(){
        checkboxes.prop('checked',this.checked);
    });
    checkboxes.click(function(){
        master.prop('checked',$("#incluir input[type='checkbox']:checked").length == checkboxes.length);
    });
}
    
})(window.MD,jQuery);