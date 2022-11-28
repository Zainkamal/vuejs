<script setup>
import { ref, reactive } from "vue";
import { faker } from "@faker-js/faker";
import { useRouter } from "vue-router";
import axios from "axios";
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

const katagori = ref(["novel", "komik", "artikel", "majalah", "kitab"]);
const databuku = reactive({
  form: {
    judul: "",
    penulis: "",
    katagori: [],
  },
});
const router = useRouter();
//add user
const addbuku = async (value) => {
  const senddata = {
    judul: value.judul,
    penulis: value.penulis,
    cover: faker.image.abstract(200, 300, true),
    katagori: value.katagori,
  };
  await axios
    .post("http://localhost:3000/buku", senddata)
    .then(() => {
      alert("apakah data akan disimpan");
      router.push("/databuku");
    })
    .catch((error) => {
      alert(error);
    });
};

//scema
const schema = Yup.object().shape({
  judul: Yup.string()
    .required("nama buku wajib di isi")
    .typeError("nama jawib di isi"),
  penulis: Yup.string()
    .required("kolom harus di isi")
    .typeError("kolom harus di isi"),
  katagori: Yup.array().min(2, "minimal 2 katagori"),
});
</script>
<template>
  <div class="container mt-5" style="max-width: 500px">
    <h3>Tambah buku</h3>
    <div class="card p-2">
      <Form @submit="addbuku" :validation-schema="schema" v-slot="{ errors }">
        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label"
            >Judul Buku</label
          >
          <Field
            type="text"
            v-model="databuku.form.judul"
            class="form-control"
            name="judul"
            id="judul"
            :class="{ 'is-invalid': errors.judul }"
            placeholder="Judul Buku"
          />
          <ErrorMessage name="judul" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label">Penulis</label>
          <Field
            type="text"
            v-model="databuku.form.penulis"
            class="form-control"
            id="penulis"
            name="penulis"
            :class="{ 'is-invalid': errors.penulis }"
            placeholder="Judul Buku"
          />
          <ErrorMessage name="penulis" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="d-flex gap-4 mb-3">
          <div
            class="form-check"
            v-for="(item, index) in katagori"
            :key="index"
          >
            <Field
              class="form-check-input"
              type="checkbox"
              v-model="databuku.form.katagori"
              :id="item"
              :value="item"
              name="katagori"
              :class="{ 'is-invalid': errors.katagori }"
            />
            <label class="form-check-label" :for="item">
              {{ item }}
            </label>
            <ErrorMessage
              name="katagori"
              class="invalid-feedback"
            ></ErrorMessage>
          </div>
        </div>
        <button type="submit" class="btn btn-success">Success</button>
      </Form>
    </div>
  </div>
</template>
