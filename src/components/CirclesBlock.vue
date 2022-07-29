<template>
  
  <div class="top-panel">
    <div class="areas">
      <textarea class="textarea" v-model="number1"></textarea>
      <textarea class="textarea" v-model="number2"></textarea>
      <button @click="split">GO!</button>
      <textarea class="textarea" v-model="number3"></textarea>
    </div>
    <div class="variants">

      <div v-for="(item,index) in getFaces" :key="item">
        <div
            class="face1 variant"
        >
          <svg
              :class="'f'+index"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 300 300"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision">
          </svg>
        </div>
      </div>
    </div>
  </div>
  

  <div class="slider-demo-block">
    <span class="demonstration">Default value</span>
    <el-slider v-model="value1"/>
  </div>

<br>

  <div class="area1">
    <div class="area-wrap">
      <div class="areaS areaS1"></div>
      <div class="charM">+</div>
      <div class="areaS areaS2"></div>
      <div class="charM">=</div>
      <div class="areaS ">
        <svg
            class="areaS3"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 300 300"
            shape-rendering="geometricPrecision"
            text-rendering="geometricPrecision">
        </svg>
      </div>
      <div class="areaS ">
        <svg
            class="areaS4"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 300 300"
            shape-rendering="geometricPrecision"
            text-rendering="geometricPrecision">
        </svg>
      </div>
    </div>
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">Default value</span>
    <el-slider v-model="value2"/>
  </div>


  <div class="demo-progress">

    <el-progress type="circle" :percentage="someArr[0]" status="warning">
      <span>React</span>
      <div>
        <animated-number :number="someArr[0]"></animated-number>
        <span>/100</span>
      </div>
    </el-progress>

    <el-progress type="circle" :percentage="someArr[1]" status="success">
      <span>React</span>
      <div>
        <animated-number :number="someArr[1]"></animated-number>
        <span>/100</span>
      </div>
    </el-progress>

    <el-progress type="circle" :percentage="someArr[1]" status="success"/>
    <el-progress type="circle" :percentage="someArr[2]" :color="colors"/>
    <el-progress type="circle" :percentage="someArr[3]" :show-text="false"/>
    <el-progress type="circle" :percentage="someArr[4]" status="exception" :stroke-width="3"/>

  </div>
</template>

<script>
import animatedNumber from "@/components/AnimatedNumber";
import {mapGetters} from "vuex";

export default {
  computed: mapGetters(["getFaces"]),
  components: {
    animatedNumber
  },
  name: "CirclesBlock",
  props: {
    arrItems: Array
  },
  data() {
    return {
      number1: null,
      number2: null,
      number: 0,
      number3: null,
      value1: 50,
      value2: 50,
      someArr: [],
      colors: [
        {color: "#f56c6c", percentage: 20},
        {color: "#e6a23c", percentage: 40},
        {color: "#5cb87a", percentage: 60},
        {color: "#1989fa", percentage: 80},
        {color: "#6f7ad3", percentage: 100},
      ]
    };
  },

  mounted() {

    for (let i = 0; i < this.getFaces.length; i++) {
      let shapee = this.split(this.getFaces[i].min,this.getFaces[i].max)
      this.mountSvg(shapee, "f"+i)
    }




    for (let i = 0; i < this.arrItems.length; i++) {
      this.someArr.push(0);
    }

    for (let i = 0; i < this.arrItems.length; i++) {

      let itt = setInterval(() => {
        this.someArr[i] += 0.5;
        if (this.someArr[i] == this.arrItems[i]) {
          clearInterval(itt);
        }
      }, 5);
    }


  },
  watch: {
    value1() {
      for (let i = 0; i < this.getFaces.length; i++) {
        let shapee = this.split(this.getFaces[i].min,this.getFaces[i].max)
        this.mountSvg(shapee, "f"+i)
      }
    },
    number1() {
      let elem = document.querySelector(".areaS1")
      elem.innerHTML = this.number1;
    },
    number2() {
      let elem = document.querySelector(".areaS2")
      elem.innerHTML = this.number2;
    },
    number3() {
      let elem = document.querySelector(".areaS3")
      elem.innerHTML = this.number3;
    },
  },
  methods: {

    cutToArray(str) {
      var separator = /[a-zA-Z-),("]/;
      let resulttt = [];
      for (let i = 0; i < str.length; i++) {
        if (str[i].match(separator)) {
          if (str[i - 1]?.match(separator)) {
            resulttt[resulttt.length - 1] = resulttt[resulttt.length - 1] + str[i];
          } else {
            resulttt.push(str[i]);
          }
        } else {
          if (!(str[i - 1]?.match(separator))) {
            resulttt[resulttt.length - 1] = resulttt[resulttt.length - 1] + str[i];
          } else {
            resulttt.push(str[i]);
          }
        }
      }
      return (resulttt);
    },


    splitToArrSvg(str) {
      let separatorСomma = /[,]/g;
      let separatorSpace = /[ ]/g;
      let replaceArr = str.replace(separatorСomma, "++,").replace(separatorSpace, "++ ");
      console.log(replaceArr);
      let arrSvg = replaceArr.split("++").filter(el => {
        return (el != null && el != "" && el != undefined && el != "''" && el != " ");
      });
      console.log(arrSvg);
      return arrSvg;
    },


    getNumberOfDifferents(arr1, arr2) {
      let numbersOfDifference = [];
      if (arr2.length === arr1.length) {
        for (let i = 0; i < arr2.length; i++) {
          if (arr2[i] !== arr1[i]) {
            numbersOfDifference.push(i);
          }
        }
      } else {
        console.log("not equals");
      }
      return numbersOfDifference;
    },


    mergeArr(arr1, arr2) {
      let result = [];
      var separator555 = /[0-9.]/;
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].match(separator555) && arr2[i].match(separator555)) {
          result.push((((Number(arr1[i])*(100 - this.value1)) + Number(arr2[i])*(this.value1)) / 100));
        } else {
          result.push(arr1[i]);
          continue;
        }
      }
      return result;
    },


    split(shape1, shape2) {
      if(!shape1 || !shape2){
        return
      }
      let arrSvg1 = this.splitToArrSvg(shape1);
      let arrSvg2 = this.splitToArrSvg(shape2);
      let numbersOfDifference = this.getNumberOfDifferents(arrSvg1, arrSvg2);
      for (let i of numbersOfDifference) {
        console.log("--------------");
        console.log(arrSvg1[i]);
        console.log(arrSvg2[i]);

        arrSvg1[i] = this.mergeArr((this.cutToArray(arrSvg1[i])), (this.cutToArray(arrSvg2[i]))).join("");
        console.log(arrSvg1[i]);
        console.log("--------------");
      }
      console.log(arrSvg1);
      return arrSvg1.join(" ")
    },
    mountSvg(shape, mountId){
      let elem = document.querySelector('.'+mountId)
      elem.innerHTML = shape;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.area1{
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  height: 300px;
  width: 1000px;
  /*border: 1px solid black;*/
  /*border-radius: 3px;*/

}
.slider-demo-block{
  width: 100px;
}
.area-wrap{
  display: flex;
  align-items: center;
  justify-content: center;
}
.areaS{
  margin: 0 20px;
  height: 250px;
  width: 230px;
  border: 8px solid #dac0c0;
  border-radius: 10px;
}
.textarea {
  width: 270px;
  height: 270px;
  background-color: bisque;
  border: 2px solid black;
  border-radius: 5px;
  margin: 20px;
}

.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}

.demo-progress .el-progress--circle {
  margin-right: 15px;
}
.top-panel{
  display: flex;
}
.variant{
  width: 100px;
  height: 100px;
  background-color: #dac0c0;
  margin: 20px;
}
.variants{
  display: flex;
  background-color: #c0c4da;
  width: 600px;
}
</style>
