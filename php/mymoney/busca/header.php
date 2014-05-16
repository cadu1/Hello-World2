<div id="busca-header">
    <div class="btn-toolbar text-center" id="main-search" >
        <div class="btn-group">
            <input type="text" class="search-words" id="main-search-input"  style="margin: 0 -3px 0 0;width: 255px;" />
            <button class="btn buscar"  title="Buscar">
                <i class="icon-search"></i>
            </button>
            <button class="btn" id="clear-search"  title="Limpar parâmetros de busca">
                <i class="icon-remove-sign"></i>
            </button>
            <button class="btn" id="filtrar" title="Busca avançada">
                <i class="icon-filter"></i>
                <i class="icon-caret-down"></i>
            </button>
        </div>
    </div>

    <ul id="advanced-search" >
        <li>
            <span class="search-label">Com as palavras</span>
            <span class="search-data">
                <input type="text" class="search-words" />
            </span>
        </li>
        <li>
            <span class="search-label">Descrição</span>
            <span class="search-data">
                <input type="text" id="search-description" />
            </span>
        </li>
        <li>
            <span class="search-label">Valor</span>
            <span class="search-data">
                <input type="text" id="search-value" class="input-currency"/>
            </span>
            <i style="color:#777;font-size:11px;">Formato: 999999,99</i>
        </li>
        <li>
            <span class="search-label">Período</span>
            <span class="search-data">
                <input type="text" id="periodb" class="input-date search-date"/>
                <span style="font-size:11px; font-weight: bold;">até</span>
                <input type="text" id="periode" class="input-date search-date"/>
            </span>
        </li>
        <li>
            <span class="search-label">Categorias</span>
            <span class="search-data">
                <select class="autocompleteselect" id="search-categories">
                    <option value="0"></option>
                    <option value='905899'>Administrativas</option><option value='908590'>Administrativas/AASP</option><option value='905901'>Administrativas/Aluguel</option><option value='908589'>Administrativas/Contabilidade</option><option value='905902'>Administrativas/Correios</option><option value='905908'>Administrativas/Energia Elétrica</option><option value='909393'>Administrativas/Levantamento Judicial</option><option value='905909'>Administrativas/Locação de Bens / Copiadora</option><option value='905904'>Administrativas/Material de Consumo</option><option value='909396'>Administrativas/Papelaria</option><option value='909406'>Administrativas/Pedágio - SEM PARAR</option><option value='905903'>Administrativas/Periódicos / Assinaturas</option><option value='909397'>Administrativas/Prestação de Serviços</option><option value='909398'>Administrativas/Produtos de Limpeza</option><option value='905900'>Administrativas/Pró-labore</option><option value='909399'>Administrativas/Reembolso</option><option value='910026'>Administrativas/Saque</option><option value='909404'>Administrativas/Segurança</option><option value='909405'>Administrativas/Seguros</option><option value='909407'>Administrativas/Sindicato</option><option value='909408'>Administrativas/Supermercado</option><option value='905905'>Administrativas/Tarifas Bancárias</option><option value='905907'>Administrativas/Telefone Celular / Fixo e Internet</option><option value='921236'>Administrativas/Transferência entre Contas</option><option value='908591'>Administrativas/Água Mineral</option><option value='905906'>Administrativas/Água e Esgoto</option><option value='905924'>Financeiras</option><option value='905926'>Financeiras/Juros de Mora</option><option value='905925'>Financeiras/Juros e Encargos</option><option value='909409'>Financeiras/Tarifas Bancárias</option><option value='905932'>Gerais</option><option value='905939'>Gerais/Bens / Ativo</option><option value='905935'>Gerais/Combustível</option><option value='908592'>Gerais/Correspondentes</option><option value='908593'>Gerais/Custas Processuais</option><option value='905936'>Gerais/Despesas de Viagens</option><option value='909391'>Gerais/Doações</option><option value='905934'>Gerais/Manutenção de veículos</option><option value='909395'>Gerais/Manutenções e Reparos</option><option value='908594'>Gerais/OAB</option><option value='905937'>Gerais/Propaganda e publicidade  </option><option value='909410'>Gerais/Veículos</option><option value='905916'>Impostos</option><option value='905919'>Impostos/COFINS</option><option value='905920'>Impostos/FGTS</option><option value='905923'>Impostos/INSS</option><option value='905922'>Impostos/IOF</option><option value='905921'>Impostos/IPTU</option><option value='905917'>Impostos/IRPJ</option><option value='909392'>Impostos/ISS</option><option value='905918'>Impostos/PIS</option><option value='905928'>Outras Despesas</option><option value='905892'>Pessoal</option><option value='905893'>Pessoal/Assistência Médica</option><option value='905896'>Pessoal/Encargos Sociais</option><option value='905894'>Pessoal/Estagiários</option><option value='905898'>Pessoal/Refeições</option><option value='909400'>Pessoal/Repasses</option><option value='909402'>Pessoal/Retirada dos Sócios</option><option value='909403'>Pessoal/Salários</option><option value='905895'>Pessoal/Salários</option><option value='905897'>Pessoal/Vale Transporte</option><option value='905910'>Financeiras</option><option value='905912'>Financeiras/Custas Processuais</option><option value='905914'>Financeiras/Honorários</option><option value='905915'>Financeiras/Levantamento Judicial</option><option value='905911'>Financeiras/Rendimentos Aplicações</option><option value='905913'>Financeiras/Resgate Aplicação</option><option value='921002'>Financeiras/Ressarcimento de custas</option><option value='905929'>Saque $$$</option><option value='905927'>Transferência entre contas</option>                </select>
            </span>
        </li>
        <li>
            <span class="search-label">Contas</span>
            <span class="search-data">
                <select class="autocompleteselect" id="search-accounts">
                    <option value="0"></option>
                    <option value='34814'>BANCO DO BRASIL</option><option value='34813'>BRADESCO JURIDICO</option><option value='34816'>BRADESCO WERNER/SOLANGE 10030</option><option value='34815'>BRADESCO WERNER/VERA 150300</option><option value='35641'>Braulio</option><option value='34874'>Caixa - Carol</option>                </select>
            </span>
        </li>
        <li>
            <span class="search-label">Centros</span>
            <span class="search-data">
                <select class="autocompleteselect" id="search-centers">
                    <option value="0"></option>
                                    </select>
            </span>
        </li>
        <li>
            <span class="search-label">Contatos</span>
            <span class="search-data">
                <select class="autocompleteselect" id="search-contacts">
                    <option value="0"></option>
                                    </select>
            </span>
        </li>
        <li>
            <span class="search-label">Formas Pagto.</span>
            <span class="search-data">
                <select class="autocompleteselect" id="search-forms">
                    <option value="0"></option>
                    <option value='296241'>Boleto</option><option value='296242'>Cartão de Crédito</option><option value='296243'>Cartão de Débito</option><option value='296244'>Cheque</option><option value='296247'>DOC/TED</option><option value='296245'>Depósito</option><option value='296246'>Dinheiro</option><option value='296248'>Débito Automático</option><option value='296249'>Internet</option><option value='296250'>Outros</option>                </select>
            </span>
        </li>
        <li>
            <span class="search-label">Projetos</span>
            <span class="search-data">
                <select class="autocompleteselect" id="search-projects">
                    <option value="0"></option>
                                    </select>
            </span>
        </li>
        <li>
            <span class="search-label">N. Documento</span>
            <span class="search-data">
                <input type="text" id="search-document"/>
            </span>
        </li>
        <li class="text-right" style="background: #f8f8f8;padding: 5px 5px;border-radius: 0 0 5px 5px;">
            <div class="btn-group">
                <button class="btn btn-small buscar">Buscar</button>
                <button class="btn btn-small" id="close-advanced-search">Cancelar</button>
            </div>
        </li>
    </ul>
</div>

<div id="resultado-busca"></div>
