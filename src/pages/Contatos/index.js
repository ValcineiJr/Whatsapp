import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setContacts } from "../../actions/UserActions";
import ContatoItem from "../../components/ContatoItem";

// import { Container } from './styles';

const Contatos = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const contatos = useSelector((state) => state.user.contatos);

  const conts = [
    { key: "1", nome: "Novo Grupo", recado: "", tipo: "newGroup" },
    { key: "2", nome: "Novo Contato", recado: "", tipo: "newContact" },
    { key: "3", nome: "Valcinei", recado: "Vafucaju na área", tipo: "contato" },
    { key: "4", nome: "Ana", recado: "Recaldas passam longe", tipo: "contato" },
    {
      key: "5",
      nome: "Carlos",
      recado: "Hey there, I'm using whatsapp",
      tipo: "contato",
    },
    { key: "7", nome: "Joana", recado: "", tipo: "contato" },
  ];

  useEffect(() => {
    setContacts(conts, dispatch);
  }, []);

  const HeaderRight = () => (
    <View style={styles.headerRight}>
      <MaterialIcons style={styles.icon} name="search" color="#fff" size={28} />
      <MaterialIcons
        style={styles.icon}
        name="more-vert"
        color="#fff"
        size={28}
      />
    </View>
  );
  const HeaderTitle = () => (
    <View>
      <Text style={styles.title}>Contatos</Text>
      <Text style={styles.subTitle}>4 contatos</Text>
    </View>
  );

  navigation.setOptions({
    headerTitle: () => <HeaderTitle />,
    headerRight: () => <HeaderRight />,
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={contatos}
        renderItem={({ item }) => <ContatoItem data={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: { fontWeight: "700", color: "#fff", fontSize: 18 },
  subTitle: { color: "#BBE3E2", fontSize: 12 },
  headerRight: { flexDirection: "row" },
  icon: { marginHorizontal: 10 },
});

export default Contatos;
