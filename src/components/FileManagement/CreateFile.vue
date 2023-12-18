<template>
    <b-col>
        <div class="manage-files">
            <form id="file-upload-form" class="uploader">
                <input id="file-upload" type="file" name="fileUpload" accept="image/*, .pdf" @change="handleFileUpload" />
                <label for="file-upload" id="file-drag">
                    <p class="uploader-icon-p">
                        <font-awesome-icon :icon="['fas', 'upload']" style="font-size: 2.5em; color:#0F2167" />
                    </p>
                    <div id="start">
                        <div class="upload-semi-text">Select a file or drag here</div>
                        <div id="notimage" class="hidden">Please select an image</div>
                        <span id="file-upload-btn" class="btn btn-primary" @click="handleFileUpload">Select a file</span>
                        <div class="upload-semi-text" style="font-size: 13px;">PDF or Image</div>
                    </div>
                </label>
            </form>
        </div>
    </b-col>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

export default {
    data() {
        return {
            fileInfo: {
                file_name: '',
                file_format: '',
                size: 0,
                upload_time: new Date().toLocaleString(),
                id: uuidv4(),

            },

        }
    },
    computed: {
        ...mapState('file', ['files']),
        ...mapGetters('file', ['allFiles'])

    },
    methods: {

        triggerClose() {
            this.$emit('closeCreateModal')
        },

        handleFileUpload(event) {
            if (event.target.files && event.target.files[0]) {
                const file = event.target.files[0];
                this.fileInfo.file_name = file.name.split(".").shift();
                this.fileInfo.size = Math.round((file.size / 1024 / 1024) * 100) / 100;
                const fileFormat = file.type.split('/')[1];
                this.fileInfo.file_format = fileFormat;

                this.$store.dispatch('file/addFiles', this.fileInfo);
                this.$emit('closeCreateModal');
                this.$emit('reloadDataTable');
                this.$emit('showSuccessAlert');
            }
        }

    },
}


</script>
<style>
#manage-files {
    display: block;
    width: 87%;
    height: 100%;
    background: #080710 !important;
    margin: 0 auto;
    padding: 12px 17px;
    box-shadow: 2px 2px 3px -1px rgba(0, 0, 0, 0.35);
    position: absolute;
    top: 0;
    right: 0;
    overflow-x: scroll;
    scrollbar-width: thin;
    scrollbar-color: #ccc transparent;
}

/* File uploader */

#file-upload-form {
    width: 500px;
    height: 173px;
    padding-bottom: 78px;
    margin-top: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d1d2e1;
}

.uploader {
    display: block;
    clear: both;
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
}

#file-drag {
    float: left;
    clear: both;
    width: 100%;
    height: 260%;
    padding: 2rem 1.5rem;
    text-align: center;
    background: transparent;
    border-radius: 7px;
    border: 3px solid #eee;
    transition: all .2s ease;
    user-select: none;
    cursor: pointer;
    background-color: #F3F8FF
}

#file-drag:hover {
    border-color: #49108B;

}

#start {
    float: left;
    clear: both;
    width: 100%;
    padding-top: 18px;

    &.hidden {
        display: none;
    }
}

#response {
    float: left;
    clear: both;
    width: 100%;

    &.hidden {
        display: none;
    }

    #messages {
        margin-bottom: .5rem;
    }
}

.upload-icon {
    color: #111;
    width: 40px;
    height: 40px;
}

#file-image {
    display: inline;
    margin: 0 auto .5rem auto;
    width: auto;
    height: auto;
    max-width: 180px;

    &.hidden {
        display: none;
    }
}

#notimage {
    display: block;
    float: left;
    clear: both;
    width: 100%;

    &.hidden {
        display: none;
    }
}

progress,
.progress {
    appearance: none;
    display: inline;
    clear: both;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    height: 8px;
    border: 0;
    border-radius: 4px;
    background-color: #eee;
    overflow: hidden;
}

.progress[value]::-webkit-progress-bar {
    border-radius: 4px;
    background-color: #eee;
}

.progress[value]::-webkit-progress-value {
    background: linear-gradient(to right, darken(#454cad, 8%) 0%, #454cad 50%);
    border-radius: 4px;
}

.progress[value]::-moz-progress-bar {
    background: linear-gradient(to right, darken(#454cad, 8%) 0%, #454cad 50%);
    border-radius: 4px;
}

input[type="file"] {
    display: none;
}

div.upload-semi-text {
    margin: 12px;

    color: #5f6982;
}

#file-upload-btn {

    background: #5E5DF0;
    border-radius: 999px;
    box-shadow: #5E5DF0 0 10px 20px -10px;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    font-family: Inter, Helvetica, "Apple Color Emoji", "Segoe UI Emoji", NotoColorEmoji, "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", EmojiSymbols, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", sans-serif;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    opacity: 1;
    outline: 0 solid transparent;
    padding: 8px 18px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: fit-content;
    word-break: break-word;
    border: 0;
}
</style>