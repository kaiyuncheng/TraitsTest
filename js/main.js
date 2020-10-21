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
    scoreTotal:{
      grade:'',
      description:'',
    },
    typeInitial: '',
    typeName: '',
    types: {
      en: [
        'neuroticism',
        'extroversion',
        'openness',
        'agreeableness',
        'conscientiousness',
      ],
      zh: ['情緒不穩定性', '外向性', '經驗開放性', '親和性', '盡責性'],
    },

    pageIndex: -1,
    hideAlert: true,
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
          console.log(vm.problemList);

          vm.traits.en.forEach(item => {
            vm.$set(vm.score, item, 0);

            vm.problemList[item].problems.forEach(question => {
              vm.problems = [...vm.problems, question];
              vm.$set(vm.score, question.id, 0);
            });
          });
        })

        .catch(function (err) {
          console.log('錯誤', err);
        });
    },

    scrollToTop() {
      window.scrollTo(0,0);
    },

    nextPage(id) {
      if (this.score[id] > 0) {
        if (this.pageIndex === 9) {
          this.goResult(this.traits.en[4]);
          this.pageIndex += 1;
        } else {
          this.pageIndex += 1;
        }
      } else {
        this.hideAlert = false;
      }
      this.scrollToTop();
    },

    goResult(type) {
      this.scrollToTop();
      this.typeName = type;
      this.typeInitial = type.slice(0, 1);
      this.score[type] =
        this.score[`${this.typeInitial}1`] + this.score[`${this.typeInitial}2`];

      if (this.score[type] >= 7) {
        this.scoreTotal.grade = '高';
        this.scoreTotal.description = this.problemList[type].description.high;
      } else if (this.score[type] === 6) {
        this.scoreTotal.grade = '中';
        this.scoreTotal.description = this.problemList[type].description.middle;
      } else {
        this.scoreTotal.grade = '低';
        this.scoreTotal.description = this.problemList[type].description.low;
      }
    },

    reset(){
      this.pageIndex = -1;
      this.problems = [];
      this.getData();
    },
  },
});
