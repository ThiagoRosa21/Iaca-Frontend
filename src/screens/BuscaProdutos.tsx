import React, { useState, useLayoutEffect } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

export default function BuscaProdutosScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [busca, setBusca] = useState("");
  const produtos = [
    { id: "1", nome: "Saca - 1kg", preco: "R$ 20,00", imagem: "https://picsum.photos/seed/1/200" },
    { id: "2", nome: "Saca - 500kg", preco: "R$ 400,00", imagem: "https://picsum.photos/seed/2/200" }
  ];
  const resultados = produtos.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Carrinho")} style={{ padding: 10 }}>
          <Text style={{ fontSize: 20 }}>🛒</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput placeholder="Buscar produto..." value={busca} onChangeText={setBusca} style={styles.input} />
      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.image} />
            <Text>{item.nome}</Text>
            <Text>{item.preco}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("DetalhesProduto", { produto: item })}>
              <Text style={styles.link}>Ver detalhes</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 10 },
  card: { backgroundColor: "#f9f9f9", padding: 12, borderRadius: 8, marginBottom: 10 },
  image: { width: "100%", height: 100, borderRadius: 8 },
  link: { color: "#6A1B9A", fontWeight: "bold", marginTop: 5 }
});
