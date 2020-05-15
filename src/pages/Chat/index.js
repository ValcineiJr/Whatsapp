import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../../actions/AppActions";
import { loadMessages } from "../../actions/UserActions";
import Message from "../../components/Message";

const Chat = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const info = route.params.data;
  const messages = useSelector((state) => state.user.mensagens);
  const selecting = useSelector((state) => state.app.selecting);
  const selectingSize = useSelector((state) => state.app.selectingSize);
  const dispatch = useDispatch();

  function HeaderLeft() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 5,
        }}
      >
        <TouchableNativeFeedback onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={30} color="#fff" />
        </TouchableNativeFeedback>
        <Image
          style={{ width: 40, height: 40, borderRadius: 50 }}
          source={{ uri: "https://placekitten.com/640/360" }}
        />
      </View>
    );
  }
  function HeaderSelectingLeft() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 5,
        }}
      >
        <TouchableNativeFeedback
          onPress={() => {
            setSelected(false, dispatch);
          }}
        >
          <Feather name="arrow-left" size={30} color="#fff" />
        </TouchableNativeFeedback>
      </View>
    );
  }

  function HeaderRight() {
    return (
      <View style={{ flexDirection: "row" }}>
        <MaterialIcons
          style={{ marginHorizontal: 8 }}
          size={28}
          color="#fff"
          name="videocam"
        />
        <MaterialIcons
          style={{ marginHorizontal: 8 }}
          size={28}
          color="#fff"
          name="call"
        />
        <MaterialIcons
          style={{ marginHorizontal: 8 }}
          size={28}
          color="#fff"
          name="more-vert"
        />
      </View>
    );
  }
  function HeaderSelectingRight() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableNativeFeedback onPress={excluirMensagens}>
          <MaterialIcons
            style={{ marginHorizontal: 8 }}
            size={28}
            color="#fff"
            name="delete"
          />
        </TouchableNativeFeedback>
        <MaterialIcons
          style={{ marginHorizontal: 8 }}
          size={28}
          color="#fff"
          name="more-vert"
        />
      </View>
    );
  }

  const excluirMensagens = () => {
    let ex = messages.filter((item) => {
      if (!item.isSelected == true) {
        return item;
      }
    });

    loadMessages(ex, dispatch);
    setSelected(false, dispatch);
  };

  const fakeMsg = [
    {
      key: "1",
      msg: "Oi, tudo bem ?",
      msgType: "text",
      uid: info.key,
      isSelected: false,
      selected: styles.list,
    },
    {
      key: "2",
      msg: "Notei que você estava online",
      msgType: "text",
      uid: info.key,
      isSelected: false,
      selected: {},
    },
    {
      key: "3",
      msg: "Sim, e você ?",
      msgType: "text",
      uid: "6",
      isSelected: false,
      selected: {},
    },
    {
      key: "4",
      msg: "Ótimo, até agora sem pegar covid.",
      msgType: "text",
      uid: info.key,
      isSelected: false,
      selected: {},
    },
    {
      key: "5",
      msg: "E eu que não pego ninguém kkk risos",
      msgType: "text",
      uid: "6",
      isSelected: false,
      selected: {},
    },
  ];

  useEffect(() => {
    loadMessages(fakeMsg, dispatch);
  }, []);

  if (!selecting) {
    navigation.setOptions({
      headerLeft: () => <HeaderLeft />,
      headerRight: () => <HeaderRight />,
      headerTitle: () => (
        <Text
          style={{
            marginLeft: 10,
            color: "#fff",
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          {info.nome}
        </Text>
      ),
    });
  } else {
    //Selecionando
    navigation.setOptions({
      headerLeft: () => <HeaderSelectingLeft />,
      headerRight: () => <HeaderSelectingRight />,
      headerTitle: () => (
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          {selectingSize}
        </Text>
      ),
    });
  }

  return (
    <View style={{ backgroundColor: "#e5ddd5", flex: 1 }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message data={item} uid={info.key} />}
      />
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        <View style={{ flex: 1, position: "relative" }}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma mensagem"
            numberOfLines={1}
            placeholderTextColor="#888"
          />
          <TouchableNativeFeedback onPress={() => alert("Inserir Documento")}>
            <MaterialIcons
              style={{ position: "absolute", left: 13, bottom: 7 }}
              name="insert-emoticon"
              color="rgba(51, 51, 51, 0.5)"
              size={25}
            />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => alert("Inserir Documento")}>
            <MaterialIcons
              style={{ position: "absolute", right: 50, bottom: 7 }}
              name="attach-file"
              color="rgba(51, 51, 51, 0.5)"
              size={25}
            />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => alert("Tirar Foto")}>
            <MaterialIcons
              style={{ position: "absolute", right: 20, bottom: 7 }}
              name="camera-alt"
              color="rgba(51, 51, 51, 0.5)"
              size={25}
            />
          </TouchableNativeFeedback>
        </View>
        <TouchableNativeFeedback onPress={() => {}}>
          <View style={styles.btn}>
            <MaterialIcons name="mic" color="#fff" size={20} />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 5,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingLeft: 40,
    paddingRight: 80,
    borderWidth: 1,
    borderColor: "rgba(66,66,66,.10)",
  },
  btn: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "#075E55",
    marginRight: 8,
  },
});

export default Chat;
