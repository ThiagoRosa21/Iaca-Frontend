import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/Home";
import LoginScreen from "./src/screens/Login";
import CadastroScreen from "./src/screens/Cadastro";
import BuscaProdutosScreen from "./src/screens/BuscaProdutos";
import DetalhesProdutoScreen from "./src/screens/DetalhesProduto";
import CarrinhoScreen from "./src/screens/Carrinho";
import ProdutosFeiranteScreen from "./src/screens/ProdutosFeirante";

import { RootStackParamList } from "./src/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="BuscaProdutos" component={BuscaProdutosScreen} />
        <Stack.Screen name="DetalhesProduto" component={DetalhesProdutoScreen} />
        <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
        <Stack.Screen name="ProdutosFeirante" component={ProdutosFeiranteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
