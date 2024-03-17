import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  Button,
  TextInput,
  Switch,
  Modal,
  Portal,
} from "react-native-paper";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { connect } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "../redux/actions";
import Spacer from "../components/Spacer";
import ButtonIcon from "../components/ButtonIcon";
import Constants from "expo-constants";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

const TodoApp = ({ addTodo, deleteTodo, editTodo }) => {
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editedTask, setEditedTask] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [editedTaskId, setEditedTaskId] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Task"), (snapshot) => {
      const updatedTodoList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodoList(updatedTodoList);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTodo = async () => {
    try {
      await addDoc(collection(db, "Task"), {
        task: task,
        status: "due",
      });
      addTodo(task);
      setTask("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "Task", id));
      deleteTodo(id);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const showModal = (id, task, status) => {
    setEditedTaskId(id);
    setEditedTask(task);
    setEditedStatus(status);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setEditedTask("");
    setEditedStatus("");
    setEditedTaskId(null);
  };

  const handleEditTaskAndStatus = async () => {
    try {
      await updateDoc(doc(db, "Task", editedTaskId), {
        task: editedTask,
        status: editedStatus,
      });
      // Update local state to reflect changes
      const updatedTodoList = todoList.map((item) => {
        if (item.id === editedTaskId) {
          return { ...item, task: editedTask, status: editedStatus };
        } else {
          return item;
        }
      });
      setTodoList(updatedTodoList);
      setVisible(false);
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.headerCard}>
        <Text style={styles.paragraph}>Gotawala Pranav ~ Lab 2</Text>
      </Card>
      <Spacer />
      <Card style={styles.inputCard}>
        <Card.Content>
          <Title>Feel free to input a new task here:</Title>
          <TextInput
            mode="outlined"
            label="Enter task"
            value={task}
            onChangeText={setTask}
          />
          <Spacer />
          <Button
            mode="contained"
            onPress={handleAddTodo}
            disabled={task.trim() === ""}
          >
            Add Task
          </Button>
        </Card.Content>
      </Card>
      <Spacer />
      <FlatList
        data={todoList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          let cardStyle = {
            borderWidth: 1,
            borderColor: "#ddd",
          };

          switch (item.status) {
            case "due":
              cardStyle.backgroundColor = "#f0f0f0";
              break;
            case "done":
              cardStyle.backgroundColor = "#50C878";
              cardStyle.borderColor = "#99cc99";
              break;
          }

          return (
            <Card style={[styles.taskCard, cardStyle]}>
              <Card.Title
                title={`Task#${index + 1}`}
                left={(props) => <Icon name="tasks" size={24} color="black" />}
                right={(props) => (
                  <View style={{ flexDirection: "row" }}>
                    <ButtonIcon
                      iconName="edit"
                      color="blue"
                      onPress={() => showModal(item.id, item.task, item.status)}
                    />
                    <ButtonIcon
                      iconName="close"
                      color="red"
                      onPress={() => handleDeleteTodo(item.id)}
                    />
                  </View>
                )}
              />
              <Card.Content>
                <Paragraph>{item.task}</Paragraph>
                <Paragraph>Status: {item.status}</Paragraph>
              </Card.Content>
            </Card>
          );
        }}
      />
      <Spacer />
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <Card>
            <Card.Content>
              <Title>Edit Task</Title>
              <TextInput
                label="Task"
                value={editedTask}
                onChangeText={setEditedTask}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>Status:</Text>
                <Switch
                  value={editedStatus === "done"}
                  onValueChange={() =>
                    setEditedStatus(editedStatus === "done" ? "due" : "done")
                  }
                />
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={handleEditTaskAndStatus}>Save</Button>
              <Button onPress={hideModal}>Cancel</Button>
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    todo_list: state.todos.todo_list,
  };
};

const mapDispatchToProps = {
  addTodo,
  deleteTodo,
  editTodo,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
  headerCard: {
    marginBottom: 10,
  },
  inputCard: {
    marginBottom: 10,
  },
  taskCard: {
    marginBottom: 5,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
