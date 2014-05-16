<div class="nl-lancamentos-grupo">
    <div class="form-novo-lancamento-grupo">
        <ul class="cad-main-ul cad-main-ul-nl"><li class="cad-bloco"><ul><li class="cad-opcao" >
    <span class="cad-label">Tipo</span>
    <span class="cad-data">
                <span style="display: block;">
                        <input type="radio"  id="nl-tipo-d" class="nl-tipo" name="nl-tipo" value="D" checked >
            <label for="nl-tipo-d">Despesa</label>&nbsp;
            <input type="radio"  id="nl-tipo-r" class="nl-tipo" name="nl-tipo" value="R"  >
            <label for="nl-tipo-r">Receita</label>&nbsp;
                    </span>
            </span>
</li><li class="cad-opcao">
    <span class="cad-label">Descrição</span>
    <span class="cad-data">
        <span style="display: inline-block;">
                        <input type="text" 
                   value=""
                   style="width:277px;"
                                      class="cad-input-text nl-desc "/>
                    </span>
                <div class="nl-parcela-desc" style="display:none;">
            <input type="checkbox" id="incluir-nparcela-desc" checked>
            <label for="incluir-nparcela-desc">Incluir número da parcela na descrição.</label>
        </div>
        <div class="nl-nova-regra-box" style="display:none;">
            
            <label for="checkbox-criar-nova-regra">
                <input type="checkbox" class="nl-regra" id="checkbox-criar-nova-regra" style="margin-right: 3px;"/>
                Criar uma nova regra de preenchimento com as informações acima
            </label>
                    </div>
            </span>
</li><li class="cad-opcao" >
    <span class="cad-label">Valor</span>
    <span class="cad-data">
        <div style="line-height: 30px;">
            <input type="text" 
                   size="20"
                   value="0,00"
                   class="cad-input-text nl-valor-prev small-input"/> 
                    </div>
            </span>
</li>
<li class="cad-opcao nl-normal nl-despesa" >
    <span class="cad-label">Categoria</span>
    <span class="cad-data">

        <select class="autocompleteselect nl-cadastro nl-categorias nl-categorias-d"  tabindex='0' >
            <option value='968525' >Automóvel</option><option value='968526' >Bem Estar</option><option value='968527' >Educação</option><option value='968528' >Empregados</option><option value='968519' >Familiares Diversas</option><option value='968518' >Impostos e Tarifas</option><option value='968517' >Investimentos</option><option value='968508' >Lazer</option><option value='968509' >Moradia</option><option value='968510' selected>Outras despesas</option><option value='968511' >Pessoais</option><option value='968512' >Previdência</option><option value='968513' >Saúde</option><option value='968514' >Seguros</option><option value='968515' >Telefonia</option><option value='968516' >Transporte</option><option value='968529' >Vestuário </option>        </select>
        
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li>
<li class="cad-opcao nl-normal nl-receita" style="display: none;">
    <span class="cad-label">Categoria</span>
    <span class="cad-data">

        <select class="autocompleteselect nl-cadastro nl-categorias nl-categorias-r"  tabindex='0' >
            <option value='968521' >Aluguel</option><option value='968520' >Investimentos</option><option value='968522' >Lucros</option><option value='968524' selected>Outras receitas</option><option value='968523' >Pró-labore</option><option value='968507' >Salário</option>        </select>
        
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li><li class="cad-opcao nl-normal nl-despesa" >
    <span class="cad-label">Centro</span>
    <span class="cad-data">
        
        <select class="autocompleteselect nl-cadastro nl-centros nl-centro-d"  tabindex='0' >
            <option value="0">Nenhum</option>
            <option value='18043' >teste centros</option>        </select>
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li>
<li class="cad-opcao nl-normal nl-receita" style="display: none;">
    <span class="cad-label">Centro</span>
    <span class="cad-data">
        <select class="autocompleteselect nl-cadastro nl-centros nl-centro-r"  tabindex='0' >
            <option value="0">Nenhum</option>
                    </select>
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li><li class="cad-opcao nl-normal" >
    <span class="cad-label nl-receita" style="display: none;">Pagador</span>
    <span class="cad-label nl-despesa" >Favorecido</span>
    <span class="cad-data">

        <select class="autocompleteselect nl-cadastro nl-contato"  tabindex='0' >
            <option value="0">Nenhum</option>
            <option value='71005' >Teste Fisico</option><option value='71006' >Teste Juridico</option>        </select>
        <a href="javascript:void(0);" class="link-add">Adicionar</a>
        
    </span>
</li></ul></li></ul>        <div class="btn-toolbar text-right">
            <div class="btn-group" style="padding: 5px;">
                <button class="btn btn-small btn-primary" id="adicionar-lancamento-grupo">
                    <i class="icon-plus-sign"></i>
                    <span>Adicionar lançamento ao grupo</span>
                </button>
            </div>
            <div class="btn-group" id="edit-lancamento-grupo" style="padding: 5px; display: none;">
                <button class="btn btn-small btn-success" id="atualizar-lancamento-grupo">
                    <i class="icon-refresh"></i>
                    <span>Atualizar</span>
                </button>
                <button class="btn btn-small btn-danger" id="cancelar-lancamento-grupo">
                    <i class="icon-remove-sign"></i>
                    <span>Cancelar</span>
                </button>
            </div>
        </div>
    </div>
    <div style="display: none;">
        <h5 style="float: left;">Valor total</h5>
        <span id="lancamento-grupo-saldo">R$ 0,00</span>
    </div>
    <table class="table table-small table-hover table-agenda"></table>
</div>