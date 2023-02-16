<script setup>
</script>

<template>
    <div class="side-bar-container">
        <ul class="side-bar-nav">
            <li class="side-bar-nav-item">Profile</li>
            <li class="side-bar-nav-item">Post</li>
            <li class="side-bar-nav-item">Gallery</li>
            <li class="side-bar-nav-item">Todo</li>
        </ul>
    </div>
</template>

<style scoped>
.side-bar-container{
    box-sizing: border-box;
    height: 96%;
    width: 360px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to bottom, #a145f6, #871ff1, #7a16ea, #6d0ce3, #5f00dc);
    margin: 20px;
    border-radius: 10px;
}

.side-bar-nav{
    padding-left: 0px;
    list-style: none;
    padding: 30px;
    display: flex;
    flex-direction: column;
    height: 30%;
    width: 50%;
    justify-content: space-between;
}

.side-bar-nav-item{
    height: 40px;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 22px;
    color: #d7d7d7;
    cursor: pointer;
}
</style>

