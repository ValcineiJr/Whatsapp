import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../../../../actions/UserActions";
import ConversaItem from "../../../../components/ConversaItem";

const Conversas = () => {
  const conversas = useSelector((state) => state.user.conversas);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const fakeBD = [
    { key: "1", nome: "Valcinei", msgType: "text", view: false },
    { key: "2", nome: "Ana", msgType: "text", view: false },
    { key: "3", nome: "Carlos", msgType: "text", view: false },
    { key: "4", nome: "Joana", msgType: "text", view: false },
    { key: "5", nome: "Pedro", msgType: "text", view: false },
    { key: "6", nome: "Pedro", msgType: "text", view: false },
    { key: "7", nome: "Pedro", msgType: "text", view: false },
    { key: "8", nome: "Pedro", msgType: "text", view: false },
  ];

  const Title = ({ props }) => {
    let cor = "";
    const focused = props.focused
      ? (cor = "#fff")
      : (cor = "rgba(255,255,255,.6)");
    return (
      <View style={styles.titleContainer}>
        <Text style={[styles.title, , { color: cor }]}>CONVERSAS</Text>

        <View style={[styles.numberContainer, { backgroundColor: cor }]}>
          <Text style={[styles.number]}>1</Text>
        </View>
      </View>
    );
  };

  navigation.setOptions({
    title: (props) => <Title props={props} />,
  });

  useEffect(() => {
    addChat(fakeBD, dispatch);
  }, []);

  return (
    <>
      <ScrollView>
        {conversas.map((conversa, i) => (
          <ConversaItem key={i} dispatch={dispatch} data={conversa} />
        ))}
      </ScrollView>
      <TouchableNativeFeedback onPress={() => navigation.navigate("Contatos")}>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: "#03CA3F",
            borderRadius: 50,
            position: "absolute",
            bottom: 15,
            right: 15,
            justifyContent: "center",
            alignItems: "center",
            elevation: 2,
            zIndex: 10,
          }}
        >
          <MaterialIcons name="message" size={23} color="#fff" />
        </View>
      </TouchableNativeFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: { flexDirection: "row", alignItems: "center" },
  title: { fontWeight: "bold", fontSize: 13 },
  number: { fontSize: 10, color: "#075E55" },
  numberContainer: {
    borderRadius: 10,
    marginLeft: 5,
    paddingHorizontal: 5,
    justifyContent: "center",
    height: 15,
  },
});

export default Conversas;
