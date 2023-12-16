<template>
    <div class="file-upload">
      <div class="file-upload__area">
        <input type="file" name="" id="" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "FileUpload",
  };
  </script>
  
  <style scoped>
  .file-upload {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  .file-upload .file-upload__area {
    width: 600px;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed #ccc;
    margin-top: 40px;
  }
  </style>