/* =========================================================
   PRODUTOS DO CATÁLOGO
   Para alterar um produto, edite só este arquivo.
   - foto:     nome do arquivo dentro da pasta fotos/
   - desenho:  ilustração usada se a foto não for encontrada
   - opcoes:   tamanhos/calibres/conexões (deixe [] se não houver)
   A ordem da lista é a ordem das páginas.
   ========================================================= */
const PRODUTOS = [
  {
    nome: 'Polifix 2 vias',
    titulo: 'Polifix 2 vias com clamp',
    categoria: 'Infusão',
    descricao: 'Extensor multivias que permite duas linhas de infusão em um único acesso venoso, com controle independente de cada via.',
    especificacoes: ['Duas vias com clamp individual', 'Conexão luer lock', 'Estéril, descartável, uso único', 'Venda por unidade'],
    rotuloOpcoes: 'Comprimento',
    opcoes: ['Informado na proposta'],
    foto: 'polifix.jpg',
    desenho: 'polifix',
  },
  {
    nome: 'Luva cirúrgica estéril',
    titulo: 'Luva cirúrgica estéril de látex',
    categoria: 'Proteção',
    descricao: 'Embalada aos pares para procedimentos com técnica asséptica. Fornecida em caixa.',
    especificacoes: ['Látex natural, estéril', 'Embalagem individual por par', 'Versões com ou sem pó, conforme o lote', 'Venda por caixa'],
    rotuloOpcoes: 'Tamanhos',
    opcoes: ['7,0', '7,5', '8,0'],
    foto: 'luva.jpg',
    desenho: 'luva',
  },
  {
    nome: 'Cateter jelco 20G e 22G',
    titulo: 'Cateter intravenoso periférico (jelco)',
    categoria: 'Acesso venoso',
    descricao: 'Cateter sobre agulha para punção venosa periférica. A cor do canhão identifica o calibre.',
    especificacoes: ['Sem dispositivo de segurança', 'Estéril, descartável, uso único', 'Venda por unidade'],
    rotuloOpcoes: 'Calibres',
    opcoes: [
      { texto: '20G rosa', cor: '#ec5f9e' },
      { texto: '22G azul', cor: '#2f7be6' },
    ],
    foto: 'jelco.jpg',
    desenho: 'jelco',
  },
  {
    nome: 'Torneirinha 3 vias',
    titulo: 'Torneirinha 3 vias',
    categoria: 'Infusão',
    descricao: 'Válvula para direcionar o fluxo entre linhas de infusão, medicações e coletas, sem desconectar o acesso.',
    especificacoes: ['Manopla giratória para abrir ou fechar cada via', 'Estéril, descartável, uso único', 'Venda por unidade'],
    rotuloOpcoes: 'Conexão',
    opcoes: ['Luer lock', 'Luer slip'],
    foto: 'torneirinha.webp',
    desenho: 'torneirinha',
  },
  {
    nome: 'Eletrodo para ECG',
    titulo: 'Eletrodo descartável para ECG',
    categoria: 'Monitorização',
    descricao: 'Eletrodo adulto com gel condutor para monitorização cardíaca e exames de eletrocardiograma.',
    especificacoes: ['Uso adulto, com gel condutor', 'Adesivo para fixação na pele', 'Conector de pressão para cabos de ECG', 'Venda por unidade, em pacotes'],
    rotuloOpcoes: '',
    opcoes: [],
    foto: 'eletrodo.jpg',
    desenho: 'eletrodo',
  },
  {
    nome: 'Equipo macrogotas',
    titulo: 'Equipo macrogotas com injetor lateral',
    categoria: 'Infusão',
    descricao: 'Para administração de soluções por gravidade, com controle do gotejamento pela pinça rolete.',
    especificacoes: ['Macrogotas: 20 gotas por mL', 'Câmara gotejadora e pinça rolete', 'Injetor lateral para medicação', 'Estéril, descartável, uso único'],
    rotuloOpcoes: 'Conexão',
    opcoes: ['Luer lock', 'Luer slip'],
    foto: 'equipo.jpg',
    desenho: 'equipo',
  },
];

/* Ordem dos grupos no sumário */
const CATEGORIAS = ['Infusão', 'Acesso venoso', 'Monitorização', 'Proteção'];

/* Dados de contato */
const CONTATO = {
  whatsapp: '(11) 96904-5009',
  email: 'michel@mckmed.com.br',
  atendimento: 'Segunda a sexta, 8h às 18h',
  instagram: '@mckmed',
};
