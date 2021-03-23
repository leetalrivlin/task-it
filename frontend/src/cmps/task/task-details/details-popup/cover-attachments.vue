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
import { uploadImg } from '../../../../services/img-upload.service';
import { boardService } from '../../../../services/board.service';

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
      this.isLoading = false;
      const emptyAttachment = boardService.getEmptyAttachment();
      emptyAttachment.name = res.original_filename;
      emptyAttachment.url = res.url;
      this.$emit('imgUploaded', emptyAttachment);
    },
  },
};
</script>
