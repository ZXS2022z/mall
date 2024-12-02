import { useIntersectionObserver } from '@vueuse/core'

export const LazyLoadPlugin = {
  install(app) {
    app.directive('lazy-load', {
      mounted(el, binding) {
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 进入视口区域
            console.log(isIntersecting)
            el.src = binding.value
            stop()
          }
        })
      }
    })
  }
}
