import React from "react";
import { ScrollView, Text, Image, StyleSheet } from "react-native";

export default function DetalhesProdutoScreen({ route }: any) {
  const { produto } = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: produto.imagem }} style={styles.image} />
      <Text style={styles.name}>{produto.nome}</Text>
      <Text style={styles.price}>{produto.preco}</Text>
      <Text style={styles.details}>Produto de qualidade. Retirada ou entrega a combinar.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 15 },
  name: { fontSize: 22, fontWeight: "bold" },
  price: { fontSize: 18, color: "#6A1B9A", marginBottom: 10 },
  details: { fontSize: 16 }
});
