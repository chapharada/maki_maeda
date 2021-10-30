

<template>
  <main>
    <div class="contact mainconts" v-cloak>
      <div class="inner">
        <div class="heading">
          <h1>contact</h1>
        </div>
        <div class="explain">
          <div class="email">
            <h2>Email:</h2>
            <div class="link">
              <a
                href="mailto:maeda.m1217@gmail.com "
                data-link-type="mailto"
                data-link-value="maeda.m1217@gmail.com "
                >maeda.m1217@gmail.com
              </a>
              <p>or send me a message.</p>
            </div>
            <div class="error" v-show="onError">
              <ul>
                <li>{{ validationName }}</li>
                <li>{{ validationEmail }}</li>
                <li>{{ validationMessage }}</li>
              </ul>
            </div>
          </div>
          <div class="formbox">
          <client-only>
            <form
              name="contact"
              method="POST"
              @submit.prevent="validateForm"
              novalidate="novalidate"
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              <div class="area">
                <input type="hidden" name="contact" value="ask-question" />
                <div class="name">
                  <input
                    type="text"
                    v-model="form.name"
                    name="name"
                    placeholder="Name"
                    required="required"
                  />
                </div>
                <div class="email">
                  <input
                    type="email"
                    v-model="form.email"
                    name="email"
                    placeholder="Email"
                    required="required"
                  />
                </div>
                <div class="message">
                  <textarea
                    type="text"
                    name="message"
                    v-model="form.message"
                    placeholder="message"
                    rows="8"
                    required="required"
                  ></textarea>
                </div>
              </div>
              <div class="wholeerror" v-show="onError">
                <span>{{ confirmAll }}</span>
              </div>
              <div class="confirmbtn">
                <button type="submit">送信する</button>
              </div>
            </form>
          </client-only>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

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
    submitForm() {
      const params = this.setParams();
      axios
        .post("/", params)
        .then(() => {
          sessionStorage.setItem("formcache", true);
          location.href = "/contact/success/";
        })
        .catch(function (error) {
          console.log(error.response);
          console.log("エラーです。");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.inner {
  display: flex;
}

.contact {
  margin-bottom: 60px;
}

.heading {
  width: 12%;
  min-width: 100px;
}

h1 {
  font-size: 1.4rem;
  line-height: 1.5;
  letter-spacing: 0.08em;
}

.explain {
  width: 88%;
  font-size: 1.2rem;
  display: flex;
  & > .email {
    width: 40%;
    margin-bottom: 4rem;
    h2 {
      margin-bottom: 1.6rem;
    }
    .link {
      a {
        display: inline-block;
        margin-bottom: 2.4rem;
        text-decoration: underline;
      }
    }
  }
  .formbox {
    width: 60%;
    .area {
      & > *:not(:last-of-type) input {
        border-bottom: none;
      }
      input,
      textarea {
        width: 100%;
        padding: 12px 14px;
        border: 1px solid #d1d1d1;
        resize: none;
        padding-right: 40px;
      }
    }
    .confirmbtn {
      margin: 12px 0 0 0;
      width: 160px;
      text-align: center;
      input {
        width: 100%;
        padding: 8px;
        border-radius: 2px;
        color: #454545;
        letter-spacing: 0.08em;
        font-size: 1.2rem;
        font-weight: bold;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        cursor: pointer;
        border: 1px solid #d1d1d1;
      }
    }
  }
}

.error {
  margin-top: 2.4rem;
  font-size: 1.1rem;
  color: #ff0000;
  font-weight: bold;
  & > * + * {
    margin-top: 0.8rem;
  }
}
.wholeerror {
  margin-top: 2.4rem;
  font-size: 1.1rem;
  color: #ff0000;
}
</style>
