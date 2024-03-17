// // firebaseFunctions.js
// import { onSnapshot, collection, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
// import { db } from './firebase';

// const tasksCollection = collection(db, 'Task');

// const getTasksFromFirebase = (callback) => {
//   return onSnapshot(tasksCollection, (snapshot) => {
//     const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     callback(tasks);
//   });
// };
  

// const addTaskToFirebase = async (task) => {
//   try {
//     const docRef = await addDoc(tasksCollection, task);
//     console.log("Document added with ID:", docRef.id);
//   } catch (error) {
//     console.error("Error adding document:", error);
//     throw error;
//   }
// };

// const deleteTaskFromFirebase = async (id) => {
//   try {
//     if (!id) {
//       throw new Error('Task ID is undefined or null');
//     }
    
//     // Construct a reference to the document
//     const taskDocRef = doc(db, 'Task', id);
    
//     // Delete the document
//     await deleteDoc(taskDocRef);

//     console.log('Document successfully deleted!');
//   } catch (error) {
//     console.error('Error deleting task:', error);
//     throw error;
//   }
// };

// const updateTaskInFirebase = async (taskId, updatedTask) => {
//   await updateDoc(doc(db, 'Task', taskId), updatedTask);
// };

// export { getTasksFromFirebase, addTaskToFirebase, deleteTaskFromFirebase, updateTaskInFirebase };
