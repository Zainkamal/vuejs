<script setup>
defineProps({
    nama : {
        type: String,
        default: "milfin",
        //required: true,
    },
});
</script>
<template>
    <header>
        <img src="../assets/logo.jpg" alt="" />
        <div class="nama">
            <h3>{{ nama }}</h3>
            <p>Front and developer</p>
            <div class="tombol">
                <button>Download cv</button>
                <button style="background-color: rgb(87, 248, 135); color: white">
                    read me
                </button>
            </div>
        </div>
    </header>
</template>