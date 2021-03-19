<template>
  <section class="task-attachment-container d-desc">
      <font-awesome-icon class="d-icon" icon="paperclip" />
      <div class="d-content">
          <h1 class="task-details-header">Attachment</h1>
          <!-- Should be replaced to one li with a v-for on the images: -->
          <li class="task-attachment flex"> 
              <div class="img-container ratio-attachment"><img src="../../../assets/imgs/task-attachment-2.jpg" alt=""></div>
              <div class="img-desc">
                  <h1>Image.jpg</h1>
                  <p><a href="">Delete</a> - <a href="">Edit</a></p>
              </div>
          </li>
          <li class="task-attachment flex">
              <div class="img-container ratio-attachment"><img src="../../../assets/imgs/task-attachment-1.jpg" alt=""></div>
              <div class="img-desc">
                  <h1>Image.jpg</h1>
                  <p><a href="">Delete</a> - <a href="">Edit</a></p>
              </div>
          </li>
          <a class="el-btn-details details-item-btn attachment-btn">Add an attachment</a>
      </div>
      
  </section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

library.add(faPaperclip);
export default {};
</script>
