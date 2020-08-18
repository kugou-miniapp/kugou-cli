import React, { useContext, useEffect } from 'react';
import NavigationBar from '@/components/navigation-bar'
import { StoreContext } from '@/store'
import './index.scss'
import { requestUser, receiveUser } from '@/store/actions';
import logo from '@/assets/img/logo.png'

export default function Home() {
  const store = useContext(StoreContext)

  // 初始化
  useEffect(() => {
    store.dispatch(requestUser())
    console.log(window.MiniApp)
    window.MiniApp && window.MiniApp.getUserInfo({
      innerCall: true,
      success(res) {
        store.dispatch(receiveUser(res))
      },
      fail(err) {
        if (err && err.errCode === 40100) {
          window.MiniApp.showToast({title: err.errMsg, icon: 'error', duration: 1000})
        }

        // 获取不到用户信息，未授权
        window.MiniApp.showModal({
          title: '提示',
          content: '请重新授权登录后再使用哦',
          success (res) {
            if (res.confirm) {
              window.MiniApp.exitMiniApp()
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        })
      }
    })
  }, [])

  return (
    <section className="home">
      <NavigationBar />
      <main>
        <img alt="logo" src={logo} />
        <div className="home__title">Hello Kugou!</div>
        <a className="home__link" href="http://open.kugou.com/docs/mini-app/#/README" target="_blank" rel="noopener noreferrer">开发者文档</a>
      </main>
    </section>
  )
}
