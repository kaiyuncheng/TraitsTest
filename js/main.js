new Vue({
  el: '#app',
  data: {
    name: {},
    description: '',
    degree: {},
    traits: {},
    problemList: {},

    problems: [],
    score: {},

    pageIndex: -1,
    
  },

  created() {
    this.getData();
  },

  methods: {
    getData() {
      const vm = this;
      const api =
        'https://raw.githubusercontent.com/hexschool/js-training-task/master/api/BigFive.json';

      axios
        .get(api)
        .then(function (res) {
          vm.name = res.data.name;
          vm.description = res.data.description;
          vm.degree = res.data.degree;
          vm.traits = res.data.traits;
          vm.problemList = res.data.problemList;
          console.log(res);

          vm.traits.en.forEach(item => {
            vm.$set(vm.score, item, 0);
            vm.$set(vm.score, `${item}Total`, 0);

            vm.problemList[item].problems.forEach(question => {
              vm.problems = [...vm.problems, question]
            });
          });

        })

        .catch(function (err) {
          console.log('錯誤', err);
        });
    },
  },
});
