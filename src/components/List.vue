<script setup>
import { onMounted, reactive } from "vue";
import axios from "axios";
import { faker } from "@faker-js/faker";

const data = reactive({
  users: [],
  mode: "add",
  selected: null,
  form: {
    name: "",
    hobi: "",
  },
});

// Get Users
const getUsers = async () => {
  await axios
    .get("http://localhost:3000/users")
    .then((response) => {
      data.users = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

// Add User
const addUser = async () => {
  if (data.mode === "add") {
    const senddata = {
      name: data.form.name,
      hobi: data.form.hobi,
      avatar: faker.image.avatar(),
      createdAt: faker.date.recent(),
    };
    await axios
      .post("http://localhost:3000/users", senddata)
      .then(() => {
        getUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
const initdata = () => {
  data.form.name = null;
  data.form.hobi = null;
};
//delet
const delet = async (id) => {
  axios
    .delete(`http://localhost:3000/users/${id}`)
    .then((res) => {
      getUsers();
    })
    .catch((err) => {
      alert(err);
    });
};
onMounted(() => {
  getUsers();
});
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col col-md-4">
        <div class="card mb-5 sticky-top">
          <div class="card-body">
            <form @submit.prevent="addUser">
              <div class="form-group mb-3">
                <label for="name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="data.form.name"
                  placeholder="Enter name"
                />
              </div>
              <div class="form-group mb-3">
                <label for="hobi">Email address</label>
                <input
                  type="text"
                  class="form-control"
                  id="hobi"
                  placeholder="Enter Hobi"
                  v-model="data.form.hobi"
                />
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col col-md-8">
        <ul class="list-group list-group-flush">
          <li
            v-for="item in data.users"
            :key="item.id"
            class="list-group-item d-flex gap-4"
          >
            <img :src="item.avatar" alt="avatar" class="img-thumbnail" />
            <div>
              <h2>{{ item.name }}</h2>
              <p>Hobi: {{ item.hobi }}</p>
              <button
                @click="delet(item.id)"
                type="button"
                class="btn btn-secondary"
              >
                Delet
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
