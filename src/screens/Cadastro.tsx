import React from "react";
import { View, Text, TextInput, Switch, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

export default function CadastroScreen({ route }: any) {
  const { userType } = route.params;
  const isFeirante = userType === "feirante";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Cadastro {isFeirante ? "Feirante" : "Empresa"}
      </Text>
      {isFeirante ? (
        <>
          <TextInput placeholder="Seu nome" style={styles.input} />
          <TextInput placeholder="Telefone/Whatsapp" style={styles.input} />
          <TextInput placeholder="Nome da banca" style={styles.input} />
          <TextInput placeholder="Localização" style={styles.input} />
          <TextInput placeholder="Caroços por semana?" style={styles.input} />
          <Text>Aviso por WhatsApp?</Text>
          <Switch />
        </>
      ) : (
        <>
          <TextInput placeholder="Nome da empresa" style={styles.input} />
          <TextInput placeholder="CNPJ" style={styles.input} />
          <TextInput placeholder="Responsável" style={styles.input} />
          <TextInput placeholder="Telefone" style={styles.input} />
          <TextInput placeholder="E-mail" style={styles.input} />
          <TextInput placeholder="Endereço" style={styles.input} />
          <TextInput placeholder="Área de atuação" style={styles.input} />
          <TextInput placeholder="Senha" secureTextEntry style={styles.input} />
          <TextInput placeholder="Confirmar senha" secureTextEntry style={styles.input} />
        </>
      )}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Concluir Cadastro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 10 },
  button: { backgroundColor: "#6A1B9A", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" }
});
