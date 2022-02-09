import App from "@/App.vue";
import { mount } from "@vue/test-utils";

describe('Counter', () => {
  let wrapper;

  const findButtonByText = (text) => wrapper.findAll('button').wrappers.find(w => w.text() === text);

  const createComponent = () => {
    wrapper = mount(App);
  }

  afterEach(() => {
    wrapper.destroy();
  });

  it('shows 0 when initialized', () => {
    // Arrange
    createComponent();

    // Assert
    expect(wrapper.text()).toContain('0')
  });

  it.each`
    buttonText | change                 |expectedResult
    ${'+'}     | ${'increments by one'} | ${'1'}
    ${'-'}     | ${'decrements by one'} | ${'-1'}
  `(
    '$change when $buttonText button clicked',
    async ({ buttonText, change, expectedResult }) => {
    createComponent();

    await findButtonByText(buttonText).trigger('click');

    expect(wrapper.text()).toContain(expectedResult)
  });

  it('shows reset button when counter below zero', async () => {
    // Arrange
    createComponent();
    await findButtonByText('-').trigger('click');
    expect(wrapper.text()).toContain('-1');

    expect(findButtonByText('Reset').exists()).toBe(true)
  })

  it('does not show reset button when counter is not below zero', async () => {
    createComponent();

    expect(findButtonByText('Reset')).toBe(undefined)
  })
})
