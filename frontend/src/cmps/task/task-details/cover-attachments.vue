<template>
  <section class="attachments" @click.stop>
    <p>ATTACHMENTS</p>
    <label v-if="!isLoading" for="imgUploader">Upload a cover image</label>
    <img
      v-else
      class="loading"
      src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif"
    />
    <input type="file" id="imgUploader" @change="onUploadImg" />
  </section>
</template>

<script>
import { uploadImg } from '../../../services/img-upload.service';

export default {
  name: 'coverAttachments',
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async onUploadImg(ev) {
      this.isLoading = true;
      const res = await uploadImg(ev);
      console.log('res', res);
      this.isLoading = false;
    },
  },
};
</script>
