<script setup>
import { computed, reactive, watchEffect } from 'vue';
const data = reactive({
    data: JSON.parse(localStorage.getItem("isi") || "[]"),
    provider : null,
    no_hp : null,
    nominal : null,
    catatan : null,
    mode : "add",
    form: null,
    selected: null,
    search: null,

});
function tambah(){
    if (data.mode === "add") {
        data.data.unshift({
            id: Math.random(),
            tanggal: new Date().toISOString(),
            provider: data.provider,
            no_hp:data.no_hp,
            nominal:data.nominal,
            catatan:data.catatan,
        });
        data.provider=null;
        data.no_hp = null;
        data.nominal = null;
        data.catatan = null;
    }else{
            // Carikan index dari todo.data yang akan diedit
            const i = data.data.findIndex((o) => o.id === data.selected.id);
            // Ubah data pada index tersebut
            data.data[i] = {
                tanggal: new Date().toISOString(),
                provider : data.provider, 
                no_hp : data.no_hp,
                nominal : data.nominal,
                catatan : data.catatan,
            }
            // Reset
            data.selected = {};
            data.provider = null;
            data.no_hp = null;
            data.nominal = null;
            data.catatan = null;
            data.mode = "add";
    }
    };
    const menampilkandata = computed(() =>{
        return data.data;
    })
function deldata(idx) {
    // alert confirm
    if (confirm("Are you sure?")) {
        data.data.splice(idx, 1);    
    }
}
 const filteredTodos = computed(() => {
     if (data.search) {
         return data.data.filter((data) => {
             return data.data.toLowerCase().includes(data.search.toLowerCase());
         });
     } else {
         return data.data;
     }
 });
watchEffect(() => {
    localStorage.setItem("isi", JSON.stringify(data.data));
    console.log(data.data);
});
</script>
<template>
    <div class="wrap">
        {{ data.provider }}
        <header>
            <h3>📧MAMA PULSA</h3>
            <p>Beli pulsa</p>
        </header>
        <main style="display :flex">
            <div class="left">
                    <h3>📳Beli Pulsa</h3>
                    <h3>Provider</h3>
                    <form @submit.prevent="tambah">
                    <select v-model="data.provider">
                        <option :value="null">pilih provider</option>
                        <option value="Telkomsel">Telkomsel</option>
                        <option value="Exsis">Exsis</option>
                        <option value="Smartfrent">Smartfren</option>
                        <option value="Xl">Xl</option>
                        <option value="M3">M3</option>
                    </select>
                    <h3>NO.hp</h3>
                    <input v-model="data.no_hp" class="input" type="text" placeholder="Masukkan No.Hp">
                    <h3>Nominal Pulsa</h3>
                    <input v-model="data.nominal" class="input" type="text" placeholder="Masukkan Nominal pulsa">
                    <h3>Catatan</h3>
                    <textarea v-model="data.catatan" name="catatan" id="" cols="30" rows="5" placeholder="Masukkan Catatan"></textarea>
                    <button type="submit">{{data.mode === "add" ? "simpan" : "edit"}}</button>
                </form>
            </div>
            <div class="right">
                <div class="top">
                    <input type="text" placeholder="🔎Cari" v-model="data.search">
                    <select v-model="selectForm">
                        <option value="Telkomsel">Telkomsel</option>
                        <option value="Exsis">Exsis</option>
                        <option value="Smartfren">Smartfren</option>
                        <option value="Xl">Xl</option>
                        <option value="M3">M3</option>
                    </select>
                    <select v-model="selectForm" placeholder="pilih Provider">
                        <option value="Proses">Proses</option>
                        <option value="Sukses">Sukses</option>
                        <option value="Batal">Batal</option>
                    </select>
                </div>
                <div class="bottom" v-if="filteredTodos.length">
                    <table class="table table-bordered border-primary" >
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Provider</th>
                                <th scope="col">Nomer Hp</th>
                                <th scope="col">Nominal</th>
                                <th scope="col">Status</th>
                                <th scope="col">Catatan</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in menampilkandata" :key="item.id">
                                <td>{{item.tanggal}}</td>
                                <td>{{ item.provider }}</td>
                                <td>{{item.no_hp}}</td>
                                <td>{{item.nominal}}</td>
                                <td>{{item.status}}</td>
                                <td>{{item.catatan}}</td>
                                <td>
                                    <button @click="
                                    data.mode = 'edit',
                                    data.provider = item.provider;
                                    data.no_hp = item.no_hp;
                                    data.nominal = item.nominal;
                                    data.catatan = item.catatan;
                                    data.selected = item;
                                    "  >🛠</button>
                                    <button @click="deldata(id)">⚔</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
    
</template>

<style scoped>

.wrap header h3{
    margin-top: 10px;
    margin-left: 15px;
}
.wrap header p{
    margin-left: 15px;
}
main{
    margin-left: 15px;
    
}
.left{
    border: 1px solid rgb(63, 61, 61);
    max-width: 20%;
    max-height: 80vh;
    padding: 0 10px;
    border-radius: 20px;
}
.right{
    width: 80%;
    padding-left: 10px;
}
.wrap main .left h3{
    margin-top: 10px;
    font-size: 15px;
}
.wrap main .left button{
    background-color: aqua;
    text-align: center;
    border-radius: 10px;
    font-size: 14px;
    padding: 4px 12px;
    margin-bottom: 20px;
}
.wrap main .left select, .input{
    width: 100%;
}
.right .top {
    display: flex;
    justify-content: flex-start;
    column-gap: 1rem;
    margin-bottom: 10px;
}
.right .top input ,select{
    width: 200px;
}

</style>