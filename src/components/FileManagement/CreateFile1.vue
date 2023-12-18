<!-- <template>
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
  </style> -->
  <template>
    <div
      class="custom-select"
      :tabindex="tabindex"
      @blur="open = false"
    >
      <div
        class="selected"
        :class="{open: open}"
        @click="open = !open"
      >
        {{ selected }}
      </div>
      <div
        class="items"
        :class="{selectHide: !open}"
      >
        <div
          class="item"
          v-for="(option, i) of options"
          :key="i"
          @click="selected=option; open=false; $emit('input', option)"
        >
          {{ option }}
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  props:{
    options:{
      type: Array,
      required: true
    },
    tabindex:{
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      selected: this.options.length > 0 ? this.options[0] : null,
      open: false
    };
  },
  mounted(){
    this.$emit('input', this.selected);
  }
};
</script>

<style scoped>

.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
}

.selected {
  background-color: #080D0E;
  border-radius: 6px;
  border: 1px solid #858586;
  color: #ffffff;
  padding-left: 8px;
  cursor: pointer;
  user-select: none;
}

.selected.open{
  border: 1px solid #CE9B2C;
  border-radius: 6px 6px 0px 0px;
}

.selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 10px;
  width: 0;
  height: 0;
  border: 4px solid transparent;
  border-color: #fff transparent transparent transparent;
}

.items {
  color: #ffffff;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #CE9B2C;
  border-left: 1px solid #CE9B2C;
  border-bottom: 1px solid #CE9B2C;
  position: absolute;
  background-color: #080D0E;
  left: 0;
  right: 0;
}

.item{
  color: #ffffff;
  padding-left: 8px;
  cursor: pointer;
  user-select: none;
}

.item:hover{
  background-color: #B68A28;
}

.selectHide {
  display: none;
}
</style>