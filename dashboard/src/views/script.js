import THeader from '@/components/header'
import Information from './app-information'
import Secret from './app-secret'
import Wallet from './app-wallet'
import TModal from '@/components/t-modal'
import tools from '@/assets/js/tools'

let tmp_uri = '';

export default {
  name: 'dashboard-container',
  components: { Information, Secret, Wallet, TModal, THeader },
  data() {
    return {
      show_click_user: false,
      entring_status: {
        welcome: true,
        is_new_app: false
      },
      nav_header_index: 0,
      nav_list: ['information', 'wallet', 'secret'],
      tmp_component: 'information',
      loading: false,
      all_loading: false,
      init_status: false,
      timer: null,
      balance_modal: false,
      tmp_money: 0,
      is_immersive: false,
      is_mobile: false
    }
  },
  computed: {
    user_info() {
      return this.$store.state.user_info
    },
    app_list() {
      return this.$store.state.app_list
    },
    active_app() {
      return this.$store.state.active_app
    },
    apps_property() {
      return this.$store.state.apps_property
    }
  },
  watch: {
    '$route.path'(val) {
      if (val === '/apps/new') {
        this.click_new_app()
      } else if (val.includes('/apps')) {
        let { app_number } = this.$route.params
        let active_index = this.app_list.findIndex(item => item.app_number === app_number)
        this.$store.commit('change_state', { active_app: this.app_list[active_index] })
      }
    }
  },
  methods: {
    back() {
      tmp_uri = ''
      this.$router.go(-1)
    },
    change_router(nav_header_index) {
      this.nav_header_index = nav_header_index
      this.tmp_component = this.nav_list[nav_header_index]
    },
    click_app_list_item(index) {
      this.entring_status.welcome = false
      this.entring_status.is_new_app = false
      this.$store.commit('change_state', { active_app: this.app_list[index] })
      jump_to_uri.call(this, '/apps', true)
      clearTimeout(this.timer)
      this.loading = true;
      this.timer = setTimeout(() => {
        this.loading = false;
      }, 500)
    },
    click_new_app() {
      this.all_loading = true
      this.$store.dispatch('get_apps_property').then(res => {
        if (res > 0) {
          this.tmp_money = res
          this.balance_modal = true
        } else {
          this.entring_status.welcome = false
          this.entring_status.is_new_app = true
          jump_to_uri.call(this, '/apps/new', false)
        }
      }).finally(_ => this.all_loading = false)
    },
    add_new_app(app_id) {
      axios_get_app_list.call(this, app_id)
      this.entring_status.is_new_app = false
    },
    click_user() {
      this.show_click_user = !this.show_click_user
      if (this.show_click_user) {
        document.onclick = () => this.show_click_user = false
      }
    },
    click_sign_out() {
      window.localStorage.clear()
      this.show_click_user = false;
      setTimeout(() => {
        window.location.href = window.location.origin
      }, 100)
    },
    change_loading(state) {
      this.loading = state
    },
    click_buy_item(count) {
      let trace = tools.getUUID()
      let amount = this.tmp_money + (count - 1) * Number(this.apps_property.price)
      window.location.href = `https://mixin.one/pay?recipient=fbd26bc6-3d04-4964-a7fe-a540432b16e2&asset=c94ac88f-4671-3976-b60a-09064f1811e8&amount=${amount}&trace=${trace}&memo=PAY_FOR_APP`
    }
  },
  mounted() {
    init_page.call(this)
    this.is_mobile = document.documentElement.clientWidth < 769 ? true : false
    window.onresize = () => {
      this.is_mobile = document.documentElement.clientWidth < 769 ? true : false
    }
  }
}

function init_page() {
  tools.changeTheme('#fff')
  this.is_immersive = tools.isImmersive()
  this.init_status = false
  this.all_loading = true
  tmp_uri = this.$route.path
  mounted_select_active_router.call(this)
  this.$store.dispatch('init_app').then(_ => {
    this.all_loading = false
    this.init_status = true
    if (this.$route.params.app_number) {
      let { app_number } = this.$route.params
      let active_index = this.app_list.findIndex(item => item.app_number === app_number)
      this.$store.commit('change_state', { active_app: this.app_list[active_index] })
    }
  })
}

function axios_get_app_list(app_id) {
  this.all_loading = true
  this.apis.get_apps().then(res => {
    this.$store.commit('change_state', { app_list: res })
    this.all_loading = false
    let route_active_index = this.app_list.findIndex(item => item.app_number === this.$route.params.app_number)
    if (route_active_index !== -1) {
      this.$store.commit('change_state', { active_app: this.app_list[route_active_index] })
      this.tmp_component = 'information'
    }
    if (!app_id) return;
    let target_index = res.findIndex(item => item.app_id === app_id)
    this.$store.commit('change_state', { active_app: res[target_index] })
  })
}


function mounted_select_active_router() {
  this.nav_header_index = 0
  if (this.$route.name === 'dashboard') {
    this.entring_status.welcome = true
  } else if (this.$route.name === 'new_app') {
    this.entring_status.welcome = false
    this.entring_status.is_new_app = true
    this.tmp_component = 'information'
  } else {
    this.entring_status.welcome = false
  }
}


function jump_to_uri(uri, has_app_number) {
  this.tmp_component = 'information'
  this.nav_header_index = 0
  uri = has_app_number ? (uri + '/' + this.active_app.app_number) : uri;
  if (uri === tmp_uri) return;
  tmp_uri = uri;
  this.$router.push(tmp_uri);
}