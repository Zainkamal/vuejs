<script setup>
//import HelloWorld from './components/HelloWorld.vue'
//import TheWelcome from './components/TheWelcome.vue'
import Header from "./components/Header.vue";
import Main from "./components/main.vue"
//ref = untuk data primitif
//reactive = untuk object ,array
import { reactive, ref } from "vue";

const nama = ref("milfin");
//page1 , page2 , page3
const page = ref ("page1");

const todo = ref(null);
function createtodo() {
  if(todo.value.trim()){
    todos.unshift({
      id: Math.random(),
      title: todo.value,
      completed: false,
    })
    todo.value = "null";
  }
}

const todos = reactive([
  {
    id:1,
    title:"bernilai false",
    completed:false,
  },
  {
    id: 2,
    title: "bernilai true",
    completed: true,
  }
])
// function cheklist(id){
//   // if (todos[id].completed){
//   //   todos[id].completed=false;
//   // }else{
//   //   todos[id].completed=true
//   // }
// }
function chekdelet(id){
  todos.splice(id, 1);
}
setTimeout(()=>{
  nama.value= "etes";
},2000);


</script>

<template>
  {{todo}}
  <form @submit.prevent="createtodo">
    <input type="text" c-model="todo" placeholder="todo"
    @input="(event) => (todo = event.target.value)" required
    >
    <button type="submit">📰save</button>
  </form>
  <div v-if="page === 'page1'" class="container" style="background-color: blue;">
    <!-- <Header />
    <Header nama="sem" />
    <Main /> -->
    <h3>All tolos</h3>
    <h3>{{ nama }}</h3>
    <!--Todo-->
    <ul v-for="(item, index) in todos" :key="item.id">
      <!-- memanggil reactive -->
      <!-- <li>{{item.title}}</li> -->

      <!-- cara simpelnya -->
      <!-- item.completed = ! item.completed -->
      <!-- cheklist(id) -->
      <li @click="item.completed = !item.completed" :style="{'text-decoration': item.completed ? `line-through` : `none`}">{{item.title}}</li>
      <button @click="chekdelet(id)">✂</button>
      <!--mengambil trus atau false-->
      <!-- <li v-if="!item.completed">{{item.title}}</li> -->
    </ul>
  </div>
  <div v-if="page === 'page2'" class="container">
    <!-- <Header />
      <Header nama="sem" />
      <Main /> -->
      <h3>completed tolos</h3>
    <h3>{{ nama }}</h3>
    <!--Todo-->
    <ul v-for="item in todos" :key="item.id">
      <!--mengambil trus atau false-->
      <li v-if="item.completed">{{item.title}}</li>
    </ul>
  </div>
  <div v-if="page === 'page3'" class="container">
    <!-- <Header />
      <Header nama="sem" />
      <Main /> -->
      <h3>uncompleted tolos</h3>
    <h3>{{ nama }}</h3>
    <!--Todo-->
    <ul v-for="item in todos" :key="item.id">
      <!--mengambil trus atau false-->
      <li v-if="!item.completed">{{item.title}}</li>
    </ul>
  </div>
<button @click="page = 'page1'" :class="page === 'page1' ? 'active' : ''">All tolos</button>
<button @click="page = 'page2'" :class="page === 'page2' ? 'active' : ''">completed tolos</button>
<button @click="page = 'page3'" :class="page === 'page3' ? 'active' : ''">uncompleted tolos</button>
</template>

<style>
.active{
  background-color: blueviolet;
}
</style>
