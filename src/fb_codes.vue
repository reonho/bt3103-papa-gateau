<script>
import database from "../firebase_wx.js"; //change here
import dataObject from "../Database_mods.js";
export default {
  methods: {
    readDatabase: function() {
      database
        .collection("modules")
        .get()
        .then(querySnapShot => {
          //Loop through each item
          querySnapShot.forEach(doc => {
            //console.log(doc.id+"==>"+doc.data())
            this.modulesData.push(doc.data());

            //to view module data
            //var title = doc.data().info.title;
          });
        });
    },
    writeDatabase: function() {
      var items = dataObject.Modules;

      for (var i = 0; i < items.length; i++) {
        var item = {
          info: items[i],
          intake: 0 //add accordingly
        };

        database
          .collection("modules")
          .doc()
          .set(item);
      }
    }
  }
};
</script>
