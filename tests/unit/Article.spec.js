import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Article from '@/components/Article.vue'

describe('Article.vue', () => {
  it('renders props.article when passed', () => {
    const article = {
      title: 'test',
      summary: 'test summary',
      href: 'https://example.com'
    }
    const wrapper = shallowMount(Article, {
      propsData: { article }
    })
    expect(wrapper.props('article')).to.include(article)
  })
})
