/* global Vue */
/* global axios */

// 加入站點
const apiUrl = 'https:///vue3-course-api.hexschool.io/v2';
const apiPath = 'kevinapog2022';

// 產品資料格式
const app = {
// 資料 (函式)
data() {
    return {
      // 商品資料
      products: [],
      // 暫時存放的商品資料
      tempProduct: {},
    };
    },
    // 生命週期 (函式)
        created() {
        },
    // 方法 (物件)
    methods: {
      checkAdmin() {
        const url = `${apiUrl}/api/user/check`;
        // 發出請求
        axios.post(url)
          .then(() => {
            this.getData();
          })
          .catch((err) => {
            alert(err.data.message);
            window.location = 'login.html';
          });
      },
      // 取得資料
      getData() {
        const url = `${apiUrl}/api/${apiPath}/admin/products`;
        axios.get(url)
          .then((response) => {
            this.products = response.data.products;
          })
          .catch((err) => {
            alert(err.data.message);
          });
      },
      // 開啟商品細節
      openProduct(item) {
        this.tempProduct = item;
      },
    },
    mounted() {
      // 取出 Token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = token;
      this.checkAdmin();
    },
  };
Vue.createApp(app).mount('#app');
