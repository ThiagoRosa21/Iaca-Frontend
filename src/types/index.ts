export type Produto = {
  id: string;
  nome: string;
  preco: string;
  imagem: string;
};

export type UserType = "feirante" | "empresa";

export type RootStackParamList = {
  Home: undefined;
  Cadastro: { userType: UserType };
  Login: undefined;
  BuscaProdutos: undefined;
  DetalhesProduto: { produto: Produto };
  Carrinho: undefined;
  ProdutosFeirante: undefined;
};
