<template>
  <page-container>
    <div class="bigimage">
      <img src="@/assets/about.jpg" />
      <div class="overlay"></div>
    </div>
    <div class="container article post">
      <h1>About Me</h1>
      <ul v-for="(creator, index) in creators" :key="index">
        <li>
          Name: {{ creator.Name }} <br />
          Github ID: {{ creator.Github }}
        </li>
      </ul>
    </div>
  </page-container>
</template>

<script>
import "@/style/page/article.scss";
import PageContainer from "../components/PageContainer.vue";

export default {
  name: "Home",
  components: {
    "page-container": PageContainer,
  },
  data() {
    return {
      creators: [
        {
          Name: "Bayu Samudra",
          Github: "bayusamudra5502",
        },
        {
          Name: "Farham Harvianto",
          Github: "farhamapple",
        },
        {
          Name: "Patricia Devita Samara",
          Github: "patriciads17",
        },
      ],
    };
  },
};
</script>
