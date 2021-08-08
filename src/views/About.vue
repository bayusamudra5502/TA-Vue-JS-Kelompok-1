<template>
  <page-container>
    <div class="home">
      <p>Ini Halaman About yaa</p>
      <h1>Creator:</h1>
      <ul v-for="(creator , index) in creators">
          <li>
                    
            Name: {{creator.Name}} <br/>
            Github ID: {{creator.Github}}
        
          </li>
      </ul>
    </div>
  </page-container>
</template>

<script>
import PageContainer from "About/components/PageContainer.vue";

export default {
  name: "Home",
  components: {
    "page-container": PageContainer,
  },
  data() {
    return{
      creators : [
        {
            Name : "Bayu Samudra",
             Github : "bayusamudra5502"
        },
        {
            Name : "Farham Harvianto",
            Github : "farhamapple"
        },
        {
            Name : "Patricia Devita Samara",
            Github : "patriciads17"
        }
      ]
    }
  }
};
</script>
