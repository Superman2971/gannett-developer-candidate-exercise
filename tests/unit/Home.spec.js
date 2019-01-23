import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  it('renders props.Home when passed', () => {
    const h1 = 'My Delicious Articles'
    // const wrapper = shallowMount(Home)
    const wrapper = shallowMount(Home, {
      mocks: {
        $jsonp: () => {
          return new Promise((resolve, reject) => {
            resolve()
          })
        }
      }
    })
    expect(wrapper.html()).to.include(h1)
  })
})
