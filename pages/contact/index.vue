

<template>
  <main>
    <div class="contact mainconts" v-cloak>
      <div class="inner">
        <div class="heading">
          <h1>お問い合わせ</h1>
          <p class="caption">
            各プロジェクトについてのお問い合わせ、<br>その他ご相談などお気軽にお問い合わせください。
          </p>
        </div>
        <div v-show="onError" :class="['wholeerror', {active: this.validation.confirm == true}]">
          <span>{{ confirmAll }}</span>
        </div>
        <div class="explain">
          <div class="formbox">
            <form
              name="contact"
              method="POST"
              @submit.prevent="validateForm"
              novalidate="novalidate"
            >
              <div class="area">
                <input type="hidden" name="contact" value="ask-question" />
                <div class="name">
                  <label>お名前</label>
                  <input
                    type="text"
                    v-model="form.name"
                    name="name"
                    required="required"
                  />
                  <div class="error" v-show="onError">{{ validationName }}</div>
                </div>
                <div class="email">
                  <label>メールアドレス</label>
                  <input
                    type="email"
                    v-model="form.email"
                    name="email"
                    required="required"
                  />
                <div class="error" v-show="onError">{{ validationEmail }}</div>
                </div>
                <div class="message">
                  <label>お問い合わせ内容</label>
                  <textarea
                    type="text"
                    name="message"
                    v-model="form.message"
                    rows="8"
                    required="required"
                  ></textarea>
                <div class="error" v-show="onError">{{ validationMessage }}</div>
                </div>
              </div>

              <div class="confirmbtn">
                <button type="submit">送信する</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>

export default {
  data: function () {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
      onError: false,
      validation: {
        name: false,
        email: false,
        message: false,
        confirm:false
      },
      isVaild: false,
    };
  },
  computed: {
    validationName() {
      if (!this.form.name) {
        this.validation.name = false;
        return "名前を入力してください";
      } else {
        this.validation.name = true;
      }
      return "";
    },
    validationEmail() {
      const emailReg = new RegExp(
        /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      );
      if (!this.form.email) {
        this.validation.email = false;
        return "メールアドレスを入力してください";
      } else if (!emailReg.test(this.form.email)) {
        this.validation.email = false;
        return "メールアドレスの形式で入力してください";
      }
      this.validation.email = true;
      return "";
    },
    validationMessage() {
      if (!this.form.message) {
        this.validation.message = false;
        return "メッセージを入力してください";
      }
      this.validation.message = true;
      return "";
    },
    confirmAll() {
      var vaild = "";
      for (var key in this.validation) {
        if (!this.validation[key]) {
          vaild = "入力内容に問題があります。確認して再度お試しください。";
          this.validation.confirm = false;
        }else{
          this.validation.confirm = true;
        }
      }
      return vaild;
    },
  },
  methods: {
    validateForm() {
      //全体の結果からtrue,falseを算出
      var checkData = [];
      for (var key in this.validation) {
        checkData.push(this.validation[key]);
      }
      var checkResult = checkData.every((value) => value == true);

      //判定の結果でエラーを表示
      if (!checkResult) {
        console.log("入力内容に誤りがあります。");
        this.onError = true;
      } else {
        this.submitForm();
      }
    },
    setParams() {
      const params = new URLSearchParams();
      params.append("form-name", "contact");
      params.append("name", this.form.name);
      params.append("email", this.form.email);
      params.append("message", this.form.message);
      return params;
    },
    async submitForm() {
        try {
          await this.$axios({
            headers: {
              'Content-type': 'application/json'
            },
            method: 'post',
            url: '/api/sendemail',
            data: { ...this.form },
          })
          .then(() => {
            sessionStorage.setItem("formcache", true);
            this.$router.push('/contact/success/')
          })
        } catch(error) {
          console.log(error.response);
          console.log("エラーです。");
        }
    }, 
  },
};
</script>

<style lang="scss" scoped>

.contact {
  margin-bottom: 60px;
  max-width: 680px;
  margin: 0 auto;
}

.heading{
  margin-bottom: 5.4rem;
  h1 {
    font-weight: bold;
    letter-spacing: 0.08em;
    padding-bottom: 0.2rem;
    margin-bottom: 3.2rem;
    border-bottom: 1px solid #d1d1d1;
    font-size: 1.5rem;
    color: #27c4ac;
  }
  .caption{
    font-size: 1.3rem;
    font-weight: 500;
    margin-bottom: 1.6rem;
  }
}


.explain {
  .formbox {
    .area {
      font-size: 1.4rem;
      & > * {
        margin-bottom: 3.2rem;
      }
      label{
        margin-bottom: 0.4rem;
        display: flex;
        align-items: center;
        &::before{
          content: "必須";
          color: rgb(255, 255, 255);
          font-weight: 500;
          font-size: 0.95rem;
          background: rgb(238, 82, 83);
          margin: 0px 0.8rem 0px 0px;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;          
        }
      }
      input,
      textarea {
        width: 100%;
        padding: 12px 14px;
        border: 1px solid #d1d1d1;
        border-radius: 8px;
        resize: none;
        padding-right: 40px;
        margin-top: 0.4rem;
        font-size: 1.6rem;
        background: #f9f9f9;
      }
    }
    .confirmbtn {
      margin: 2.4rem 0 0 0;
      text-align: center;
      button {
        width: 80%;
        max-width: 320px;
        border-radius: 2px;
        color: #454545;
        letter-spacing: 0.08em;
        font-size: 1.35rem;
        letter-spacing: .1em;
        font-weight: bold;
        cursor: pointer;
        border-radius: 50px;
        height: 60px;
        background: #ee5253;
        color: #fff;
      }
    }
  }
}

.error {
  margin-top: 0.8rem;
  font-size: 1.1rem;
  color: #ff0000;
  font-weight: bold;
}
.wholeerror {
  &.active{
    display: none;
  }
  font-size: 1.2rem;
  background: #fbe2e2;
  color: #ff0000;
  font-weight: 600;
  margin-bottom: 4rem;
  padding: 2.4rem 1.6rem;
  border-radius: 8px;
}
</style>
