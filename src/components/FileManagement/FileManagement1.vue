<template>
    <div class="file-management">
        <AppHeader></AppHeader>
        <form id="file-upload-form" class="uploader">
            <input id="file-upload" type="file" name="fileUpload" accept="image/*, .pdf"  />
            <label for="file-upload" id="file-drag">
                <p class="uploader-icon-p">
                    <font-awesome-icon class="upload-icon" icon="fas fa-upload" />
                </p>
                <div id="start">
                    <div class="upload-semi-text">Select a file or drag here</div>
                    <div id="notimage" class="hidden">Please select an image</div>
                    <span id="file-upload-btn" class="btn btn-primary">Select a file</span>
                    <div class="upload-semi-text" style="font-size: 13px;">PDF or Image</div>
                </div>
            </label>
        </form>
    </div>
</template>
<script>
import AppHeader from '../AppHeader/AppHeader.vue';
export default{
    components:{
AppHeader,
    },
}
</script>
