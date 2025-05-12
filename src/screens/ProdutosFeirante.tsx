import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function ProdutosFeiranteScreen() {
  const [produtos, setProdutos] = useState([
    { id: "1", nome: "Caroço - 10kg", preco: "R$ 45,00", imagem: "https://picsum.photos/seed/1/200" }
  ]);

  const adicionarProduto = () => {
    const novo = {
      id: Math.random().toString(),
      nome: "Novo Caroço - 15kg",
      preco: "R$ 60,00",
      imagem: "https://picsum.photos/seed/" + Math.random() + "/200"
    };
    setProdutos([novo, ...produtos]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seus produtos</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.image} />
            <Text>{item.nome}</Text>
            <Text>{item.preco}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={adicionarProduto}>
        <Text style={styles.buttonText}>+ Adicionar Produto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  card: { backgroundColor: "#eee", padding: 10, borderRadius: 8, marginBottom: 10 },
  image: { width: "100%", height: 120, borderRadius: 8 },
  button: { backgroundColor: "#6A1B9A", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontWeight: "bold" }
});
