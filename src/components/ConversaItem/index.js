import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableNativeFeedback, View } from "react-native";
import { useSelector } from "react-redux";
import { addChat } from "../../actions/UserActions";
import { Container, ImageContainer, InfoContainer } from "./styles";

const ConversaItem = ({ data, dispatch }) => {
  let conversas = useSelector((state) => state.user.conversas);
  const navigation = useNavigation();

  return (
    <TouchableNativeFeedback
      onPress={() => {
        const i = conversas.indexOf(data);
        conversas[i].view = true;
        addChat(conversas, dispatch);
        navigation.navigate("Chat", { data });
      }}
    >
      <Container>
        <ImageContainer>
          <Image
            style={{ width: 60, height: 60, borderRadius: 50 }}
            source={{ uri: "https://placekitten.com/640/360" }}
          />
        </ImageContainer>
        <InfoContainer>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {data.nome}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {data.view === false ? (
                <Feather name="chevrons-down" size={12} />
              ) : (
                <Feather name="chevrons-down" size={12} color="#37c5ef" />
              )}

              <Text style={{ color: "#666", marginLeft: 5 }}>
                testando mensagem
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ marginRight: 15, color: "#666" }}>16:08</Text>
          </View>
        </InfoContainer>
      </Container>
    </TouchableNativeFeedback>
  );
};

export default ConversaItem;
