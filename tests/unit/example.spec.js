import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Article from '@/components/Article.vue'

describe('Article.vue', () => {
  it('renders props.article when passed', () => {
    const article = 'new message'
    const wrapper = shallowMount(Article, {
      propsData: { article }
    })
    expect(wrapper.text()).to.include(article)
  })
})
