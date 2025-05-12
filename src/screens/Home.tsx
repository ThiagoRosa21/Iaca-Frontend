import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [userType, setUserType] = useState<"feirante" | "empresa">("feirante");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Como funciona o Yaçá?</Text>
      <View style={styles.switchContainer}>
        <Text>Sou vendedor de açaí</Text>
        <Switch
          value={userType === "empresa"}
          onValueChange={(val) => setUserType(val ? "empresa" : "feirante")}
        />
        <Text>Sou uma empresa</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Cadastro", { userType })}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  switchContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  button: { backgroundColor: "#6A1B9A", padding: 15, borderRadius: 8, marginTop: 10, width: "100%", alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
